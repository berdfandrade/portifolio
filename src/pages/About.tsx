import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import BirthChart from '../components/BirthChart';
import TopTracks from '../components/TopTracks';
import AstroReading from '../components/AstroReading';
import { useI18n } from '../i18n';
import { CHART, PLACEMENT_ORDER, formatDegrees } from '../data/astro';

const AVATAR = `${import.meta.env.BASE_URL}assets/avatar.png`;

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
  history: 'M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-7 10 7z',
  philosophy: 'M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3zM9.5 21h5',
  tech: 'M4 5h16v11H4zM2 20h20M10 16v4M14 16v4',
  people: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a6 6 0 0 1 12 0M12 20a6 6 0 0 1 10 0',
};

const SKILLS = ['Figma', 'React', 'React Native', 'NestJS', 'FastAPI', 'Rust', 'C / C++', 'Qt', 'Tailwind', 'Playwright', 'Pixel art'];

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
            <img src={AVATAR} width={400} height={400} alt={a.avatarAlt} />
            <figcaption className="stats">
              <span className="stats-title">{a.statsTitle}</span>
              <span className="stats-head">
                <span className="lvl">Lv. <strong>{level}</strong></span>
                <span className="class">{a.classWord} <strong>{a.className}</strong></span>
              </span>
              <span className="stat" role="img" aria-label={a.hpLabel(HP)}>
                <span className="stat-name" aria-hidden="true">HP</span>
                <span className="stat-bar hp" aria-hidden="true"><span style={{ width: `${HP}%` }} /></span>
              </span>
              <span className="stat" role="img" aria-label={a.expLabel(exp, level + 1, daysLeft)}>
                <span className="stat-name" aria-hidden="true">Exp.</span>
                <span className="stat-bar exp" aria-hidden="true"><span style={{ width: `${exp / 10}%` }} /></span>
                <span className="stat-num" aria-hidden="true">{exp} / 1000</span>
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

        <div className="tabs" role="tablist" aria-label={a.tabsLabel}>
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

          <section className="pair" aria-label={a.pairLabel}>
            <div className="card">
              <h2>{a.inventory}</h2>
              <div className="chips">
                {SKILLS.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
              <Link to={to('skills')}>{a.skillsLink}</Link>
            </div>
            <div className="card">
              <h2>{a.quests}</h2>
              <p>{new Intl.ListFormat(t.locale).format(projects.map((p) => p.title))}.</p>
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
                <li key={id} className={`interest ${id}`}>
                  <span className="interest-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={INTEREST_ICONS[id]} /></svg>
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </section>

          <TopTracks />

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
        </div>
      </main>
    </>
  );
}
