import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';

interface Film { title: string; year: string; rating: number | null; liked: boolean; rewatch: boolean; watched: string; poster: string | null; url: string }

const stars = (rating: number) => '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '');

/** Últimos filmes do diário no Letterboxd, vindos do server.js. Se a rota não responder, o cartão não aparece. */
export default function RecentFilms() {
  const { t } = useI18n();
  const a = t.about;
  const [data, setData] = useState<{ profile: string; films: Film[] } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/letterboxd', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((body: { profile: string; films: Film[] }) => (body.films.length ? setData(body) : setFailed(true)))
      .catch((err) => err.name !== 'AbortError' && setFailed(true));
    return () => controller.abort();
  }, []);

  if (failed) return null;

  return (
    <section className="card music films" aria-labelledby="films-title" aria-busy={!data}>
      <div className="music-head">
        <div>
          <p className="eyebrow music-brand">
            <svg aria-hidden="true" width="22" height="10" viewBox="0 0 44 20"><circle cx="8" cy="10" r="8" fill="#FF8000" /><circle cx="22" cy="10" r="8" fill="#00E054" opacity=".9" /><circle cx="36" cy="10" r="8" fill="#40BCF4" opacity=".9" /></svg>
            Letterboxd
          </p>
          <h2 id="films-title">{a.filmsTitle}</h2>
          <p className="music-sub">{a.filmsSub}</p>
        </div>
        {data && <a className="films-profile" href={data.profile} target="_blank" rel="noreferrer">{a.filmsProfile} ›</a>}
      </div>

      <ol className="film-row">
        {data
          ? data.films.map((film) => (
              <li key={film.url + film.watched}>
                <a href={film.url} target="_blank" rel="noreferrer" aria-label={a.filmLabel(film.title, film.year, film.rating, film.liked)}>
                  {film.poster ? <img src={film.poster} width={230} height={345} alt="" loading="lazy" /> : <span className="film-poster" />}
                  <span className="film-meta" aria-hidden="true">
                    <span className="film-stars">{film.rating ? stars(film.rating) : ''}</span>
                    {film.liked && <span className="film-like">♥</span>}
                    {film.rewatch && <span className="film-rewatch">↻</span>}
                  </span>
                </a>
              </li>
            ))
          : Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="skeleton" aria-hidden="true"><span className="film-poster" /></li>
            ))}
      </ol>
    </section>
  );
}
