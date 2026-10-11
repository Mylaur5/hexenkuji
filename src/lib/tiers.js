// Grand Narukami Shrine fortune slip tiers, best to worst (wiki order).
export const TIERS = [
  { id: "great-fortune", name: "Great Fortune", kanji: "大吉", color: "#e8b923" },
  { id: "good-fortune", name: "Good Fortune", kanji: "吉", color: "#d9744a" },
  { id: "modest-fortune", name: "Modest Fortune", kanji: "小吉", color: "#7fb685" },
  { id: "rising-fortune", name: "Rising Fortune", kanji: "末吉", color: "#5aa9c7" },
  { id: "misfortune", name: "Misfortune", kanji: "凶", color: "#8a7fc4" },
  { id: "great-misfortune", name: "Great Misfortune", kanji: "大凶", color: "#6a3d8f" },
];

export const TIER_BY_ID = new Map(TIERS.map((t) => [t.id, t]));
