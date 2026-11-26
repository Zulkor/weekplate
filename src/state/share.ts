import { useKitchen, type State } from "@/state/kitchen";
import { loadKitchen, saveKitchen, type ShareBody } from "@/lib/kitchen-share";

export const SHARE_KEY = "weekplate-share";

export function shareCodeFromPage() {
  if (typeof window === "undefined") return "";
  const fromUrl = new URLSearchParams(window.location.search).get("k") ?? "";
  if (/^[a-f0-9]{32}$/.test(fromUrl)) return fromUrl;
  return localStorage.getItem(SHARE_KEY) ?? "";
}

export function rememberShareCode(code: string) {
  localStorage.setItem(SHARE_KEY, code);
  const url = new URL(window.location.href);
  url.searchParams.set("k", code);
  window.history.replaceState({}, "", url);
}

const PUBLIC_APP = "https://weekplate-mu.vercel.app";

export function shareLink(code: string) {
  const here = typeof window === "undefined" ? new URL(PUBLIC_APP) : new URL(window.location.href);
  const host = here.hostname;
  const onPublished = host === "weekplate-mu.vercel.app" || host.endsWith(".vercel.app");
  const url = new URL(onPublished ? here.origin : PUBLIC_APP);
  url.pathname = "/";
  url.search = "";
  url.searchParams.set("k", code);
  return url.toString();
}

export function newShareCode() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function snapshot(s: State): ShareBody {
  return {
    diet: s.diet,
    equipment: s.equipment,
    extraGear: s.extraGear,
    pantry: s.pantry,
    table: s.table,
    kcalMode: s.kcalMode,
    kcal: s.kcal,
    dayKcal: s.dayKcal,
    plan: s.plan,
    hideOwned: s.hideOwned,
    favorites: s.favorites,
    shopDays: s.shopDays,
  };
}

export function applyShare(body: ShareBody) {
  const current = useKitchen.getState();
  current.set({
    ...(body as Partial<State>),
    view: current.view,
    day: current.day,
    onboarded: true,
  });
}

let quiet = false;
let lastJson = "";

export async function pushShare(code: string) {
  if (!code || quiet) return "";
  const json = JSON.stringify(snapshot(useKitchen.getState()));
  if (json === lastJson) return "";
  const saved = await saveKitchen({ data: { code, state: snapshot(useKitchen.getState()) } });
  if (saved.ok) lastJson = json;
  return saved.updatedAt;
}

export async function pullShare(code: string) {
  const row = await loadKitchen({ data: code });
  if (!row?.state) return "";
  quiet = true;
  applyShare(row.state);
  lastJson = JSON.stringify(snapshot(useKitchen.getState()));
  quiet = false;
  return row.updatedAt;
}

export function shareIsQuiet() {
  return quiet;
}

export async function pullShareIfNewer(code: string, seen: string) {
  const row = await loadKitchen({ data: code });
  if (!row?.state || !row.updatedAt || row.updatedAt === seen) return seen;
  quiet = true;
  applyShare(row.state);
  lastJson = JSON.stringify(snapshot(useKitchen.getState()));
  quiet = false;
  return row.updatedAt;
}
