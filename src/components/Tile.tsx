import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import type { Project } from '../data/projects';

/** Capa de "álbum" de um projeto. Leva à página do projeto quando ela existe. */
export default function Tile({ project: p, compact = false }: { project: Project; compact?: boolean }) {
  const coverStyle: CSSProperties = { background: p.bg, color: p.fg };
  const content = (
    <>
      <div className="cover" style={coverStyle}>
        {!compact && <span className="cover-kind">{p.kind}</span>}
        <span className="cover-title">{compact ? p.title : p.coverTitle}</span>
      </div>
      <div className="tile-meta">
        <span className="tile-title">{p.title}</span>
        {!compact && <span className="tile-sub">{p.meta}</span>}
      </div>
    </>
  );

  return p.page ? (
    <Link className="tile" to={`/projeto/${p.slug}`}>{content}</Link>
  ) : (
    <div className="tile">{content}</div>
  );
}
