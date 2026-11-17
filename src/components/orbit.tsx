import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type RefObject } from 'react';
import { useI18n } from '../i18n';

export interface Rotation { x: number; y: number }

interface OrbitOptions {
  initial: Rotation;
  /** Limites em graus de cada eixo. */
  limits: { x: [number, number]; y: [number, number] };
  /** Graus por pixel arrastado (o sinal define o sentido): vertical → x, horizontal → y. */
  speed: { x: number; y: number };
}

const clamp = (v: number, [min, max]: [number, number]) => Math.min(max, Math.max(min, v));

/**
 * Girar uma cena 3D arrastando com o mouse ou o dedo. Um arraste curto conta como clique;
 * um arraste de verdade não dispara o clique no livro ou bloco em que terminou.
 */
export function useOrbit({ initial, limits, speed }: OrbitOptions) {
  const [rot, setRot] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; x: number; y: number; start: Rotation; moved: boolean } | null>(null);
  const swallowClick = useRef(false);

  const set = (x: number, y: number) => setRot({ x: clamp(x, limits.x), y: clamp(y, limits.y) });

  const onPointerDown = (e: PointerEvent) => {
    swallowClick.current = false;
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, start: rot, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 6) return;
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    set(d.start.x + dy * speed.x, d.start.y + dx * speed.y);
  };
  const onPointerEnd = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.moved) {
      swallowClick.current = true;
      setDragging(false);
    }
  };
  const onClickCapture = (e: MouseEvent) => {
    if (!swallowClick.current) return;
    swallowClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    rot,
    dragging,
    nudge: (deg: number) => set(rot.x, rot.y + deg),
    reset: () => setRot(initial),
    handlers: { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd, onClickCapture },
  };
}

/** Largura atual de um elemento (para encaixar a cena 3D no espaço disponível). */
export function useWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

/** Botões para girar sem arrastar (teclado e leitores de tela), com a dica de arrastar. */
export function OrbitControls({ onNudge, onReset }: { onNudge: (deg: number) => void; onReset: () => void }) {
  const { t } = useI18n();
  const c = t.common;
  return (
    <div className="orbit-controls">
      <span className="orbit-hint">{c.dragHint}</span>
      <button type="button" aria-label={c.rotateLeft} onClick={() => onNudge(-15)}>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5" /></svg>
      </button>
      <button type="button" className="orbit-reset" onClick={onReset}>{c.resetView}</button>
      <button type="button" aria-label={c.rotateRight} onClick={() => onNudge(15)}>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v5h-5" /></svg>
      </button>
    </div>
  );
}
