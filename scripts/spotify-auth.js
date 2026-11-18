// Autoriza o site a ler as suas músicas mais ouvidas no Spotify (rode uma vez: npm run spotify:auth).
// 1. Pede o Client ID e o Client Secret do app criado em developer.spotify.com.
// 2. Abre o login do Spotify; depois de você autorizar, recebe o código em http://127.0.0.1:8888/callback.
// 3. Troca o código por um refresh token e grava as três chaves nas variáveis do Railway.
// As chaves só passam por este terminal e pelo Railway: nada é salvo em arquivo.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { randomBytes } from 'node:crypto';

const REDIRECT = 'http://127.0.0.1:8888/callback';
const rl = createInterface({ input: process.stdin, output: process.stdout });

console.log('\nNo app do Spotify for Developers, a Redirect URI precisa ser exatamente:\n  ' + REDIRECT + '\n');
const clientId = (await rl.question('Client ID: ')).trim();
const clientSecret = (await rl.question('Client Secret: ')).trim();
rl.close();
if (!clientId || !clientSecret) {
  console.error('Faltou o Client ID ou o Client Secret.');
  process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authorize = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: clientId, response_type: 'code', redirect_uri: REDIRECT, scope: 'user-top-read', state,
})}`;

const code = await new Promise((resolve, reject) => {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', REDIRECT);
    if (url.pathname !== '/callback') return res.writeHead(404).end();
    const ok = url.searchParams.get('state') === state && url.searchParams.get('code');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(ok ? '<h1>Pronto! Pode fechar esta aba e voltar ao terminal.</h1>' : '<h1>A autorização falhou. Veja o terminal.</h1>');
    server.close();
    ok ? resolve(url.searchParams.get('code')) : reject(new Error(url.searchParams.get('error') ?? 'resposta inválida'));
  }).listen(8888, '127.0.0.1');
  console.log('\nAbra este endereço no navegador e autorize:\n\n  ' + authorize + '\n');
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  spawn(opener, [authorize], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' }).on('error', () => {}).unref();
});

const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: { Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
});
if (!res.ok) {
  console.error('O Spotify recusou a troca do código:', res.status, await res.text());
  process.exit(1);
}
const { refresh_token: refreshToken } = await res.json();

/** Grava uma variável no Railway lendo o valor da entrada padrão, para ele não aparecer na lista de processos. */
function setVariable(key, value, deploy) {
  return new Promise((resolve, reject) => {
    const args = ['variable', 'set', key, '--stdin', ...(deploy ? [] : ['--skip-deploys'])];
    const child = spawn('railway', args, { stdio: ['pipe', 'ignore', 'inherit'] });
    child.on('error', reject);
    child.on('close', (status) => (status === 0 ? resolve() : reject(new Error(`railway saiu com ${status}`))));
    child.stdin.end(value);
  });
}

try {
  await setVariable('SPOTIFY_CLIENT_ID', clientId, false);
  await setVariable('SPOTIFY_CLIENT_SECRET', clientSecret, false);
  await setVariable('SPOTIFY_REFRESH_TOKEN', refreshToken, true);
  console.log('\nTudo certo: as chaves estão no Railway e o site está sendo publicado de novo.');
} catch (err) {
  console.error('\nNão consegui gravar no Railway (' + err.message + '). Defina estas variáveis no painel do serviço:');
  console.error('  SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET e SPOTIFY_REFRESH_TOKEN = ' + refreshToken);
  process.exit(1);
}
