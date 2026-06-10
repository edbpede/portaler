// @unocss-include
// Subject identity lives in code (not data) so adding/adjusting a subject is a
// one-line change here. `accent` is an OKLCH colour injected as an inline CSS
// var (--sa) and read by literal utilities like `text-[var(--sa)]`. `icon` is a
// Lucide line icon (clean + modern, replacing the old cartoon Phosphor icons).
// The literal `i-lucide-*` strings below are why this file is @unocss-include'd.

export interface SubjectMeta {
  accent: string;
  icon: string;
}

export const SUBJECT_META: Record<string, SubjectMeta> = {
  dansk: { accent: "oklch(0.63 0.17 18)", icon: "i-lucide-book-open" },
  matematik: { accent: "oklch(0.62 0.17 250)", icon: "i-lucide-calculator" },
  engelsk: { accent: "oklch(0.60 0.16 300)", icon: "i-lucide-globe" },
  tysk: { accent: "oklch(0.68 0.14 70)", icon: "i-lucide-languages" },
  historie: { accent: "oklch(0.60 0.13 50)", icon: "i-lucide-landmark" },
  samfundsfag: { accent: "oklch(0.60 0.12 200)", icon: "i-lucide-users" },
  biologi: { accent: "oklch(0.64 0.15 150)", icon: "i-lucide-leaf" },
  "fysik-kemi": { accent: "oklch(0.58 0.16 275)", icon: "i-lucide-flask-conical" },
  geografi: { accent: "oklch(0.64 0.12 220)", icon: "i-lucide-map" },
  "natur-teknologi": { accent: "oklch(0.65 0.14 165)", icon: "i-lucide-sprout" },
  religion: { accent: "oklch(0.58 0.15 320)", icon: "i-lucide-church" },
  billedkunst: { accent: "oklch(0.66 0.17 350)", icon: "i-lucide-palette" },
  "handvaerk-design": { accent: "oklch(0.67 0.16 55)", icon: "i-lucide-hammer" },
  madkundskab: { accent: "oklch(0.68 0.15 120)", icon: "i-lucide-utensils" },
  andre: { accent: "oklch(0.60 0.02 260)", icon: "i-lucide-shapes" },
};

const FALLBACK: SubjectMeta = SUBJECT_META.andre;

export function subjectMeta(slug: string): SubjectMeta {
  return SUBJECT_META[slug] ?? FALLBACK;
}
