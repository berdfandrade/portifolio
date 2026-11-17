import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { PROJECTS } from '../data/projects';

const AVATAR = `${import.meta.env.BASE_URL}assets/avatar.png`;

// Abas da versão celular. No desktop todas as seções aparecem juntas (ver styles.css).
const TABS = [
  { id: 'ficha', label: 'Ficha' },
  { id: 'astral', label: 'Astral' },
  { id: 'humor', label: 'Humor' },
] as const;
type Tab = (typeof TABS)[number]['id'];

const HUMOR = { positividade: 85, ironia: 95 };
const ring = (r: number, pct: number) => {
  const c = 2 * Math.PI * r;
  return `${((c * pct) / 100).toFixed(1)} ${c.toFixed(1)}`;
};

const PLACEMENTS: [string, string][] = [
  ['Sol', 'Capricórnio'],
  ['Lua', '[SIGNO]'],
  ['Ascendente', '[SIGNO]'],
  ['Mercúrio', '[SIGNO]'],
  ['Vênus', '[SIGNO]'],
  ['Marte', '[SIGNO]'],
];

// Mapa astral: divisões dos signos (anel externo) e das casas (anel interno), e os glifos.
const SIGN_LINES = [
  [56, 160, 10, 160], [69.9, 212, 30.1, 235], [108, 250.1, 85, 289.9], [160, 264, 160, 310],
  [212, 250.1, 235, 289.9], [250.1, 212, 289.9, 235], [264, 160, 310, 160], [250.1, 108, 289.9, 85],
  [212, 69.9, 235, 30.1], [160, 56, 160, 10], [108, 69.9, 85, 30.1], [69.9, 108, 30.1, 85],
];
const HOUSE_LINES = [
  [98, 160, 56, 160], [106.3, 191, 69.9, 212], [129, 213.7, 108, 250.1], [160, 222, 160, 264],
  [191, 213.7, 212, 250.1], [213.7, 191, 250.1, 212], [222, 160, 264, 160], [213.7, 129, 250.1, 108],
  [191, 106.3, 212, 69.9], [160, 98, 160, 56], [129, 106.3, 108, 69.9], [106.3, 129, 69.9, 108],
];
const GLYPHS: [number, number, string][] = [
  [37.3, 192.9, '♈︎'], [70.2, 249.8, '♉︎'], [127.1, 282.7, '♊︎'], [192.9, 282.7, '♋︎'],
  [249.8, 249.8, '♌︎'], [282.7, 192.9, '♍︎'], [282.7, 127.1, '♎︎'], [249.8, 70.2, '♏︎'],
  [192.9, 37.3, '♐︎'], [127.1, 37.3, '♑︎'], [70.2, 70.2, '♒︎'], [37.3, 127.1, '♓︎'],
];
const CAPRICORNIO = '♑︎';

const SKILLS = ['Figma', 'React', 'React Native', 'NestJS', 'FastAPI', 'Rust', 'C / C++', 'Qt', 'Tailwind', 'Playwright', 'Pixel art'];
const TRAITS = ['Determinado', 'Disciplinado', 'Ambicioso', 'Paciente'];

