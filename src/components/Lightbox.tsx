import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import type { Shot } from '../data/projects';
import { useI18n } from '../i18n';

interface Props {
  shots: Shot[];
  /** Imagem aberta, ou null quando o visualizador está fechado. */
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Visualizador de imagens em tela cheia, usando o <dialog> nativo (Esc fecha). */
export default function Lightbox({ shots, index, onChange }: Props) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);
  const multi = shots.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const step = (delta: number) => {
    if (index !== null) onChange((index + delta + shots.length) % shots.length);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!multi) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  // Clicar fora da imagem (no fundo do dialog) fecha.
  const onClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onChange(null);
  };

  const shot = index !== null ? shots[index] : null;

  return (
    <dialog ref={ref} className="lightbox" aria-label={t.lightbox.label} onClose={() => onChange(null)} onKeyDown={onKeyDown} onClick={onClick}>
      {shot && (
        <figure>
          <img src={shot.src} alt={shot.alt} className={shot.pixelated ? 'pixelated' : undefined} />
          <figcaption>{shot.caption}</figcaption>
        </figure>
      )}
      <button type="button" className="lb-btn lb-close" aria-label={t.lightbox.close} onClick={() => onChange(null)}>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {multi && (
        <>
          <button type="button" className="lb-btn lb-prev" aria-label={t.lightbox.prev} onClick={() => step(-1)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="lb-btn lb-next" aria-label={t.lightbox.next} onClick={() => step(1)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}
    </dialog>
  );
}
