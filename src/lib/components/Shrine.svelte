<script>
  import { TIERS, TIER_BY_ID } from "$lib/tiers.js";
  import { OBJECTS, OBJECT_BY_ID, objectsOf, isBad, VARIANTS } from "$lib/shrine-slips.js";
  import {
    data, today, shrineCounts, objectCounts, hasShrineOn, addShrine, removeShrine, setHung, variantOf, toggleVariant,
  } from "$lib/store.svelte.js";

  let counts = $derived(shrineCounts());
  let total = $derived(data.shrine.length);
  let date = $state(today());
  let objCounts = $derived(objectCounts());
  let seen = $derived([...objCounts.values()].filter(Boolean).length);
  let pending = $state(null); // "tier:<id>" or "object:<id>" awaiting "add anyway"
  let open = $state(null); // log entry whose slip message is shown
  let recent = $derived([...data.shrine].reverse().slice(0, 8));

  // Luck score: tiers are evenly spaced from 100 (Great Fortune) to 0 (Great Misfortune).
  const score = (tierId) => 100 - TIERS.findIndex((t) => t.id === tierId) * 20;

  const daysAgo = (date) => Math.round((new Date(today()) - new Date(date)) / 86400000);

  let stats = $derived.by(() => {
    if (!data.shrine.length) return null;
    const sorted = [...data.shrine].sort((a, b) => a.date.localeCompare(b.date));
    const luck = Math.round(sorted.reduce((s, e) => s + score(e.tier), 0) / sorted.length);
    const bad = sorted.filter((e) => isBad(e.tier)).length;
    const hung = sorted.filter((e) => e.hung).length;

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
      bad,
      hung,
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

  async function pick(kind, id) {
    const key = `${kind}:${id}`;
    if (hasShrineOn(date) && pending !== key) {
      pending = key;
      return;
    }
    pending = null;
    const entry = await addShrine({ [kind]: id }, date);
    if (entry?.object) open = entry;
  }
</script>

<section>
  <h2>Grand Narukami Shrine <small>daily · {total} drawn · {seen} / {OBJECTS.length} objects</small></h2>

  <label class="date">Date <input type="date" bind:value={date} onchange={() => (pending = null)} /></label>

  {#if hasShrineOn(date)}
    <p class="note">Already logged for {date}. Tap twice to add another.</p>
  {/if}

  <p class="hint">Tap the lucky object on your slip, or the tier if you don't remember it.</p>

  <div class="tiers">
    {#each TIERS as t (t.id)}
      <div class="row" style="--c:{t.color}">
        <button class="tier" class:confirm={pending === `tier:${t.id}`} onclick={() => pick("tier", t.id)}>
          <span class="kanji">{t.kanji}</span>
          <span class="name">{pending === `tier:${t.id}` ? "Add anyway?" : t.name}</span>
          <span class="count">{counts[t.id]}</span>
          <span class="pct">{total ? Math.round((counts[t.id] / total) * 100) : 0}%</span>
          <span class="bar" style="width:{total ? (counts[t.id] / total) * 100 : 0}%"></span>
        </button>
        <div class="objs">
          {#each objectsOf(t.id) as o (o.id)}
            <button
              class="obj"
              class:seen={objCounts.get(o.id)}
              class:confirm={pending === `object:${o.id}`}
              title={o.name}
              onclick={() => pick("object", o.id)}
            >
              {pending === `object:${o.id}` ? "Add anyway?" : o.short}
              {#if objCounts.get(o.id)}<span class="n">×{objCounts.get(o.id)}</span>{/if}
            </button>
          {/each}
        </div>
      </div>
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
      {#if stats.bad}
        <dt>Hung up</dt>
        <dd>{stats.hung} of {stats.bad} misfortunes tied to the hanger</dd>
      {/if}
      <dt>Last Great Fortune</dt>
      <dd>{ago(stats.lastGreat)}</dd>
      <dt>Last Great Misfortune</dt>
      <dd>{ago(stats.lastCurse)}</dd>
    </dl>
  {/if}

  {#if recent.length}
    <ul class="log">
      {#each recent as e (e)}
        {@const obj = OBJECT_BY_ID.get(e.object)}
        <li>
          <span>{e.date}</span>
          <span>
            <span style="color:{TIER_BY_ID.get(e.tier).color}">{TIER_BY_ID.get(e.tier).name}</span>
            {#if obj}
              · <button class="link" onclick={() => (open = open === e ? null : e)}>{obj.name}</button>
            {/if}
          </span>
          {#if isBad(e.tier)}
            <button
              class="hang"
              class:on={e.hung}
              title={e.hung ? "Tied to the Fortune Slip Hanger" : "Tie it to the Fortune Slip Hanger"}
              onclick={() => setHung(e, !e.hung)}
            >
              {e.hung ? "結 hung" : "hang up"}
            </button>
          {:else}
            <span></span>
          {/if}
          <button class="x" title="Delete" onclick={() => removeShrine(e)}>×</button>
        </li>
        {#if open === e && obj}
          <li class="slip" style="--c:{TIER_BY_ID.get(e.tier).color}">
            <p class="text">{obj.text}</p>
            <p class="lore"><strong>Your lucky object for the day: {obj.name}</strong>{"\n"}{obj.lore}</p>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}

  <h3>Quest slips <small>{data.variants.length} / {VARIANTS.length}</small></h3>
  <ul class="variants">
    {#each VARIANTS as v (v.id)}
      {@const got = variantOf(v.id)}
      <li>
        <label>
          <input type="checkbox" checked={!!got} onchange={() => toggleVariant(v.id)} />
          <span>{v.name}</span>
          {#if v.source}<small>{v.source}</small>{/if}
        </label>
        {#if got}<span class="dim">{got.date}</span>{/if}
      </li>
    {/each}
  </ul>
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
  .hint {
    margin: 0 0 0.6rem;
    font-size: 0.75rem;
    color: var(--dim);
  }
  .tiers {
    display: grid;
    gap: 0.5rem;
  }
  .row {
    display: grid;
    gap: 0.3rem;
  }
  .objs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding-left: 0.6rem;
  }
  .obj {
    padding: 0.2rem 0.55rem;
    background: transparent;
    border: 1px dashed color-mix(in srgb, var(--c) 45%, transparent);
    border-radius: 999px;
    color: var(--dim);
    font-family: inherit;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .obj.seen {
    border-style: solid;
    color: var(--ink);
  }
  .obj:hover {
    background: color-mix(in srgb, var(--c) 18%, transparent);
  }
  .obj.confirm {
    outline: 2px solid var(--c);
  }
  .obj .n {
    margin-left: 0.25rem;
    color: var(--c);
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
    grid-template-columns: 6.5rem 1fr auto auto;
    align-items: center;
    gap: 0.4rem;
    padding: 0.15rem 0;
    border-bottom: 1px solid var(--line);
  }
  .link {
    padding: 0;
    background: none;
    border: 0;
    color: var(--ink);
    font: inherit;
    text-decoration: underline dotted;
    cursor: pointer;
  }
  .hang {
    padding: 0.05rem 0.45rem;
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--dim);
    font-family: inherit;
    font-size: 0.7rem;
    cursor: pointer;
  }
  .hang.on {
    border-color: var(--red);
    color: var(--ink);
  }
  .log li.slip {
    display: block;
    padding: 0.5rem 0.7rem;
    background: var(--panel);
    border-left: 3px solid var(--c);
  }
  .slip p {
    margin: 0;
    white-space: pre-line;
    line-height: 1.5;
  }
  .slip .lore {
    margin-top: 0.5rem;
    color: var(--dim);
  }
  .slip strong {
    color: var(--c);
    font-weight: normal;
  }
  h3 {
    margin: 1.2rem 0 0.4rem;
    font-size: 0.9rem;
    color: var(--gold);
  }
  h3 small {
    margin-left: 0.4rem;
    font-weight: normal;
    color: var(--dim);
  }
  .variants {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
  }
  .variants li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.15rem 0;
    border-bottom: 1px solid var(--line);
  }
  .variants label {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    cursor: pointer;
  }
  .variants small,
  .dim {
    color: var(--dim);
    font-size: 0.7rem;
  }
</style>
