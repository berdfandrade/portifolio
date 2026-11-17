// Skill Tree: cinco ramos da stack e um de habilidades humanas, cada um uma pequena árvore numa grade.
// Os ramos de cada grupo ("stack" ou "human") ficam num painel próprio na página.
// Status: "done" = usada em trabalho; "wip" = em projetos e estudos; "locked" = próximos passos.
// `requires` liga cada habilidade às que vêm antes dela; quem a lista como requisito é o que ela desbloqueia.
// Os nomes dos status ficam em src/i18n/strings.ts e a versão em inglês em skills.en.ts.

export type SkillStatus = "done" | "wip" | "locked";

export interface Skill {
  id: string;
  label: string;
  status: SkillStatus;
  desc: string;
  usedIn: string;
  /** Caminho SVG (viewBox 24×24, traço) do ícone. */
  icon: string;
  /** Posição na grade do ramo: coluna (da esquerda, a partir de 0) e linha (de cima para baixo). */
  col: number;
  row: number;
  /** Habilidades deste ramo que vêm antes desta (as linhas da árvore). */
  requires?: string[];
}

export interface Branch {
  /** Painel em que o ramo aparece: a stack técnica ou as habilidades humanas. */
  group: "stack" | "human";
  tag: string;
  name: string;
  /** Cor dos blocos e das linhas do ramo. */
  tone: string;
  /** Cor do texto do ramo (com contraste suficiente sobre o fundo). */
  label: string;
  skills: Skill[];
}

