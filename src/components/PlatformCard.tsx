import { createSignal, mergeProps, Show, For } from "solid-js";
import type { PlatformItem } from "../lib/platforms";
import { PUBLISHER_LOGOS } from "../lib/publishers";

interface PlatformCardProps {
  item: PlatformItem;
  currentGrade?: number;
}

export default function PlatformCard(rawProps: PlatformCardProps) {
  const props = mergeProps({ currentGrade: undefined as number | undefined }, rawProps);
  const [expanded, setExpanded] = createSignal(false);

  const logo = () => PUBLISHER_LOGOS[props.item.publisher];
  const hasMore = () =>
    props.item.longDescription.trim().length > 0 &&
    props.item.longDescription.trim() !== props.item.description.trim();

  return (
    <div
      class="ui-card relative flex h-full flex-col gap-3 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] hover:border-[var(--sa)]/40"
      style={`--sa: ${props.item.accent}`}
    >
      {/* Subject accent spine */}
      <span
        class="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-[var(--sa)]"
        aria-hidden="true"
      />

      <div class="flex items-start justify-between gap-2 pl-2.5">
        <h3 class="min-w-0 font-display text-base font-semibold leading-snug text-card-foreground">
          {/* Stretched link makes the whole card open the platform. */}
          <a
            href={props.item.url}
            target="_blank"
            rel="noopener noreferrer"
            class="ui-focus rounded after:absolute after:inset-0 after:content-['']"
          >
            {props.item.name}
          </a>
        </h3>
        <span class="i-lucide-arrow-up-right shrink-0 text-base text-muted-foreground" aria-hidden="true" />
      </div>

      <div class="flex items-center gap-2 pl-2.5">
        <span class="ui-chip">
          <Show when={logo()}>
            <img src={logo()} alt="" class="h-3.5 w-auto max-w-5 object-contain" />
          </Show>
          {props.item.publisher}
        </span>
        <span class="text-xs text-muted-foreground">{props.item.subjectLabel}</span>
      </div>

      <p class="pl-2.5 text-sm leading-relaxed text-muted-foreground">
        {props.item.description}
      </p>

      <Show when={hasMore()}>
        <div class="pl-2.5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded()}
            class="ui-focus relative z-10 inline-flex items-center gap-1 rounded text-xs font-medium text-[var(--sa)] hover:underline"
          >
            {expanded() ? "Skjul info" : "Mere info"}
            <span
              class="i-lucide-chevron-down text-sm transition-transform"
              classList={{ "rotate-180": expanded() }}
              aria-hidden="true"
            />
          </button>
          <Show when={expanded()}>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {props.item.longDescription}
            </p>
          </Show>
        </div>
      </Show>

      <Show when={props.item.grades.length > 0}>
        <div class="mt-auto flex flex-wrap gap-1.5 pl-2.5 pt-1">
          <For each={props.item.grades}>
            {(grade) => (
              <span
                class="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium"
                classList={{
                  "bg-[var(--sa)]/12 text-[var(--sa)]": props.currentGrade === grade,
                  "bg-muted text-muted-foreground": props.currentGrade !== grade,
                }}
              >
                {grade}.
              </span>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
