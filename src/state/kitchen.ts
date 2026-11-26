import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type DietTag, type Recipe } from "@/data/catalog";
import { recipeById, recipePool } from "@/data/live";

export type Diet = "any" | "pesc" | "veg" | "vegan";
export type Slot = { id: string; locked: boolean; servings?: number };
export type View = "today" | "library" | "week" | "shop" | "kitchen";
export type KcalMode = "day" | "week";
export type Goal = "grow" | "hold" | "less";
export type Sex = "m" | "f";
export type Person = { id: string; name: string; allergens: string[]; kcal: number; kg: number; goal: Goal; sex: Sex };
export type Favorite = { id: string; title: string; photo: string; kcal: number };

export function favoriteFrom(r: Pick<Recipe, "id" | "title" | "photo" | "kcal">): Favorite {
  return { id: r.id, title: r.title, photo: r.photo, kcal: r.kcal };
}

export function suggestKcal(kg: number, goal: Goal, sex: Sex = "m") {
  const per = goal === "grow" ? 35 : goal === "less" ? 24 : 30;
  const body = sex === "f" ? 0.9 : 1;
  return Math.max(1200, Math.round((kg || 60) * per * body));
}

export function personKcal(person: Pick<Person, "kcal">) {
  return Math.max(800, Math.round(person.kcal || 2000));
}

const MEAL_SHARE = [0.28, 0.32, 0.4];

export function platesFor(table: Person[], servings: number, slot: number) {
  const share = MEAL_SHARE[slot] ?? 0.33;
  const count = Math.max(1, servings);
  return Array.from({ length: count }, (_, i) => {
    const person = table[Math.min(i, Math.max(0, table.length - 1))];
    const daily = person ? personKcal(person) : 2000;
    return {
      id: person && i < table.length ? person.id : `extra-${i}`,
      name: person && i < table.length ? person.name : "Extra plate",
      kcal: Math.round(daily * share),
      daily,
    };
  });
}

export function cookFactor(recipeKcal: number, plates: { kcal: number }[]) {
  const need = plates.reduce((sum, plate) => sum + plate.kcal, 0);
  if (!recipeKcal) return 1;
  return need / recipeKcal;
}

export function mealServings(slot: Slot | null | undefined, fallback: number) {
  return slot?.servings && slot.servings > 0 ? slot.servings : Math.max(1, fallback);
}

const STANDARD = new Set(["g", "d", "e", "n", "s", "f"]);

export type State = {
  diet: Diet;
  equipment: string[];
  extraGear: string[];
  pantry: string[];
  table: Person[];
  kcalMode: KcalMode;
  kcal: number;
  dayKcal: (number | null)[];
  onboarded: boolean;
  step: number;
  plan: (Slot | null)[][];
  day: number;
  view: View;
  hideOwned: boolean;
  favorites: Favorite[];
  shopDays: boolean[];
  set: (p: Partial<State>) => void;
  toggle: (key: "equipment" | "pantry", value: string) => void;
  addGear: (name: string) => void;
  removeGear: (name: string) => void;
  addPerson: (name: string) => void;
  removePerson: (id: string) => void;
  renamePerson: (id: string, name: string) => void;
  setPerson: (id: string, patch: Partial<Pick<Person, "kcal" | "kg" | "goal" | "sex">>) => void;
  togglePersonAllergen: (id: string, allergen: string) => void;
  setDayKcal: (day: number, value: number | null) => void;
  applyKcalEverywhere: () => void;
  build: () => void;
  swap: (day: number, slot: number, id: string) => void;
  lock: (day: number, slot: number) => void;
  suggest: (day: number, slot: number) => void;
  toggleFavorite: (food: Favorite) => void;
  setServings: (day: number, slot: number, count: number) => void;
  setShopDay: (day: number, on: boolean) => void;
  setShopWeek: (on: boolean) => void;
};

const dietOk = (diet: Diet, tag: DietTag) =>
  diet === "any" ||
  (diet === "pesc" && tag !== "m") ||
  (diet === "veg" && (tag === "g" || tag === "v")) ||
  (diet === "vegan" && tag === "v");

export function dayFloor(s: Pick<State, "kcalMode" | "kcal" | "dayKcal"> & { table?: Person[] }, day: number) {
  const custom = s.dayKcal[day];
  if (custom != null) return custom;
  if (s.kcalMode === "week") return Math.max(800, Math.round(s.kcal / 7));
  if (s.table?.length) return Math.round(s.table.reduce((sum, person) => sum + personKcal(person), 0) / s.table.length);
  return s.kcal;
}

