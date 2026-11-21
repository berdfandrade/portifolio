import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import BirthChart from '../components/BirthChart';
import TopTracks from '../components/TopTracks';
import RecentFilms from '../components/RecentFilms';
import AstroReading from '../components/AstroReading';
import PhilosophyReading from '../components/PhilosophyReading';
import { useI18n } from '../i18n';
import { CHART, PLACEMENT_ORDER, formatDegrees } from '../data/astro';

// Ícones da ficha pessoal, no mesmo traço dos ícones de interesses.
const PERSONAL_ICONS: Record<string, string> = {
  record: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
  status: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  beliefs: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  smoke: 'M3 15h13v4H3zM19 15v4M21.5 15v4M17 11c0-1.5 1.5-1.8 1.5-3.5S17 5.5 17 4',
  drink: 'M8 3h8l-1 6a3 3 0 0 1-6 0L8 3zM12 12v8M8 21h8',
  drugs: 'M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7l7-7zM7 10l7 7',
  exercise: 'M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11',
  messages: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12zM13 8l-3 4h4l-3 4',
};

const AVATAR = `${import.meta.env.BASE_URL}assets/character.gif`;

// Nível = idade; a experiência é quanto do ano já passou desde o último aniversário (15 de janeiro de 1996).
const BIRTH = { year: 1996, month: 0, day: 15 };
const HP = 60; // sem fórmula: só a barra de vida do personagem
const DAY = 24 * 60 * 60 * 1000;

function levelStats(now = new Date()) {
  const birthday = (year: number) => new Date(year, BIRTH.month, BIRTH.day);
  const last = now >= birthday(now.getFullYear()) ? birthday(now.getFullYear()) : birthday(now.getFullYear() - 1);
  const next = birthday(last.getFullYear() + 1);
  return {
    level: last.getFullYear() - BIRTH.year,
    exp: Math.floor(((now.getTime() - last.getTime()) / (next.getTime() - last.getTime())) * 1000),
    daysLeft: Math.ceil((next.getTime() - now.getTime()) / DAY),
  };
}

// Abas da página. No celular, a apresentação (nome, descrição e dados) também fica dentro de "Perfil".
const TABS = ['ficha', 'gostos', 'astral', 'humor'] as const;
type Tab = (typeof TABS)[number];

const HUMOR = { positividade: 85, ironia: 95 };
const ring = (r: number, pct: number) => {
  const c = 2 * Math.PI * r;
  return `${((c * pct) / 100).toFixed(1)} ${c.toFixed(1)}`;
};

// Ícones (traço, 24×24) dos interesses da aba Gostos.
const INTEREST_ICONS: Record<string, string> = {
  cinema: 'M3 6h18v12H3zM3 10h18M7 6l2 4M12 6l2 4M17 6l2 4',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  literature: 'M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5v13c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5zM12 6v13.5',
  history: 'M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-7 10 7z',
  philosophy: 'M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3zM9.5 21h5',
  tech: 'M4 5h16v11H4zM2 20h20M10 16v4M14 16v4',
  people: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a6 6 0 0 1 12 0M12 20a6 6 0 0 1 10 0',
  running: 'M15 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 21l3.5-5.5 3 2.5V22M10.5 15.5L12.5 9 9 10.5 7.5 13.5M12.5 9l2.5 3.5H19',
  meditation: 'M12 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 8.5v5.5M6.5 12l5.5 2 5.5-2M3.5 19.5c2.5-2.3 5.3-3.3 8.5-3.3s6 1 8.5 3.3M8 17.5l-2.5 3M16 17.5l2.5 3',
  drums: 'M3 10c0-1.7 4-3 9-3s9 1.3 9 3-4 3-9 3-9-1.3-9-3zM3 10v6c0 1.7 4 3 9 3s9-1.3 9-3v-6M5 3l5 5M19 3l-5 5',
  guitar: 'M19 3l2 2-6.2 6.2M14.8 11.2a3 3 0 0 0-4.3-.1L9.3 12.3a4 4 0 0 0-5.1 1 4 4 0 0 0 .6 5.4 4 4 0 0 0 5.4.6 4 4 0 0 0 1-5.1l1.2-1.2a3 3 0 0 0-.1-4.3zM7.5 16.5h.01',
  impressions: 'M3 4h8v6a4 4 0 0 1-8 0zM5.5 7h.01M8.5 7h.01M5.2 10.5a2 2 0 0 0 3.6 0M13 9h8v6a4 4 0 0 1-8 0zM15.5 12h.01M18.5 12h.01M15.2 16.8a2 2 0 0 1 3.6 0',
};

