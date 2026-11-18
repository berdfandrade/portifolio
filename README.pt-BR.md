# Portfólio — Bernardo

*[Read in English](README.md)*

Meu portfólio pessoal, organizado como uma **biblioteca de música**: cada projeto é um "álbum" com capa, ficha técnica, destaques e prints. O visual segue a linguagem da Apple (tipografia do sistema, cartões arredondados, tema claro e escuro) e funciona bem no celular.

O site é bilíngue: português em `/` e inglês em `/en`. Um botão PT/EN no cabeçalho leva para a mesma página no outro idioma.

## Páginas

| Rota | O que tem |
| --- | --- |
| `/` | **Biblioteca**: projetos filtráveis por categoria (Apps, Desktop, Sistemas, Web, Automação), busca, projeto em destaque e a lista "Todas as faixas" |
| `/projeto/:slug` | **Página do projeto**: capa, resumo, links, vitrine (print ou vídeo), ficha técnica, destaques, trecho de código, galeria de telas com visualizador em tela cheia e "Mais na biblioteca" |
| `/sobre` | **Sobre**: avatar em pixel art com nível e experiência (pela minha idade), e quatro abas: Perfil (um pouco sobre mim, inventário, missões ativas), Interesses (interesses, músicas mais ouvidas no Spotify, estante), Astral (mapa astral e uma leitura extensa) e Humor |
| `/skill-tree` | **Skill Tree**: cinco ramos da stack e as habilidades humanas, com habilidades dominadas, em treino e bloqueadas, o progresso geral, uma gaveta lateral com os detalhes de cada habilidade e uma visualização 3D que gira com o arraste |
| `/livros` | **Livros**: estante 3D com os livros da minha estante. Arraste para girar e toque num livro para tirá-lo da prateleira e ver a capa e os detalhes |
| `/contato` | **Contato**: uma conversa no estilo do Mensagens que abre o WhatsApp ou o e-mail com a mensagem pronta, e cartões de WhatsApp, e-mail e Instagram com botão de copiar |

