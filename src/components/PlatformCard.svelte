<script lang="ts">
  import type { PlatformItem } from "../lib/types";
  import { PUBLISHER_BADGE } from "../lib/publishers";

  let {
    platform,
    currentGrade,
  }: {
    platform: PlatformItem;
    currentGrade?: number;
  } = $props();

  let showInfo = $state(false);
  let infoButton = $state<HTMLButtonElement>();
  let closeButton = $state<HTMLButtonElement>();

  function open() {
    showInfo = true;
  }
  function close() {
    showInfo = false;
    infoButton?.focus();
  }

  // Move focus into the panel on open so keyboard users land there.
  $effect(() => {
    if (showInfo) closeButton?.focus();
  });
</script>

<article
  class="u-card group relative flex h-full flex-col p-5 transition-all duration-200 hover:(-translate-y-0.5 border-green/45 shadow-[0_12px_30px_-12px_rgba(20,33,26,0.25)])"
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex min-w-0 items-start gap-3">
      <span
        class="grid size-9 shrink-0 place-items-center rounded-lg bg-paper-sunken"
        aria-hidden="true"
      >
        <span class="{platform.iconClass} {platform.iconColor} text-lg"></span>
      </span>
      <h3 class="min-w-0 font-display text-base font-semibold leading-snug text-ink">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          class="u-focus line-clamp-2 rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-green-deep"
        >
          {platform.name}
        </a>
      </h3>
    </div>
    <span class="u-chip shrink-0 {PUBLISHER_BADGE[platform.publisherKey]}">
      {platform.publisher}
    </span>
  </div>

  <p class="mt-3 line-clamp-3 grow text-sm leading-relaxed text-ink-soft">
    {platform.description}
  </p>

  <div class="mt-4 flex items-end justify-between gap-3">
    {#if platform.grades.length > 0}
      <ul class="flex flex-wrap gap-1.5" aria-label="Årgange">
        {#each platform.grades as grade (grade)}
          <li
            class="u-chip {currentGrade === grade
              ? 'bg-green text-white'
              : 'bg-paper-sunken text-ink-soft'}"
          >
            {grade}.
          </li>
        {/each}
      </ul>
    {:else}
      <span></span>
    {/if}

    {#if platform.longDescription}
      <button
        type="button"
        bind:this={infoButton}
        onclick={open}
        aria-expanded={showInfo}
        class="u-focus relative z-10 inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-green-deep transition-colors hover:text-green-dark"
      >
        <span class="i-ph-info" aria-hidden="true"></span>
        Mere info
      </button>
    {/if}
  </div>

  {#if showInfo}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      role="dialog"
      aria-label={`Om ${platform.name}`}
      class="absolute inset-0 z-20 flex flex-col rounded-2xl border border-green/30 bg-paper-raised/98 p-5 backdrop-blur-sm"
      onkeydown={(event) => event.key === "Escape" && close()}
    >
      <div class="flex items-start justify-between gap-3">
        <h4 class="font-display text-sm font-semibold text-ink">{platform.name}</h4>
        <button
          type="button"
          bind:this={closeButton}
          onclick={close}
          class="u-focus -m-1 grid size-7 shrink-0 place-items-center rounded-md text-ink-soft transition-colors hover:(bg-paper-sunken text-ink)"
          aria-label="Luk"
        >
          <span class="i-ph-x text-sm" aria-hidden="true"></span>
        </button>
      </div>
      <p class="u-scroll-thin mt-2 overflow-y-auto pr-1 text-sm leading-relaxed text-ink-soft">
        {platform.longDescription}
      </p>
    </div>
  {/if}
</article>
