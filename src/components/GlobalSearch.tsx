import {
  For,
  Show,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Portal } from "solid-js/web";
import type { PlatformItem } from "../lib/types";

interface Props {
  platforms: PlatformItem[];
}

const MAX_RESULTS = 8;

export default function GlobalSearch(props: Props) {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal("");
  let inputEl: HTMLInputElement | undefined;

  const results = createMemo(() => {
    const term = query().toLowerCase().trim();
    if (term === "") return [] as PlatformItem[];
    return props.platforms
      .filter((platform) => {
        return (
          platform.name.toLowerCase().includes(term) ||
          platform.subjectDisplay.toLowerCase().includes(term) ||
          platform.publisher.toLowerCase().includes(term)
        );
      })
      .slice(0, MAX_RESULTS);
  });

  function show() {
    setOpen(true);
    queueMicrotask(() => inputEl?.focus());
  }

  function hide() {
    setOpen(false);
    setQuery("");
  }

  function onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    const typingElsewhere =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    if (event.key === "/" && !open() && !typingElsewhere) {
      event.preventDefault();
      show();
    } else if (event.key === "Escape" && open()) {
      hide();
    }
  }

  // Registered inside onMount so the listener — and its document-touching
  // cleanup — only ever exist on the client, never during SSR teardown.
  onMount(() => {
    document.addEventListener("keydown", onKeydown);
    onCleanup(() => document.removeEventListener("keydown", onKeydown));
  });

  return (
    <>
      <button
        type="button"
        onClick={show}
        class="u-focus inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised py-1.5 pl-3 pr-3 text-sm text-ink-soft transition-colors hover:(border-green/50 text-ink) sm:pr-2"
        aria-label="Søg på tværs af alle platforme"
      >
        <span class="i-ph-magnifying-glass text-base" aria-hidden="true" />
        <span class="hidden sm:inline">Find platform</span>
        <kbd class="hidden rounded border border-line bg-paper px-1.5 font-sans text-xs text-ink-faint sm:inline">
          /
        </kbd>
      </button>

      <Show when={open()}>
        <Portal>
          <div
            class="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
            role="presentation"
            onClick={(event) => event.target === event.currentTarget && hide()}
          >
            <div
              class="u-card w-full max-w-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(20,33,26,0.45)]"
              role="dialog"
              aria-modal="true"
              aria-label="Find en platform"
            >
              <div class="flex items-center gap-3 border-b border-line px-4">
                <span class="i-ph-magnifying-glass text-lg text-ink-faint" aria-hidden="true" />
                <input
                  ref={inputEl}
                  type="search"
                  value={query()}
                  onInput={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Søg efter platform, fag eller udgiver …"
                  class="w-full bg-transparent py-4 text-base text-ink outline-none placeholder-ink-faint"
                  autocomplete="off"
                />
                <button
                  type="button"
                  onClick={hide}
                  class="u-focus grid size-7 shrink-0 place-items-center rounded-md text-ink-faint transition-colors hover:(bg-paper-sunken text-ink)"
                  aria-label="Luk"
                >
                  <span class="i-ph-x" aria-hidden="true" />
                </button>
              </div>

              <Show
                when={query().trim() !== ""}
                fallback={
                  <p class="px-4 py-6 text-sm text-ink-soft">
                    Begynd at skrive for at finde en platform på tværs af alle
                    årgange og fag.
                  </p>
                }
              >
                <Show
                  when={results().length > 0}
                  fallback={
                    <p class="px-4 py-6 text-sm text-ink-soft">
                      Ingen platforme matcher „{query()}".
                    </p>
                  }
                >
                  <ul class="u-scroll-thin max-h-[50vh] overflow-y-auto py-2">
                    <For each={results()}>
                      {(platform) => (
                        <li>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="u-focus flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-green-wash/60"
                          >
                            <span
                              class="grid size-9 shrink-0 place-items-center rounded-lg bg-paper-sunken"
                              aria-hidden="true"
                            >
                              <span class={`${platform.iconClass} ${platform.iconColor}`} />
                            </span>
                            <span class="min-w-0 flex-1">
                              <span class="block truncate font-medium text-ink">
                                {platform.name}
                              </span>
                              <span class="block truncate text-xs text-ink-soft">
                                {platform.subjectDisplay} · {platform.publisher}
                              </span>
                            </span>
                            <span
                              class="i-ph-arrow-up-right shrink-0 text-ink-faint"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              </Show>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
}
