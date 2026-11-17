import { useI18n } from '../i18n';
import { CHART, PLANET_GLYPHS, SIGNS, SIGN_GLYPHS, longitude, type Body } from '../data/astro';

// Geometria (viewBox centrado em 160,160): anel dos signos entre 104 e 150, planetas entre 62 e 104.
const C = 160;
const R = { outer: 150, signs: 104, center: 62, glyph: 83, tick: 98, leader: 91, label: 166 };
const GLYPH_PX = 15;

const ASC = longitude(CHART.asc);
const MC = longitude(CHART.mc);
const SUN_SIGN = CHART.sun.sign;

// Ascendente à esquerda e o zodíaco correndo no sentido anti-horário, como num mapa astral comum.
const angle = (lon: number) => ((180 + lon - ASC) * Math.PI) / 180;
const pt = (r: number, lon: number) => ({ x: C + r * Math.cos(angle(lon)), y: C - r * Math.sin(angle(lon)) });
const f = (n: number) => n.toFixed(1);

/** Afasta planetas muito próximos ao longo do anel, mantendo a ordem (como nos mapas impressos). */
function spread(lons: number[], minSep: number) {
  const pos = [...lons];
  for (let iter = 0; iter < 200; iter++) {
    let moved = false;
    for (let i = 0; i < pos.length; i++) {
      const j = (i + 1) % pos.length;
      const gap = pos[j] - pos[i] + (j === 0 ? 360 : 0);
      if (gap < minSep - 0.01) {
        const push = (minSep - gap) / 2;
        pos[i] -= push;
        pos[j] += push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return pos;
}

const BODIES = (Object.keys(PLANET_GLYPHS) as Body[])
  .map((id) => ({ id, lon: longitude(CHART[id]), retrograde: !!CHART[id].retrograde }))
  .sort((a, b) => a.lon - b.lon);
const SHOWN = spread(BODIES.map((b) => b.lon), (GLYPH_PX / (R.glyph * Math.PI)) * 180);
const PLANETS = BODIES.map((b, i) => ({ ...b, shown: SHOWN[i] }));

/** Arco do anel dos signos entre duas longitudes (o setor do signo solar fica destacado). */
function sector(from: number, to: number) {
  const a = pt(R.outer, from), b = pt(R.outer, to), c = pt(R.signs, to), d = pt(R.signs, from);
  return `M${f(a.x)} ${f(a.y)} A${R.outer} ${R.outer} 0 0 0 ${f(b.x)} ${f(b.y)} L${f(c.x)} ${f(c.y)} A${R.signs} ${R.signs} 0 0 1 ${f(d.x)} ${f(d.y)} Z`;
}

function Line({ r1, r2, lon, lon2 = lon }: { r1: number; r2: number; lon: number; lon2?: number }) {
  const a = pt(r1, lon), b = pt(r2, lon2);
  return <line x1={f(a.x)} y1={f(a.y)} x2={f(b.x)} y2={f(b.y)} />;
}

export default function BirthChart() {
  const { t } = useI18n();
  const a = t.about;
  const sunIndex = SIGNS.indexOf(SUN_SIGN);
  const label = (point: 'asc' | 'mc', text: string) => {
    const p = pt(R.label, longitude(CHART[point]));
    return <text x={f(p.x)} y={f(p.y)} className="axis-label">{text}</text>;
  };

  return (
    <svg role="img" aria-label={a.chartLabel} viewBox="-24 -24 368 368">
      <circle cx={C} cy={C} r={R.outer} style={{ fill: 'var(--card)', stroke: 'var(--sep)' }} strokeWidth="1.5" />
      <path d={sector(sunIndex * 30, sunIndex * 30 + 30)} style={{ fill: 'var(--sand)' }} />

      {/* Divisões dos signos: forte no anel externo, suave na faixa interna */}
      <g style={{ stroke: 'var(--sep)' }} strokeWidth="1">
        {SIGNS.map((s, i) => <Line key={s} r1={R.signs} r2={R.outer} lon={i * 30} />)}
      </g>
      <g style={{ stroke: 'var(--sep2)' }} strokeWidth="1">
        {SIGNS.map((s, i) => <Line key={s} r1={R.center} r2={R.signs} lon={i * 30} />)}
      </g>
      <g className="glyph" textAnchor="middle" dominantBaseline="central">
        {SIGNS.map((s, i) => {
          const p = pt((R.outer + R.signs) / 2, i * 30 + 15);
          return (
            <text key={s} x={f(p.x)} y={f(p.y)} style={s === SUN_SIGN ? { fill: 'var(--sand-ink)' } : undefined}>
              {SIGN_GLYPHS[s]}
            </text>
          );
        })}
      </g>
      <circle cx={C} cy={C} r={R.signs} style={{ fill: 'none', stroke: 'var(--sep)' }} strokeWidth="1.5" />
      <circle cx={C} cy={C} r={R.center} style={{ fill: 'var(--bg)', stroke: 'var(--sep)' }} strokeWidth="1" />

      {/* Eixos: Ascendente–Descendente e Meio do Céu–Fundo do Céu */}
      <g className="axis">
        {[ASC, ASC + 180, MC, MC + 180].map((lon) => <Line key={lon} r1={R.center} r2={R.signs} lon={lon} />)}
        <Line r1={R.outer} r2={R.outer + 8} lon={ASC} />
        <Line r1={R.outer} r2={R.outer + 8} lon={MC} />
      </g>
      {label('asc', 'AC')}
      {label('mc', 'MC')}

      {/* Planetas: marca no grau exato, linha guia quando o símbolo precisou ser afastado */}
      <g className="planet-ticks">
        {PLANETS.map((p) => (
          <g key={p.id}>
            <Line r1={R.signs} r2={R.tick} lon={p.lon} />
            {Math.abs(p.shown - p.lon) > 0.5 && <Line r1={R.tick} r2={R.leader} lon={p.lon} lon2={p.shown} />}
          </g>
        ))}
      </g>
      {PLANETS.map((p) => {
        const g = pt(R.glyph, p.shown);
        return (
          <g key={p.id}>
            {p.id === 'sun' && <circle cx={f(g.x)} cy={f(g.y)} r="10" style={{ fill: '#FF9F0A' }} />}
            <text x={f(g.x)} y={f(g.y)} className={`planet ${p.id}`}>
              {PLANET_GLYPHS[p.id]}
              {p.retrograde && <tspan className="retro" dx="1" dy="4">R</tspan>}
            </text>
          </g>
        );
      })}

      <text x={C} y="152" textAnchor="middle" style={{ fill: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{a.sunIn}</text>
      <text x={C} y="172" textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 15, fontWeight: 700 }}>{a.signs[SUN_SIGN]}</text>
    </svg>
  );
}
