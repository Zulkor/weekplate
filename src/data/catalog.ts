export type Aisle = "Produce" | "Proteins" | "Pantry" | "Dairy" | "Frozen" | "Bakery";
export type DietTag = "m" | "f" | "g" | "v";

export type Ingredient = { name: string; aisle: Aisle };

export type Recipe = {
  id: string;
  cat: "B" | "S" | "L" | "M" | "D" | "K";
  title: string;
  diet: DietTag;
  eq: string[];
  allergens: string[];
  ingredients: Ingredient[];
  kcal: number;
  protein: number;
  minutes: number;
  photo: string;
  steps?: { title: string; body: string; minutes: number }[];
};

const p = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const EQUIPMENT = [
  { id: "s", label: "Stovetop" },
  { id: "o", label: "Oven" },
  { id: "m", label: "Microwave" },
  { id: "a", label: "Air fryer" },
  { id: "i", label: "Instant Pot" },
  { id: "c", label: "Slow cooker" },
  { id: "b", label: "Blender" },
] as const;

export const ALLERGENS = [
  { id: "g", label: "Gluten" },
  { id: "d", label: "Dairy" },
  { id: "e", label: "Egg" },
  { id: "n", label: "Nuts" },
  { id: "s", label: "Soy" },
  { id: "f", label: "Fish & shellfish" },
] as const;

