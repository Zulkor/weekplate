import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  CalendarDays,
  Check,
  ChefHat,
  Flame,
  Heart,
  LayoutGrid,
  Lock,
  LockOpen,
  RefreshCw,
  Share2,
  ShoppingBasket,
  Shuffle,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  ALLERGENS,
  DIETS,
  EQUIPMENT,
  PANTRY,
  SLOT_LABEL,
  formatIngredient,
  macros,
  method,
  type Recipe,
} from "@/data/catalog";
import { categoryFeed, categoryNames, dishes, hydrateMeal, loadDishes, loadMealCatalog, onRecipes, recipeById, recipeCount, searchLive } from "@/data/live";
import { fits, useKitchen, baseDayKcal, dayFloor, favoriteFrom, mealServings, platesFor, portionScale, weekFloor, type Goal, type Sex, type View } from "@/state/kitchen";
import { cn } from "@/lib/cn";
import { newShareCode, pullShare, pullShareIfNewer, pushShare, rememberShareCode, SHARE_KEY, shareIsQuiet, shareLink } from "@/state/share";

function monday() {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

function dayDate(i: number) {
  const d = new Date(monday());
  d.setDate(d.getDate() + i);
  return d;
}

function recipeSplit(table: { id: string; name: string; kcal: number }[], kcal: number, people: number, serves = 1) {
  const heads = Math.max(1, people);
  const batch = Math.round(kcal * (heads / Math.max(1, serves)));
  const eating = (table.length ? table : [{ id: "you", name: "You", kcal: 2000 }]).slice(0, heads);
  const weights = eating.map((person) => Math.max(1, person.kcal));
  const sum = weights.reduce((total, weight) => total + weight, 0);
  return {
    batch,
    plates: eating.map((person, index) => ({
      id: person.id,
      name: person.name,
      kcal: Math.round((batch * weights[index]) / sum),
    })),
  };
}

function scaledDay(plan: ReturnType<typeof useKitchen.getState>["plan"], day: number, floor: number) {
  const base = baseDayKcal(plan, day);
  const scale = portionScale(base, floor);
  return plan[day].reduce(
    (a, slot) => {
      const r = slot ? recipeById(slot.id) : undefined;
      if (!r) return a;
      const m = macros(r);
      a.k += Math.round(r.kcal * scale);
      a.p += Math.round(r.protein * scale);
      a.f += Math.round(m.fat * scale);
      a.fi += Math.round(m.fiber * scale);
      return a;
    },
    { k: 0, p: 0, f: 0, fi: 0, scale },
  );
}

function Photo({ recipe, className }: { recipe: Recipe; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={cn("grid place-items-center bg-olive-soft text-olive", className)}>
        <UtensilsCrossed className="size-8" />
      </div>
    );
  }
  return (
    <img
      src={recipe.photo}
      alt={recipe.title}
      className={cn("object-cover", className)}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Chip({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm transition",
        on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink hover:border-olive",
      )}
    >
      {children}
    </button>
  );
}

