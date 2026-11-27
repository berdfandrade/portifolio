// Página Experiência: cada "era" é uma janela da máquina do tempo, da mais recente para a mais antiga.
// Fonte: o perfil do LinkedIn (cargos, datas, locais e o que foi feito), detalhado com as tecnologias
// que o próprio site já registra na Skill Tree. A versão em inglês fica em experience.en.ts.

export interface Era {
  id: string;
  /** Trabalho ou formação: muda o ícone e a cor da janela. */
  kind: "work" | "study";
  org: string;
  role: string;
  /** Início e fim no formato AAAA-MM, ou só AAAA quando o LinkedIn não traz o mês. */
  start: string;
  end: string;
  duration: string;
  place: string;
  /** Cor de destaque da janela. */
  tone: string;
  lede: string;
  /** Título da lista de itens (o que construí, o que estudei...). */
  listTitle: string;
  items: string[];
  stack: string[];
}


export const ERAS: Era[] = [
  {
    id: "flow",
    kind: "work",
    org: "Flow Lab Tech",
    role: "Desenvolvedor Full Stack",
    start: "2025-08",
    end: "2026-06",
    duration: "11 meses",
    place: "Uberlândia, MG · remoto",
    tone: "#0A84FF",
    lede:
      "Plataforma de assinaturas de ponta a ponta: APIs REST em NestJS e Node.js sobre PostgreSQL, cobrança recorrente com Stripe, notificações com Twilio e front-ends em React. O foco era uma arquitetura de back-end que aguentasse crescer, código limpo e integrações confiáveis com plataformas de pagamento e comunicação.",
    listTitle: "O que eu construí",
    items: [
      "Integração com o Stripe para gestão de assinaturas e processamento de pagamentos: planos, cobrança recorrente e webhooks que mantêm o estado de cada assinatura sincronizado com o banco.",
      "Fluxos de comunicação com o Twilio, com mensagens e notificações disparadas pelos eventos do sistema.",
      "Notificações em tempo real por WebSockets, ao lado das APIs REST.",
      "Pipeline de armazenamento e entrega de arquivos no AWS S3, do upload à distribuição.",
      "Modelagem relacional em PostgreSQL: esquemas, consultas e índices para os dados de usuários, planos e cobranças.",
      "Back-end em camadas, com Clean Architecture e DDD: regras de negócio isoladas da infraestrutura e entidades de domínio claras.",
      "Testes unitários e de integração com Vitest, cobrindo os fluxos de pagamento e notificação.",
      "Aplicações em contêineres Docker, com serviços hospedados no Railway e Bun para builds e desenvolvimento mais rápidos.",
      "Front-ends modernos com React e Tailwind CSS, integrados às APIs.",
    ],
    stack: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "Twilio", "WebSockets", "AWS S3", "Docker", "Railway", "Bun", "Vitest", "React", "Tailwind CSS"],
  },
  {
    id: "in8",
    kind: "work",
    org: "in8 Holding",
    role: "Desenvolvedor Back-end",
    start: "2024-10",
    end: "2025-06",
    duration: "9 meses",
    place: "Belo Horizonte, MG",
    tone: "#BF5AF2",
    lede:
      "APIs REST com NestJS, Fastify e MySQL, com foco em performance, automação e uma arquitetura de back-end limpa. Boa parte do trabalho foi em sistemas de web crawling e aplicações que lidam com grandes volumes de dados.",
    listTitle: "O que eu construí",
    items: [
      "Ferramentas de web scraping para coleta automatizada de dados, com automação de navegadores.",
      "Partes críticas de performance dos crawlers reescritas de JavaScript para Rust.",
      "Redis para cache e para filas de tarefas em segundo plano, tirando o processamento pesado do caminho das requisições.",
      "Infraestrutura de back-end para sistemas de crawling que escalam.",
      "Dados relacionais em MySQL, incluindo manutenção de bases legadas e migrações sem parar o sistema.",
      "Manutenção e evolução de APIs legadas em Fastify.",
      "Extensões para Chrome, Firefox, Opera e Edge, e aplicativos desktop com Electron.js.",
      "Scripts e automações em Python.",
      "Serviços em contêineres Docker, rodando em Linux.",
    ],
    stack: ["NestJS", "Fastify", "Node.js", "MySQL", "Redis", "Rust", "Python", "Docker", "Electron", "Extensões de navegador", "Linux"],
  },
  {
    id: "h3aven",
    kind: "work",
    org: "H3aven",
    role: "Desenvolvedor Full Stack",
    start: "2023-02",
    end: "2024-10",
    duration: "1 ano e 9 meses",
    place: "Belo Horizonte, MG",
    tone: "#30D158",
    lede:
      "Desenvolvedor full stack num time de produto, com foco no front-end. Interfaces responsivas e intuitivas em React e Next.js, TypeScript em todo o código e trabalho lado a lado com design e back-end para entregar dentro de prazos curtos.",
    listTitle: "O que eu construí",
    items: [
      "Interfaces responsivas e intuitivas com React, Next.js e Chakra UI.",
      "TypeScript em toda a base de código, para mais qualidade e facilidade de manutenção.",
      "Telas acessíveis, do teclado ao leitor de tela.",
      "APIs enxutas com Express e Prisma ORM, com acesso a dados tipado e migrações versionadas.",
      "Testes automatizados nos fluxos principais.",
      "Parceria próxima com design e back-end para entregar funcionalidades em prazos apertados.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Chakra UI", "Express", "Prisma", "Node.js", "Acessibilidade"],
  },
  {
    id: "fcc",
    kind: "study",
    org: "freeCodeCamp",
    role: "Scientific Computing with Python",
    start: "2021-12",
    end: "2023-07",
    duration: "1 ano e 8 meses",
    place: "On-line",
    tone: "#FF9F0A",
    lede:
      "A virada para o código. Estudo de Python aplicado à computação científica e de algoritmos e estruturas de dados em JavaScript, a base para todo o trabalho que veio depois.",
    listTitle: "O que eu estudei",
    items: [
      "Python para computação científica: estruturas de dados, manipulação de texto e números e programação orientada a objetos.",
      "Algoritmos e estruturas de dados em JavaScript, com o certificado JavaScript Algorithms and Data Structures.",
      "Projetos práticos para fixar cada módulo, do script ao programa completo.",
    ],
    stack: ["Python", "JavaScript", "Algoritmos", "Estruturas de dados"],
  },
  {
    id: "puc",
    kind: "study",
    org: "PUC Minas e UFMG",
    role: "Cinema e Audiovisual · Letras",
    start: "2015",
    end: "2020",
    duration: "2 graduações",
    place: "Belo Horizonte, MG",
    tone: "#FF453A",
    lede:
      "Antes do software, Cinema e Audiovisual na PUC Minas e Letras (Francês e Literatura Brasileira) na UFMG. O cinema me ensinou a entender o usuário antes de escrever a primeira linha e a explicar decisões técnicas com simplicidade para o time.",
    listTitle: "O que eu trouxe de lá",
    items: [
      "Cinema e Audiovisual (Comunicação e Estudos da Mídia) na PUC Minas, de 2015 a 2019.",
      "Letras, Língua Francesa e Literatura Brasileira na UFMG, de 2015 a 2020.",
      "Roteiro, narrativa e produção: pensar em quem está do outro lado da tela.",
      "Português nativo e inglês fluente.",
    ],
    stack: ["Roteiro", "Produção audiovisual", "Comunicação", "Francês", "Inglês"],
  },
];