export const DIETS = [
  { id: "any", label: "Everything" },
  { id: "pesc", label: "Pescatarian" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
] as const;

export const PANTRY = [
  "olive oil",
  "soy sauce",
  "honey",
  "rice",
  "pasta",
  "oats",
  "salt",
  "black pepper",
];

export const SLOT_LABEL = ["Breakfast", "Lunch", "Dinner"] as const;

const raw: Omit<Recipe, "id">[] = [
  { cat: "B", title: "Blueberry oat pancakes", diet: "g", eq: ["s"], allergens: ["g", "d", "e"], ingredients: [{ name: "oats", aisle: "Pantry" }, { name: "blueberries", aisle: "Frozen" }, { name: "eggs", aisle: "Dairy" }, { name: "milk", aisle: "Dairy" }], kcal: 420, protein: 16, minutes: 20, photo: p("photo-1528207776546-365bb710ee93") },
  { cat: "B", title: "Avocado & egg toast", diet: "g", eq: ["s"], allergens: ["g", "d", "e"], ingredients: [{ name: "sourdough", aisle: "Bakery" }, { name: "avocado", aisle: "Produce" }, { name: "eggs", aisle: "Dairy" }, { name: "lemon", aisle: "Produce" }], kcal: 440, protein: 18, minutes: 10, photo: p("photo-1525351484163-7529414344d8") },
  { cat: "B", title: "Shakshuka", diet: "g", eq: ["s"], allergens: ["e"], ingredients: [{ name: "eggs", aisle: "Dairy" }, { name: "tomatoes", aisle: "Produce" }, { name: "bell pepper", aisle: "Produce" }, { name: "onion", aisle: "Produce" }], kcal: 380, protein: 20, minutes: 25, photo: p("photo-1590412200988-a436970781fa") },
  { cat: "B", title: "Greek yogurt parfait", diet: "g", eq: [], allergens: ["d", "n"], ingredients: [{ name: "Greek yogurt", aisle: "Dairy" }, { name: "granola", aisle: "Pantry" }, { name: "berries", aisle: "Frozen" }, { name: "honey", aisle: "Pantry" }], kcal: 400, protein: 26, minutes: 5, photo: p("photo-1488477181946-6428a0291777") },
  { cat: "B", title: "Veggie egg muffins", diet: "g", eq: ["o"], allergens: ["d", "e"], ingredients: [{ name: "eggs", aisle: "Dairy" }, { name: "spinach", aisle: "Produce" }, { name: "bell pepper", aisle: "Produce" }, { name: "feta", aisle: "Dairy" }], kcal: 320, protein: 22, minutes: 25, photo: p("photo-1482049016688-2d3e1b311543") },
  { cat: "B", title: "Overnight oats", diet: "v", eq: [], allergens: ["g"], ingredients: [{ name: "oats", aisle: "Pantry" }, { name: "oat milk", aisle: "Pantry" }, { name: "chia", aisle: "Pantry" }, { name: "berries", aisle: "Frozen" }], kcal: 380, protein: 12, minutes: 5, photo: p("photo-1517673132405-a56a62b18caf") },
  { cat: "B", title: "Tofu scramble", diet: "v", eq: ["s"], allergens: ["s"], ingredients: [{ name: "tofu", aisle: "Proteins" }, { name: "spinach", aisle: "Produce" }, { name: "tomatoes", aisle: "Produce" }, { name: "onion", aisle: "Produce" }], kcal: 340, protein: 22, minutes: 15, photo: p("photo-1546069901-ba9599a7e63c") },
  { cat: "B", title: "Green smoothie", diet: "v", eq: ["b"], allergens: [], ingredients: [{ name: "spinach", aisle: "Produce" }, { name: "banana", aisle: "Produce" }, { name: "protein powder", aisle: "Pantry" }, { name: "oat milk", aisle: "Pantry" }], kcal: 340, protein: 22, minutes: 5, photo: p("photo-1610970881699-44a5587cabec") },
  { cat: "B", title: "Air-fryer breakfast burrito", diet: "g", eq: ["a"], allergens: ["g", "d", "e"], ingredients: [{ name: "tortillas", aisle: "Bakery" }, { name: "eggs", aisle: "Dairy" }, { name: "black beans", aisle: "Pantry" }, { name: "cheddar", aisle: "Dairy" }], kcal: 520, protein: 27, minutes: 20, photo: p("photo-1626700051175-6818013e1d4f") },
  { cat: "S", title: "Tomato basil soup", diet: "g", eq: ["s"], allergens: ["d"], ingredients: [{ name: "tomatoes", aisle: "Produce" }, { name: "onion", aisle: "Produce" }, { name: "basil", aisle: "Produce" }, { name: "cream", aisle: "Dairy" }], kcal: 280, protein: 8, minutes: 30, photo: p("photo-1547592166-23ac45744acd") },
  { cat: "S", title: "Red lentil soup", diet: "v", eq: ["s"], allergens: [], ingredients: [{ name: "red lentils", aisle: "Pantry" }, { name: "carrot", aisle: "Produce" }, { name: "onion", aisle: "Produce" }, { name: "tomatoes", aisle: "Produce" }], kcal: 450, protein: 26, minutes: 35, photo: p("photo-1476718406336-bb5a9690ee2a") },
  { cat: "S", title: "Chicken noodle soup", diet: "m", eq: ["s"], allergens: ["g"], ingredients: [{ name: "chicken", aisle: "Proteins" }, { name: "noodles", aisle: "Pantry" }, { name: "carrot", aisle: "Produce" }, { name: "celery", aisle: "Produce" }], kcal: 420, protein: 32, minutes: 35, photo: p("photo-1604152135912-04a022e23696") },
  { cat: "S", title: "Miso soup with tofu", diet: "v", eq: ["s"], allergens: ["s"], ingredients: [{ name: "miso", aisle: "Pantry" }, { name: "tofu", aisle: "Proteins" }, { name: "scallions", aisle: "Produce" }, { name: "seaweed", aisle: "Pantry" }], kcal: 180, protein: 14, minutes: 15, photo: p("photo-1547592166-23ac45744acd") },
  { cat: "S", title: "Pumpkin soup", diet: "v", eq: ["s"], allergens: [], ingredients: [{ name: "pumpkin", aisle: "Produce" }, { name: "onion", aisle: "Produce" }, { name: "coconut milk", aisle: "Pantry" }, { name: "ginger", aisle: "Produce" }], kcal: 300, protein: 6, minutes: 35, photo: p("photo-1476718406336-bb5a9690ee2a") },
  { cat: "L", title: "Chickpea salad bowl", diet: "v", eq: [], allergens: [], ingredients: [{ name: "chickpeas", aisle: "Pantry" }, { name: "cucumber", aisle: "Produce" }, { name: "tomatoes", aisle: "Produce" }, { name: "lemon", aisle: "Produce" }], kcal: 480, protein: 18, minutes: 15, photo: p("photo-1512621776951-a57141f2eefd") },
  { cat: "L", title: "Greek salad with feta", diet: "g", eq: [], allergens: ["d"], ingredients: [{ name: "cucumber", aisle: "Produce" }, { name: "tomatoes", aisle: "Produce" }, { name: "feta", aisle: "Dairy" }, { name: "olives", aisle: "Pantry" }], kcal: 360, protein: 12, minutes: 10, photo: p("photo-1540189549336-e6e99c3679fe") },
  { cat: "L", title: "Tuna & white bean salad", diet: "f", eq: [], allergens: ["f"], ingredients: [{ name: "tuna", aisle: "Proteins" }, { name: "white beans", aisle: "Pantry" }, { name: "cucumber", aisle: "Produce" }, { name: "lemon", aisle: "Produce" }], kcal: 470, protein: 35, minutes: 10, photo: p("photo-1546069901-ba9599a7e63c") },
  { cat: "L", title: "Quinoa & roasted veg", diet: "v", eq: ["o"], allergens: [], ingredients: [{ name: "quinoa", aisle: "Pantry" }, { name: "zucchini", aisle: "Produce" }, { name: "bell pepper", aisle: "Produce" }, { name: "lemon", aisle: "Produce" }], kcal: 450, protein: 16, minutes: 35, photo: p("photo-1512621776951-a57141f2eefd") },
  { cat: "L", title: "Chicken Caesar wrap", diet: "m", eq: [], allergens: ["g", "d", "e"], ingredients: [{ name: "chicken", aisle: "Proteins" }, { name: "tortillas", aisle: "Bakery" }, { name: "romaine", aisle: "Produce" }, { name: "parmesan", aisle: "Dairy" }], kcal: 560, protein: 38, minutes: 15, photo: p("photo-1626700051175-6818013e1d4f") },
  { cat: "L", title: "Caprese salad", diet: "g", eq: [], allergens: ["d"], ingredients: [{ name: "tomatoes", aisle: "Produce" }, { name: "mozzarella", aisle: "Dairy" }, { name: "basil", aisle: "Produce" }, { name: "olive oil", aisle: "Pantry" }], kcal: 340, protein: 16, minutes: 5, photo: p("photo-1592417817098-8fd3d9eb14a5") },
  { cat: "M", title: "Sheet-pan salmon & sweet potato", diet: "f", eq: ["o"], allergens: ["f"], ingredients: [{ name: "salmon", aisle: "Proteins" }, { name: "broccoli", aisle: "Produce" }, { name: "sweet potato", aisle: "Produce" }, { name: "lemon", aisle: "Produce" }], kcal: 620, protein: 40, minutes: 35, photo: p("photo-1467003909585-2f8a72700288") },
  { cat: "M", title: "Air-fryer chicken thighs", diet: "m", eq: ["a"], allergens: [], ingredients: [{ name: "chicken thighs", aisle: "Proteins" }, { name: "broccoli", aisle: "Produce" }, { name: "sweet potato", aisle: "Produce" }, { name: "olive oil", aisle: "Pantry" }], kcal: 640, protein: 46, minutes: 35, photo: p("photo-1598103442097-8b74394b95c6") },
  { cat: "M", title: "Instant Pot chickpea curry", diet: "v", eq: ["i"], allergens: [], ingredients: [{ name: "chickpeas", aisle: "Pantry" }, { name: "tomatoes", aisle: "Produce" }, { name: "coconut milk", aisle: "Pantry" }, { name: "rice", aisle: "Pantry" }], kcal: 600, protein: 20, minutes: 30, photo: p("photo-1585937421612-70a008356fbe") },
  { cat: "M", title: "Tofu & broccoli stir-fry", diet: "v", eq: ["s"], allergens: ["g", "s"], ingredients: [{ name: "tofu", aisle: "Proteins" }, { name: "broccoli", aisle: "Produce" }, { name: "rice", aisle: "Pantry" }, { name: "soy sauce", aisle: "Pantry" }], kcal: 540, protein: 30, minutes: 25, photo: p("photo-1512058564366-18510be2db19") },
  { cat: "M", title: "Slow-cooker turkey chili", diet: "m", eq: ["c"], allergens: [], ingredients: [{ name: "turkey", aisle: "Proteins" }, { name: "black beans", aisle: "Pantry" }, { name: "tomatoes", aisle: "Produce" }, { name: "onion", aisle: "Produce" }], kcal: 580, protein: 44, minutes: 20, photo: p("photo-1455619452474-d2be8b1e70cd") },
  { cat: "M", title: "Pasta primavera", diet: "g", eq: ["s"], allergens: ["g", "d"], ingredients: [{ name: "pasta", aisle: "Pantry" }, { name: "broccoli", aisle: "Produce" }, { name: "tomatoes", aisle: "Produce" }, { name: "parmesan", aisle: "Dairy" }], kcal: 590, protein: 22, minutes: 25, photo: p("photo-1473093295043-cdd812d0e601") },
  { cat: "M", title: "Baked cod with roasted veg", diet: "f", eq: ["o"], allergens: ["f"], ingredients: [{ name: "cod", aisle: "Proteins" }, { name: "broccoli", aisle: "Produce" }, { name: "sweet potato", aisle: "Produce" }, { name: "lemon", aisle: "Produce" }], kcal: 480, protein: 38, minutes: 35, photo: p("photo-1519708227418-c8fd9a32b7a2") },
  { cat: "M", title: "Beef tacos", diet: "m", eq: ["s"], allergens: ["g"], ingredients: [{ name: "beef", aisle: "Proteins" }, { name: "tortillas", aisle: "Bakery" }, { name: "tomatoes", aisle: "Produce" }, { name: "onion", aisle: "Produce" }], kcal: 650, protein: 36, minutes: 25, photo: p("photo-1565299585323-38d6b0865b47") },
  { cat: "M", title: "Mushroom risotto", diet: "g", eq: ["s"], allergens: ["d"], ingredients: [{ name: "arborio rice", aisle: "Pantry" }, { name: "mushrooms", aisle: "Produce" }, { name: "onion", aisle: "Produce" }, { name: "parmesan", aisle: "Dairy" }], kcal: 560, protein: 16, minutes: 40, photo: p("photo-1476124369491-e7addf5db371") },
  { cat: "M", title: "Chicken tikka bowl", diet: "m", eq: ["o"], allergens: ["d"], ingredients: [{ name: "chicken", aisle: "Proteins" }, { name: "yogurt", aisle: "Dairy" }, { name: "rice", aisle: "Pantry" }, { name: "cucumber", aisle: "Produce" }], kcal: 620, protein: 45, minutes: 35, photo: p("photo-1565557623262-b51c2513a641") },
  { cat: "M", title: "Shrimp garlic pasta", diet: "f", eq: ["s"], allergens: ["g", "f"], ingredients: [{ name: "shrimp", aisle: "Proteins" }, { name: "pasta", aisle: "Pantry" }, { name: "garlic", aisle: "Produce" }, { name: "parsley", aisle: "Produce" }], kcal: 560, protein: 34, minutes: 20, photo: p("photo-1563379926898-05f4575a45d8") },
  { cat: "M", title: "Black bean burgers", diet: "v", eq: ["a"], allergens: ["g"], ingredients: [{ name: "black beans", aisle: "Pantry" }, { name: "oats", aisle: "Pantry" }, { name: "onion", aisle: "Produce" }, { name: "buns", aisle: "Bakery" }], kcal: 540, protein: 22, minutes: 25, photo: p("photo-1550547660-d9450f859349") },
  { cat: "D", title: "Chocolate mousse", diet: "g", eq: [], allergens: ["d"], ingredients: [{ name: "dark chocolate", aisle: "Pantry" }, { name: "cream", aisle: "Dairy" }, { name: "sugar", aisle: "Pantry" }], kcal: 320, protein: 5, minutes: 10, photo: p("photo-1541783245831-57d6fb0926d3") },
  { cat: "D", title: "Apple crumble", diet: "g", eq: ["o"], allergens: ["g", "d"], ingredients: [{ name: "apples", aisle: "Produce" }, { name: "oats", aisle: "Pantry" }, { name: "butter", aisle: "Dairy" }, { name: "sugar", aisle: "Pantry" }], kcal: 360, protein: 5, minutes: 40, photo: p("photo-1568571780765-9276ac8b75a2") },
  { cat: "K", title: "Hummus & veg plate", diet: "v", eq: [], allergens: [], ingredients: [{ name: "hummus", aisle: "Pantry" }, { name: "carrot", aisle: "Produce" }, { name: "cucumber", aisle: "Produce" }, { name: "pita", aisle: "Bakery" }], kcal: 260, protein: 9, minutes: 5, photo: p("photo-1577805947697-89e18249d767") },
  { cat: "K", title: "Energy bites", diet: "v", eq: [], allergens: ["n"], ingredients: [{ name: "oats", aisle: "Pantry" }, { name: "dates", aisle: "Pantry" }, { name: "peanut butter", aisle: "Pantry" }, { name: "cocoa", aisle: "Pantry" }], kcal: 200, protein: 6, minutes: 10, photo: p("photo-1495147466023-ac5c588e2e94") },
];

export const RECIPES: Recipe[] = raw.map((r, id) => ({ ...r, id: `local-${id}` }));

export function macros(r: Recipe) {
  const fat = Math.round((r.kcal * 0.32) / 9);
  const carbs = Math.max(0, Math.round((r.kcal - r.protein * 4 - fat * 9) / 4));
  const fiber = 2 + r.ingredients.filter((i) => i.aisle === "Produce" || i.aisle === "Frozen").length * 2;
  return { fat, carbs, fiber };
}

const QTY: Record<string, [number, string]> = {
  eggs: [2, "pc"],
  lemon: [1, "pc"],
  onion: [1, "pc"],
  avocado: [1, "pc"],
  banana: [1, "pc"],
  "bell pepper": [1, "pc"],
  tortillas: [2, "pc"],
  sourdough: [2, "slice"],
  pita: [1, "pc"],
  buns: [1, "pc"],
  garlic: [2, "clove"],
};

export function ingredientAmount(name: string, people: number) {
  const base = QTY[name] ?? [120, "g"];
  const q = base[0] * people;
  if (base[1] === "g") return `${Math.max(10, Math.round(q / 10) * 10)} g`;
  const count = Math.max(1, Math.round(q));
  if (base[1] === "slice") return `${count} slices`;
  if (base[1] === "clove") return `${count} cloves`;
  return `${count}`;
}

export function method(r: Recipe, people: number): { title: string; body: string; minutes: number }[] {
  if (r.steps?.length) {
    return r.steps.map((step) => ({
      ...step,
      body: step.body.replaceAll("{people}", String(people)),
    }));
  }
  const names = r.ingredients.map((i) => i.name).join(", ");
  const heat = r.eq.includes("a")
    ? "Heat the air fryer to 200 °C."
    : r.eq.includes("o")
      ? "Heat the oven to 200 °C."
      : r.eq.includes("i")
        ? "Set the Instant Pot to Sauté and warm a spoon of oil."
        : r.eq.includes("c")
          ? "Set the slow cooker to Low."
          : r.eq.includes("b")
            ? "Set the blender jug on the base."
            : "Warm a wide pan over medium heat with a spoon of olive oil.";
  return [
    { title: people === 1 ? "Set one place" : `Set the table for ${people}`, body: `You are cooking ${r.title} for ${people === 1 ? "one person" : `${people} people`}. Gather ${names}, plus salt and pepper.`, minutes: 2 },
    { title: "Heat", body: heat, minutes: r.eq.length ? 3 : 0 },
    { title: "Cook", body: `Cook until the main ingredient is done and the vegetables are tender. Season in the pan, not only at the table. Target time is about ${r.minutes} minutes.`, minutes: Math.max(5, r.minutes - 5) },
    { title: "Plate", body: "Split onto warm plates. Finish with lemon, herbs, or a drizzle of oil if you have them. Taste once more.", minutes: 2 },
  ];
}
