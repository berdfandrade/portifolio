import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';

interface Track { name: string; artists: string; album: string; image: string | null; url: string }

/** Músicas mais ouvidas no Spotify, vindas do server.js. Se a rota não responder, o cartão não aparece. */
export default function TopTracks({ className = '', ...rest }: { className?: string; 'data-panel'?: string }) {
  const { t } = useI18n();
  const a = t.about;
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/top-tracks', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { tracks: Track[] }) => (data.tracks.length ? setTracks(data.tracks) : setFailed(true)))
      .catch((err) => err.name !== 'AbortError' && setFailed(true));
    return () => controller.abort();
  }, []);

  if (failed) return null;

  return (
    <section className={`card music ${className}`} aria-labelledby="music-title" aria-busy={!tracks} {...rest}>
      <div className="music-head">
        <div>
          <p className="eyebrow music-brand">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1ED760" /><path d="M6.5 9.3c3.8-1.1 8-.8 11.2 1M7.2 12.4c3.1-.9 6.6-.6 9.3 1M7.8 15.3c2.5-.7 5.2-.5 7.4.8" fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round" /></svg>
            Spotify
          </p>
          <h2 id="music-title">{a.musicTitle}</h2>
          <p className="music-sub">{a.musicSub}</p>
        </div>
      </div>

      <ol className="top-tracks">
        {tracks
          ? tracks.map((track, i) => (
              <li key={track.url}>
                <a href={track.url} target="_blank" rel="noreferrer" aria-label={a.trackLabel(i + 1, track.name, track.artists)}>
                  <span className="track-rank" aria-hidden="true">{i + 1}</span>
                  {track.image ? <img src={track.image} width={48} height={48} alt="" loading="lazy" /> : <span className="track-art" />}
                  <span className="track-text" aria-hidden="true">
                    <span className="track-name">{track.name}</span>
                    <span className="track-artist">{track.artists}</span>
                  </span>
                </a>
              </li>
            ))
          : Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="skeleton" aria-hidden="true">
                <span className="track-rank">{i + 1}</span><span className="track-art" />
                <span className="track-text"><span className="bar long" /><span className="bar" /></span>
              </li>
            ))}
      </ol>
    </section>
  );
}
