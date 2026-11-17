# Portfolio — Bernardo

*[Leia em português](README.pt-BR.md)*

My personal portfolio, laid out like a **music library**: each project is an "album" with a cover, a fact sheet, highlights and screenshots. The look follows Apple's design language (system typography, rounded cards, light and dark themes) and works well on phones.

The site content is in Brazilian Portuguese.

## Pages

| Route | What's there |
| --- | --- |
| `/` | **Library**: projects you can filter by category (Apps, Desktop, Systems, Web, Automation), search, a featured project and the "All tracks" list |
| `/projeto/:slug` | **Project page**: cover, summary, links, showcase (screenshot or video), fact sheet, highlights, a code excerpt, a screenshot gallery with a full-screen viewer, and "More in the library" |
| `/sobre` | **Character sheet**: pixel-art avatar, sense of humor, birth chart, skill inventory and active quests. On phones it becomes a tabbed screen (Sheet, Astral and Humor) |

Projects with a page today: Verdant, PixelForge, Ironclad, printa, Owlio, Aplicador de Vagas, Event Hub and mac. Texts and images come from the READMEs of the repositories on [GitHub](https://github.com/berdfandrade).

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for development and builds
- [React Router](https://reactrouter.com) for routing
- Plain CSS with variables for theming, no UI framework

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

The site opens at `http://localhost:5173`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with instant reload |
| `npm run build` | Type-checks and builds the final site into `dist/` |
| `npm run preview` | Serves `dist/` locally to check the build |
| `npm run typecheck` | Type-checks only |

## Structure

```
public/assets/            images served as-is
  avatar.png              pixel-art avatar for the About page
  projects/<slug>/        screenshots and videos for each project
src/
  main.tsx                routes and entry point
  styles.css              all the CSS (color tokens, components, responsive rules)
  data/projects.ts        project content and categories
  components/
    Layout.tsx            scrolls to the top on navigation and sets the tab title
    TopBar.tsx            header for inner pages
    ThemeToggle.tsx       light/dark theme button
    Tile.tsx              a project's "album" cover
    Lightbox.tsx          full-screen image viewer
  pages/
    Library.tsx           Library
    ProjectPage.tsx       project page
    About.tsx             About
    NotFound.tsx          not found page
```

## Adding or editing a project

All content lives in [`src/data/projects.ts`](src/data/projects.ts). To add a project, add an item to the `PROJECTS` array. The array order is the display order (newest first).

```ts
{
  slug: 'my-project',              // becomes the URL /projeto/my-project
  title: 'My Project',
  coverTitle: 'My\nProject',       // \n breaks the line on the cover
  kind: 'Web',                     // App | Desktop | Sistemas | Web | Automação
  meta: 'Web · React',             // line under the cover
  stack: 'React · Vite',           // "stack" column in the list
  status: 'Em andamento',
  bg: '#0B1F3A', fg: '#A9CBFF',    // cover colors
  page: {                          // optional: without `page`, the project has no page
    eyebrow: 'Web · 2026',
    lede: 'One sentence about the project.',
    links: [{ label: 'Ver no GitHub', href: 'https://github.com/...' }],
    facts: [['Linguagem', 'TypeScript'], ['Status', 'Em andamento']],
    showcase: { src: `${IMG}my-project/screen.png`, alt: '...', caption: '...' },
    highlights: [['Title', 'Short description.']],
    gallery: [{ src: `${IMG}my-project/another.png`, alt: '...', caption: '...' }],
  },
}
```

Put the images in `public/assets/projects/<slug>/`. Each page section (showcase, highlights, chapters, code and gallery) only shows up when its field exists. TypeScript flags any missing required field.

## Theme

The theme starts by following the system (light or dark). Once a visitor clicks the button, their choice is saved in the browser. Colors are CSS variables defined at the top of [`src/styles.css`](src/styles.css): the `:root` block holds the light theme and `:root[data-theme="dark"]` the dark one.

## Deploying

`npm run build` produces a static site in `dist/`. Because routing happens in React, the host must serve `index.html` for any path (for example `/projeto/owlio`):

- **Vercel**: works with no configuration for Vite projects.
- **Netlify**: create `public/_redirects` containing the line `/*  /index.html  200`.
- **GitHub Pages**: set `base: '/repository-name/'` in `vite.config.ts`. Then copy `dist/index.html` to `dist/404.html` when deploying, so routes still work after a page reload.

## To do

- Bracketed placeholders such as `[ANO]` and `[ALTURA]` still need to be filled in.
- The Instagram, Contact, Figma and Skill Tree links still point to `#`.
- Skill Tree and Link na Bio don't have a page yet.
