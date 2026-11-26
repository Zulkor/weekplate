import { stepsForDish, stepsLookGeneric } from "@/data/cook-steps";
export type Aisle = "Produce" | "Proteins" | "Pantry" | "Dairy" | "Frozen" | "Bakery";
export type DietTag = "m" | "f" | "g" | "v";

export type Ingredient = { name: string; aisle: Aisle; qty?: number; unit?: string; measure?: string };

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
  serves?: number;
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

export function macros(r: Recipe) {
  const fat = Math.round((r.kcal * 0.32) / 9);
  const carbs = Math.max(0, Math.round((r.kcal - r.protein * 4 - fat * 9) / 4));
  const fiber = 2 + r.ingredients.filter((i) => i.aisle === "Produce" || i.aisle === "Frozen").length * 2;
  return { fat, carbs, fiber };
}

const QTY: Record<string, [number, string]> = {
  eggs: [1, "pc"],
  lemon: [0.5, "pc"],
  onion: [0.5, "pc"],
  avocado: [0.5, "pc"],
  banana: [1, "pc"],
  "bell pepper": [0.5, "pc"],
  tortillas: [1, "pc"],
  sourdough: [2, "slice"],
  pita: [1, "pc"],
  buns: [1, "pc"],
  garlic: [1, "clove"],
};

const AMOUNTS: Record<string, Record<string, [number, string]>> = {
  "Blueberry oat pancakes": { oats: [45, "g"], blueberries: [60, "g"], eggs: [1, "pc"], milk: [100, "ml"] },
  "Avocado & egg toast": { sourdough: [2, "slice"], avocado: [0.5, "pc"], eggs: [1, "pc"], lemon: [0.25, "pc"] },
  Shakshuka: { eggs: [2, "pc"], tomatoes: [200, "g"], "bell pepper": [0.5, "pc"], onion: [0.5, "pc"] },
  "Greek yogurt parfait": { "Greek yogurt": [170, "g"], granola: [30, "g"], berries: [80, "g"], honey: [1, "tsp"] },
  "Veggie egg muffins": { eggs: [2, "pc"], spinach: [40, "g"], "bell pepper": [0.5, "pc"], feta: [30, "g"] },
  "Overnight oats": { oats: [50, "g"], "oat milk": [150, "ml"], chia: [1, "tbsp"], berries: [60, "g"] },
  "Tofu scramble": { tofu: [120, "g"], spinach: [40, "g"], tomatoes: [80, "g"], onion: [0.25, "pc"] },
  "Green smoothie": { spinach: [30, "g"], banana: [1, "pc"], "protein powder": [25, "g"], "oat milk": [200, "ml"] },
  "Air-fryer breakfast burrito": { tortillas: [1, "pc"], eggs: [2, "pc"], "black beans": [80, "g"], cheddar: [30, "g"] },
  "Tomato basil soup": { tomatoes: [250, "g"], onion: [0.5, "pc"], basil: [5, "g"], cream: [40, "ml"] },
  "Red lentil soup": { "red lentils": [80, "g"], carrot: [1, "pc"], onion: [0.5, "pc"], tomatoes: [150, "g"] },
  "Chicken noodle soup": { chicken: [120, "g"], noodles: [60, "g"], carrot: [1, "pc"], celery: [1, "pc"] },
  "Miso soup with tofu": { miso: [1, "tbsp"], tofu: [80, "g"], scallions: [1, "pc"], seaweed: [2, "g"] },
  "Pumpkin soup": { pumpkin: [200, "g"], onion: [0.5, "pc"], "coconut milk": [80, "ml"], ginger: [5, "g"] },
  "Chickpea salad bowl": { chickpeas: [120, "g"], cucumber: [0.5, "pc"], tomatoes: [100, "g"], lemon: [0.5, "pc"] },
  "Greek salad with feta": { cucumber: [0.5, "pc"], tomatoes: [150, "g"], feta: [40, "g"], olives: [30, "g"] },
  "Tuna & white bean salad": { tuna: [80, "g"], "white beans": [80, "g"], cucumber: [0.5, "pc"], lemon: [0.5, "pc"] },
  "Quinoa & roasted veg": { quinoa: [60, "g"], zucchini: [0.5, "pc"], "bell pepper": [0.5, "pc"], lemon: [0.5, "pc"] },
  "Chicken Caesar wrap": { chicken: [120, "g"], tortillas: [1, "pc"], romaine: [60, "g"], parmesan: [15, "g"] },
  "Caprese salad": { tomatoes: [150, "g"], mozzarella: [80, "g"], basil: [5, "g"], "olive oil": [1, "tbsp"] },
  "Sheet-pan salmon & sweet potato": { salmon: [150, "g"], broccoli: [150, "g"], "sweet potato": [200, "g"], lemon: [0.5, "pc"] },
  "Air-fryer chicken thighs": { "chicken thighs": [180, "g"], broccoli: [150, "g"], "sweet potato": [150, "g"], "olive oil": [1, "tbsp"] },
  "Instant Pot chickpea curry": { chickpeas: [120, "g"], tomatoes: [150, "g"], "coconut milk": [100, "ml"], rice: [60, "g"] },
  "Tofu & broccoli stir-fry": { tofu: [150, "g"], broccoli: [150, "g"], rice: [60, "g"], "soy sauce": [1, "tbsp"] },
  "Slow-cooker turkey chili": { turkey: [140, "g"], "black beans": [80, "g"], tomatoes: [150, "g"], onion: [0.5, "pc"] },
  "Pasta primavera": { pasta: [80, "g"], broccoli: [100, "g"], tomatoes: [100, "g"], parmesan: [15, "g"] },
  "Baked cod with roasted veg": { cod: [150, "g"], broccoli: [150, "g"], "sweet potato": [150, "g"], lemon: [0.5, "pc"] },
  "Beef tacos": { beef: [120, "g"], tortillas: [2, "pc"], tomatoes: [80, "g"], onion: [0.25, "pc"] },
  "Mushroom risotto": { "arborio rice": [70, "g"], mushrooms: [100, "g"], onion: [0.5, "pc"], parmesan: [20, "g"] },
  "Chicken tikka bowl": { chicken: [150, "g"], yogurt: [40, "g"], rice: [60, "g"], cucumber: [0.5, "pc"] },
  "Shrimp garlic pasta": { shrimp: [140, "g"], pasta: [80, "g"], garlic: [2, "clove"], parsley: [5, "g"] },
  "Black bean burgers": { "black beans": [120, "g"], oats: [30, "g"], onion: [0.25, "pc"], buns: [1, "pc"] },
  "Chocolate mousse": { "dark chocolate": [40, "g"], cream: [80, "ml"], sugar: [10, "g"] },
  "Apple crumble": { apples: [150, "g"], oats: [30, "g"], butter: [15, "g"], sugar: [15, "g"] },
  "Hummus & veg plate": { hummus: [80, "g"], carrot: [1, "pc"], cucumber: [0.5, "pc"], pita: [1, "pc"] },
  "Energy bites": { oats: [30, "g"], dates: [30, "g"], "peanut butter": [15, "g"], cocoa: [5, "g"] },
};

