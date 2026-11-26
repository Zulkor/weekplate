import { readFileSync, writeFileSync } from "node:fs";
import { splitInstructions, stepsForDish, stepsLookGeneric, cleanName } from "../src/data/cook-steps.ts";

type Step = { title: string; body: string; minutes: number };
type Ingredient = { name: string; aisle: string; measure?: string };
type Recipe = {
  id: string;
  title: string;
  ingredients: Ingredient[];
  minutes: number;
  steps?: Step[];
  [key: string]: unknown;
};

function load(path: string) {
  const text = readFileSync(path, "utf8");
  const at = text.indexOf("= ");
  const json = text.slice(at + 2).trim().replace(/;$/, "");
  const header = text.slice(0, at + 2);
  return { header, recipes: JSON.parse(json) as Recipe[] };
}

function save(path: string, header: string, recipes: Recipe[]) {
  writeFileSync(path, `${header}${JSON.stringify(recipes)};\n`);
}

function key(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function mealDb() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const pages = await Promise.all(
    letters.map(async (letter) => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const json = (await res.json()) as { meals: { idMeal: string; strMeal: string; strInstructions: string }[] | null };
      return json.meals ?? [];
    }),
  );
  return pages.flat();
}

const mealsPath = "src/data/extra-meals.ts";
const breakfastPath = "src/data/extra-breakfast.ts";
const mealsFile = load(mealsPath);
const breakfastFile = load(breakfastPath);
const remote = await mealDb();
const byId = new Map(remote.map((meal) => [`meal-${meal.idMeal}`, meal]));
const byTitle = new Map(remote.map((meal) => [key(meal.strMeal), meal]));

let mealFixed = 0;
for (const recipe of mealsFile.recipes) {
  const source = byId.get(recipe.id);
  const steps = source ? splitInstructions(source.strInstructions || "") : [];
  if (steps.length) {
    recipe.steps = steps;
    mealFixed += 1;
  } else if (stepsLookGeneric(recipe.steps)) {
    recipe.steps = stepsForDish(recipe.title, recipe.ingredients.map((item) => item.name), recipe.minutes);
    mealFixed += 1;
  }
}

let breakfastReal = 0;
let breakfastWritten = 0;
for (const recipe of breakfastFile.recipes) {
  for (const item of recipe.ingredients) {
    item.name = cleanName(item.name);
    if (item.measure) item.measure = cleanName(item.measure);
  }
  const match = byTitle.get(key(recipe.title));
  const real = match ? splitInstructions(match.strInstructions || "") : [];
  recipe.steps = real.length ? real : stepsForDish(recipe.title, recipe.ingredients.map((item) => item.name), recipe.minutes);
  if (real.length) breakfastReal += 1;
  breakfastWritten += 1;
}

save(mealsPath, mealsFile.header, mealsFile.recipes);
save(breakfastPath, breakfastFile.header, breakfastFile.recipes);
console.log({ meals: mealsFile.recipes.length, mealFixed, breakfastWritten, breakfastReal });
