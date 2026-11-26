export type CookStep = { title: string; body: string; minutes: number };

export function cleanName(raw: string) {
  return raw
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/[®™*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function stepsLookGeneric(steps?: { body: string }[]) {
  if (!steps?.length) return true;
  return steps.some((step) =>
    /normally would|amounts below|with those ingredients|usually cooked|main ingredient|vegetables are tender|open the recipe again|set the table/i.test(step.body),
  );
}

function namesOf(ingredients: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of ingredients) {
    const name = cleanName(raw)
      .replace(/^(for the|to make the)[^:]+:/i, "")
      .replace(/^\d+([./]\d+)?\s*/, "")
      .trim();
    const key = name.toLowerCase();
    if (name.length < 2 || name.length > 90 || seen.has(key)) continue;
    if (/^salt and pepper|^to taste$|^optional$/i.test(name)) continue;
    seen.add(key);
    out.push(name);
  }
  return out.slice(0, 8);
}

function list(items: string[]) {
  if (!items.length) return "the ingredients";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function pick(items: string[], pattern: RegExp) {
  return items.filter((item) => pattern.test(item.toLowerCase()));
}

export function splitInstructions(text: string): CookStep[] {
  const clean = cleanName(text).replace(/\s*\n\s*/g, "\n").trim();
  if (!clean) return [];
  const lines = clean
    .split(/\n+|(?=STEP\s*\d+)/i)
    .map((line) => line.replace(/^STEP\s*\d+[:.)-]?\s*/i, "").trim())
    .filter(Boolean);
  const parts: string[] = [];
  for (const line of lines) {
    if (line.length <= 320) {
      parts.push(line);
      continue;
    }
    const bits = line.split(/(?<=[.!?])\s+/);
    let buf = "";
    for (const bit of bits) {
      if (buf && buf.length + bit.length > 300) {
        parts.push(buf);
        buf = bit;
      } else buf = buf ? `${buf} ${bit}` : bit;
    }
    if (buf) parts.push(buf);
  }
  const merged: string[] = [];
  for (const part of parts) {
    if (merged.length && merged[merged.length - 1].length < 70) merged[merged.length - 1] += ` ${part}`;
    else merged.push(part);
  }
  const kept = merged.filter((part) => part.length > 8);
  const limited = kept.length > 10 ? [...kept.slice(0, 9), kept.slice(9).join(" ")] : kept;
  const each = Math.max(2, Math.round(20 / Math.max(1, limited.length)));
  return limited.map((body, index) => ({ title: `Step ${index + 1}`, body, minutes: each }));
}

export function stepsForDish(title: string, ingredients: string[], minutes = 30): CookStep[] {
  const items = namesOf(ingredients);
  const name = title.toLowerCase();
  const wet = pick(items, /milk|cream|yogurt|juice|water|buttermilk|half-and-half/);
  const fat = pick(items, /butter|oil|ghee/);
  const eggs = pick(items, /\begg/);
  const flour = pick(items, /flour|oat|cornmeal|spelt/);
  const sweet = pick(items, /sugar|honey|syrup|maple/);
  const fruit = pick(items, /banana|berry|berries|blueberry|mango|apple|peach|pineapple|passion|strawberry|pear|cherry|nectarine|papaya/);
  const veg = pick(items, /onion|pepper|spinach|tomato|mushroom|zucchini|asparagus|potato|kale|avocado|jalap/);
  const protein = pick(items, /bacon|ham|sausage|salmon|chicken|chorizo|turkey|beef|tofu/);
  const cheese = pick(items, /cheese|cheddar|feta|parmesan|ricotta|gruyere|mozzarella/);
  const bread = pick(items, /bread|toast|croissant|tortilla|bun|muffin/);
  const time = Math.max(8, minutes || 30);

  const step = (label: string, body: string, share: number): CookStep => ({ title: label, body, minutes: Math.max(1, Math.round(time * share)) });

  if (/smoothie|lassi/.test(name)) {
    return [
      step("Load", `Put ${list(fruit.length ? fruit : items.slice(0, 4))} in a blender.`, 0.2),
      step("Blend", `Add ${list(wet.length ? wet : ["a splash of milk or water"])} and blend until completely smooth. Add ice only if you want it colder.`, 0.6),
      step("Serve", "Pour it straight away. If it is too thick, blend in another splash of liquid.", 0.2),
    ];
  }
  if (/granola bar|no-bake/.test(name)) {
    return [
      step("Warm", `Melt ${list(fat.length ? fat : ["a little butter"])} with ${list(sweet.length ? sweet : ["honey"])} until it loosens.`, 0.25),
      step("Mix", `Stir in ${list(flour.length ? flour : items)}. Press the mixture into a lined tin.`, 0.35),
      step("Set", "Chill until firm, then cut into bars. Do not bake these.", 0.4),
    ];
  }
  if (/granola/.test(name)) {
    return [
      step("Heat", "Heat the oven to 160 °C and line a tray.", 0.15),
      step("Toss", `Mix ${list(flour.length ? flour : items)} with ${list([...fat, ...sweet].slice(0, 3) || ["a spoon of oil"])} so every flake is coated.`, 0.25),
      step("Bake", "Spread it thin. Bake until golden, stirring once, then cool on the tray until it turns crisp.", 0.6),
    ];
  }
  if (/muffin/.test(name)) {
    return [
      step("Heat", "Heat the oven to 180 °C. Line a muffin tin.", 0.15),
      step("Mix", `Stir ${list(flour.length ? flour : ["the dry ingredients"])} in one bowl. In another, mix ${list([...eggs, ...wet, ...fat].slice(0, 4) || items.slice(0, 3))}.`, 0.25),
      step("Fold", `Fold the wet into the dry until just combined. Add ${list(fruit.length ? fruit : items.slice(-2))} now. Lumpy batter is right. Smooth batter makes tough muffins.`, 0.2),
      step("Bake", "Fill the cups about two-thirds full. Bake until a skewer comes out clean, then cool 5 minutes before lifting them out.", 0.4),
    ];
  }
  if (/french toast|pain perdu/.test(name)) {
    return [
      step("Custard", `Whisk ${list(eggs.length ? eggs : ["the eggs"])} with ${list(wet.length ? wet : ["milk"])}${sweet.length ? ` and ${list(sweet)}` : ""}.`, 0.2),
      step("Soak", `Dip ${list(bread.length ? bread : ["the bread"])} until it is soaked through but still holds together.`, 0.25),
      step("Fry", `Heat ${list(fat.length ? fat : ["butter"])} in a pan. Cook both sides until deep golden.`, 0.4),
      step("Serve", fruit.length ? `Serve with ${list(fruit)}.` : "Serve hot, with syrup if you want it.", 0.15),
    ];
  }
  if (/pancake|dutch baby|hotcake/.test(name)) {
    return [
      step("Batter", `Whisk ${list(eggs.length ? eggs : ["the eggs"])} with ${list(wet.length ? wet : ["milk"])}, then stir in ${list(flour.length ? flour : ["the flour"])} until the batter is thick but pourable.`, 0.3),
      step("Cook", `Heat a pan with ${list(fat.length ? fat : ["a little oil"])}. Cook small rounds until the top looks set and bubbles stay open, then flip and cook until golden.`, 0.5),
      step("Serve", fruit.length || sweet.length ? `Serve with ${list([...fruit, ...sweet].slice(0, 3))}.` : "Stack and serve while hot.", 0.2),
    ];
  }
  if (/waffle/.test(name)) {
    return [
      step("Batter", `Whisk ${list([...eggs, ...wet].slice(0, 3) || ["the wet ingredients"])}, then fold in ${list(flour.length ? flour : items.slice(0, 3))}.`, 0.3),
      step("Cook", "Heat the waffle iron. Cook until the steam slows and the waffle is crisp and lifts cleanly.", 0.55),
      step("Serve", "Keep them on a rack, not a stack, so they stay crisp.", 0.15),
    ];
  }
  if (/porridge|oatmeal|overnight oat|oat bowl/.test(name)) {
    if (/overnight/.test(name)) {
      return [
        step("Stir", `Mix ${list(flour.length ? flour : ["the oats"])} with ${list(wet.length ? wet : ["milk"])} in a jar.`, 0.3),
        step("Chill", "Cover and leave in the fridge overnight, at least 2 hours.", 0.4),
        step("Top", fruit.length ? `Stir and top with ${list(fruit)}.` : "Stir before eating. Add fruit if you have it.", 0.3),
      ];
    }
    return [
      step("Simmer", `Put ${list(flour.length ? flour : ["the oats"])} and ${list(wet.length ? wet : ["water or milk"])} in a pan. Bring to a simmer, stirring.`, 0.55),
      step("Finish", `Cook until creamy, not dry. Sweeten with ${list(sweet.length ? sweet : ["a little honey if you want"])} and top with ${list(fruit.length ? fruit : ["whatever fruit you have"])}.`, 0.45),
    ];
  }
  if (/quinoa/.test(name) && /breakfast|porridge|bowl/.test(name)) {
    return [
      step("Simmer", `Rinse the quinoa. Simmer it in ${list(wet.length ? wet : ["water"])} until the grains are tender and the liquid is gone.`, 0.6),
      step("Top", `Stir in ${list([...sweet, ...fruit].slice(0, 4) || items.slice(-3))} and serve warm.`, 0.4),
    ];
  }
  if (/benedict/.test(name)) {
    return [
      step("Base", `Toast ${list(bread.length ? bread : ["the bread"])}. Warm ${list(protein.length ? protein : ["the ham or bacon"])}.`, 0.3),
      step("Poach", "Simmer water with a splash of vinegar. Slide the eggs in and cook until the white is set and the yolk is still soft.", 0.45),
      step("Stack", "Bread, then meat, then egg. Spoon over any sauce in the ingredients and serve at once.", 0.25),
    ];
  }
  if (/frittata|omelet|omelette|scramble/.test(name)) {
    return [
      step("Eggs", `Beat ${list(eggs.length ? eggs : ["the eggs"])} with a pinch of salt.`, 0.15),
      step("Base", veg.length || protein.length ? `Cook ${list([...protein, ...veg].slice(0, 4))} in a pan with a little oil until tender.` : "Heat a pan with a little oil or butter.", 0.35),
      step("Set", `Pour in the eggs. For a scramble, stir until just set. For an omelette or frittata, let it set, add ${list(cheese.length ? cheese : ["nothing else"])} if you have it, and fold or finish under a lid.`, 0.5),
    ];
  }
  if (/quesadilla|burrito|wrap/.test(name)) {
    return [
      step("Filling", `Cook ${list([...protein, ...eggs, ...veg].slice(0, 4) || items.slice(0, 3))} until the eggs are set and the vegetables are soft.`, 0.4),
      step("Fill", `Spoon it into ${list(bread.length ? bread : ["the tortillas"])}${cheese.length ? ` with ${list(cheese)}` : ""}. Fold a burrito, or close a quesadilla.`, 0.25),
      step("Toast", "Cook in a dry pan, turning once, until the outside is spotted and the cheese has melted.", 0.35),
    ];
  }
  if (/hash|home fry|potato/.test(name) && !/smoothie/.test(name)) {
    return [
      step("Potatoes", `Pan-fry ${list(pick(items, /potato|sweet/) .length ? pick(items, /potato|sweet/) : items.slice(0, 2))} in oil until they start to brown.`, 0.45),
      step("Add", veg.length || protein.length ? `Add ${list([...veg, ...protein].slice(0, 4))} and cook until everything is tender.` : "Season and cook until the edges are crisp.", 0.35),
      step("Eggs", eggs.length ? "Fry or poach the eggs and set them on top." : "Taste for salt and serve hot.", 0.2),
    ];
  }
  if (/casserole|strata|bake/.test(name)) {
    return [
      step("Heat", "Heat the oven to 180 °C and grease a baking dish.", 0.15),
      step("Layer", `Layer ${list(bread.length ? bread : items.slice(0, 3))} with ${list([...protein, ...cheese, ...veg].slice(0, 4) || items.slice(3, 6))}.`, 0.3),
      step("Pour", eggs.length || wet.length ? `Whisk ${list([...eggs, ...wet].slice(0, 3))} and pour it over so everything is soaked.` : "Add the remaining ingredients evenly.", 0.2),
      step("Bake", "Bake until the center is set and the top is browned. Rest 5 minutes before serving.", 0.35),
    ];
  }
  if (/sandwich|panini|toast|blt/.test(name)) {
    return [
      step("Toast", `Toast ${list(bread.length ? bread : ["the bread"])}.`, 0.25),
      step("Fillings", protein.length || eggs.length ? `Cook ${list([...protein, ...eggs].slice(0, 3))} until done. Slice ${list(veg.length ? veg : ["any fresh toppings"])}.` : `Prepare ${list(items.slice(0, 4))}.`, 0.45),
      step("Assemble", `Layer them on the bread${cheese.length ? `, with ${list(cheese)}` : ""}. Press in a pan if this is a panini. Otherwise serve immediately.`, 0.3),
    ];
  }
  if (/soup|stew|chili|curry|dal/.test(name)) {
    return [
      step("Base", `Soften ${list(veg.length ? veg.slice(0, 3) : items.slice(0, 2))} in oil.`, 0.25),
      step("Simmer", `Add ${list(items.slice(0, 6))} and enough water to cover. Simmer until everything is tender.`, 0.6),
      step("Finish", "Salt it at the end. It should taste rounded, not watery.", 0.15),
    ];
  }
  return [
    step("Prep", `Get ${list(items)} ready. Chop anything that needs it and measure the rest.`, 0.25),
    step("Cook", `Heat a pan with ${list(fat.length ? fat : ["a spoon of oil"])}. Start with ${list((protein.length ? protein : veg).slice(0, 3) || items.slice(0, 2))}, then add the rest and cook until hot through.`, 0.55),
    step("Finish", `Season, taste, and serve ${title}.`, 0.2),
  ];
}
