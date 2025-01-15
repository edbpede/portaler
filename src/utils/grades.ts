import type { Platform } from './platforms';

export const GRADE_RANGES = {
	indskoling: [0, 1, 2, 3],
	mellemtrin: [4, 5, 6],
	udskoling: [7, 8, 9]
} as const;

export type GradeRange = keyof typeof GRADE_RANGES;

export function getGradeRange(grade: number): GradeRange | undefined {
	for (const [range, grades] of Object.entries(GRADE_RANGES)) {
		if (grades.includes(grade)) {
			return range as GradeRange;
		}
	}
	return undefined;
}

export function getAllGrades(): number[] {
	return Object.values(GRADE_RANGES).flat();
}

export function isValidGrade(grade: number): boolean {
	return getAllGrades().includes(grade);
}

export function getPlatformGradeRange(platform: Platform): GradeRange[] {
	const ranges = new Set<GradeRange>();
	
	platform.data.grades.forEach(grade => {
		const range = getGradeRange(grade);
		if (range) ranges.add(range);
	});
	
	return Array.from(ranges);
}