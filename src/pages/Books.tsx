import { useEffect, useRef, useState, type CSSProperties } from 'react';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { OrbitControls, useOrbit, useWidth } from '../components/orbit';
import { ViewSwitch, useSavedView } from '../components/ViewSwitch';
import type { Book } from '../data/books';
import { useI18n } from '../i18n';

// Medidas da estante, em px. A lombada fica mais grossa quanto mais páginas o livro tem.
const thickness = (b: Book) => Math.round(Math.min(80, Math.max(26, b.pages / 8)));
const depth = (b: Book) => Math.round(b.height * 0.68);
const WOOD = 18; // espessura das tábuas
const PAD = 28; // folga entre os livros e as laterais
const HEADROOM = 36; // espaço acima do livro mais alto
const GAP = 3; // entre um livro e outro
const MAX_ROW = 760; // largura máxima de uma prateleira antes de começar outra

/** Divide os livros em prateleiras e calcula onde cada um fica dentro do móvel. */
function layout(books: Book[]) {
  const rows: Book[][] = [[]];
  let width = 0;
  for (const b of books) {
    const row = rows[rows.length - 1];
    const add = thickness(b) + (row.length ? GAP : 0);
    if (row.length && width + add > MAX_ROW) {
      rows.push([b]);
      width = thickness(b);
    } else {
      row.push(b);
      width += add;
    }
  }
  const rowWidth = (row: Book[]) => row.reduce((sum, b) => sum + thickness(b), 0) + GAP * (row.length - 1);
  const inner = Math.max(...rows.map(rowWidth)) + PAD * 2;
  const rowH = Math.max(...books.map((b) => b.height)) + HEADROOM + WOOD;
  const caseW = inner + WOOD * 2;
  const caseD = Math.max(...books.map(depth)) + 40;
  const caseH = WOOD + rows.length * rowH;

  const placed = rows.flatMap((row, r) => {
    const floor = WOOD + (r + 1) * rowH - WOOD; // topo da tábua desta prateleira
    let x = WOOD + (inner - rowWidth(row)) / 2;
    return row.map((book) => {
      const t = thickness(book);
      const item = { book, x, y: floor - book.height, t, d: depth(book) };
      x += t + GAP;
      return item;
    });
  });
  const floors = rows.map((_, r) => WOOD + (r + 1) * rowH - WOOD);
  return { placed, floors, caseW, caseH, caseD };
}

/** Caixa 3D em CSS: seis faces em volta do centro do elemento. */
function Box({ x, y, z = 0, w, h, d, className }: { x: number; y: number; z?: number; w: number; h: number; d: number; className: string }) {
  const style = { left: x, top: y, width: w, height: h, '--w': `${w}px`, '--h': `${h}px`, '--d': `${d}px`, transform: `translateZ(${z}px)` } as CSSProperties;
  return (
    <div className={`box ${className}`} style={style} aria-hidden="true">
      <i className="f-front" /><i className="f-back" /><i className="f-left" /><i className="f-right" /><i className="f-top" /><i className="f-bottom" />
    </div>
  );
}

/** Capa do livro: a foto da edição, quando existe, ou uma capa desenhada com título, autor e ornamento nas cores do livro. */
function Cover({ book }: { book: Book }) {
  // Se a foto não existir ou falhar ao carregar, volta para a capa desenhada.
  const [broken, setBroken] = useState(false);
  if (book.cover && !broken) {
    return (
      <img
        className="book-photo"
        src={`${import.meta.env.BASE_URL}assets/books/${book.cover}`}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setBroken(true)}
      />
    );
  }
  return (
    <span className="book-art">
      <span className="book-rule" />
      <span className="book-title">{book.title}</span>
      <span className="book-mark" />
      <span className="book-author">{book.author}</span>
    </span>
  );
}

/** As faces de um livro: lombada na frente, capa à direita, contracapa à esquerda e as páginas atrás e em cima. */
function BookFaces({ book }: { book: Book }) {
  return (
    <>
      <span className="f-front spine">
        <span className="spine-title">{book.title}</span>
        <span className="spine-author">{book.author.split(' ').pop()}</span>
      </span>
      <span className="f-right front-cover"><Cover book={book} /></span>
      <span className="f-left backcover" />
      <span className="f-back pages" />
      <span className="f-top pages top" />
    </>
  );
}

const bookVars = (book: Book, t: number, d: number) =>
  ({ '--w': `${t}px`, '--h': `${book.height}px`, '--d': `${d}px`, '--color': book.color, '--ink': book.ink }) as CSSProperties;

