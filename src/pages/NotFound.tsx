import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t, to } = useI18n();
  usePageTitle(t.notFound.title);
  return (
    <>
      <TopBar title="Bernardo" />
      <main className="project not-found">
        <h1>{t.notFound.heading}</h1>
        <p className="lede">{t.notFound.text}</p>
        <div className="btns">
          <Link className="btn" to={to('library')}>{t.notFound.back}</Link>
        </div>
      </main>
    </>
  );
}
