import { getCollection } from "astro:content";
import { subjectMeta } from "./subjects";

// A plain, serializable shape for platforms. Enriched at build time with the
// subject's display label/order/accent/icon so the Solid island stays
// self-contained (no astro:content access on the client).
export interface PlatformItem {
  id: string;
  name: string;
  publisher: string;
  grades: number[];
  url: string;
  subject: string;
  subjectLabel: string;
  subjectOrder: number;
  accent: string;
  icon: string;
  description: string;
  longDescription: string;
}

async function subjectLookup(): Promise<Map<string, { label: string; order: number }>> {
  const subjects = await getCollection("subjects");
  return new Map(
    subjects.map((s) => [s.data.name, { label: s.data.displayName, order: s.data.order }]),
  );
}

function enrich(
  entry: { id: string; data: Omit<PlatformItem, "id" | "subjectLabel" | "subjectOrder" | "accent" | "icon"> },
  subjects: Map<string, { label: string; order: number }>,
): PlatformItem {
  const meta = subjectMeta(entry.data.subject);
  const subject = subjects.get(entry.data.subject);
  if (!subject) {
    console.warn(
      `[platforms] "${entry.data.name}" references subject "${entry.data.subject}" which has no entry in the subjects collection — it will be labelled "Andre".`,
    );
  }
  return {
    id: entry.id,
    ...entry.data,
    subjectLabel: subject?.label ?? "Andre",
    subjectOrder: subject?.order ?? 999,
    accent: meta.accent,
    icon: meta.icon,
  };
}

// Cached at module scope: Astro reuses the module across the static build, so
// the collection is scanned + enriched once rather than per page.
let activePlatformsCache: Promise<PlatformItem[]> | undefined;

async function loadActivePlatforms(): Promise<PlatformItem[]> {
  const [entries, subjects] = await Promise.all([getCollection("platforms"), subjectLookup()]);
  return entries
    .filter((entry) => entry.data.isActive !== false)
    .map((entry) => enrich(entry, subjects));
}

/** All active platforms, enriched and ready to hand to the Solid island. */
export function getActivePlatforms(): Promise<PlatformItem[]> {
  return (activePlatformsCache ??= loadActivePlatforms());
}

export async function getPlatformsForGrade(grade: number): Promise<PlatformItem[]> {
  const all = await getActivePlatforms();
  return all.filter((p) => p.grades.includes(grade));
}

export async function getPlatformsForSubject(subject: string): Promise<PlatformItem[]> {
  const all = await getActivePlatforms();
  return all.filter((p) => p.subject === subject);
}

/** Platforms with no grade tagging — the "Andre platforme" bucket. */
export async function getOtherPlatforms(): Promise<PlatformItem[]> {
  const all = await getActivePlatforms();
  return all.filter((p) => p.grades.length === 0);
}

export function publishersOf(platforms: PlatformItem[]): string[] {
  return [...new Set(platforms.map((p) => p.publisher).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "da"),
  );
}