/** Grupos de certificados; os nomes de cada grupo ficam em src/i18n/strings.ts. */
export type CertGroup = "fcc" | "js" | "python" | "front" | "back" | "c" | "linux" | "media";

/** Um certificado: o nome como foi emitido e, quando existe, o link público para conferir. */
export interface Certificate {
  name: string;
  url?: string;
}

/**
 * Certificados do LinkedIn e do site antigo, agrupados por área, com a plataforma que emitiu (quando se sabe).
 * Links copiados do site antigo e conferidos: onde ele repetia o mesmo link em cursos diferentes, só o curso
 * certo ficou com o link.
 */
export const CERTIFICATES: { group: CertGroup; issuer?: string; items: Certificate[] }[] = [
  {
    group: "fcc",
    issuer: "freeCodeCamp",
    items: [
      { name: "JavaScript Algorithms and Data Structures", url: "https://www.freecodecamp.org/certification/berdfandrade/javascript-algorithms-and-data-structures" },
      { name: "Scientific Computing with Python", url: "https://www.freecodecamp.org/certification/berdfandrade/scientific-computing-with-python-v7" },
      { name: "Responsive Web Design", url: "https://www.freecodecamp.org/certification/berdfandrade/responsive-web-design" },
    ],
  },
  {
    group: "js",
    issuer: "Alura",
    items: [
      { name: "JavaScript: tipos, variáveis e funções" },
      { name: "JavaScript: explorando a linguagem", url: "https://cursos.alura.com.br/certificate/955f0207-30b6-4525-b01e-b6924adab8c4?lang=pt_BR" },
      { name: "JavaScript: objetos", url: "https://cursos.alura.com.br/certificate/9a05559a-6542-4013-84bc-c74abfdb5836?lang=pt_BR" },
      { name: "JavaScript: Arrays", url: "https://cursos.alura.com.br/certificate/291bfec0-ad97-43c6-8b9e-2ca6858dd7d8?lang=pt_BR" },
      { name: "JavaScript I: algoritmos de ordenação", url: "https://cursos.alura.com.br/certificate/3d8f3f02-16c4-47b3-aaae-47a76e94d96b?lang=pt_BR" },
      { name: "JavaScript: programação orientada a objetos", url: "https://cursos.alura.com.br/certificate/02311b7d-5ad1-4b99-8f42-4dcb19e79555?lang=pt_BR" },
      { name: "JavaScript: programando a Orientação a Objetos", url: "https://cursos.alura.com.br/certificate/98a9a654-3547-41dd-9d79-dbcc92cc43c3?lang=pt_BR" },
      { name: "JavaScript: classes e heranças no desenvolvimento de aplicações com orientação a objetos", url: "https://cursos.alura.com.br/certificate/c6a62b62-b62a-4f89-86fa-85955e74c1c7?lang=pt_BR" },
      { name: "JavaScript: interfaces e Herança em Orientação a Objetos", url: "https://cursos.alura.com.br/certificate/d34aecce-e873-4264-991c-d989531cacd0?lang=pt_BR" },
      { name: "JavaScript: manipulando o DOM", url: "https://cursos.alura.com.br/certificate/a9fbe142-54b3-4ee8-8ce0-b49837d72c9c?lang=pt_BR" },
      { name: "JavaScript para Web: Crie páginas dinâmicas", url: "https://cursos.alura.com.br/certificate/00465614-72d3-406e-98ba-74a7bde99e6f?lang=pt_BR" },
      { name: "JavaScript e HTML: desenvolva um jogo e pratique lógica de programação", url: "https://cursos.alura.com.br/certificate/11ccbdf8-38d0-4f2b-82c8-653aa03bbc10?lang=pt_BR" },
      { name: "Lógica de programação: comece em lógica com o jogo Pong e JavaScript", url: "https://cursos.alura.com.br/certificate/7b19bf6f-4dd0-4d15-ae25-6742708fd498?lang=pt_BR" },
      { name: "Lógica de programação: laços e listas com JavaScript", url: "https://cursos.alura.com.br/certificate/93cdd54a-69fb-461b-9d80-d84e369b4131?lang=pt_BR" },
    ],
  },
  {
    group: "python",
    issuer: "Alura",
    items: [
      { name: "Python: começando com a linguagem", url: "https://cursos.alura.com.br/certificate/a2ef0806-959e-4a07-b059-ee7c3ff70747?lang=pt_BR" },
      { name: "Python: avançando na linguagem" },
      { name: "Python: entendendo a Orientação a Objetos", url: "https://cursos.alura.com.br/certificate/224f150d-6705-4632-8443-d2fcfdfa170f?lang=pt_BR" },
      { name: "Python: avançando na orientação a objetos" },
      { name: "Flask: crie uma webapp com Python", url: "https://cursos.alura.com.br/certificate/7e67fcd7-b7e1-419d-b57a-1d7ccd17d1d4?lang=pt_BR" },
      { name: "Expressões regulares: capturando textos de forma mágica", url: "https://cursos.alura.com.br/certificate/e352d413-01bc-402a-8e25-22c5fc42e67f?lang=pt_BR" },
    ],
  },
  {
    group: "front",
    issuer: "Alura",
    items: [
      { name: "HTML5 e CSS3 parte 1: crie uma página da Web", url: "https://cursos.alura.com.br/certificate/869ee0f0-ed91-437b-9107-579ddb607fdf?lang=pt_BR" },
      { name: "HTML5 e CSS3 parte 2: Listas e navegação", url: "https://cursos.alura.com.br/certificate/18ab35a1-b516-4022-a3aa-a979bbbca30f?lang=pt_BR" },
      { name: "HTML5 e CSS3 parte 3: formulários e tabelas", url: "https://cursos.alura.com.br/certificate/52f3e146-2b19-4f64-9f06-be6f81b1b285?lang=pt_BR" },
      { name: "HTML5 e CSS3 parte 4: avançando no CSS", url: "https://cursos.alura.com.br/certificate/5ddf5bf8-31ff-468f-a60a-a6938e365ab7?lang=pt_BR" },
      { name: "Flexbox: posicione elementos na tela", url: "https://cursos.alura.com.br/certificate/13c595dc-56ad-4686-8540-3cac72b2f695?lang=pt_BR" },
      { name: "Layouts Responsivos: trabalhando com layouts mobile", url: "https://cursos.alura.com.br/certificate/f1f29b6d-6002-4f0f-a419-c63c2e59671c?lang=pt_BR" },
      { name: "Arquitetura CSS: lidando com problemas", url: "https://cursos.alura.com.br/certificate/fb6a2bfc-951a-4ee3-b360-ea3370fc3063?lang=pt_BR" },
      { name: "React: desenvolvendo com JavaScript", url: "https://cursos.alura.com.br/certificate/b5e2af73-6854-4829-95fe-233614011d7e?lang=pt_BR" },
      { name: "React: comece seu projeto full stack", url: "https://cursos.alura.com.br/certificate/93b093f4-3a6c-4f7c-8175-05670a63d23a?lang=pt_BR" },
      { name: "React e Node.js: consumindo APIs no React no projeto full stack", url: "https://cursos.alura.com.br/certificate/7add293e-cc5a-4742-af6e-1afb4e372bdb?lang=pt_BR" },
    ],
  },
  {
    group: "back",
    issuer: "Alura",
    items: [
      { name: "Node.js: API Rest com Express e MongoDB" },
      { name: "Node.js: criando sua primeira biblioteca", url: "https://cursos.alura.com.br/certificate/ae21031b-0c0c-4cc9-963a-9880b8b3644b?lang=pt_BR" },
      { name: "HTTP: entendendo a web por baixo dos panos", url: "https://cursos.alura.com.br/certificate/cf825777-8b6c-470a-b5a0-ba7c873e6e25?lang=pt_BR" },
    ],
  },
  {
    group: "c",
    issuer: "Alura",
    items: [
      { name: "C: conhecendo a Linguagem", url: "https://cursos.alura.com.br/certificate/065ca160-b353-4414-8af8-05772acaf2c1?lang=pt_BR" },
      { name: "C: avançando na linguagem", url: "https://cursos.alura.com.br/certificate/3332cbb3-e00f-4d8d-a52d-84edd2ca1fc3?lang=pt_BR" },
      { name: "C: recursos avançados da linguagem", url: "https://cursos.alura.com.br/certificate/0474a449-f5dd-4d1f-8af7-5b3a0a34177c?lang=pt_BR" },
      { name: "Introdução à Arquitetura de computadores", url: "https://cursos.alura.com.br/certificate/f404fe73-7573-4988-8daa-d2814a99f7a0?lang=pt_BR" },
    ],
  },
  {
    group: "linux",
    issuer: "Alura",
    items: [
      { name: "Linux I: conhecendo e utilizando o terminal", url: "https://cursos.alura.com.br/certificate/8f2b7a1c-b7f0-483f-82af-275e5c37c9af?lang=pt_BR" },
      { name: "Linux II: programas, processos e pacotes" },
      { name: "Linux Onboarding: usando a CLI de uma forma rápida e prática", url: "https://cursos.alura.com.br/certificate/c97ecd59-beb5-4d47-a031-7d9e4eac5061?lang=pt_BR" },
      { name: "Git e GitHub: repositório, commit e versões", url: "https://cursos.alura.com.br/certificate/64691dcc-7ff4-4efa-b703-65a628b0cb60?lang=pt_BR" },
    ],
  },
  {
    group: "media",
    items: [
      { name: "Aprender a aprender: técnicas para seu autodesenvolvimento" },
      { name: "Produção de vídeo: o que há por trás do mundo do audiovisual" },
      { name: "Filmografia: bases para uma boa gravação" },
      { name: "História em quadrinhos: desenvolvendo roteiros" },
    ],
  },
];
