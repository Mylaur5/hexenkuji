<script>
  import { SLIPS, SLIP_BY_ID } from "$lib/slips.js";
  import { data, today, seasonOf, theaterCounts, theaterIn, addTheater, removeTheater } from "$lib/store.svelte.js";

  let counts = $derived(theaterCounts());
  let seen = $derived([...counts.values()].filter((n) => n > 0).length);
  let query = $state("");
  let date = $state(today());
  let selected = $state(null);
  let confirming = $state(false);
  let timeline = $derived([...data.theater].reverse());

  let matches = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SLIPS;
    return SLIPS.filter((s) => s.source.toLowerCase().includes(q) || s.text.toLowerCase().includes(q) || String(s.id) === q);
  });

  let existing = $derived(theaterIn(seasonOf(date)));

  async function add() {
    if (!selected) return;
    if (existing && !confirming) {
      confirming = true;
      return;
    }
    confirming = false;
    await addTheater(selected, date);
  }
</script>

<section>
  <h2>Imaginarium Theater <small>seasonal · {seen} / {SLIPS.length} seen</small></h2>

  <div class="row">
    <input type="search" placeholder="Search a slip (title or words)…" bind:value={query} />
    <input type="date" bind:value={date} onchange={() => (confirming = false)} />
  </div>

  <ul class="slips">
    {#each matches as s (s.id)}
      <li>
        <button class:sel={selected === s.id} onclick={() => { selected = s.id; confirming = false; }}>
          <span class="id">{s.id}</span>
          <span class="src">{s.source}</span>
          {#if counts.get(s.id)}<span class="n">×{counts.get(s.id)}</span>{/if}
        </button>
      </li>
    {:else}
      <li class="empty">No slip matches.</li>
    {/each}
  </ul>

  {#if selected}
    <blockquote>
      <cite>{SLIP_BY_ID.get(selected).source}</cite>
      {SLIP_BY_ID.get(selected).text}
    </blockquote>
    {#if existing}
      <p class="note">
        {seasonOf(date)} already has slip #{existing.slipId}.
        {confirming ? "Press again to replace it." : ""}
      </p>
    {/if}
    <button class="add" onclick={add}>
      {confirming ? "Replace" : "Log"} slip #{selected} for {seasonOf(date)}
    </button>
  {/if}

  {#if timeline.length}
    <ul class="log">
      {#each timeline as e (e)}
        <li>
          <span>{e.date}</span>
          <span>#{e.slipId} {SLIP_BY_ID.get(e.slipId).source}</span>
          <button class="x" title="Delete" onclick={() => removeTheater(e)}>×</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .row input[type="search"] {
    flex: 1;
    min-width: 0;
  }
  .slips {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 11rem;
    overflow-y: auto;
    border: 1px solid var(--line);
    border-radius: 6px;
  }
  .slips button {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    padding: 0.3rem 0.5rem;
    text-align: left;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--line);
    color: var(--ink);
    font-size: 0.8rem;
    cursor: pointer;
  }
  .slips button:hover {
    background: var(--panel);
  }
  .slips button.sel {
    background: color-mix(in srgb, var(--red) 30%, var(--panel));
  }
  .id {
    width: 1.6rem;
    color: var(--dim);
  }
  .src {
    flex: 1;
  }
  .n {
    color: var(--gold);
  }
  .empty {
    padding: 0.5rem;
    color: var(--dim);
    font-size: 0.8rem;
  }
  blockquote {
    margin: 0.7rem 0;
    padding: 0.5rem 0.8rem;
    border-left: 3px solid var(--red);
    background: var(--panel);
    white-space: pre-line;
    font-size: 0.8rem;
    line-height: 1.5;
    max-height: 10rem;
    overflow-y: auto;
  }
  cite {
    display: block;
    margin-bottom: 0.3rem;
    color: var(--gold);
    font-size: 0.75rem;
  }
  .note {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
    color: var(--gold);
  }
  .add {
    padding: 0.45rem 0.9rem;
    background: var(--red);
    border: 0;
    border-radius: 6px;
    color: #fff;
    font-family: inherit;
    cursor: pointer;
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
