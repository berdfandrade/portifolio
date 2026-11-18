// Conteúdo do portfólio. Projetos com `page` ganham uma página em /projeto/<slug> (e /en/project/<slug>).
// Ordem = mais recentes primeiro. Textos e imagens vêm dos READMEs no GitHub.
// A versão em inglês dos textos fica em projects.en.ts.

export type Kind = "App" | "Desktop" | "Sistemas" | "Web" | "Automação";

export interface Shot {
  src: string;
  alt: string;
  caption: string;
  pixelated?: boolean;
}

export interface Showcase {
  src?: string;
  video?: string;
  poster?: string;
  alt: string;
  caption: string;
}

export interface ProjectPage {
  eyebrow: string;
  lede: string;
  links: { label: string; href: string }[];
  facts: [label: string, value: string][];
  showcase?: Showcase;
  highlights?: [title: string, body: string][];
  /** O terceiro item, opcional, é uma paleta de cores: [nome, hex]. */
  chapters?: [title: string, body: string, palette?: [name: string, hex: string][]][];
  code?: { title: string; file: string; body: string };
  gallery?: Shot[];
  /** Telas de celular (390×844), mostradas numa fileira de aparelhos. */
  phones?: Shot[];
}

export interface Project {
  slug: string;
  title: string;
  coverTitle: string;
  kind: Kind;
  meta: string;
  stack: string;
  status: string;
  bg: string;
  fg: string;
  accent?: string;
  page?: ProjectPage;
}

const GH = "https://github.com/berdfandrade/";
const IMG = `${import.meta.env.BASE_URL}assets/projects/`;

