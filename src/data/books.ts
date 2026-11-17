// Estante de livros lidos. Os sete abaixo são EXEMPLOS (clássicos famosos) só para testar a estante 3D:
// troque pelos livros que você leu. A versão em inglês fica em books.en.ts, ligada pelo `id`.
// As capas são desenhadas pelo próprio site com `color` (fundo) e `ink` (texto), então não precisa de imagem.

export interface Book {
  id: string;
  title: string;
  author: string;
  /** Ano da primeira publicação. */
  year: number;
  /** Número de páginas: define a grossura da lombada. */
  pages: number;
  /** Altura do livro na estante, em px (entre 200 e 260 fica bom). */
  height: number;
  color: string;
  ink: string;
  /** Resumo curto que aparece ao abrir o livro. */
  blurb: string;
}

export const BOOKS: Book[] = [
  { id: "cem-anos", title: "Cem anos de solidão", author: "Gabriel García Márquez", year: 1967, pages: 448, height: 246, color: "#E8B04A", ink: "#3B2208", blurb: "Sete gerações da família Buendía na cidade imaginária de Macondo, entre o real e o fantástico." },
  { id: "1984", title: "1984", author: "George Orwell", year: 1949, pages: 416, height: 232, color: "#B3261E", ink: "#FFF4EC", blurb: "Winston Smith tenta pensar por conta própria num Estado que vigia tudo e reescreve o passado." },
  { id: "dom-casmurro", title: "Dom Casmurro", author: "Machado de Assis", year: 1899, pages: 256, height: 214, color: "#24364F", ink: "#E9D8B4", blurb: "Bentinho conta a própria história com Capitu, e o leitor decide até onde confiar no narrador." },
  { id: "pequeno-principe", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", year: 1943, pages: 96, height: 204, color: "#7FB7E6", ink: "#10304F", blurb: "Um piloto perdido no deserto conhece um menino vindo de um asteroide, com uma rosa e muitas perguntas." },
  { id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", year: 2011, pages: 472, height: 238, color: "#F2EEE6", ink: "#1D1D1F", blurb: "Uma breve história da humanidade, das primeiras ferramentas às revoluções agrícola, científica e digital." },
  { id: "hobbit", title: "O Hobbit", author: "J. R. R. Tolkien", year: 1937, pages: 336, height: 222, color: "#2F6B3E", ink: "#F3E3B5", blurb: "Bilbo Bolseiro sai do conforto da sua toca para uma aventura com treze anões e um dragão." },
  { id: "duna", title: "Duna", author: "Frank Herbert", year: 1965, pages: 680, height: 254, color: "#C8642B", ink: "#FFF1E0", blurb: "Paul Atreides chega a Arrakis, o planeta deserto onde está a especiaria mais valiosa do universo." },
];
