// A estante do Bernardo, na ordem em que os livros estão na prateleira de verdade.
// A versão em inglês fica em books.en.ts, ligada pelo `id`.
// As capas são desenhadas pelo próprio site com `color` (fundo) e `ink` (texto), então não precisa de imagem.

export interface Book {
  id: string;
  title: string;
  author: string;
  /** Ano da primeira publicação. */
  year: number;
  /** Número de páginas: define a grossura da lombada. */
  pages: number;
  /** Altura do livro na estante, em px (edições de bolso ~182, comuns ~214, grandes até 244). */
  height: number;
  color: string;
  ink: string;
  /** Resumo curto que aparece ao abrir o livro. */
  blurb: string;
}

export const BOOKS: Book[] = [
  { id: "goodbye-columbus", title: "Goodbye, Columbus", author: "Philip Roth", year: 1959, pages: 298, height: 210, color: "#2F8FD8", ink: "#FFFFFF", blurb: "Neil Klugman passa um verão apaixonado por Brenda Patimkin, entre diferenças de classe e identidade judaica em Nova Jersey." },
  { id: "alma-indomavel", title: "A alma indomável", author: "Michael A. Singer", year: 2007, pages: 208, height: 214, color: "#8CC4DE", ink: "#10304F", blurb: "Como observar os próprios pensamentos e emoções sem ficar preso a eles." },
  { id: "ficcoes", title: "Ficções", author: "Jorge Luis Borges", year: 1944, pages: 176, height: 208, color: "#1F1F22", ink: "#F2F2F2", blurb: "Labirintos, bibliotecas infinitas e espelhos em contos curtos que brincam com o tempo e a realidade." },
  { id: "deus-das-avencas", title: "O deus das avencas", author: "Daniel Galera", year: 2021, pages: 216, height: 214, color: "#B9D3C6", ink: "#1E3A2E", blurb: "Três novelas: um parto na véspera da eleição de 2018, um futuro de consciências digitais e uma comunidade depois do colapso." },
  { id: "homem-duplicado", title: "O homem duplicado", author: "José Saramago", year: 2002, pages: 320, height: 212, color: "#EFE8D8", ink: "#2A2A2A", blurb: "Um professor de história vê num filme um ator idêntico a ele e decide encontrá-lo." },
  { id: "120-dias", title: "Os 120 dias de Sodoma", author: "Marquês de Sade", year: 1785, pages: 528, height: 214, color: "#16181D", ink: "#E6E6E6", blurb: "Quatro libertinos se trancam num castelo. O livro mais extremo de Sade, escrito na Bastilha." },
  { id: "graca-infinita", title: "Graça infinita", author: "David Foster Wallace", year: 1996, pages: 1144, height: 240, color: "#F4F2EC", ink: "#C9A520", blurb: "Uma academia de tênis, uma casa de recuperação e um filme tão divertido que quem assiste não consegue parar." },
  { id: "brief-interviews", title: "Brief Interviews with Hideous Men", author: "David Foster Wallace", year: 1999, pages: 273, height: 210, color: "#6E1F27", ink: "#F1E6D8", blurb: "Contos sobre solidão, autoconsciência e homens tentando se explicar." },
  { id: "antkind", title: "Antkind", author: "Charlie Kaufman", year: 2020, pages: 720, height: 236, color: "#141414", ink: "#F2C94C", blurb: "Um crítico de cinema tenta reconstruir de memória um filme de três meses de duração que só ele viu." },
  { id: "morte-do-pai", title: "A morte do pai", author: "Karl Ove Knausgård", year: 2009, pages: 512, height: 236, color: "#F2F2F2", ink: "#1D1D1F", blurb: "Primeiro volume de Minha luta: a adolescência do autor e a morte do pai alcoólatra." },
  { id: "barba-ensopada", title: "Barba ensopada de sangue", author: "Daniel Galera", year: 2012, pages: 424, height: 214, color: "#B5212F", ink: "#FFF1EC", blurb: "Um professor de educação física se muda para Garopaba para descobrir o que aconteceu com o avô." },
  { id: "bras-cubas", title: "Memórias póstumas de Brás Cubas", author: "Machado de Assis", year: 1881, pages: 256, height: 182, color: "#F3EFE6", ink: "#2A2A2A", blurb: "Um defunto autor conta a própria vida com ironia, começando pela morte." },
  { id: "trainspotting", title: "Trainspotting", author: "Irvine Welsh", year: 1993, pages: 352, height: 210, color: "#F26A1B", ink: "#1D1D1F", blurb: "Renton e os amigos entre a heroína, o desemprego e a Edimburgo dos anos 80." },
  { id: "processo", title: "O processo", author: "Franz Kafka", year: 1925, pages: 288, height: 182, color: "#17181B", ink: "#FFFFFF", blurb: "Josef K. é preso numa manhã sem saber de quê, e nunca vai descobrir." },
  { id: "sala-danuza", title: "Na sala com Danuza", author: "Danuza Leão", year: 1992, pages: 176, height: 214, color: "#F4EFE6", ink: "#2A2A2A", blurb: "Um guia de boas maneiras e convivência, com humor e sem frescura." },
  { id: "pai-morto", title: "O pai morto", author: "Donald Barthelme", year: 1975, pages: 224, height: 218, color: "#1A1A1A", ink: "#E8C24A", blurb: "Um pai gigante, meio morto, é arrastado pelos filhos numa longa viagem." },
  { id: "clube-da-luta", title: "Clube da luta", author: "Chuck Palahniuk", year: 1996, pages: 272, height: 216, color: "#EFE9DE", ink: "#D7262F", blurb: "Um narrador com insônia conhece Tyler Durden e funda um clube clandestino de luta." },
  { id: "flores-do-mal", title: "As flores do mal", author: "Charles Baudelaire", year: 1857, pages: 488, height: 214, color: "#1B1C20", ink: "#E6E6E6", blurb: "Poemas sobre tédio, desejo e a beleza que existe na decadência de Paris." },
  { id: "sereias-tita", title: "As sereias de Titã", author: "Kurt Vonnegut", year: 1959, pages: 336, height: 216, color: "#F29A1F", ink: "#1D1D1F", blurb: "O homem mais rico dos Estados Unidos parte numa viagem por Marte, Mercúrio e Titã." },
  { id: "morro-ventos", title: "O morro dos ventos uivantes", author: "Emily Brontë", year: 1847, pages: 416, height: 240, color: "#2BB3A6", ink: "#1E2A5A", blurb: "Heathcliff e Catherine, um amor obsessivo nos campos de Yorkshire." },
  { id: "homem-comum", title: "Homem comum", author: "Philip Roth", year: 2006, pages: 136, height: 212, color: "#F4F2EE", ink: "#1D1D1F", blurb: "A vida de um homem contada a partir do seu enterro, entre doenças, casamentos e arrependimentos." },
  { id: "vicio-inerente", title: "Vício inerente", author: "Thomas Pynchon", year: 2009, pages: 456, height: 214, color: "#8DC63F", ink: "#1E3A10", blurb: "Doc Sportello, detetive maconheiro, investiga o sumiço de uma ex na Los Angeles de 1970." },
  { id: "complexo-portnoy", title: "O complexo de Portnoy", author: "Philip Roth", year: 1969, pages: 248, height: 216, color: "#1F3A52", ink: "#F2EDE4", blurb: "Alexander Portnoy desabafa no divã sobre a mãe, a culpa e o desejo." },
  { id: "assombro", title: "Assombro", author: "Chuck Palahniuk", year: 2005, pages: 416, height: 214, color: "#5B6FD6", ink: "#FFFFFF", blurb: "Escritores se trancam num teatro abandonado e contam histórias cada vez mais perturbadoras." },
  { id: "coracao-trevas", title: "Coração das trevas", author: "Joseph Conrad", year: 1899, pages: 176, height: 204, color: "#F1EEE8", ink: "#2A2A2A", blurb: "Marlow sobe o rio Congo atrás de Kurtz, um agente que se perdeu na selva." },
  { id: "casei-comunista", title: "Casei com um comunista", author: "Philip Roth", year: 1998, pages: 392, height: 212, color: "#F2F0EB", ink: "#2A2A2A", blurb: "Ira Ringold, astro do rádio, é destruído pelo macarthismo e pela própria ex-mulher." },
  { id: "galapagos", title: "Galápagos", author: "Kurt Vonnegut", year: 1985, pages: 320, height: 214, color: "#E8836A", ink: "#1F5E7A", blurb: "Um milhão de anos no futuro, os últimos humanos, nas Galápagos, viraram outra coisa." },
  { id: "feel-good", title: "Feel Good", author: "Thomas Gunzig", year: 2019, pages: 400, height: 186, color: "#F4F2EE", ink: "#C8232C", blurb: "Alice, sem dinheiro e com um filho, e Tom, escritor sem sucesso, decidem escrever juntos um best-seller." },
  { id: "2666", title: "2666", author: "Roberto Bolaño", year: 2004, pages: 856, height: 244, color: "#F3F0E8", ink: "#1E6E86", blurb: "Críticos, um jornalista e a cidade de Santa Teresa, onde centenas de mulheres são assassinadas." },
];
