export interface Platform {
	name: string;
	publisher: string;
	grades: number[];
}

export const platforms: Platform[] = [
	// 0. årgang platforms
	{ name: "CampOrd", publisher: "Alinea", grades: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
	{ name: "Dansk 0-2", publisher: "Gyldendal", grades: [0, 1, 2] },
	{ name: "Matematik 0-3", publisher: "Gyldendal", grades: [0, 1, 2, 3] },
	{ name: "Fandango mini bogstavlydbog ibog", publisher: "Gyldendal", grades: [0] },
	{ name: "First Boost A ibog", publisher: "Gyldendal", grades: [0, 1] },
	{ name: "First Boost B ibog", publisher: "Gyldendal", grades: [0] },
	{ name: "Danske dyr 0-6", publisher: "Gyldendal", grades: [0, 1, 2, 3, 4, 5, 6] },
	{ name: "Verdens dyr 0-6", publisher: "Gyldendal", grades: [0, 1, 2, 3, 4, 5, 6] },
	{ name: "Skrivoglæs 0-2", publisher: "Gyldendal", grades: [0, 1, 2] },
	{ name: "DSA", publisher: "Gyldendal", grades: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
	
	// Additional platforms for higher grades
	{ name: "Natur og teknolog indskoling", publisher: "Alinea", grades: [3] },
	{ name: "Dansk 3-6", publisher: "Gyldendal", grades: [3, 4, 5, 6] },
	{ name: "Historie 3-6", publisher: "Gyldendal", grades: [3, 4, 5, 6] },
	{ name: "Boost 3 ibog", publisher: "Gyldendal", grades: [3] },
	{ name: "Boost 4 ibog", publisher: "Gyldendal", grades: [4] },
	{ name: "Boost 5 ibog", publisher: "Gyldendal", grades: [5] },
	{ name: "Boost 6 ibog", publisher: "Gyldendal", grades: [6] },
	{ name: "Europas lande 3-9", publisher: "Gyldendal", grades: [3, 4, 5, 6, 7, 8, 9] },
	
	// Udskoling specific platforms
	{ name: "Engelsk portalen udskoling", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Campengelsk udskoling", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Tysk portalen udskoling", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Camptysk", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Biologi portalen", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "FysikKemi portalen", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Geografi portalen", publisher: "Alinea", grades: [7, 8, 9] },
	{ name: "Dansk 7-10", publisher: "Gyldendal", grades: [7, 8, 9, 10] },
	{ name: "Matematik 7-10", publisher: "Gyldendal", grades: [7, 8, 9, 10] },
	{ name: "Religion 7-10", publisher: "Gyldendal", grades: [7, 8, 9, 10] },
	{ name: "Historie 7-9", publisher: "Gyldendal", grades: [7, 8, 9] },
	{ name: "Samfundsfag 8-10", publisher: "Gyldendal", grades: [8, 9, 10] }
];

export const otherPlatforms: Platform[] = [
	{ name: "Skoleordbog Dansk", publisher: "Gyldendal", grades: [] },
	{ name: "Skoleordbog Engelsk", publisher: "Gyldendal", grades: [] },
	{ name: "Skoleordbog Tysk", publisher: "Gyldendal", grades: [] },
	{ name: "Skoleordbog Fransk", publisher: "Gyldendal", grades: [] },
	{ name: "seismo.dk", publisher: "", grades: [] },
	{ name: "Børneavisen fysisk", publisher: "", grades: [] },
	{ name: "Klasserumsspil.dk", publisher: "", grades: [] },
	{ name: "Mayeriet", publisher: "", grades: [] },
	{ name: "Bookbites", publisher: "", grades: [] },
	{ name: "Ordbogen.com", publisher: "", grades: [] },
	{ name: "Buggi", publisher: "", grades: [] },
	{ name: "Læsefidusen arbejdsb. e-Bog", publisher: "Dansklf.dk", grades: [] },
	{ name: "Faktalink og forfatterweb", publisher: "", grades: [] }
];

export function getPlatformsForGrade(grade: number): Platform[] {
	return platforms.filter(platform => platform.grades.includes(grade));
}