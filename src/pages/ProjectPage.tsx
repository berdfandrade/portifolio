import { useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import TopBar from '../components/TopBar';
import Tile from '../components/Tile';
import Lightbox from '../components/Lightbox';
import { usePageTitle } from '../components/Layout';
import type { Shot } from '../data/projects';
import { useI18n } from '../i18n';
import NotFound from './NotFound';

const isExternal = (href: string) => /^https?:/.test(href);

export default function ProjectPage() {
  const { slug } = useParams();
  const { findProject } = useI18n();
  const project = findProject(slug);
  if (!project?.page) return <NotFound />;
  // `key` reinicia o estado (visualizador aberto) ao trocar de projeto pelo "Mais na biblioteca".
  return <ProjectView key={project.slug} slug={project.slug} />;
}

function ProjectView({ slug }: { slug: string }) {
  const { t, to, projects, findProject } = useI18n();
  const p = findProject(slug)!;
  const d = p.page!;
  usePageTitle(p.title);
  const [open, setOpen] = useState<number | null>(null);

  // A vitrine (quando é imagem), a galeria e as telas de celular abrem no mesmo visualizador.
  const shots: Shot[] = [
    ...(d.showcase?.src ? [{ src: d.showcase.src, alt: d.showcase.alt, caption: d.showcase.caption }] : []),
    ...(d.gallery ?? []),
    ...(d.phones ?? []),
  ];
  const galleryOffset = d.showcase?.src ? 1 : 0;
  const phonesOffset = galleryOffset + (d.gallery?.length ?? 0);

  const vars = {
    '--project-bg': p.bg,
    '--project-fg': p.fg,
    '--project-accent': p.accent ?? p.fg,
  } as CSSProperties;

  const more = projects.filter((x) => x.page && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <TopBar title="Bernardo" contact />
      <main className="project" style={vars}>
        <div className="project-hero">
          <div className="project-cover" aria-hidden="true">
            <span className="kind">{t.kinds[p.kind]}</span>
            <span className="name">{p.coverTitle}</span>
          </div>
          <div className="project-intro">
            <p className="eyebrow">{d.eyebrow}</p>
            <h1>{p.title}</h1>
            <p className="lede">{d.lede}</p>
            <div className="btns">
              {d.links.map((l, i) => (
                <a
                  key={l.label}
                  className={i === 0 ? 'btn' : 'btn secondary'}
                  href={l.href}
                  {...(isExternal(l.href) ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {d.description && (
          <section aria-labelledby="description-title">
            <h2 className="section-title" id="description-title">{d.description.title}</h2>
            <p>{d.description.body}</p>
          </section>
        )}

        {d.showcase && (
          <figure className="showcase">
            <div className="showcase-frame">
              {d.showcase.video ? (
                <video src={d.showcase.video} poster={d.showcase.poster} controls preload="none" playsInline aria-label={d.showcase.alt} />
              ) : (
                <ShotButton shot={shots[0]} eager onOpen={() => setOpen(0)} />
              )}
            </div>
            <figcaption>{d.showcase.caption}</figcaption>
          </figure>
        )}

        <section aria-label={t.project.factSheet}>
          <dl className="facts">
            {d.facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </section>

        {d.highlights && (
          <section aria-labelledby="highlights-title">
            <h2 className="section-title" id="highlights-title">{t.project.highlights}</h2>
            <ul className="highlights">
              {d.highlights.map(([t, body]) => (
                <li key={t} className="highlight">
                  <h3>{t}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {d.chapters && (
          <section aria-labelledby="chapters-title" className="tight">
            <h2 className="section-title" id="chapters-title">{t.project.chapters}</h2>
            <div className="chapters">
              {d.chapters.map(([t, body, palette], i) => (
                <details key={t} className="chapter" name="capitulo" open={i === 0}>
                  <summary>
                    <span className="n">{i + 1}</span>
                    <span className="title">{t}</span>
                    <span className="sign" aria-hidden="true" />
                  </summary>
                  <p>{body}</p>
                  {palette && (
                    <ul className="palette">
                      {palette.map(([name, hex]) => (
                        <li key={hex}>
                          <span className="swatch" style={{ background: hex }} aria-hidden="true" />
                          <span className="swatch-name">{name}</span>
                          <code>{hex}</code>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </section>
        )}

        {d.code && (
          <section aria-labelledby="code-title">
            <h2 className="section-title" id="code-title">{d.code.title}</h2>
            <div className="code-panel">
              <p className="code-file">{d.code.file}</p>
              <pre tabIndex={0}><code>{d.code.body}</code></pre>
            </div>
          </section>
        )}

        {d.phones && (
          <section aria-labelledby="phones-title">
            <h2 className="section-title" id="phones-title">{t.project.screens}</h2>
            <div className="phones" tabIndex={0} aria-label={t.project.phonesLabel}>
              {d.phones.map((s, i) => (
                <figure key={s.src} className="phone">
                  <ShotButton shot={s} onOpen={() => setOpen(phonesOffset + i)} />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {d.gallery && (
          <section aria-labelledby="gallery-title">
            <h2 className="section-title" id="gallery-title">{t.project.screens}</h2>
            <div className="gallery">
              {d.gallery.map((g, i) => (
                <figure key={g.src} className="shot">
                  <ShotButton shot={g} onOpen={() => setOpen(galleryOffset + i)} />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="more-title">
          <div className="section-head">
            <h2 className="section-title" id="more-title">{t.project.more}</h2>
            <Link to={to('library')} className="see-all">{t.project.seeAll}</Link>
          </div>
          <div className="more">
            {more.map((x) => (
              <Tile key={x.slug} project={x} compact />
            ))}
          </div>
        </section>
      </main>
      <Lightbox shots={shots} index={open} onChange={setOpen} />
    </>
  );
}

function ShotButton({ shot, eager = false, onOpen }: { shot: Shot; eager?: boolean; onOpen: () => void }) {
  const { t } = useI18n();
  return (
    <button type="button" className="shot-btn" aria-label={`${t.project.enlarge}: ${shot.caption || shot.alt}`} onClick={onOpen}>
      <img
        src={shot.src}
        alt={shot.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={shot.pixelated ? 'pixelated' : undefined}
      />
    </button>
  );
}
