import { RECIPES, type Ingredient, type Recipe } from "@/data/catalog";
import { EXTRA_MEALS } from "@/data/extra-meals";
import { EXTRA_BREAKFAST } from "@/data/extra-breakfast";
import { fetchDish, fetchDishBatch, fetchFoodPage } from "@/lib/food-page";

const byId = new Map<string, Recipe>(RECIPES.map((r) => [r.id, r]));
for (const recipe of [...EXTRA_MEALS, ...EXTRA_BREAKFAST]) {
  if (!byId.has(recipe.id)) byId.set(recipe.id, recipe);
}
const offList: Recipe[] = [];
const listeners = new Set<() => void>();
const TARGET = 10000;
const CACHE_KEY = "weekplate-off-v1";

export function recipeById(id: string) {
  return byId.get(id);
}

export function recipePool() {
  return [...byId.values()];
}

export function dishes() {
  return recipePool().filter((recipe) => !recipe.id.startsWith("off-"));
}

const DISH_CACHE = "weekplate-dishes-v1";

export function recipeCount() {
  return byId.size;
}

export function onRecipes(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function remember(list: Recipe[]) {
  let added = 0;
  for (const recipe of list) {
    if (!recipe.title || !recipe.photo) continue;
    const prev = byId.get(recipe.id);
    if (prev && prev.ingredients.length > 1 && recipe.ingredients.length <= 1) continue;
    if (prev && prev.cat === "B" && recipe.cat !== "B" && prev.ingredients.length >= recipe.ingredients.length) continue;
    if (!prev) {
      added += 1;
      if (recipe.id.startsWith("off-")) offList.push(recipe);
    }
    byId.set(recipe.id, recipe);
  }
  if (added) listeners.forEach((fn) => fn());
  return added;
}

type Meal = Record<string, string | null>;

function aisle(name: string): Ingredient["aisle"] {
  const n = name.toLowerCase();
  if (/milk|cheese|yogurt|cream|butter|egg/.test(n)) return "Dairy";
  if (/chicken|beef|pork|lamb|fish|salmon|shrimp|tuna|tofu|turkey/.test(n)) return "Proteins";
  if (/bread|pita|bun|tortilla|wrap/.test(n)) return "Bakery";
  if (/frozen/.test(n)) return "Frozen";
  if (/onion|garlic|tomato|pepper|lemon|spinach|carrot|potato|herb|lettuce|cucumber|avocado|apple|banana/.test(n))
    return "Produce";
  return "Pantry";
}

function dietOf(meal: Meal): Recipe["diet"] {
  const blob = `${meal.strCategory} ${meal.strMeal}`.toLowerCase();
  if (blob.includes("vegan")) return "v";
  if (blob.includes("vegetarian")) return "g";
  if (/seafood|fish|salmon|shrimp|prawn|tuna/.test(blob)) return "f";
  if (/chicken|beef|pork|lamb|goat|bacon|turkey|duck/.test(blob)) return "m";
  return "g";
}

function catOf(meal: Meal): Recipe["cat"] {
  const name = (meal.strMeal ?? "").toLowerCase();
  const c = (meal.strCategory ?? "").toLowerCase();
  if (c === "breakfast" || /pancake|omelette|omelet|waffle|porridge|smoothie|breakfast/.test(name)) return "B";
  if (c === "dessert") return "D";
  if (c === "side" || c === "starter") return "S";
  if (c === "vegetarian" || c === "vegan") return "L";
  return "M";
}

function allergensOf(names: string[]) {
  const blob = names.join(" ").toLowerCase();
  const out: string[] = [];
  if (/wheat|flour|pasta|bread|noodle|barley/.test(blob)) out.push("g");
  if (/milk|cheese|cream|butter|yogurt/.test(blob)) out.push("d");
  if (/\begg/.test(blob)) out.push("e");
  if (/peanut|almond|cashew|walnut|nut/.test(blob)) out.push("n");
  if (/soy|tofu|miso/.test(blob)) out.push("s");
  if (/fish|salmon|tuna|shrimp|prawn|anchov/.test(blob)) out.push("f");
  return out;
}

function kcalGuess(cat: Recipe["cat"], ingredientCount: number) {
  const base = { B: 420, S: 280, L: 520, M: 680, D: 340, K: 220 }[cat];
  return base + Math.min(8, ingredientCount) * 15;
}

export function fromMeal(meal: Meal): Recipe | null {
  if (!meal.idMeal || !meal.strMeal || !meal.strMealThumb) return null;
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) ingredients.push({ name, aisle: aisle(name), measure: measure || undefined });
  }
  const cat = catOf(meal);
  const chunks = (meal.strInstructions ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 20)
    .slice(0, 8);
  const steps = chunks.length
    ? chunks.map((body, i) => ({ title: `Step ${i + 1}`, body, minutes: i === 0 ? 5 : 8 }))
    : undefined;
  return {
    id: `meal-${meal.idMeal}`,
    cat,
    title: meal.strMeal,
    diet: dietOf(meal),
    eq: [],
    allergens: allergensOf(ingredients.map((i) => i.name)),
    ingredients,
    kcal: kcalGuess(cat, ingredients.length),
    protein: cat === "M" ? 34 : cat === "B" ? 18 : 16,
    minutes: 30,
    photo: meal.strMealThumb,
    serves: 2,
    steps,
  };
}

