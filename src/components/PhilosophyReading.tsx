import { useI18n } from '../i18n';
import { PHILOSOPHY, type PhiloIcon } from '../data/philosophy';
import { PHILOSOPHY_EN } from '../data/philosophy.en';
import Reading from './Reading';

type Tone = 'red' | 'violet' | 'blue' | 'orange' | 'gray';

// Cada ícone é um traço SVG (viewBox 24) ou um caractere, com o tom do selo:
// vermelho para política, violeta para consciência, azul para engenharia, laranja para arte.
const ICONS: Record<PhiloIcon, { tone: Tone; path?: string; text?: string }> = {
  'hammer-sickle': { tone: 'red', text: '☭' },
  star: { tone: 'red', path: 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.8 6.7 19.4l1.2-6-4.5-4.1 6-.7z' },
  class: { tone: 'red', path: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M21 20c0-2.6-1.6-4.8-4-5.6' },
  consciousness: { tone: 'violet', path: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  heart: { tone: 'violet', path: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z' },
  quantum: { tone: 'violet', path: 'M3 12c0-2 4-4 9-4s9 2 9 4-4 4-9 4-9-2-9-4zM7.5 4.2c1.7-1 5.3 1.4 7.8 5.8s3 8.7 1.2 9.8-5.3-1.4-7.8-5.8-3-8.7-1.2-9.8z' },
  engineering: { tone: 'blue', path: 'M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1' },
  art: { tone: 'orange', path: 'M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A4.7 4.7 0 0 0 22 9.7C22 5.9 17.5 3 12 3zM7.5 12h.01M10 7.5h.01M15 7.5h.01' },
  davinci: { tone: 'orange', path: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.5 5.5h13v13h-13zM12 7v8M8 10h8M12 15l-3 4M12 15l3 4' },
  bowie: { tone: 'orange', path: 'M13 2L4 14h7l-1 8 9-12h-7z' },
  glauber: { tone: 'orange', path: 'M3 9h18v11H3zM3 9l2.5-5h4L7 9M10.5 9L13 4h4l-2.5 5' },
  torvalds: { tone: 'blue', path: 'M3 4h18v16H3zM7 9l3 3-3 3M12 15h5' },
  wrench: { tone: 'blue', path: 'M15 4a5 5 0 0 0-4.6 6.9L3 18.3 5.7 21l7.4-7.4A5 5 0 0 0 20 9l-3 1-2-2 1-3z' },
  blueprint: { tone: 'blue', path: 'M4 20l1-4L16 5l3 3L8 19zM14 7l3 3' },
  disciplines: { tone: 'gray', path: 'M9 7a5 5 0 1 0 0 10A5 5 0 0 0 9 7zM15 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z' },
  balance: { tone: 'gray', path: 'M12 4v16M8 20h8M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z' },
  question: { tone: 'gray', path: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4V14M12 17h.01' },
};

function Icon({ k, size }: { k: PhiloIcon; size: 'sm' | 'lg' }) {
  const icon = ICONS[k];
  const px = size === 'lg' ? 26 : 17;
  return (
    <span className={`glyph-badge ${size} tone-${icon.tone}`} aria-hidden="true">
      {icon.text ?? (
        <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={icon.path} /></svg>
      )}
    </span>
  );
}

/** Leitura das filosofias do Bernardo (aba Humor), no mesmo formato da leitura do mapa astral. */
export default function PhilosophyReading() {
  const { lang } = useI18n();
  return <Reading id="filosofia" reading={lang === 'en' ? PHILOSOPHY_EN : PHILOSOPHY} glyph={(k, size) => <Icon k={k} size={size} />} />;
}
