import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { useI18n } from '../i18n';
import type { Era } from '../data/experience';

/** Janelas atrás da da frente que ainda aparecem; as mais antigas somem no fundo. */
const DEPTH = 4;

const KIND_ICON: Record<Era['kind'], string> = {
  work: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  study: 'M12 4L2 9l10 5 10-5zM6 11v5c3 2.5 9 2.5 12 0v-5',
};

/**
 * Experiência no estilo da Time Machine do macOS: cada fase é uma janela empilhada em profundidade.
 * Voltar no tempo faz a janela da frente voar na direção de quem lê e revela a anterior.
 */
export default function Experience() {
  const { t, eras, certificates } = useI18n();
  const x = t.experience;
  usePageTitle(x.title);
  // Índice em `eras` da janela da frente (0 = a mais recente).
  const [current, setCurrent] = useState(0);
  const go = (i: number) => setCurrent(Math.max(0, Math.min(eras.length - 1, i)));
  const era = eras[current];

  const month = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return m ? `${x.months[m - 1]} ${y}` : String(y);
  };
  const period = (e: Era) => `${month(e.start)} – ${month(e.end)}`;

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
      <TopBar title={x.title} contact />
      <main className="exp-page">
        <section className="exp-hero">
          <p className="eyebrow">{x.eyebrow}</p>
          <h1>{x.heading}</h1>
          <p className="lede">{x.intro}</p>
        </section>

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

        <section className="exp-extra">
          <div className="card">
            <h2>{x.certTitle}</h2>
            <ul className="exp-certs">{certificates.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="card">
            <h2>{x.langTitle}</h2>
            <dl className="exp-langs">
              {x.langs.map(([lang, level]) => (
                <div key={lang}><dt>{lang}</dt><dd>{level}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}
