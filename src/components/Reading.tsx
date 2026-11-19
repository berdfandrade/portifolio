import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Block, Reading as ReadingData } from '../data/reading';

/** Trechos entre ** viram negrito. */
function rich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

type GlyphFn<K extends string> = (key: K, size: 'sm' | 'lg') => ReactNode;

function BlockView<K extends string>({ block, glyph }: { block: Block<K>; glyph: GlyphFn<K> }) {
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
            {glyph(card.glyph, 'lg')}
            <span className="eyebrow">{card.label}</span>
            <strong>{card.title}</strong>
            <p>{rich(card.text)}</p>
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
              {glyph(side.glyph, 'lg')}
              <strong>{side.title}</strong>
              <p>{rich(side.text)}</p>
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

/**
 * Leitura longa em seções, com índice lateral que acompanha a rolagem.
 * `id` separa os endereços (#astro-…, #filosofia-…) quando há mais de uma leitura na página.
 */
export default function Reading<K extends string>({ id, reading, glyph }: { id: string; reading: ReadingData<K>; glyph: GlyphFn<K> }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(reading.sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.slice(id.length + 1));
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    root.current?.querySelectorAll('.reading-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reading, id]);

  return (
    <section ref={root} className="card reading" aria-labelledby={`${id}-title`}>
      <header className="reading-head">
        <p className="eyebrow">{reading.eyebrow}</p>
        <h2 id={`${id}-title`}>{reading.title}</h2>
      </header>

      <div className="reading-intro">{reading.intro.map((block, i) => <BlockView key={i} block={block} glyph={glyph} />)}</div>

      <div className="reading-layout">
        <nav className="reading-toc" aria-label={reading.tocLabel}>
          <p className="eyebrow">{reading.tocLabel}</p>
          <ol>
            {reading.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${id}-${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                  <span className="toc-number">{s.number}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="reading-body">
          {reading.sections.map((s) => (
            <article key={s.id} id={`${id}-${s.id}`} className="reading-section" aria-labelledby={`${id}-${s.id}-title`}>
              <header>
                <span className="section-number" aria-hidden="true">{s.number}</span>
                <span className="section-glyphs">{s.glyphs.map((g) => <Fragment key={g}>{glyph(g, 'sm')}</Fragment>)}</span>
                <h3 id={`${id}-${s.id}-title`}>{s.title}</h3>
              </header>
              {s.blocks.map((block, i) => <BlockView key={i} block={block} glyph={glyph} />)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
