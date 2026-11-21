import { useState, useSyncExternalStore } from 'react';
import { useI18n } from '../i18n';

export type View = '2d' | '3d';

/** Abaixo desta largura só existe a visualização 2D: o 3D fica pequeno demais para usar com o dedo. */
const NARROW = '(max-width: 720px)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(NARROW);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function useNarrow() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(NARROW).matches, () => false);
}

/**
 * Visualização 2D/3D guardada neste navegador com `key` (se o armazenamento estiver disponível). Começa em 2D.
 * Em telas estreitas devolve sempre 2D, sem apagar a escolha salva para quando a tela for larga de novo.
 */
export function useSavedView(key: string) {
  const narrow = useNarrow();
  const [view, setView] = useState<View>(() => {
    try {
      return localStorage.getItem(key) === '3d' ? '3d' : '2d';
    } catch {
      return '2d';
    }
  });
  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(key, v);
    } catch {
      /* sem armazenamento: a escolha vale só nesta visita */
    }
  };
  return [narrow ? '2d' : view, choose] as const;
}

/** Controle segmentado 2D | 3D. Some em telas estreitas, onde só há 2D. */
export function ViewSwitch({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const c = useI18n().t.common;
  if (useNarrow()) return null;
  return (
    <div className="view-switch" role="group" aria-label={c.viewLabel}>
      {(['2d', '3d'] as const).map((v) => (
        <button key={v} type="button" aria-pressed={view === v} onClick={() => onChange(v)}>
          {v === '2d' ? '2D' : '3D'}
        </button>
      ))}
    </div>
  );
}