export default function About() {
  usePageTitle('Sobre');
  const [tab, setTab] = useState<Tab>('ficha');
  const panel = (id: Tab) => (tab === id ? 'is-active' : undefined);

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(i + step + TABS.length) % TABS.length];
    setTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <>
      <TopBar title="Sobre" />
      <main className="about">
        <section className="about-hero" aria-label="Ficha de personagem">
          <figure className="avatar-card">
            <img src={AVATAR} width={400} height={400} alt="Avatar em pixel art do Bernardo: cabelo preto bagunçado e camiseta azul" />
            <div className="avatar-foot">
              <span className="player">Jogador 1</span>
              <span className="online">Online</span>
            </div>
            <figcaption className="avatar-caption" aria-hidden="true">
              <span className="cap-name">Bernardo</span>
              <span className="cap-sub">Classe Desenvolvedor · {CAPRICORNIO} Capricórnio</span>
            </figcaption>
          </figure>

          <div className={`about-intro ${panel('ficha') ?? ''}`} data-panel="ficha">
            <p className="eyebrow">Ficha de personagem</p>
            <h1>Bernardo</h1>
            <p className="lede">
              <span className="eyebrow desc-label">Descrição</span>
              Classe <strong>Desenvolvedor</strong>. Otimista por padrão, irônico por esporte. Constrói apps, automações e páginas — e coleciona tudo nesta biblioteca.
            </p>
            <dl className="facts">
              {[['Altura', '1.73m'], ['Peso', '82Kg'], ['Signo', 'Capricórnio'], ['Elemento', 'Terra']].map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <div className="tabs" role="tablist" aria-label="Seções da ficha">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              className="tab"
              role="tab"
              aria-selected={tab === t.id}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <section className={`card split humor ${panel('humor') ?? ''}`} aria-labelledby="humor" data-panel="humor">
          <div className="rings">
            <svg role="img" aria-label={`Positividade ${HUMOR.positividade}%, ironia ${HUMOR.ironia}%`} width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="94" fill="none" stroke="#FF375F" strokeOpacity="0.18" strokeWidth="22" />
              <circle cx="110" cy="110" r="94" fill="none" stroke="#FF375F" strokeWidth="22" strokeLinecap="round" strokeDasharray={ring(94, HUMOR.positividade)} transform="rotate(-90 110 110)" />
              <circle cx="110" cy="110" r="66" fill="none" stroke="#30D158" strokeOpacity="0.18" strokeWidth="22" />
              <circle cx="110" cy="110" r="66" fill="none" stroke="#30D158" strokeWidth="22" strokeLinecap="round" strokeDasharray={ring(66, HUMOR.ironia)} transform="rotate(-90 110 110)" />
            </svg>
          </div>
          <div className="split-text">
            <p className="eyebrow">Estilo de humor</p>
            <h2 id="humor">Positivo e irônico</h2>
            <p className="body">Vê o lado bom de quase tudo — e faz um comentário sarcástico sobre ele logo em seguida.</p>
            <div className="meters">
              <div className="meter"><span className="label pos">Positividade</span><span className="value">{HUMOR.positividade}%</span></div>
              <div className="meter"><span className="label iron">Ironia</span><span className="value">{HUMOR.ironia}%</span></div>
            </div>
          </div>
        </section>

        <section className={`card split astro ${panel('astral') ?? ''}`} aria-labelledby="mapa" data-panel="astral">
          <div className="chart">
            <svg role="img" aria-label="Mapa astral com o Sol em Capricórnio" viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="150" style={{ fill: 'var(--card)', stroke: 'var(--sep)' }} strokeWidth="1.5" />
              <path d="M160.0 10.0 A150 150 0 0 0 85.0 30.1 L108.0 69.9 A104 104 0 0 1 160.0 56.0 Z" style={{ fill: 'var(--sand)' }} />
              <g style={{ stroke: 'var(--sep)' }} strokeWidth="1">
                {SIGN_LINES.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
              </g>
              <g className="glyph" textAnchor="middle" dominantBaseline="central">
                {GLYPHS.map(([x, y, g]) => (
                  <text key={g} x={x} y={y} style={g === CAPRICORNIO ? { fill: 'var(--sand-ink)' } : undefined}>{g}</text>
                ))}
              </g>
              <circle cx="160" cy="160" r="104" style={{ fill: 'none', stroke: 'var(--sep)' }} strokeWidth="1.5" />
              <circle cx="160" cy="160" r="62" style={{ fill: 'var(--bg)', stroke: 'var(--sep)' }} strokeWidth="1" />
              <g style={{ stroke: 'var(--sep2)' }} strokeWidth="1">
                {HOUSE_LINES.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
              </g>
              <circle cx="138.5" cy="79.8" r="13" style={{ fill: '#FF9F0A' }} />
              <text x="138.5" y="79.8" textAnchor="middle" dominantBaseline="central" style={{ fill: 'var(--sand-ink)', fontSize: 15, fontWeight: 700, fontFamily: 'sans-serif' }}>☉︎</text>
              <text x="160" y="152" textAnchor="middle" style={{ fill: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>SOL EM</text>
              <text x="160" y="172" textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 15, fontWeight: 700 }}>Capricórnio</text>
            </svg>
          </div>
          <div className="split-text astro-text">
            <p className="eyebrow">Mapa astral</p>
            <h2 id="mapa">Capricórnio, signo de terra</h2>
            <p className="body">Regido por Saturno: foco, disciplina e paciência para construir coisas que duram.</p>
            <div className="chips">
              {TRAITS.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            <dl className="placements">
              {PLACEMENTS.map(([planet, sign]) => (
                <div key={planet}><dt>{planet}</dt><dd>{sign}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`pair ${panel('ficha') ?? ''}`} data-panel="ficha" aria-label="Inventário e missões">
          <div className="card">
            <h2>Inventário</h2>
            <div className="chips">
              {SKILLS.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <Link to="/skill-tree">Ver Skill Tree completa ›</Link>
          </div>
          <div className="card">
            <h2>Missões ativas</h2>
            <p>{new Intl.ListFormat('pt-BR').format(PROJECTS.map((p) => p.title))}.</p>
            <Link to="/">Abrir a biblioteca ›</Link>
          </div>
        </section>
      </main>
    </>
  );
}
