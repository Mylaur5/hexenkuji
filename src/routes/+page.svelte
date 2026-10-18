<script>
  import { onMount } from "svelte";
  import { getVersion } from "@tauri-apps/api/app";
  import Shrine from "$lib/components/Shrine.svelte";
  import Theater from "$lib/components/Theater.svelte";
  import { data, init, exportJson, importJson, REGIONS, setRegion } from "$lib/store.svelte.js";

  let tab = $state("shrine");
  let backup = $state("");
  let message = $state("");

  let version = $state("");

  onMount(() => {
    init();
    getVersion().then((v) => (version = v)).catch(() => {});
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(exportJson());
      message = "Copied to clipboard.";
    } catch {
      backup = exportJson();
      message = "Clipboard unavailable. JSON shown below, copy it manually.";
    }
  }

  async function restore() {
    try {
      const n = await importJson(backup);
      message = `Imported ${n.shrine} shrine, ${n.theater} theater and ${n.variants} quest slip entries.`;
      backup = "";
    } catch (e) {
      message = `Import failed: ${e.message}`;
    }
  }
</script>

<main>
  <header>
    <h1>Hexenkuji <span>魔女籤</span></h1>
    <nav>
      <button class:on={tab === "shrine"} onclick={() => (tab = "shrine")}>Shrine</button>
      <button class:on={tab === "theater"} onclick={() => (tab = "theater")}>Theater</button>
    </nav>
  </header>

  {#if data.error}<p class="err">{data.error}</p>{/if}

  {#if !data.ready}
    <p class="dim">Loading…</p>
  {:else}
    <!-- Remount on region change so the date pickers pick up the new game day. -->
    {#key data.region}
      {#if tab === "shrine"}<Shrine />{:else}<Theater />{/if}
    {/key}
  {/if}

  <details>
    <summary>Settings</summary>
    <label class="setting">
      Server region
      <select value={data.region} onchange={(e) => setRegion(e.currentTarget.value)}>
        {#each REGIONS as r (r.id)}
          <option value={r.id}>{r.name} (UTC{r.offset >= 0 ? "+" : ""}{r.offset})</option>
        {/each}
      </select>
    </label>
    <p class="dim">The day resets at 04:00 server time.</p>
  </details>

  <details>
    <summary>Backup</summary>
    <div class="backup">
      <button onclick={copy}>Copy JSON</button>
      <button onclick={restore} disabled={!backup.trim()}>Import from box</button>
      <textarea rows="4" placeholder="Paste exported JSON here to import" bind:value={backup}></textarea>
      {#if message}<p class="dim">{message}</p>{/if}
    </div>
  </details>
  {#if version}<footer class="dim">Hexenkuji v{version}</footer>{/if}
</main>

<style>
  :global(:root) {
    --bg: #14122b;
    --panel: #1d1a3d;
    --line: #2f2b5c;
    --ink: #ece6d8;
    --dim: #9a94b8;
    --gold: #e8b923;
    --red: #c8452d;
    color-scheme: dark;
  }
  :global(body) {
    margin: 0;
    background:
      radial-gradient(circle at 50% 120%, transparent 38%, #ffffff08 39% 41%, transparent 42%) 0 0 / 56px 28px,
      radial-gradient(circle at 50% 120%, transparent 38%, #ffffff08 39% 41%, transparent 42%) 28px 14px / 56px 28px,
      var(--bg);
    color: var(--ink);
    font-family: "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif;
  }
  :global(h2) {
    margin: 0 0 0.7rem;
    font-size: 1rem;
    color: var(--gold);
  }
  :global(h2 small) {
    margin-left: 0.4rem;
    font-weight: normal;
    font-size: 0.75rem;
    color: var(--dim);
  }
  :global(input, textarea, select) {
    padding: 0.35rem 0.5rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--ink);
    font-family: inherit;
  }
  :global(.x) {
    background: transparent;
    border: 0;
    color: var(--dim);
    cursor: pointer;
  }
  :global(.x:hover) {
    color: var(--red);
  }
  main {
    max-width: 30rem;
    margin: 0 auto;
    padding: 1rem;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--red);
  }
  h1 {
    margin: 0;
    font-size: 1.3rem;
  }
  h1 span {
    margin-left: 0.4rem;
    font-size: 0.9rem;
    color: var(--red);
  }
  nav button {
    padding: 0.4rem 0.8rem;
    background: transparent;
    border: 0;
    border-bottom: 3px solid transparent;
    color: var(--dim);
    font-family: inherit;
    cursor: pointer;
  }
  nav button.on {
    color: var(--ink);
    border-bottom-color: var(--gold);
  }
  .err {
    color: #ff8a7a;
  }
  .dim {
    color: var(--dim);
    font-size: 0.8rem;
  }
  details {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: var(--dim);
  }
  .setting {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1.5rem;
    text-align: center;
  }
  .backup {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .backup button {
    padding: 0.3rem 0.7rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--ink);
    font-family: inherit;
    cursor: pointer;
  }
  .backup textarea {
    width: 100%;
    box-sizing: border-box;
  }
</style>
