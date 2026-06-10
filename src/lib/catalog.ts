import { getCollection } from "astro:content";
import { iconClass } from "./icons";
import { publisherKey } from "./publishers";
import type { PlatformItem, SubjectInfo } from "./types";

const FALLBACK_ICON = "i-ph-app-window-fill";
const FALLBACK_COLOR = "text-ink-soft";

interface Catalog {
  platforms: PlatformItem[];
  subjects: SubjectInfo[];
}

let cache: Catalog | null = null;

/**
 * Load and serialise every active platform plus subject metadata once per
 * build. Everything downstream (pages and islands) consumes this plain data.
 */
export async function getCatalog(): Promise<Catalog> {
  if (cache) return cache;

  const [platformEntries, subjectEntries] = await Promise.all([
    getCollection("platforms"),
    getCollection("subjects"),
  ]);

  const subjectByName = new Map(
    subjectEntries.map((entry) => [entry.data.name, entry.data]),
  );

  const subjects: SubjectInfo[] = subjectEntries
    .map((entry) => ({
      name: entry.data.name,
      displayName: entry.data.displayName,
      order: entry.data.order,
      iconClass: iconClass(entry.data.icon?.name),
      iconColor: entry.data.icon?.color ?? FALLBACK_COLOR,
    }))
    .sort((a, b) => a.order - b.order);

  const platforms: PlatformItem[] = platformEntries
    .filter((entry) => entry.data.isActive !== false)
    .map((entry) => {
      const data = entry.data;
      const subject = subjectByName.get(data.subject);
      const useOverride = Boolean(
        data.iconOverwrite && data.icon?.name && data.icon?.color,
      );

      return {
        id: entry.id,
        name: data.name,
        publisher: data.publisher,
        publisherKey: publisherKey(data.publisher),
        grades: data.grades,
        url: data.url,
        subject: data.subject,
        subjectDisplay: subject?.displayName ?? "Andre",
        description: data.description,
        longDescription: data.longDescription,
        iconClass: useOverride
          ? iconClass(data.icon?.name)
          : subject?.icon
            ? iconClass(subject.icon.name)
            : FALLBACK_ICON,
        iconColor: useOverride
          ? (data.icon?.color ?? FALLBACK_COLOR)
          : (subject?.icon?.color ?? FALLBACK_COLOR),
      };
    });

  cache = { platforms, subjects };
  return cache;
}

export async function getPlatformsForGrade(
  grade: number,
): Promise<PlatformItem[]> {
  const { platforms } = await getCatalog();
  return platforms.filter((platform) => platform.grades.includes(grade));
}

export async function getOtherPlatforms(): Promise<PlatformItem[]> {
  const { platforms } = await getCatalog();
  return platforms.filter((platform) => platform.grades.length === 0);
}

/** Platform count per grade 0–9, used by the homepage grade index. */
export async function getGradeCounts(): Promise<Record<number, number>> {
  const { platforms } = await getCatalog();
  const counts: Record<number, number> = {};
  for (let grade = 0; grade <= 9; grade++) counts[grade] = 0;
  for (const platform of platforms) {
    for (const grade of platform.grades) {
      if (grade in counts) counts[grade]++;
    }
  }
  return counts;
}

export function distinctPublishers(platforms: PlatformItem[]): string[] {
  return [...new Set(platforms.map((p) => p.publisher))].filter(Boolean).sort();
}