export const TREE: Branch[] = [
  {
    group: "stack",
    tag: "Ramo 1",
    name: "Back-end",
    tone: "#1F9D55",
    label: "#1A8A4A",
    skills: [
      { id: "js", label: "JavaScript", status: "done", col: 1, row: 0, desc: "A linguagem por trás de tudo, do navegador ao servidor.", usedIn: "Flow Lab Tech, in8, H3aven", icon: "M8 4c-2 0-3 1-3 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3" },
      { id: "ts", label: "TypeScript", status: "done", col: 0, row: 1, requires: ["js"], desc: "Tipagem para código mais seguro e fácil de manter.", usedIn: "Flow Lab Tech, Verdant, este site", icon: "M4 4h16v16H4zM8 9h8M12 9v8" },
      { id: "node", label: "Node.js", status: "done", col: 2, row: 1, requires: ["js"], desc: "Serviços de back-end em JavaScript e TypeScript, com Bun para builds rápidos.", usedIn: "Flow Lab Tech, in8, H3aven", icon: "M12 2l8.5 5v10L12 22l-8.5-5V7zM12 8v8" },
      { id: "nest", label: "NestJS", status: "done", col: 0, row: 2, requires: ["ts", "node"], desc: "APIs organizadas em módulos, com injeção de dependência e autenticação com JWT e Passport.", usedIn: "in8, Verdant, Mirvin", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" },
      { id: "express", label: "Express", status: "done", col: 2, row: 2, requires: ["node"], desc: "APIs enxutas com Express e Prisma ORM.", usedIn: "H3aven", icon: "M4 7h16M4 12h10M4 17h16" },
      { id: "api", label: "REST e WebSockets", status: "done", col: 0, row: 3, requires: ["nest"], desc: "APIs REST e mensagens em tempo real por WebSockets.", usedIn: "Flow Lab Tech, Verdant", icon: "M7 8l-4 4 4 4M17 8l4 4-4 4M10 12h4" },
      { id: "tests", label: "Testes automatizados", status: "done", col: 1, row: 3, requires: ["nest"], desc: "Testes unitários, de integração e e2e com Jest, Vitest e MongoMemoryServer.", usedIn: "Flow Lab Tech, H3aven, Mirvin", icon: "M10 3h4M11 3v7l-6 9h14l-6-9V3M8 15h8" },
      { id: "fastify", label: "Fastify", status: "done", col: 2, row: 3, requires: ["express"], desc: "APIs rápidas com Fastify, incluindo manutenção de sistemas legados.", usedIn: "in8", icon: "M13 2L4 14h7l-1 8 9-12h-7z" },
      { id: "payments", label: "Stripe e Twilio", status: "done", col: 0, row: 4, requires: ["api"], desc: "Assinaturas e pagamentos com Stripe, notificações e mensagens com Twilio.", usedIn: "Flow Lab Tech", icon: "M3 6h18v12H3zM3 10h18M7 15h4" },
      { id: "arch", label: "Clean Architecture e DDD", status: "done", col: 1, row: 4, requires: ["tests"], desc: "Camadas bem separadas e entidades de domínio claras, para código que dura.", usedIn: "Mirvin, Flow Lab Tech", icon: "M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 2",
    name: "Python e automação",
    tone: "#5E5CE6",
    label: "#5E5CE6",
    skills: [
      { id: "py", label: "Python", status: "done", col: 1, row: 0, desc: "Scripts, automações e microsserviços.", usedIn: "in8, Verdant, Event Hub", icon: "M8 8V6a4 4 0 0 1 8 0v4H8a4 4 0 0 0-4 4 4 4 0 0 0 4 4M16 16v2a4 4 0 0 1-8 0v-4h8a4 4 0 0 0 4-4 4 4 0 0 0-4-4M10 5h.01M14 19h.01" },
      { id: "flask", label: "Flask", status: "wip", col: 0, row: 1, requires: ["py"], desc: "Aplicações web simples em Python.", usedIn: "Certificado Alura", icon: "M10 3h4M11 3v7l-6 9h14l-6-9V3" },
      { id: "scrape", label: "Web scraping", status: "done", col: 2, row: 1, requires: ["py"], desc: "Crawlers em grande escala e automação de navegadores.", usedIn: "in8, Aplicador de Vagas", icon: "M13 3H6v18h5M13 3l4 4v2M13 3v4h4M16 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M18.2 18.2L21 21" },
      { id: "fastapi", label: "FastAPI", status: "wip", col: 0, row: 2, requires: ["flask"], desc: "APIs assíncronas em Python, com filas e workers.", usedIn: "Event Hub", icon: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zM13 6l-5 7h4l-1 5 5-7h-4z" },
      { id: "ext", label: "Extensões e Electron", status: "done", col: 1, row: 2, requires: ["scrape"], desc: "Extensões para Chrome, Firefox, Opera e Edge, e apps desktop com Electron.", usedIn: "in8", icon: "M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4H4a2 2 0 1 1 0-4h2V6h4z" },
      { id: "rust", label: "Rust", status: "done", col: 2, row: 2, requires: ["scrape"], desc: "Partes críticas de crawlers reescritas de JavaScript para Rust, e um banco distribuído do zero.", usedIn: "in8, Ironclad", icon: "M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" },
      { id: "micro", label: "Microsserviços", status: "wip", col: 0, row: 3, requires: ["fastapi"], desc: "Serviços pequenos e independentes conversando por HTTP.", usedIn: "Verdant", icon: "M5 5h4v4H5zM15 5h4v4h-4zM10 15h4v4h-4zM7 9v3h10V9M12 12v3" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 3",
    name: "Front-end",
    tone: "#0071E3",
    label: "var(--link)",
    skills: [
      { id: "html", label: "HTML e CSS", status: "done", col: 1, row: 0, desc: "Estrutura semântica, layout responsivo e acessibilidade.", usedIn: "Todos os projetos web", icon: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" },
      { id: "react", label: "React", status: "done", col: 0, row: 1, requires: ["html"], desc: "Interfaces em componentes integradas às APIs.", usedIn: "Flow Lab Tech, H3aven, este site", icon: "M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4zM7.5 4.2c1.7-1 5.3 1.4 7.8 5.8s3 8.7 1.2 9.8-5.3-1.4-7.8-5.8-3-8.7-1.2-9.8zM16.5 4.2c1.7 1 1.2 5.4-1.2 9.8s-6.1 6.8-7.8 5.8-1.2-5.4 1.2-9.8 6.1-6.8 7.8-5.8z" },
      { id: "tailwind", label: "Tailwind CSS", status: "done", col: 2, row: 1, requires: ["html"], desc: "Estilização utilitária rápida e consistente.", usedIn: "Flow Lab Tech", icon: "M3 10c2-4 5-5 8-3 2 1.5 3 3 6 1M7 16c2-4 5-5 8-3 2 1.5 3 3 6 1" },
      { id: "next", label: "Next.js", status: "done", col: 0, row: 2, requires: ["react"], desc: "Aplicações React com rotas e renderização no servidor.", usedIn: "H3aven", icon: "M4 4h16v16H4zM9 16V8l6 8V8" },
      { id: "rn", label: "React Native", status: "wip", col: 1, row: 2, requires: ["react"], desc: "Apps para iOS e Android com Expo.", usedIn: "Verdant", icon: "M7 2h10v20H7zM11 18h2" },
      { id: "chakra", label: "Chakra UI", status: "done", col: 2, row: 2, requires: ["tailwind"], desc: "Bibliotecas de componentes para montar telas rápido.", usedIn: "H3aven", icon: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" },
      { id: "a11y", label: "Acessibilidade", status: "done", col: 2, row: 3, requires: ["chakra"], desc: "Interfaces acessíveis e responsivas, do teclado ao leitor de tela.", usedIn: "H3aven, este site", icon: "M12 4a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3zM5 9l7 1 7-1M12 10v5l-3 6M12 15l3 6" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 4",
    name: "Dados",
    tone: "#D9480F",
    label: "#C2410C",
    skills: [
      { id: "model", label: "Modelagem de dados", status: "done", col: 1, row: 0, desc: "Entidades, relações e o formato certo para cada dado.", usedIn: "Verdant, Mirvin", icon: "M4 4h6v5H4zM14 15h6v5h-6zM7 9v4h10v2" },
      { id: "sql", label: "SQL", status: "done", col: 0, row: 1, requires: ["model"], desc: "Consultas, índices e bancos relacionais.", usedIn: "Flow Lab Tech, in8", icon: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" },
      { id: "mongo", label: "MongoDB", status: "done", col: 2, row: 1, requires: ["model"], desc: "Documentos, agregações e Mongoose.", usedIn: "Verdant, Mirvin, Event Hub", icon: "M12 2c4 4 5 9 0 15-5-6-4-11 0-15zM12 17v5" },
      { id: "pg", label: "PostgreSQL", status: "done", col: 0, row: 2, requires: ["sql"], desc: "Banco principal dos serviços em produção.", usedIn: "Flow Lab Tech", icon: "M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3v10c0 1.7-3.1 3-7 3s-7-1.3-7-3zM9 10h6M9 14h6" },
      { id: "mysql", label: "MySQL", status: "done", col: 1, row: 2, requires: ["sql"], desc: "APIs com MySQL e manutenção de bases legadas.", usedIn: "in8", icon: "M4 18c3-8 8-12 16-12-2 2-3 4-3 7 0 3-2 5-5 5H4z" },
      { id: "redis", label: "Redis", status: "done", col: 2, row: 2, requires: ["mongo"], desc: "Cache e filas de tarefas assíncronas para cargas pesadas.", usedIn: "in8, Verdant, Event Hub", icon: "M4 6l8-3 8 3-8 3zM4 6v4l8 3 8-3V6M4 14l8 3 8-3" },
      { id: "prisma", label: "Prisma ORM", status: "done", col: 0, row: 3, requires: ["pg"], desc: "Acesso a dados tipado e migrações versionadas.", usedIn: "H3aven", icon: "M12 3L4 19l8 3 8-6zM12 3v19" },
      { id: "migrations", label: "Migrações de dados", status: "done", col: 1, row: 3, requires: ["mysql"], desc: "Mover e transformar dados sem parar o sistema.", usedIn: "in8", icon: "M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 5",
    name: "DevOps",
    tone: "#C2255C",
    label: "#C2255C",
    skills: [
      { id: "linux", label: "Linux e Bash", status: "done", col: 0, row: 0, desc: "Terminal, processos e scripts que automatizam o dia a dia.", usedIn: "in8, printa", icon: "M3 5h18v14H3zM7 10l3 2-3 2M12 15h5" },
      { id: "git", label: "Git e GitHub", status: "done", col: 2, row: 0, desc: "Versionamento, branches e code review.", usedIn: "Todos os projetos", icon: "M6 3v12M6 15a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM18 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM18 12c0 4-6 3-12 6" },
      { id: "docker", label: "Docker", status: "done", col: 0, row: 1, requires: ["linux"], desc: "Ambientes iguais no desenvolvimento e em produção.", usedIn: "Flow Lab Tech, in8", icon: "M3 12h18c0 4-4 8-9 8s-9-4-9-8zM6 12V9h3v3M9 9V6h3v6M12 9h3v3" },
      { id: "ci", label: "CI/CD", status: "done", col: 2, row: 1, requires: ["git"], desc: "Testes e deploys automáticos a cada mudança.", usedIn: "mac, Owlio", icon: "M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5" },
      { id: "aws", label: "AWS S3", status: "done", col: 0, row: 2, requires: ["docker"], desc: "Armazenamento e entrega de arquivos na nuvem.", usedIn: "Flow Lab Tech", icon: "M7 18a5 5 0 0 1 0-10 6 6 0 0 1 11 2 4 4 0 0 1 0 8z" },
      { id: "deploy", label: "Railway e Vercel", status: "done", col: 1, row: 2, requires: ["docker", "ci"], desc: "Deploy de serviços em contêiner e de front-ends.", usedIn: "Flow Lab Tech", icon: "M12 3c4 2 6 6 6 10l-3 3H9l-3-3c0-4 2-8 6-10zM12 9a2 2 0 1 0 0 4a2 2 0 0 0 0-4zM9 19l-2 3M15 19l2 3" },
    ],
  },
  {
    group: "human",
    tag: "Ramo 6",
    name: "Habilidades humanas",
    tone: "#C99A1E",
    label: "#8A6A0E",
    skills: [
      { id: "comm", label: "Clareza na comunicação", status: "done", col: 2, row: 0, desc: "Explicar ideias e decisões técnicas de um jeito simples, por escrito e em conversa.", usedIn: "Code reviews, reuniões e documentação", icon: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5" },
      { id: "team", label: "Trabalho em equipe", status: "done", col: 1, row: 1, requires: ["comm"], desc: "Dividir o trabalho, revisar o código dos colegas e pedir ajuda cedo.", usedIn: "Todos os times por onde passei", icon: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 14.5a6 6 0 0 1 3 5.5" },
      { id: "org", label: "Organização", status: "done", col: 3, row: 1, requires: ["comm"], desc: "Tarefas quebradas em partes pequenas, prioridades claras e nada esquecido.", usedIn: "Projetos pessoais e de trabalho", icon: "M10 6h10M10 12h10M10 18h10M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" },
      { id: "humor", label: "Senso de humor", status: "done", col: 0, row: 2, requires: ["team"], desc: "Leveza para o time nos dias difíceis — e um comentário irônico na hora certa.", usedIn: "Todo dia", icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 14a5 5 0 0 0 8 0M9 9.5v.5M15 9.5v.5" },
      { id: "grit", label: "Persistência", status: "done", col: 4, row: 2, requires: ["org"], desc: "Ficar no problema até ele ceder, mesmo quando o bug é teimoso.", usedIn: "Ironclad e os bugs mais teimosos", icon: "M3 20l6-10 4 6 3-4 5 8zM13 4v6M13 4h5l-1.5 1.5L18 7h-5" },
    ],
  },
];

/** Todas as habilidades em ordem (para "Anterior" e "Próxima"), com o ramo e a posição na lista dele. */
export const flattenTree = (tree: Branch[]) =>
  tree.flatMap((branch) => branch.skills.map((skill, index) => ({ skill, branch, index })));
