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
  description?: { title: string; body: string };
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
  /** Ainda em desenvolvimento (aparece como missão em andamento no Sobre). */
  ongoing?: boolean;
  bg: string;
  fg: string;
  accent?: string;
  page?: ProjectPage;
}

const GH = "https://github.com/berdfandrade/";
const IMG = `${import.meta.env.BASE_URL}assets/projects/`;

export const PROJECTS: Project[] = [
  {
    slug: "siegebreaker", title: "Siegebreaker", coverTitle: "Siege\nbreaker", kind: "Sistemas",
    meta: "Teste de carga HTTP · Linux", stack: "C11 · libcurl · epoll", status: "Publicado",
    bg: "#302618", fg: "#FFF0CC", accent: "#E8AF45",
    page: {
      eyebrow: "Ferramenta de linha de comando · 2026",
      lede: "Quando peço mil requisições por segundo, quantas chegam a sair da máquina? Fiz o Siegebreaker para medir o próprio gerador de carga enquanto testo uma API local.",
      links: [{ label: "Ver no GitHub", href: GH + "siegebreaker" }, { label: "Abrir medição", href: GH + "siegebreaker/blob/main/benchmarks/juggernaut-20261121-110229/1000-1.json" }],
      facts: [["Linguagem", "C11"], ["Plataforma", "Linux 64-bit"], ["Protocolo", "HTTP/1.1 · GET local"]],
      description: { title: "Como funciona o teste", body: "Escolho um endereço HTTP local, uma taxa de requisições por segundo e a duração do teste. O Siegebreaker agenda os envios nesse ritmo, mesmo enquanto aguarda respostas anteriores. No fim, o relatório em JSON mostra quantas requisições estavam previstas, quantas saíram da máquina e quantas receberam resposta. Se o cliente perdeu um horário de envio ou ficou sem conexão livre, consigo ver isso nos contadores antes de interpretar a latência da API." },
      chapters: [
        ["As 26 requisições que faltaram", "Num ensaio de dez segundos contra o Juggernaut, programei 10.000 requisições. O gerador perdeu 26 horários de envio. As 9.974 requisições que saíram receberam HTTP 200. Ter esses três números no mesmo relatório me permitiu localizar a diferença no cliente. Esse ensaio usou uma versão temporária com token de autenticação."],
        ["De onde começa o cronômetro?", "Cada worker segue um relógio monotônico. O relatório em JSON mede o tempo desde a admissão até a resposta e também desde o instante em que a requisição deveria ter começado. Comparar as duas medidas mostra quanto da espera aconteceu antes do envio."],
      ],
    },
  },
  {
    slug: "juggernaut", title: "Juggernaut", coverTitle: "Juggernaut", kind: "Sistemas",
    meta: "Motor de transferências · Java", stack: "Java 21 · Spring Boot · PostgreSQL", status: "Núcleo publicado",
    bg: "#3E201A", fg: "#FFF1E8", accent: "#F08058",
    page: {
      eyebrow: "Sistemas transacionais · 2026",
      lede: "Uma transferência foi confirmada no banco, mas a resposta se perdeu no caminho. O que acontece quando o cliente tenta de novo? Construí o Juggernaut para estudar essa pergunta com duas contas, dinheiro contado em centavos e um PostgreSQL de verdade.",
      links: [{ label: "Ver no GitHub", href: GH + "juggernaut" }, { label: "Ler a revisão técnica", href: GH + "juggernaut/blob/main/REVIEW.md" }],
      facts: [["Linguagem", "Java 21"], ["Banco", "PostgreSQL 16"], ["Testes", "JUnit · Testcontainers"]],
      showcase: { src: IMG + "juggernaut/logo.png", alt: "Letra J desenhada com duas faixas laranjas", caption: "As duas faixas do J representam o débito e o crédito da mesma transferência." },
      chapters: [
        ["Por que quis estudar transferências", "Escolhi uma transferência porque consigo conferir o resultado à mão. Se tiro 125 centavos de uma conta com 10.000 e mando para outra vazia, espero encontrar 9.875 de um lado e 125 do outro. A parte que eu queria entender começa quando a resposta some. Para quem apertou o botão, parece que nada aconteceu. Para o banco, o dinheiro já mudou de conta. Quis aprender a reconhecer o mesmo pedido depois de uma falha e devolver o primeiro comprovante, mesmo que a conta já tenha recebido outras transferências."],
        ["Quem fica com o último centavo?", "Também queria ver o que acontece quando várias operações leem o mesmo saldo. Montei um teste com 240 tentativas de sacar um centavo de uma conta com saldo de 100. O resultado esperado é bem concreto: 100 débitos, 100 créditos correspondentes e saldo zero na origem. Para chegar lá, o serviço trava as duas contas sempre na mesma ordem e confere o saldo enquanto mantém esses locks. Depois do teste, confiro se cada saldo fecha com os lançamentos."],
        ["O que a primeira versão deixou passar", "Na revisão, uma tentativa de transferir 101 com saldo de 100 revelou um detalhe que eu tinha perdido. O banco desfez a operação e apagou junto a chave que identificava o pedido. Com a mesma chave, uma segunda tentativa de transferir apenas 1 passou. A correção foi guardar a decisão de recusa, sem lançar débito nem crédito. Esse caso virou um teste que posso repetir sempre que mudar o fluxo."],
      ],
    },
  },
  {
    slug: "time-machine",
    title: "Time Machine Keyboard",
    coverTitle: "Time\nMachine",
    kind: "App",
    meta: "Teclado Android · Kotlin",
    stack: "Kotlin · Jetpack Compose",
    status: "Em andamento",
    ongoing: true,
    bg: "#111113",
    fg: "#F4F4F6",
    accent: "#F5B547",
    page: {
      eyebrow: "Teclado Android · 2026",
      lede: "Um teclado que guarda versões do texto enquanto você digita. Apagou um parágrafo ou mudou de ideia? Abra a linha do tempo, compare e restaure, como um controle de versões dentro do teclado.",
      links: [{ label: "Ver no GitHub", href: GH + "time-machine-keyboard" }],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "Kotlin · Jetpack Compose"],
        ["Plataforma", "Android 9 ou superior"],
        ["Status", "Em andamento"],
      ],
      highlights: [
        [
          "Versões enquanto digita",
          "Cada pausa vira uma versão. Antes de apagar, de enviar e de restaurar, o teclado guarda o texto na hora.",
        ],
        [
          "Linha do tempo com ramos",
          "Um trilho no estilo do git: restaurar uma versão antiga e continuar escrevendo cria um ramo, sem apagar o que ficou para trás.",
        ],
        [
          "Restauração segura",
          "Antes de trocar o texto, o teclado lê o campo inteiro e guarda como versão. Se não conseguir ler tudo, não altera nada.",
        ],
        [
          "Sugestões e emojis",
          "Três sugestões de palavras que ignoram acento e aprendem com você, e todos os emojis do Unicode, com tons de pele.",
        ],
        [
          "Do jeito que você quiser",
          "Modos completo, uma mão e polegar, e uma moldura com alças nas bordas para mudar altura, largura e posição ao vivo.",
        ],
        [
          "Privacidade primeiro",
          "Sem permissão de Internet, sem telemetria e com histórico só na memória. Senhas e campos privados nunca são gravados.",
        ],
      ],
      chapters: [
        [
          "O problema",
          "Todo mundo já apagou sem querer uma mensagem longa, ou reescreveu um parágrafo e se arrependeu. O desfazer dos apps é curto e some quando você troca de tela. A ideia foi levar o controle de versões para o lugar onde todo texto passa: o teclado. A regra mais importante do projeto é não prometer o que não dá para cumprir. O Android nem sempre deixa um teclado ler o campo inteiro, então as versões incompletas ficam marcadas como parciais e nunca substituem o texto.",
        ],
        [
          "Identidade visual",
          "O âmbar é a cor do tempo, como um momento preservado. Ele aparece só no que tem a ver com o histórico: a versão atual no trilho, o botão Restaurar e o Desfazer. Todo o resto é grafite, com teclas discretas, para o teclado continuar confortável no dia a dia. A tecla de Enviar usa o contraste invertido, e não o âmbar, para a cor manter um só significado. Todas as combinações de texto passam de 4,5:1 de contraste.",
          [
            ["Âmbar do tempo", "#F5B547"],
            ["Fundo", "#111113"],
            ["Teclas", "#2B2B30"],
            ["Teclas de função", "#1E1E22"],
            ["Texto", "#F4F4F6"],
            ["Texto secundário", "#A6A6AE"],
          ],
        ],
        [
          "Design",
          "Segui os princípios das Human Interface Guidelines da Apple, traduzidos para o Android: as ajudas ficam no app e não dentro do teclado, todo gesto tem um botão equivalente, a vibração sempre quer dizer a mesma coisa e o movimento é contido. Tocar numa tecla é instantâneo; só os painéis deslizam e mudam de opacidade, e tudo segue a escala de animação do sistema. O símbolo do produto é o trilho de versões: pontos ligados como um grafo do git, que crescem na faixa enquanto você digita e se abrem na linha do tempo.",
        ],
        [
          "Desenvolvimento",
          "O teclado é um InputMethodService em Kotlin. As teclas são desenhadas em Canvas, por desempenho e para funcionar com o TalkBack, e os painéis usam Jetpack Compose dentro do teclado. O histórico é um grafo de versões com deduplicação, limite e expiração. A parte mais difícil foi a restauração: o editor do Compose aplica as edições só no quadro seguinte, então o teclado apaga exatamente o texto que leu e confere o resultado de novo logo depois. São 67 testes de lógica e 10 testes com campos de texto reais do Android.",
        ],
      ],
      code: {
        title: "Nunca apagar o que não leu",
        file: "RestorationEngine.kt",
        body: "val current = read(ic)                 // leitura completa ou nada\nvalidate(session, key, target, current)?.let { return Failed(it) }\n\nval before = history.recordBeforeRestore(current)  // dá para desfazer\nic.beginBatchEdit()\nic.deleteSurroundingText(current.selectionStart,\n    current.text.length - current.selectionEnd)\nic.commitText(target.text, 1)\nic.endBatchEdit()\n\nreturn if (confirm(ic, target)) Restored(target, before.id)\n       else Unconfirmed(target, before.id)  // confere de novo em 300 ms",
      },
      phones: [
        ["keyboard", "Sugestões", "Teclado escuro com três sugestões de palavras na faixa: Beijar, Beijo e Beisebol"],
        ["timeline", "Linha do tempo", "Linha do tempo com um ramo; a prévia mostra riscado o que sai e sublinhado o que volta"],
        ["restored", "Restaurado", "Texto restaurado no campo e a faixa mostrando Restaurado e Desfazer"],
        ["emoji", "Emojis", "Painel de emojis com as abas de categoria e os emojis recentes"],
        ["settings", "Ajustes", "Ajustes rápidos: vibração, som, privado, tema, modos, tamanho, números e mais"],
        ["resize", "Tamanho", "Moldura de redimensionar com uma alça em cada borda e os botões Redefinir e OK"],
        ["app", "App", "Tela inicial do app com o trilho de versões e os passos para ativar o teclado"],
      ].map(([file, caption, alt]) => ({ src: `${IMG}time-machine/${file}.webp`, caption, alt })),
    },
  },
  {
    slug: "verdant",
    title: "Verdant",
    coverTitle: "Verdant",
    kind: "App",
    meta: "App · React Native + NestJS",
    stack: "Figma · Expo · NestJS",
    status: "Em andamento",
    ongoing: true,
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
    ongoing: true,
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
    slug: "rdock",
    title: "rdock",
    coverTitle: "rdock",
    kind: "Desktop",
    meta: "Dock estilo macOS para Linux · Rust",
    stack: "Rust · X11",
    status: "Código aberto",
    bg: "#3A2850",
    fg: "#FFD3BA",
    accent: "#FF9466",
    page: {
      eyebrow: "Desktop · 2026",
      lede: "Uma dock no estilo do macOS para desktops Linux com X11 (Cinnamon, XFCE, MATE), escrita em Rust puro, sem GTK nem Qt. Ela mesma desenha tudo na CPU e conversa direto com o servidor X.",
      links: [{ label: "Ver no GitHub", href: GH + "rdock" }],
      facts: [
        ["Papel", "Design e desenvolvimento"],
        ["Linguagem", "Rust"],
        ["Plataforma", "Linux · X11"],
        ["Licença", "MIT"],
      ],
      showcase: {
        src: IMG + "rdock/hero.webp",
        alt: "A rdock na parte de baixo da tela, com o ícone do Calendário ampliado pelo efeito olho de peixe e uma dica com o nome",
        caption: "Magnificação em olho de peixe, dica com o nome do app e pontinhos embaixo dos apps abertos.",
      },
      highlights: [
        [
          "Olho de peixe com molas",
          "Os ícones crescem numa curva de cosseno conforme o mouse chega perto, animados com molas amortecidas. O ícone continua quicando até a janela do app abrir.",
        ],
        [
          "Arrastar e soltar",
          "Os ícones mudam de ordem enquanto os vizinhos abrem espaço, e arrastar um para fora remove o app com um “puf”. Para fixar um app, basta arrastá-lo do Launchpad ou soltar um arquivo .desktop na dock.",
        ],
        [
          "Pilhas",
          "Uma pasta solta na dock vira uma pilha. Até 9 itens abrem em órbita ao redor do ícone; pastas maiores abrem um painel com subpastas, busca, ordenação, prévia e controle pelo teclado. Um selo vermelho conta os arquivos novos, e o botão direito troca o modo e a ordenação.",
        ],
        [
          "Prévias de janelas",
          "Com o mouse parado 400 ms sobre um app aberto, aparecem miniaturas ao vivo de cada janela e a área de trabalho onde ela está. Clique para focar, × para fechar, roda do mouse para alternar.",
        ],
        [
          "Soltar arquivos nos apps",
          "Ao arrastar um arquivo, os apps que sabem abri-lo sobem e os outros somem. Soltar num app abre o arquivo nele; numa pilha, move (com Ctrl, copia); na lixeira, apaga. O menu do app lista os arquivos recentes.",
        ],
        [
          "Launchpad",
          "Grade em tela cheia com todos os apps sobre uma cópia desfocada da área de trabalho, com páginas que deslizam e busca que ignora acentos. Os quadros vão ao servidor X por memória compartilhada (MIT-SHM) e a animação fica em 60 fps.",
        ],
        [
          "Ocultação inteligente",
          "Pode ficar sempre visível, sumir quando o mouse sai ou sumir só quando a janela ativa encosta nela. Funciona embaixo, à esquerda ou à direita da tela.",
        ],
        [
          "Temas em um PNG",
          "Um tema é uma única imagem da prateleira: as pontas ficam fixas e o meio se repete conforme a dock cresce. Já vem com Vidro, Grafite, Gelo, Neon, Pôr do sol e Madeira.",
        ],
        [
          "0% de CPU parada",
          "Sem animação, a dock não gasta CPU. Um quadro animado leva de 0,5 a 2 ms, porque só a parte que mudou é redesenhada e enviada ao servidor X.",
        ],
      ],
      chapters: [
        [
          "Por que fazer uma dock",
          "Eu queria no Linux a mesma sensação da dock do macOS: o olho de peixe, o quique ao abrir um app e o Launchpad. As docks que existem dependem de GTK ou Qt, então decidi escrever uma do zero em Rust, para entender como as janelas, os ícones e as animações funcionam por baixo.",
        ],
        [
          "Desenhando sem toolkit",
          "Tudo é desenhado na CPU com o tiny-skia e enviado ao servidor X pelo x11rb. A janela da dock é transparente, e uma região de entrada do X Shape deixa os cliques passarem pelas áreas vazias até as janelas de baixo. Os apps vêm dos arquivos .desktop do padrão XDG e os ícones vêm do tema do sistema, carregados em threads separadas.",
        ],
        [
          "Animações com molas",
          "Todas as animações usam a mesma mola amortecida: a magnificação, a entrada e saída dos ícones, a reordenação no arrastar e os fades. Quando nada se move, o loop de eventos para de desenhar, e por isso a dock fica em 0% de CPU parada.",
        ],
        [
          "Pilhas e prévias sem custo parado",
          "As pilhas vigiam as pastas com inotify, então o selo de arquivos novos se atualiza sem a dock acordar à toa. As prévias são capturadas numa thread separada e aparecem num popover de vidro sobre uma captura desfocada da tela, mais opaco quando o papel de parede é claro. Para saber quais apps abrem um arquivo, a dock lê o MimeType dos .desktop e o banco do shared-mime-info.",
        ],
      ],
      code: {
        title: "A mola por trás de todas as animações",
        file: "src/anim.rs",
        body: "pub fn step(&mut self, dt: f32) -> bool {\n    if self.value == self.target && self.vel == 0.0 {\n        return false; // parada: nada para redesenhar\n    }\n    let n = (dt / 0.004).ceil().max(1.0) as u32;\n    let h = dt / n as f32;\n    for _ in 0..n {\n        let a = self.k * (self.target - self.value) - self.c * self.vel;\n        self.vel += a * h;\n        self.value += self.vel * h;\n    }\n    if (self.target - self.value).abs() < 0.002 && self.vel.abs() < 0.02 {\n        self.value = self.target;\n        self.vel = 0.0;\n        return false;\n    }\n    true\n}",
      },
      gallery: [
        {
          src: IMG + "rdock/orbit.webp",
          alt: "A pilha de Downloads aberta em órbita: oito arquivos em dois arcos acima do ícone, com pontos azuis nos arquivos novos",
          caption: "Pilha em órbita",
        },
        {
          src: IMG + "rdock/panel.webp",
          alt: "A pilha Projetos aberta como painel, com abas de ordenação, busca, grade de arquivos e área de prévia",
          caption: "Pilha em painel",
        },
        {
          src: IMG + "rdock/previews.webp",
          alt: "Popover de vidro com miniaturas ao vivo das duas janelas do Editor de texto e o botão Nova janela",
          caption: "Prévias de janelas",
        },
        {
          src: IMG + "rdock/drag.webp",
          alt: "Arrastando uma imagem sobre a dock: o Pix sobe com a dica “Abrir com Pix” e os apps que não abrem imagens ficam apagados",
          caption: "Soltar arquivos nos apps",
        },
        {
          src: IMG + "rdock/menu.webp",
          alt: "Menu do Editor de texto com a seção Recentes listando os últimos arquivos abertos",
          caption: "Arquivos recentes no menu",
        },
        {
          src: IMG + "rdock/stack-menu.webp",
          alt: "Menu de uma pilha com Abrir em Arquivos, Exibir como Automático, Órbita ou Painel, e Ordenar por",
          caption: "Menu da pilha",
        },
        {
          src: IMG + "rdock/launchpad.webp",
          alt: "Launchpad com a grade de todos os apps instalados sobre a área de trabalho desfocada",
          caption: "Launchpad",
        },
        {
          src: IMG + "rdock/settings.webp",
          alt: "Janela de preferências da dock com controles deslizantes, posição, tema, ocultação e chaves para quique, indicadores, prévias, destaque ao arrastar e arquivos recentes",
          caption: "Preferências",
        },
        {
          src: IMG + "rdock/themes.webp",
          alt: "A mesma dock nos temas Vidro, Grafite, Gelo, Neon, Pôr do sol e Madeira",
          caption: "Temas",
        },
      ],
    },
  },
];

/** Filtros da Biblioteca, na ordem em que aparecem. Os nomes de cada idioma ficam em src/i18n/strings.ts. */
export const CATEGORIES = ["Tudo", "App", "Desktop", "Sistemas", "Web", "Automação"] as const satisfies readonly (Kind | "Tudo")[];
export type Category = (typeof CATEGORIES)[number];
