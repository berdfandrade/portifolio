import { useState } from 'react';
import { useI18n } from '../i18n';

export type View = '2d' | '3d';

/** Visualização 2D/3D guardada neste navegador com `key` (se o armazenamento estiver disponível). Começa em 2D. */
export function useSavedView(key: string) {
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
  return [view, choose] as const;
}

/** Controle segmentado 2D | 3D. */
export function ViewSwitch({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const c = useI18n().t.common;
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
