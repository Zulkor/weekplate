import { createServerFn } from "@tanstack/react-start";
import type { Diet, Favorite, KcalMode, Person, Slot } from "@/state/kitchen";

export type ShareBody = {
  diet: Diet;
  equipment: string[];
  extraGear: string[];
  pantry: string[];
  table: Person[];
  kcalMode: KcalMode;
  kcal: number;
  dayKcal: (number | null)[];
  plan: (Slot | null)[][];
  hideOwned: boolean;
  favorites: Favorite[];
  shopDays: boolean[];
};

function codeOk(code: string) {
  return /^[a-f0-9]{32}$/.test(code);
}

export const loadKitchen = createServerFn({ method: "GET" })
  .validator((code: string) => code)
  .handler(async ({ data: code }) => {
    if (!codeOk(code)) return null;
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ state: string; updated_at: string }>`
      select state, updated_at::text as updated_at from kitchens where code = ${code}
    `;
    const row = rows[0];
    if (!row) return null;
    try {
      return { state: JSON.parse(row.state) as ShareBody, updatedAt: row.updated_at };
    } catch {
      return null;
    }
  });

export const saveKitchen = createServerFn({ method: "POST" })
  .validator((input: { code: string; state: ShareBody }) => input)
  .handler(async ({ data }) => {
    if (!codeOk(data.code) || !data.state || typeof data.state !== "object") return { ok: false as const, updatedAt: "" };
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      const rows = await sql<{ updated_at: string }>`
        insert into kitchens (code, state)
        values (${data.code}, ${JSON.stringify(data.state)})
        on conflict (code) do update set state = excluded.state, updated_at = now()
        returning updated_at::text as updated_at
      `;
      return { ok: true as const, updatedAt: rows[0]?.updated_at ?? "" };
    } catch {
      return { ok: false as const, updatedAt: "" };
    }
  });