type OffProduct = {
  code?: string;
  product_name?: string;
  image_front_small_url?: string;
  image_url?: string;
  ingredients_text?: string;
  nutriments?: { "energy-kcal_serving"?: number; "energy-kcal_100g"?: number; proteins_100g?: number };
};

export function fromProduct(product: OffProduct): Recipe | null {
  const title = product.product_name?.trim();
  const photo = product.image_front_small_url || product.image_url;
  if (!product.code || !title || !photo) return null;
  const per100 = product.nutriments?.["energy-kcal_100g"];
  const serving = product.nutriments?.["energy-kcal_serving"];
  const kcal = Math.round(serving || (per100 ? per100 * 2.5 : 350));
  const protein = Math.round((product.nutriments?.proteins_100g ?? 8) * (per100 ? 2.5 : 1));
  const bits = (product.ingredients_text ?? "")
    .split(/,|・/)
    .map((part) => part.replace(/\(.*?\)/g, "").trim())
    .filter((part) => part.length > 1 && part.length < 40)
    .slice(0, 8);
  const ingredients = (bits.length ? bits : [title]).map((name) => ({ name, aisle: aisle(name) }));
  return {
    id: `off-${product.code}`,
    cat: "M",
    title,
    diet: "g",
    eq: [],
    allergens: allergensOf(ingredients.map((i) => i.name)),
    ingredients,
    kcal: Math.min(1200, Math.max(80, kcal)),
    protein: Math.min(80, Math.max(2, protein)),
    minutes: 15,
    photo,
    steps: [
      {
        title: "Check the pack",
        body: `${title} comes from the live food database. Follow the packet for {people}, or use it as written if it is already a prepared food.`,
        minutes: 1,
      },
    ],
  };
}

let mealLoad: Promise<number> | null = null;

export function loadMealCatalog() {
  if (!mealLoad) {
    mealLoad = (async () => {
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");
      const pages = await Promise.all(
        letters.map((letter) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((res) => res.json() as Promise<{ meals: Meal[] | null }>)
            .catch(() => ({ meals: null })),
        ),
      );
      const recipes = pages.flatMap((page) => (page.meals ?? []).map(fromMeal).filter((r): r is Recipe => !!r));
      remember(recipes);
      return recipeCount();
    })();
  }
  return mealLoad;
}

