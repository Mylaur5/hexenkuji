<script>
  import { TIERS, TIER_BY_ID } from "$lib/tiers.js";
  import { data, today, shrineCounts, hasShrineOn, addShrine, removeShrine } from "$lib/store.svelte.js";

  let counts = $derived(shrineCounts());
  let total = $derived(data.shrine.length);
  let date = $state(today());
  let pending = $state(null); // tier id awaiting "add anyway"
  let recent = $derived([...data.shrine].reverse().slice(0, 8));

  // Luck score: tiers are evenly spaced from 100 (Great Fortune) to 0 (Great Misfortune).
  const score = (tierId) => 100 - TIERS.findIndex((t) => t.id === tierId) * 20;
  const isBad = (tierId) => tierId === "misfortune" || tierId === "great-misfortune";

  const daysAgo = (date) => Math.round((new Date(today()) - new Date(date)) / 86400000);

  let stats = $derived.by(() => {
    if (!data.shrine.length) return null;
    const sorted = [...data.shrine].sort((a, b) => a.date.localeCompare(b.date));
    const luck = Math.round(sorted.reduce((s, e) => s + score(e.tier), 0) / sorted.length);
    const bad = sorted.filter((e) => isBad(e.tier)).length;

    let best = 0;
    let run = 0;
    for (const e of sorted) {
      run = isBad(e.tier) ? 0 : run + 1;
      best = Math.max(best, run);
    }

    const last = (tier) => [...sorted].reverse().find((e) => e.tier === tier)?.date;
    return {
      luck,
      goodPct: Math.round(((sorted.length - bad) / sorted.length) * 100),
      streak: run,
      best,
      lastGreat: last("great-fortune"),
      lastCurse: last("great-misfortune"),
    };
  });

  const ago = (date) => {
    if (!date) return "never";
    const n = daysAgo(date);
    return `${date} (${n === 0 ? "today" : `${n}d ago`})`;
  };

  async function pick(id) {
    if (hasShrineOn(date) && pending !== id) {
      pending = id;
      return;
    }
    pending = null;
    await addShrine(id, date);
  }
</script>

<section>
  <h2>Grand Narukami Shrine <small>daily · {total} drawn</small></h2>

  <label class="date">Date <input type="date" bind:value={date} onchange={() => (pending = null)} /></label>

  {#if hasShrineOn(date)}
    <p class="note">Already logged for {date}. Tap a tier twice to add another.</p>
  {/if}

  <div class="tiers">
    {#each TIERS as t (t.id)}
      <button class="tier" class:confirm={pending === t.id} style="--c:{t.color}" onclick={() => pick(t.id)}>
        <span class="kanji">{t.kanji}</span>
        <span class="name">{pending === t.id ? "Add anyway?" : t.name}</span>
        <span class="count">{counts[t.id]}</span>
        <span class="pct">{total ? Math.round((counts[t.id] / total) * 100) : 0}%</span>
        <span class="bar" style="width:{total ? (counts[t.id] / total) * 100 : 0}%"></span>
      </button>
    {/each}
  </div>

  {#if stats}
    <dl class="stats">
      <dt>Luck</dt>
      <dd>
        <span class="meter"><span style="width:{stats.luck}%"></span></span>
        {stats.luck} / 100
      </dd>
      <dt>Fortunate draws</dt>
      <dd>{stats.goodPct}% not a misfortune</dd>
      <dt>Streak</dt>
      <dd>{stats.streak} without misfortune · best {stats.best}</dd>
      <dt>Last Great Fortune</dt>
      <dd>{ago(stats.lastGreat)}</dd>
      <dt>Last Great Misfortune</dt>
      <dd>{ago(stats.lastCurse)}</dd>
    </dl>
  {/if}

  {#if recent.length}
    <ul class="log">
      {#each recent as e (e)}
        <li>
          <span>{e.date}</span>
          <span style="color:{TIER_BY_ID.get(e.tier).color}">{TIER_BY_ID.get(e.tier).name}</span>
          <button class="x" title="Delete" onclick={() => removeShrine(e)}>×</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .date {
    display: block;
    margin-bottom: 0.6rem;
    font-size: 0.85rem;
    color: var(--dim);
  }
  .note {
    margin: 0 0 0.6rem;
    font-size: 0.8rem;
    color: var(--gold);
  }
  .tiers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .tier {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "k n c" "k n p";
    align-items: center;
    column-gap: 0.6rem;
    padding: 0.55rem 0.7rem;
    text-align: left;
    background: var(--panel);
    border: 1px solid color-mix(in srgb, var(--c) 55%, transparent);
    border-left: 4px solid var(--c);
    border-radius: 6px;
    color: var(--ink);
    cursor: pointer;
  }
  .tier:hover {
    background: color-mix(in srgb, var(--c) 18%, var(--panel));
  }
  .tier.confirm {
    outline: 2px solid var(--c);
  }
  .kanji {
    grid-area: k;
    font-size: 1.5rem;
    color: var(--c);
  }
  .name {
    grid-area: n;
    font-size: 0.85rem;
  }
  .count {
    grid-area: c;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: right;
  }
  .pct {
    grid-area: p;
    font-size: 0.7rem;
    color: var(--dim);
    text-align: right;
  }
  .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background: var(--c);
  }
  .stats {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 0.9rem;
    margin: 0.9rem 0 0;
    padding: 0.6rem 0.8rem;
    background: var(--panel);
    border-left: 3px solid var(--gold);
    border-radius: 6px;
    font-size: 0.8rem;
  }
  .stats dt {
    color: var(--dim);
  }
  .stats dd {
    margin: 0;
  }
  .meter {
    display: inline-block;
    vertical-align: middle;
    width: 6rem;
    height: 6px;
    margin-right: 0.4rem;
    background: var(--line);
    border-radius: 3px;
    overflow: hidden;
  }
  .meter span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #6a3d8f, #e8b923);
  }
  .log {
    list-style: none;
    margin: 0.8rem 0 0;
    padding: 0;
    font-size: 0.8rem;
  }
  .log li {
    display: grid;
    grid-template-columns: 6.5rem 1fr auto;
    padding: 0.15rem 0;
    border-bottom: 1px solid var(--line);
  }
</style>
