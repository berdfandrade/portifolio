// English version of Bernardo's philosophies. Same structure as philosophy.ts.
import type { Reading } from "./reading";
import type { PhiloIcon } from "./philosophy";

export const PHILOSOPHY_EN: Reading<PhiloIcon> = {
  eyebrow: "Philosophies",
  title: "How Bernardo sees the world",
  tocLabel: "In this reading",
  intro: [
    { p: "A materialist who suspects the power of consciousness, an artist fascinated by engineering, a programmer drawn to philosophy and a critic of society who still believes in the transformative power of human creation." },
  ],
  sections: [
    {
      id: "materia-consciencia",
      number: "01",
      glyphs: ["hammer-sickle", "consciousness"],
      title: "Matter and consciousness",
      blocks: [
        { p: "Bernardo is a **Marxist materialist** in his view of society, but he strongly suspects that we live in a reality projected by our hearts and our consciousness. Though they seem contradictory, these two perspectives live side by side in the way he sees the world." },
        {
          versus: [
            { glyph: "hammer-sickle", title: "Materialism", text: "Material conditions deeply shape human existence." },
            { glyph: "consciousness", title: "Consciousness", text: "In the ideas of **Neville Goddard** and **Seth**, consciousness takes part in building reality." },
          ],
        },
        { p: "He sees some philosophical overlap between these ideas and the questions **quantum physics** raises about the nature of reality and observation." },
        { note: "He recognizes that this is not scientific proof that the mind creates the physical world." },
      ],
    },
    {
      id: "engenharia-arte",
      number: "02",
      glyphs: ["class", "engineering", "art"],
      title: "Engineering and art",
      blocks: [
        { p: "He believes that great social change depends on the working class gaining **class consciousness**, but also on bringing together engineering thinking and a deep commitment to the arts. This conviction comes from his own path, split between an artistic education and computer programming." },
        {
          versus: [
            { glyph: "engineering", title: "Engineering", text: "The human ability to reorganize reality." },
            { glyph: "art", title: "Art", text: "The sensitivity to ask why, and for whom, that reality should be changed." },
          ],
        },
      ],
    },
    {
      id: "referencias",
      number: "03",
      glyphs: ["davinci", "bowie", "star"],
      title: "References",
      blocks: [
        { p: "His fascination with these figures says a lot about him. Though they come from different worlds, each of them represents, in some way, a **refusal to accept the usual limits** of their field." },
        {
          cards: [
            { glyph: "davinci", label: "Renaissance", title: "Leonardo da Vinci", text: "For uniting science, art and invention." },
            { glyph: "bowie", label: "Music", title: "David Bowie", text: "For his ability to reinvent his own identity." },
            { glyph: "glauber", label: "Film", title: "Glauber Rocha", text: "For seeing cinema as a tool of aesthetic and political rupture." },
            { glyph: "torvalds", label: "Software", title: "Linus Torvalds", text: "For showing how a technical architecture can change the world through collaboration." },
            { glyph: "star", label: "Politics", title: "Vladimir Lenin", text: "For turning a theoretical reading of society into political organization and revolutionary action, understanding that changing social structures takes not just ideas but strategy, discipline and collective mobilization." },
          ],
        },
      ],
    },
    {
      id: "desmontar",
      number: "04",
      glyphs: ["wrench", "blueprint"],
      title: "Take apart and rebuild",
      blocks: [
        { p: "Bernardo is especially drawn to people who aren't content to consume the world as it is, but feel the need to **take it apart, understand how it works and rebuild it** differently. That curiosity shows up in his interest in political and economic systems as much as in software architecture, music, film and building digital tools." },
        { p: "He has an almost romantic fascination with the idea of fixing the world through engineering, architecture and imagination. Not out of a naive belief that every human problem has a technical solution, but from the conviction that many of the systems that organize our lives are **human constructions** and can therefore be redesigned." },
        { quote: "If an institution works badly, if a technology limits creativity or if a social structure causes needless suffering, his first reaction is to ask why things have to stay that way." },
      ],
    },
    {
      id: "fronteiras",
      number: "05",
      glyphs: ["disciplines"],
      title: "No borders between disciplines",
      blocks: [
        { p: "This stance also reveals a certain intellectual restlessness. Bernardo finds it hard to see the borders between disciplines as final barriers." },
        { list: ["**Programming** can be art.", "**Film** can be philosophy.", "**Architecture** can be politics.", "Building **software** can be as expressive as composing a song."] },
        { p: "He cares less about specialization as an identity and more about combining seemingly distant kinds of knowledge to make something new." },
      ],
    },
    {
      id: "idealismo-ceticismo",
      number: "06",
      glyphs: ["balance"],
      title: "Idealism and skepticism",
      blocks: [
        { p: "There is also a constant tension between his idealism and his skepticism. He distrusts overly simple explanations, unquestionable authorities and social conventions that survive only because they have always existed." },
        { p: "At the same time, he keeps a kind of **stubborn hope** in human creativity. He can look at the world with deep disenchantment and still believe that building something is worth it." },
      ],
    },
    {
      id: "sintese",
      number: "07",
      glyphs: ["question", "heart"],
      title: "Synthesis",
      blocks: [
        { p: "Deep down, one question keeps running through him:" },
        { quote: "If we were able to build the world we live in, why wouldn't we be able to build a better one?" },
        { p: "Perhaps this is the contradiction that defines him best:" },
        { list: ["a **materialist** who suspects the power of consciousness;", "an **artist** fascinated by engineering;", "a **programmer** drawn to philosophy;", "and a **critic of society** who still deeply believes in the transformative power of human creation."] },
      ],
    },
  ],
};