const step = (title: string, body: string, minutes: number) => ({ title, body, minutes });

const STEPS: Record<string, { title: string; body: string; minutes: number }[]> = {
  "Blueberry oat pancakes": [
    step("Mix", "Whisk the egg and milk. Stir in the oats and a pinch of salt. Rest 5 minutes so the oats soften, then fold in most of the blueberries.", 5),
    step("Cook", "Oil a nonstick pan over medium heat. Spoon in small pancakes. When the surface looks set, flip and cook until golden.", 12),
    step("Serve", "Stack the pancakes and scatter the remaining blueberries on top. These are breakfast pancakes, not a savoury pan dish.", 2),
  ],
  "Avocado & egg toast": [
    step("Toast", "Toast the sourdough until the edges are crisp.", 3),
    step("Egg", "Fry or poach the egg in a little oil until the white is set and the yolk is still soft.", 4),
    step("Assemble", "Crush the avocado on the toast with lemon and salt. Set the egg on top and finish with pepper.", 2),
  ],
  Shakshuka: [
    step("Sauce", "Soften the onion and pepper in olive oil. Add the tomatoes, salt, and a pinch of pepper. Simmer until thick.", 12),
    step("Eggs", "Make wells in the sauce and crack in the eggs. Cover and cook until the whites set.", 8),
    step("Serve", "Spoon straight from the pan. The eggs should still have a soft yolk.", 1),
  ],
  "Greek yogurt parfait": [
    step("Layer", "Spoon yogurt into a bowl, then granola, then berries.", 2),
    step("Finish", "Repeat the layers and drizzle the honey. Eat it cold. No cooking.", 1),
  ],
  "Veggie egg muffins": [
    step("Mix", "Beat the eggs with salt. Stir in chopped spinach, pepper, and crumbled feta.", 5),
    step("Bake", "Pour into a greased muffin tin. Bake at 180 °C until just set in the middle.", 18),
    step("Cool", "Rest 2 minutes, then lift them out. They should be set, not wet.", 2),
  ],
  "Overnight oats": [
    step("Stir", "Mix the oats, oat milk, and chia in a jar with a pinch of salt.", 2),
    step("Chill", "Cover and leave in the fridge overnight, or at least 2 hours.", 1),
    step("Top", "Stir, then add the berries. The oats should be soft, not dry.", 1),
  ],
  "Tofu scramble": [
    step("Crumble", "Mash the tofu in a pan with a little oil so it looks like scramble.", 3),
    step("Veg", "Add onion, tomatoes, and spinach. Cook until the spinach wilts and the tofu is hot.", 8),
    step("Season", "Salt and pepper in the pan. Serve it hot.", 1),
  ],
  "Green smoothie": [
    step("Blend", "Blend spinach, banana, protein powder, and oat milk until smooth.", 2),
    step("Check", "Add a splash more milk if it will not spin. Drink it cold.", 1),
  ],
  "Air-fryer breakfast burrito": [
    step("Fill", "Scramble the eggs. Warm the beans. Roll both into the tortilla with the cheddar.", 8),
    step("Air fry", "Air fry at 180 °C until the tortilla is spotted and the cheese has melted.", 8),
    step("Serve", "Cut in half so the filling stays inside.", 1),
  ],
  "Tomato basil soup": [
    step("Soften", "Cook the onion in olive oil until soft.", 6),
    step("Simmer", "Add the tomatoes, salt, and most of the basil. Simmer until the tomatoes collapse, then blend.", 18),
    step("Finish", "Stir in the cream off the heat. Top with the rest of the basil.", 2),
  ],
  "Red lentil soup": [
    step("Soften", "Cook the onion and carrot in oil for a few minutes.", 6),
    step("Simmer", "Add the lentils, tomatoes, and water to cover. Simmer until the lentils are soft.", 25),
    step("Finish", "Salt it. Mash a few lentils against the side of the pot if you want it thicker.", 2),
  ],
  "Chicken noodle soup": [
    step("Broth", "Simmer the chicken, carrot, and celery in salted water until the chicken is cooked through.", 20),
    step("Noodles", "Take the chicken out, shred it, and return it. Add the noodles and cook until tender.", 10),
    step("Serve", "Taste the broth for salt. The noodles should be soft, not chalky.", 1),
  ],
  "Miso soup with tofu": [
    step("Heat", "Heat water until steaming, not boiling hard.", 5),
    step("Dissolve", "Take it off the heat. Whisk in the miso. Add the tofu and seaweed.", 3),
    step("Finish", "Top with scallions. Do not boil it after the miso goes in.", 1),
  ],
  "Pumpkin soup": [
    step("Soften", "Cook the onion and ginger in oil.", 5),
    step("Simmer", "Add the pumpkin and water to cover. Simmer until the pumpkin is soft, then blend.", 20),
    step("Finish", "Stir in the coconut milk and salt. It should be smooth.", 2),
  ],
  "Chickpea salad bowl": [
    step("Chop", "Cut the cucumber and tomatoes. Drain the chickpeas.", 6),
    step("Dress", "Toss with lemon, olive oil, and salt.", 2),
    step("Serve", "Eat it cold. Nothing here needs a pan.", 1),
  ],
  "Greek salad with feta": [
    step("Chop", "Cut the cucumber and tomatoes. Add the olives.", 6),
    step("Dress", "Toss with olive oil, salt, and pepper.", 2),
    step("Finish", "Put the feta on top in chunks. Do not cook it.", 1),
  ],
  "Tuna & white bean salad": [
    step("Drain", "Drain the tuna and the beans.", 2),
    step("Toss", "Mix with cucumber, lemon, olive oil, and salt.", 4),
    step("Serve", "Cold. The lemon is the dressing.", 1),
  ],
  "Quinoa & roasted veg": [
    step("Roast", "Toss the zucchini and pepper with oil and salt. Roast at 200 °C until browned.", 25),
    step("Quinoa", "Simmer the quinoa in salted water until the tails uncurl, then drain.", 15),
    step("Toss", "Mix the quinoa and vegetables with lemon.", 2),
  ],
  "Chicken Caesar wrap": [
    step("Chicken", "Cook the chicken through in a pan, then slice it.", 10),
    step("Fill", "Lay romaine, chicken, and parmesan on the tortilla. Add a little oil and pepper.", 3),
    step("Roll", "Fold in the sides and roll it tight.", 1),
  ],
  "Caprese salad": [
    step("Slice", "Slice the tomatoes and mozzarella.", 3),
    step("Arrange", "Layer them with the basil.", 1),
    step("Dress", "Olive oil, salt, and pepper. Serve at room temperature.", 1),
  ],
  "Sheet-pan salmon & sweet potato": [
    step("Start the veg", "Cut the sweet potato. Roast at 200 °C with oil and salt for 15 minutes.", 15),
    step("Add the rest", "Add the broccoli and the salmon. Season the fish with salt and lemon.", 15),
    step("Check", "The salmon should flake. The potato should be soft in the middle.", 2),
  ],
  "Air-fryer chicken thighs": [
    step("Season", "Salt the thighs and rub with a little oil.", 3),
    step("Air fry", "Air fry at 190 °C, skin side down first if they have skin, until the juices run clear.", 22),
    step("Veg", "Air fry the sweet potato and broccoli with oil until the potato is soft. Serve together.", 12),
  ],
  "Instant Pot chickpea curry": [
    step("Sauté", "On Sauté, cook the spices you have with a spoon of oil, then add the tomatoes.", 5),
    step("Pressure", "Add the chickpeas, coconut milk, and a pinch of salt. Pressure cook until the chickpeas are soft.", 18),
    step("Rice", "Cook the rice separately in salted water. Serve the curry over it.", 12),
  ],
  "Tofu & broccoli stir-fry": [
    step("Rice", "Start the rice in salted water.", 12),
    step("Tofu", "Fry the tofu in a little oil until the edges brown. Set it aside.", 6),
    step("Sauce", "Stir-fry the broccoli, add the tofu and soy sauce, and toss until the broccoli is bright and tender.", 6),
  ],
  "Slow-cooker turkey chili": [
    step("Brown", "Brown the turkey with the onion in a pan.", 8),
    step("Slow cook", "Put it in the slow cooker with the beans, tomatoes, and salt. Cook on Low until thick.", 1),
    step("Serve", "Taste for salt. The beans should be soft.", 1),
  ],
  "Pasta primavera": [
    step("Pasta", "Boil the pasta in salted water until just tender. Save a splash of the water.", 10),
    step("Veg", "In a pan, cook the broccoli and tomatoes with a little oil until the broccoli is tender.", 8),
    step("Toss", "Add the pasta, parmesan, and a splash of pasta water. Toss until glossy.", 2),
  ],
  "Baked cod with roasted veg": [
    step("Veg", "Roast the sweet potato at 200 °C with oil and salt.", 15),
    step("Fish", "Add the broccoli and the cod. Season the cod with salt and lemon.", 15),
    step("Check", "The cod should flake and look opaque. The potato should be soft.", 1),
  ],
  "Beef tacos": [
    step("Beef", "Cook the beef with the onion until no pink remains. Salt it.", 10),
    step("Salsa", "Chop the tomatoes. Warm the tortillas in a dry pan.", 5),
    step("Fill", "Spoon the beef into the tortillas and top with tomato.", 2),
  ],
  "Mushroom risotto": [
    step("Mushrooms", "Brown the mushrooms in oil, then set them aside. Soften the onion in the same pan.", 8),
    step("Rice", "Stir in the rice. Add hot water a ladle at a time, stirring, until the rice is tender with a little bite.", 25),
    step("Finish", "Stir the mushrooms and parmesan back in. Salt and rest 1 minute.", 2),
  ],
  "Chicken tikka bowl": [
    step("Marinate", "Coat the chicken in yogurt, salt, and whatever spice you have.", 5),
    step("Cook", "Roast or pan-cook the chicken until it is cooked through. Cook the rice in salted water.", 20),
    step("Bowl", "Serve the chicken on the rice with cucumber.", 2),
  ],
  "Shrimp garlic pasta": [
    step("Pasta", "Boil the pasta in salted water until just tender.", 10),
    step("Shrimp", "In a pan, cook the garlic in oil, then the shrimp until they turn pink.", 5),
    step("Toss", "Add the pasta and parsley. Toss with a spoon of pasta water.", 2),
  ],
  "Black bean burgers": [
    step("Mix", "Mash the beans with oats, grated onion, and salt until they hold together.", 6),
    step("Cook", "Shape a patty and air fry or pan-fry until the outside is browned and the middle is hot.", 12),
    step("Bun", "Toast the bun and put the patty in it.", 2),
  ],
  "Chocolate mousse": [
    step("Melt", "Melt the chocolate gently. Whip the cream with the sugar until it holds soft peaks.", 6),
    step("Fold", "Cool the chocolate a little, then fold it into the cream.", 2),
    step("Chill", "Chill until it sets. This is a dessert, not a cooked dinner.", 1),
  ],
  "Apple crumble": [
    step("Fruit", "Slice the apples into a dish with half the sugar.", 5),
    step("Top", "Rub the oats, butter, and remaining sugar into a crumb. Scatter it over the apples.", 5),
    step("Bake", "Bake at 180 °C until the apples are soft and the top is golden.", 30),
  ],
  "Hummus & veg plate": [
    step("Cut", "Cut the carrot and cucumber into sticks.", 3),
    step("Plate", "Put the hummus in a bowl and warm the pita if you want it soft.", 2),
    step("Eat", "Dip the vegetables. Nothing else is cooked.", 1),
  ],
  "Energy bites": [
    step("Mix", "Chop the dates. Mix them with oats, peanut butter, and cocoa until it holds.", 5),
    step("Roll", "Roll small balls.", 3),
    step("Chill", "Chill until firm. No baking.", 1),
  ],
};