async function fetchFoodPageRecipes(page: number) {
  try {
    const rows = await fetchFoodPage({ data: page });
    return rows
      .map((row) => fromProduct({ code: row.code, product_name: row.title, image_front_small_url: row.photo }))
      .filter((recipe): recipe is Recipe => !!recipe);
  } catch {
    return [];
  }
}

function readFoodCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    const rows = JSON.parse(raw) as { code: string; title: string; photo: string }[];
    return rows.map((row) => fromProduct({ code: row.code, product_name: row.title, image_front_small_url: row.photo })).filter((r): r is Recipe => !!r);
  } catch {
    return [];
  }
}

function writeFoodCache() {
  try {
    const rows = offList.slice(0, TARGET).map((recipe) => ({
      code: recipe.id.replace(/^off-/, ""),
      title: recipe.title,
      photo: recipe.photo,
    }));
    localStorage.setItem(CACHE_KEY, JSON.stringify(rows));
  } catch {
    /* cache is optional */
  }
}

function dietFromTitle(title: string): Recipe["diet"] {
  const name = title.toLowerCase();
  if (/tofu|vegetarian|veggie|vegan/.test(name)) return name.includes("vegan") ? "v" : "g";
  if (/salmon|fish|shrimp|seafood|tuna|crab|lobster/.test(name)) return "f";
  if (/chicken|beef|pork|lamb|bacon|steak|turkey|duck|ham|sausage|pepperoni|ribs/.test(name)) return "m";
  return "g";
}

function dishFromCard(card: { id: string; title: string; photo: string }): Recipe {
  return {
    id: `fork-${card.id}`,
    cat: "M",
    title: card.title,
    diet: dietFromTitle(card.title),
    eq: [],
    allergens: allergensOf([card.title]),
    ingredients: [{ name: card.title, aisle: "Pantry" }],
    kcal: 560,
    protein: 24,
    minutes: 35,
    photo: card.photo,
    steps: [{ title: "Cook", body: `Cook ${card.title} for {people}. Open the recipe again if the ingredient list is still loading.`, minutes: 20 }],
  };
}

function readDishCache() {
  try {
    const raw = localStorage.getItem(DISH_CACHE);
    if (!raw) return [];
    const rows = JSON.parse(raw) as { id: string; title: string; photo: string }[];
    return rows.map(dishFromCard);
  } catch {
    return [];
  }
}

function writeDishCache() {
  try {
    const rows = recipePool()
      .filter((recipe) => recipe.id.startsWith("fork-"))
      .slice(0, 4000)
      .map((recipe) => ({ id: recipe.id.replace(/^fork-/, ""), title: recipe.title, photo: recipe.photo }));
    localStorage.setItem(DISH_CACHE, JSON.stringify(rows));
  } catch {
    /* cache is optional */
  }
}

let dishLoad: Promise<number> | null = null;

export function loadDishes() {
  if (!dishLoad) {
    dishLoad = (async () => {
      await loadMealCatalog();
      remember(readDishCache());
      const have = recipePool().filter((recipe) => recipe.id.startsWith("fork-")).length;
      if (have < 400) {
        for (let page = 0; page < 11; page += 1) {
          const cards = await fetchDishBatch({ data: page }).catch(() => []);
          remember(cards.map(dishFromCard));
        }
        writeDishCache();
      }
      return recipeCount();
    })();
  }
  return dishLoad;
}

