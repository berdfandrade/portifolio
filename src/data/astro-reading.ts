// Leitura extensa do mapa astral (aba Astral da página Sobre), em português.
// A versão em inglês fica em astro-reading.en.ts, com a mesma estrutura.
// Os símbolos são chaves (signos, planetas e aspectos) que o componente AstroReading troca pelo glifo.
// Negrito: **texto**.

export type GlyphKey =
  | "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo" | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces"
  | "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto"
  | "conjunction" | "sextile" | "trine" | "mc" | "asc";

export type Block =
  | { p: string }
  | { h3: string }
  | { list: string[] }
  | { steps: string[] }
  | { quote: string }
  | { note: string }
  | { cards: { glyph: GlyphKey; title: string; label: string; text: string }[] }
  | { versus: { glyph: GlyphKey; title: string; text: string }[] }
  | { table: { head: string[]; rows: string[][] } };

export interface ReadingSection {
  id: string;
  number: string;
  glyphs: GlyphKey[];
  title: string;
  blocks: Block[];
}

export interface Reading {
  eyebrow: string;
  title: string;
  tocLabel: string;
  intro: Block[];
  sections: ReadingSection[];
}

export const READING: Reading = {
  eyebrow: "Leitura do mapa",
  title: "O mapa de Bernardo em profundidade",
  tocLabel: "Nesta leitura",
  intro: [
    { p: "O mapa astral de Bernardo reúne uma combinação particularmente interessante. Não necessariamente fácil, mas marcada por três elementos que, simbolicamente, puxam a personalidade em direções bem diferentes:" },
    {
      cards: [
        { glyph: "capricorn", title: "Capricórnio", label: "Sol", text: "Necessidade de construir, conquistar, estruturar e encontrar um lugar no mundo." },
        { glyph: "scorpio", title: "Escorpião", label: "Lua", text: "Intensidade emocional, profundidade psicológica, desconfiança e desejo de entender o que está por trás das aparências." },
        { glyph: "pisces", title: "Peixes", label: "Ascendente", text: "Sensibilidade, imaginação, idealismo, empatia e uma relação intuitiva com a realidade." },
      ],
    },
    { p: "O resultado é um mapa com bastante água, uma presença importante de signos fixos e cardinais e uma concentração de energia em Aquário." },
    { quote: "É o mapa simbólico de alguém que deseja construir uma vida concreta, mas que vive o mundo interior com uma intensidade que nem sempre se traduz em realizações exteriores." },
    { note: "Astrologia é uma linguagem simbólica e interpretativa, não um método cientificamente validado de descrever a personalidade. Esta leitura explora arquétipos; não é um diagnóstico nem uma sentença sobre quem Bernardo é." },
  ],
  sections: [
    {
      id: "estrutura",
      number: "1",
      glyphs: ["sun", "capricorn", "moon", "scorpio"],
      title: "A estrutura fundamental da personalidade",
      blocks: [
        {
          cards: [
            { glyph: "capricorn", title: "Sol em Capricórnio · 24°39′", label: "Identidade e propósito", text: "Uma identidade associada à realização, à autonomia, à competência e à construção de algo com valor duradouro." },
            { glyph: "scorpio", title: "Lua em Escorpião · 15°26′", label: "Mundo emocional", text: "Uma vida emocional intensa, reservada e profunda. Nem tudo o que é sentido aparece, o que não significa sentir pouco." },
            { glyph: "pisces", title: "Ascendente em Peixes · 20°54′", label: "Expressão exterior", text: "Sensibilidade, imaginação, adaptabilidade e uma maneira intuitiva de perceber ambientes e pessoas." },
          ],
        },
        { h3: "Sol em Capricórnio: a necessidade de construir alguma coisa" },
        { p: "Capricórnio é regido por Saturno, planeta associado ao tempo, à responsabilidade, à disciplina, aos limites e à maturação. É um signo frequentemente ligado à ambição, mas reduzi-lo à ambição material seria superficial." },
        { p: "Há uma questão mais profunda: **a necessidade de justificar a própria existência por meio daquilo que se constrói.** O capricorniano costuma ter uma relação particular com o tempo: uma preocupação com o futuro, com o que ainda precisa ser conquistado e com a distância entre o que se é e o que se gostaria de ser." },
        { p: "Isso pode produzir algumas características:" },
        {
          list: [
            "Necessidade de independência.",
            "Preocupação com estabilidade e segurança.",
            "Desejo de desenvolver competências reais.",
            "Dificuldade em aceitar a própria mediocridade.",
            "Tendência a medir o próprio valor pelas realizações.",
            "Impaciência com situações sem perspectiva de progresso.",
          ],
        },
        { p: "O Sol está a 24° de Capricórnio. Não existe uma interpretação amplamente aceita de que esse grau produza uma personalidade específica; o que pesa mais é a combinação com o restante do mapa." },
        { h3: "A sombra de Capricórnio" },
        { p: "O risco de uma identidade muito ligada à realização é confundir fracasso circunstancial com fracasso existencial. Uma oportunidade perdida deixa de ser apenas uma oportunidade perdida; um período de estagnação passa a parecer prova de incapacidade pessoal. Pode surgir uma espécie de tribunal interno, em que tudo está sempre sendo avaliado." },
        { p: "Capricórnio também pode ter dificuldade em aproveitar o presente, porque está sempre ocupado com a próxima etapa. É como se a vida estivesse permanentemente em preparação." },
        { quote: "A grande lição simbólica desse Sol é construir uma vida sem transformar a própria existência num projeto de desempenho permanente." },
        { h3: "Lua em Escorpião: a intensidade que não aparece de imediato" },
        { p: "É uma das posições mais interessantes do mapa. Na astrologia tradicional, a Lua está em queda em Escorpião: não é uma posição ruim, mas as necessidades emocionais simbolizadas pela Lua encontram ali um ambiente considerado desafiador." },
        { p: "A Lua representa necessidades afetivas, segurança emocional, intimidade, hábitos e a forma de processar sentimentos. Escorpião está associado a intensidade, transformação, vulnerabilidade, poder, perda e regeneração. Juntas, sugerem alguém com dificuldade em viver emoções de forma superficial." },
        { p: "Gostar de alguém tende a vir acompanhado da vontade de entender essa pessoa a fundo: sua história, suas contradições, seus desejos e motivações. Um assunto interessante pede ir muito além da superfície. Uma experiência emocional pode continuar sendo elaborada muito depois de terminar." },
        { h3: "A necessidade de profundidade" },
        { p: "A Lua em Escorpião traz uma necessidade forte de confiança. Bernardo pode ser sociável, conversar com pessoas diferentes e se mostrar aberto, sem que isso signifique dar a qualquer um acesso ao mundo interior. Intimidade e proximidade não são a mesma coisa: a intimidade exige confiança, e a confiança é construída devagar." },
        {
          list: [
            "Observar muito antes de confiar.",
            "Perceber inconsistências no comportamento das pessoas.",
            "Ter dificuldade em esquecer experiências marcantes.",
            "Sentir necessidade de entender as motivações ocultas dos outros.",
            "Viver sentimentos contraditórios ao mesmo tempo.",
            "Ter dificuldade com situações afetivas indefinidas.",
          ],
        },
        { h3: "A sombra da Lua em Escorpião" },
        { p: "O perigo dessa posição é transformar profundidade em ruminação. Compreender uma experiência é diferente de ficar psicologicamente preso a ela: é possível continuar investigando uma situação que já não oferece informação nova, em busca de uma explicação definitiva. Também pode haver a tendência de ver a vulnerabilidade como perda de controle, quando, na verdade, a intimidade depende dela." },
        { quote: "Essa Lua pede profundidade, mas precisa aprender que nem toda experiência precisa ser investigada até o último detalhe para poder ser encerrada." },
      ],
    },
    {
      id: "ascendente",
      number: "2",
      glyphs: ["asc", "pisces"],
      title: "Ascendente em Peixes: como ele se apresenta ao mundo",
      blocks: [
        { p: "Aqui aparece uma das contradições mais interessantes do mapa. Capricórnio é associado à estrutura, Escorpião à intensidade e Peixes à dissolução de fronteiras." },
        { p: "O ascendente representa a forma de entrar em contato com o mundo, a expressão espontânea e a primeira impressão. Com Peixes nessa posição, existe uma dimensão mais fluida, imaginativa e receptiva, frequentemente associada a pessoas que absorvem muito do ambiente: mudanças de humor, tensões e nuances na comunicação são percebidas sem que se saiba explicar exatamente como." },
        { p: "A personalidade também pode mudar conforme o ambiente e as pessoas. Isso não indica falsidade ou falta de identidade; pode indicar adaptabilidade." },
        { h3: "O contraste entre Capricórnio e Peixes" },
        {
          versus: [
            { glyph: "capricorn", title: "Capricórnio", text: "Quer definir, organizar, construir e controlar. Quer um plano de cinco anos, segurança e resultados verificáveis." },
            { glyph: "pisces", title: "Peixes", text: "Quer experimentar, imaginar, sentir e transcender. Quer descobrir o que existe além do horizonte e valoriza o que não se mede." },
          ],
        },
        { p: "Essa combinação pode produzir imaginação considerável junto com o desejo de transformar ideias em coisas concretas. Combina bem, simbolicamente, com atividades criativas que exigem estrutura: desenvolvimento de software, escrita, design, produção artística, arquitetura de produtos e projetos autorais. Não porque o mapa determine aptidões, mas porque esses campos conciliam as duas necessidades." },
        { p: "Tradicionalmente, Peixes é regido por Júpiter; na astrologia moderna, também por Netuno. No mapa de Bernardo, os dois estão em Capricórnio, o mesmo signo do Sol, o que reforça a ligação entre a sensibilidade pisciana e a vontade de construir." },
      ],
    },
    {
      id: "mercurio",
      number: "3",
      glyphs: ["mercury", "aquarius"],
      title: "Mercúrio retrógrado em Aquário: uma inteligência independente",
      blocks: [
        { p: "**Mercúrio a 2°09′ de Aquário, retrógrado,** é uma posição muito interessante do ponto de vista intelectual. Mercúrio representa comunicação, pensamento, aprendizagem e processamento de informações. Aquário está associado à independência intelectual, à inovação, aos sistemas, à abstração e ao questionamento de convenções." },
        { p: "A combinação simboliza alguém que prefere entender a lógica de um sistema a simplesmente aprender a usá-lo. Conhecer procedimentos é diferente de compreender os princípios que os sustentam, e Aquário está muito mais ligado à segunda opção." },
        { h3: "Pensamento sistêmico" },
        {
          list: [
            "Tecnologia e inovação.",
            "Sistemas complexos.",
            "Filosofia e teoria.",
            "Ciências e abstrações.",
            "Ideias pouco convencionais.",
            "Relações entre campos diferentes do conhecimento.",
            "Questionamento de estruturas estabelecidas.",
          ],
        },
        { p: "Há também a possibilidade de pensar de forma não linear: começar investigando um problema específico e acabar descobrindo uma conexão com um assunto aparentemente distante. O pensamento aquariano procura padrões e estruturas gerais." },
        { h3: "O significado do movimento retrógrado" },
        { p: "Mercúrio retrógrado no mapa natal não significa problemas de comunicação nem dificuldade inevitável de aprendizagem. Costuma ser associado a um pensamento mais introspectivo: a ideia é processada por dentro antes de ser expressa, opiniões são revistas com frequência e a relação com a aprendizagem tende a ser menos convencional." },
        { p: "Pode existir uma tensão entre pensar muito e comunicar com clareza: saber o que se quer dizer, mas precisar reorganizar a ideia antes de explicá-la. Não é uma limitação intelectual, e sim uma diferença no processo de elaboração." },
      ],
    },
    {
      id: "marte",
      number: "4",
      glyphs: ["mars", "aquarius"],
      title: "Marte em Aquário: agir de maneira independente",
      blocks: [
        { p: "Marte está a 5°33′ de Aquário, e aqui há uma configuração importante: **Mercúrio e Marte estão em conjunção, a cerca de 3°24′ de distância.** É um aspecto bem próximo, que une pensamento e ação: Mercúrio é a mente; Marte é iniciativa, impulso, confronto, desejo e capacidade de agir." },
        { h3: "A força dessa conjunção" },
        { p: "Há uma tendência a agir quando surge uma ideia interessante. Executar ordens, por si só, motiva pouco; a motivação cresce quando há espaço para pensar, experimentar e decidir. A associação simbólica inclui:" },
        {
          list: [
            "Independência intelectual.",
            "Assertividade nas discussões.",
            "Curiosidade competitiva.",
            "Capacidade de defender ideias.",
            "Interesse em experimentar soluções.",
            "Impaciência com burocracia desnecessária.",
          ],
        },
        { p: "Aquário não se interessa por autoridade pela autoridade. Competência, conhecimento e inteligência são respeitados; hierarquias sem justificativa, nem tanto." },
        { h3: "A sombra da conjunção" },
        { p: "Mercúrio e Marte juntos também podem simbolizar uma mente combativa. Discussões estimulam, mas também desgastam, e pode haver reação rápida a ideias consideradas incoerentes, injustas ou intelectualmente desonestas. Outra face é a impaciência: querer resolver tudo na hora, sobretudo quando a solução já parece clara. O desafio é perceber que nem toda situação exige resposta imediata." },
        { quote: "Essa conjunção é um dos pontos mais fortes do mapa para a expressão intelectual independente." },
      ],
    },
    {
      id: "venus",
      number: "5",
      glyphs: ["venus", "pisces"],
      title: "Vênus em Peixes: romantismo, idealização e afeto",
      blocks: [
        { p: "Vênus está a 0°25′ de Peixes, uma posição tradicionalmente considerada de exaltação: Vênus estaria numa condição especialmente favorável para expressar suas qualidades. Vênus representa amor, prazer, beleza, relacionamentos e valores; Peixes acrescenta sensibilidade, imaginação, compaixão e idealização." },
        { h3: "O romantismo pisciano" },
        { p: "A posição é associada a uma forma idealista de viver o amor, o que não significa ser sentimental ou demonstrar afeto de maneira explícita. Significa que existe uma dimensão imaginativa importante nos relacionamentos: a paixão pode ser não só pela pessoa, mas pelo universo simbólico que ela representa — o jeito de falar, as contradições, os gostos, as fragilidades, a história." },
        { p: "Há uma tendência a enxergar possibilidades nas pessoas. Isso pode gerar relações muito significativas, mas também idealização." },
        { h3: "A dificuldade de estabelecer limites" },
        { p: "Peixes é associado à dissolução de fronteiras, e Vênus nesse signo costuma indicar generosidade afetiva considerável. O risco é confundir compreensão com obrigação de aceitar tudo: entender por que alguém age de certa forma não impede reconhecer que aquele comportamento não faz bem. Outra possibilidade é investir em pessoas indisponíveis, ambíguas ou difíceis de compreender." },
        { p: "O desafio é aprender a diferenciar:" },
        {
          list: [
            "Potencial de realidade.",
            "Empatia de reciprocidade.",
            "Química de compatibilidade.",
            "Compreensão de tolerância ilimitada.",
          ],
        },
        { p: "Vênus está praticamente no primeiro grau do signo. Isso não a torna mais forte nem mais fraca, mas simbolicamente toda a expressão venusiana do mapa está em território pisciano: amor, beleza e sensibilidade ocupam um lugar importante na forma de viver." },
      ],
    },
    {
      id: "meio-do-ceu",
      number: "6",
      glyphs: ["mc", "sagittarius"],
      title: "Meio do Céu em Sagitário: carreira e reconhecimento",
      blocks: [
        { p: "O Meio do Céu representa a dimensão pública da vida: carreira, reputação, reconhecimento e direção profissional. Sagitário, regido por Júpiter, está associado a expansão, conhecimento, exploração, liberdade, filosofia e horizontes amplos. Nessa posição, costuma indicar a necessidade de encontrar significado no trabalho: não basta ter uma ocupação, é preciso sentir que ela se conecta a algo maior." },
        { h3: "Carreira e liberdade" },
        {
          list: [
            "Ampliar os horizontes intelectuais.",
            "Trabalhar com conhecimento.",
            "Ter autonomia profissional.",
            "Experimentar áreas diferentes.",
            "Participar de projetos de alcance maior.",
            "Ter liberdade para desenvolver as próprias ideias.",
          ],
        },
        { p: "Sagitário não gosta de sentir que o mundo é pequeno. Isso pode aparecer em interesses variados, mudanças de direção e vontade de experimentar atividades diferentes, sem se limitar a uma única definição de si." },
        { h3: "O lado difícil" },
        { p: "A necessidade de expansão pode gerar insatisfação quando a realidade parece pequena demais, e dificuldade em aceitar trabalhos sem crescimento ou propósito. Também pode haver a tendência de imaginar possibilidades futuras sem construir um caminho consistente até elas. É aqui que os dois signos precisam trabalhar juntos:" },
        { quote: "Sagitário aponta para o horizonte. Capricórnio constrói a estrada." },
      ],
    },
    {
      id: "contradicoes",
      number: "7",
      glyphs: ["capricorn", "pisces", "scorpio", "aquarius"],
      title: "As grandes contradições do mapa",
      blocks: [
        { p: "Um mapa astral não é uma coleção de características positivas; o que o torna interessante são as tensões entre suas partes. No mapa de Bernardo aparecem quatro grandes conflitos simbólicos." },
        { h3: "Controle versus entrega" },
        {
          versus: [
            { glyph: "capricorn", title: "Capricórnio", text: "Estrutura, responsabilidade, planejamento, controle e segurança." },
            { glyph: "pisces", title: "Peixes", text: "Sensibilidade, espontaneidade, imaginação, fluidez e entrega." },
          ],
        },
        { p: "Há uma tensão entre querer controlar o próprio destino e reconhecer que nem tudo pode ser controlado. Em equilíbrio, produz alguém capaz de transformar inspiração em projetos concretos. Em desequilíbrio, gera frustração: a sensação de que deveria estar fazendo algo extraordinário, sem saber como organizar a vida para chegar lá." },
        { h3: "Intensidade emocional versus distanciamento intelectual" },
        { p: "A Lua está em Escorpião, mas Mercúrio e Marte estão em Aquário. Escorpião é emocionalmente intenso e interessado nas particularidades das relações; Aquário é associado ao distanciamento, à análise e à observação de sistemas amplos. Uma parte quer viver a situação a fundo; outra quer se afastar e analisá-la racionalmente. O risco é usar a análise como forma de não sentir; o potencial é compreender experiências emocionais com profundidade considerável." },
        { h3: "Reconhecimento versus autonomia" },
        { p: "Sol em Capricórnio e Meio do Céu em Sagitário apontam para realização pública e construção de uma trajetória. Marte em Aquário acrescenta uma necessidade de independência: desejar reconhecimento sem depender da aprovação dos outros, participar de estruturas profissionais sem abrir mão da liberdade de desenvolver as próprias ideias. O resultado pode ser uma relação ambivalente com instituições: querer fazer parte de algo sem perder a individualidade." },
        { h3: "Idealismo afetivo versus autoproteção" },
        { p: "Vênus em Peixes e Lua em Escorpião são duas posições de água, voltadas à profundidade e à conexão emocional, mas com diferenças importantes. Vênus em Peixes tende a idealizar, compreender e acolher; a Lua em Escorpião tende a investigar, se proteger e desconfiar antes de confiar. É como se uma parte quisesse acreditar no melhor das pessoas enquanto a outra procura sinais de que essa confiança pode ser traída. Isso torna os relacionamentos muito significativos, e também emocionalmente complexos." },
      ],
    },
    {
      id: "aspectos",
      number: "8",
      glyphs: ["conjunction", "sextile", "trine"],
      title: "Os aspectos entre os planetas",
      blocks: [
        { p: "Além dos signos, importam as relações angulares entre os planetas. Os orbes variam conforme a escola astrológica; estes são os aspectos mais claros entre as posições principais:" },
        {
          table: {
            head: ["Aspecto", "Distância", "Interpretação"],
            rows: [
              ["Mercúrio conjunção Marte", "3°24′", "Pensamento e ação integrados"],
              ["Sol sextil Ascendente", "3°45′", "Coerência entre identidade e expressão"],
              ["Lua trígono Ascendente", "5°28′", "Facilidade potencial de expressão emocional"],
              ["Sol sextil Lua", "9°13′", "Integração entre identidade e necessidades emocionais (aspecto amplo)"],
            ],
          },
        },
        { h3: "Sol sextil Ascendente" },
        { p: "Sugere uma relação relativamente harmoniosa entre o que Bernardo representa internamente e a forma como se apresenta. Não significa ausência de conflitos, mas a possibilidade de coerência entre identidade e comportamento." },
        { h3: "Lua trígono Ascendente" },
        { p: "Conecta o mundo emocional à expressão exterior. Pode indicar sensibilidade às pessoas, facilidade em transmitir emoções e uma presença percebida como acolhedora. Curiosamente, contrasta com a natureza reservada da Lua em Escorpião: é possível transmitir sensibilidade sem revelar tudo o que se sente." },
      ],
    },
    {
      id: "relacoes",
      number: "9",
      glyphs: ["venus", "moon", "asc"],
      title: "O mapa nas relações humanas",
      blocks: [
        { p: "A combinação de Vênus em Peixes, Lua em Escorpião e Ascendente em Peixes representa uma busca por conexão emocional significativa — não necessariamente por relacionamentos tradicionais. O que importa é a qualidade da conexão: interesse por pessoas complexas, criativas e diferentes, e pouca paciência para interações superficiais." },
        { p: "Há, porém, uma contradição: quanto maior o desejo de profundidade, maior a importância atribuída a certas relações, e maior a vulnerabilidade a decepções." },
        { quote: "A intensidade de uma experiência não prova que ela seja saudável ou recíproca. A profundidade de uma relação também se mede pela tranquilidade, pela consistência e pelo respeito que ela oferece." },
      ],
    },
    {
      id: "vocacao",
      number: "10",
      glyphs: ["aquarius", "capricorn"],
      title: "O mapa e a vocação criativa",
      blocks: [
        {
          list: [
            "**Sol em Capricórnio:** construção e materialização.",
            "**Mercúrio em Aquário:** pensamento independente e sistêmico.",
            "**Marte em Aquário:** iniciativa e experimentação.",
            "**Ascendente em Peixes:** imaginação e sensibilidade.",
            "**Meio do Céu em Sagitário:** expansão e conhecimento.",
          ],
        },
        { p: "Simbolicamente, é uma combinação interessante para atividades que misturam criatividade e técnica: desenvolvimento de ferramentas e produtos, design de software, escrita e produção intelectual, cinema e narrativa, arquitetura de sistemas, pesquisa e inovação, empreendedorismo tecnológico." },
        { p: "O mais interessante é o encontro de Aquário com Capricórnio. Aquário quer experimentar o futuro; Capricórnio quer construir algo que sobreviva ao tempo. Peixes acrescenta imaginação, e Sagitário, visão. É uma composição que pode ser lida como a busca por transformar ideias abstratas em algo concreto, útil e significativo — sem que o mapa determine profissão ou desempenho." },
      ],
    },
    {
      id: "casas",
      number: "11",
      glyphs: ["asc", "pisces"],
      title: "Uma leitura das casas",
      blocks: [
        { p: "Usando o sistema de casas inteiras (Whole Sign), com Peixes como primeira casa, a distribuição fica assim:" },
        {
          table: {
            head: ["Casa", "Signo", "Tema", "No mapa"],
            rows: [
              ["1ª", "Peixes", "Identidade e aparência", "Ascendente, Vênus e Saturno"],
              ["9ª", "Escorpião", "Filosofia, estudos e visão de mundo", "Lua"],
              ["10ª", "Sagitário", "Carreira e reputação", "Meio do Céu e Plutão"],
              ["11ª", "Capricórnio", "Projetos, redes e aspirações", "Sol, Júpiter e Netuno"],
              ["12ª", "Aquário", "Inconsciente e vida interior", "Mercúrio, Marte e Urano"],
            ],
          },
        },
        { p: "**Sol na 11ª casa:** a realização pessoal se relaciona com a construção de projetos, a participação em grupos e comunidades e os objetivos de longo prazo." },
        { p: "**Lua na 9ª casa:** as necessidades emocionais se associam à busca de significado. Filosofia, história, política, viagens e conhecimento ganham importância subjetiva." },
        { p: "**Mercúrio e Marte na 12ª casa:** a vida intelectual pode ser muito mais ativa por dentro do que os outros percebem, com tendência a trabalhar problemas nos bastidores, refletir sozinho e desenvolver ideias em momentos de isolamento." },
        { p: "**Vênus na 1ª casa:** a expressão pessoal tem uma dimensão estética, artística e afetiva importante; na tradição, essa posição também é associada a uma presença social agradável." },
        { note: "Em outros sistemas, como Placidus, as casas podem mudar. Esta seção é uma leitura possível, não a única." },
      ],
    },
    {
      id: "desafios",
      number: "12",
      glyphs: ["saturn"],
      title: "Os pontos mais difíceis do mapa",
      blocks: [
        { p: "Uma leitura extensa não deveria falar só de potenciais. Alguns padrões simbólicos merecem atenção:" },
        {
          table: {
            head: ["Configuração", "Possível dificuldade"],
            rows: [
              ["Sol em Capricórnio", "Autocobrança excessiva"],
              ["Lua em Escorpião", "Ruminação e dificuldade em soltar experiências"],
              ["Ascendente em Peixes", "Limites pessoais pouco definidos"],
              ["Mercúrio conjunção Marte", "Impaciência intelectual e confronto"],
              ["Vênus em Peixes", "Idealização de relacionamentos"],
              ["Meio do Céu em Sagitário", "Insatisfação com horizontes limitados"],
            ],
          },
        },
        { p: "Combinadas de forma desequilibrada, essas características descreveriam alguém que:" },
        {
          steps: [
            "Tem expectativas altas sobre o que deveria conquistar.",
            "Sente profundamente quando as coisas não acontecem.",
            "Passa muito tempo tentando entender por que não aconteceram.",
            "Idealiza possibilidades futuras.",
            "Tem dificuldade em aceitar situações que considera limitantes.",
            "Precisa encontrar um jeito de transformar tudo isso em ação concreta.",
          ],
        },
        { p: "A expressão mais madura seria a de alguém que:" },
        {
          steps: [
            "Desenvolve ambição sem se tornar refém dela.",
            "Processa emoções sem ficar aprisionado nelas.",
            "Preserva a sensibilidade sem abrir mão dos próprios limites.",
            "Usa a inteligência para construir, e não apenas para questionar.",
            "Mantém a imaginação e também desenvolve consistência.",
            "Reconhece o próprio valor independentemente do reconhecimento externo.",
          ],
        },
      ],
    },
    {
      id: "sintese",
      number: "13",
      glyphs: ["sun", "moon", "asc"],
      title: "Síntese: o personagem desse mapa",
      blocks: [
        { p: "Transformado em personagem literário, esse mapa não descreveria um capricorniano convencional, pragmático e inteiramente voltado ao sucesso material, mas alguém mais contraditório." },
        { p: "Uma pessoa com uma dimensão intelectual independente, que gosta de entender estruturas, questionar convenções e desenvolver as próprias ideias. Alguém com uma vida interior intensa, nem sempre fácil de comunicar. Que deseja construir algo relevante, conquistar autonomia e ter uma trajetória respeitável, mas que também precisa de beleza, imaginação, afeto e liberdade." },
        { p: "Há uma tensão entre o desejo de pertencer e o de ser independente; entre querer segurança e desejar aventura; entre compreender racionalmente as coisas e simplesmente viver; entre a necessidade de reconhecimento e a vontade de não depender da aprovação de ninguém." },
        { quote: "Um construtor com alma de artista, mente de inventor e a sensibilidade de quem observa muito mais do que demonstra." },
        { note: "É a síntese arquetípica construída a partir dessas posições, não uma definição de quem Bernardo necessariamente é." },
      ],
    },
  ],
};
