import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { ViewSwitch, useSavedView } from '../components/ViewSwitch';
import { useI18n } from '../i18n';
import type { CertGroup, Era } from '../data/experience';

/** Janelas atrás da da frente que ainda aparecem; as mais antigas somem no fundo. */
const DEPTH = 4;

const KIND_ICON: Record<Era['kind'], string> = {
  work: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  study: 'M12 4L2 9l10 5 10-5zM6 11v5c3 2.5 9 2.5 12 0v-5',
};

/** Ícone e cor de cada área de certificados. */
const CERT_ICON: Record<CertGroup, { path: string; tone: string }> = {
  fcc: { path: 'M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-2 1-3.2 2-4 0 2 1 3 2 3 0-3-1-4.5 0-7.5z', tone: '#30A14E' },
  js: { path: 'M8 4c-2 0-3 1-3 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3', tone: '#C99A00' },
  python: { path: 'M8 8V6a4 4 0 0 1 8 0v4H8a4 4 0 0 0-4 4 4 4 0 0 0 4 4M16 16v2a4 4 0 0 1-8 0v-4h8a4 4 0 0 0 4-4 4 4 0 0 0-4-4', tone: '#3776AB' },
  front: { path: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16', tone: '#E8590C' },
  back: { path: 'M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01', tone: '#0A84FF' },
  c: { path: 'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4', tone: '#8E8E93' },
  linux: { path: 'M3 5h18v14H3zM7 10l3 2-3 2M12 15h5', tone: '#BF5AF2' },
  media: { path: 'M4 9h16v10H4zM4 9l2-4h14l-2 4M9.5 5l-2 4M15.5 5l-2 4', tone: '#FF375F' },
};

/** Mês absoluto (ano × 12 + mês) de "AAAA-MM" ou "AAAA"; sem mês, o início conta como janeiro e o fim como dezembro. */
const monthIndex = (ym: string, edge: 'start' | 'end') => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m ? m - 1 : edge === 'start' ? 0 : 11);
};

/** Datas por extenso no idioma atual: "ago 2025 – jun 2026", ou só os anos quando falta o mês. */
function usePeriod() {
  const x = useI18n().t.experience;
  const month = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return m ? `${x.months[m - 1]} ${y}` : String(y);
  };
  return (e: Era) => `${month(e.start)} – ${month(e.end)}`;
}

/**
 * Experiência em duas visualizações: em 2D, um gráfico do tempo (anos × trabalho/formação) e uma linha do tempo
 * vertical com cada fase; em 3D, a Time Machine do macOS, com uma janela por fase. No celular só há 2D.
 */
