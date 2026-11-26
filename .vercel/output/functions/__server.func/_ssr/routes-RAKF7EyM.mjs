import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShoppingBasket, c as LockOpen, d as Check, f as CalendarDays, i as Shuffle, l as Flame, n as UtensilsCrossed, o as RefreshCw, s as Lock, t as X, u as ChefHat } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-RAKF7EyM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var p = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
var EQUIPMENT = [
	{
		id: "s",
		label: "Stovetop"
	},
	{
		id: "o",
		label: "Oven"
	},
	{
		id: "m",
		label: "Microwave"
	},
	{
		id: "a",
		label: "Air fryer"
	},
	{
		id: "i",
		label: "Instant Pot"
	},
	{
		id: "c",
		label: "Slow cooker"
	},
	{
		id: "b",
		label: "Blender"
	}
];
var ALLERGENS = [
	{
		id: "g",
		label: "Gluten"
	},
	{
		id: "d",
		label: "Dairy"
	},
	{
		id: "e",
		label: "Egg"
	},
	{
		id: "n",
		label: "Nuts"
	},
	{
		id: "s",
		label: "Soy"
	},
	{
		id: "f",
		label: "Fish & shellfish"
	}
];
var DIETS = [
	{
		id: "any",
		label: "Everything"
	},
	{
		id: "pesc",
		label: "Pescatarian"
	},
	{
		id: "veg",
		label: "Vegetarian"
	},
	{
		id: "vegan",
		label: "Vegan"
	}
];
var PANTRY = [
	"olive oil",
	"soy sauce",
	"honey",
	"rice",
	"pasta",
	"oats",
	"salt",
	"black pepper"
];
var SLOT_LABEL = [
	"Breakfast",
	"Lunch",
	"Dinner"
];
var RECIPES = [
	{
		cat: "B",
		title: "Blueberry oat pancakes",
		diet: "g",
		eq: ["s"],
		allergens: [
			"g",
			"d",
			"e"
		],
		ingredients: [
			{
				name: "oats",
				aisle: "Pantry"
			},
			{
				name: "blueberries",
				aisle: "Frozen"
			},
			{
				name: "eggs",
				aisle: "Dairy"
			},
			{
				name: "milk",
				aisle: "Dairy"
			}
		],
		kcal: 420,
		protein: 16,
		minutes: 20,
		photo: p("photo-1528207776546-365bb710ee93")
	},
	{
		cat: "B",
		title: "Avocado & egg toast",
		diet: "g",
		eq: ["s"],
		allergens: [
			"g",
			"d",
			"e"
		],
		ingredients: [
			{
				name: "sourdough",
				aisle: "Bakery"
			},
			{
				name: "avocado",
				aisle: "Produce"
			},
			{
				name: "eggs",
				aisle: "Dairy"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 440,
		protein: 18,
		minutes: 10,
		photo: p("photo-1525351484163-7529414344d8")
	},
	{
		cat: "B",
		title: "Shakshuka",
		diet: "g",
		eq: ["s"],
		allergens: ["e"],
		ingredients: [
			{
				name: "eggs",
				aisle: "Dairy"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "bell pepper",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			}
		],
		kcal: 380,
		protein: 20,
		minutes: 25,
		photo: p("photo-1590412200988-a436970781fa")
	},
	{
		cat: "B",
		title: "Greek yogurt parfait",
		diet: "g",
		eq: [],
		allergens: ["d", "n"],
		ingredients: [
			{
				name: "Greek yogurt",
				aisle: "Dairy"
			},
			{
				name: "granola",
				aisle: "Pantry"
			},
			{
				name: "berries",
				aisle: "Frozen"
			},
			{
				name: "honey",
				aisle: "Pantry"
			}
		],
		kcal: 400,
		protein: 26,
		minutes: 5,
		photo: p("photo-1488477181946-6428a0291777")
	},
	{
		cat: "B",
		title: "Veggie egg muffins",
		diet: "g",
		eq: ["o"],
		allergens: ["d", "e"],
		ingredients: [
			{
				name: "eggs",
				aisle: "Dairy"
			},
			{
				name: "spinach",
				aisle: "Produce"
			},
			{
				name: "bell pepper",
				aisle: "Produce"
			},
			{
				name: "feta",
				aisle: "Dairy"
			}
		],
		kcal: 320,
		protein: 22,
		minutes: 25,
		photo: p("photo-1482049016688-2d3e1b311543")
	},
	{
		cat: "B",
		title: "Overnight oats",
		diet: "v",
		eq: [],
		allergens: ["g"],
		ingredients: [
			{
				name: "oats",
				aisle: "Pantry"
			},
			{
				name: "oat milk",
				aisle: "Pantry"
			},
			{
				name: "chia",
				aisle: "Pantry"
			},
			{
				name: "berries",
				aisle: "Frozen"
			}
		],
		kcal: 380,
		protein: 12,
		minutes: 5,
		photo: p("photo-1517673132405-a56a62b18caf")
	},
	{
		cat: "B",
		title: "Tofu scramble",
		diet: "v",
		eq: ["s"],
		allergens: ["s"],
		ingredients: [
			{
				name: "tofu",
				aisle: "Proteins"
			},
			{
				name: "spinach",
				aisle: "Produce"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			}
		],
		kcal: 340,
		protein: 22,
		minutes: 15,
		photo: p("photo-1546069901-ba9599a7e63c")
	},
	{
		cat: "B",
		title: "Green smoothie",
		diet: "v",
		eq: ["b"],
		allergens: [],
		ingredients: [
			{
				name: "spinach",
				aisle: "Produce"
			},
			{
				name: "banana",
				aisle: "Produce"
			},
			{
				name: "protein powder",
				aisle: "Pantry"
			},
			{
				name: "oat milk",
				aisle: "Pantry"
			}
		],
		kcal: 340,
		protein: 22,
		minutes: 5,
		photo: p("photo-1610970881699-44a5587cabec")
	},
	{
		cat: "B",
		title: "Air-fryer breakfast burrito",
		diet: "g",
		eq: ["a"],
		allergens: [
			"g",
			"d",
			"e"
		],
		ingredients: [
			{
				name: "tortillas",
				aisle: "Bakery"
			},
			{
				name: "eggs",
				aisle: "Dairy"
			},
			{
				name: "black beans",
				aisle: "Pantry"
			},
			{
				name: "cheddar",
				aisle: "Dairy"
			}
		],
		kcal: 520,
		protein: 27,
		minutes: 20,
		photo: p("photo-1626700051175-6818013e1d4f")
	},
	{
		cat: "S",
		title: "Tomato basil soup",
		diet: "g",
		eq: ["s"],
		allergens: ["d"],
		ingredients: [
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			},
			{
				name: "basil",
				aisle: "Produce"
			},
			{
				name: "cream",
				aisle: "Dairy"
			}
		],
		kcal: 280,
		protein: 8,
		minutes: 30,
		photo: p("photo-1547592166-23ac45744acd")
	},
	{
		cat: "S",
		title: "Red lentil soup",
		diet: "v",
		eq: ["s"],
		allergens: [],
		ingredients: [
			{
				name: "red lentils",
				aisle: "Pantry"
			},
			{
				name: "carrot",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			}
		],
		kcal: 450,
		protein: 26,
		minutes: 35,
		photo: p("photo-1476718406336-bb5a9690ee2a")
	},
	{
		cat: "S",
		title: "Chicken noodle soup",
		diet: "m",
		eq: ["s"],
		allergens: ["g"],
		ingredients: [
			{
				name: "chicken",
				aisle: "Proteins"
			},
			{
				name: "noodles",
				aisle: "Pantry"
			},
			{
				name: "carrot",
				aisle: "Produce"
			},
			{
				name: "celery",
				aisle: "Produce"
			}
		],
		kcal: 420,
		protein: 32,
		minutes: 35,
		photo: p("photo-1604152135912-04a022e23696")
	},
	{
		cat: "S",
		title: "Miso soup with tofu",
		diet: "v",
		eq: ["s"],
		allergens: ["s"],
		ingredients: [
			{
				name: "miso",
				aisle: "Pantry"
			},
			{
				name: "tofu",
				aisle: "Proteins"
			},
			{
				name: "scallions",
				aisle: "Produce"
			},
			{
				name: "seaweed",
				aisle: "Pantry"
			}
		],
		kcal: 180,
		protein: 14,
		minutes: 15,
		photo: p("photo-1547592166-23ac45744acd")
	},
	{
		cat: "S",
		title: "Pumpkin soup",
		diet: "v",
		eq: ["s"],
		allergens: [],
		ingredients: [
			{
				name: "pumpkin",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			},
			{
				name: "coconut milk",
				aisle: "Pantry"
			},
			{
				name: "ginger",
				aisle: "Produce"
			}
		],
		kcal: 300,
		protein: 6,
		minutes: 35,
		photo: p("photo-1476718406336-bb5a9690ee2a")
	},
	{
		cat: "L",
		title: "Chickpea salad bowl",
		diet: "v",
		eq: [],
		allergens: [],
		ingredients: [
			{
				name: "chickpeas",
				aisle: "Pantry"
			},
			{
				name: "cucumber",
				aisle: "Produce"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 480,
		protein: 18,
		minutes: 15,
		photo: p("photo-1512621776951-a57141f2eefd")
	},
	{
		cat: "L",
		title: "Greek salad with feta",
		diet: "g",
		eq: [],
		allergens: ["d"],
		ingredients: [
			{
				name: "cucumber",
				aisle: "Produce"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "feta",
				aisle: "Dairy"
			},
			{
				name: "olives",
				aisle: "Pantry"
			}
		],
		kcal: 360,
		protein: 12,
		minutes: 10,
		photo: p("photo-1540189549336-e6e99c3679fe")
	},
	{
		cat: "L",
		title: "Tuna & white bean salad",
		diet: "f",
		eq: [],
		allergens: ["f"],
		ingredients: [
			{
				name: "tuna",
				aisle: "Proteins"
			},
			{
				name: "white beans",
				aisle: "Pantry"
			},
			{
				name: "cucumber",
				aisle: "Produce"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 470,
		protein: 35,
		minutes: 10,
		photo: p("photo-1546069901-ba9599a7e63c")
	},
	{
		cat: "L",
		title: "Quinoa & roasted veg",
		diet: "v",
		eq: ["o"],
		allergens: [],
		ingredients: [
			{
				name: "quinoa",
				aisle: "Pantry"
			},
			{
				name: "zucchini",
				aisle: "Produce"
			},
			{
				name: "bell pepper",
				aisle: "Produce"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 450,
		protein: 16,
		minutes: 35,
		photo: p("photo-1512621776951-a57141f2eefd")
	},
	{
		cat: "L",
		title: "Chicken Caesar wrap",
		diet: "m",
		eq: [],
		allergens: [
			"g",
			"d",
			"e"
		],
		ingredients: [
			{
				name: "chicken",
				aisle: "Proteins"
			},
			{
				name: "tortillas",
				aisle: "Bakery"
			},
			{
				name: "romaine",
				aisle: "Produce"
			},
			{
				name: "parmesan",
				aisle: "Dairy"
			}
		],
		kcal: 560,
		protein: 38,
		minutes: 15,
		photo: p("photo-1626700051175-6818013e1d4f")
	},
	{
		cat: "L",
		title: "Caprese salad",
		diet: "g",
		eq: [],
		allergens: ["d"],
		ingredients: [
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "mozzarella",
				aisle: "Dairy"
			},
			{
				name: "basil",
				aisle: "Produce"
			},
			{
				name: "olive oil",
				aisle: "Pantry"
			}
		],
		kcal: 340,
		protein: 16,
		minutes: 5,
		photo: p("photo-1592417817098-8fd3d9eb14a5")
	},
	{
		cat: "M",
		title: "Sheet-pan salmon & sweet potato",
		diet: "f",
		eq: ["o"],
		allergens: ["f"],
		ingredients: [
			{
				name: "salmon",
				aisle: "Proteins"
			},
			{
				name: "broccoli",
				aisle: "Produce"
			},
			{
				name: "sweet potato",
				aisle: "Produce"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 620,
		protein: 40,
		minutes: 35,
		photo: p("photo-1467003909585-2f8a72700288")
	},
	{
		cat: "M",
		title: "Air-fryer chicken thighs",
		diet: "m",
		eq: ["a"],
		allergens: [],
		ingredients: [
			{
				name: "chicken thighs",
				aisle: "Proteins"
			},
			{
				name: "broccoli",
				aisle: "Produce"
			},
			{
				name: "sweet potato",
				aisle: "Produce"
			},
			{
				name: "olive oil",
				aisle: "Pantry"
			}
		],
		kcal: 640,
		protein: 46,
		minutes: 35,
		photo: p("photo-1598103442097-8b74394b95c6")
	},
	{
		cat: "M",
		title: "Instant Pot chickpea curry",
		diet: "v",
		eq: ["i"],
		allergens: [],
		ingredients: [
			{
				name: "chickpeas",
				aisle: "Pantry"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "coconut milk",
				aisle: "Pantry"
			},
			{
				name: "rice",
				aisle: "Pantry"
			}
		],
		kcal: 600,
		protein: 20,
		minutes: 30,
		photo: p("photo-1585937421612-70a008356fbe")
	},
	{
		cat: "M",
		title: "Tofu & broccoli stir-fry",
		diet: "v",
		eq: ["s"],
		allergens: ["g", "s"],
		ingredients: [
			{
				name: "tofu",
				aisle: "Proteins"
			},
			{
				name: "broccoli",
				aisle: "Produce"
			},
			{
				name: "rice",
				aisle: "Pantry"
			},
			{
				name: "soy sauce",
				aisle: "Pantry"
			}
		],
		kcal: 540,
		protein: 30,
		minutes: 25,
		photo: p("photo-1512058564366-18510be2db19")
	},
	{
		cat: "M",
		title: "Slow-cooker turkey chili",
		diet: "m",
		eq: ["c"],
		allergens: [],
		ingredients: [
			{
				name: "turkey",
				aisle: "Proteins"
			},
			{
				name: "black beans",
				aisle: "Pantry"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			}
		],
		kcal: 580,
		protein: 44,
		minutes: 20,
		photo: p("photo-1455619452474-d2be8b1e70cd")
	},
	{
		cat: "M",
		title: "Pasta primavera",
		diet: "g",
		eq: ["s"],
		allergens: ["g", "d"],
		ingredients: [
			{
				name: "pasta",
				aisle: "Pantry"
			},
			{
				name: "broccoli",
				aisle: "Produce"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "parmesan",
				aisle: "Dairy"
			}
		],
		kcal: 590,
		protein: 22,
		minutes: 25,
		photo: p("photo-1473093295043-cdd812d0e601")
	},
	{
		cat: "M",
		title: "Baked cod with roasted veg",
		diet: "f",
		eq: ["o"],
		allergens: ["f"],
		ingredients: [
			{
				name: "cod",
				aisle: "Proteins"
			},
			{
				name: "broccoli",
				aisle: "Produce"
			},
			{
				name: "sweet potato",
				aisle: "Produce"
			},
			{
				name: "lemon",
				aisle: "Produce"
			}
		],
		kcal: 480,
		protein: 38,
		minutes: 35,
		photo: p("photo-1519708227418-c8fd9a32b7a2")
	},
	{
		cat: "M",
		title: "Beef tacos",
		diet: "m",
		eq: ["s"],
		allergens: ["g"],
		ingredients: [
			{
				name: "beef",
				aisle: "Proteins"
			},
			{
				name: "tortillas",
				aisle: "Bakery"
			},
			{
				name: "tomatoes",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			}
		],
		kcal: 650,
		protein: 36,
		minutes: 25,
		photo: p("photo-1565299585323-38d6b0865b47")
	},
	{
		cat: "M",
		title: "Mushroom risotto",
		diet: "g",
		eq: ["s"],
		allergens: ["d"],
		ingredients: [
			{
				name: "arborio rice",
				aisle: "Pantry"
			},
			{
				name: "mushrooms",
				aisle: "Produce"
			},
			{
				name: "onion",
				aisle: "Produce"
			},
			{
				name: "parmesan",
				aisle: "Dairy"
			}
		],
		kcal: 560,
		protein: 16,
		minutes: 40,
		photo: p("photo-1476124369491-e7addf5db371")
	},
	{
		cat: "M",
		title: "Chicken tikka bowl",
		diet: "m",
		eq: ["o"],
		allergens: ["d"],
		ingredients: [
			{
				name: "chicken",
				aisle: "Proteins"
			},
			{
				name: "yogurt",
				aisle: "Dairy"
			},
			{
				name: "rice",
				aisle: "Pantry"
			},
			{
				name: "cucumber",
				aisle: "Produce"
			}
		],
		kcal: 620,
		protein: 45,
		minutes: 35,
		photo: p("photo-1565557623262-b51c2513a641")
	},
	{
		cat: "M",
		title: "Shrimp garlic pasta",
		diet: "f",
		eq: ["s"],
		allergens: ["g", "f"],
		ingredients: [
			{
				name: "shrimp",
				aisle: "Proteins"
			},
			{
				name: "pasta",
				aisle: "Pantry"
			},
			{
				name: "garlic",
				aisle: "Produce"
			},
			{
				name: "parsley",
				aisle: "Produce"
			}
		],
		kcal: 560,
		protein: 34,
		minutes: 20,
		photo: p("photo-1563379926898-05f4575a45d8")
	},
	{
		cat: "M",
		title: "Black bean burgers",
		diet: "v",
		eq: ["a"],
		allergens: ["g"],
		ingredients: [
			{
				name: "black beans",
				aisle: "Pantry"
			},
			{
				name: "oats",
				aisle: "Pantry"
			},
			{
				name: "onion",
				aisle: "Produce"
			},
			{
				name: "buns",
				aisle: "Bakery"
			}
		],
		kcal: 540,
		protein: 22,
		minutes: 25,
		photo: p("photo-1550547660-d9450f859349")
	},
	{
		cat: "D",
		title: "Chocolate mousse",
		diet: "g",
		eq: [],
		allergens: ["d"],
		ingredients: [
			{
				name: "dark chocolate",
				aisle: "Pantry"
			},
			{
				name: "cream",
				aisle: "Dairy"
			},
			{
				name: "sugar",
				aisle: "Pantry"
			}
		],
		kcal: 320,
		protein: 5,
		minutes: 10,
		photo: p("photo-1541783245831-57d6fb0926d3")
	},
	{
		cat: "D",
		title: "Apple crumble",
		diet: "g",
		eq: ["o"],
		allergens: ["g", "d"],
		ingredients: [
			{
				name: "apples",
				aisle: "Produce"
			},
			{
				name: "oats",
				aisle: "Pantry"
			},
			{
				name: "butter",
				aisle: "Dairy"
			},
			{
				name: "sugar",
				aisle: "Pantry"
			}
		],
		kcal: 360,
		protein: 5,
		minutes: 40,
		photo: p("photo-1568571780765-9276ac8b75a2")
	},
	{
		cat: "K",
		title: "Hummus & veg plate",
		diet: "v",
		eq: [],
		allergens: [],
		ingredients: [
			{
				name: "hummus",
				aisle: "Pantry"
			},
			{
				name: "carrot",
				aisle: "Produce"
			},
			{
				name: "cucumber",
				aisle: "Produce"
			},
			{
				name: "pita",
				aisle: "Bakery"
			}
		],
		kcal: 260,
		protein: 9,
		minutes: 5,
		photo: p("photo-1577805947697-89e18249d767")
	},
	{
		cat: "K",
		title: "Energy bites",
		diet: "v",
		eq: [],
		allergens: ["n"],
		ingredients: [
			{
				name: "oats",
				aisle: "Pantry"
			},
			{
				name: "dates",
				aisle: "Pantry"
			},
			{
				name: "peanut butter",
				aisle: "Pantry"
			},
			{
				name: "cocoa",
				aisle: "Pantry"
			}
		],
		kcal: 200,
		protein: 6,
		minutes: 10,
		photo: p("photo-1495147466023-ac5c588e2e94")
	}
].map((r, id) => ({
	...r,
	id
}));
function macros(r) {
	const fat = Math.round(r.kcal * .32 / 9);
	return {
		fat,
		carbs: Math.max(0, Math.round((r.kcal - r.protein * 4 - fat * 9) / 4)),
		fiber: 2 + r.ingredients.filter((i) => i.aisle === "Produce" || i.aisle === "Frozen").length * 2
	};
}
var QTY = {
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
	garlic: [2, "clove"]
};
function ingredientAmount(name, people) {
	const base = QTY[name] ?? [120, "g"];
	const q = base[0] * people;
	if (base[1] === "g") return `${Math.round(q / 10) * 10} g`;
	if (base[1] === "slice") return `${q} slices`;
	if (base[1] === "clove") return `${q} cloves`;
	return `${q}`;
}
function method(r, people) {
	const names = r.ingredients.map((i) => i.name).join(", ");
	const heat = r.eq.includes("a") ? "Heat the air fryer to 200 °C." : r.eq.includes("o") ? "Heat the oven to 200 °C." : r.eq.includes("i") ? "Set the Instant Pot to Sauté and warm a spoon of oil." : r.eq.includes("c") ? "Set the slow cooker to Low." : r.eq.includes("b") ? "Set the blender jug on the base." : "Warm a wide pan over medium heat with a spoon of olive oil.";
	return [
		{
			title: "Set the table for two",
			body: `You are cooking ${r.title} for ${people}. Gather ${names}, plus salt and pepper.`,
			minutes: 2
		},
		{
			title: "Heat",
			body: heat,
			minutes: r.eq.length ? 3 : 0
		},
		{
			title: "Cook",
			body: `Cook until the main ingredient is done and the vegetables are tender. Season in the pan, not only at the table. Target time is about ${r.minutes} minutes.`,
			minutes: Math.max(5, r.minutes - 5)
		},
		{
			title: "Plate",
			body: "Split onto warm plates. Finish with lemon, herbs, or a drizzle of oil if you have them. Taste once more.",
			minutes: 2
		}
	];
}
var dietOk = (diet, tag) => diet === "any" || diet === "pesc" && tag !== "m" || diet === "veg" && (tag === "g" || tag === "v") || diet === "vegan" && tag === "v";
function fits(r, s) {
	if (!dietOk(s.diet, r.diet)) return false;
	if (r.allergens.some((a) => s.allergens.includes(a))) return false;
	if (!r.eq.every((e) => s.equipment.includes(e))) return false;
	return true;
}
function pool(slot, s) {
	return RECIPES.filter((r) => {
		if (!fits(r, s)) return false;
		if (slot === 0) return r.cat === "B";
		if (slot === 1) return r.cat === "S" || r.cat === "L" || r.cat === "K";
		return r.cat === "M";
	});
}
function pick(slot, s, used) {
	const list = pool(slot, s).filter((r) => !used.has(r.id));
	const source = list.length ? list : pool(slot, s);
	if (!source.length) return null;
	const target = s.kcal * [
		.25,
		.35,
		.4
	][slot];
	const ranked = [...source].sort((a, b) => {
		const score = (r) => -Math.abs(r.kcal - target) + r.ingredients.filter((i) => s.pantry.includes(i.name)).length * 40;
		return score(b) - score(a);
	});
	return ranked[Math.floor(Math.random() * Math.min(3, ranked.length))];
}
var useKitchen = create()(persist((set, get) => ({
	diet: "any",
	allergens: [],
	equipment: [
		"s",
		"o",
		"a"
	],
	pantry: [
		"olive oil",
		"rice",
		"oats",
		"salt"
	],
	kcal: 2700,
	people: 2,
	onboarded: false,
	step: 0,
	plan: Array.from({ length: 7 }, () => [
		null,
		null,
		null
	]),
	day: ((/* @__PURE__ */ new Date()).getDay() + 6) % 7,
	view: "today",
	hideOwned: false,
	set: (p) => set(p),
	toggle: (key, value) => set((s) => ({ [key]: s[key].includes(value) ? s[key].filter((x) => x !== value) : [...s[key], value] })),
	build: () => {
		const s = get();
		const used = /* @__PURE__ */ new Set();
		set({
			plan: s.plan.map((row) => row.map((slot, i) => {
				if (slot?.locked && RECIPES[slot.id] && fits(RECIPES[slot.id], s)) {
					used.add(slot.id);
					return slot;
				}
				const r = pick(i, s, used);
				if (!r) return null;
				used.add(r.id);
				return {
					id: r.id,
					locked: false
				};
			})),
			onboarded: true,
			view: "today"
		});
	},
	swap: (day, slot, id) => set((s) => {
		const plan = s.plan.map((row) => row.slice());
		plan[day][slot] = {
			id,
			locked: false
		};
		return { plan };
	}),
	lock: (day, slot) => set((s) => {
		const plan = s.plan.map((row) => row.slice());
		const cur = plan[day][slot];
		if (cur) plan[day][slot] = {
			...cur,
			locked: !cur.locked
		};
		return { plan };
	}),
	suggest: (day, slot) => {
		const s = get();
		const current = s.plan[day][slot]?.id;
		const options = pool(slot, s).filter((r) => r.id !== current);
		const r = options[Math.floor(Math.random() * options.length)] ?? pool(slot, s)[0];
		if (r) get().swap(day, slot, r.id);
	}
}), { name: "weekplate-v1" }));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function monday() {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - (d.getDay() + 6) % 7);
	d.setHours(0, 0, 0, 0);
	return d;
}
function dayDate(i) {
	const d = new Date(monday());
	d.setDate(d.getDate() + i);
	return d;
}
function dayTotals(plan, day) {
	return plan[day].reduce((a, slot) => {
		if (!slot) return a;
		const r = RECIPES[slot.id];
		const m = macros(r);
		a.k += r.kcal;
		a.p += r.protein;
		a.f += m.fat;
		a.fi += m.fiber;
		return a;
	}, {
		k: 0,
		p: 0,
		f: 0,
		fi: 0
	});
}
function Photo({ recipe, className }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid place-items-center bg-olive-soft text-olive", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "size-8" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: recipe.photo,
		alt: recipe.title,
		className: cn("object-cover", className),
		loading: "lazy",
		onError: () => setFailed(true)
	});
}
function Chip({ on, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: cn("min-h-11 rounded-full border px-4 py-2 text-sm transition", on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink hover:border-olive"),
		children
	});
}
function WeekPlate() {
	const s = useKitchen();
	const [open, setOpen] = (0, import_react.useState)(null);
	const [cook, setCook] = (0, import_react.useState)(false);
	const [swapOpen, setSwapOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [toast, setToast] = (0, import_react.useState)("");
	const flash = (t) => {
		setToast(t);
		window.setTimeout(() => setToast(""), 2200);
	};
	if (!s.onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboard, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-full bg-saffron text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-none",
							children: "WeekPlate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "For the two of you"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-olive px-4 text-sm font-medium text-bg",
						onClick: () => {
							s.build();
							flash("Week rebuilt. Locked meals stayed.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Rebuild week"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-5 pb-28 pt-6",
				children: [
					s.view === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Today, { onOpen: setOpen }),
					s.view === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Week, { onOpen: (day) => {
						s.set({
							day,
							view: "today"
						});
					} }),
					s.view === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {}),
					s.view === "kitchen" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kitchen, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-3 py-2 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-lg justify-between",
					children: [
						[
							"today",
							"Today",
							CalendarDays
						],
						[
							"week",
							"Week",
							UtensilsCrossed
						],
						[
							"shop",
							"Shop",
							ShoppingBasket
						],
						[
							"kitchen",
							"Kitchen",
							ChefHat
						]
					].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-current": s.view === id ? "page" : void 0,
						onClick: () => s.set({ view: id }),
						className: cn("flex min-h-12 min-w-16 flex-col items-center justify-center gap-1 rounded-2xl px-3 text-xs", s.view === id ? "bg-ink text-bg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
					}, id))
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipeSheet, {
				day: open.day,
				slot: open.slot,
				cook,
				onCook: () => setCook(true),
				onClose: () => {
					setOpen(null);
					setCook(false);
					setSwapOpen(false);
				},
				onSwap: () => {
					setQuery("");
					setSwapOpen(true);
				},
				onLock: () => {
					s.lock(open.day, open.slot);
					flash("Lock updated.");
				}
			}),
			swapOpen && open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapSheet, {
				slot: open.slot,
				query,
				setQuery,
				onClose: () => setSwapOpen(false),
				onPick: (id) => {
					s.swap(open.day, open.slot, id);
					setSwapOpen(false);
				},
				onSuggest: () => {
					s.suggest(open.day, open.slot);
					setSwapOpen(false);
				}
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-bg",
				children: toast
			})
		]
	});
}
function Today({ onOpen }) {
	const s = useKitchen();
	const t = dayTotals(s.plan, s.day);
	const pct = Math.min(1, t.k / s.kcal);
	const c = 2 * Math.PI * 42;
	const date = dayDate(s.day);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: date.toLocaleDateString("en", {
				weekday: "long",
				month: "long",
				day: "numeric"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl sm:text-5xl",
			children: "Today’s plate"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex gap-2 overflow-x-auto pb-2",
			children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": i === s.day,
				onClick: () => s.set({ day: i }),
				className: cn("min-w-16 rounded-2xl border px-3 py-2 text-center", i === s.day ? "border-ink bg-ink text-bg" : "border-line bg-surface"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs",
					children: dayDate(i).toLocaleDateString("en", { weekday: "short" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg",
					children: dayDate(i).getDate()
				})]
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 sm:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "96",
						height: "96",
						viewBox: "0 0 96 96",
						"aria-label": `${t.k} of ${s.kcal} calories`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "48",
							cy: "48",
							r: "42",
							fill: "none",
							stroke: "var(--color-line)",
							strokeWidth: "8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "48",
							cy: "48",
							r: "42",
							fill: "none",
							stroke: "var(--color-saffron)",
							strokeWidth: "8",
							strokeLinecap: "round",
							strokeDasharray: `${pct * c} ${c}`,
							transform: "rotate(-90 48 48)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: t.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"of ",
							s.kcal,
							" kcal each"
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "Protein",
					value: t.p,
					target: Math.round(s.kcal * .22 / 4),
					unit: "g"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "Fiber",
					value: t.fi,
					target: Math.round(s.kcal / 1e3 * 14),
					unit: "g"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "Fat",
					value: t.f,
					target: Math.round(s.kcal * .3 / 9),
					unit: "g"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-4 md:grid-cols-3",
			children: s.plan[s.day].map((slot, i) => {
				if (!slot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-3xl border border-dashed border-line bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: SLOT_LABEL[i]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "Nothing fits those filters. Add equipment in Kitchen."
					})]
				}, i);
				const r = RECIPES[slot.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-3xl border border-line bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "block w-full text-left",
						onClick: () => onOpen({
							day: s.day,
							slot: i
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
							recipe: r,
							className: "h-48 w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted",
									children: [
										SLOT_LABEL[i],
										" · ",
										r.minutes,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: r.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										r.kcal,
										" kcal · ",
										r.protein,
										" g protein · for ",
										s.people
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 px-4 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => onOpen({
								day: s.day,
								slot: i
							}),
							children: "Open"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4 text-sm",
							onClick: () => s.lock(s.day, i),
							children: [slot.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-4" }), slot.locked ? "Locked" : "Lock"]
						})]
					})]
				}, i);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Numbers are per person, estimated from ingredients. Locked plates stay when you rebuild."
		})
	] });
}
function Meter({ label, value, target, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-2xl",
				children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-base text-muted",
					children: [
						" ",
						"/ ",
						target,
						unit
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-2 overflow-hidden rounded-full bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-olive",
					style: { width: `${Math.min(100, value / target * 100)}%` }
				})
			})
		]
	});
}
function Week({ onOpen }) {
	const s = useKitchen();
	const avg = Math.round(Array.from({ length: 7 }, (_, d) => dayTotals(s.plan, d).k).reduce((a, b) => a + b, 0) / 7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl sm:text-5xl",
			children: "Your week"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-muted",
			children: [
				"Averaging ",
				avg,
				" of ",
				s.kcal,
				" kcal a day, per person."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: s.plan.map((row, d) => {
				const t = dayTotals(s.plan, d);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(d),
					className: "rounded-3xl border border-line bg-surface p-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: dayDate(d).toLocaleDateString("en", { weekday: "long" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex",
							children: row.map((slot, i) => slot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
								recipe: RECIPES[slot.id],
								className: "-mr-3 size-16 rounded-full border-2 border-surface"
							}, i) : null)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								t.k,
								" kcal · ",
								t.p,
								" g protein"
							]
						})
					]
				}, d);
			})
		})
	] });
}
function Shop() {
	const s = useKitchen();
	const lines = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		s.plan.forEach((day) => day.forEach((slot) => {
			if (!slot) return;
			RECIPES[slot.id].ingredients.forEach((ing) => {
				const cur = map.get(ing.name);
				map.set(ing.name, {
					name: ing.name,
					aisle: ing.aisle,
					people: (cur?.people ?? 0) + s.people
				});
			});
		}));
		return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
	}, [s.plan, s.people]);
	const groups = [
		"Produce",
		"Proteins",
		"Dairy",
		"Pantry",
		"Frozen",
		"Bakery"
	];
	const need = lines.filter((l) => !s.pantry.includes(l.name)).length;
	const copy = async () => {
		const text = lines.filter((l) => !s.pantry.includes(l.name)).map((l) => `☐ ${l.name} — ${ingredientAmount(l.name, l.people / Math.max(1, lines.filter((x) => x.name === l.name).length))}`).join("\n");
		try {
			await navigator.clipboard.writeText(text);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl sm:text-5xl",
			children: "Shopping"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-muted",
			children: [
				need,
				" to buy · ",
				lines.length - need,
				" already home · scaled for ",
				s.people
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				on: s.hideOwned,
				onClick: () => s.set({ hideOwned: !s.hideOwned }),
				children: "Hide what we have"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-full bg-ink px-4 text-sm text-bg",
				onClick: copy,
				children: "Copy list"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 max-w-xl",
			children: groups.map((g) => {
				const items = lines.filter((l) => l.aisle === g && !(s.hideOwned && s.pantry.includes(l.name)));
				if (!items.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: g
					}), items.map((item) => {
						const have = s.pantry.includes(item.name);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-12 items-center gap-3 border-b border-line py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "size-5 accent-olive",
									checked: have,
									onChange: () => s.toggle("pantry", item.name)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex-1", have && "text-muted line-through"),
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: ingredientAmount(item.name, s.people)
								})
							]
						}, item.name);
					})]
				}, g);
			})
		})
	] });
}
function Kitchen() {
	const s = useKitchen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl sm:text-5xl",
				children: "Your kitchen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Filters apply the next time you rebuild the week."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prefs, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-8 min-h-12 rounded-full bg-olive px-6 text-bg",
				onClick: s.build,
				children: "Rebuild with these"
			})
		]
	});
}
function Prefs() {
	const s = useKitchen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "How you eat"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: DIETS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				on: s.diet === d.id,
				onClick: () => s.set({ diet: d.id }),
				children: d.label
			}, d.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Allergies"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: ALLERGENS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				on: s.allergens.includes(a.id),
				onClick: () => s.toggle("allergens", a.id),
				children: a.label
			}, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Equipment"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: EQUIPMENT.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				on: s.equipment.includes(e.id),
				onClick: () => s.toggle("equipment", e.id),
				children: e.label
			}, e.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Already at home"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: PANTRY.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				on: s.pantry.includes(p),
				onClick: () => s.toggle("pantry", p),
				children: p
			}, p))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Calories a day, each"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			min: 1200,
			max: 4e3,
			step: 50,
			value: s.kcal,
			"aria-label": "Calories a day",
			onChange: (e) => s.set({ kcal: Math.min(4e3, Math.max(1200, Number(e.target.value) || 2e3)) }),
			className: "mt-3 w-40 rounded-2xl border border-line bg-surface px-4 py-3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "A surplus around 2700 fits growth at about 67 kg if you train. Not medical advice."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "People at the table"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full border border-line",
					onClick: () => s.set({ people: Math.max(1, s.people - 1) }),
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl",
					children: s.people
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full border border-line",
					onClick: () => s.set({ people: Math.min(4, s.people + 1) }),
					children: "+"
				})
			]
		})
	] });
}
function Onboard() {
	const s = useKitchen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-xl bg-bg px-5 py-12 text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex gap-2",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 flex-1 rounded-full", i <= s.step ? "bg-ink" : "bg-line") }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "WeekPlate · just the two of you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: [
					"What do you eat?",
					"What’s in the kitchen?",
					"How much, and for whom?"
				][s.step]
			}),
			s.step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "How you eat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: DIETS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: s.diet === d.id,
						onClick: () => s.set({ diet: d.id }),
						children: d.label
					}, d.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Allergies"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: ALLERGENS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: s.allergens.includes(a.id),
						onClick: () => s.toggle("allergens", a.id),
						children: a.label
					}, a.id))
				})
			] }),
			s.step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Equipment"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: EQUIPMENT.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: s.equipment.includes(e.id),
						onClick: () => s.toggle("equipment", e.id),
						children: e.label
					}, e.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Already at home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: PANTRY.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						on: s.pantry.includes(p),
						onClick: () => s.toggle("pantry", p),
						children: p
					}, p))
				})
			] }),
			s.step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Calories a day, each"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: 1200,
					max: 4e3,
					value: s.kcal,
					onChange: (e) => s.set({ kcal: Math.min(4e3, Math.max(1200, Number(e.target.value) || 2700)) }),
					className: "mt-3 w-40 rounded-2xl border border-line bg-surface px-4 py-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "People eating"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full border border-line",
							onClick: () => s.set({ people: Math.max(1, s.people - 1) }),
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl",
							children: s.people
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full border border-line",
							onClick: () => s.set({ people: Math.min(4, s.people + 1) }),
							children: "+"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex gap-2",
				children: [s.step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-12 rounded-full border border-line px-5",
					onClick: () => s.set({ step: s.step - 1 }),
					children: "Back"
				}), s.step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-12 rounded-full bg-ink px-5 text-bg",
					onClick: () => s.set({ step: s.step + 1 }),
					children: "Continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-12 rounded-full bg-olive px-5 text-bg",
					onClick: s.build,
					children: "Build our week"
				})]
			})
		]
	});
}
function RecipeSheet({ day, slot, cook, onCook, onClose, onSwap, onLock }) {
	const s = useKitchen();
	const meal = s.plan[day][slot];
	const [step, setStep] = (0, import_react.useState)(0);
	const [left, setLeft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (left == null) return;
		if (left <= 0) return;
		const id = window.setInterval(() => setLeft((n) => n == null ? n : n - 1), 1e3);
		return () => window.clearInterval(id);
	}, [left]);
	if (!meal) return null;
	const r = RECIPES[meal.id];
	const n = macros(r);
	const steps = method(r, s.people);
	const current = steps[step];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-ink/50 sm:items-center",
		role: "dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-bg p-5 sm:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: SLOT_LABEL[slot]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: r.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full border border-line",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), !cook ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
					recipe: r,
					className: "mt-4 h-56 w-full rounded-3xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-5 gap-2 text-center text-xs text-muted",
					children: [
						[r.kcal, "kcal"],
						[r.protein, "protein"],
						[n.carbs, "carbs"],
						[n.fat, "fat"],
						[n.fiber, "fiber"]
					].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-surface py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block font-display text-lg text-ink",
							children: v
						}), l]
					}, String(l)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Per person. Sample estimates for home cooking."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-full bg-olive px-4 text-bg",
							onClick: onCook,
							children: "Start cooking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4",
							onClick: onSwap,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), " Swap"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 items-center gap-1 rounded-full border border-line px-4",
							onClick: onLock,
							children: [meal.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-4" }), meal.locked ? "Locked" : "Lock"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mt-6 font-display text-xl",
					children: ["Ingredients for ", s.people]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2",
					children: r.ingredients.map((ing) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between border-b border-line py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [ing.name, s.pantry.includes(ing.name) ? " · have" : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: ingredientAmount(ing.name, s.people)
						})]
					}, ing.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 font-display text-xl",
					children: "Method"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 list-decimal space-y-3 pl-5",
					children: steps.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: st.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: st.body
					})] }, st.title))
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Step ",
							step + 1,
							" of ",
							steps.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 overflow-hidden rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-saffron",
							style: { width: `${(step + 1) / steps.length * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-display text-3xl",
						children: current.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg",
						children: current.body
					}),
					current.minutes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-5xl",
							children: left == null ? `${current.minutes}:00` : `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, "0")}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 min-h-11 rounded-full border border-line px-4",
							onClick: () => setLeft(current.minutes * 60),
							children: left == null ? "Start timer" : "Restart timer"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-full border border-line px-5",
							disabled: step === 0,
							onClick: () => {
								setStep((n) => n - 1);
								setLeft(null);
							},
							children: "Back"
						}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-full bg-ink px-5 text-bg",
							onClick: () => {
								setStep((n) => n + 1);
								setLeft(null);
							},
							children: "Next step"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-12 items-center gap-2 rounded-full bg-olive px-5 text-bg",
							onClick: onClose,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Finish"]
						})]
					})
				]
			})]
		})
	});
}
function SwapSheet({ slot, query, setQuery, onClose, onPick, onSuggest }) {
	const s = useKitchen();
	const list = RECIPES.filter((r) => {
		return (slot === 0 ? r.cat === "B" : slot === 1 ? r.cat !== "M" && r.cat !== "D" : r.cat === "M" || r.cat === "D") && r.title.toLowerCase().includes(query.toLowerCase()) && fits(r, s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-bg p-5 sm:rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-2xl",
						children: ["Swap ", SLOT_LABEL[slot].toLowerCase()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full border border-line",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search dishes",
						className: "min-h-11 flex-1 rounded-2xl border border-line bg-surface px-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-full bg-olive px-4 text-sm text-bg",
						onClick: onSuggest,
						children: "Surprise us"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2",
					children: [list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-2 text-left",
						onClick: () => onPick(r.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, {
							recipe: r,
							className: "size-16 rounded-xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								r.kcal,
								" kcal · ",
								r.protein,
								" g protein · ",
								r.minutes,
								" min"
							]
						})] })]
					}) }, r.id)), !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing matches. Relax a filter in Kitchen."
					})]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekPlate, {});
}
//#endregion
export { Home as component };
