// The school journey model — the domain structure behind the "Skoleår" rail.
// Danish folkeskole groups grades 0–9 into three phases.

export type PhaseId = "indskoling" | "mellemtrin" | "udskoling";

export interface Phase {
  id: PhaseId;
  label: string;
  grades: number[];
}

export const PHASES: Phase[] = [
  { id: "indskoling", label: "Indskoling", grades: [0, 1, 2, 3] },
  { id: "mellemtrin", label: "Mellemtrin", grades: [4, 5, 6] },
  { id: "udskoling", label: "Udskoling", grades: [7, 8, 9] },
];

export const GRADES: number[] = PHASES.flatMap((phase) => phase.grades);

export function phaseOf(grade: number): Phase | undefined {
  return PHASES.find((phase) => phase.grades.includes(grade));
}

export function isValidGrade(grade: number): boolean {
  return Number.isInteger(grade) && GRADES.includes(grade);
}

/** "0. klasse", "5. klasse" — the term Danish teachers use for a grade level. */
export function gradeLabel(grade: number): string {
  return `${grade}. klasse`;
}
