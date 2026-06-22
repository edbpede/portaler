import { mergeProps, Show, For } from "solid-js";
import type { PlatformItem } from "../lib/platforms";
import { PUBLISHER_LOGOS } from "../lib/publishers";

interface PlatformCardProps {
  item: PlatformItem;
  currentGrade?: number;
}

export default function PlatformCard(rawProps: PlatformCardProps) {
  const props = mergeProps({ currentGrade: undefined as number | undefined }, rawProps);

  const logo = () => PUBLISHER_LOGOS[props.item.publisher];
  // Extra detail surfaces as a native hover tooltip on desktop — no nested
  // interactive element, so the whole card stays a single, reliable link.
  const moreInfo = () => {
    const long = props.item.longDescription.trim();
    return long && long !== props.item.description.trim() ? long : undefined;
  };

  return (
    <a
      href={props.item.url}
      target="_blank"
      rel="noopener noreferrer"
      title={moreInfo()}
      style={`--sa: ${props.item.accent}`}
      class="ui-card ui-focus relative flex h-full flex-col gap-3 p-4 pl-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa)]/40 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
    >
      {/* Subject accent spine */}
      <span class="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-[var(--sa)]" aria-hidden="true" />

      <div class="flex items-start justify-between gap-2">
        <h3 class="min-w-0 font-display text-base font-semibold leading-snug text-card-foreground">
          {props.item.name}
        </h3>
        <span class="i-lucide-arrow-up-right shrink-0 text-base text-muted-foreground" aria-hidden="true" />
      </div>

      <div class="flex items-center gap-2">
        <span class="ui-chip">
          <Show when={logo()}>
            <img src={logo()} alt="" class="h-3.5 w-auto max-w-5 object-contain" />
          </Show>
          {props.item.publisher}
        </span>
        <span class="text-xs text-muted-foreground">{props.item.subjectLabel}</span>
      </div>

      <p class="text-sm leading-relaxed text-muted-foreground">{props.item.description}</p>

      <Show when={props.item.grades.length > 0}>
        <div class="mt-auto flex flex-wrap gap-1.5 pt-1">
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
    </a>
  );
}
