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
let liveRev = 0;

function revKey(code: string) {
  return `weekplate-rev-${code}`;
}

function readRev(code: string) {
  if (typeof window === "undefined") return 0;
  const n = Number(localStorage.getItem(revKey(code)) || 0);
  return Number.isFinite(n) ? n : 0;
}

function writeRev(code: string, rev: number) {
  liveRev = rev;
  localStorage.setItem(revKey(code), String(rev));
}

async function packState(json: string) {
  if (json.length <= 3500 || typeof CompressionStream === "undefined") return json;
  try {
    const bytes = new TextEncoder().encode(json);
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"));
    const packed = new Uint8Array(await new Response(stream).arrayBuffer());
    let bin = "";
    for (let i = 0; i < packed.length; i += 1) bin += String.fromCharCode(packed[i]);
    const out = `gz:${btoa(bin)}`;
    return out.length <= 3900 ? out : json;
  } catch {
    return json;
  }
}

async function unpackState(message: string, attachmentUrl?: string) {
  let text = message;
  if (attachmentUrl && (!text || text.startsWith("You received"))) {
    text = await fetch(attachmentUrl).then((res) => res.text());
  }
  if (text.startsWith("gz:")) {
    const raw = atob(text.slice(3));
    const bytes = Uint8Array.from(raw, (ch) => ch.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    text = await new Response(stream).text();
  }
  return JSON.parse(text) as ShareBody;
}

function topicUrl(code: string) {
  return `https://ntfy.sh/wp${code}`;
}

export async function publishKitchen(code: string, rev = readRev(code) || Date.now()) {
  if (!code || quiet) return rev;
  const json = JSON.stringify(snapshot(useKitchen.getState()));
  if (json === lastJson && rev <= liveRev) return rev;
  const body = await packState(json);
  const saved = await fetch(topicUrl(code), {
    method: "POST",
    body,
    headers: { Title: String(rev), "Content-Type": "text/plain" },
  }).catch(() => null);
  if (saved?.ok) {
    lastJson = json;
    writeRev(code, rev);
  }
  void saveKitchen({ data: { code, state: snapshot(useKitchen.getState()) } }).catch(() => undefined);
  return rev;
}

async function ingest(code: string, rev: number, message: string, attachmentUrl?: string) {
  if (!rev || rev <= readRev(code)) return false;
  const state = await unpackState(message, attachmentUrl).catch(() => null);
  if (!state?.plan) return false;
  quiet = true;
  applyShare(state);
  lastJson = JSON.stringify(snapshot(useKitchen.getState()));
  writeRev(code, rev);
  quiet = false;
  return true;
}

async function pullKitchen(code: string) {
  const res = await fetch(`${topicUrl(code)}/json?poll=1&since=all`).catch(() => null);
  if (!res?.ok) return false;
  const lines = (await res.text()).split("\n").filter(Boolean);
  let applied = false;
  for (const line of lines) {
    try {
      const row = JSON.parse(line) as { event?: string; title?: string; message?: string; attachment?: { url?: string } };
      if (row.event && row.event !== "message") continue;
      applied = (await ingest(code, Number(row.title), row.message ?? "", row.attachment?.url)) || applied;
    } catch {
      /* skip a bad line */
    }
  }
  return applied;
}

export function startKitchenSync(code: string) {
  if (typeof window === "undefined" || !code) return () => {};
  let timer = 0;
  let stopped = false;
  let ready = false;
  const bump = () => {
    if (!ready || quiet || stopped) return;
    const json = JSON.stringify(snapshot(useKitchen.getState()));
    if (json === lastJson) return;
    writeRev(code, Date.now());
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      void publishKitchen(code);
    }, 250);
  };
  const unsub = useKitchen.subscribe(bump);
  const source = new EventSource(`${topicUrl(code)}/sse`);
  source.onmessage = (event) => {
    try {
      const row = JSON.parse(event.data) as { event?: string; title?: string; message?: string; attachment?: { url?: string } };
      if (row.event && row.event !== "message") return;
      void ingest(code, Number(row.title), row.message ?? "", row.attachment?.url);
    } catch {
      /* ignore keepalives */
    }
  };
  const poll = window.setInterval(() => {
    if (!document.hidden) void pullKitchen(code);
  }, 2000);
  const onVisible = () => {
    if (document.visibilityState === "visible") void pullKitchen(code);
  };
  document.addEventListener("visibilitychange", onVisible);
  void (async () => {
    await pullKitchen(code);
    ready = true;
    if (stopped) return;
    const json = JSON.stringify(snapshot(useKitchen.getState()));
    if (json !== lastJson) await publishKitchen(code, Date.now());
  })();
  return () => {
    stopped = true;
    unsub();
    source.close();
    document.removeEventListener("visibilitychange", onVisible);
    window.clearTimeout(timer);
    window.clearInterval(poll);
  };
}

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
