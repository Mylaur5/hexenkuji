import { load } from "@tauri-apps/plugin-store";
import { TIERS, TIER_BY_ID } from "./tiers.js";
import { SLIPS, SLIP_BY_ID } from "./slips.js";

// Persisted as fortunes.json in the app data dir:
// { shrine: [{ date, tier }], theater: [{ season, date, slipId }] }
// Counts are always derived from these logs.

let file = null;

export const data = $state({ shrine: [], theater: [], ready: false, error: "" });

const pad = (n) => String(n).padStart(2, "0");

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const seasonOf = (date) => date.slice(0, 7);

async function save() {
  try {
    await file.set("shrine", $state.snapshot(data.shrine));
    await file.set("theater", $state.snapshot(data.theater));
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
  } catch (e) {
    data.error = `Could not load: ${e}`;
  }
  data.ready = true;
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
