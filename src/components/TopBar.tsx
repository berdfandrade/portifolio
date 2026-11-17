import { Link } from 'react-router';
import ThemeToggle from './ThemeToggle';

/** Cabeçalho das páginas internas: voltar, título e tema. */
export default function TopBar({ title, contact = false }: { title: string; contact?: boolean }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="back">‹ Biblioteca</Link>
        <span className="brand">{title}</span>
        <div className="topbar-actions">
          {contact && <a href="#" className="topbar-link">Contato</a>}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
