import { Link, useMatches, useParams } from 'react-router';
import { pathTo, useI18n, type Page } from '../i18n';

/** Leva para a mesma página no outro idioma (ou para a Biblioteca, se não houver equivalente). */
export default function LangSwitch() {
  const { lang, t } = useI18n();
  const { slug } = useParams();
  const page = useMatches()
    .map((m) => (m.handle as { page?: Page } | undefined)?.page)
    .filter(Boolean)
    .pop();
  const other = lang === 'pt' ? 'en' : 'pt';
  const to = page ? pathTo(other, page, page === 'project' ? slug : undefined) : pathTo(other, 'library');

  return (
    <Link to={to} className="lang-switch" hrefLang={other === 'en' ? 'en' : 'pt-BR'} lang={other === 'en' ? 'en' : 'pt-BR'} aria-label={t.common.switchLangLabel}>
      {t.common.switchLang}
    </Link>
  );
}
