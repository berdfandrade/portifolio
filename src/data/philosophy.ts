// Leitura das filosofias do Bernardo (aba Humor da página Sobre), em português.
// A versão em inglês fica em philosophy.en.ts, com a mesma estrutura. Os ícones ficam em PhilosophyReading.tsx.
import type { Reading } from "./reading";

export type PhiloIcon =
  | "hammer-sickle" | "star" | "class" | "consciousness" | "heart" | "quantum" | "engineering" | "art"
  | "davinci" | "bowie" | "glauber" | "torvalds" | "wrench" | "blueprint" | "disciplines" | "balance" | "question";

export const PHILOSOPHY: Reading<PhiloIcon> = {
  eyebrow: "Filosofias",
  title: "Como Bernardo enxerga o mundo",
  tocLabel: "Nesta leitura",
  intro: [
    { p: "Um materialista que suspeita do poder da consciência, um artista fascinado por engenharia, um programador interessado em filosofia e um crítico da sociedade que ainda acredita no potencial transformador da criação humana." },
  ],
  sections: [
    {
      id: "materia-consciencia",
      number: "01",
      glyphs: ["hammer-sickle", "consciousness"],
      title: "Matéria e consciência",
      blocks: [
        { p: "Bernardo é **marxista materialista** em sua visão social, mas tem uma grande suspeita de que vivemos em uma realidade projetada por nossos corações e nossas consciências. Embora pareçam contraditórias, essas duas perspectivas convivem em sua maneira de enxergar o mundo." },
        {
          versus: [
            { glyph: "hammer-sickle", title: "Materialismo", text: "As condições materiais determinam profundamente a existência humana." },
            { glyph: "consciousness", title: "Consciência", text: "Nas ideias de **Neville Goddard** e **Seth**, a consciência participa da construção da realidade." },
          ],
        },
        { p: "Enxerga algumas aproximações filosóficas entre essas ideias e os questionamentos da **física quântica** sobre a natureza da realidade e da observação." },
        { note: "Ele reconhece que isso não constitui uma comprovação científica de que a mente cria o mundo físico." },
      ],
    },
    {
      id: "engenharia-arte",
      number: "02",
      glyphs: ["class", "engineering", "art"],
      title: "Engenharia e arte",
      blocks: [
        { p: "Acredita que as grandes transformações sociais dependem da **tomada de consciência de classe** pela classe trabalhadora, mas também da união entre o pensamento de engenharia e um profundo comprometimento com as artes. Essa convicção nasce de sua própria trajetória, dividida entre a formação artística e a programação de computadores." },
        {
          versus: [
            { glyph: "engineering", title: "Engenharia", text: "A capacidade humana de reorganizar a realidade." },
            { glyph: "art", title: "Arte", text: "A sensibilidade necessária para questionar por que e para quem essa realidade deve ser transformada." },
          ],
        },
      ],
    },
    {
      id: "referencias",
      number: "03",
      glyphs: ["davinci", "bowie", "star"],
      title: "Referências",
      blocks: [
        { p: "Sua fascinação por essas figuras revela muito sobre sua personalidade. Embora pertençam a universos diferentes, todos representam, de alguma maneira, a **recusa em aceitar os limites convencionais** de suas áreas." },
        {
          cards: [
            { glyph: "davinci", label: "Renascimento", title: "Leonardo da Vinci", text: "Pela união entre ciência, arte e invenção." },
            { glyph: "bowie", label: "Música", title: "David Bowie", text: "Pela capacidade de reinventar a própria identidade." },
            { glyph: "glauber", label: "Cinema", title: "Glauber Rocha", text: "Por compreender o cinema como instrumento de ruptura estética e política." },
            { glyph: "torvalds", label: "Software", title: "Linus Torvalds", text: "Por demonstrar como uma arquitetura tecnológica pode transformar o mundo por meio da colaboração." },
            { glyph: "star", label: "Política", title: "Vladimir Lenin", text: "Por transformar uma interpretação teórica da sociedade em organização política e ação revolucionária, compreendendo que mudar as estruturas sociais exige não apenas ideias, mas estratégia, disciplina e mobilização coletiva." },
          ],
        },
      ],
    },
    {
      id: "desmontar",
      number: "04",
      glyphs: ["wrench", "blueprint"],
      title: "Desmontar e reconstruir",
      blocks: [
        { p: "Bernardo se interessa especialmente por pessoas que não se contentam em consumir o mundo tal como ele existe, mas sentem a necessidade de **desmontá-lo, compreender seus mecanismos e reconstruí-lo** de outra maneira. Essa curiosidade se manifesta tanto no interesse por sistemas políticos e econômicos quanto na arquitetura de software, na música, no cinema e na criação de ferramentas digitais." },
        { p: "Existe nele uma fascinação quase romântica pela possibilidade de consertar o mundo através da engenharia, da arquitetura e da imaginação. Não necessariamente pela crença ingênua de que todos os problemas humanos possuem soluções técnicas, mas pela convicção de que muitos dos sistemas que organizam nossas vidas são **construções humanas** e, portanto, podem ser redesenhados." },
        { quote: "Se uma instituição funciona mal, se uma tecnologia limita a criatividade ou se uma estrutura social produz sofrimento desnecessário, sua primeira reação é perguntar por que as coisas precisam continuar assim." },
      ],
    },
    {
      id: "fronteiras",
      number: "05",
      glyphs: ["disciplines"],
      title: "Sem fronteiras entre disciplinas",
      blocks: [
        { p: "Essa postura também revela uma personalidade marcada por certa inquietação intelectual. Bernardo tem dificuldade em enxergar as fronteiras entre disciplinas como barreiras definitivas." },
        { list: ["**Programação** pode ser arte.", "**Cinema** pode ser filosofia.", "**Arquitetura** pode ser política.", "A construção de um **software** pode ser tão expressiva quanto a composição de uma música."] },
        { p: "Interessa-se menos pela especialização como identidade e mais pela possibilidade de combinar conhecimentos aparentemente distantes para produzir algo novo." },
      ],
    },
    {
      id: "idealismo-ceticismo",
      number: "06",
      glyphs: ["balance"],
      title: "Idealismo e ceticismo",
      blocks: [
        { p: "Há também uma tensão permanente entre seu idealismo e seu ceticismo. Desconfia de explicações excessivamente simples, de autoridades incontestáveis e de convenções sociais que sobrevivem apenas porque sempre existiram." },
        { p: "Ao mesmo tempo, preserva uma espécie de **esperança obstinada** na criatividade humana. É capaz de olhar para o mundo com profundo desencanto e, ainda assim, acreditar que vale a pena construir alguma coisa." },
      ],
    },
    {
      id: "sintese",
      number: "07",
      glyphs: ["question", "heart"],
      title: "Síntese",
      blocks: [
        { p: "No fundo, sua personalidade é atravessada por uma pergunta recorrente:" },
        { quote: "Se fomos capazes de construir o mundo em que vivemos, por que não seríamos capazes de construir um mundo melhor?" },
        { p: "Talvez seja essa a contradição que melhor o define:" },
        { list: ["um **materialista** que suspeita do poder da consciência;", "um **artista** fascinado por engenharia;", "um **programador** interessado em filosofia;", "e um **crítico da sociedade** que ainda acredita profundamente no potencial transformador da criação humana."] },
      ],
    },
  ],
};
