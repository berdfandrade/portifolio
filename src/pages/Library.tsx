import { useState } from 'react';
import { Link } from 'react-router';
import ThemeToggle from '../components/ThemeToggle';
import LangSwitch from '../components/LangSwitch';
import Tile from '../components/Tile';
import { usePageTitle } from '../components/Layout';
import { CATEGORIES, type Category } from '../data/projects';
import { useI18n } from '../i18n';

const FIGMA_VERDANT = 'https://www.figma.com/design/zRD5uMolpdYHC71gPsiB6k/Verdant';

export default function Library() {
  const { t, to, projects } = useI18n();
  const l = t.library;
  usePageTitle(l.title);
  const [filter, setFilter] = useState<Category>('Tudo');
  const [query, setQuery] = useState('');

  const normalize = (s: string) => s.toLocaleLowerCase(t.locale);
  const q = normalize(query.trim());
  const shown = projects.filter(
    (p) =>
      (filter === 'Tudo' || p.kind === filter) &&
      (!q || normalize([p.title, t.kinds[p.kind], p.meta, p.stack].join(' ')).includes(q)),
  );

  return (
    <>
      <header className="topbar sticky">
        <div className="topbar-inner">
          <Link to={to('library')} className="brand">Bernardo</Link>
          <nav className="lib-nav" aria-label={l.nav.label}>
            <Link to={to('library')} aria-current="page">{l.nav.library}</Link>
            <Link to={to('experience')}>{l.nav.experience}</Link>
            <Link to={to('skills')}>{l.nav.skills}</Link>
            <Link to={to('books')}>{l.nav.books}</Link>
            <Link to={to('about')}>{l.nav.about}</Link>
            <Link to={to('contact')}>{t.common.contact}</Link>
          </nav>
          <label className="search">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <span className="sr-only">{l.searchLabel}</span>
            <input type="search" placeholder={l.searchPlaceholder} autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <div className="topbar-actions">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="lib">
        <aside className="lib-aside">
          <div className="cats" role="group" aria-labelledby="cats-label">
            <p className="eyebrow" id="cats-label">{l.title}</p>
            {CATEGORIES.filter((c) => c === 'Tudo' || projects.some((p) => p.kind === c)).map((c) => (
              <button key={c} type="button" className="cat" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                <span>{t.categories[c].label}</span>
              </button>
            ))}
          </div>
          <div className="profile">
            <div className="profile-badge" aria-hidden="true">B</div>
            <p className="profile-name">Bernardo</p>
            <p className="profile-bio">{l.bio}</p>
            <a href="#">Instagram ›</a>
          </div>
        </aside>

        <main className="lib-main">
          <div>
            <h1 className="page-title">{l.title}</h1>
            <p className="page-sub">{l.subtitle(projects.length)}</p>
          </div>

          <section className="feature" aria-labelledby="destaque">
            <div className="feature-art" aria-hidden="true">
              <span className="kind">App</span>
              <span className="name">Verdant</span>
            </div>
            <div className="feature-body">
              <p className="eyebrow" id="destaque">{l.featured}</p>
              <h2>Verdant</h2>
              <p>{l.featuredText}</p>
              <div className="chips">
                {l.featuredChips.map((chip) => (
                  <span key={chip} className="chip sm">{chip}</span>
                ))}
              </div>
              <div className="btns">
                <Link className="btn" to={to('project', 'verdant')}>{l.viewProject}</Link>
                <a href={FIGMA_VERDANT} target="_blank" rel="noopener">{l.openFigma}</a>
              </div>
            </div>
          </section>

          <section className="lib-section" aria-labelledby="todos">
            <div className="section-head">
              <h2 className="section-title" id="todos" aria-live="polite">{t.categories[filter].heading}</h2>
              <span className="sort-note">{l.sortNote}</span>
            </div>
            <div className="grid">
              {shown.length === 0 && <p className="empty">{l.empty}</p>}
              {shown.map((p) => (
                <Tile key={p.slug} project={p} />
              ))}
            </div>
          </section>

          <section className="lib-section" aria-labelledby="lista">
            <h2 className="section-title" id="lista">{l.tracks}</h2>
            <div className="tracks">
              <table>
                <thead className="sr-only">
                  <tr>{l.columns.map((c) => <th key={c}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={p.slug}>
                      <td className="n">{i + 1}</td>
                      <td className="t">{p.page ? <Link to={to('project', p.slug)}>{p.title}</Link> : p.title}</td>
                      <td className="k">{t.kinds[p.kind]}</td>
                      <td className="s">{p.stack}</td>
                      <td className="st">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
