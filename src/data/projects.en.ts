// Textos dos projetos em inglês. Espelha src/data/projects.ts: cada lista tem a mesma ordem
// e o mesmo tamanho da versão em português (links, ficha, destaques, galeria...).
// Imagens, cores e endereços vêm do arquivo em português.
import { PROJECTS, type Project } from "./projects";

type Caption = { alt: string; caption: string };

interface ProjectText {
  title?: string;
  coverTitle?: string;
  meta: string;
  status: string;
  page?: {
    eyebrow: string;
    lede: string;
    links: string[];
    facts: [label: string, value: string][];
    showcase?: Caption;
    highlights?: [title: string, body: string][];
    chapters?: [title: string, body: string][];
    code?: { title: string; file?: string; body?: string };
    gallery?: Caption[];
    phones?: Caption[];
  };
}

const EN: Record<string, ProjectText> = {
  verdant: {
    meta: "App · React Native + NestJS",
    status: "In progress",
    page: {
      eyebrow: "Mobile app · [YEAR]",
      lede: "A dating app with search and chat rooms!",
      links: ["View prototype", "Open in Figma", "App on GitHub", "API on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Tools", "Figma · Expo · NestJS"],
        ["Platform", "iOS / Android"],
        ["Status", "In progress"],
      ],
      highlights: [
        ["Swipe to discover", "Cards you drag: right to like, left to pass. Every profile shows distance and age."],
        ["Nearby feed", "The API sorts the feed by location and respects the distance and age range preferences."],
        ["It's a match!", "When the interest is mutual, a modal takes you straight to the conversation."],
        ["Real-time chat", "Socket.IO with paginated history, automatic reconnection and an HTTP fallback when the socket drops."],
        ["Secure session", "Tokens in the Keychain/Keystore and automatic renewal: when the access token expires, the app swaps the refresh token and retries the request."],
        ["Light and dark themes", "The app follows the system theme automatically."],
      ],
      chapters: [
        ["The problem", "[WHAT MOTIVATED VERDANT? WHO IS IT FOR?]"],
        ["Visual identity", "[THE COLORS, TYPOGRAPHY AND BRAND CONCEPT YOU CREATED]"],
        ["Design in Figma", "[FLOWS, COMPONENTS AND INTERFACE DECISIONS]"],
        [
          "Development",
          "An Expo + React Native app with TanStack Query and Zustand, talking to an API built with NestJS, MongoDB, Redis and Socket.IO, tested with Jest. [TECHNICAL CHALLENGES AND WHAT YOU LEARNED]",
        ],
      ],
      phones: [
        { caption: "Splash", alt: "Green launch screen with the Verdant logo" },
        { caption: "Login", alt: "Sign in with Google or a phone number" },
        { caption: "Discover", alt: "Profile card with photo, name, age, distance and pass, super like and like buttons" },
        { caption: "Match", alt: "Match screen with both people's photos and the Chat now button" },
        { caption: "Chat", alt: "Real-time conversation with message bubbles" },
        { caption: "Connections", alt: "New matches at the top and the list of conversations" },
        { caption: "Dates", alt: "Dates calendar, a pending invitation and the scheduled dates" },
        { caption: "Search", alt: "Search for people by name, with filters and distance" },
        { caption: "Settings", alt: "Settings with Verdant Stats, Premium, theme and account" },
      ],
    },
  },
  pixelforge: {
    meta: "2D engine with an editor · C++20 + SDL3",
    status: "Open source",
    page: {
      eyebrow: "2D engine · 2026",
      lede: "A 2D engine in C++20 and SDL3 with a built-in editor, made for pixel art. The same scene can use a platformer, top-down RPG or isometric camera.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "C++20 · SDL3"],
        ["Build", "CMake · GCC, Clang, MSVC"],
        ["Status", "Open source"],
      ],
      showcase: {
        alt: "PixelForge editor in isometric mode",
        caption: "The editor in isometric mode: hierarchy, viewport with gizmo and component inspector.",
      },
      highlights: [
        ["Three cameras per scene", "Side view with gravity and jumping, top-down with 8 directions, and isometric with depth-sorted blocks."],
        ["A complete editor", "Hierarchy with groups and search, an editable inspector, a tile brush and eraser, and play/pause/frame-step on a copy of the scene."],
        ["Theme in CSS", "The editor's colors, sizes and fonts come from a theme.css that reloads live, along with the sprites."],
        ["Text formats", "Scenes (.scene) and pixel-art sprites (.sprite) are plain text: easy to version and edit by hand."],
        ["Platformer gameplay", "Coyote time, jump buffering and variable jump height, patrolling enemies and coins with a HUD."],
        ["Tested", "Physics, gameplay, projection and serialization tests running in CTest."],
      ],
      code: { title: "A scene is just text" },
      gallery: [
        { alt: "Editor in platformer mode", caption: "Platformer mode" },
        { alt: "Editor in top-down RPG mode", caption: "Top-down RPG mode" },
        { alt: "Game running in RPG mode", caption: "Game mode, no editor" },
      ],
    },
  },
  ironclad: {
    meta: "Distributed key-value store · Rust",
    status: "Open source",
    page: {
      eyebrow: "Distributed systems · 2026",
      lede: "A distributed key-value database built from scratch in Rust: an LSM-tree storage engine, Raft consensus and a binary protocol over TCP.",
      links: ["Visit the site", "View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "Rust · tokio"],
        ["Architecture", "LSM-tree · Raft"],
        ["Status", "Open source"],
      ],
      showcase: {
        alt: "Demo of a 3-node Ironclad cluster",
        caption: "A 57-second demo on a real 3-node cluster: the leader goes down, another takes over and no data is lost.",
      },
      highlights: [
        ["Durable", "A write acknowledged with OK is on disk on a majority of the nodes. It survives crashes, kill -9 and power loss."],
        ["Replicated", "Run 3 or 5 nodes. The cluster keeps working while a minority is down: 5 nodes tolerate 2 failures."],
        ["Automatic failover", "When the leader dies, the remaining nodes elect a new one within one to two seconds, and clients follow it on their own."],
        ["Strong consistency", "Linearizable reads and writes: after the OK, every read sees the data, on any node."],
        ["Exactly once", "A client that retries a write, because of a crash or the network, never gets it applied twice."],
        ["Detects corruption", "Every structure on disk has a checksum. Damaged data becomes an error, never an answer."],
      ],
      code: {
        title: "Three layers, each one solves one problem",
        file: "architecture",
        body: '              clients\n                 │   binary protocol over TCP\n┌────────────────▼──────────────────────────────────────┐\n│  Client API        parse, validate, route, reply        │\n├────────────────────────────────────────────────────────┤\n│  Raft consensus    elect a leader, replicate the log    │\n├────────────────────────────────────────────────────────┤\n│  Storage engine    WAL, MemTable, SSTables              │\n└────────────────────────────────────────────────────────┘\n\n$ ironclad-cli set user:123 \'{"name":"Bernardo"}\'\nOK\n$ ironclad-cli get user:123\n{"name":"Bernardo"}',
      },
    },
  },
  printa: {
    meta: "Screenshot tool for Linux · C + GTK3",
    status: "Open source",
    page: {
      eyebrow: "Desktop · Linux · 2026",
      lede: "A lightweight screenshot tool for Linux (X11), written in C with GTK3, in the spirit of Flameshot.",
      links: ["Visit the site", "View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "C · GTK3"],
        ["Platform", "Linux (X11)"],
        ["License", "MIT"],
      ],
      showcase: {
        alt: "printa with a window selected: the rest of the screen dimmed, the selection size in the corner and the Save button just below",
        caption: "A window selected with one click: the rest of the screen dims and the Save button appears right below it.",
      },
      highlights: [
        ["One-click windows", "Hover and the window under the cursor is highlighted. Click to select it, already without GTK's invisible shadow."],
        ["Free regions", "Drag to select any rectangle, in any direction."],
        ["Frozen screen", "The image is taken before the interface appears, so open menus and tooltips make it into the shot."],
        ["Save or copy", 'Saves to ~/Pictures, copies to the clipboard, or both. "Save as" takes PNG and JPEG.'],
        ["Multi-monitor and HiDPI", "Covers the whole desktop and saves at the screen's real resolution."],
        ["Small", "One binary, no background service and no configuration."],
      ],
      code: {
        title: "Made for shortcuts and scripts",
        body: 'printa          # capture now\nprinta -d 3     # wait 3 seconds first\n\n# the saved file\'s path goes to stdout\nfile=$(printa) && notify-send "Screenshot saved" "$file"',
      },
    },
  },
  owlio: {
    meta: "Screenwriting app · C++17 + Qt 6",
    status: "Open source",
    page: {
      eyebrow: "Desktop · Screenwriting · 2026",
      lede: "A screenwriting app in C++17 and Qt 6, with industry-standard formatting, real pages on screen and your scenes laid out as index cards.",
      links: ["Visit the site", "Download for Windows", "View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "C++17 · Qt 6"],
        ["Formats", "Fountain · FDX · PDF"],
        ["Platform", "Windows · Linux"],
      ],
      showcase: {
        alt: "Owlio in writing mode, dark theme, with the scene and character lists on the side",
        caption: "Writing in the dark theme: a real page in 12 pt Courier, with scenes and characters in the side panel.",
      },
      highlights: [
        ["The format comes first", "12 pt Courier, fixed margins and one page per minute of screen time. No word-processor reflow."],
        ["Keyboard-first flow", "Enter and Tab pick the next element: scene, action, character, dialogue. Names and locations autocomplete."],
        ["Professional pagination", "Scene headings never sit alone at the bottom of a page, and split dialogue gets (MORE) and (CONT'D)."],
        ["Cards and timeline", "Drag cards to reorder scenes and see the film on a timeline with acts, plot points and characters."],
        ["Versions and backups", 'Autosave, crash recovery and a "time machine" with every saved version.'],
        ["Characters", "Character sheets with stats, a relationship map and a pixel-art avatar creator."],
      ],
      gallery: [
        { alt: "Scene cards in the dark theme", caption: "Scene cards" },
        { alt: "Timeline with story structure, scene blocks and character lanes", caption: "Timeline" },
        { alt: "Relationship map between characters", caption: "Relationship map" },
        { alt: "Beat Board with flow lines", caption: "Beat Board" },
        { alt: "Saved versions stacked under a night sky", caption: "Versions" },
        { alt: "Writing mode in the light theme", caption: "Light theme" },
        { alt: "Character sheet with avatar, stats and synopsis", caption: "Character sheet" },
        { alt: "Pixel-art avatar creator", caption: "Avatar creator" },
        { alt: "Characters window with the cast in an editable table", caption: "Cast" },
        { alt: "Print and PDF window with sheet previews", caption: "Print and PDF" },
        { alt: "Title page editor with live preview", caption: "Title page" },
      ],
    },
  },
  aplicador: {
    title: "Job Applier",
    coverTitle: "Job\nApplier",
    meta: "Automation · LinkedIn, Glassdoor, Indeed",
    status: "In progress",
    page: {
      eyebrow: "Automation · 2026",
      lede: "Collects job postings from LinkedIn, Indeed and Glassdoor and shows them one at a time, as cards you swipe. Right applies, left skips.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "Python"],
        ["Sources", "LinkedIn · Indeed · Glassdoor"],
        ["Status", "In progress"],
      ],
      highlights: [
        ["Swipe to decide", "Drag right to apply, left to skip and up to save for later. Z undoes."],
        ["Automatic Easy Apply", "Easy Apply jobs go into a queue and the bot submits them on its own. The others open in Chrome for you."],
        ["Sorted by fit", "A score based on keywords, skills, Easy Apply and remote work decides the order of the cards."],
        ["Learns answers", "Questions the bot can't answer go to a tab. Answer once and it reuses the answer."],
        ["Your real Chrome", "It uses a dedicated Chrome profile, so logins stay saved and your everyday browser is never touched."],
        ["Protects your account", "A daily limit, a random delay between submissions and a test mode that fills in the form without submitting."],
      ],
      code: {
        title: "Try it without any account",
        body: "python3 -m venv .venv\n.venv/bin/pip install -r requirements.txt\n.venv/bin/python run.py --demo            # sample data, no Chrome\n.venv/bin/python run.py --host 0.0.0.0    # use it from your phone on the same network",
      },
    },
  },
  "event-hub": {
    meta: "Async webhooks · FastAPI + Redis",
    status: "Open source",
    page: {
      eyebrow: "Backend · 2026",
      lede: "A Python and FastAPI service that receives events from other systems through webhooks and processes them asynchronously, reliably and without blocking the sender.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "Python · FastAPI"],
        ["Data", "MongoDB · Redis"],
        ["Status", "Open source"],
      ],
      highlights: [
        ["Answers right away", "The sender gets 202 Accepted immediately, and the processing happens in the background."],
        ["Retries", "Temporary failures are retried with growing delays (exponential backoff)."],
        ["Dead-letter queue", "After N attempts, the event goes to a dead-letter queue and is marked as failed."],
        ["No duplicates", "The Idempotency-Key header keeps the same webhook from being processed twice."],
        ["Survives crashes", "If a worker dies mid-processing, the event goes back to the queue when it restarts."],
        ["Queryable status", "Every event has a status and a history exposed through the API."],
      ],
      code: {
        title: "How an event moves through the system",
        file: "flow",
        body: " External service          Event Hub API                    Worker(s)\n ────────────────          ─────────────                    ─────────\n POST /webhooks/events ──► 1. Stores the event in MongoDB\n                           2. Puts the ID on the Redis queue\n       ◄── 202 Accepted ── 3. Answers right away\n                                              ┌──────────► 4. Takes the event from the queue\n                                              │            5. Runs the handlers\n                                              │            6. Updates the status\n                           Retry queue ───────┘               ├─ success   → completed\n                           (with delay)    ◄──────────────────┼─ error     → retrying\n                                                              └─ exhausted → failed",
      },
    },
  },
  mac: {
    meta: "Virtual machine with an assembler · C11",
    status: "Open source",
    page: {
      eyebrow: "Systems · 2024",
      lede: "A small, readable stack-based virtual machine written in C11, with an assembler, a command-line runner and an interactive terminal debugger.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Development"],
        ["Language", "C11"],
        ["Platform", "Linux · macOS"],
        ["Tests", "37 tests · CI"],
      ],
      highlights: [
        ["Stack machine", "A 256-entry stack, six general-purpose registers and 23 instructions."],
        ["Safe by design", "Stack overflow, division by zero and invalid jumps become errors. The VM never reads or writes out of bounds."],
        ["Two-pass assembler", "Labels with forward references, comments, hex numbers and errors with line numbers."],
        ["Terminal debugger", "Step through programs, set breakpoints and watch the registers, stack and output change, no ncurses needed."],
        ["No dependencies", "Just a C11 compiler and a POSIX system."],
        ["Tested", "37 unit tests, end-to-end tests, sanitizer builds and CI on Linux and macOS."],
      ],
      code: {
        title: "10 factorial in assembly",
        body: "        SET A 10        ; counter\n        SET B 1         ; accumulator\nloop:   LOD A\n        JZ done         ; stop when the counter reaches 0\n        LOD B\n        LOD A\n        MUL\n        STR B           ; B = B * A\n        LOD A\n        PSH 1\n        SUB\n        STR A           ; A = A - 1\n        JMP loop\ndone:   LOD B\n        POP             ; prints 3628800\n        HLT",
      },
    },
  },
  "skill-tree": { meta: "Web · React + Tailwind", status: "In progress" },
  "link-na-bio": { title: "Link in Bio", coverTitle: "Link\nin Bio", meta: "Web · 3D chibi character", status: "In progress" },
};