export function WeekPlate() {
  const s = useKitchen();
  const [open, setOpen] = useState<{ day: number; slot: number } | null>(null);
  const [cook, setCook] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [catalogSize, setCatalogSize] = useState(recipeCount());
  const [shareCode, setShareCode] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef("");

  useEffect(() => {
    const stopCatalog = onRecipes(() => setCatalogSize(recipeCount()));
    loadMealCatalog();
    loadDishes().then((n) => setCatalogSize(n));

    const fromUrl = new URLSearchParams(window.location.search).get("k") ?? "";
    let code = /^[a-f0-9]{32}$/.test(fromUrl) ? fromUrl : (localStorage.getItem(SHARE_KEY) ?? "");
    if (code && /^[a-f0-9]{32}$/.test(fromUrl)) rememberShareCode(code);
    shareRef.current = code;
    setShareCode(code);

    let updatedAt = "";
    let timer = 0;
    const unsub = useKitchen.subscribe(() => {
      const active = shareRef.current;
      if (!active || shareIsQuiet()) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        pushShare(active).then((at) => {
          if (at) updatedAt = at;
        });
      }, 800);
    });

    const boot = async () => {
      if (code) {
        const at = await pullShare(code).catch(() => "");
        if (at) updatedAt = at;
        else await pushShare(code);
        useKitchen.getState().set({ view: "today", onboarded: true });
        return;
      }
      const state = useKitchen.getState();
      const empty = state.plan.every((day) => day.every((slot) => !slot));
      if (empty) state.build();
      else state.set({ view: "today", onboarded: true });
    };
    void boot();

    const poll = window.setInterval(() => {
      const active = shareRef.current;
      if (!active || document.hidden) return;
      pullShareIfNewer(active, updatedAt)
        .then((at) => {
          updatedAt = at;
        })
        .catch(() => undefined);
    }, 5000);

    return () => {
      stopCatalog();
      unsub();
      window.clearTimeout(timer);
      window.clearInterval(poll);
    };
  }, []);

  const flash = (t: string) => {
    setToast(t);
    window.setTimeout(() => setToast(""), 2200);
  };

  if (!s.onboarded && s.plan.every((day) => day.every((slot) => !slot))) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-saffron text-ink">
              <Flame className="size-4" />
            </span>
            <div>
              <p className="font-display text-xl leading-none">WeekPlate</p>
              <p className="text-xs text-muted">{catalogSize.toLocaleString()} dishes ready</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium"
              onClick={() => {
                let code = shareRef.current || shareCode;
                if (!/^[a-f0-9]{32}$/.test(code)) code = newShareCode();
                shareRef.current = code;
                rememberShareCode(code);
                setShareCode(code);
                setShareOpen(true);
                const link = shareLink(code);
                void navigator.clipboard?.writeText(link).then(
                  () => flash("Link copied."),
                  () => flash("Copy the link in the box and send it."),
                );
                void pushShare(code);
              }}
            >
              <Share2 className="size-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-olive px-4 text-sm font-medium text-bg"
              onClick={() => {
                s.build();
                flash("Week rebuilt from the live list. Locked meals stayed.");
              }}
            >
              <RefreshCw className="size-4" />
              <span className="hidden sm:inline">Rebuild</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl overflow-x-hidden px-5 pb-28 pt-6">
        {s.view === "today" && <Today onOpen={setOpen} />}
        {s.view === "library" && <Library />}
        {s.view === "week" && <Week onOpen={(day) => s.set({ day, view: "today" })} />}
        {s.view === "shop" && <Shop />}
        {s.view === "kitchen" && <Kitchen />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-3 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-lg justify-between">
          {(
            [
              ["today", "Today", CalendarDays],
              ["library", "Library", UtensilsCrossed],
              ["week", "Week", LayoutGrid],
              ["shop", "Shop", ShoppingBasket],
              ["kitchen", "Kitchen", ChefHat],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              aria-current={s.view === id ? "page" : undefined}
              onClick={() => s.set({ view: id as View })}
              className={cn(
                "flex min-h-12 min-w-16 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs",
                s.view === id ? "text-olive" : "text-muted",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {open && (
        <RecipeSheet
          day={open.day}
          slot={open.slot}
          cook={cook}
          onCook={() => setCook(true)}
          onClose={() => {
            setOpen(null);
            setCook(false);
            setSwapOpen(false);
          }}
          onSwap={() => {
            setQuery("");
            setSwapOpen(true);
          }}
          onLock={() => {
            s.lock(open.day, open.slot);
            flash("Lock updated.");
          }}
        />
      )}

      {swapOpen && open && (
        <SwapSheet
          slot={open.slot}
          query={query}
          setQuery={setQuery}
          onClose={() => setSwapOpen(false)}
          onPick={(id) => {
            s.swap(open.day, open.slot, id);
            setSwapOpen(false);
          }}
          onSuggest={() => {
            s.suggest(open.day, open.slot);
            setSwapOpen(false);
          }}
        />
      )}

      {shareOpen && shareCode && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center" role="dialog">
          <div className="w-full max-w-md rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">One kitchen</h2>
            <p className="mt-2 text-sm text-muted">Send this link to the other person. When they open it, they see the same week, pantry, and shopping list. Changes from either phone show up on the other.</p>
            <input readOnly value={shareLink(shareCode)} aria-label="Shared kitchen link" className="mt-4 min-h-12 w-full rounded-2xl border border-line bg-surface px-3 text-sm" onFocus={(e) => e.currentTarget.select()} />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="min-h-11 flex-1 rounded-full bg-olive px-4 text-sm text-bg"
                onClick={async () => {
                  await navigator.clipboard.writeText(shareLink(shareCode)).catch(() => undefined);
                  flash("Link copied.");
                }}
              >
                Copy link
              </button>
              <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => setShareOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <p className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-bg">{toast}</p>
      )}
    </div>
  );
}

function Today({ onOpen }: { onOpen: (v: { day: number; slot: number }) => void }) {
  const s = useKitchen();
  const floor = dayFloor(s, s.day);
  const t = scaledDay(s.plan, s.day, floor);
  const pct = Math.min(1, t.k / Math.max(1, floor));
  const c = 2 * Math.PI * 42;
  const date = dayDate(s.day);

  return (
    <div>
      <p className="text-sm text-muted">{date.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}</p>
      <h1 className="font-display text-4xl sm:text-5xl">Today’s plate</h1>
      <div className="mt-5 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === s.day}
            onClick={() => s.set({ day: i })}
            className={cn(
              "min-h-14 rounded-2xl border px-0 py-1.5 text-center",
              i === s.day ? "border-ink bg-ink text-bg" : "border-line bg-surface",
            )}
          >
            <span className="block text-[10px] uppercase leading-tight">{dayDate(i).toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}</span>
            <span className="text-sm font-semibold">{dayDate(i).getDate()}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-4">
          <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`${t.k} calories, minimum ${floor}`}>
            <circle cx="48" cy="48" r="42" fill="none" stroke="var(--color-line)" strokeWidth="8" />
            <circle cx="48" cy="48" r="42" fill="none" stroke="var(--color-saffron)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${pct * c} ${c}`} transform="rotate(-90 48 48)" />
          </svg>
          <div>
            <p className="font-display text-3xl">{t.k}</p>
            <p className="text-sm text-muted">average plate, at least {floor}</p>
          </div>
        </div>
        <Meter label="Protein" value={t.p} target={Math.round((floor * 0.22) / 4)} unit="g" />
        <Meter label="Fiber" value={t.fi} target={Math.round((floor / 1000) * 14)} unit="g" />
        <Meter label="Fat" value={t.f} target={Math.round((floor * 0.3) / 9)} unit="g" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {s.table.map((person) => (
          <div key={person.id} className="rounded-3xl border border-line bg-surface p-4 shadow-sm">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-lg font-semibold tracking-tight">{person.name}</p>
              <p className="text-2xl font-semibold tracking-tight">{person.kcal}</p>
            </div>
            <p className="text-sm text-muted">kcal today · {person.kg} kg · {person.goal === "grow" ? "building" : person.goal === "less" ? "lighter" : "keeping"}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {s.plan[s.day].map((slot, i) => {
          const r = slot ? recipeById(slot.id) : undefined;
          if (!slot || !r) {
            return (
              <article key={i} className="rounded-3xl border border-dashed border-line bg-surface p-6">
                <p className="text-sm text-muted">{SLOT_LABEL[i]}</p>
                <p className="mt-2">Nothing fits those filters yet. Search a swap once recipes finish loading.</p>
              </article>
            );
          }
          const plates = platesFor(s.table, mealServings(slot, s.table.length), i);
          return (
            <article key={i} className="overflow-hidden rounded-3xl border border-line bg-surface">
              <button type="button" className="block w-full text-left" onClick={() => onOpen({ day: s.day, slot: i })}>
                <Photo recipe={r} className="h-48 w-full" />
                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {SLOT_LABEL[i]} · {r.minutes} min
                  </p>
                  <h2 className="font-display text-2xl">{r.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {plates
                      .map((plate) => `${plate.name} ${plate.kcal}`)
                      .join(" · ")}
                  </p>
                </div>
              </button>
              <div className="flex gap-2 px-4 pb-4">
                <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => onOpen({ day: s.day, slot: i })}>
                  Open
                </button>
                <button type="button" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4 text-sm" onClick={() => s.lock(s.day, i)}>
                  {slot.locked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
                  {slot.locked ? "Locked" : "Lock"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted">Portions grow so the day stays at or above your minimum. Numbers are per person.</p>
    </div>
  );
}

function Meter({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="font-display text-2xl">
        {value}
        <span className="text-base text-muted"> / {target}{unit}</span>
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-olive" style={{ width: `${Math.min(100, (value / Math.max(1, target)) * 100)}%` }} />
      </div>
    </div>
  );
}

function Week({ onOpen }: { onOpen: (day: number) => void }) {
  const s = useKitchen();
  const days = Array.from({ length: 7 }, (_, d) => scaledDay(s.plan, d, dayFloor(s, d)));
  const total = days.reduce((a, d) => a + d.k, 0);
  return (
    <div>
      <h1 className="font-display text-4xl sm:text-5xl">Your week</h1>
      <p className="mt-2 text-muted">
        {total} kcal planned, minimum {weekFloor(s)} for the week, per person.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.plan.map((row, d) => (
          <div key={d} className="rounded-3xl border border-line bg-surface p-4">
            <button type="button" onClick={() => onOpen(d)} className="w-full text-left">
              <h2 className="font-display text-xl">{dayDate(d).toLocaleDateString("en", { weekday: "long" })}</h2>
              <div className="mt-3 flex">
                {row.map((slot, i) => {
                  const recipe = slot ? recipeById(slot.id) : undefined;
                  return recipe ? <Photo key={i} recipe={recipe} className="-mr-3 size-16 rounded-full border-2 border-surface" /> : null;
                })}
              </div>
              <p className="mt-3 text-sm text-muted">
                {days[d].k} kcal · at least {dayFloor(s, d)}
              </p>
            </button>
            <CalorieField value={dayFloor(s, d)} label={`Minimum calories ${dayDate(d).toLocaleDateString("en", { weekday: "long" })}`} onCommit={(n) => s.setDayKcal(d, n)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Library() {
  const s = useKitchen();
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("All");
  const [feed, setFeed] = useState<Recipe[]>([]);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [shown, setShown] = useState(60);
  const more = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    categoryNames().then((names) => setCategories(names));
  }, []);

  useEffect(() => {
    if (category === "Favorites" || category === "All" || query.trim().length >= 2) return;
    setSearching(true);
    categoryFeed(category)
      .then(setFeed)
      .finally(() => setSearching(false));
  }, [category, query]);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const handle = window.setTimeout(() => {
      setSearching(true);
      searchLive(query)
        .then(setFeed)
        .finally(() => setSearching(false));
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    if (category !== "All" || query.trim().length >= 2) return;
    const node = more.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setShown((n) => n + 60);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [category, query, shown]);

  const favorites = s.favorites;
  const allFoods = category === "All" && query.trim().length < 2 ? dishes() : [];
  const list =
    category === "Favorites" && query.trim().length < 2
      ? []
      : category === "All" && query.trim().length < 2
        ? allFoods.slice(0, shown).filter((r) => fits(r, s))
        : feed.filter((r) => fits(r, s));

  return (
    <div>
      <h1 className="font-display text-4xl sm:text-5xl">Library</h1>
      <p className="mt-2 text-muted">
        {category === "All" && query.trim().length < 2
          ? `${allFoods.length} dishes ready. Scroll, search, or open Breakfast.`
          : searching
            ? "Loading…"
            : `${list.length} in ${category}`}
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any food"
        aria-label="Search foods"
        className="mt-4 min-h-12 w-full rounded-2xl border border-line bg-surface px-4"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === "Favorites" && query.trim().length < 2}
          onClick={() => {
            setQuery("");
            setCategory("Favorites");
          }}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full border px-4 text-sm",
            category === "Favorites" && query.trim().length < 2 ? "border-ink bg-ink text-bg" : "border-line bg-surface",
          )}
        >
          <Heart className="size-4" /> Favorites
        </button>
        <button
          type="button"
          aria-pressed={category === "All" && query.trim().length < 2}
          onClick={() => {
            setQuery("");
            setCategory("All");
            setShown(60);
          }}
          className={cn(
            "min-h-11 shrink-0 rounded-full border px-4 text-sm",
            category === "All" && query.trim().length < 2 ? "border-ink bg-ink text-bg" : "border-line bg-surface",
          )}
        >
          All dishes
        </button>
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name && query.trim().length < 2}
            onClick={() => {
              setQuery("");
              setCategory(name);
            }}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm",
              category === name && query.trim().length < 2 ? "border-ink bg-ink text-bg" : "border-line bg-surface",
            )}
          >
            {name}
          </button>
        ))}
      </div>
      {category === "Favorites" && query.trim().length < 2 && favorites.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-2xl">Favorites</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {favorites.map((fav) => (
              <article key={fav.id} className="overflow-hidden rounded-3xl border border-line bg-surface">
                <button type="button" className="block w-full text-left" onClick={() => setMenuId(fav.id)}>
                  {fav.photo ? (
                    <img src={fav.photo} alt="" className="h-40 w-full object-cover" />
                  ) : (
                    <div className="grid h-40 place-items-center bg-olive-soft text-olive">
                      <Heart className="size-8" />
                    </div>
                  )}
                  <div className="p-3 pb-0">
                    <h3 className="font-display text-lg leading-tight">{fav.title}</h3>
                    <p className="mt-1 text-xs text-muted">{fav.kcal ? `${fav.kcal} kcal` : "Saved"}</p>
                  </div>
                </button>
                <div className="mt-3 flex gap-2 px-3 pb-3">
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full border border-ink bg-ink text-bg"
                    onClick={() => s.toggleFavorite(fav)}
                    aria-label="Remove favorite"
                  >
                    <Heart className="size-4" />
                  </button>
                  <button type="button" className="min-h-11 flex-1 rounded-full bg-olive px-3 text-sm text-bg" onClick={() => setAdding(fav.id)}>
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {searching && category !== "Favorites" && <p className="mt-4 text-sm text-muted">Loading {query.trim().length >= 2 ? "search" : category}…</p>}
      {(category !== "Favorites" || query.trim().length >= 2) && (
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((r) => {
          const saved = s.favorites.some((f) => f.id === r.id);
          return (
            <article key={r.id} className="overflow-hidden rounded-3xl border border-line bg-surface">
              <button type="button" className="block w-full text-left" onClick={() => setMenuId(r.id)}>
                <Photo recipe={r} className="h-40 w-full" />
                <div className="p-3 pb-0">
                  <h2 className="font-display text-lg leading-tight">{r.title}</h2>
                  <p className="mt-1 text-xs text-muted">{r.kcal} kcal · Open</p>
                </div>
              </button>
              <div className="p-3">
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    aria-pressed={saved}
                    className={cn("grid size-11 place-items-center rounded-full border", saved ? "border-ink bg-ink text-bg" : "border-line")}
                    onClick={() => s.toggleFavorite(favoriteFrom(r))}
                    aria-label={saved ? "Remove favorite" : "Save favorite"}
                  >
                    <Heart className="size-4" />
                  </button>
                  <button type="button" className="min-h-11 flex-1 rounded-full bg-olive px-3 text-sm text-bg" onClick={() => setAdding(r.id)}>
                    Add
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      )}
      {!searching && category === "Favorites" && query.trim().length < 2 && !favorites.length && (
        <p className="mt-6 text-sm text-muted">No favorites yet. Open a category and tap the heart.</p>
      )}
      {!searching && category !== "Favorites" && category !== "All" && !list.length && (
        <p className="mt-6 text-sm text-muted">Nothing in this feed.</p>
      )}
      {category === "All" && query.trim().length < 2 && (
        <p className="mt-4 text-sm text-muted">
          {allFoods.length === 0
            ? "Loading cooked dishes with photos…"
            : `${Math.min(shown, allFoods.length).toLocaleString()} of ${allFoods.length.toLocaleString()} dishes. Keep scrolling.`}
        </p>
      )}
      <div ref={more} className="h-8" />
      {menuId && (
        <DishMenu
          id={menuId}
          onClose={() => setMenuId(null)}
          onAdd={() => {
            setAdding(menuId);
          }}
        />
      )}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center" role="dialog">
          <div className="w-full max-w-md rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
            <h2 className="font-display text-2xl">Add to today</h2>
            <div className="mt-4 flex flex-col gap-2">
              {SLOT_LABEL.map((label, slot) => (
                <button
                  key={label}
                  type="button"
                  className="min-h-12 rounded-2xl border border-line bg-surface text-left px-4"
                  onClick={async () => {
                    if (adding.startsWith("meal-") || adding.startsWith("fork-")) await hydrateMeal(adding);
                    s.swap(s.day, slot, adding);
                    setAdding(null);
                  }}
                >
                  {label}
                </button>
              ))}
              <button type="button" className="min-h-12 rounded-full border border-line" onClick={() => setAdding(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DishMenu({ id, onClose, onAdd }: { id: string; onClose: () => void; onAdd: () => void }) {
  const s = useKitchen();
  const [recipe, setRecipe] = useState(() => recipeById(id));
  useEffect(() => {
    let live = true;
    hydrateMeal(id).then((next) => {
      if (live && next) setRecipe(next);
    });
    return () => {
      live = false;
    };
  }, [id]);
  if (!recipe) {
    return (
      <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/50 sm:items-center">
        <div className="w-full max-w-2xl rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
          <p>Loading this dish…</p>
          <button type="button" className="mt-4 min-h-11 rounded-full border border-line px-4" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
  const heads = Math.max(1, s.table.length);
  const split = recipeSplit(s.table, recipe.kcal, heads, recipe.serves);
  const steps = method(recipe, heads);
  const saved = s.favorites.some((f) => f.id === recipe.id);
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/50 sm:items-center" role="dialog">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Recipe</p>
            <h2 className="font-display text-3xl">{recipe.title}</h2>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-line" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <Photo recipe={recipe} className="mt-4 h-56 w-full rounded-3xl" />
        <ul className="mt-4 divide-y divide-line rounded-3xl border border-line bg-surface px-4">
          {split.plates.map((plate) => (
            <li key={plate.id} className="flex justify-between py-3 text-sm">
              <span>{plate.name}</span>
              <span className="font-medium">{plate.kcal} kcal of this recipe</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <button type="button" className="min-h-11 rounded-full bg-olive px-4 text-sm text-bg" onClick={onAdd}>
            Add to today
          </button>
          <button
            type="button"
            className={cn("inline-flex min-h-11 items-center gap-1 rounded-full border px-4 text-sm", saved ? "border-ink bg-ink text-bg" : "border-line")}
            onClick={() => s.toggleFavorite(favoriteFrom(recipe))}
          >
            <Heart className="size-4" />
            {saved ? "Saved" : "Favorite"}
          </button>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight">Ingredients</h3>
        <ul className="mt-2">
          {recipe.ingredients.map((ing) => (
            <li key={ing.name} className="flex justify-between border-b border-line py-2 text-sm">
              <span>{ing.name}</span>
              <span className="text-muted">{formatIngredient(ing, heads, recipe.serves)}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-6 text-xl font-semibold tracking-tight">Method</h3>
        <ol className="mt-2 list-decimal space-y-3 pl-5">
          {steps.map((step) => (
            <li key={step.title}>
              <span className="font-medium">{step.title}</span>
              <p className="text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Shop() {
  const s = useKitchen();
  const lines = useMemo(() => {
    const map = new Map<string, { name: string; aisle: string; unit?: string; measure?: string; qty: number; people: number; serves: number }>();
    s.plan.forEach((day, d) => {
      if (!s.shopDays[d]) return;
      day.forEach((slot, i) => {
        const recipe = slot ? recipeById(slot.id) : undefined;
        if (!recipe || !slot) return;
        const people = mealServings(slot, s.table.length);
        recipe.ingredients.forEach((ing) => {
          const key = `${ing.name}|${ing.unit ?? ing.measure ?? ""}`;
          const cur = map.get(key);
          const serves = recipe.serves || 1;
          const qty = (ing.qty ?? 0) * (people / serves);
          map.set(key, {
            name: ing.name,
            aisle: ing.aisle,
            unit: ing.unit,
            measure: ing.measure,
            qty: (cur?.qty ?? 0) + qty,
            people: ing.qty ? 1 : (cur?.people ?? 0) + people,
            serves,
          });
        });
      });
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [s.plan, s.table, s.kcal, s.kcalMode, s.dayKcal, s.shopDays]);
  const groups = ["Produce", "Proteins", "Dairy", "Pantry", "Frozen", "Bakery"];
  const need = lines.filter((l) => !s.pantry.includes(l.name)).length;
  const picked = s.shopDays.filter(Boolean).length;
  const fullWeek = picked === 7;
  return (
    <div>
      <h1 className="font-display text-4xl sm:text-5xl">Shopping</h1>
      <p className="mt-2 text-muted">
        {need} to buy · {lines.length - need} already home · {picked === 0 ? "no days selected" : fullWeek ? "full week" : `${picked} days`}
      </p>
      <fieldset className="mt-4">
        <legend className="text-sm text-muted">Buy for these days</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <label className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border px-4", fullWeek ? "border-ink bg-ink text-bg" : "border-line bg-surface")}>
            <input type="checkbox" className="size-4 accent-olive" checked={fullWeek} onChange={(e) => s.setShopWeek(e.target.checked)} />
            Full week
          </label>
          {s.shopDays.map((on, d) => (
            <label key={d} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border px-4", on ? "border-olive bg-olive-soft" : "border-line bg-surface")}>
              <input
                type="checkbox"
                className="size-4 accent-olive"
                checked={on}
                onChange={(e) => s.setShopDay(d, e.target.checked)}
                aria-label={dayDate(d).toLocaleDateString("en", { weekday: "long" })}
              />
              {dayDate(d).toLocaleDateString("en", { weekday: "short" })}
            </label>
          ))}
        </div>
      </fieldset>
      {picked === 0 && <p className="mt-6 text-sm text-muted">Tick at least one day, or the full week.</p>}
      <div className="mt-4">
        <Chip on={s.hideOwned} onClick={() => s.set({ hideOwned: !s.hideOwned })}>
          Hide what we have
        </Chip>
      </div>
      <div className="mt-6 max-w-xl">
        {groups.map((g) => {
          const items = lines.filter((l) => l.aisle === g && !(s.hideOwned && s.pantry.includes(l.name)));
          if (!items.length) return null;
          return (
            <section key={g} className="mt-6">
              <h2 className="font-display text-xl">{g}</h2>
              {items.map((item) => {
                const have = s.pantry.includes(item.name);
                return (
                  <label key={`${item.name}-${item.unit ?? item.measure ?? ""}`} className="flex min-h-12 items-center gap-3 border-b border-line py-2">
                    <input type="checkbox" className="size-5 accent-olive" checked={have} onChange={() => s.toggle("pantry", item.name)} />
                    <span className={cn("flex-1", have && "text-muted line-through")}>{item.name}</span>
                    <span className="text-sm text-muted">
                      {formatIngredient(
                        { name: item.name, aisle: item.aisle as "Pantry", qty: item.qty || undefined, unit: item.unit, measure: item.measure },
                        item.qty ? 1 : item.people,
                        item.qty ? 1 : item.serves,
                      )}
                    </span>
                  </label>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Kitchen() {
  const s = useKitchen();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl sm:text-5xl">Your kitchen</h1>
      <p className="mt-2 text-muted">Filters apply the next time you rebuild the week.</p>
      <Prefs />
      <button type="button" className="mt-8 min-h-12 rounded-full bg-olive px-6 text-bg" onClick={s.build}>
        Rebuild with these
      </button>
    </div>
  );
}

function NumberDraft({
  value,
  label,
  onCommit,
  decimal,
}: {
  value: number;
  label: string;
  onCommit: (n: number) => void;
  decimal?: boolean;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  return (
    <input
      inputMode={decimal ? "decimal" : "numeric"}
      aria-label={label}
      value={text}
      onChange={(e) => setText(decimal ? e.target.value.replace(/[^\d.]/g, "") : e.target.value.replace(/[^\d]/g, ""))}
      onBlur={() => {
        const n = Number(text);
        if (!text || Number.isNaN(n) || n <= 0) {
          setText(String(value));
          return;
        }
        onCommit(n);
      }}
      className="mt-1 min-h-11 w-full rounded-2xl border border-line bg-bg px-3 text-ink"
    />
  );
}

function CalorieField({ value, onCommit, label }: { value: number; onCommit: (n: number) => void; label: string }) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  return (
    <input
      inputMode="numeric"
      aria-label={label}
      value={text}
      onChange={(e) => setText(e.target.value.replace(/[^\d]/g, ""))}
      onBlur={() => {
        const n = Number(text);
        if (!text || Number.isNaN(n) || n < 1) {
          setText(String(value));
          return;
        }
        onCommit(n);
      }}
      className="mt-2 w-36 rounded-2xl border border-line bg-surface px-4 py-3"
    />
  );
}

function GearBox() {
  const s = useKitchen();
  const [name, setName] = useState("");
  return (
    <div>
      <h2 className="mt-8 font-display text-2xl">Equipment</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {EQUIPMENT.map((e) => (
          <Chip key={e.id} on={s.equipment.includes(e.id)} onClick={() => s.toggle("equipment", e.id)}>
            {e.label}
          </Chip>
        ))}
        {s.extraGear.map((g) => (
          <Chip key={g} on onClick={() => s.removeGear(g)}>
            {g} · remove
          </Chip>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          s.addGear(name);
          setName("");
        }}
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Add something new, like a waffle iron" aria-label="New kitchen equipment" className="min-h-11 flex-1 rounded-2xl border border-line bg-surface px-4" />
        <button type="submit" className="min-h-11 rounded-full bg-ink px-4 text-sm text-bg">Add</button>
      </form>
    </div>
  );
}

function TableEditor() {
  const s = useKitchen();
  const [name, setName] = useState("");
  const [note, setNote] = useState<Record<string, string>>({});
  return (
    <div>
      <h2 className="mt-8 font-display text-2xl">Who is eating</h2>
      <p className="mt-1 text-sm text-muted">Each person keeps their own allergies. Meals skip anything anyone at the table cannot eat.</p>
      <div className="mt-4 space-y-4">
        {s.table.map((person) => (
          <div key={person.id} className="rounded-3xl border border-line bg-surface p-4">
            <div className="flex items-center gap-2">
              <input value={person.name} aria-label="Name" onChange={(e) => s.renamePerson(person.id, e.target.value)} className="min-h-11 flex-1 rounded-2xl border border-line bg-bg px-3" />
              {s.table.length > 1 && (
                <button type="button" className="min-h-11 rounded-full border border-line px-3 text-sm" onClick={() => s.removePerson(person.id)}>
                  Remove
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  ["m", "Male"],
                  ["f", "Female"],
                ] as const
              ).map(([sex, label]) => (
                <Chip key={sex} on={person.sex === sex} onClick={() => s.setPerson(person.id, { sex: sex as Sex })}>
                  {label}
                </Chip>
              ))}
              {(
                [
                  ["grow", "Build"],
                  ["hold", "Keep"],
                  ["less", "Lighter"],
                ] as const
              ).map(([goal, label]) => (
                <Chip key={goal} on={person.goal === goal} onClick={() => s.setPerson(person.id, { goal: goal as Goal })}>
                  {label}
                </Chip>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="text-sm text-muted">
                Weight, kg
                <NumberDraft value={person.kg} label={`Weight for ${person.name}`} decimal onCommit={(kg) => s.setPerson(person.id, { kg })} />
              </label>
              <label className="text-sm text-muted">
                Calories
                <NumberDraft value={person.kcal} label={`Calories for ${person.name}`} onCommit={(kcal) => s.setPerson(person.id, { kcal })} />
              </label>
            </div>
            <p className="mt-2 text-xs text-muted">Clear the box and type a new weight. Female estimates sit a little lower than male.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ALLERGENS.map((a) => (
                <Chip key={a.id} on={person.allergens.includes(a.id)} onClick={() => s.togglePersonAllergen(person.id, a.id)}>
                  {a.label}
                </Chip>
              ))}
              {person.allergens
                .filter((a) => !ALLERGENS.some((x) => x.id === a))
                .map((a) => (
                  <Chip key={a} on onClick={() => s.togglePersonAllergen(person.id, a)}>
                    {a} · remove
                  </Chip>
                ))}
            </div>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const word = (note[person.id] ?? "").trim();
                if (word) s.togglePersonAllergen(person.id, word);
                setNote((n) => ({ ...n, [person.id]: "" }));
              }}
            >
              <input
                value={note[person.id] ?? ""}
                onChange={(e) => setNote((n) => ({ ...n, [person.id]: e.target.value }))}
                placeholder="Other allergy, like sesame"
                aria-label={`Other allergy for ${person.name}`}
                className="min-h-11 flex-1 rounded-2xl border border-line bg-bg px-3"
              />
              <button type="submit" className="min-h-11 rounded-full border border-line px-3 text-sm">Add</button>
            </form>
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          s.addPerson(name);
          setName("");
        }}
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Invite someone" aria-label="Guest name" className="min-h-11 flex-1 rounded-2xl border border-line bg-surface px-4" />
        <button type="submit" className="min-h-11 rounded-full bg-ink px-4 text-sm text-bg">Invite</button>
      </form>
    </div>
  );
}

function KcalPrefs() {
  const s = useKitchen();
  return (
    <div>
      <h2 className="mt-8 font-display text-2xl">Minimum calories</h2>
      <p className="mt-1 text-sm text-muted">This is a floor, not a cap. Portions scale so each day stays at or above it.</p>
      <div className="mt-3 flex gap-2">
        <Chip on={s.kcalMode === "day"} onClick={() => s.set({ kcalMode: "day", dayKcal: Array.from({ length: 7 }, () => null) })}>
          Each day
        </Chip>
        <Chip on={s.kcalMode === "week"} onClick={() => s.set({ kcalMode: "week", dayKcal: Array.from({ length: 7 }, () => null) })}>
          Whole week
        </Chip>
      </div>
      <CalorieField
        value={s.kcal}
        label={s.kcalMode === "day" ? "Minimum calories each day" : "Minimum calories for the week"}
        onCommit={(n) => s.set({ kcal: n })}
      />
      <button type="button" className="mt-2 block text-sm text-olive" onClick={s.applyKcalEverywhere}>
        Use this on every day
      </button>
    </div>
  );
}

function Prefs() {
  const s = useKitchen();
  return (
    <div>
      <h2 className="mt-8 font-display text-2xl">How you eat</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {DIETS.map((d) => (
          <Chip key={d.id} on={s.diet === d.id} onClick={() => s.set({ diet: d.id })}>
            {d.label}
          </Chip>
        ))}
      </div>
      <TableEditor />
      <GearBox />
      <h2 className="mt-8 font-display text-2xl">Already at home</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {PANTRY.map((p) => (
          <Chip key={p} on={s.pantry.includes(p)} onClick={() => s.toggle("pantry", p)}>
            {p}
          </Chip>
        ))}
      </div>
      <KcalPrefs />
    </div>
  );
}

function Onboard() {
  const s = useKitchen();
  const titles = ["What do you eat?", "What’s in the kitchen?", "How much, and for whom?"];
  return (
    <main className="mx-auto min-h-screen max-w-xl bg-bg px-5 py-12 text-ink">
      <div className="mb-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i <= s.step ? "bg-ink" : "bg-line")} />
        ))}
      </div>
      <p className="text-sm text-muted">WeekPlate</p>
      <h1 className="mt-2 font-display text-4xl">{titles[s.step]}</h1>
      {s.step === 0 && (
        <>
          <h2 className="mt-8 font-display text-2xl">How you eat</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {DIETS.map((d) => (
              <Chip key={d.id} on={s.diet === d.id} onClick={() => s.set({ diet: d.id })}>
                {d.label}
              </Chip>
            ))}
          </div>
          <TableEditor />
        </>
      )}
      {s.step === 1 && (
        <>
          <GearBox />
          <h2 className="mt-8 font-display text-2xl">Already at home</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {PANTRY.map((p) => (
              <Chip key={p} on={s.pantry.includes(p)} onClick={() => s.toggle("pantry", p)}>
                {p}
              </Chip>
            ))}
          </div>
        </>
      )}
      {s.step === 2 && <KcalPrefs />}
      <div className="mt-10 flex gap-2">
        {s.step > 0 && (
          <button type="button" className="min-h-12 rounded-full border border-line px-5" onClick={() => s.set({ step: s.step - 1 })}>
            Back
          </button>
        )}
        {s.step < 2 ? (
          <button type="button" className="min-h-12 rounded-full bg-ink px-5 text-bg" onClick={() => s.set({ step: s.step + 1 })}>
            Continue
          </button>
        ) : (
          <button type="button" className="min-h-12 rounded-full bg-olive px-5 text-bg" onClick={s.build}>
            Build our week
          </button>
        )}
      </div>
    </main>
  );
}

function RecipeSheet({
  day,
  slot,
  cook,
  onCook,
  onClose,
  onSwap,
  onLock,
}: {
  day: number;
  slot: number;
  cook: boolean;
  onCook: () => void;
  onClose: () => void;
  onSwap: () => void;
  onLock: () => void;
}) {
  const s = useKitchen();
  const meal = s.plan[day][slot];
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (left == null || left <= 0) return;
    const id = window.setInterval(() => setLeft((n) => (n == null ? n : n - 1)), 1000);
    return () => window.clearInterval(id);
  }, [left]);
  const r = meal ? recipeById(meal.id) : undefined;
  if (!meal || !r) return null;
  const heads = mealServings(meal, s.table.length);
  const split = recipeSplit(s.table, r.kcal, heads, r.serves);
  const n = macros(r);
  const steps = method(r, heads);
  const current = steps[step];
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/50 sm:items-center" role="dialog">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{SLOT_LABEL[slot]}</p>
            <h2 className="font-display text-3xl">{r.title}</h2>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-line" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        {!cook ? (
          <>
            <Photo recipe={r} className="mt-4 h-56 w-full rounded-3xl" />
            <div className="mt-4 rounded-3xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Plates</p>
                  <p className="text-sm text-muted">One pan. Each person gets their own calories.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="grid size-11 place-items-center rounded-full border border-line text-lg" onClick={() => s.setServings(day, slot, heads - 1)} aria-label="Fewer people">
                    −
                  </button>
                  <span className="w-8 text-center text-2xl font-semibold">{heads}</span>
                  <button type="button" className="grid size-11 place-items-center rounded-full border border-line text-lg" onClick={() => s.setServings(day, slot, heads + 1)} aria-label="More people">
                    +
                  </button>
                </div>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {split.plates.map((plate) => (
                  <li key={plate.id} className="flex items-center justify-between py-2 text-sm">
                    <span>{plate.name}</span>
                    <span className="font-medium">{plate.kcal} kcal of this recipe</span>
                  </li>
                ))}
                <li className="flex items-center justify-between py-2 text-sm">
                  <span>In the pan</span>
                  <span className="font-medium">{split.batch} kcal</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs text-muted">
              {[
                [split.batch, "kcal"],
                [Math.round(r.protein * (heads / Math.max(1, r.serves || 1))), "protein"],
                [Math.round(n.carbs * (heads / Math.max(1, r.serves || 1))), "carbs"],
                [Math.round(n.fat * (heads / Math.max(1, r.serves || 1))), "fat"],
                [Math.round(n.fiber * (heads / Math.max(1, r.serves || 1))), "fiber"],
              ].map(([v, l]) => (
                <div key={String(l)} className="rounded-2xl border border-line bg-surface py-3">
                  <b className="block font-display text-lg text-ink">{v}</b>
                  {l}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="min-h-11 rounded-full bg-olive px-4 text-bg" onClick={onCook}>
                Start cooking
              </button>
              <button type="button" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4" onClick={onSwap}>
                <Shuffle className="size-4" /> Swap
              </button>
              <button type="button" className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4" onClick={onLock}>
                {meal.locked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
                {meal.locked ? "Locked" : "Lock"}
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex min-h-11 items-center gap-1 rounded-full border px-4",
                  s.favorites.some((f) => f.id === r.id) ? "border-ink bg-ink text-bg" : "border-line",
                )}
                onClick={() => s.toggleFavorite(favoriteFrom(r))}
              >
                <Heart className="size-4" />
                {s.favorites.some((f) => f.id === r.id) ? "Saved" : "Favorite"}
              </button>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Ingredients for the pan</h3>
            <ul className="mt-2">
              {r.ingredients.map((ing) => (
                <li key={ing.name} className="flex justify-between border-b border-line py-2 text-sm">
                  <span>
                    {ing.name}
                    {s.pantry.includes(ing.name) ? " · have" : ""}
                  </span>
                  <span className="text-muted">{formatIngredient(ing, heads, r.serves)}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-xl">Method</h3>
            <ol className="mt-2 list-decimal space-y-3 pl-5">
              {steps.map((st) => (
                <li key={st.title}>
                  <span className="font-medium">{st.title}</span>
                  <p className="text-sm text-muted">{st.body}</p>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <div className="mt-6">
            <p className="text-sm text-muted">
              Step {step + 1} of {steps.length}
            </p>
            <h3 className="mt-4 font-display text-3xl">{current.title}</h3>
            <p className="mt-3 text-lg">{current.body}</p>
            {current.minutes > 0 && (
              <div className="mt-6">
                <p className="font-display text-5xl">
                  {left == null ? `${current.minutes}:00` : `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, "0")}`}
                </p>
                <button type="button" className="mt-3 min-h-11 rounded-full border border-line px-4" onClick={() => setLeft(current.minutes * 60)}>
                  {left == null ? "Start timer" : "Restart timer"}
                </button>
              </div>
            )}
            <div className="mt-8 flex gap-2">
              <button type="button" className="min-h-12 rounded-full border border-line px-5" disabled={step === 0} onClick={() => { setStep((n) => n - 1); setLeft(null); }}>
                Back
              </button>
              {step < steps.length - 1 ? (
                <button type="button" className="min-h-12 rounded-full bg-ink px-5 text-bg" onClick={() => { setStep((n) => n + 1); setLeft(null); }}>
                  Next step
                </button>
              ) : (
                <button type="button" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-olive px-5 text-bg" onClick={onClose}>
                  <Check className="size-4" /> Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SwapSheet({
  slot,
  query,
  setQuery,
  onClose,
  onPick,
  onSuggest,
}: {
  slot: number;
  query: string;
  setQuery: (v: string) => void;
  onClose: () => void;
  onPick: (id: string) => void;
  onSuggest: () => void;
}) {
  const s = useKitchen();
  const [live, setLive] = useState<Recipe[]>([]);
  const [searching, setSearching] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    categoryNames().then((names) => {
      setCategories(names);
      const first = slot === 0 ? names.find((n) => n === "Breakfast") ?? names[0] : names.find((n) => n === "Chicken") ?? names[0];
      if (first) setCategory(first);
    });
  }, [slot]);

  useEffect(() => {
    if (!category || query.trim().length >= 2) return;
    setSearching(true);
    categoryFeed(category)
      .then(setLive)
      .finally(() => setSearching(false));
  }, [category, query]);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const handle = window.setTimeout(() => {
      setSearching(true);
      searchLive(query)
        .then(setLive)
        .finally(() => setSearching(false));
    }, 350);
    return () => window.clearTimeout(handle);
  }, [query]);

  const list = live.filter((r) => fits(r, s));
  const choose = async (id: string) => {
    if (id.startsWith("meal-")) await hydrateMeal(id);
    onPick(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-bg p-5 sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Swap {SLOT_LABEL[slot].toLowerCase()}</h2>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-line" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">
          {searching ? "Loading…" : `${list.length} ${SLOT_LABEL[slot].toLowerCase()} dishes`}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name && query.trim().length < 2}
              onClick={() => {
                setQuery("");
                setCategory(name);
              }}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm",
                category === name && query.trim().length < 2 ? "border-ink bg-ink text-bg" : "border-line bg-surface",
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chicken, dal, yogurt…" className="min-h-11 flex-1 rounded-2xl border border-line bg-surface px-4" />
          <button type="button" className="min-h-11 rounded-full bg-olive px-4 text-sm text-bg" onClick={onSuggest}>
            Surprise us
          </button>
        </div>
        {searching && <p className="mt-3 text-sm text-muted">Loading {query.trim().length >= 2 ? "search" : category}…</p>}
        <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
          {list.map((r) => (
            <li key={r.id}>
              <button type="button" className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-2 text-left" onClick={() => choose(r.id)}>
                <Photo recipe={r} className="size-20 rounded-xl" />
                <span>
                  <span className="block font-medium">{r.title}</span>
                  <span className="text-sm text-muted">
                    {r.kcal} kcal · {category && query.trim().length < 2 ? category : r.id.startsWith("off-") ? "packaged food" : "recipe"}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {!searching && !list.length && <p className="text-sm text-muted">Nothing in this feed yet. Try another category.</p>}
        </ul>
      </div>
    </div>
  );
}
