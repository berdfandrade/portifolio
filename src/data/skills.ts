// Skill Tree: cinco ramos da stack e um de habilidades humanas, cada um uma pequena árvore numa grade.
// Os ramos de cada grupo ("stack" ou "human") ficam num painel próprio na página.
// Status: "done" = usada em trabalho; "wip" = em projetos e estudos; "locked" = próximos passos.
// `requires` liga cada habilidade às que vêm antes dela; quem a lista como requisito é o que ela desbloqueia.
// Os nomes dos status ficam em src/i18n/strings.ts e a versão em inglês em skills.en.ts.
// O ícone de cada habilidade é um sprite 14×14 (salvo a 6×) em public/assets/skills/<id>.png (máscara: a cor vem do ramo).

export type SkillStatus = "done" | "wip" | "locked";

export interface Skill {
  id: string;
  label: string;
  status: SkillStatus;
  desc: string;
  usedIn: string;
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
      { id: "js", label: "JavaScript", status: "done", col: 1, row: 0, desc: "A linguagem por trás de tudo, do navegador ao servidor.", usedIn: "Flow Lab Tech, in8, H3aven" },
      { id: "ts", label: "TypeScript", status: "done", col: 0, row: 1, requires: ["js"], desc: "Tipagem para código mais seguro e fácil de manter.", usedIn: "Flow Lab Tech, Verdant, este site" },
      { id: "node", label: "Node.js", status: "done", col: 2, row: 1, requires: ["js"], desc: "Serviços de back-end em JavaScript e TypeScript, com Bun para builds rápidos.", usedIn: "Flow Lab Tech, in8, H3aven" },
      { id: "nest", label: "NestJS", status: "done", col: 0, row: 2, requires: ["ts", "node"], desc: "APIs organizadas em módulos, com injeção de dependência e autenticação com JWT e Passport.", usedIn: "in8, Verdant, Mirvin" },
      { id: "express", label: "Express", status: "done", col: 2, row: 2, requires: ["node"], desc: "APIs enxutas com Express e Prisma ORM.", usedIn: "H3aven" },
      { id: "api", label: "REST e WebSockets", status: "done", col: 0, row: 3, requires: ["nest"], desc: "APIs REST e mensagens em tempo real por WebSockets.", usedIn: "Flow Lab Tech, Verdant" },
      { id: "tests", label: "Testes automatizados", status: "done", col: 1, row: 3, requires: ["nest"], desc: "Testes unitários, de integração e e2e com Jest, Vitest e MongoMemoryServer.", usedIn: "Flow Lab Tech, H3aven, Mirvin" },
      { id: "fastify", label: "Fastify", status: "done", col: 2, row: 3, requires: ["express"], desc: "APIs rápidas com Fastify, incluindo manutenção de sistemas legados.", usedIn: "in8" },
      { id: "payments", label: "Stripe e Twilio", status: "done", col: 0, row: 4, requires: ["api"], desc: "Assinaturas e pagamentos com Stripe, notificações e mensagens com Twilio.", usedIn: "Flow Lab Tech" },
      { id: "arch", label: "Clean Architecture e DDD", status: "done", col: 1, row: 4, requires: ["tests"], desc: "Camadas bem separadas e entidades de domínio claras, para código que dura.", usedIn: "Mirvin, Flow Lab Tech" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 2",
    name: "Python e automação",
    tone: "#5E5CE6",
    label: "#5E5CE6",
    skills: [
      { id: "py", label: "Python", status: "done", col: 1, row: 0, desc: "Scripts, automações e microsserviços.", usedIn: "in8, Verdant, Event Hub" },
      { id: "flask", label: "Flask", status: "wip", col: 0, row: 1, requires: ["py"], desc: "Aplicações web simples em Python.", usedIn: "Certificado Alura" },
      { id: "scrape", label: "Web scraping", status: "done", col: 2, row: 1, requires: ["py"], desc: "Crawlers em grande escala e automação de navegadores.", usedIn: "in8, Aplicador de Vagas" },
      { id: "fastapi", label: "FastAPI", status: "wip", col: 0, row: 2, requires: ["flask"], desc: "APIs assíncronas em Python, com filas e workers.", usedIn: "Event Hub" },
      { id: "ext", label: "Extensões e Electron", status: "done", col: 1, row: 2, requires: ["scrape"], desc: "Extensões para Chrome, Firefox, Opera e Edge, e apps desktop com Electron.", usedIn: "in8" },
      { id: "rust", label: "Rust", status: "done", col: 2, row: 2, requires: ["scrape"], desc: "Partes críticas de crawlers reescritas de JavaScript para Rust, e um banco distribuído do zero.", usedIn: "in8, Ironclad" },
      { id: "micro", label: "Microsserviços", status: "wip", col: 0, row: 3, requires: ["fastapi"], desc: "Serviços pequenos e independentes conversando por HTTP.", usedIn: "Verdant" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 3",
    name: "Front-end",
    tone: "#0071E3",
    label: "var(--link)",
    skills: [
      { id: "html", label: "HTML e CSS", status: "done", col: 1, row: 0, desc: "Estrutura semântica, layout responsivo e acessibilidade.", usedIn: "Todos os projetos web" },
      { id: "react", label: "React", status: "done", col: 0, row: 1, requires: ["html"], desc: "Interfaces em componentes integradas às APIs.", usedIn: "Flow Lab Tech, H3aven, este site" },
      { id: "tailwind", label: "Tailwind CSS", status: "done", col: 2, row: 1, requires: ["html"], desc: "Estilização utilitária rápida e consistente.", usedIn: "Flow Lab Tech" },
      { id: "next", label: "Next.js", status: "done", col: 0, row: 2, requires: ["react"], desc: "Aplicações React com rotas e renderização no servidor.", usedIn: "H3aven" },
      { id: "rn", label: "React Native", status: "wip", col: 1, row: 2, requires: ["react"], desc: "Apps para iOS e Android com Expo.", usedIn: "Verdant" },
      { id: "chakra", label: "Chakra UI", status: "done", col: 2, row: 2, requires: ["tailwind"], desc: "Bibliotecas de componentes para montar telas rápido.", usedIn: "H3aven" },
      { id: "a11y", label: "Acessibilidade", status: "done", col: 2, row: 3, requires: ["chakra"], desc: "Interfaces acessíveis e responsivas, do teclado ao leitor de tela.", usedIn: "H3aven, este site" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 4",
    name: "Dados",
    tone: "#D9480F",
    label: "#C2410C",
    skills: [
      { id: "model", label: "Modelagem de dados", status: "done", col: 1, row: 0, desc: "Entidades, relações e o formato certo para cada dado.", usedIn: "Verdant, Mirvin" },
      { id: "sql", label: "SQL", status: "done", col: 0, row: 1, requires: ["model"], desc: "Consultas, índices e bancos relacionais.", usedIn: "Flow Lab Tech, in8" },
      { id: "mongo", label: "MongoDB", status: "done", col: 2, row: 1, requires: ["model"], desc: "Documentos, agregações e Mongoose.", usedIn: "Verdant, Mirvin, Event Hub" },
      { id: "pg", label: "PostgreSQL", status: "done", col: 0, row: 2, requires: ["sql"], desc: "Banco principal dos serviços em produção.", usedIn: "Flow Lab Tech" },
      { id: "mysql", label: "MySQL", status: "done", col: 1, row: 2, requires: ["sql"], desc: "APIs com MySQL e manutenção de bases legadas.", usedIn: "in8" },
      { id: "redis", label: "Redis", status: "done", col: 2, row: 2, requires: ["mongo"], desc: "Cache e filas de tarefas assíncronas para cargas pesadas.", usedIn: "in8, Verdant, Event Hub" },
      { id: "prisma", label: "Prisma ORM", status: "done", col: 0, row: 3, requires: ["pg"], desc: "Acesso a dados tipado e migrações versionadas.", usedIn: "H3aven" },
      { id: "migrations", label: "Migrações de dados", status: "done", col: 1, row: 3, requires: ["mysql"], desc: "Mover e transformar dados sem parar o sistema.", usedIn: "in8" },
    ],
  },
  {
    group: "stack",
    tag: "Ramo 5",
    name: "DevOps",
    tone: "#C2255C",
    label: "#C2255C",
    skills: [
      { id: "linux", label: "Linux e Bash", status: "done", col: 0, row: 0, desc: "Terminal, processos e scripts que automatizam o dia a dia.", usedIn: "in8, printa" },
      { id: "git", label: "Git e GitHub", status: "done", col: 2, row: 0, desc: "Versionamento, branches e code review.", usedIn: "Todos os projetos" },
      { id: "docker", label: "Docker", status: "done", col: 0, row: 1, requires: ["linux"], desc: "Ambientes iguais no desenvolvimento e em produção.", usedIn: "Flow Lab Tech, in8" },
      { id: "ci", label: "CI/CD", status: "done", col: 2, row: 1, requires: ["git"], desc: "Testes e deploys automáticos a cada mudança.", usedIn: "mac, Owlio" },
      { id: "aws", label: "AWS S3", status: "done", col: 0, row: 2, requires: ["docker"], desc: "Armazenamento e entrega de arquivos na nuvem.", usedIn: "Flow Lab Tech" },
      { id: "deploy", label: "Railway e Vercel", status: "done", col: 1, row: 2, requires: ["docker", "ci"], desc: "Deploy de serviços em contêiner e de front-ends.", usedIn: "Flow Lab Tech" },
    ],
  },
  {
    group: "human",
    tag: "Ramo 6",
    name: "Habilidades humanas",
    tone: "#C99A1E",
    label: "#8A6A0E",
    skills: [
      { id: "comm", label: "Clareza na comunicação", status: "done", col: 2, row: 0, desc: "Explicar ideias e decisões técnicas de um jeito simples, por escrito e em conversa.", usedIn: "Code reviews, reuniões e documentação" },
      { id: "team", label: "Trabalho em equipe", status: "done", col: 1, row: 1, requires: ["comm"], desc: "Dividir o trabalho, revisar o código dos colegas e pedir ajuda cedo.", usedIn: "Todos os times por onde passei" },
      { id: "org", label: "Organização", status: "done", col: 3, row: 1, requires: ["comm"], desc: "Tarefas quebradas em partes pequenas, prioridades claras e nada esquecido.", usedIn: "Projetos pessoais e de trabalho" },
      { id: "humor", label: "Senso de humor", status: "done", col: 0, row: 2, requires: ["team"], desc: "Leveza para o time nos dias difíceis — e um comentário irônico na hora certa.", usedIn: "Todo dia" },
      { id: "grit", label: "Persistência", status: "done", col: 4, row: 2, requires: ["org"], desc: "Ficar no problema até ele ceder, mesmo quando o bug é teimoso.", usedIn: "Ironclad e os bugs mais teimosos" },
    ],
  },
];

/** Todas as habilidades em ordem (para "Anterior" e "Próxima"), com o ramo e a posição na lista dele. */
export const flattenTree = (tree: Branch[]) =>
  tree.flatMap((branch) => branch.skills.map((skill, index) => ({ skill, branch, index })));
