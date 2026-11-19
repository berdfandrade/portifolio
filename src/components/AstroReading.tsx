import { useI18n } from '../i18n';
import { PLANET_GLYPHS, SIGN_GLYPHS, type Body, type Sign } from '../data/astro';
import { READING, type GlyphKey } from '../data/astro-reading';
import { READING_EN } from '../data/astro-reading.en';
import Reading from './Reading';

// Elemento de cada signo, para a cor do selo (fogo, terra, ar, água).
const ELEMENT: Record<Sign, 'fire' | 'earth' | 'air' | 'water'> = {
  aries: 'fire', leo: 'fire', sagittarius: 'fire',
  taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air',
  cancer: 'water', scorpio: 'water', pisces: 'water',
};
const EXTRA: Record<string, string> = { conjunction: '☌︎', sextile: '✶', trine: '△', mc: 'MC', asc: 'AC' };

/** Selo redondo com o símbolo de um signo, planeta ou aspecto. */
function Glyph({ k, size }: { k: GlyphKey; size: 'sm' | 'lg' }) {
  const sign = k in SIGN_GLYPHS ? (k as Sign) : null;
  const text = sign ? SIGN_GLYPHS[sign] : k in PLANET_GLYPHS ? PLANET_GLYPHS[k as Body] : EXTRA[k];
  const kind = sign ? `el-${ELEMENT[sign]}` : k === 'mc' || k === 'asc' ? 'is-text' : 'is-planet';
  return <span className={`glyph-badge ${size} ${kind}`} aria-hidden="true">{text}</span>;
}

/** Leitura extensa do mapa astral (aba Astral). */
export default function AstroReading() {
  const { lang } = useI18n();
  return <Reading id="reading" reading={lang === 'en' ? READING_EN : READING} glyph={(k, size) => <Glyph k={k} size={size} />} />;
}
