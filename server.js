// Servidor de produção: entrega o site gerado em dist/ e a rota /api/top-tracks com as
// músicas mais ouvidas no Spotify. As chaves ficam nas variáveis de ambiente do Railway:
// SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET e SPOTIFY_REFRESH_TOKEN (veja scripts/spotify-auth.js).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('./dist/', import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const CACHE_MS = 60 * 60 * 1000; // o Spotify recalcula o top devagar; uma consulta por hora basta

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

// ---------- Spotify ----------
let cache = { at: 0, tracks: null };

async function accessToken() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) throw Object.assign(new Error('Spotify não configurado'), { status: 503 });
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  });
  if (!res.ok) throw new Error(`Token do Spotify: ${res.status}`);
  return (await res.json()).access_token;
}

async function topTracks() {
  if (cache.tracks && Date.now() - cache.at < CACHE_MS) return cache.tracks;
  try {
    const token = await accessToken();
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Top do Spotify: ${res.status}`);
    const { items } = await res.json();
    const tracks = items.map((t) => ({
      name: t.name,
      artists: t.artists.map((a) => a.name).join(', '),
      album: t.album.name,
      image: (t.album.images.find((i) => i.width && i.width <= 300) ?? t.album.images[0])?.url ?? null,
      url: t.external_urls.spotify,
    }));
    cache = { at: Date.now(), tracks };
    return tracks;
  } catch (err) {
    if (cache.tracks) return cache.tracks; // se o Spotify falhar, mostra a última lista boa
    throw err;
  }
}

// ---------- Arquivos estáticos ----------
async function sendFile(res, path, status = 200) {
  const body = await readFile(path);
  const immutable = path.includes(`${sep}assets${sep}index-`);
  res.writeHead(status, {
    'Content-Type': TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
  });
  res.end(body);
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  try {
    if (url.pathname === '/api/top-tracks') {
      const tracks = await topTracks();
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' });
      return res.end(JSON.stringify({ tracks }));
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      return res.end();
    }
    // Caminho dentro de dist/, sem deixar sair da pasta.
    const path = normalize(join(DIST, decodeURIComponent(url.pathname)));
    if (path.startsWith(DIST)) {
      const info = await stat(path).catch(() => null);
      if (info?.isFile()) return await sendFile(res, path);
    }
    // Rotas do React (como /sobre ou /en/books) recebem o index.html; arquivos que não existem, 404.
    if (extname(url.pathname)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Não encontrado');
    }
    return await sendFile(res, join(DIST, 'index.html'));
  } catch (err) {
    const status = err.status ?? 502;
    if (status !== 503) console.error(err);
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: status === 503 ? 'not_configured' : 'unavailable' }));
  }
}).listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
