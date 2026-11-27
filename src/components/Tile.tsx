import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { coverChars, type Project } from '../data/projects';
import { useI18n } from '../i18n';

/** Capa de "álbum" de um projeto. Leva à página do projeto quando ela existe. */
export default function Tile({ project: p, compact = false }: { project: Project; compact?: boolean }) {
  const { t, to } = useI18n();
  const title = compact ? p.title : p.coverTitle;
  const coverStyle = { background: p.bg, color: p.fg, '--chars': coverChars(title) } as CSSProperties;
  const content = (
    <>
      <div className="cover" style={coverStyle}>
        {!compact && <span className="cover-kind">{t.kinds[p.kind]}</span>}
        <span className="cover-title">{title}</span>
      </div>
      <div className="tile-meta">
        <span className="tile-title">{p.title}</span>
        {!compact && <span className="tile-sub">{p.meta}</span>}
      </div>
    </>
  );

  return p.page ? (
    <Link className="tile" to={to('project', p.slug)}>{content}</Link>
  ) : (
    <div className="tile">{content}</div>
  );
}
