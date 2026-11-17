import { Link } from 'react-router';
import ThemeToggle from './ThemeToggle';
import LangSwitch from './LangSwitch';
import { useI18n } from '../i18n';

/** Cabeçalho das páginas internas: voltar, título, idioma e tema. */
export default function TopBar({ title, contact = false }: { title: string; contact?: boolean }) {
  const { t, to } = useI18n();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to={to('library')} className="back">{t.common.back}</Link>
        <span className="brand">{title}</span>
        <div className="topbar-actions">
          {contact && <Link to={to('contact')} className="topbar-link">{t.common.contact}</Link>}
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