export const PROJECTS: Project[] = [
  {
    slug: "verdant",
    title: "Verdant",
    coverTitle: "Verdant",
    kind: "App",
    meta: "App · React Native + NestJS",
    stack: "Figma · Expo · NestJS",
    status: "Em andamento",
    bg: "#1E3A2B",
    fg: "#E4F3DE",
    accent: "#A8D5A0",
    page: {
      eyebrow: "Aplicativo · 2024",
      lede: "Um app de relacionamento só para assinantes, com dates, busca de pessoas e salas de bate-papo.",
      links: [
        { label: "Ver protótipo", href: "https://www.figma.com/proto/zRD5uMolpdYHC71gPsiB6k/Verdant?node-id=2009-153&scaling=scale-down" },
        { label: "Abrir no Figma", href: "https://www.figma.com/design/zRD5uMolpdYHC71gPsiB6k/Verdant" },
        { label: "App no GitHub", href: GH + "verdant-mobile" },
        { label: "API no GitHub", href: GH + "verdant-nest" },
      ],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Ferramentas", "Figma · Expo · NestJS"],
        ["Plataforma", "iOS / Android"],
        ["Status", "Em andamento"],
      ],
      highlights: [
        [
          "Descobrir com swipe",
          "Cards com gesto de arrastar: direita curte, esquerda passa. Cada perfil mostra distância e idade.",
        ],
        [
          "Feed por proximidade",
          "A API ordena o feed por geolocalização e respeita as preferências de distância e faixa etária.",
        ],
        [
          "É um match!",
          "Quando o interesse é mútuo, um modal leva direto para a conversa.",
        ],
        [
          "Chat em tempo real",
          "Socket.IO com histórico paginado, reconexão automática e envio via HTTP quando o socket cai.",
        ],
        [
          "Sessão segura",
          "Tokens no Keychain/Keystore e renovação automática: quando o access token expira, o app troca o refresh token e repete a requisição.",
        ],
        [
          "Tema claro e escuro",
          "O app acompanha o tema do sistema automaticamente.",
        ],
      ],
      chapters: [
        [
          "O problema",
          "Criar um app de relacionamento em que só entra quem paga a assinatura. A ideia é que o pagamento funcione como filtro: menos perfis falsos e gente mais disposta a se conhecer de verdade. Além do swipe e do match, o app precisava de recursos para ir além da conversa: marcar dates, procurar pessoas pelo nome e participar de salas de bate-papo públicas e privadas.",
        ],
        [
          "Identidade visual",
          "O nome vem de “verdejante”, e o slogan é “Conexões que florescem de verdade”. O logo é uma folha simples, e o verde é a cor principal: aparece na abertura, nos botões de curtir e nos balões das minhas mensagens. O resto da interface é neutro, com fundo cinza-claro e cartões brancos, para as fotos dos perfis serem o destaque. A tipografia é a Inter. Cada cor tem uma versão para o tema escuro.",
          [
            ["Verde Verdant", "#10AD5E"],
            ["Verde suave", "#E3F8EC"],
            ["Texto", "#14171F"],
            ["Texto secundário", "#8A909A"],
            ["Fundo", "#F2F3F5"],
            ["Cartões", "#FFFFFF"],
            ["Linhas", "#E6E8EB"],
            ["Passar", "#E5484D"],
          ],
        ],
        [
          "Design no Figma",
          "Desenhei o fluxo completo antes de programar: abertura, login com Google ou telefone, Descobrir com os cards de perfil, a tela de match, chat, Conexões, Dates com calendário e convites, Pesquisar com filtros e Configurações com Verdant Stats e Premium. As telas usam os mesmos componentes (botões em pílula, cartões e uma barra de abas com cinco seções), e o protótipo navegável está no Figma.",
        ],
        [
          "Desenvolvimento",
          "O app é feito em Expo + React Native com TypeScript, Expo Router, TanStack Query e Zustand. A API é em NestJS, com MongoDB, Redis e Socket.IO, e os dois lados têm testes em Jest. Os maiores desafios foram o chat em tempo real (histórico paginado, reconexão automática e envio por HTTP quando o socket cai), a sessão segura com renovação automática do token e o feed ordenado por proximidade, respeitando distância e faixa etária.",
        ],
      ],
      phones: [
        ["splash", "Splash", "Tela de abertura verde com o logo do Verdant"],
        ["login", "Login", "Login com Google ou telefone"],
        ["descobrir", "Descobrir", "Card de perfil com foto, nome, idade, distância e botões de passar, super curtida e curtir"],
        ["match", "Match", "Tela de match com as fotos das duas pessoas e o botão Conversar agora"],
        ["chat", "Chat", "Conversa em tempo real com balões de mensagem"],
        ["conexoes", "Conexões", "Novos matches em destaque e a lista de conversas"],
        ["dates", "Dates", "Calendário de dates, um convite pendente e os dates marcados"],
        ["pesquisar", "Pesquisar", "Busca de pessoas por nome, com filtros e distância"],
        ["configuracoes", "Configurações", "Configurações com Verdant Stats, Premium, tema e conta"],
      ].map(([file, caption, alt]) => ({ src: `${IMG}verdant/${file}.webp`, caption, alt })),
    },
  },
  {
    slug: "pixelforge",
    title: "PixelForge",
    coverTitle: "Pixel\nForge",
    kind: "Desktop",
    meta: "Engine 2D com editor · C++20 + SDL3",
    stack: "C++20 · SDL3",
    status: "Código aberto",
    bg: "#0E3B43",
    fg: "#7FF0D8",
    accent: "#7FF0D8",
    page: {
      eyebrow: "Engine 2D · 2026",
      lede: "Engine 2D em C++20 e SDL3 com editor embutido, feita para pixel art. Uma mesma cena pode usar câmera de plataforma, RPG visto de cima ou isométrica.",
      links: [{ label: "Ver no GitHub", href: GH + "pixelforge" }],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "C++20 · SDL3"],
        ["Build", "CMake · GCC, Clang, MSVC"],
        ["Status", "Código aberto"],
      ],
      showcase: {
        src: IMG + "pixelforge/editor-isometrico.png",
        alt: "Editor do PixelForge no modo isométrico",
        caption:
          "O editor no modo isométrico: hierarquia, viewport com gizmo e inspetor de componentes.",
      },
      highlights: [
        [
          "Três câmeras por cena",
          "Lateral com gravidade e pulo, de cima com 8 direções e isométrica com blocos ordenados por profundidade.",
        ],
        [
          "Editor completo",
          "Hierarquia com grupos e busca, inspetor editável, pincel e borracha de tiles e play/pausa/avanço de quadro sobre uma cópia da cena.",
        ],
        [
          "Tema em CSS",
          "Cores, medidas e fontes do editor vêm de um theme.css, recarregado ao vivo junto com os sprites.",
        ],
        [
          "Formatos em texto",
          "Cenas (.scene) e sprites em pixel art (.sprite) são texto puro: fáceis de versionar e editar à mão.",
        ],
        [
          "Gameplay de plataforma",
          "Coyote time, jump buffer e pulo variável, inimigos que patrulham e moedas com HUD.",
        ],
        [
          "Testado",
          "Testes de física, gameplay, projeção e serialização rodando no CTest.",
        ],
      ],
      code: {
        title: "Uma cena é só texto",
        file: "assets/scenes/level1.scene",
        body: "scene level1\ncamera side\nbackdrop #262d4a #2e375c #e8e6df\ntilemap 40 12\nrow ........................................\nrow ########################...#############\nentity 1 Player\ntransform 32 144\nsprite hero 10\nbody dynamic 1 1 10 15 1\ncontroller 90 220 0.1 0.12",
      },
      gallery: [
        {
          src: IMG + "pixelforge/editor-plataforma.png",
          alt: "Editor no modo plataforma",
          caption: "Modo plataforma",
        },
        {
          src: IMG + "pixelforge/editor-rpg.png",
          alt: "Editor no modo RPG visto de cima",
          caption: "Modo RPG, visto de cima",
        },
        {
          src: IMG + "pixelforge/jogo-rpg.png",
          alt: "Jogo rodando no modo RPG",
          caption: "Modo jogo, sem editor",
          pixelated: true,
        },
      ],
    },
  },
  {
    slug: "ironclad",
    title: "Ironclad",
    coverTitle: "Ironclad",
    kind: "Sistemas",
    meta: "Banco chave-valor distribuído · Rust",
    stack: "Rust · Raft · LSM-tree",
    status: "Código aberto",
    bg: "#3A1F0F",
    fg: "#FFB37A",
    accent: "#FFB37A",
    page: {
      eyebrow: "Sistemas distribuídos · 2026",
      lede: "Um banco de dados chave-valor distribuído, feito do zero em Rust: motor de armazenamento LSM-tree, consenso Raft e um protocolo binário sobre TCP.",
      links: [
        {
          label: "Visitar o site",
          href: "https://berdfandrade.github.io/ironclad-site/",
        },
        { label: "Ver no GitHub", href: GH + "ironclad" },
      ],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "Rust · tokio"],
        ["Arquitetura", "LSM-tree · Raft"],
        ["Status", "Código aberto"],
      ],
      showcase: {
        video: IMG + "ironclad/demo.mp4",
        poster: IMG + "ironclad/demo-poster.jpg",
        alt: "Demonstração de um cluster Ironclad com 3 nós",
        caption:
          "Demo de 57 segundos num cluster real de 3 nós: o líder cai, outro assume e nenhum dado se perde.",
      },
      highlights: [
        [
          "Durável",
          "Uma escrita confirmada com OK está em disco na maioria dos nós. Sobrevive a crash, kill -9 e queda de energia.",
        ],
        [
          "Replicado",
          "Rode 3 ou 5 nós. O cluster continua funcionando enquanto a minoria estiver fora: 5 nós toleram 2 falhas.",
        ],
        [
          "Failover automático",
          "Quando o líder morre, os nós restantes elegem outro em um a dois segundos, e os clientes o seguem sozinhos.",
        ],
        [
          "Consistência forte",
          "Leituras e escritas linearizáveis: depois do OK, toda leitura vê o dado, em qualquer nó.",
        ],
        [
          "Exatamente uma vez",
          "Um cliente que repete uma escrita, por crash ou rede, nunca faz ela ser aplicada duas vezes.",
        ],
        [
          "Detecta corrupção",
          "Toda estrutura em disco tem checksum. Dado danificado vira erro, nunca resposta.",
        ],
      ],
      code: {
        title: "Três camadas, cada uma resolve um problema",
        file: "arquitetura",
        body: '              clientes\n                 │   protocolo binário sobre TCP\n┌────────────────▼──────────────────────────────────────┐\n│  API do cliente    interpreta, valida, roteia, responde │\n├────────────────────────────────────────────────────────┤\n│  Consenso Raft     elege um líder, replica o log        │\n├────────────────────────────────────────────────────────┤\n│  Armazenamento     WAL, MemTable, SSTables              │\n└────────────────────────────────────────────────────────┘\n\n$ ironclad-cli set user:123 \'{"name":"Bernardo"}\'\nOK\n$ ironclad-cli get user:123\n{"name":"Bernardo"}',
      },
    },
  },
  {
    slug: "printa",
    title: "printa",
    coverTitle: "printa",
    kind: "Desktop",
    meta: "Captura de tela para Linux · C + GTK3",
    stack: "C · GTK3 · X11",
    status: "Código aberto",
    bg: "#7B3CFF",
    fg: "#FFFFFF",
    accent: "#C9B0FF",
    page: {
      eyebrow: "Desktop · Linux · 2026",
      lede: "Uma ferramenta leve de captura de tela para Linux (X11), escrita em C com GTK3, no espírito do Flameshot.",
      links: [
        {
          label: "Visitar o site",
          href: "https://berdfandrade.github.io/printa/",
        },
        { label: "Ver no GitHub", href: GH + "printa" },
      ],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "C · GTK3"],
        ["Plataforma", "Linux (X11)"],
        ["Licença", "MIT"],
      ],
      showcase: {
        src: IMG + "printa/screenshot.png",
        alt: "printa com uma janela selecionada: o resto da tela escurecido, o tamanho da seleção no canto e o botão Salvar logo abaixo",
        caption:
          "Uma janela selecionada com um clique: o resto da tela escurece e o botão Salvar aparece logo abaixo.",
      },
      highlights: [
        [
          "Janelas com um clique",
          "Passe o mouse e a janela sob o cursor é destacada. Clique para selecionar, já sem a sombra invisível do GTK.",
        ],
        [
          "Regiões livres",
          "Arraste para selecionar qualquer retângulo, em qualquer direção.",
        ],
        [
          "Tela congelada",
          "A imagem é capturada antes da interface aparecer, então menus abertos e tooltips entram no print.",
        ],
        [
          "Salvar ou copiar",
          'Salva em ~/Imagens, copia para a área de transferência, ou os dois. "Salvar como" aceita PNG e JPEG.',
        ],
        [
          "Vários monitores e HiDPI",
          "Cobre a área de trabalho inteira e salva na resolução real da tela.",
        ],
        [
          "Pequeno",
          "Um binário, sem serviço em segundo plano e sem configuração.",
        ],
      ],
      code: {
        title: "Feito para atalhos e scripts",
        file: "terminal",
        body: 'printa          # captura agora\nprinta -d 3     # espera 3 segundos antes\n\n# o caminho do arquivo salvo vai para o stdout\nfile=$(printa) && notify-send "Print salvo" "$file"',
      },
    },
  },
  {
    slug: "owlio",
    title: "Owlio",
    coverTitle: "Owlio",
    kind: "Desktop",
    meta: "App de roteiro · C++17 + Qt 6",
    stack: "C++17 · Qt 6",
    status: "Código aberto",
    bg: "#F2EBDD",
    fg: "#1D1D1F",
    accent: "#6E5A3A",
    page: {
      eyebrow: "Desktop · Roteiro · 2026",
      lede: "Um app de roteiro em C++17 e Qt 6, com formatação padrão da indústria, páginas reais na tela e as cenas organizadas como cartões.",
      links: [
        {
          label: "Visitar o site",
          href: "https://berdfandrade.github.io/owlio-website/",
        },
        { label: "Baixar para Windows", href: GH + "owlio/releases" },
        { label: "Ver no GitHub", href: GH + "owlio" },
      ],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "C++17 · Qt 6"],
        ["Formatos", "Fountain · FDX · PDF"],
        ["Plataforma", "Windows · Linux"],
      ],
      showcase: {
        src: IMG + "owlio/script-dark.webp",
        alt: "Owlio no modo de escrita, tema escuro, com a lista de cenas e personagens ao lado",
        caption:
          "Escrevendo no tema escuro: página real em Courier 12, cenas e personagens no painel lateral.",
      },
      highlights: [
        [
          "O formato vem primeiro",
          "Courier 12, margens fixas e uma página por minuto de tela. Nada de reflow de editor de texto.",
        ],
        [
          "Fluxo pelo teclado",
          "Enter e Tab escolhem o próximo elemento: cena, ação, personagem, diálogo. Autocompleta nomes e locações.",
        ],
        [
          "Paginação profissional",
          "Cabeçalhos nunca ficam sozinhos no fim da página, e diálogos divididos ganham (MAIS) e (CONT.).",
        ],
        [
          "Cartões e linha do tempo",
          "Arraste cartões para reordenar cenas e veja o filme numa linha do tempo com atos, pontos de virada e personagens.",
        ],
        [
          "Versões e backups",
          'Salvamento automático, recuperação após travar e uma "máquina do tempo" com cada versão salva.',
        ],
        [
          "Personagens",
          "Fichas com estatísticas, mapa de relações e um criador de avatares em pixel art.",
        ],
      ],
      gallery: [
        {
          src: IMG + "owlio/cards-dark.webp",
          alt: "Cartões de cena no tema escuro",
          caption: "Cartões de cena",
        },
        {
          src: IMG + "owlio/timeline.webp",
          alt: "Linha do tempo com estrutura da história, blocos de cena e faixas de personagens",
          caption: "Linha do tempo",
        },
        {
          src: IMG + "owlio/relations.webp",
          alt: "Mapa de relações entre personagens",
          caption: "Mapa de relações",
        },
        {
          src: IMG + "owlio/beat-board.webp",
          alt: "Beat Board com linhas de fluxo",
          caption: "Beat Board",
        },
        {
          src: IMG + "owlio/versions.webp",
          alt: "Versões salvas empilhadas sob um céu noturno",
          caption: "Versões",
        },
        {
          src: IMG + "owlio/script-light.webp",
          alt: "Modo de escrita no tema claro",
          caption: "Tema claro",
        },
        {
          src: IMG + "owlio/character.webp",
          alt: "Ficha de personagem com avatar, estatísticas e sinopse",
          caption: "Ficha de personagem",
        },
        {
          src: IMG + "owlio/avatar.webp",
          alt: "Criador de avatares em pixel art",
          caption: "Criador de avatares",
        },
        {
          src: IMG + "owlio/cast.webp",
          alt: "Janela de personagens com o elenco numa tabela editável",
          caption: "Elenco",
        },
        {
          src: IMG + "owlio/print.webp",
          alt: "Janela de impressão e PDF com prévia das folhas",
          caption: "Impressão e PDF",
        },
        {
          src: IMG + "owlio/title-page.png",
          alt: "Editor da página de rosto com prévia ao vivo",
          caption: "Página de rosto",
        },
      ],
    },
  },
  {
    slug: "aplicador",
    title: "Aplicador de Vagas",
    coverTitle: "Aplicador\nde Vagas",
    kind: "Automação",
    meta: "Automação · LinkedIn, Glassdoor, Indeed",
    stack: "Python · Chrome CDP",
    status: "Em andamento",
    bg: "#0B1F3A",
    fg: "#A9CBFF",
    accent: "#A9CBFF",
    page: {
      eyebrow: "Automação · 2026",
      lede: "Coleta vagas do LinkedIn, Indeed e Glassdoor e mostra uma de cada vez, como cartões para arrastar. Direita candidata, esquerda pula.",
      links: [{ label: "Ver no GitHub", href: GH + "aplicador-de-vagas" }],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "Python"],
        ["Fontes", "LinkedIn · Indeed · Glassdoor"],
        ["Status", "Em andamento"],
      ],
      highlights: [
        [
          "Swipe para decidir",
          "Arraste para a direita para candidatar, para a esquerda para pular e para cima para salvar. Z desfaz.",
        ],
        [
          "Easy Apply automático",
          "Vagas com Easy Apply entram numa fila e o bot envia sozinho. As outras abrem no Chrome para você.",
        ],
        [
          "Ordenado por afinidade",
          "Uma pontuação por palavras-chave, habilidades, Easy Apply e trabalho remoto decide a ordem dos cartões.",
        ],
        [
          "Aprende respostas",
          "Perguntas que o bot não sabe responder vão para uma aba. Responda uma vez e ele reutiliza.",
        ],
        [
          "Seu Chrome de verdade",
          "Usa um perfil dedicado do Chrome, então logins ficam salvos e o seu navegador do dia a dia não é tocado.",
        ],
        [
          "Protege sua conta",
          "Limite diário, intervalo aleatório entre envios e modo de teste que preenche o formulário sem enviar.",
        ],
      ],
      code: {
        title: "Experimente sem conta nenhuma",
        file: "terminal",
        body: "python3 -m venv .venv\n.venv/bin/pip install -r requirements.txt\n.venv/bin/python run.py --demo            # dados de exemplo, sem Chrome\n.venv/bin/python run.py --host 0.0.0.0    # usar pelo celular na mesma rede",
      },
    },
  },
  {
    slug: "event-hub",
    title: "Event Hub",
    coverTitle: "Event\nHub",
    kind: "Sistemas",
    meta: "Webhooks assíncronos · FastAPI + Redis",
    stack: "FastAPI · MongoDB · Redis",
    status: "Código aberto",
    bg: "#E8EEF9",
    fg: "#0B3A8C",
    accent: "#0B3A8C",
    page: {
      eyebrow: "Backend · 2026",
      lede: "Uma API em Python e FastAPI que recebe eventos de outros sistemas por webhooks e os processa de forma assíncrona, com confiabilidade e sem travar quem enviou.",
      links: [{ label: "Ver no GitHub", href: GH + "event-hub" }],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "Python · FastAPI"],
        ["Dados", "MongoDB · Redis"],
        ["Status", "Código aberto"],
      ],
      highlights: [
        [
          "Responde na hora",
          "Quem envia recebe 202 Accepted imediatamente, e o processamento acontece em segundo plano.",
        ],
        [
          "Retentativas",
          "Falhas temporárias são repetidas com espera crescente (backoff exponencial).",
        ],
        [
          "Fila de falhas",
          "Depois de N tentativas, o evento vai para uma dead-letter queue e fica marcado como failed.",
        ],
        [
          "Sem duplicatas",
          "O cabeçalho Idempotency-Key impede que o mesmo webhook seja processado duas vezes.",
        ],
        [
          "Resiste a quedas",
          "Se um worker cai no meio do processamento, o evento volta para a fila quando ele reinicia.",
        ],
        [
          "Status consultável",
          "Todo evento tem um status e um histórico expostos pela API.",
        ],
      ],
      code: {
        title: "Como um evento anda pelo sistema",
        file: "fluxo",
        body: " Serviço externo           Event Hub API                    Worker(s)\n ───────────────           ─────────────                    ─────────\n POST /webhooks/events ──► 1. Salva o evento no MongoDB\n                           2. Põe o ID na fila do Redis\n       ◄── 202 Accepted ── 3. Responde na hora\n                                              ┌──────────► 4. Pega o evento da fila\n                                              │            5. Executa os handlers\n                                              │            6. Atualiza o status\n                           Fila de retry ─────┘               ├─ sucesso → completed\n                           (com espera)    ◄──────────────────┼─ erro    → retrying\n                                                              └─ esgotou → failed",
      },
    },
  },
  {
    slug: "mac",
    title: "mac",
    coverTitle: "mac",
    kind: "Sistemas",
    meta: "Máquina virtual com assembler · C11",
    stack: "C11",
    status: "Código aberto",
    bg: "#101010",
    fg: "#39FF88",
    accent: "#39FF88",
    page: {
      eyebrow: "Sistemas · 2024",
      lede: "Uma máquina virtual de pilha pequena e legível, escrita em C11, com assembler, executor de linha de comando e um debugger interativo no terminal.",
      links: [{ label: "Ver no GitHub", href: GH + "virtualmachine" }],
      facts: [
        ["Papel", "Desenvolvimento"],
        ["Linguagem", "C11"],
        ["Plataforma", "Linux · macOS"],
        ["Testes", "37 testes · CI"],
      ],
      highlights: [
        [
          "Máquina de pilha",
          "Pilha de 256 posições, seis registradores de uso geral e 23 instruções.",
        ],
        [
          "Segura por design",
          "Estouro de pilha, divisão por zero e saltos inválidos viram erros. A VM nunca lê ou escreve fora dos limites.",
        ],
        [
          "Assembler de duas passadas",
          "Rótulos com referência adiante, comentários, números em hexadecimal e erros com número de linha.",
        ],
        [
          "Debugger no terminal",
          "Execute passo a passo, marque breakpoints e veja registradores, pilha e saída mudarem, sem ncurses.",
        ],
        ["Sem dependências", "Só um compilador C11 e um sistema POSIX."],
        [
          "Testada",
          "37 testes unitários, testes de ponta a ponta, builds com sanitizers e CI no Linux e no macOS.",
        ],
      ],
      code: {
        title: "Fatorial de 10 em assembly",
        file: "examples/factorial.asm",
        body: "        SET A 10        ; contador\n        SET B 1         ; acumulador\nloop:   LOD A\n        JZ done         ; para quando o contador chega a 0\n        LOD B\n        LOD A\n        MUL\n        STR B           ; B = B * A\n        LOD A\n        PSH 1\n        SUB\n        STR A           ; A = A - 1\n        JMP loop\ndone:   LOD B\n        POP             ; imprime 3628800\n        HLT",
      },
    },
  },
  {
    slug: "skill-tree",
    title: "Skill Tree",
    coverTitle: "Skill\nTree",
    kind: "Web",
    meta: "Web · React + Tailwind",
    stack: "React · Tailwind",
    status: "Em andamento",
    bg: "#FFD60A",
    fg: "#111111",
  },
  {
    slug: "link-na-bio",
    title: "Link na Bio",
    coverTitle: "Link\nna Bio",
    kind: "Web",
    meta: "Web · Personagem chibi 3D",
    stack: "[STACK]",
    status: "Em andamento",
    bg: "#F6C9D8",
    fg: "#5A1030",
  },
];

/** Filtros da Biblioteca, na ordem em que aparecem. Os nomes de cada idioma ficam em src/i18n/strings.ts. */
export const CATEGORIES = ["Tudo", "App", "Desktop", "Sistemas", "Web", "Automação"] as const satisfies readonly (Kind | "Tudo")[];
export type Category = (typeof CATEGORIES)[number];