export default function Books() {
  const { t, books } = useI18n();
  const b = t.books;
  usePageTitle(b.title);
  const [open, setOpen] = useState<string | null>(null);
  const [view, chooseView] = useSavedView('books-view');
  const selected = books.find((book) => book.id === open) ?? null;
  const orbit = useOrbit({ initial: { x: -12, y: -22 }, limits: { x: [-32, 8], y: [-60, 60] }, speed: { x: -0.2, y: 0.3 } });
  const stage = useRef<HTMLDivElement>(null);
  const width = useWidth(stage);
  const { placed, floors, caseW, caseH, caseD } = layout(books);
  const scale = width ? Math.min(1.2, (width - 48) / (caseW * 1.35)) : 1;
  const front = caseD / 2 - 10; // a lombada fica rente à frente da prateleira
  const totalPages = new Intl.NumberFormat(t.locale).format(books.reduce((sum, book) => sum + book.pages, 0));

  // Esc devolve o livro aberto à estante.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const sceneStyle = {
    width: caseW,
    height: caseH,
    transform: `translate(-50%, -50%) scale(${scale}) rotateX(${orbit.rot.x}deg) rotateY(${orbit.rot.y}deg)`,
  } as CSSProperties;

  return (
    <>
      <TopBar title={b.title} />
      <main className="books-page">
        <section className="books-hero">
          <p className="eyebrow">{b.eyebrow}</p>
          <h1>{b.heading}</h1>
          <p className="lede">{view === '3d' ? b.intro3d : b.intro}</p>
          <p className="books-summary">{b.summary(books.length, totalPages)}</p>
        </section>

        <div className="map-toolbar">
          <ViewSwitch view={view} onChange={chooseView} />
        </div>

        {view === '2d' ? (
          <section className="shelf2d" aria-label={b.shelfLabel}>
            <ul>
              {books.map((book) => {
                const isOpen = book.id === open;
                return (
                  <li key={book.id}>
                    <button
                      type="button"
                      className={`cover2d${isOpen ? ' is-open' : ''}`}
                      style={{ '--bh': book.height, '--color': book.color, '--ink': book.ink } as CSSProperties}
                      aria-label={b.open(book.title, book.author)}
                      aria-pressed={isOpen}
                      onClick={() => setOpen(isOpen ? null : book.id)}
                    >
                      <Cover book={book} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <section className="shelf-card" aria-label={b.shelfLabel}>
            <div
              ref={stage}
              className={`shelf-stage${orbit.dragging ? ' is-dragging' : ''}`}
              style={{ height: Math.max(380, caseH * scale + 230) }}
              {...orbit.handlers}
            >
              <div className="shelf-scene" style={sceneStyle}>
                <Box className="wood" x={0} y={0} w={caseW} h={WOOD} d={caseD} />
                <Box className="wood" x={0} y={0} w={WOOD} h={caseH} d={caseD} />
                <Box className="wood" x={caseW - WOOD} y={0} w={WOOD} h={caseH} d={caseD} />
                <Box className="wood back" x={WOOD} y={WOOD} w={caseW - WOOD * 2} h={caseH - WOOD} d={4} z={-caseD / 2 + 2} />
                {floors.map((y) => <Box key={y} className="wood" x={WOOD} y={y} w={caseW - WOOD * 2} h={WOOD} d={caseD} />)}

                {placed.map(({ book, x, y, t: th, d }) => {
                  const isOpen = book.id === open;
                  return (
                    <button
                      key={book.id}
                      type="button"
                      className={`book3d${isOpen ? ' is-open' : ''}`}
                      style={{ ...bookVars(book, th, d), left: x, top: y, width: th, height: book.height, '--z': `${front - d / 2}px` } as CSSProperties}
                      aria-label={b.open(book.title, book.author)}
                      aria-pressed={isOpen}
                      onClick={() => setOpen(isOpen ? null : book.id)}
                    >
                      <BookFaces book={book} />
                    </button>
                  );
                })}
              </div>
            </div>
            <OrbitControls onNudge={orbit.nudge} onReset={orbit.reset} />
          </section>
        )}

        <section className="book-detail" aria-live="polite">
          {selected ? (
            <>
              <div className="book-detail-art" aria-hidden="true">
                <div className="book3d static" style={{ ...bookVars(selected, thickness(selected), depth(selected)), width: thickness(selected), height: selected.height }}>
                  <BookFaces book={selected} />
                </div>
              </div>
              <div className="book-detail-text">
                <h2>{selected.title}</h2>
                <dl className="book-facts">
                  <div><dt>{b.author}</dt><dd>{selected.author}</dd></div>
                  <div><dt>{b.year}</dt><dd>{selected.year}</dd></div>
                  <div><dt>{b.pages}</dt><dd>{selected.pages}</dd></div>
                </dl>
                <p>{selected.blurb}</p>
                <button type="button" className="book-putback" onClick={() => setOpen(null)}>{b.putBack}</button>
              </div>
            </>
          ) : (
            <p className="book-pick">{b.pick}</p>
          )}
        </section>
      </main>
    </>
  );
}
