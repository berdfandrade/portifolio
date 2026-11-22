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

/** Certificados listados no LinkedIn (os nomes ficam como foram emitidos). */
export const CERTIFICATES: string[] = [
  "JavaScript Algorithms and Data Structures",
  "Aprender a aprender: técnicas para seu autodesenvolvimento",
  "Produção de vídeo: o que há por trás do mundo do audiovisual",
  "Filmografia: bases para uma boa gravação",
  "História em quadrinhos: desenvolvendo roteiros",
];
