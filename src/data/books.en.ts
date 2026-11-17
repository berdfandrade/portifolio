// Títulos e resumos da estante em inglês. Autor, cores e tamanhos vêm de books.ts.
import { BOOKS, type Book } from "./books";

const EN: Record<string, { title: string; blurb: string }> = {
  "cem-anos": { title: "One Hundred Years of Solitude", blurb: "Seven generations of the Buendía family in the imaginary town of Macondo, between the real and the fantastic." },
  "1984": { title: "1984", blurb: "Winston Smith tries to think for himself in a state that watches everything and rewrites the past." },
  "dom-casmurro": { title: "Dom Casmurro", blurb: "Bentinho tells his own story with Capitu, and the reader decides how far to trust the narrator." },
  "pequeno-principe": { title: "The Little Prince", blurb: "A pilot lost in the desert meets a boy from an asteroid, with a rose and a lot of questions." },
  sapiens: { title: "Sapiens", blurb: "A brief history of humankind, from the first tools to the agricultural, scientific and digital revolutions." },
  hobbit: { title: "The Hobbit", blurb: "Bilbo Baggins leaves the comfort of his hole for an adventure with thirteen dwarves and a dragon." },
  duna: { title: "Dune", blurb: "Paul Atreides arrives on Arrakis, the desert planet that holds the most valuable spice in the universe." },
};

export const BOOKS_EN: Book[] = BOOKS.map((b) => ({ ...b, ...EN[b.id] }));
