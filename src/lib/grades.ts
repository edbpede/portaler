export const GRADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Grade = (typeof GRADES)[number];

// The three stages of the Danish folkeskole. Real structure teachers navigate
// by — used to group the grade index, not as decoration.
export const STAGES = [
  { key: "indskoling", label: "Indskoling", grades: [0, 1, 2, 3] },
  { key: "mellemtrin", label: "Mellemtrin", grades: [4, 5, 6] },
  { key: "udskoling", label: "Udskoling", grades: [7, 8, 9] },
] as const;

export type StageKey = (typeof STAGES)[number]["key"];

export function gradeLabel(grade: number): string {
  return `${grade}. årgang`;
}

export function getAllGrades(): number[] {
  return [...GRADES];
}

export function isValidGrade(grade: number): boolean {
  return (GRADES as readonly number[]).includes(grade);
}

export function getStage(grade: number): StageKey | undefined {
  return STAGES.find((stage) => (stage.grades as readonly number[]).includes(grade))
    ?.key;
}
