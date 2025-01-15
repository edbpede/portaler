import { getCollection, type CollectionEntry } from 'astro:content';

export type Platform = CollectionEntry<'platforms'>;

export async function getAllPlatforms(): Promise<Platform[]> {
	return await getCollection('platforms');
}

export async function getPlatformsForGrade(grade: number): Promise<Platform[]> {
	const platforms = await getAllPlatforms();
	return platforms.filter(platform => platform.data.grades.includes(grade));
}

export async function getPlatformsByPublisher(publisher: string): Promise<Platform[]> {
	const platforms = await getAllPlatforms();
	return platforms.filter(platform => platform.data.publisher === publisher);
}

export async function getPlatformsBySubject(subject: string): Promise<Platform[]> {
	const platforms = await getAllPlatforms();
	return platforms.filter(platform => platform.data.subject === subject);
}

export function filterActivePlatforms(platforms: Platform[]): Platform[] {
	return platforms.filter(platform => platform.data.isActive !== false);
}