export function weekFloor(s: Pick<State, "kcalMode" | "kcal" | "dayKcal">) {
  if (s.kcalMode === "week" && s.dayKcal.every((n) => n == null)) return s.kcal;
  return Array.from({ length: 7 }, (_, d) => dayFloor(s, d)).reduce((a, b) => a + b, 0);
}

export function baseDayKcal(plan: (Slot | null)[][], day: number) {
  return plan[day].reduce((sum, slot) => (slot && recipeById(slot.id) ? sum + recipeById(slot.id)!.kcal : sum), 0);
}

export function portionScale(base: number, floor: number) {
  if (base <= 0) return 1;
  return Math.max(1, floor / base);
}

export function blockedAllergens(table: Person[]) {
  const ids = new Set<string>();
  const words: string[] = [];
  table.forEach((p) =>
    p.allergens.forEach((a) => {
      if (STANDARD.has(a)) ids.add(a);
      else words.push(a.toLowerCase());
    }),
  );
  return { ids, words };
}

export function fits(r: Recipe, s: Pick<State, "diet" | "equipment" | "table">) {
  if (!dietOk(s.diet, r.diet)) return false;
  const { ids, words } = blockedAllergens(s.table);
  if (r.allergens.some((a) => ids.has(a))) return false;
  const hay = `${r.title} ${r.ingredients.map((i) => i.name).join(" ")}`.toLowerCase();
  if (words.some((w) => w.length > 1 && hay.includes(w))) return false;
  if (!r.eq.every((e) => s.equipment.includes(e))) return false;
  return true;
}

function pool(slot: number, s: State) {
  const all = recipePool().filter((r) => fits(r, s) && r.cat !== "D");
  const preferred = all.filter((r) => {
    if (slot === 0) return r.cat === "B";
    if (slot === 1) return r.cat === "S" || r.cat === "L" || r.cat === "K";
    return r.cat === "M";
  });
  return preferred.length >= 8 ? preferred : all;
}

function pick(slot: number, s: State, used: Set<string>, floor: number) {
  const list = pool(slot, s).filter((r) => !used.has(r.id));
  const source = list.length ? list : pool(slot, s);
  if (!source.length) return null;
  const share = floor * [0.28, 0.32, 0.4][slot];
  const ranked = [...source].sort((a, b) => b.kcal - a.kcal || Math.abs(a.kcal - share) - Math.abs(b.kcal - share));
  return ranked[Math.floor(Math.random() * Math.min(4, ranked.length))];
}

const starter = (): Person[] => [
  { id: "you", name: "You", allergens: [], kg: 67, goal: "grow", sex: "m", kcal: suggestKcal(67, "grow", "m") },
  { id: "partner", name: "Partner", allergens: [], kg: 55, goal: "hold", sex: "f", kcal: suggestKcal(55, "hold", "f") },
];