export async function searchLive(query: string) {
  const q = query.trim();
  if (q.length < 2) return [];
  const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`)
    .then((res) => res.json() as Promise<{ meals: Meal[] | null }>)
    .catch(() => ({ meals: null }));
  const recipes = (meals.meals ?? []).map(fromMeal).filter((recipe): recipe is Recipe => !!recipe);
  const named = dishes().filter((recipe) => recipe.title.toLowerCase().includes(q.toLowerCase()));
  remember(recipes);
  const seen = new Set<string>();
  return [...recipes, ...named].filter((recipe) => {
    if (seen.has(recipe.id)) return false;
    seen.add(recipe.id);
    return true;
  });
}

export async function categoryNames() {
  const data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((res) => res.json() as Promise<{ meals: { strCategory: string }[] | null }>)
    .catch(() => ({ meals: null }));
  return (data.meals ?? []).map((row) => row.strCategory).filter(Boolean);
}

export async function categoryFeed(category: string) {
  const name = category.toLowerCase();
  const local = dishes().filter((recipe) => {
    if (name === "breakfast") return recipe.cat === "B";
    if (name === "dessert") return recipe.cat === "D";
    if (name === "starter" || name === "side") return recipe.cat === "S" || recipe.cat === "L" || recipe.cat === "K";
    if (name === "vegetarian") return recipe.diet === "g" || recipe.diet === "v";
    if (name === "vegan") return recipe.diet === "v";
    if (name === "seafood") return recipe.diet === "f" || /fish|salmon|shrimp|prawn|tuna|cod/.test(recipe.title.toLowerCase());
    return recipe.cat === "M" && recipe.title.toLowerCase().includes(name.replace(/s$/, ""));
  });
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`)
    .then((res) => res.json() as Promise<{ meals: Meal[] | null }>)
    .catch(() => ({ meals: null }));
  const remote = (data.meals ?? [])
    .map((meal) => fromMeal({ ...meal, strCategory: category, strInstructions: "" }))
    .filter((recipe): recipe is Recipe => !!recipe);
  remember(remote);
  const seen = new Set<string>();
  return [...local, ...remote].filter((recipe) => {
    if (seen.has(recipe.id)) return false;
    seen.add(recipe.id);
    return true;
  });
}

export async function hydrateMeal(id: string) {
  if (id.startsWith("fork-")) {
    const existing = recipeById(id);
    if (existing && existing.ingredients.length > 1) return existing;
    const detail = await fetchDish({ data: id.replace(/^fork-/, "") }).catch(() => null);
    if (!detail) return existing;
    const full: Recipe = {
      ...(existing ?? dishFromCard(detail)),
      title: detail.title,
      photo: detail.photo,
      minutes: detail.minutes,
      serves: detail.servings || 4,
      ingredients: detail.ingredients.map((line) => ({
        name: line.replace(/^[\d½¼¾/.\s-]+/, "").replace(/^(cups?|tablespoons?|teaspoons?|tbsp|tsp|g|kg|ml|oz)\s+/i, "").trim() || line,
        aisle: aisle(line),
        measure: line,
      })),
      allergens: allergensOf(detail.ingredients),
      steps: [
        {
          title: "Amounts",
          body: `Use the published amounts below. They are written for ${detail.servings || 4} and change when you change how many people eat.`,
          minutes: 2,
        },
        {
          title: "Cook",
          body: `Cook ${detail.title} with those ingredients. Plan about ${detail.minutes} minutes.`,
          minutes: Math.max(5, detail.minutes - 2),
        },
      ],
    };
    byId.set(full.id, full);
    return full;
  }
  if (id.startsWith("off-")) {
    const code = id.replace(/^off-/, "");
    const data = await fetch(
      `https://world.openfoodfacts.net/api/v2/product/${code}?fields=code,product_name,image_front_small_url,ingredients_text,nutriments`,
    )
      .then((res) => res.json() as Promise<{ product?: OffProduct }>)
      .catch(() => ({ product: undefined }));
    const full = data.product ? fromProduct({ ...data.product, code }) : null;
    if (full) {
      byId.set(full.id, full);
      return full;
    }
  }
  const existing = recipeById(id);
  if (existing && existing.ingredients.length > 1 && !id.startsWith("meal-")) return existing;
  if (!id.startsWith("meal-")) return existing;
  const mealId = id.replace(/^meal-/, "");
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json() as Promise<{ meals: Meal[] | null }>)
    .catch(() => ({ meals: null }));
  const full = data.meals?.[0] ? fromMeal(data.meals[0]) : null;
  if (full) remember([full]);
  return full ?? existing;
}
