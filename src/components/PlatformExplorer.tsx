import { createMemo, createSignal, For, mergeProps, Show } from "solid-js";
import type { PlatformItem } from "../lib/platforms";
import PlatformCard from "./PlatformCard";

interface ExplorerProps {
  platforms: PlatformItem[];
  currentGrade?: number;
  /** Heading id to associate the search region with, for screen readers. */
  searchLabel?: string;
}

interface SubjectGroup {
  slug: string;
  label: string;
  accent: string;
  icon: string;
  order: number;
  items: PlatformItem[];
}

export default function PlatformExplorer(rawProps: ExplorerProps) {
  const props = mergeProps(
    { currentGrade: undefined as number | undefined, searchLabel: "Søg efter platform" },
    rawProps,
  );

  const [query, setQuery] = createSignal("");
  const [publisher, setPublisher] = createSignal("");

  const publishers = createMemo(() =>
    [...new Set(props.platforms.map((p) => p.publisher).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "da"),
    ),
  );

  const filtered = createMemo(() => {
    const q = query().trim().toLowerCase();
    const pub = publisher();
    return props.platforms.filter((p) => {
      if (pub && p.publisher !== pub) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.publisher.toLowerCase().includes(q) ||
        p.subjectLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  });

  const groups = createMemo<SubjectGroup[]>(() => {
    const map = new Map<string, SubjectGroup>();
    for (const p of filtered()) {
      let group = map.get(p.subject);
      if (!group) {
        group = {
          slug: p.subject,
          label: p.subjectLabel,
          accent: p.accent,
          icon: p.icon,
          order: p.subjectOrder,
          items: [],
        };
        map.set(p.subject, group);
      }
      group.items.push(p);
    }
    const arr = [...map.values()].sort(
      (a, b) => a.order - b.order || a.label.localeCompare(b.label, "da"),
    );
    for (const group of arr) {
      group.items.sort((a, b) => a.name.localeCompare(b.name, "da"));
    }
    return arr;
  });

  const reset = () => {
    setQuery("");
    setPublisher("");
  };

  return (
    <div>
      <div class="ui-card mb-8 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <div class="flex-1">
          <label for="platform-search" class="mb-1.5 block text-sm font-medium text-foreground">
            {props.searchLabel}
          </label>
          <div class="relative">
            <span
              class="i-lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="platform-search"
              type="search"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Navn, fag eller forlag…"
              class="ui-focus w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <Show when={publishers().length > 1}>
          <div class="sm:w-56">
            <label for="publisher-filter" class="mb-1.5 block text-sm font-medium text-foreground">
              Forlag
            </label>
            <select
              id="publisher-filter"
              value={publisher()}
              onChange={(e) => setPublisher(e.currentTarget.value)}
              class="ui-focus w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            >
              <option value="">Alle forlag</option>
              <For each={publishers()}>{(name) => <option value={name}>{name}</option>}</For>
            </select>
          </div>
        </Show>
      </div>

      <p class="mb-5 text-sm text-muted-foreground" aria-live="polite">
        Viser {filtered().length} af {props.platforms.length}{" "}
        {props.platforms.length === 1 ? "platform" : "platforme"}
      </p>

      <Show
        when={groups().length > 0}
        fallback={
          <div class="ui-card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span class="i-lucide-search-x text-3xl text-muted-foreground" aria-hidden="true" />
            <p class="text-foreground">Ingen platforme matcher din søgning.</p>
            <button
              type="button"
              onClick={reset}
              class="ui-focus rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Ryd søgning
            </button>
          </div>
        }
      >
        <div class="flex flex-col gap-10">
          <For each={groups()}>
            {(group) => (
              <section aria-label={group.label}>
                <Show when={groups().length > 1}>
                  <div class="mb-4 flex items-center gap-2.5" style={`--sa: ${group.accent}`}>
                    <span
                      class="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--sa)]/12 text-[var(--sa)]"
                      aria-hidden="true"
                    >
                      <span class={`${group.icon} text-base`} />
                    </span>
                    <h2 class="font-display text-lg font-semibold text-foreground">
                      {group.label}
                    </h2>
                    <span class="text-sm text-muted-foreground">({group.items.length})</span>
                  </div>
                </Show>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <For each={group.items}>
                    {(item) => <PlatformCard item={item} currentGrade={props.currentGrade} />}
                  </For>
                </div>
              </section>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
