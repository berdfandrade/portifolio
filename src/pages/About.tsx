import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import BirthChart from '../components/BirthChart';
import { useI18n } from '../i18n';
import { CHART, PLACEMENT_ORDER, formatDegrees } from '../data/astro';

const AVATAR = `${import.meta.env.BASE_URL}assets/avatar.webp`;

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

// Abas da versão celular. No desktop todas as seções aparecem juntas (ver styles.css).
const TABS = ['ficha', 'astral', 'humor'] as const;
type Tab = (typeof TABS)[number];

const HUMOR = { positividade: 85, ironia: 95 };
const ring = (r: number, pct: number) => {
  const c = 2 * Math.PI * r;
  return `${((c * pct) / 100).toFixed(1)} ${c.toFixed(1)}`;
};

const SKILLS = ['Figma', 'React', 'React Native', 'NestJS', 'FastAPI', 'Rust', 'C / C++', 'Qt', 'Tailwind', 'Playwright', 'Pixel art'];

export default function About() {
  const { t, to, projects } = useI18n();
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
            <img src={AVATAR} width={800} height={800} alt={a.avatarAlt} />
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
              tabIndex={tab === id ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {a.tabs[id]}
            </button>
          ))}
        </div>

        <section className={`card about-me ${panel('ficha') ?? ''}`} aria-labelledby="about-me" data-panel="ficha">
          <h2 id="about-me">{a.aboutMeTitle}</h2>
          {a.aboutMe.map((text) => <p key={text}>{text}</p>)}
        </section>

        <section className={`card split humor ${panel('humor') ?? ''}`} aria-labelledby="humor" data-panel="humor">
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

        <section className={`card split astro ${panel('astral') ?? ''}`} aria-labelledby="mapa" data-panel="astral">
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

        <section className={`pair ${panel('ficha') ?? ''}`} data-panel="ficha" aria-label={a.pairLabel}>
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
      </main>
    </>
  );
}