const PHOTOS: Record<string, string> = {
  "Blueberry oat pancakes": "https://www.themealdb.com/images/media/meals/c400ok1764439058.jpg",
  "Avocado & egg toast": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Avocado_toast_at_the_girl_%26_the_fig_-_Sarah_Stierch.jpg/500px-Avocado_toast_at_the_girl_%26_the_fig_-_Sarah_Stierch.jpg",
  Shakshuka: "https://www.themealdb.com/images/media/meals/g373701551450225.jpg",
  "Greek yogurt parfait": "https://live.staticflickr.com/4123/4903134042_994963dd3e.jpg",
  "Veggie egg muffins": "https://live.staticflickr.com/4133/5175926936_9e621b4c9b_b.jpg",
  "Overnight oats": "https://live.staticflickr.com/5560/15207378706_f457163cda.jpg",
  "Tofu scramble": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Tacopocalypse_Vegan_Tofu_Scramble%2C_Des_Moines%2C_Iowa_%2824301627930%29.jpg/500px-Tacopocalypse_Vegan_Tofu_Scramble%2C_Des_Moines%2C_Iowa_%2824301627930%29.jpg",
  "Green smoothie": "https://live.staticflickr.com/8405/8761977445_9ab7b6f4f8_b.jpg",
  "Air-fryer breakfast burrito": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Bacon_Kale_Breakfast_Burrito_%288429773809%29.jpg/500px-Bacon_Kale_Breakfast_Burrito_%288429773809%29.jpg",
  "Tomato basil soup": "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
  "Red lentil soup": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Bowl_of_lentil_soup_with_green_and_red_lentils.jpg/500px-Bowl_of_lentil_soup_with_green_and_red_lentils.jpg",
  "Chicken noodle soup": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Chicken_Noodle_Soup.jpg/500px-Chicken_Noodle_Soup.jpg",
  "Miso soup with tofu": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Miso_Soup_001.jpg/500px-Miso_Soup_001.jpg",
  "Pumpkin soup": "https://www.themealdb.com/images/media/meals/1brbso1763585098.jpg",
  "Chickpea salad bowl": "https://live.staticflickr.com/5248/5366445507_dcafcee662_b.jpg",
  "Greek salad with feta": "https://live.staticflickr.com/7231/7206018248_06d9c21b18_b.jpg",
  "Tuna & white bean salad": "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg",
  "Quinoa & roasted veg": "https://live.staticflickr.com/1815/44040185371_ef1d25ae62_b.jpg",
  "Chicken Caesar wrap": "https://live.staticflickr.com/4102/4782004194_560afe4229.jpg",
  "Caprese salad": "https://live.staticflickr.com/3245/3042662667_bc51f47029_b.jpg",
  "Sheet-pan salmon & sweet potato": "https://live.staticflickr.com/3820/8807705542_596457f027_m.jpg",
  "Air-fryer chicken thighs": "https://live.staticflickr.com/5482/11348618374_8a7cbf98aa_b.jpg",
  "Instant Pot chickpea curry": "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
  "Tofu & broccoli stir-fry": "https://www.themealdb.com/images/media/meals/minfsc1763766806.jpg",
  "Slow-cooker turkey chili": "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
  "Pasta primavera": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Pasta_primavera.jpg/500px-Pasta_primavera.jpg",
  "Baked cod with roasted veg": "https://live.staticflickr.com/3772/9894235923_53a3bb11b2_b.jpg",
  "Beef tacos": "https://live.staticflickr.com/5517/12525671195_2f47b4811c_b.jpg",
  "Mushroom risotto": "https://live.staticflickr.com/2794/4335679494_5e8b806eca_b.jpg",
  "Chicken tikka bowl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Chicken_Tikka_Masala_KellySue.JPG/500px-Chicken_Tikka_Masala_KellySue.JPG",
  "Shrimp garlic pasta": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Shrimp_and_basil_pesto_pasta_1.jpg/500px-Shrimp_and_basil_pesto_pasta_1.jpg",
  "Black bean burgers": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Fancy_Veggie_Burger_and_Fries_-_Joe%27s_Burger_House_2024-07-07.jpg/500px-Fancy_Veggie_Burger_and_Fries_-_Joe%27s_Burger_House_2024-07-07.jpg",
  "Chocolate mousse": "https://www.themealdb.com/images/media/meals/uttuxy1511382180.jpg",
  "Apple crumble": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/British_apple_crumble_02.jpg/500px-British_apple_crumble_02.jpg",
  "Hummus & veg plate": "https://www.themealdb.com/images/media/meals/gpon5u1763801180.jpg",
  "Energy bites": "https://live.staticflickr.com/4149/5223552600_298e768160_b.jpg",
};

