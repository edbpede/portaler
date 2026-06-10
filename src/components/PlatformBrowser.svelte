<script lang="ts">
  import type { PlatformItem, SubjectInfo } from "../lib/types";
  import PlatformCard from "./PlatformCard.svelte";

  let {
    platforms,
    subjects,
    publishers,
    currentGrade,
    emptyTitle = "Ingen platforme matcher",
    emptyHint = "Prøv at justere din søgning eller dit filter.",
  }: {
    platforms: PlatformItem[];
    subjects: SubjectInfo[];
    publishers: string[];
    currentGrade?: number;
    emptyTitle?: string;
    emptyHint?: string;
  } = $props();

  let query = $state("");
  let publisher = $state("");

  const subjectByDisplay = new Map(subjects.map((s) => [s.displayName, s]));
  const norm = (value: string) => value.toLowerCase().trim();

  let filtered = $derived(
    platforms.filter((platform) => {
      const matchesQuery =
        query === "" ||
        norm(platform.name).includes(norm(query)) ||
        norm(platform.description).includes(norm(query)) ||
        norm(platform.publisher).includes(norm(query));
      const matchesPublisher =
        publisher === "" || platform.publisher === publisher;
      return matchesQuery && matchesPublisher;
    }),
  );

  let groups = $derived.by(() => {
    const buckets = new Map<string, PlatformItem[]>();
    for (const platform of filtered) {
      const key = platform.subjectDisplay || "Andre";
      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = [];
        buckets.set(key, bucket);
      }
      bucket.push(platform);
    }

    return [...buckets.entries()]
      .map(([display, items]) => ({
        display,
        items: items
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name, "da")),
        subject: subjectByDisplay.get(display),
      }))
      .sort((a, b) => {
        // "Andre" always sinks to the bottom; the rest sort by subject order.
        if (a.display === "Andre") return 1;
        if (b.display === "Andre") return -1;
        const orderA = a.subject?.order ?? 99;
        const orderB = b.subject?.order ?? 99;
        return orderA - orderB || a.display.localeCompare(b.display, "da");
      });
  });

  let hasFilters = $derived(query !== "" || publisher !== "");

  function reset() {
    query = "";
    publisher = "";
  }
</script>

<section class="flex flex-col gap-8">
  <div class="u-card p-4 sm:p-5">
    <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            for="platform-search"
            class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
          >
            Søg
          </label>
          <div class="relative">
            <span
              class="i-ph-magnifying-glass pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            ></span>
            <input
              id="platform-search"
              type="search"
              bind:value={query}
              placeholder="Platformnavn …"
              class="u-input pl-9"
              autocomplete="off"
            />
          </div>
        </div>

        <div>
          <label
            for="publisher-filter"
            class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
          >
            Udgiver
          </label>
          <select
            id="publisher-filter"
            bind:value={publisher}
            class="u-input appearance-none bg-[length:1.1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9"
            style="background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236E7C73' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E&quot;)"
          >
            <option value="">Alle udgivere</option>
            {#each publishers as name (name)}
              <option value={name}>{name}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <p class="text-sm text-ink-soft" aria-live="polite">
          <span class="font-display font-semibold text-ink">{filtered.length}</span>
          {filtered.length === 1 ? "platform" : "platforme"}
        </p>
        {#if hasFilters}
          <button
            type="button"
            onclick={reset}
            class="u-focus inline-flex items-center gap-1 rounded-md text-sm font-medium text-green-deep hover:text-green-dark"
          >
            <span class="i-ph-arrow-counter-clockwise text-sm" aria-hidden="true"></span>
            Nulstil
          </button>
        {/if}
      </div>
    </div>
  </div>

  {#if groups.length === 0}
    <div class="u-card flex flex-col items-center gap-2 px-6 py-16 text-center">
      <span class="i-ph-magnifying-glass text-3xl text-line-strong" aria-hidden="true"></span>
      <p class="font-display text-lg font-semibold text-ink">{emptyTitle}</p>
      <p class="max-w-sm text-sm text-ink-soft">{emptyHint}</p>
    </div>
  {:else}
    {#each groups as group (group.display)}
      <section class="flex flex-col gap-4">
        <div class="flex items-center gap-2.5">
          <span
            class="grid size-8 place-items-center rounded-lg bg-paper-sunken"
            aria-hidden="true"
          >
            <span
              class="{group.subject?.iconClass ?? 'i-ph-folder-fill'} {group.subject
                ?.iconColor ?? 'text-ink-soft'}"
            ></span>
          </span>
          <h2 class="font-display text-lg font-semibold text-ink">{group.display}</h2>
          <span class="text-sm text-ink-faint">{group.items.length}</span>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {#each group.items as platform (platform.id)}
            <PlatformCard {platform} {currentGrade} />
          {/each}
        </div>
      </section>
    {/each}
  {/if}
</section>
