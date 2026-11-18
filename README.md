# Portfolio — Bernardo

*[Leia em português](README.pt-BR.md)*

My personal portfolio, laid out like a **music library**: each project is an "album" with a cover, a fact sheet, highlights and screenshots. The look follows Apple's design language (system typography, rounded cards, light and dark themes) and works well on phones.

The site is bilingual: Brazilian Portuguese at `/` and English at `/en`. A PT/EN button in the header switches to the same page in the other language.

## Pages

| Route | What's there |
| --- | --- |
| `/` | **Library**: projects you can filter by category (Apps, Desktop, Systems, Web, Automation), search, a featured project and the "All tracks" list |
| `/projeto/:slug` | **Project page**: cover, summary, links, showcase (screenshot or video), fact sheet, highlights, a code excerpt, a screenshot gallery with a full-screen viewer, and "More in the library" |
| `/sobre` | **About**: pixel-art avatar with level and XP (from my age), and four tabs: Profile (a bit about me, skill inventory, active quests), Tastes (interests, most played Spotify tracks, bookshelf), Astral (birth chart and an in-depth reading) and Humor |
| `/skill-tree` | **Skill Tree**: five stack branches plus people skills, with mastered, training and locked skills, overall progress, a side drawer with each skill's details and a 3D view you can rotate by dragging |
| `/livros` | **Books**: a 3D bookshelf of books I've read. Drag to rotate it and tap a book to take it off the shelf and see its cover and details |
| `/contato` | **Contact**: a Messages-style chat that opens WhatsApp or email with your message ready, plus cards for WhatsApp, email and Instagram with one-tap copy |

Projects with a page today: Verdant, PixelForge, Ironclad, printa, Owlio, Aplicador de Vagas, Event Hub and mac. Texts and images come from the READMEs of the repositories on [GitHub](https://github.com/berdfandrade).

Each page has an English address too: `/en`, `/en/project/:slug`, `/en/about`, `/en/skill-tree`, `/en/books` and `/en/contact`.

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
| `npm start` | Runs `server.js`: serves `dist/` and the `/api/top-tracks` route (Spotify) |
| `npm run spotify:auth` | One-time Spotify authorization; saves the keys to Railway |

## Structure

```
public/assets/            images served as-is
  avatar.png              pixel-art avatar for the About page
  projects/<slug>/        screenshots and videos for each project
src/
  main.tsx                routes and entry point
  styles.css              all the CSS (color tokens, components, responsive rules)
  data/projects.ts        project content and categories (Portuguese)
  data/projects.en.ts     English text for the projects
  data/skills.ts          Skill Tree branches and skills (Portuguese)
  data/skills.en.ts       English text for the Skill Tree
  data/books.ts           books on the shelf (Portuguese; the current seven are examples)
  data/books.en.ts        English titles and blurbs for the books
  data/contact.ts         WhatsApp, email and Instagram
  i18n/strings.ts         interface text in both languages
  i18n/index.tsx          language routes and the useI18n() hook
  components/
    Layout.tsx            scrolls to the top on navigation and sets the tab title
    TopBar.tsx            header for inner pages
    ThemeToggle.tsx       light/dark theme button
    Tile.tsx              a project's "album" cover
    Lightbox.tsx          full-screen image viewer
    orbit.tsx             drag-to-rotate hook and controls for the 3D scenes
  pages/
    Library.tsx           Library
    ProjectPage.tsx       project page
    About.tsx             About
    SkillTree.tsx         Skill Tree
    Books.tsx             3D bookshelf
    Contact.tsx           contact page
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

Then add the English text under the same `slug` in [`src/data/projects.en.ts`](src/data/projects.en.ts). Its lists (links, facts, highlights, gallery...) follow the same order as the Portuguese ones; anything missing falls back to Portuguese. Interface text (buttons, headings, labels) lives in [`src/i18n/strings.ts`](src/i18n/strings.ts), where TypeScript requires the English object to have every key the Portuguese one has.

## Theme

The theme starts by following the system (light or dark). Once a visitor clicks the button, their choice is saved in the browser. Colors are CSS variables defined at the top of [`src/styles.css`](src/styles.css): the `:root` block holds the light theme and `:root[data-theme="dark"]` the dark one.

## Deploying

The site runs on [Railway](https://railway.com) at https://bernardo.up.railway.app. Every push to `main` triggers a new deploy: Railway runs `npm run build` and then `npm start`.

[`server.js`](server.js) is a small Node server with no dependencies. It serves `dist/`, returns `index.html` for React routes (such as `/projeto/owlio`) and answers `/api/top-tracks` with my most played Spotify tracks from the last 4 weeks, cached for an hour.

### Spotify

The "On repeat" card on the About page needs three Railway variables: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN`. Without them the card simply doesn't show.

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) with the Web API and the Redirect URI `http://127.0.0.1:8888/callback`.
2. Run `npm run spotify:auth` with the Railway CLI logged in, paste the Client ID and Client Secret, and authorize in the browser. The script saves the three variables to Railway and redeploys.

To try it locally, run `npm start` with those variables set and `npm run dev` in another terminal; Vite forwards `/api` to port 3000.

## To do

- Bracketed placeholders such as `[ANO]` and `[ALTURA]` still need to be filled in.
- The seven books on the bookshelf are examples to be replaced.
- The Skill Tree and Link na Bio projects don't have a project page yet.
