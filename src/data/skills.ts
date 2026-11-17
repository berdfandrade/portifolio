// Skill Tree: três ramos, cada um uma sequência de habilidades.
// Cada habilidade "requer" a anterior do ramo e "desbloqueia" a seguinte.

export type SkillStatus = "done" | "wip" | "locked";

export interface Skill {
  id: string;
  label: string;
  status: SkillStatus;
  desc: string;
  usedIn: string;
  /** Caminho SVG (viewBox 24×24, traço) do ícone. */
  icon: string;
}

export interface Branch {
  tag: string;
  name: string;
  /** Cor dos blocos e das linhas do ramo. */
  tone: string;
  /** Cor do texto do ramo (com contraste suficiente sobre o fundo). */
  label: string;
  skills: Skill[];
}

export const STATUS: Record<SkillStatus, { text: string }> = {
  done: { text: "Dominada" },
  wip: { text: "Treinando" },
  locked: { text: "Bloqueada" },
};

export const TREE: Branch[] = [
  {
    tag: "Ramo 1",
    name: "Front-end",
    tone: "#0071E3",
    label: "var(--link)",
    skills: [
      { id: "html", label: "HTML", status: "done", desc: "A base de tudo: estrutura semântica e acessível.", usedIn: "Todos os projetos web", icon: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" },
      { id: "css", label: "CSS", status: "done", desc: "Layout com flex e grid, responsividade e animações.", usedIn: "Link na Bio", icon: "M18 3l3 3-9 9-3-3zM9 12c-3 0-5 2-5 5 0 1.5-1 2.5-2 3 4 1 9 0 9-5" },
      { id: "js", label: "JavaScript", status: "done", desc: "Lógica, DOM e interatividade no navegador.", usedIn: "Skill Tree, Link na Bio", icon: "M8 4c-2 0-3 1-3 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3" },
      { id: "react", label: "React", status: "wip", desc: "Componentes, estado e código separado em vários arquivos.", usedIn: "Skill Tree", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
      { id: "tailwind", label: "Tailwind", status: "wip", desc: "Estilização utilitária rápida e consistente.", usedIn: "Skill Tree", icon: "M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-2 0-3 2-1 3-1h1a3 3 0 0 0 3-3c0-5-4-9-9-9zM7.5 11h.01M10.5 7h.01M15.5 8h.01" },
      { id: "ts", label: "TypeScript", status: "locked", desc: "Tipagem para projetos maiores e mais seguros.", usedIn: "—", icon: "M4 4h16v16H4zM8 9h8M12 9v8" },
    ],
  },
  {
    tag: "Ramo 2",
    name: "Automação",
    tone: "#5E5CE6",
    label: "#5E5CE6",
    skills: [
      { id: "term", label: "Terminal", status: "done", desc: "Rodar scripts, flags e perfis direto da linha de comando.", usedIn: "Aplicador de Vagas", icon: "M3 5h18v14H3zM7 10l3 2-3 2M12 15h5" },
      { id: "cdp", label: "Chrome DevTools", status: "wip", desc: "Controlar um Chrome real via porta de depuração remota.", usedIn: "Aplicador de Vagas", icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" },
      { id: "pw", label: "Playwright", status: "wip", desc: "Automatizar navegação, cliques e formulários.", usedIn: "Aplicador de Vagas", icon: "M5 3l14 7-6 2-2 6zM13 13l6 6" },
      { id: "scrape", label: "Web scraping", status: "wip", desc: "Ler vagas e dados de LinkedIn, Glassdoor e Indeed.", usedIn: "Aplicador de Vagas", icon: "M13 3H6v18h5M13 3l4 4v2M13 3v4h4M16 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M18.2 18.2L21 21" },
      { id: "api", label: "APIs REST", status: "locked", desc: "Integrar serviços sem depender da interface.", usedIn: "—", icon: "M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5" },
      { id: "cron", label: "Bots agendados", status: "locked", desc: "Rodar automações sozinhas, no horário certo.", usedIn: "—", icon: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zM12 7v5l3 2" },
    ],
  },
  {
    tag: "Ramo 3",
    name: "Design",
    tone: "#E8345A",
    label: "#D1294F",
    skills: [
      { id: "figma", label: "Figma", status: "wip", desc: "Telas, fluxos e protótipos do zero.", usedIn: "Verdant", icon: "M12 3l6 8-6 10-6-10zM12 11v4" },
      { id: "ui", label: "UI Design", status: "wip", desc: "Hierarquia, espaçamento e interfaces claras.", usedIn: "Verdant, Portfólio", icon: "M3 4h18v16H3zM3 9h18M9 9v11" },
      { id: "brand", label: "Identidade visual", status: "wip", desc: "Criar e manter a cara de um produto.", usedIn: "Verdant", icon: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" },
      { id: "pixel", label: "Pixel art", status: "wip", desc: "Personagens e ícones quadradinho por quadradinho.", usedIn: "Avatar, Site pessoal", icon: "M4 4h16v16H4zM4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16" },
      { id: "ds", label: "Design System", status: "locked", desc: "Componentes e tokens reutilizáveis.", usedIn: "—", icon: "M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" },
      { id: "motion", label: "Motion", status: "locked", desc: "Animações que dão vida às interfaces.", usedIn: "—", icon: "M3 18c4 0 5-12 9-12s5 12 9 12M5 4l4 2.5L5 9z" },
    ],
  },
];

/** Todas as habilidades em ordem (para "Anterior" e "Próxima"), com o ramo e a posição nele. */
export const ALL_SKILLS = TREE.flatMap((branch) => branch.skills.map((skill, index) => ({ skill, branch, index })));
