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
    /** O terceiro item traduz os nomes da paleta, na mesma ordem. */
    chapters?: [title: string, body: string, palette?: string[]][];
    code?: { title: string; file?: string; body?: string };
    gallery?: Caption[];
    phones?: Caption[];
  };
}

const EN: Record<string, ProjectText> = {
  siegebreaker: {
    meta: "HTTP load testing · Linux", status: "Published",
    page: {
      eyebrow: "Command-line tool · 2026",
      lede: "When I ask for a thousand requests per second, how many actually leave the machine? I built Siegebreaker to measure the load generator itself while testing a local API.",
      links: ["View on GitHub", "Open the recorded run"],
      facts: [["Language", "C11"], ["Platform", "64-bit Linux"], ["Protocol", "HTTP/1.1 · local GET"]],
      showcase: { alt: "A rubber duck wearing a colander helmet and holding a stopwatch in its beak", caption: "The Siegebreaker mascot." },
      chapters: [
        ["The 26 missing requests", "In a ten-second run against Juggernaut, I scheduled 10,000 requests. The generator missed 26 dispatch slots. All 9,974 requests it sent received HTTP 200. Seeing those three counts together let me trace the gap back to the client. This run used a temporary build with bearer-token support."],
        ["When does the clock start?", "Each worker follows a monotonic clock. The JSON report measures the time from admission to response and from the moment the request was due. Comparing the two shows how much waiting happened before dispatch."],
      ],
    },
  },
  juggernaut: {
    meta: "Transfer engine · Java", status: "Financial core published",
    page: {
      eyebrow: "Transaction processing · 2026",
      lede: "A transfer commits, but the response gets lost. What happens when the client tries again? I built Juggernaut to study that question with two accounts, integer amounts in cents and a real PostgreSQL database.",
      links: ["View on GitHub", "Read the engineering review"],
      facts: [["Language", "Java 21"], ["Database", "PostgreSQL 16"], ["Tests", "JUnit · Testcontainers"]],
      showcase: { alt: "Letter J formed by two orange bands", caption: "The two bands represent the debit and credit of a single transfer." },
      chapters: [
        ["Why I wanted to study transfers", "I chose a transfer because I can check the arithmetic by hand. If I move 125 cents from an account holding 10,000 into an empty one, I expect to find 9,875 on one side and 125 on the other. What interested me was what happens when the response disappears. To the person who pressed the button, nothing seems to have happened. In the database, the money has already moved. I wanted to learn how to recognize the same request after a failure and return its original receipt, even if other transfers have since changed the balance."],
        ["Who gets the last cent?", "I also wanted to see what happens when several operations read the same balance. I set up 240 attempts to withdraw one cent from an account holding 100. I could spell out the expected result: 100 debits, 100 matching credits and a source balance of zero. The service locks both accounts in a consistent order and checks the balance while holding those locks. After the run, I reconcile each balance against its ledger entries."],
        ["What the first version missed", "During review, an attempt to transfer 101 from an account holding 100 exposed a detail I had missed. Rolling back the operation also erased the key that identified the request. A second attempt to transfer just 1 went through using that same key. The fix was to keep a record of the decline without posting a debit or a credit. That case is now a test I can rerun whenever the posting logic changes."],
      ],
    },
  },
  "time-machine": {
    meta: "Android keyboard · Kotlin",
    status: "In progress",
    page: {
      eyebrow: "Android keyboard · 2026",
      lede: "A keyboard that keeps versions of your text while you type. Deleted a paragraph or changed your mind? Open the timeline, compare and restore, like version control inside the keyboard.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "Kotlin · Jetpack Compose"],
        ["Platform", "Android 9 or newer"],
        ["Status", "In progress"],
      ],
      highlights: [
        ["Versions while you type", "Every pause becomes a version. Before deleting, sending or restoring, the keyboard saves the text right away."],
        ["A timeline with branches", "A git-style rail: restoring an old version and typing again creates a branch, without deleting what came after."],
        ["Safe restore", "Before replacing the text, the keyboard reads the whole field and saves it as a version. If it can't read all of it, it changes nothing."],
        ["Suggestions and emoji", "Three word suggestions that ignore accents and learn from you, and every Unicode emoji, with skin tones."],
        ["Your way", "Full, one-handed and thumb modes, and a frame with handles on its edges to change height, width and position live."],
        ["Privacy first", "No Internet permission, no telemetry and a memory-only history. Passwords and private fields are never recorded."],
      ],
      chapters: [
        [
          "The problem",
          "Everyone has lost a long message by accident, or rewritten a paragraph and regretted it. Apps' undo is short and disappears when you switch screens. The idea was to bring version control to the place every piece of text goes through: the keyboard. The project's most important rule is to never promise what it can't deliver. Android doesn't always let a keyboard read the whole field, so incomplete versions are marked partial and never replace the text.",
        ],
        [
          "Visual identity",
          "Amber is the color of time, like a moment preserved. It shows up only in what relates to history: the current version on the rail, the Restore button and Undo. Everything else is graphite, with quiet keys, so the keyboard stays comfortable for everyday typing. The Send key uses inverted contrast instead of amber, so the color keeps a single meaning. Every text pair passes 4.5:1 contrast.",
          ["Time amber", "Background", "Keys", "Function keys", "Text", "Secondary text"],
        ],
        [
          "Design",
          "I followed the principles of Apple's Human Interface Guidelines, translated to Android: help lives in the app and not inside the keyboard, every gesture has a button alternative, vibration always means the same thing and motion is restrained. Key presses are instant; only panels slide and fade, and everything follows the system animation scale. The product's symbol is the version rail: dots linked like a git graph that grow in the strip as you type and open into the timeline.",
        ],
        [
          "Development",
          "The keyboard is an InputMethodService in Kotlin. Keys are drawn on a Canvas, for performance and to work with TalkBack, and the panels use Jetpack Compose inside the keyboard. History is a version graph with deduplication, limits and expiry. The hardest part was restoring: Compose's editor only applies edits on the next frame, so the keyboard deletes exactly the text it read and checks the result again right after. There are 67 logic tests and 10 tests on real Android text fields.",
        ],
      ],
      code: {
        title: "Never delete what it didn't read",
        body: "val current = read(ic)                 // a full read or nothing\nvalidate(session, key, target, current)?.let { return Failed(it) }\n\nval before = history.recordBeforeRestore(current)  // undoable\nic.beginBatchEdit()\nic.deleteSurroundingText(current.selectionStart,\n    current.text.length - current.selectionEnd)\nic.commitText(target.text, 1)\nic.endBatchEdit()\n\nreturn if (confirm(ic, target)) Restored(target, before.id)\n       else Unconfirmed(target, before.id)  // checks again after 300 ms",
      },
      phones: [
        { caption: "Suggestions", alt: "Dark keyboard with three word suggestions in the strip" },
        { caption: "Timeline", alt: "Timeline with a branch; the preview strikes through what goes and underlines what comes back" },
        { caption: "Restored", alt: "Restored text in the field and the strip showing Restored and Undo" },
        { caption: "Emoji", alt: "Emoji panel with category tabs and recent emoji" },
        { caption: "Quick settings", alt: "Quick settings: vibration, sound, private, theme, modes, size, numbers and more" },
        { caption: "Size", alt: "Resize frame with a handle on each edge and the Reset and OK buttons" },
        { caption: "App", alt: "The app's home screen with the version rail and the steps to enable the keyboard" },
      ],
    },
  },
  verdant: {
    meta: "App · React Native + NestJS",
    status: "In progress",
    page: {
      eyebrow: "Mobile app · 2024",
      lede: "A subscribers-only dating app with dates, people search and chat rooms.",
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
        [
          "The problem",
          "Build a dating app that only paying subscribers can join. The payment works as a filter: fewer fake profiles and people who actually want to meet. Beyond swiping and matching, the app needed ways to go past the chat: setting up dates, searching for people by name and joining public and private chat rooms.",
        ],
        [
          "Visual identity",
          "The name comes from “verdant”, and the tagline is “Connections that truly bloom”. The logo is a simple leaf, and green is the main color: it shows up on the launch screen, the like buttons and my own chat bubbles. The rest of the interface is neutral, with a light gray background and white cards, so the profile photos stand out. The typeface is Inter. Every color has a dark theme version.",
          ["Verdant green", "Soft green", "Text", "Secondary text", "Background", "Cards", "Lines", "Pass"],
        ],
        [
          "Design in Figma",
          "I designed the whole flow before writing code: launch screen, sign in with Google or phone, Discover with the profile cards, the match screen, chat, Connections, Dates with a calendar and invitations, Search with filters and Settings with Verdant Stats and Premium. The screens share the same components (pill buttons, cards and a five-section tab bar), and the clickable prototype is in Figma.",
        ],
        [
          "Development",
          "The app is built with Expo + React Native in TypeScript, Expo Router, TanStack Query and Zustand. The API uses NestJS, MongoDB, Redis and Socket.IO, and both sides are tested with Jest. The hardest parts were the real-time chat (paginated history, automatic reconnection and an HTTP fallback when the socket drops), the secure session with automatic token renewal and the feed sorted by distance, respecting the distance and age range preferences.",
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

  rdock: {
    meta: "macOS-style dock for Linux · Rust",
    status: "Open source",
    page: {
      eyebrow: "Desktop · 2026",
      lede: "A macOS-style dock for X11 Linux desktops (Cinnamon, XFCE, MATE), written in pure Rust with no GTK or Qt. It draws everything itself on the CPU and talks straight to the X server.",
      links: ["View on GitHub"],
      facts: [
        ["Role", "Design and development"],
        ["Language", "Rust"],
        ["Platform", "Linux · X11"],
        ["License", "MIT"],
      ],
      showcase: {
        alt: "rdock at the bottom of the screen, with the Calendar icon magnified by the fish-eye effect and a tooltip with its name",
        caption: "Fish-eye magnification, a tooltip with the app name and dots under the open apps.",
      },
      highlights: [
        ["Fish-eye with springs", "Icons grow along a cosine curve as the pointer gets close, animated with damped springs. An icon keeps bouncing until its app's window appears."],
        ["Drag and drop", "Icons reorder while their neighbors make room, and dragging one out removes the app with a “poof”. To pin an app, drag it from the Launchpad or drop a .desktop file on the dock."],
        ["Stacks", "Drop a folder on the dock to make it a stack. Up to 9 items open as an orbit around the icon; larger folders open a panel with subfolders, search, sorting, a preview and keyboard control. A red badge counts new files, and right-clicking switches the mode and sort order."],
        ["Window previews", "Rest the pointer on an open app for 400 ms to see live thumbnails of each window and its workspace. Click to focus, × to close, the wheel to cycle."],
        ["Drop files on apps", "While you drag a file, the apps that can open it rise and the others fade. Drop on an app to open it there, on a stack to move it (Ctrl copies), on the Trash to delete it. The app menu lists recent files."],
        ["Launchpad", "A full-screen grid of every app over a blurred copy of the desktop, with sliding pages and accent-insensitive search. Frames reach the X server through shared memory (MIT-SHM), so the animation runs at 60 fps."],
        ["Smart hiding", "It can stay visible, hide when the pointer leaves or hide only when the active window touches it. It works at the bottom, left or right of the screen."],
        ["Themes in one PNG", "A theme is a single image of the shelf: the ends stay fixed and the middle tiles as the dock grows. It ships with Glass, Graphite, Ice, Neon, Sunset and Wood."],
        ["0% CPU when idle", "With nothing animating, the dock uses no CPU. An animated frame takes 0.5 to 2 ms, because only the region that changed is redrawn and sent to the X server."],
      ],
      chapters: [
        ["Why build a dock", "I wanted the feel of the macOS dock on Linux: the fish-eye, the bounce when an app opens and the Launchpad. The existing docks depend on GTK or Qt, so I decided to write one from scratch in Rust and learn how windows, icons and animations work underneath."],
        ["Drawing without a toolkit", "Everything is drawn on the CPU with tiny-skia and sent to the X server through x11rb. The dock window is transparent, and an X Shape input region lets clicks on empty areas pass through to the windows below. Apps come from the standard XDG .desktop files and icons from the system theme, loaded on background threads."],
        ["Spring animations", "Every animation uses the same damped spring: magnification, icons appearing and leaving, reordering while dragging and fades. When nothing moves, the event loop stops drawing, which is why the dock sits at 0% CPU when idle."],
        ["Stacks and previews with no idle cost", "Stacks watch their folders with inotify, so the new-files badge stays current without waking the dock for nothing. Previews are captured on a background thread and shown in a glass popover over a blurred capture of the screen, more opaque on bright wallpapers. To know which apps open a file, the dock reads the MimeType of each .desktop file and the shared-mime-info database."],
      ],
      code: { title: "The spring behind every animation" },
      gallery: [
        { caption: "Stack as an orbit", alt: "The Downloads stack open as an orbit: eight files on two arcs above the icon, with blue dots on new files" },
        { caption: "Stack as a panel", alt: "The Projetos stack open as a panel, with sort tabs, search, a file grid and a preview area" },
        { caption: "Window previews", alt: "Glass popover with live thumbnails of the Text Editor's two windows and a New window button" },
        { caption: "Drop files on apps", alt: "Dragging an image over the dock: Pix rises with an “Open with Pix” tooltip and apps that can't open images fade" },
        { caption: "Recent files in the menu", alt: "Text Editor menu with a Recent section listing the last files it opened" },
        { caption: "Stack menu", alt: "A stack's menu with Open in Files, Show as Automatic, Orbit or Panel, and Sort by" },
        { caption: "Launchpad", alt: "Launchpad with a grid of every installed app over the blurred desktop" },
        { caption: "Preferences", alt: "Dock preferences with sliders, position, theme, hiding and switches for bounce, indicators, previews, drag highlight and recent files" },
        { caption: "Themes", alt: "The same dock in the Glass, Graphite, Ice, Neon, Sunset and Wood themes" },
      ],
    },
  },
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
            chapters: d.chapters?.map(([title, body, palette], i) => {
              const tr = e.chapters?.[i];
              return [tr?.[0] ?? title, tr?.[1] ?? body, palette?.map(([name, hex], j) => [tr?.[2]?.[j] ?? name, hex] as [string, string])];
            }),
            code: d.code && { ...d.code, ...e.code },
            gallery: captions(d.gallery, e.gallery),
            phones: captions(d.phones, e.phones),
          }
        : d,
  };
}

export const PROJECTS_EN: Project[] = PROJECTS.map(translate);