Projetos com página hoje: Verdant, PixelForge, Ironclad, printa, Owlio, Aplicador de Vagas, Event Hub e mac. Os textos e as imagens vêm dos READMEs dos repositórios no [GitHub](https://github.com/berdfandrade).

Cada página também tem um endereço em inglês: `/en`, `/en/project/:slug`, `/en/about`, `/en/skill-tree`, `/en/books` e `/en/contact`.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) para desenvolvimento e build
- [React Router](https://reactrouter.com) para as rotas
- CSS puro com variáveis para o tema, sem framework de UI

## Como rodar

Requisitos: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarga instantânea |
| `npm run build` | Checa os tipos e gera o site final em `dist/` |
| `npm run preview` | Serve a pasta `dist/` localmente para conferir o build |
| `npm run typecheck` | Só checa os tipos |
| `npm start` | Roda o `server.js`: entrega o `dist/` e a rota `/api/top-tracks` (Spotify) |
| `npm run spotify:auth` | Autorização única do Spotify; grava as chaves no Railway |

## Estrutura

```
public/assets/            imagens servidas como estão
  avatar.png              avatar em pixel art (página de contato)
  portrait.webp           retrato em pixel art da página Sobre
  projects/<slug>/        prints e vídeos de cada projeto
src/
  main.tsx                rotas e ponto de entrada
  styles.css              todo o CSS (tokens de cor, componentes, responsivo)
  data/projects.ts        conteúdo dos projetos e categorias (português)
  data/projects.en.ts     textos dos projetos em inglês
  data/skills.ts          ramos e habilidades da Skill Tree (português)
  data/skills.en.ts       textos da Skill Tree em inglês
  data/books.ts           livros da estante (português; os sete atuais são exemplos)
  data/books.en.ts        títulos e resumos dos livros em inglês
  data/contact.ts         WhatsApp, e-mail e Instagram
  i18n/strings.ts         textos da interface nos dois idiomas
  i18n/index.tsx          rotas por idioma e o hook useI18n()
  components/
    Layout.tsx            volta ao topo ao trocar de página e define o título da aba
    TopBar.tsx            cabeçalho das páginas internas
    ThemeToggle.tsx       botão de tema claro/escuro
    Tile.tsx              capa de "álbum" de um projeto
    Lightbox.tsx          visualizador de imagens em tela cheia
    orbit.tsx             girar as cenas 3D arrastando, e os botões de giro
  pages/
    Library.tsx           Biblioteca
    ProjectPage.tsx       página de projeto
    About.tsx             Sobre
    SkillTree.tsx         Skill Tree
    Books.tsx             estante 3D
    Contact.tsx           página de contato
    NotFound.tsx          página não encontrada
```

## Adicionar ou editar um projeto

Todo o conteúdo fica em [`src/data/projects.ts`](src/data/projects.ts). Para criar um projeto, adicione um item no array `PROJECTS`. A ordem do array é a ordem de exibição (mais recentes primeiro).

```ts
{
  slug: 'meu-projeto',             // vira a URL /projeto/meu-projeto
  title: 'Meu Projeto',
  coverTitle: 'Meu\nProjeto',      // \n quebra a linha na capa
  kind: 'Web',                     // App | Desktop | Sistemas | Web | Automação
  meta: 'Web · React',             // linha abaixo da capa
  stack: 'React · Vite',           // coluna "stack" da lista
  status: 'Em andamento',
  bg: '#0B1F3A', fg: '#A9CBFF',    // cores da capa
  page: {                          // opcional: sem `page`, o projeto não tem página
    eyebrow: 'Web · 2026',
    lede: 'Uma frase sobre o projeto.',
    links: [{ label: 'Ver no GitHub', href: 'https://github.com/...' }],
    facts: [['Linguagem', 'TypeScript'], ['Status', 'Em andamento']],
    showcase: { src: `${IMG}meu-projeto/tela.png`, alt: '...', caption: '...' },
    highlights: [['Título', 'Descrição curta.']],
    gallery: [{ src: `${IMG}meu-projeto/outra.png`, alt: '...', caption: '...' }],
  },
}
```

Coloque as imagens em `public/assets/projects/<slug>/`. As seções da página (vitrine, destaques, capítulos, código e galeria) só aparecem quando o campo correspondente existe. Os tipos do TypeScript avisam se faltar algum campo obrigatório.

Depois, coloque os textos em inglês com o mesmo `slug` em [`src/data/projects.en.ts`](src/data/projects.en.ts). As listas (links, ficha, destaques, galeria...) seguem a mesma ordem das listas em português; o que faltar aparece em português. Os textos da interface (botões, títulos, rótulos) ficam em [`src/i18n/strings.ts`](src/i18n/strings.ts), onde o TypeScript exige que o objeto em inglês tenha todas as chaves do português.

## Tema

O tema começa seguindo o sistema (claro ou escuro). Quando a pessoa clica no botão, a escolha fica salva no navegador. As cores são variáveis CSS definidas no topo de [`src/styles.css`](src/styles.css): o bloco `:root` tem o tema claro e o `:root[data-theme="dark"]` tem o escuro.

## Publicar

O site roda no [Railway](https://railway.com), em https://bernardo.up.railway.app. Cada push na `main` gera um deploy novo: o Railway roda `npm run build` e depois `npm start`.

O [`server.js`](server.js) é um servidor Node pequeno e sem dependências. Ele entrega o `dist/`, devolve o `index.html` para as rotas do React (como `/projeto/owlio`) e responde em `/api/top-tracks` com as músicas que mais ouvi no Spotify nas últimas 4 semanas, guardadas por uma hora.

### Spotify

O cartão "Mais ouvidas" da página Sobre precisa de três variáveis no Railway: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` e `SPOTIFY_REFRESH_TOKEN`. Sem elas, o cartão simplesmente não aparece.

1. Crie um app em [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) com a Web API e a Redirect URI `http://127.0.0.1:8888/callback`.
2. Rode `npm run spotify:auth` com a CLI do Railway logada, cole o Client ID e o Client Secret e autorize no navegador. O script grava as três variáveis no Railway e publica de novo.

Para testar localmente, rode `npm start` com essas variáveis definidas e `npm run dev` em outro terminal; o Vite repassa `/api` para a porta 3000.

## Pendências

- Textos entre colchetes, como `[ANO]` e `[ALTURA]`, ainda precisam ser preenchidos.
- Os sete livros da estante são exemplos e precisam ser trocados.
- Os projetos Skill Tree e Link na Bio ainda não têm página de projeto.
