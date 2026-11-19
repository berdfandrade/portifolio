// Estrutura de uma leitura longa em seções (abas Astral e Humor da página Sobre).
// `K` são as chaves dos ícones que cada leitura usa; o componente que a mostra troca a chave pelo ícone.
// Negrito: **texto**.
export type Block<K extends string> =
  | { p: string }
  | { h3: string }
  | { list: string[] }
  | { steps: string[] }
  | { quote: string }
  | { note: string }
  | { cards: { glyph: K; title: string; label: string; text: string }[] }
  | { versus: { glyph: K; title: string; text: string }[] }
  | { table: { head: string[]; rows: string[][] } };

export interface ReadingSection<K extends string> {
  id: string;
  number: string;
  glyphs: K[];
  title: string;
  blocks: Block<K>[];
}

export interface Reading<K extends string> {
  eyebrow: string;
  title: string;
  tocLabel: string;
  intro: Block<K>[];
  sections: ReadingSection<K>[];
}