export const useKitchen = create<State>()(
  persist(
    (set, get) => ({
      diet: "any",
      equipment: ["s", "o", "a"],
      extraGear: [],
      pantry: ["olive oil", "rice", "oats", "salt"],
      table: starter(),
      kcalMode: "day",
      kcal: 2700,
      dayKcal: Array.from({ length: 7 }, () => null),
      onboarded: true,
      step: 0,
      plan: Array.from({ length: 7 }, () => [null, null, null]),
      day: (new Date().getDay() + 6) % 7,
      view: "today",
      hideOwned: false,
      favorites: [],
      shopDays: Array.from({ length: 7 }, () => true),
      set: (p) => set(p),
      toggle: (key, value) =>
        set((s) => ({
          [key]: s[key].includes(value) ? s[key].filter((x) => x !== value) : [...s[key], value],
        })),
      addGear: (name) =>
        set((s) => {
          const clean = name.trim();
          if (!clean || s.extraGear.some((g) => g.toLowerCase() === clean.toLowerCase())) return s;
          return { extraGear: [...s.extraGear, clean] };
        }),
      removeGear: (name) => set((s) => ({ extraGear: s.extraGear.filter((g) => g !== name) })),
      addPerson: (name) =>
        set((s) => ({
          table: [...s.table, { id: `p-${Date.now()}`, name: name.trim() || "Guest", allergens: [], kg: 60, goal: "hold", sex: "f", kcal: suggestKcal(60, "hold", "f") }],
        })),
      removePerson: (id) =>
        set((s) => ({ table: s.table.length < 2 ? s.table : s.table.filter((p) => p.id !== id) })),
      renamePerson: (id, name) =>
        set((s) => ({ table: s.table.map((p) => (p.id === id ? { ...p, name } : p)) })),
      setPerson: (id, patch) =>
        set((s) => ({
          table: s.table.map((p) => {
            if (p.id !== id) return p;
            const next = { ...p, ...patch };
            if ((patch.kg != null || patch.goal != null || patch.sex != null) && patch.kcal == null) {
              next.kcal = suggestKcal(next.kg, next.goal, next.sex);
            }
            return next;
          }),
        })),
      togglePersonAllergen: (id, allergen) =>
        set((s) => ({
          table: s.table.map((p) =>
            p.id === id
              ? {
                  ...p,
                  allergens: p.allergens.includes(allergen)
                    ? p.allergens.filter((a) => a !== allergen)
                    : [...p.allergens, allergen],
                }
              : p,
          ),
        })),
      setDayKcal: (day, value) =>
        set((s) => {
          const dayKcal = s.dayKcal.slice();
          dayKcal[day] = value;
          return { dayKcal };
        }),
      applyKcalEverywhere: () => set({ dayKcal: Array.from({ length: 7 }, () => null) }),
      build: () => {
        const s = get();
        const used = new Set<string>();
        const plan = s.plan.map((row, day) =>
          row.map((slot, i) => {
            if (slot?.locked && recipeById(slot.id) && fits(recipeById(slot.id)!, s)) {
              used.add(slot.id);
              return slot;
            }
            const r = pick(i, s, used, dayFloor(s, day));
            if (!r) return null;
            used.add(r.id);
            return { id: r.id, locked: false };
          }),
        );
        set({ plan, onboarded: true, view: "today" });
      },
      swap: (day, slot, id) =>
        set((s) => {
          const plan = s.plan.map((row) => row.slice());
          const prev = plan[day][slot];
          plan[day][slot] = { id, locked: false, servings: prev?.servings };
          return { plan };
        }),
      lock: (day, slot) =>
        set((s) => {
          const plan = s.plan.map((row) => row.slice());
          const cur = plan[day][slot];
          if (cur) plan[day][slot] = { ...cur, locked: !cur.locked };
          return { plan };
        }),
      suggest: (day, slot) => {
        const s = get();
        const current = s.plan[day][slot]?.id;
        const options = pool(slot, s).filter((r) => r.id !== current);
        const r = options[Math.floor(Math.random() * options.length)] ?? pool(slot, s)[0];
        if (r) get().swap(day, slot, r.id);
      },
      toggleFavorite: (food) =>
        set((s) => ({
          favorites: s.favorites.some((f) => f.id === food.id)
            ? s.favorites.filter((f) => f.id !== food.id)
            : [food, ...s.favorites],
        })),
      setServings: (day, slot, count) =>
        set((s) => {
          const plan = s.plan.map((row) => row.slice());
          const cur = plan[day][slot];
          if (!cur) return {};
          plan[day][slot] = { ...cur, servings: Math.max(1, Math.round(count)) };
          return { plan };
        }),
      setShopDay: (day, on) =>
        set((s) => {
          const shopDays = s.shopDays.slice();
          shopDays[day] = on;
          return { shopDays };
        }),
      setShopWeek: (on) => set({ shopDays: Array.from({ length: 7 }, () => on) }),
    }),
    {
      name: "weekplate-v2",
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<State> & { people?: number; allergens?: string[]; favorites?: unknown };
        const rawTable =
          saved.table?.length
            ? saved.table
            : starter().map((p) => ({ ...p, allergens: saved.allergens ?? [] }));
        const table = rawTable.map((person, index) => {
          const goal = person.goal === "grow" || person.goal === "less" || person.goal === "hold" ? person.goal : index === 0 ? "grow" : "hold";
          const sex = person.sex === "m" || person.sex === "f" ? person.sex : index === 0 ? "m" : "f";
          const kg = person.kg && person.kg > 0 ? person.kg : index === 0 ? 67 : 55;
          const kcal = person.kcal && person.kcal > 0 ? person.kcal : suggestKcal(kg, goal, sex);
          return { ...person, goal, sex, kg, kcal, allergens: person.allergens ?? [] };
        });
        const favorites = Array.isArray(saved.favorites)
          ? saved.favorites.flatMap((item) => {
              if (typeof item === "string") {
                const known = recipeById(item);
                return [known ? favoriteFrom(known) : { id: item, title: "Saved meal", photo: "", kcal: 0 }];
              }
              if (item && typeof item === "object" && "id" in item && "title" in item) return [item as Favorite];
              return [];
            })
          : [];
        return {
          ...current,
          ...saved,
          table,
          extraGear: saved.extraGear ?? [],
          dayKcal: saved.dayKcal?.length === 7 ? saved.dayKcal : current.dayKcal,
          kcalMode: saved.kcalMode ?? "day",
          favorites,
          shopDays: saved.shopDays?.length === 7 ? saved.shopDays : current.shopDays,
          onboarded: true,
          view: "today",
        };
      },
    },
  ),
);
