import { createServerFn } from "@tanstack/react-start";

export type FoodCard = { code: string; title: string; photo: string };

export const fetchFoodPage = createServerFn({ method: "GET" })
  .validator((page: number) => Math.max(1, Math.min(200, Math.round(Number(page) || 1))))
  .handler(async ({ data: page }) => {
    const url = `https://world.openfoodfacts.net/api/v2/search?page_size=100&page=${page}&fields=code,product_name,image_front_small_url&states_tags=en:front-photo-selected`;
    const res = await fetch(url, { headers: { "User-Agent": "WeekPlate/1.0 (personal meal planner)" } });
    if (!res.ok) return [] as FoodCard[];
    const json = (await res.json()) as {
      products?: { code?: string; product_name?: string; image_front_small_url?: string }[];
    };
    return (json.products ?? []).flatMap((product) => {
      const title = product.product_name?.trim();
      const photo = product.image_front_small_url;
      if (!product.code || !title || !photo) return [];
      return [{ code: product.code, title, photo }];
    });
  });

const PHRASES = [
  "pizza",
  "pasta",
  "chicken",
  "beef",
  "steak",
  "curry",
  "lasagna",
  "tacos",
  "hamburger",
  "kebab",
  "sushi",
  "paella",
  "rendang",
  "fajitas",
  "poke",
  "seafood",
  "fish",
  "pork",
  "lamb",
  "turkey",
  "duck",
  "bacon",
  "sausage",
  "ribs",
  "pie",
  "cake",
  "pudding",
  "salad",
  "masala",
  "hummus",
  "tofu",
  "potato",
  "tomato",
  "mushrooms",
  "broccoli",
  "carrot",
  "chickpea",
  "lentil",
  "bean",
  "pepperoni",
  "croissant",
  "arepas",
  "pierogi",
  "donuts",
];

export type DishCard = { id: string; title: string; photo: string };
export type DishDetail = DishCard & { minutes: number; servings: number; ingredients: string[] };

function https(url: string) {
  return url.replace(/^http:\/\//, "https://");
}

export const fetchDishBatch = createServerFn({ method: "GET" })
  .validator((page: number) => Math.max(0, Math.min(12, Math.round(Number(page) || 0))))
  .handler(async ({ data: page }) => {
    const slice = PHRASES.slice(page * 4, page * 4 + 4);
    const groups = await Promise.all(
      slice.map(async (query) => {
        try {
          const res = await fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${encodeURIComponent(query)}`, {
            headers: { "User-Agent": "WeekPlate/1.0 (personal meal planner)" },
          });
          if (!res.ok) return [] as DishCard[];
          const json = (await res.json()) as { data?: { recipes?: { id?: string; title?: string; image_url?: string }[] } };
          return (json.data?.recipes ?? []).flatMap((recipe) => {
            const title = recipe.title?.trim();
            const photo = recipe.image_url ? https(recipe.image_url) : "";
            if (!recipe.id || !title || !photo) return [];
            return [{ id: recipe.id, title, photo }];
          });
        } catch {
          return [] as DishCard[];
        }
      }),
    );
    const seen = new Set<string>();
    return groups.flat().filter((recipe) => {
      if (seen.has(recipe.id)) return false;
      seen.add(recipe.id);
      return true;
    });
  });

export const fetchDish = createServerFn({ method: "GET" })
  .validator((id: string) => id.replace(/[^a-z0-9]/gi, "").slice(0, 40))
  .handler(async ({ data: id }): Promise<DishDetail | null> => {
    const res = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`, {
      headers: { "User-Agent": "WeekPlate/1.0 (personal meal planner)" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        recipe?: {
          id?: string;
          title?: string;
          image_url?: string;
          cooking_time?: number;
          servings?: number;
          ingredients?: { description?: string }[];
        };
      };
    };
    const recipe = json.data?.recipe;
    const title = recipe?.title?.trim();
    const photo = recipe?.image_url ? https(recipe.image_url) : "";
    if (!recipe?.id || !title || !photo) return null;
    return {
      id: recipe.id,
      title,
      photo,
      minutes: recipe.cooking_time || 30,
      servings: recipe.servings || 4,
      ingredients: (recipe.ingredients ?? []).map((item) => item.description?.trim() || "").filter(Boolean),
    };
  });
