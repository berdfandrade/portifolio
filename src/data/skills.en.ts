// Textos da Skill Tree em inglês. Ícones, cores e status vêm de skills.ts.
import { TREE, type Branch } from "./skills";

const BRANCHES: Record<string, { tag: string; name: string }> = {
  "Front-end": { tag: "Branch 1", name: "Front-end" },
  Automação: { tag: "Branch 2", name: "Automation" },
  Design: { tag: "Branch 3", name: "Design" },
};

const SKILLS: Record<string, { label?: string; desc: string; usedIn: string }> = {
  html: { desc: "The foundation of everything: semantic, accessible structure.", usedIn: "Every web project" },
  css: { desc: "Layout with flex and grid, responsive design and animations.", usedIn: "Link in Bio" },
  js: { desc: "Logic, the DOM and interactivity in the browser.", usedIn: "Skill Tree, Link in Bio" },
  react: { desc: "Components, state and code split across many files.", usedIn: "Skill Tree" },
  tailwind: { desc: "Fast, consistent utility-first styling.", usedIn: "Skill Tree" },
  ts: { desc: "Types for bigger, safer projects.", usedIn: "—" },
  term: { desc: "Running scripts, flags and profiles straight from the command line.", usedIn: "Job Applier" },
  cdp: { desc: "Controlling a real Chrome through the remote debugging port.", usedIn: "Job Applier" },
  pw: { desc: "Automating navigation, clicks and forms.", usedIn: "Job Applier" },
  scrape: { desc: "Reading jobs and data from LinkedIn, Glassdoor and Indeed.", usedIn: "Job Applier" },
  api: { label: "REST APIs", desc: "Integrating services without depending on the interface.", usedIn: "—" },
  cron: { label: "Scheduled bots", desc: "Running automations on their own, at the right time.", usedIn: "—" },
  figma: { desc: "Screens, flows and prototypes from scratch.", usedIn: "Verdant" },
  ui: { desc: "Hierarchy, spacing and clear interfaces.", usedIn: "Verdant, Portfolio" },
  brand: { label: "Visual identity", desc: "Creating and keeping a product's look and feel.", usedIn: "Verdant" },
  pixel: { desc: "Characters and icons, one square at a time.", usedIn: "Avatar, Personal site" },
  ds: { desc: "Reusable components and tokens.", usedIn: "—" },
  motion: { desc: "Animations that bring interfaces to life.", usedIn: "—" },
};

export const TREE_EN: Branch[] = TREE.map((b) => ({
  ...b,
  ...BRANCHES[b.name],
  skills: b.skills.map((s) => ({ ...s, ...SKILLS[s.id] })),
}));
