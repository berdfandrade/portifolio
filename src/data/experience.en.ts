// Textos em inglês da página Experiência. Datas, cores e ordem vêm de experience.ts.
import { ERAS, type Era } from "./experience";

type EraText = Pick<Era, "role" | "duration" | "place" | "lede" | "listTitle" | "items"> & { org?: string; stack?: string[] };

const EN: Record<string, EraText> = {
  flow: {
    role: "Full Stack Developer",
    duration: "11 months",
    place: "Uberlândia, Brazil · remote",
    lede:
      "An end-to-end subscription platform: REST APIs in NestJS and Node.js on PostgreSQL, recurring billing with Stripe, notifications with Twilio and React front ends. The focus was a back-end architecture built to grow, clean code and reliable integrations with payment and communication platforms.",
    listTitle: "What I built",
    items: [
      "Stripe integration for subscription management and payment processing: plans, recurring billing and webhooks that keep every subscription's state in sync with the database.",
      "Communication workflows with Twilio, with messages and notifications triggered by system events.",
      "Real-time notifications over WebSockets, alongside the REST APIs.",
      "A file storage and delivery pipeline on AWS S3, from upload to distribution.",
      "Relational modeling in PostgreSQL: schemas, queries and indexes for users, plans and billing data.",
      "A layered back end with Clean Architecture and DDD: business rules isolated from infrastructure and clear domain entities.",
      "Unit and integration tests with Vitest covering the payment and notification flows.",
      "Containerized apps with Docker, services hosted on Railway and Bun for faster builds and development.",
      "Modern front ends with React and Tailwind CSS, wired to the APIs.",
    ],
  },
  in8: {
    role: "Back-end Developer",
    duration: "9 months",
    place: "Belo Horizonte, Brazil",
    lede:
      "REST APIs with NestJS, Fastify and MySQL, focused on performance, automation and clean back-end architecture. Much of the work was on web crawling systems and data-intensive applications.",
    listTitle: "What I built",
    items: [
      "Web scraping tools for automated data collection, with browser automation.",
      "Performance-critical parts of the crawlers rewritten from JavaScript to Rust.",
      "Redis for caching and background task queues, moving heavy processing out of the request path.",
      "Back-end infrastructure for crawling systems that scale.",
      "Relational data in MySQL, including legacy databases and migrations without downtime.",
      "Maintenance and evolution of legacy Fastify APIs.",
      "Extensions for Chrome, Firefox, Opera and Edge, and desktop apps with Electron.js.",
      "Scripts and automations in Python.",
      "Containerized services with Docker, running on Linux.",
    ],
    stack: ["NestJS", "Fastify", "Node.js", "MySQL", "Redis", "Rust", "Python", "Docker", "Electron", "Browser extensions", "Linux"],
  },
  h3aven: {
    role: "Full Stack Developer",
    duration: "1 year 9 months",
    place: "Belo Horizonte, Brazil",
    lede:
      "Full stack developer on a product team, focused on the front end. Responsive, intuitive interfaces in React and Next.js, TypeScript across the codebase and close work with design and back end to ship under tight deadlines.",
    listTitle: "What I built",
    items: [
      "Responsive, intuitive interfaces with React, Next.js and Chakra UI.",
      "TypeScript across the whole codebase for better quality and maintainability.",
      "Accessible screens, from keyboard to screen reader.",
      "Lean APIs with Express and Prisma ORM, with typed data access and versioned migrations.",
      "Automated tests on the main flows.",
      "Close partnership with design and back end to ship features on tight deadlines.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Chakra UI", "Express", "Prisma", "Node.js", "Accessibility"],
  },
  fcc: {
    role: "Scientific Computing with Python",
    duration: "1 year 8 months",
    place: "Online",
    lede:
      "The turn to code. Python for scientific computing, plus algorithms and data structures in JavaScript: the foundation for all the work that came after.",
    listTitle: "What I studied",
    items: [
      "Python for scientific computing: data structures, text and number handling and object-oriented programming.",
      "Algorithms and data structures in JavaScript, with the JavaScript Algorithms and Data Structures certification.",
      "Hands-on projects to lock in each module, from scripts to complete programs.",
    ],
    stack: ["Python", "JavaScript", "Algorithms", "Data structures"],
  },
  puc: {
    org: "PUC Minas and UFMG",
    role: "Film · Languages and Literature",
    duration: "2 degrees",
    place: "Belo Horizonte, Brazil",
    lede:
      "Before software, Film at PUC Minas and Languages (French and Brazilian Literature) at UFMG. Film taught me to understand the user before writing the first line, and to explain technical decisions simply to the team.",
    listTitle: "What I brought from there",
    items: [
      "Film and Media Studies at PUC Minas, 2015 to 2019.",
      "French Language and Brazilian Literature at UFMG, 2015 to 2020.",
      "Screenwriting, storytelling and production: thinking about who is on the other side of the screen.",
      "Native Portuguese and fluent English.",
    ],
    stack: ["Screenwriting", "Video production", "Communication", "French", "English"],
  },
};

export const ERAS_EN: Era[] = ERAS.map((era) => ({ ...era, ...EN[era.id] }));

export const CERTIFICATES_EN: string[] = [
  "JavaScript Algorithms and Data Structures",
  "Learning how to learn: techniques for self-development",
  "Video production: what's behind the audiovisual world",
  "Filmmaking: foundations for a good shoot",
  "Comics: developing scripts",
];
