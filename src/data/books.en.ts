// Títulos e resumos da estante em inglês. Autor, cores e tamanhos vêm de books.ts.
import { BOOKS, type Book } from "./books";

const EN: Record<string, { title: string; blurb: string }> = {
  "goodbye-columbus": { title: "Goodbye, Columbus", blurb: "Neil Klugman spends a summer in love with Brenda Patimkin, caught between class and Jewish identity in New Jersey." },
  "alma-indomavel": { title: "The Untethered Soul", blurb: "How to watch your own thoughts and emotions without getting caught in them." },
  "ficcoes": { title: "Ficciones", blurb: "Labyrinths, infinite libraries and mirrors in short stories that play with time and reality." },
  "deus-das-avencas": { title: "O deus das avencas", blurb: "Three novellas: a birth on the eve of Brazil's 2018 election, a future of digital minds and a community after collapse." },
  "homem-duplicado": { title: "The Double", blurb: "A history teacher spots an actor identical to himself in a film and sets out to find him." },
  "120-dias": { title: "The 120 Days of Sodom", blurb: "Four libertines lock themselves in a castle. Sade's most extreme book, written in the Bastille." },
  "graca-infinita": { title: "Infinite Jest", blurb: "A tennis academy, a halfway house and a film so entertaining that whoever watches it can't stop." },
  "brief-interviews": { title: "Brief Interviews with Hideous Men", blurb: "Stories about loneliness, self-awareness and men trying to explain themselves." },
  "antkind": { title: "Antkind", blurb: "A film critic tries to rebuild from memory a three-month-long film that only he has seen." },
  "morte-do-pai": { title: "A Death in the Family", blurb: "Volume one of My Struggle: the author's teenage years and the death of his alcoholic father." },
  "barba-ensopada": { title: "Blood-Drenched Beard", blurb: "A swimming coach moves to Garopaba to find out what happened to his grandfather." },
  "bras-cubas": { title: "The Posthumous Memoirs of Brás Cubas", blurb: "A dead narrator tells his own life story with irony, starting from his death." },
  "trainspotting": { title: "Trainspotting", blurb: "Renton and his friends caught between heroin, unemployment and 1980s Edinburgh." },
  "processo": { title: "The Trial", blurb: "Josef K. is arrested one morning without knowing why, and never finds out." },
  "sala-danuza": { title: "Na sala com Danuza", blurb: "A guide to manners and getting along with people, witty and unfussy." },
  "pai-morto": { title: "The Dead Father", blurb: "A giant, half-dead father is dragged across the land by his children." },
  "clube-da-luta": { title: "Fight Club", blurb: "An insomniac narrator meets Tyler Durden and starts an underground fight club." },
  "flores-do-mal": { title: "The Flowers of Evil", blurb: "Poems about boredom, desire and the beauty found in the decay of Paris." },
  "sereias-tita": { title: "The Sirens of Titan", blurb: "The richest man in America sets off on a journey through Mars, Mercury and Titan." },
  "morro-ventos": { title: "Wuthering Heights", blurb: "Heathcliff and Catherine, an obsessive love on the Yorkshire moors." },
  "homem-comum": { title: "Everyman", blurb: "A man's life told from his funeral, through illnesses, marriages and regrets." },
  "vicio-inerente": { title: "Inherent Vice", blurb: "Doc Sportello, a stoner detective, looks into an ex's disappearance in 1970 Los Angeles." },
  "complexo-portnoy": { title: "Portnoy's Complaint", blurb: "Alexander Portnoy unloads on his analyst's couch about his mother, guilt and desire." },
  "assombro": { title: "Haunted", blurb: "Writers lock themselves in an abandoned theater and tell ever more disturbing stories." },
  "coracao-trevas": { title: "Heart of Darkness", blurb: "Marlow travels up the Congo River in search of Kurtz, an agent lost in the jungle." },
  "casei-comunista": { title: "I Married a Communist", blurb: "Ira Ringold, a radio star, is destroyed by McCarthyism and by his own ex-wife." },
  "galapagos": { title: "Galápagos", blurb: "A million years from now, the last humans, on the Galápagos, have become something else." },
  "feel-good": { title: "Feel Good", blurb: "Alice, broke and raising a son, and Tom, an unsuccessful writer, decide to write a bestseller together." },
  "2666": { title: "2666", blurb: "Critics, a journalist and the city of Santa Teresa, where hundreds of women are murdered." },
};

export const BOOKS_EN: Book[] = BOOKS.map((b) => ({ ...b, ...EN[b.id] }));