export const RECIPES: Recipe[] = raw.map((r, id) => ({
  ...r,
  id: `local-${id}`,
  serves: 1,
  ingredients: r.ingredients.map((item) => {
    const spec = AMOUNTS[r.title]?.[item.name];
    return spec ? { ...item, qty: spec[0], unit: spec[1] } : item;
  }),
  steps: STEPS[r.title],
  photo: PHOTOS[r.title] ?? r.photo,
}));

function prettyCount(q: number) {
  const halves = Math.round(q * 2) / 2;
  if (halves <= 0.25) return "a little";
  if (halves === 0.5) return "1/2";
  if (Number.isInteger(halves)) return String(halves);
  return String(halves);
}

function scaleMeasure(measure: string, factor: number) {
  if (Math.abs(factor - 1) < 0.05) return measure;
  return measure.replace(/(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/g, (token) => {
    const bits = token.trim().split(/\s+/);
    const value = bits.reduce((sum, bit) => {
      const [a, b] = bit.split("/");
      if (b) return sum + Number(a) / Number(b);
      return sum + Number(a);
    }, 0);
    if (!Number.isFinite(value)) return token;
    const next = value * factor;
    return next >= 10 ? String(Math.round(next)) : String(Math.round(next * 10) / 10);
  });
}

export function formatIngredient(ing: Ingredient, people: number, serves = 1) {
  const factor = Math.max(1, people) / Math.max(1, serves);
  if (ing.measure) return scaleMeasure(ing.measure, factor);
  const known = QTY[ing.name];
  const qty = ing.qty ?? known?.[0];
  const unit = ing.unit ?? known?.[1];
  if (qty == null || !unit) return "as written";
  const q = qty * factor;
  if (unit === "g" || unit === "ml") return `${Math.max(5, Math.round(q / 5) * 5)} ${unit}`;
  if (unit === "tbsp" || unit === "tsp") return `${prettyCount(q)} ${unit}`;
  if (unit === "slice") return `${prettyCount(q)} slices`;
  if (unit === "clove") return `${prettyCount(q)} cloves`;
  return prettyCount(q);
}

export function ingredientAmount(name: string, people: number) {
  return formatIngredient({ name, aisle: "Pantry" }, people, 1);
}

export function method(r: Recipe, people: number): { title: string; body: string; minutes: number }[] {
  const written =
    r.steps?.length && !stepsLookGeneric(r.steps)
      ? r.steps
      : stepsForDish(
          r.title,
          r.ingredients.map((item) => item.name),
          r.minutes,
        );
  return written.map((item) => ({
    ...item,
    body: item.body.replaceAll("{people}", String(people)),
  }));
}