// Inventário de jogo: cada ferramenta é um item em pixel art (public/assets/inventory/<sprite>.png) com raridade.
type Rarity = 'legendary' | 'epic' | 'rare';
const INVENTORY: { name: string; rarity: Rarity; sprite: string }[] = [
  { name: 'React', rarity: 'legendary', sprite: 'react' },
  { name: 'React Native', rarity: 'legendary', sprite: 'react-native' },
  { name: 'NestJS', rarity: 'legendary', sprite: 'nestjs' },
  { name: 'Figma', rarity: 'legendary', sprite: 'figma' },
  { name: 'Tailwind', rarity: 'epic', sprite: 'tailwind' },
  { name: 'FastAPI', rarity: 'epic', sprite: 'fastapi' },
  { name: 'Java', rarity: 'epic', sprite: 'java' },
  { name: 'Pixel art', rarity: 'epic', sprite: 'pixel-art' },
  { name: 'Vibe code', rarity: 'epic', sprite: 'vibe-code' },
  { name: 'Rust', rarity: 'rare', sprite: 'rust' },
  { name: 'C / C++', rarity: 'rare', sprite: 'cpp' },
  { name: 'Claude', rarity: 'rare', sprite: 'claude' },
];
const INVENTORY_SLOTS = 12;

export default function About() {
  const { t, to, projects, books } = useI18n();
  const a = t.about;
  usePageTitle(a.title);
  const [tab, setTab] = useState<Tab>('ficha');
  const panel = (id: Tab) => (tab === id ? 'is-active' : undefined);
  const { level, exp, daysLeft } = levelStats();

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(i + step + TABS.length) % TABS.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <>
      <TopBar title={a.title} />
      <main className="about">
        <section className="about-hero" aria-label={a.heroLabel}>
          <figure className="avatar-card">
            <img src={AVATAR} width={276} height={636} alt={a.avatarAlt} />
            {/* Cartão de jogador em vidro: o anel mostra a experiência até o próximo nível, como os anéis do Atividade */}
            <figcaption className="player">
              <span className="level-ring" role="img" aria-label={a.expLabel(exp, level + 1, daysLeft)}>
                <svg width="60" height="60" viewBox="0 0 84 84" aria-hidden="true">
                  <defs>
                    <linearGradient id="ring-exp" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#5AC8FA" />
                      <stop offset="1" stopColor="#0A6CF0" />
                    </linearGradient>
                  </defs>
                  <circle className="ring-track" cx="42" cy="42" r="35" />
                  <circle className="ring-fill" cx="42" cy="42" r="35" pathLength={1000} strokeDasharray={`${exp} 1000`} transform="rotate(-90 42 42)" />
                </svg>
                <span className="level-text" aria-hidden="true">
                  <span>{a.levelWord}</span>
                  <strong>{level}</strong>
                </span>
              </span>
              <span className="player-info">
                <span className="player-title">
                  <span className="player-name">{a.statsTitle}</span>
                  <span className="player-class">{a.className}</span>
                </span>
                <span className="player-meter" role="img" aria-label={a.hpLabel(HP)}>
                  <span className="meter-label" aria-hidden="true">HP</span>
                  <span className="meter-bar hp" aria-hidden="true"><span style={{ width: `${HP}%` }} /></span>
                </span>
                <span className="player-next" aria-hidden="true">{a.nextLevel(level + 1, daysLeft)}</span>
              </span>
            </figcaption>
          </figure>

          <div className={`about-intro ${panel('ficha') ?? ''}`} data-panel="ficha">
            <h1>Bernardo</h1>
            <p className="lede">
              <span className="eyebrow desc-label">{a.descLabel}</span>
              {a.description}
            </p>
            <dl className="facts">
              {a.facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <div className="tabs" role="tablist" aria-label={a.tabsLabel} style={{ '--i': TABS.indexOf(tab) } as CSSProperties}>
          {TABS.map((id, i) => (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              className="tab"
              role="tab"
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              tabIndex={tab === id ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {a.tabs[id]}
            </button>
          ))}
        </div>

        <div className="about-panel" role="tabpanel" id="panel-ficha" aria-labelledby="tab-ficha" hidden={tab !== 'ficha'}>
          <section className="card about-me" aria-labelledby="about-me">
            <h2 id="about-me">{a.aboutMeTitle}</h2>
            {a.aboutMe.map((text) => <p key={text}>{text}</p>)}
          </section>

          <section className="card personal" aria-labelledby="personal">
            <h2 id="personal">{a.personalTitle}</h2>
            <dl>
              {a.personal.map(([id, k, v]) => (
                <div key={id}>
                  <dt>
                    <span className="personal-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={PERSONAL_ICONS[id]} /></svg>
                    </span>
                    {k}
                  </dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="pair" aria-label={a.pairLabel}>
            <div className="card">
              <div className="inventory-head">
                <h2>{a.inventory}</h2>
                <span className="inventory-count">{a.slots(INVENTORY.length, INVENTORY_SLOTS)}</span>
              </div>
              <ul className="inventory">
                {INVENTORY.map((item) => (
                  <li key={item.name} className={`slot is-${item.rarity}`}>
                    <img src={`${import.meta.env.BASE_URL}assets/inventory/${item.sprite}.png`} width={14} height={14} alt="" />
                    <span className="slot-name">{item.name}</span>
                    <span className="sr-only">, {a.rarity[item.rarity]}</span>
                  </li>
                ))}
                {Array.from({ length: INVENTORY_SLOTS - INVENTORY.length }, (_, i) => <li key={i} className="slot is-empty" aria-hidden="true" />)}
              </ul>
              <p className="rarity-legend" aria-hidden="true">
                {(['legendary', 'epic', 'rare'] as const).map((r) => <span key={r} className={`is-${r}`}>{a.rarity[r]}</span>)}
              </p>
              <Link to={to('skills')}>{a.skillsLink}</Link>
            </div>
            <div className="card">
              <div className="inventory-head">
                <h2>{a.quests}</h2>
                <span className="inventory-count">{a.questCount(projects.filter((p) => p.ongoing).length, projects.length)}</span>
              </div>
              {/* Registro de missões: em andamento primeiro (!), depois as concluídas (✓). Cada uma abre o projeto. */}
              <ol className="quest-log">
                {[...projects].sort((x, y) => Number(!!y.ongoing) - Number(!!x.ongoing)).map((p) => (
                  <li key={p.slug} className={p.ongoing ? 'is-active' : 'is-done'}>
                    <Link to={to('project', p.slug)}>
                      <span className="quest-mark" aria-hidden="true">{p.ongoing ? '!' : '✓'}</span>
                      <span className="quest-text">
                        <span className="quest-title">{p.title}</span>
                        <span className="quest-meta">{p.meta}</span>
                      </span>
                      <span className="quest-state">{p.ongoing ? a.questActive : a.questDone}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link to={to('library')}>{a.libraryLink}</Link>
            </div>
          </section>
        </div>

        <div className="about-panel" role="tabpanel" id="panel-gostos" aria-labelledby="tab-gostos" hidden={tab !== 'gostos'}>
          <section className="card interests" aria-labelledby="interests">
            <h2 id="interests">{a.interestsTitle}</h2>
            <p className="interests-sub">{a.interestsSub}</p>
            <ul className="interest-grid">
              {a.interests.map(([id, label]) => (
                <li key={id} className={`interest is-${id}`}>
                  <span className="interest-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={INTEREST_ICONS[id]} /></svg>
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card club" aria-labelledby="club">
            <img className="club-badge" src={`${import.meta.env.BASE_URL}assets/galo.png`} width={152} height={168} alt={a.clubBadgeAlt} />
            <div className="club-text">
              <p className="eyebrow">{a.clubEyebrow}</p>
              <h2 id="club">{a.clubName}</h2>
              <p>{a.clubText}</p>
              <ul className="club-facts">
                {a.clubFacts.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </section>

          <TopTracks />

          <RecentFilms />

          <Link to={to('books')} className="card shelf-link">
            <span className="shelf-link-books" aria-hidden="true">
              {books.slice(0, 5).map((book) => <span key={book.id} style={{ background: book.color, height: `${book.height / 4}px` }} />)}
            </span>
            <span className="shelf-link-text">
              <span className="eyebrow">{a.booksEyebrow}</span>
              <strong>{a.booksTitle}</strong>
              <span>{a.booksText(books.length)}</span>
            </span>
            <span className="shelf-link-arrow" aria-hidden="true">›</span>
          </Link>
        </div>

        <div className="about-panel" role="tabpanel" id="panel-astral" aria-labelledby="tab-astral" hidden={tab !== 'astral'}>
          <section className="card split astro" aria-labelledby="mapa">
            <div className="chart">
              <BirthChart />
            </div>
            <div className="split-text astro-text">
              <p className="eyebrow">{a.astroEyebrow}</p>
              <h2 id="mapa">{a.astroTitle}</h2>
              <p className="body">{a.astroText}</p>
              <div className="chips">
                {a.traits.map((trait) => <span key={trait} className="chip">{trait}</span>)}
              </div>
              <dl className="placements">
                {PLACEMENT_ORDER.map((id) => {
                  const pos = CHART[id];
                  return (
                    <div key={id}>
                      <dt>{a.points[id]}</dt>
                      <dd>
                        {a.signs[pos.sign]} <span className="deg">{formatDegrees(pos)}</span>
                        {pos.retrograde && <abbr className="retro" title={a.retrograde}> ℞</abbr>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </section>

          <AstroReading />
        </div>

        <div className="about-panel" role="tabpanel" id="panel-humor" aria-labelledby="tab-humor" hidden={tab !== 'humor'}>
          <section className="card split humor" aria-labelledby="humor">
            <div className="rings">
              <svg role="img" aria-label={`${a.positivity} ${HUMOR.positividade}%, ${a.irony.toLowerCase()} ${HUMOR.ironia}%`} width="220" height="220" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="94" fill="none" stroke="#FF375F" strokeOpacity="0.18" strokeWidth="22" />
                <circle cx="110" cy="110" r="94" fill="none" stroke="#FF375F" strokeWidth="22" strokeLinecap="round" strokeDasharray={ring(94, HUMOR.positividade)} transform="rotate(-90 110 110)" />
                <circle cx="110" cy="110" r="66" fill="none" stroke="#30D158" strokeOpacity="0.18" strokeWidth="22" />
                <circle cx="110" cy="110" r="66" fill="none" stroke="#30D158" strokeWidth="22" strokeLinecap="round" strokeDasharray={ring(66, HUMOR.ironia)} transform="rotate(-90 110 110)" />
              </svg>
            </div>
            <div className="split-text">
              <p className="eyebrow">{a.humorEyebrow}</p>
              <h2 id="humor">{a.humorTitle}</h2>
              <p className="body">{a.humorText}</p>
              <div className="meters">
                <div className="meter"><span className="label pos">{a.positivity}</span><span className="value">{HUMOR.positividade}%</span></div>
                <div className="meter"><span className="label iron">{a.irony}</span><span className="value">{HUMOR.ironia}%</span></div>
              </div>
            </div>
          </section>

          <PhilosophyReading />
        </div>
      </main>
    </>
  );
}