export default function Experience() {
  const { t, certificates } = useI18n();
  const x = t.experience;
  usePageTitle(x.title);
  const [view, chooseView] = useSavedView('experience-view');

  return (
    <>
      <TopBar title={x.title} contact />
      <main className="exp-page">
        <section className="exp-hero">
          <p className="eyebrow">{x.eyebrow}</p>
          <h1>{x.heading}</h1>
          <p className="lede">{x.intro}</p>
        </section>

        <div className="map-toolbar">
          <ViewSwitch view={view} onChange={chooseView} />
        </div>

        {view === '2d' ? <Timeline2D /> : <TimeMachine />}

        <section className="card exp-certs" aria-labelledby="certs-title">
          <div className="exp-certs-head">
            <h2 id="certs-title">{x.certTitle}</h2>
            <span>{x.certCount(certificates.reduce((n, g) => n + g.items.length, 0))}</span>
          </div>
          <div className="cert-groups">
            {certificates.map((g) => (
              <section key={g.group} className="cert-group" aria-labelledby={`cert-${g.group}`}>
                <h3 id={`cert-${g.group}`}>{x.certGroups[g.group]}<span className="cert-count">{g.items.length}</span></h3>
                <ul style={{ '--tone': CERT_ICON[g.group].tone } as CSSProperties}>
                  {g.items.map((c) => {
                    const row = (
                      <>
                        <span className="cert-icon" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={CERT_ICON[g.group].path} /></svg>
                        </span>
                        <span className="cert-text">
                          <span className="cert-name">{c.name}</span>
                          {g.issuer && <span className="cert-issuer">{g.issuer}</span>}
                        </span>
                      </>
                    );
                    return (
                      <li key={c.name}>
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noreferrer" title={x.certOpen(c.name)}>
                            {row}
                            <svg className="cert-out" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 16L16 8M9 8h7v7" /></svg>
                          </a>
                        ) : (
                          <div>{row}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="card exp-langs-card" aria-labelledby="langs-title">
          <h2 id="langs-title">{x.langTitle}</h2>
          <dl className="exp-langs">
            {x.langs.map(([lang, level]) => (
              <div key={lang}><dt>{lang}</dt><dd>{level}</dd></div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}

/** Conteúdo de uma fase, igual na janela da Time Machine e no cartão da linha do tempo. */
function EraBody({ era: e }: { era: Era }) {
  const x = useI18n().t.experience;
  const period = usePeriod();
  return (
    <>
      <div className="tm-head">
        <span className="tm-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={KIND_ICON[e.kind]} /></svg>
        </span>
        <div>
          <p className="tm-kind">{x.kind[e.kind]}</p>
          <h2 id={`era-${e.id}`}>{e.org}</h2>
          <p className="tm-role">{e.role}</p>
        </div>
      </div>
      <p className="tm-meta">
        <span>{period(e)}</span>
        <span>{e.duration}</span>
        <span>{e.place}</span>
      </p>
      <p className="tm-lede">{e.lede}</p>
      <h3>{e.listTitle}</h3>
      <ul className="tm-items">{e.items.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>{x.stack}</h3>
      <ul className="tm-stack-chips">{e.stack.map((s) => <li key={s}>{s}</li>)}</ul>
    </>
  );
}

/** 2D: gráfico do tempo no topo (cada fase é uma barra do tamanho da sua duração) e a linha do tempo detalhada embaixo. */
function Timeline2D() {
  const { t, eras } = useI18n();
  const x = t.experience;
  const period = usePeriod();
  const first = Math.min(...eras.map((e) => Number(e.start.slice(0, 4))));
  const last = Math.max(...eras.map((e) => Number(e.end.slice(0, 4)))) + 1;
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  const span = (last - first) * 12;
  // Em telas estreitas o gráfico rola na horizontal: começa mostrando o fim, onde está o mais recente.
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);
  const pos = (e: Era) => {
    const from = monthIndex(e.start, 'start') - first * 12;
    const to = monthIndex(e.end, 'end') + 1 - first * 12;
    return { left: `${(from / span) * 100}%`, width: `${((to - from) / span) * 100}%` };
  };

  return (
    <>
      <section className="tl-chart card" aria-labelledby="tl-chart-title">
        <h2 id="tl-chart-title">{x.overview}</h2>
        <div className="tl-scroll" ref={scroller}>
          <div className="tl-grid" style={{ '--years': years.length - 1 } as CSSProperties}>
            {(['work', 'study'] as const).map((kind) => (
              <div key={kind} className="tl-lane">
                <span className="tl-lane-label">{x.kind[kind]}</span>
                <div className="tl-track">
                  {eras.filter((e) => e.kind === kind).map((e) => (
                    <a key={e.id} href={`#fase-${e.id}`} className="tl-bar" style={{ ...pos(e), '--tone': e.tone } as CSSProperties} title={`${e.org} · ${period(e)}`}>
                      {/* Na barra cabe só a primeira palavra; o nome completo fica na dica e no cartão. */}
                      <span>{e.org.split(' ')[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="tl-axis" aria-hidden="true">
              <span />
              <div className="tl-years">
                {years.map((y) => <span key={y} style={{ left: `${((y - first) / (last - first)) * 100}%` }}>{y}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ol className="tl-list" aria-label={x.stageLabel}>
        {eras.map((e) => (
          <li key={e.id} id={`fase-${e.id}`} className="tl-item" style={{ '--tone': e.tone } as CSSProperties}>
            <div className="tl-when" aria-hidden="true">
              <strong>{period(e)}</strong>
              <span>{e.duration}</span>
            </div>
            <span className="tl-dot" aria-hidden="true" />
            <article className="tl-card tm-body" aria-labelledby={`era-${e.id}`}>
              <EraBody era={e} />
            </article>
          </li>
        ))}
      </ol>
    </>
  );
}

/** 3D: a Time Machine. Voltar no tempo faz a janela da frente voar na direção de quem lê e revela a anterior. */
function TimeMachine() {
  const { t, eras } = useI18n();
  const x = t.experience;
  const period = usePeriod();
  // Índice em `eras` da janela da frente (0 = a mais recente).
  const [current, setCurrent] = useState(0);
  const go = (i: number) => setCurrent(Math.max(0, Math.min(eras.length - 1, i)));
  const era = eras[current];

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowUp: 1, PageUp: 1, ArrowDown: -1, PageDown: -1 }[e.key];
    if (step) {
      e.preventDefault();
      go(current + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(eras.length - 1);
    }
  };

  return (
    <>
      <section className="tm" aria-label={x.stageLabel} onKeyDown={onKey}>
        <div className="tm-space" aria-hidden="true" />

        <div className="tm-stack">
          {eras.map((e, i) => {
            const d = i - current;
            const state = d < 0 ? 'gone' : d === 0 ? 'front' : d > DEPTH ? 'far' : 'behind';
            return (
              <article
                key={e.id}
                className="tm-window"
                data-state={state}
                style={{ '--d': Math.max(d, 0), '--tone': e.tone } as CSSProperties}
                aria-hidden={d !== 0}
                inert={d !== 0}
                aria-labelledby={`era-${e.id}`}
              >
                <header className="tm-titlebar">
                  <span className="tm-lights" aria-hidden="true"><i /><i /><i /></span>
                  <span className="tm-title">{e.org} — {e.role}</span>
                </header>
                <div className="tm-body">
                  <EraBody era={e} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Régua da direita: um tique por fase, a mais recente no topo, como na Time Machine. */}
        <nav className="tm-timeline" aria-label={x.stageLabel}>
          <ol>
            {eras.map((e, i) => (
              <li key={e.id}>
                <button type="button" aria-current={i === current ? 'step' : undefined} onClick={() => go(i)}>
                  <span className="tm-tick" aria-hidden="true" />
                  <span className="tm-year">{e.start.slice(0, 4)}</span>
                  <span className="sr-only">{e.org}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="tm-bar">
          <button type="button" className="tm-arrow" onClick={() => go(current + 1)} disabled={current === eras.length - 1} aria-label={x.older}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6" /></svg>
          </button>
          <p className="tm-now" aria-live="polite">
            <strong>{period(era)}</strong>
            <span>{era.org} · {x.position(current + 1, eras.length)}</span>
          </p>
          <button type="button" className="tm-arrow" onClick={() => go(current - 1)} disabled={current === 0} aria-label={x.newer}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>
      </section>
      <p className="tm-hint">{x.hint}</p>
    </>
  );
}
