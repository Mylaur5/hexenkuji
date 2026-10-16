import { load } from "@tauri-apps/plugin-store";
import { TIERS, TIER_BY_ID } from "./tiers.js";
import { SLIPS, SLIP_BY_ID } from "./slips.js";

// Persisted as fortunes.json in the app data dir:
// { shrine: [{ date, tier }], theater: [{ season, date, slipId }], region }
// Counts are always derived from these logs.

let file = null;

const DEFAULT_REGION = "europe";

export const data = $state({ shrine: [], theater: [], region: DEFAULT_REGION, ready: false, error: "" });

const pad = (n) => String(n).padStart(2, "0");

// Genshin's day rolls over at 04:00 server time, and servers don't observe DST.
export const REGIONS = [
  { id: "europe", name: "Europe", offset: 1 },
  { id: "america", name: "America", offset: -5 },
  { id: "asia", name: "Asia", offset: 8 },
  { id: "tw-hk-mo", name: "TW, HK, MO", offset: 8 },
];
const REGION_BY_ID = new Map(REGIONS.map((r) => [r.id, r]));
const RESET_HOUR = 4;

// The current game day, so a draw at 01:00 still counts for the previous day.
// Seasons (seasonOf) derive from this too, so Theater flips at 04:00 on the 1st.
export function today() {
  const offset = REGION_BY_ID.get(data.region).offset;
  const d = new Date(Date.now() + (offset - RESET_HOUR) * 3600000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export const seasonOf = (date) => date.slice(0, 7);

async function save() {
  try {
    await file.set("shrine", $state.snapshot(data.shrine));
    await file.set("theater", $state.snapshot(data.theater));
    await file.set("region", data.region);
    await file.save();
  } catch (e) {
    data.error = `Could not save: ${e}`;
  }
}

export async function init() {
  try {
    file = await load("fortunes.json", { autoSave: false, defaults: {} });
    data.shrine = (await file.get("shrine")) ?? [];
    data.theater = (await file.get("theater")) ?? [];
    const region = await file.get("region");
    data.region = REGION_BY_ID.has(region) ? region : DEFAULT_REGION;
  } catch (e) {
    data.error = `Could not load: ${e}`;
  }
  data.ready = true;
}

export async function setRegion(region) {
  if (!REGION_BY_ID.has(region)) return;
  data.region = region;
  await save();
}

// --- shrine -----------------------------------------------------------

export function shrineCounts() {
  const counts = Object.fromEntries(TIERS.map((t) => [t.id, 0]));
  for (const e of data.shrine) if (e.tier in counts) counts[e.tier]++;
  return counts;
}

export const hasShrineOn = (date) => data.shrine.some((e) => e.date === date);

export async function addShrine(tier, date = today()) {
  if (!TIER_BY_ID.has(tier)) return;
  data.shrine.push({ date, tier });
  await save();
}

export async function removeShrine(entry) {
  data.shrine = data.shrine.filter((e) => e !== entry);
  await save();
}

// --- theater ----------------------------------------------------------

export function theaterCounts() {
  const counts = new Map(SLIPS.map((s) => [s.id, 0]));
  for (const e of data.theater) if (counts.has(e.slipId)) counts.set(e.slipId, counts.get(e.slipId) + 1);
  return counts;
}

export const theaterIn = (season) => data.theater.find((e) => e.season === season);

export async function addTheater(slipId, date = today()) {
  if (!SLIP_BY_ID.has(slipId)) return;
  const season = seasonOf(date);
  // One slip per season: replace any existing entry for the same month.
  data.theater = data.theater.filter((e) => e.season !== season);
  data.theater.push({ season, date, slipId });
  data.theater.sort((a, b) => a.date.localeCompare(b.date));
  await save();
}

export async function removeTheater(entry) {
  data.theater = data.theater.filter((e) => e !== entry);
  await save();
}

// --- backup -----------------------------------------------------------

export function exportJson() {
  return JSON.stringify({ shrine: data.shrine, theater: data.theater }, null, 2);
}

export async function importJson(text) {
  const parsed = JSON.parse(text);
  const shrine = (parsed.shrine ?? []).filter((e) => e?.date && TIER_BY_ID.has(e.tier));
  const theater = (parsed.theater ?? []).filter((e) => e?.date && SLIP_BY_ID.has(e.slipId));
  data.shrine = shrine.map(({ date, tier }) => ({ date, tier }));
  data.theater = theater.map(({ date, slipId }) => ({ season: seasonOf(date), date, slipId }));
  await save();
  return { shrine: shrine.length, theater: theater.length };
}
