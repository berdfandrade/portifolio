import { useState } from 'react';
import { Link } from 'react-router';
import ThemeToggle from '../components/ThemeToggle';
import Tile from '../components/Tile';
import { usePageTitle } from '../components/Layout';
import { CATEGORIES, PROJECTS } from '../data/projects';

type Filter = (typeof CATEGORIES)[number]['id'];

const normalize = (s: string) => s.toLocaleLowerCase('pt-BR');
const countOf = (id: Filter) => (id === 'Tudo' ? PROJECTS.length : PROJECTS.filter((p) => p.kind === id).length);

export default function Library() {
  usePageTitle('Biblioteca');
  const [filter, setFilter] = useState<Filter>('Tudo');
  const [query, setQuery] = useState('');

  const q = normalize(query.trim());
  const shown = PROJECTS.filter(
    (p) =>
      (filter === 'Tudo' || p.kind === filter) &&
      (!q || normalize([p.title, p.kind, p.meta, p.stack].join(' ')).includes(q)),
  );
  const heading = CATEGORIES.find((c) => c.id === filter)!.heading;

  return (
    <>
      <header className="topbar sticky">
        <div className="topbar-inner">
          <Link to="/" className="brand">Bernardo</Link>
          <nav className="lib-nav" aria-label="Principal">
            <Link to="/" aria-current="page">Biblioteca</Link>
            <Link to="/skill-tree">Skill Tree</Link>
            <Link to="/sobre">Sobre</Link>
            <a href="#">Contato</a>
          </nav>
          <label className="search">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <span className="sr-only">Buscar na biblioteca</span>
            <input type="search" placeholder="Buscar" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <ThemeToggle />
        </div>
      </header>

      <div className="lib">
        <aside className="lib-aside">
          <div className="cats" role="group" aria-labelledby="cats-label">
            <p className="eyebrow" id="cats-label">Biblioteca</p>
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className="cat" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
                <span>{c.label}</span>
                <span className="count">{countOf(c.id)}</span>
              </button>
            ))}
          </div>
          <div className="profile">
            <div className="profile-badge" aria-hidden="true">B</div>
            <p className="profile-name">Bernardo</p>
            <p className="profile-bio">Desenvolvedor. Construo apps, automações e páginas web — e guardo tudo aqui.</p>
            <a href="#">Instagram ›</a>
          </div>
        </aside>

        <main className="lib-main">
          <div>
            <h1 className="page-title">Biblioteca</h1>
            <p className="page-sub">{PROJECTS.length} projetos · apps, desktop, sistemas, web e automações</p>
          </div>

          <section className="feature" aria-labelledby="destaque">
            <div className="feature-art" aria-hidden="true">
              <span className="kind">App</span>
              <span className="name">Verdant</span>
            </div>
            <div className="feature-body">
              <p className="eyebrow" id="destaque">Em destaque</p>
              <h2>Verdant</h2>
              <p>Aplicativo autoral, da identidade visual ao design de interface no Figma. App de relacionamentos com feed por proximidade, matches e chat em tempo real.</p>
              <div className="chips">
                {['Figma', 'React Native', 'NestJS', 'Em andamento'].map((t) => (
                  <span key={t} className="chip sm">{t}</span>
                ))}
              </div>
              <div className="btns">
                <Link className="btn" to="/projeto/verdant">Ver projeto</Link>
                <a href="#">Abrir no Figma ›</a>
              </div>
            </div>
          </section>

          <section className="lib-section" aria-labelledby="todos">
            <div className="section-head">
              <h2 className="section-title" id="todos" aria-live="polite">{heading}</h2>
              <span className="sort-note">Ordenado por recentes</span>
            </div>
            <div className="grid">
              {shown.length === 0 && <p className="empty">Nenhum projeto encontrado.</p>}
              {shown.map((p) => (
                <Tile key={p.slug} project={p} />
              ))}
              <div className="tile placeholder">
                <div className="cover" aria-hidden="true">+</div>
                <div className="tile-meta">
                  <span className="tile-title">Próximo projeto</span>
                  <span className="tile-sub">Em breve</span>
                </div>
              </div>
            </div>
          </section>

          <section className="lib-section" aria-labelledby="lista">
            <h2 className="section-title" id="lista">Todas as faixas</h2>
            <div className="tracks">
              <table>
                <thead className="sr-only">
                  <tr><th>#</th><th>Projeto</th><th>Tipo</th><th>Stack</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr key={p.slug}>
                      <td className="n">{i + 1}</td>
                      <td className="t">{p.page ? <Link to={`/projeto/${p.slug}`}>{p.title}</Link> : p.title}</td>
                      <td className="k">{p.kind}</td>
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
