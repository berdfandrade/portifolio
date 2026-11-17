// Mapa astral do Bernardo. Posições em signo + graus + minutos, como nos sites de mapa astral.
// Os nomes dos signos e dos planetas em cada idioma ficam em src/i18n/strings.ts.

export const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
export type Sign = (typeof SIGNS)[number];

export const SIGN_GLYPHS: Record<Sign, string> = {
  aries: "♈︎", taurus: "♉︎", gemini: "♊︎", cancer: "♋︎", leo: "♌︎", virgo: "♍︎",
  libra: "♎︎", scorpio: "♏︎", sagittarius: "♐︎", capricorn: "♑︎", aquarius: "♒︎", pisces: "♓︎",
};

export type Body = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto";
export type Point = Body | "asc" | "mc";

export interface Position {
  sign: Sign;
  deg: number;
  min: number;
  retrograde?: boolean;
}

export const PLANET_GLYPHS: Record<Body, string> = {
  sun: "☉︎", moon: "☽︎", mercury: "☿︎", venus: "♀︎", mars: "♂︎",
  jupiter: "♃︎", saturn: "♄︎", uranus: "♅︎", neptune: "♆︎", pluto: "♇︎",
};

export const CHART: Record<Point, Position> = {
  sun: { sign: "capricorn", deg: 24, min: 39 },
  moon: { sign: "scorpio", deg: 15, min: 26 },
  mercury: { sign: "aquarius", deg: 2, min: 9, retrograde: true },
  venus: { sign: "pisces", deg: 0, min: 25 },
  mars: { sign: "aquarius", deg: 5, min: 33 },
  jupiter: { sign: "capricorn", deg: 2, min: 44 },
  saturn: { sign: "pisces", deg: 20, min: 31 },
  uranus: { sign: "aquarius", deg: 0, min: 11 },
  neptune: { sign: "capricorn", deg: 25, min: 13 },
  pluto: { sign: "sagittarius", deg: 2, min: 24 },
  asc: { sign: "pisces", deg: 20, min: 54 },
  mc: { sign: "sagittarius", deg: 21, min: 7 },
};

/** Pontos listados ao lado do mapa, nesta ordem. */
export const PLACEMENT_ORDER: Point[] = ["sun", "moon", "asc", "mc", "mercury", "venus", "mars"];

/** Longitude eclíptica em graus (0° = início de Áries). */
export const longitude = ({ sign, deg, min }: Position) => SIGNS.indexOf(sign) * 30 + deg + min / 60;

/** "24°39′" */
export const formatDegrees = ({ deg, min }: Position) => `${deg}°${String(min).padStart(2, "0")}′`;