/** Junta os textos em inglês com o projeto em português. O que faltar fica em português. */
function translate(p: Project): Project {
  const t = EN[p.slug];
  if (!t) return p;
  const d = p.page;
  const e = t.page;
  const captions = <T extends Caption>(list: T[] | undefined, tr: Caption[] | undefined) =>
    list?.map((item, i) => ({ ...item, ...tr?.[i] }));
  return {
    ...p,
    title: t.title ?? p.title,
    coverTitle: t.coverTitle ?? p.coverTitle,
    meta: t.meta,
    status: t.status,
    page:
      d && e
        ? {
            ...d,
            eyebrow: e.eyebrow,
            lede: e.lede,
            links: d.links.map((l, i) => ({ ...l, label: e.links[i] ?? l.label })),
            facts: d.facts.map((f, i) => e.facts[i] ?? f),
            showcase: d.showcase && { ...d.showcase, ...e.showcase },
            highlights: d.highlights?.map((h, i) => e.highlights?.[i] ?? h),
            chapters: d.chapters?.map((c, i) => e.chapters?.[i] ?? c),
            code: d.code && { ...d.code, ...e.code },
            gallery: captions(d.gallery, e.gallery),
            phones: captions(d.phones, e.phones),
          }
        : d,
  };
}

export const PROJECTS_EN: Project[] = PROJECTS.map(translate);
