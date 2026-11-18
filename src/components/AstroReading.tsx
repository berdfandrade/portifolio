import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { useI18n } from '../i18n';
import { PLANET_GLYPHS, SIGN_GLYPHS, type Body, type Sign } from '../data/astro';
import { READING, type Block, type GlyphKey } from '../data/astro-reading';
import { READING_EN } from '../data/astro-reading.en';

// Elemento de cada signo, para a cor do selo (fogo, terra, ar, água).
const ELEMENT: Record<Sign, 'fire' | 'earth' | 'air' | 'water'> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
};
const EXTRA: Record<string, string> = { conjunction: '☌︎', sextile: '✶', trine: '△', mc: 'MC', asc: 'AC' };

/** Selo redondo com o símbolo de um signo, planeta ou aspecto. */
function Glyph({ k, size = 'sm' }: { k: GlyphKey; size?: 'sm' | 'lg' }) {
  const sign = k in SIGN_GLYPHS ? (k as Sign) : null;
  const text = sign ? SIGN_GLYPHS[sign] : k in PLANET_GLYPHS ? PLANET_GLYPHS[k as Body] : EXTRA[k];
  const kind = sign ? `el-${ELEMENT[sign]}` : k === 'mc' || k === 'asc' ? 'is-text' : 'is-planet';
  return <span className={`glyph-badge ${size} ${kind}`} aria-hidden="true">{text}</span>;
}

/** Trechos entre ** viram negrito. */
function rich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

function BlockView({ block }: { block: Block }) {
  if ('p' in block) return <p>{rich(block.p)}</p>;
  if ('h3' in block) return <h4>{block.h3}</h4>;
  if ('list' in block) return <ul className="reading-list">{block.list.map((item) => <li key={item}>{rich(item)}</li>)}</ul>;
  if ('steps' in block) return <ol className="reading-steps">{block.steps.map((item) => <li key={item}>{rich(item)}</li>)}</ol>;
  if ('quote' in block) return <blockquote className="reading-quote">{rich(block.quote)}</blockquote>;
  if ('note' in block) return <p className="reading-note">{block.note}</p>;
  if ('cards' in block) {
    return (
      <div className="reading-cards">
        {block.cards.map((card) => (
          <div key={card.title} className="reading-card">
            <Glyph k={card.glyph} size="lg" />
            <span className="eyebrow">{card.label}</span>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    );
  }
  if ('versus' in block) {
    return (
      <div className="reading-versus">
        {block.versus.map((side, i) => (
          <Fragment key={side.title}>
            {i > 0 && <span className="versus-mark" aria-hidden="true">×</span>}
            <div className="versus-side">
              <Glyph k={side.glyph} size="lg" />
              <strong>{side.title}</strong>
              <p>{side.text}</p>
            </div>
          </Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="reading-table">
      <table>
        <thead><tr>{block.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{block.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}</tr>)}</tbody>
      </table>
    </div>
  );
}

/** Leitura extensa do mapa astral, com índice lateral que acompanha a rolagem. */
export default function AstroReading() {
  const { lang } = useI18n();
  const reading = lang === 'en' ? READING_EN : READING;
  const [active, setActive] = useState(reading.sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace('reading-', ''));
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    document.querySelectorAll('.reading-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reading]);

  return (
    <section className="card reading" aria-labelledby="reading-title">
      <header className="reading-head">
        <p className="eyebrow">{reading.eyebrow}</p>
        <h2 id="reading-title">{reading.title}</h2>
      </header>

      <div className="reading-intro">{reading.intro.map((block, i) => <BlockView key={i} block={block} />)}</div>

      <div className="reading-layout">
        <nav className="reading-toc" aria-label={reading.tocLabel}>
          <p className="eyebrow">{reading.tocLabel}</p>
          <ol>
            {reading.sections.map((s) => (
              <li key={s.id}>
                <a href={`#reading-${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                  <span className="toc-number">{s.number}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="reading-body">
          {reading.sections.map((s) => (
            <article key={s.id} id={`reading-${s.id}`} className="reading-section" aria-labelledby={`reading-${s.id}-title`}>
              <header>
                <span className="section-number" aria-hidden="true">{s.number}</span>
                <span className="section-glyphs">{s.glyphs.map((g) => <Glyph key={g} k={g} />)}</span>
                <h3 id={`reading-${s.id}-title`}>{s.title}</h3>
              </header>
              {s.blocks.map((block, i) => <BlockView key={i} block={block} />)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
