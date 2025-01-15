import { getCollection, type CollectionEntry } from 'astro:content';

export type Subject = CollectionEntry<'subjects'>;

export async function getAllSubjects(): Promise<Subject[]> {
	const subjects = await getCollection('subjects');
	return subjects.sort((a, b) => a.data.order - b.data.order);
}

export async function getActiveSubjects(): Promise<Subject[]> {
	const subjects = await getAllSubjects();
	return subjects.filter(subject => subject.data.isActive !== false);
}

export function getSubjectDisplayName(subject: Subject): string {
	return subject.data.displayName || subject.data.name;
}

export async function getSubjectByName(name: string): Promise<Subject | undefined> {
	const subjects = await getAllSubjects();
	return subjects.find(subject => subject.data.name === name);
}