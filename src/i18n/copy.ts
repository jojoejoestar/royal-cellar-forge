import type { WineRegion } from "@/content/wines";
import type { Locale } from "@/i18n/types";

export type NavLinkCopy = {
  href: string;
  label: string;
  footerLabel?: string;
};

export type RegionFilterId = "all" | WineRegion;

export type Copy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };
  nav: {
    links: NavLinkCopy[];
    vip: string;
    menuAria: string;
    langSwitch: string;
    langHref: string;
    langAria: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineGold: string;
    headlineRest: string;
    description: string;
    ctaCellar: string;
    ctaMaster: string;
    stats: { value: string; label: string }[];
    discover: string;
    imageAlt: string;
  };
  philosophy: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    description: string;
    latin: string;
    imageAlt: string;
    pillars: { title: string; text: string }[];
  };
  heritage: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    description: string;
    relicKicker: string;
    relicTitle: string;
    relicAlt: string;
    fruitKicker: string;
    fruitTitle: string;
    fruitAlt: string;
    sanctuaryKicker: string;
    sanctuaryTitle: string;
    sanctuaryAlt: string;
    timelineKicker: string;
    timelineTitle: string;
    quote: string;
    quoteGold: string;
    manifesto: string;
    eras: { year: string; title: string; text: string }[];
  };
  catalog: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    titleRest: string;
    descriptionMobile: string;
    descriptionDesktop: string;
    notes: string;
    inquire: string;
    prevLabel: string;
    nextLabel: string;
    showLabel: (name: string) => string;
    slideLabel: (index: number) => string;
  };
  gallery: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    titleRest: string;
    description: string;
    searchPlaceholder: string;
    vintage: (year: string) => string;
    viewSheet: string;
    emptyTitle: string;
    emptyHint: string;
    prevLabel: string;
    nextLabel: string;
    tastingNotes: string;
    pairing: string;
    story: string;
    availability: string;
    closeSheet: string;
    fiveStars: string;
    regions: { id: RegionFilterId; label: string }[];
  };
  wineDetails: {
    vintage: (year: string) => string;
    tastingNotes: string;
    pairing: string;
    marketPrice: string;
    inquire: string;
  };
  sommelier: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    quote: string;
    bio: string;
    diploma: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  tasting: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    titleRest: string;
    description: string;
    sacredAct: string;
    decanterTitle: string;
    decanterText: string;
    pourAlt: string;
    movement: string;
    tearsTitle: string;
    swirlAlt: string;
    communion: string;
    memoriesTitle: string;
    noseAlt: string;
    quoteLead: string;
    quoteGold: string;
    quoteRest: string;
    manifesto: string;
    steps: { roman: string; title: string; subtitle: string; text: string }[];
  };
  chalet: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    description: string;
    descriptionGold: string;
    salonKicker: string;
    salonTitle: string;
    interiorAlt: string;
    location: string;
    exteriorAlt: string;
    candlelight: string;
    tableAlt: string;
    quote: string;
    quoteBy: string;
    staysKicker: string;
    staysText: string;
    cta: string;
    experiences: { title: string; desc: string }[];
  };
  faq: {
    eyebrow: string;
    titleLead: string;
    titleGold: string;
    titleRest: string;
    items: { q: string; a: string }[];
  };
  confraria: {
    badge: string;
    titleLead: string;
    titleGold: string;
    descriptionLead: string;
    descriptionGold: string;
    descriptionRest: string;
    perks: string[];
    formTitle: string;
    formEyebrow: string;
    successTitle: string;
    successText: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    grapeLabel: string;
    grapePlaceholder: string;
    grapeOptions: string[];
    submit: string;
    finePrint: string;
  };
  footer: {
    blurb: string;
    navigation: string;
    contact: string;
    location: string;
    rights: string;
  };
  a11y: {
    close: string;
    grapeSeal: string;
  };
};

const copyPt: Copy = {
  meta: {
    title: "Cave Royale · Adega de Vinhos Finos · Curadoria Privada",
    description:
      "Curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a excelência absoluta e o verdadeiro sabor do terroir.",
    ogTitle: "Cave Royale · Adega de Vinhos Finos · Curadoria Privada",
    ogDescription:
      "Curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a excelência absoluta e o verdadeiro sabor do terroir.",
    ogImageAlt: "Cave Royale",
  },
  nav: {
    links: [
      { href: "#acervo", label: "Acervo" },
      { href: "#galeria", label: "Galeria", footerLabel: "Galeria de Rótulos" },
      { href: "#heritage", label: "Heritage" },
      { href: "#sommelier", label: "O Sommelier" },
      { href: "#degustacao", label: "Degustação", footerLabel: "Ritual de Degustação" },
      { href: "#chale", label: "O Chalé" },
      { href: "#confraria", label: "Confraria" },
    ],
    vip: "Acesso VIP",
    menuAria: "Menu",
    langSwitch: "EN",
    langHref: "/en",
    langAria: "English version",
  },
  hero: {
    eyebrow: "Curadoria Privada · Desde 1987",
    headline: "O Tempo Engarrafado.",
    headlineGold: "A Realeza",
    headlineRest: "em Cada Taça.",
    description:
      "Uma curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a excelência absoluta e o verdadeiro sabor do terroir.",
    ctaCellar: "Explorar o Acervo Privado",
    ctaMaster: "Conhecer o Mestre",
    stats: [
      { value: "37+", label: "Anos de Curadoria" },
      { value: "120", label: "Vinícolas Premiadas" },
      { value: "∞", label: "Memórias Eternas" },
    ],
    discover: "Descubra",
    imageAlt: "Adega real iluminada com luz dourada",
  },
  philosophy: {
    eyebrow: "A Filosofia",
    titleLead: "Onde o Solo",
    titleGold: "Dita o Destino.",
    description:
      "Não vendemos vinhos. Custodiamos cápsulas líquidas do tempo - meticulosamente eleitas dos vinhedos mais nobres da Borgonha, Toscana e do Vale do Douro. Cada rótulo da Cave Royale carrega o silêncio de gerações, a paciência das pedras e a ousadia de mestres vignerons que recusam atalhos.",
    latin: "· In Vino Veritas ·",
    imageAlt: "Taça de cristal com vinho tinto profundo iluminada por luz dourada",
    pillars: [
      {
        title: "Solo",
        text: "Cada terroir guarda séculos de minerais que dialogam com a videira.",
      },
      {
        title: "Clima",
        text: "Estações que esculpem caráter, taninos e a alma de cada safra.",
      },
      {
        title: "Mãos",
        text: "Vignerons que tratam a uva como se fosse herança da família.",
      },
    ],
  },
  heritage: {
    eyebrow: "Patrimônio · Heritage",
    titleLead: "A Bebida que Selou",
    titleGold: "Impérios e Eternidades.",
    description:
      "Antes da escrita, antes das catedrais, antes das coroas - havia o vinho. Companheiro de faraós, sacerdotes e imperadores, o néctar da videira atravessou oito mil anos como o brinde silencioso de toda civilização que se ousou chamar nobre. Beber vinho é assinar um pacto com a história.",
    relicKicker: "· A Relíquia ·",
    relicTitle: "O cálice das dinastias",
    relicAlt: "Cálice real cravejado de rubis sobre mesa medieval com pergaminho selado",
    fruitKicker: "· O Fruto ·",
    fruitTitle: "Vitis Vinifera",
    fruitAlt: "Cacho de uvas tintas com folhas douradas em pintura barroca",
    sanctuaryKicker: "· O Santuário ·",
    sanctuaryTitle: "Catedrais subterrâneas",
    sanctuaryAlt: "Catedral subterrânea com fileiras de barris e candelabros dourados",
    timelineKicker: "· Oito Mil Anos ·",
    timelineTitle: "Uma cronologia da nobreza líquida",
    quote: "“O vinho é a única obra de arte que se pode beber. Toda taça erguida é, em silêncio, uma ",
    quoteGold: "coroação.",
    manifesto: "- Manifesto Cave Royale",
    eras: [
      {
        year: "6000 a.C.",
        title: "A Origem Sagrada",
        text: "Nas encostas do Cáucaso, os primeiros vinhedos brotam. O homem descobre que o suco da uva, quando cultivado pelo tempo, transcende a sede - torna-se ritual.",
      },
      {
        year: "Antiguidade",
        title: "Néctar dos Deuses",
        text: "Egípcios o ofertam a Osíris. Gregos o consagram a Dionísio. Romanos o levam por todo o império em ânforas seladas. O vinho deixa de ser bebida - torna-se cultura.",
      },
      {
        year: "Idade Média",
        title: "A Bebida da Coroa",
        text: "Monges beneditinos refinam a vinificação. Reis e cardeais brindam tratados, alianças e conquistas. Cada taça selada com cera carrega a assinatura de uma dinastia.",
      },
    ],
  },
  catalog: {
    eyebrow: "O Acervo Privado",
    titleLead: "Um ",
    titleGold: "Museu Vivo",
    titleRest: "em Sua Taça.",
    descriptionMobile:
      "Deslize o palco ou use as setas — a curadoria avança sozinha enquanto você aprecia.",
    descriptionDesktop: "Passe sobre cada rótulo para revelar suas notas de degustação.",
    notes: "Notas",
    inquire: "Consultar Valor →",
    prevLabel: "Rótulo anterior",
    nextLabel: "Próximo rótulo",
    showLabel: (name) => `Exibir ${name}`,
    slideLabel: (index) => `Slide ${index}`,
  },
  gallery: {
    eyebrow: "Galeria de Rótulos Raros",
    titleLead: "Tesouros ",
    titleGold: "Selecionados",
    titleRest: "por Terroir.",
    description:
      "Filtre por região, percorra o carrossel e descubra a história completa de cada relíquia em nosso acervo privado.",
    searchPlaceholder: "Buscar rótulo, safra...",
    vintage: (year) => `Safra ${year}`,
    viewSheet: "Ver Ficha Completa →",
    emptyTitle: "Nenhum rótulo encontrado.",
    emptyHint: "Ajuste os filtros para revelar outros tesouros.",
    prevLabel: "Anterior",
    nextLabel: "Próximo",
    tastingNotes: "Notas de Degustação",
    pairing: "Harmonização",
    story: "A História",
    availability: "Disponibilidade",
    closeSheet: "Fechar ficha",
    fiveStars: "Classificação cinco estrelas",
    regions: [
      { id: "all", label: "Todos" },
      { id: "França", label: "França" },
      { id: "Itália", label: "Itália" },
      { id: "Espanha", label: "Espanha" },
      { id: "Portugal", label: "Portugal" },
      { id: "Estados Unidos", label: "Estados Unidos" },
    ],
  },
  wineDetails: {
    vintage: (year) => `Safra ${year}`,
    tastingNotes: "Notas de Degustação",
    pairing: "Harmonização",
    marketPrice: "Preço de Mercado (750ml)",
    inquire: "Consultar Valor",
  },
  sommelier: {
    eyebrow: "O Sommelier",
    titleLead: "A Curadoria",
    titleGold: "do Mestre.",
    quote:
      '"Eu não escolho vinhos. Eu descubro heranças. Cada rótulo que entra nesta adega passou por uma conversa silenciosa entre o vigneron, a terra e o tempo - e meu papel é apenas reconhecer quando essa conversa atingiu a perfeição."',
    bio: "Henrique Valverde percorreu mais de 200 vinícolas em quatro continentes ao longo de três décadas. Formado em Bordeaux, certificado pela Court of Master Sommeliers e consultor de cartas premiadas em Michelin, ele é a única assinatura que valida cada rótulo da Cave Royale.",
    diploma: "Diploma Avançado · 2003",
    imageAlt: "O Mestre Sommelier da Cave Royale",
    stats: [
      { value: "30+", label: "Anos de ofício" },
      { value: "200+", label: "Vinícolas visitadas" },
      { value: "12", label: "Estrelas Michelin" },
    ],
  },
  tasting: {
    eyebrow: "Ritual de Degustação",
    titleLead: "Quatro Atos para uma ",
    titleGold: "Comunhão Sensorial",
    titleRest: ".",
    description:
      "A degustação de um grande vinho não é consumo. É cerimônia. Ato de silêncio, presença e gratidão diante de uma cápsula líquida do tempo.",
    sacredAct: "O Ato Sagrado",
    decanterTitle: "O Despertar do Decanter",
    decanterText:
      "Após décadas de sono, o vinho respira pela primeira vez. Cada segundo é uma camada que se revela.",
    pourAlt: "Decanter de cristal vertendo vinho em taça",
    movement: "Movimento",
    tearsTitle: "Lágrimas de Cristal",
    swirlAlt: "Macro do vinho sendo agitado em taça de cristal",
    communion: "Comunhão",
    memoriesTitle: "Memórias do Terroir",
    noseAlt: "Sommelier inspirando o aroma do vinho à luz de vela",
    quoteLead: "“Beber um grande vinho é ",
    quoteGold: "conversar com o tempo",
    quoteRest: " - uma audiência privada com séculos de paciência, sol e silêncio.”",
    manifesto: "Manifesto Cave Royale",
    steps: [
      {
        roman: "I",
        title: "O Olhar",
        subtitle: "Visus",
        text: "À luz dourada da vela, observamos a profundidade do rubi e a viscosidade que escorre como veludo nas paredes do cristal. A cor revela a idade. A lágrima revela o caráter.",
      },
      {
        roman: "II",
        title: "O Aroma",
        subtitle: "Olfactus",
        text: "Aproximamos a taça em silêncio reverente. Frutas negras, especiarias do Oriente, couro envelhecido, terra molhada. Cada inspiração revela uma camada esquecida do tempo.",
      },
      {
        roman: "III",
        title: "O Paladar",
        subtitle: "Gustus",
        text: "O primeiro gole atravessa séculos. Taninos sedosos abraçam a língua, a acidez vibra como uma sinfonia, e o final persiste por minutos infinitos. Aqui mora a verdade.",
      },
      {
        roman: "IV",
        title: "A Memória",
        subtitle: "Memoria",
        text: "O grande vinho não termina ao engolir. Ele permanece. Ele se torna recordação, conversa, herança. Um instante eterno gravado no paladar e na alma.",
      },
    ],
  },
  chalet: {
    eyebrow: "Um Convite Pessoal",
    titleLead: "O Chalé do",
    titleGold: "Mestre Valverde.",
    description:
      "Encravado entre vinhedos seculares, o refúgio particular de Henrique Valverde abre as portas - apenas algumas vezes ao ano - para hóspedes dispostos a viver o vinho como ele é vivido por quem o ama profundamente. Não é um hotel. É uma casa. ",
    descriptionGold: "A casa dele.",
    salonKicker: "O Salão Privativo",
    salonTitle: "Onde o silêncio se serve em taças.",
    interiorAlt: "Salão íntimo do chalé com lareira e adega particular",
    location: "Vale dos Vinhedos · Reservado",
    exteriorAlt: "Fachada do chalé alpino entre vinhedos ao entardecer",
    candlelight: "Jantar à Luz de Velas",
    tableAlt: "Mesa íntima posta com cristais e candelabros",
    quote:
      '"Aqui não recebo clientes. Recebo amigos do vinho. Quem cruza esta porta sai com mais do que memórias - sai com um pedaço da minha biblioteca líquida no paladar."',
    quoteBy: "- Henrique Valverde",
    staysKicker: "Estadias por Convite · 2026",
    staysText:
      "Devido à natureza íntima do espaço, recebemos no máximo oito hóspedes por temporada. Solicite seu convite e nossa curadoria entrará em contato pessoalmente.",
    cta: "Solicitar Convite ao Chalé",
    experiences: [
      {
        title: "Lareira & Decanters",
        desc: "Noites silenciosas diante do fogo, com decanters de cristal e safras escolhidas a dedo pelo próprio anfitrião.",
      },
      {
        title: "Vinhedo Privativo",
        desc: "Caminhadas ao amanhecer entre as videiras que cercam o chalé - terroir vivo, intocado pelo turismo.",
      },
      {
        title: "Acesso por Convite",
        desc: "Apenas oito hóspedes por temporada. Cada estadia é desenhada como uma carta pessoal de Henrique.",
      },
    ],
  },
  faq: {
    eyebrow: "Dúvidas Aristocráticas",
    titleLead: "Respostas ",
    titleGold: "à Altura",
    titleRest: "do Seu Padrão.",
    items: [
      {
        q: "Como é garantida a procedência de cada rótulo?",
        a: "Cada garrafa da Cave Royale percorre uma cadeia rastreada do produtor à sua taça. Importamos diretamente das vinícolas ou de leilões certificados (Sotheby's, Christie's), com documentação de origem, certificados de autenticidade do château e selos de exportação. Nada entra em nossa adega sem a assinatura pessoal do nosso Mestre Sommelier.",
      },
      {
        q: "Existe controle de temperatura no transporte?",
        a: "Sim, sem exceções. Operamos com containers refrigerados a 14°C e umidade controlada em 70%, monitorados por sensores IoT 24/7. A entrega final é realizada em veículos climatizados próprios, com janela de horário acordada e protocolo de assinatura. Sua safra histórica chega como saiu da adega de origem.",
      },
      {
        q: "Vocês buscam rótulos raros sob encomenda?",
        a: "Esta é uma das vocações da nossa Confraria. Membros VIP têm acesso ao serviço de Wine Hunter - nossa rede internacional localiza safras descontinuadas, formatos magnum, jeroboam e edições limitadas. O prazo médio de localização é de 4 a 12 semanas, com preview fotográfico antes da aquisição.",
      },
      {
        q: "Qual o investimento médio para integrar a Confraria?",
        a: "A Confraria Cave Royale opera por convite e curadoria de perfil. Não trabalhamos com mensalidades - trabalhamos com relacionamento. O ticket médio anual de nossos membros gravita entre R$ 80 mil e R$ 600 mil, mas o valor real está no acesso prioritário a alocações limitadas que jamais chegam ao mercado público.",
      },
      {
        q: "Oferecem consultoria para montagem de adega particular?",
        a: "Absolutamente. Nosso serviço Cellar Architecture acompanha desde o projeto técnico (climatização, iluminação UV-free, sistemas anti-vibração) até a curadoria estratégica de portfólio com horizonte de 5, 10 e 25 anos - pensando guarda, valorização e legado familiar.",
      },
    ],
  },
  confraria: {
    badge: "Acesso por Convite",
    titleLead: "A Excelência",
    titleGold: "Não Aceita Espera.",
    descriptionLead: "A Confraria Cave Royale recebe apenas ",
    descriptionGold: "37 novos membros por ano",
    descriptionRest:
      ". O cadastro é avaliado individualmente pelo nosso Mestre Sommelier e o retorno acontece em até 72 horas.",
    perks: [
      "Alocação prioritária de safras limitadas",
      "Wine Hunter para rótulos sob encomenda",
      "Degustações privadas com vignerons internacionais",
      "Consultoria Cellar Architecture inclusa",
    ],
    formTitle: "Solicitação de Ingresso",
    formEyebrow: "Confraria Cave Royale · 2026",
    successTitle: "Solicitação Recebida.",
    successText: "Em até 72 horas, nosso Mestre Sommelier entrará em contato pelo WhatsApp informado.",
    nameLabel: "Nome Completo",
    namePlaceholder: "Como deseja ser chamado",
    phoneLabel: "WhatsApp",
    phonePlaceholder: "+55 (11) 90000-0000",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    grapeLabel: "Preferência de Uva",
    grapePlaceholder: "Selecione...",
    grapeOptions: [
      "Cabernet Sauvignon",
      "Pinot Noir",
      "Sangiovese",
      "Chardonnay",
      "Champagne / Espumantes",
      "Tudo · Sou eclético",
    ],
    submit: "Solicitar Acesso VIP",
    finePrint: "Avaliação em até 72h · Sigilo absoluto",
  },
  footer: {
    blurb:
      "Curadoria privada de vinhos finos para paladares que reconhecem o tempo, a terra e o silêncio em cada gole.",
    navigation: "Navegação",
    contact: "Contato",
    location: "Pinto Bandeira · Serra Gaúcha · Brasil",
    rights: "Todos os direitos reservados · Aprecie com moderação",
  },
  a11y: {
    close: "Fechar",
    grapeSeal: "Selo de uvas",
  },
};

const copyEn: Copy = {
  meta: {
    title: "Cave Royale · Fine Wine Cellar · Private Curation",
    description:
      "An exclusive curation of rare labels and historic vintages. For palates that demand absolute excellence — and the true taste of terroir.",
    ogTitle: "Cave Royale · Fine Wine Cellar · Private Curation",
    ogDescription:
      "Rare labels. Historic vintages. Private curation for palates that refuse compromise.",
    ogImageAlt: "Cave Royale",
  },
  nav: {
    links: [
      { href: "#acervo", label: "Cellar" },
      { href: "#galeria", label: "Gallery", footerLabel: "Label Gallery" },
      { href: "#heritage", label: "Heritage" },
      { href: "#sommelier", label: "The Sommelier" },
      { href: "#degustacao", label: "Tasting", footerLabel: "Tasting Ritual" },
      { href: "#chale", label: "The Chalet" },
      { href: "#confraria", label: "The Circle" },
    ],
    vip: "VIP Access",
    menuAria: "Menu",
    langSwitch: "PT",
    langHref: "/",
    langAria: "Portuguese version",
  },
  hero: {
    eyebrow: "Private Curation · Est. 1987",
    headline: "Time, Bottled.",
    headlineGold: "Royalty",
    headlineRest: "in Every Glass.",
    description:
      "An exclusive curation of rare labels and historic vintages. For palates that demand absolute excellence — and the true taste of terroir.",
    ctaCellar: "Explore the Private Cellar",
    ctaMaster: "Meet the Master",
    stats: [
      { value: "37+", label: "Years of Curation" },
      { value: "120", label: "Award-Winning Estates" },
      { value: "∞", label: "Lasting Memories" },
    ],
    discover: "Discover",
    imageAlt: "A royal cellar washed in golden light",
  },
  philosophy: {
    eyebrow: "The Philosophy",
    titleLead: "Where the Soil",
    titleGold: "Writes Destiny.",
    description:
      "We don't sell wine. We keep liquid time capsules — chosen, with obsessive care, from the noblest vineyards of Burgundy, Tuscany, and the Douro Valley. Every Cave Royale label carries the silence of generations, the patience of stone, and the daring of master vignerons who refuse shortcuts.",
    latin: "· In Vino Veritas ·",
    imageAlt: "A crystal glass of deep red wine lit in gold",
    pillars: [
      {
        title: "Soil",
        text: "Every terroir holds centuries of minerals in quiet conversation with the vine.",
      },
      {
        title: "Climate",
        text: "Seasons that sculpt character, tannin, and the soul of each vintage.",
      },
      {
        title: "Hands",
        text: "Vignerons who treat the grape as if it were a family inheritance.",
      },
    ],
  },
  heritage: {
    eyebrow: "Patrimony · Heritage",
    titleLead: "The Drink That Sealed",
    titleGold: "Empires and Eternities.",
    description:
      "Before writing, before cathedrals, before crowns — there was wine. Companion to pharaohs, priests, and emperors, the nectar of the vine has crossed eight thousand years as the quiet toast of every civilization that dared to call itself noble. To drink wine is to sign a pact with history.",
    relicKicker: "· The Relic ·",
    relicTitle: "The chalice of dynasties",
    relicAlt: "A royal chalice set with rubies on a medieval table beside a sealed parchment",
    fruitKicker: "· The Fruit ·",
    fruitTitle: "Vitis Vinifera",
    fruitAlt: "A cluster of red grapes with gilded leaves in a baroque painting",
    sanctuaryKicker: "· The Sanctuary ·",
    sanctuaryTitle: "Underground cathedrals",
    sanctuaryAlt: "An underground cathedral of barrels lit by golden candelabra",
    timelineKicker: "· Eight Thousand Years ·",
    timelineTitle: "A chronology of liquid nobility",
    quote: "“Wine is the only work of art you can drink. Every glass raised is, in silence, a ",
    quoteGold: "coronation.",
    manifesto: "- Cave Royale Manifesto",
    eras: [
      {
        year: "6000 BCE",
        title: "The Sacred Origin",
        text: "On the slopes of the Caucasus, the first vineyards take root. Man discovers that the juice of the grape, when cultivated by time, transcends thirst — it becomes ritual.",
      },
      {
        year: "Antiquity",
        title: "Nectar of the Gods",
        text: "Egyptians offer it to Osiris. Greeks consecrate it to Dionysus. Romans carry it across the empire in sealed amphorae. Wine ceases to be a drink — it becomes culture.",
      },
      {
        year: "Middle Ages",
        title: "The Crown's Cup",
        text: "Benedictine monks refine the craft. Kings and cardinals toast treaties, alliances, and conquests. Every wax-sealed glass carries the signature of a dynasty.",
      },
    ],
  },
  catalog: {
    eyebrow: "The Private Cellar",
    titleLead: "A ",
    titleGold: "Living Museum",
    titleRest: "in Your Glass.",
    descriptionMobile: "Swipe the stage or use the arrows — the curation moves on while you look.",
    descriptionDesktop: "Hover each label to reveal its tasting notes.",
    notes: "Notes",
    inquire: "Inquire →",
    prevLabel: "Previous label",
    nextLabel: "Next label",
    showLabel: (name) => `Show ${name}`,
    slideLabel: (index) => `Slide ${index}`,
  },
  gallery: {
    eyebrow: "Gallery of Rare Labels",
    titleLead: "Treasures ",
    titleGold: "Chosen",
    titleRest: "by Terroir.",
    description:
      "Filter by region, travel the carousel, and open the full story of every relic in our private cellar.",
    searchPlaceholder: "Search label, vintage...",
    vintage: (year) => `Vintage ${year}`,
    viewSheet: "View Full Profile →",
    emptyTitle: "No labels found.",
    emptyHint: "Adjust the filters to reveal other treasures.",
    prevLabel: "Previous",
    nextLabel: "Next",
    tastingNotes: "Tasting Notes",
    pairing: "Pairing",
    story: "The Story",
    availability: "Availability",
    closeSheet: "Close profile",
    fiveStars: "Five-star rating",
    regions: [
      { id: "all", label: "All" },
      { id: "França", label: "France" },
      { id: "Itália", label: "Italy" },
      { id: "Espanha", label: "Spain" },
      { id: "Portugal", label: "Portugal" },
      { id: "Estados Unidos", label: "United States" },
    ],
  },
  wineDetails: {
    vintage: (year) => `Vintage ${year}`,
    tastingNotes: "Tasting Notes",
    pairing: "Pairing",
    marketPrice: "Market Price (750ml)",
    inquire: "Inquire",
  },
  sommelier: {
    eyebrow: "The Sommelier",
    titleLead: "The Master's",
    titleGold: "Curation.",
    quote:
      '"I don\'t choose wines. I uncover inheritances. Every label that enters this cellar has passed through a silent conversation between vigneron, land, and time — and my only role is to recognize when that conversation has reached perfection."',
    bio: "Henrique Valverde has walked more than 200 estates across four continents over three decades. Trained in Bordeaux, certified by the Court of Master Sommeliers, and advisor to Michelin-starred lists, his is the only signature that validates a Cave Royale label.",
    diploma: "Advanced Diploma · 2003",
    imageAlt: "The Master Sommelier of Cave Royale",
    stats: [
      { value: "30+", label: "Years at the craft" },
      { value: "200+", label: "Estates visited" },
      { value: "12", label: "Michelin stars" },
    ],
  },
  tasting: {
    eyebrow: "Tasting Ritual",
    titleLead: "Four Acts of ",
    titleGold: "Sensory Communion",
    titleRest: ".",
    description:
      "Tasting a great wine is not consumption. It is ceremony. An act of silence, presence, and gratitude before a liquid capsule of time.",
    sacredAct: "The Sacred Act",
    decanterTitle: "The Decanter Awakens",
    decanterText:
      "After decades of sleep, the wine breathes for the first time. Every second is another layer revealed.",
    pourAlt: "A crystal decanter pouring wine into a glass",
    movement: "Movement",
    tearsTitle: "Tears of Crystal",
    swirlAlt: "Macro of wine swirling in a crystal glass",
    communion: "Communion",
    memoriesTitle: "Memories of Terroir",
    noseAlt: "A sommelier breathing in the wine by candlelight",
    quoteLead: "“To drink a great wine is to ",
    quoteGold: "converse with time",
    quoteRest: " — a private audience with centuries of patience, sun, and silence.”",
    manifesto: "Cave Royale Manifesto",
    steps: [
      {
        roman: "I",
        title: "The Gaze",
        subtitle: "Visus",
        text: "By golden candlelight we watch the depth of the ruby and the viscosity that runs like velvet down the crystal. Color reveals age. The tear reveals character.",
      },
      {
        roman: "II",
        title: "The Aroma",
        subtitle: "Olfactus",
        text: "We draw the glass close in reverent silence. Black fruit, spices of the East, aged leather, wet earth. Each breath uncovers a forgotten layer of time.",
      },
      {
        roman: "III",
        title: "The Palate",
        subtitle: "Gustus",
        text: "The first sip crosses centuries. Silky tannins gather on the tongue, acidity rings like a symphony, and the finish lingers for infinite minutes. Here lives the truth.",
      },
      {
        roman: "IV",
        title: "The Memory",
        subtitle: "Memoria",
        text: "A great wine does not end when you swallow. It remains. It becomes recollection, conversation, inheritance. An eternal instant, etched on the palate and the soul.",
      },
    ],
  },
  chalet: {
    eyebrow: "A Personal Invitation",
    titleLead: "The Chalet of",
    titleGold: "Master Valverde.",
    description:
      "Set among century-old vines, Henrique Valverde's private refuge opens its doors — only a few times a year — to guests willing to live wine as it is lived by those who love it deeply. This is not a hotel. It is a house. ",
    descriptionGold: "His house.",
    salonKicker: "The Private Salon",
    salonTitle: "Where silence is served in glasses.",
    interiorAlt: "The chalet's intimate salon with a fireplace and a private cellar",
    location: "Vale dos Vinhedos · By invitation",
    exteriorAlt: "The alpine chalet among vineyards at dusk",
    candlelight: "Candlelit Dinner",
    tableAlt: "An intimate table set with crystal and candelabra",
    quote:
      '"I don\'t receive clients here. I receive friends of wine. Whoever crosses this door leaves with more than memories — they leave with a piece of my liquid library on the palate."',
    quoteBy: "- Henrique Valverde",
    staysKicker: "Stays by Invitation · 2026",
    staysText:
      "Given the intimacy of the house, we welcome no more than eight guests a season. Request your invitation and our curation will be in touch personally.",
    cta: "Request a Chalet Invitation",
    experiences: [
      {
        title: "Hearth & Decanters",
        desc: "Quiet nights by the fire, with crystal decanters and vintages chosen by the host himself.",
      },
      {
        title: "Private Vineyard",
        desc: "Dawn walks among the vines that surround the chalet — living terroir, untouched by tourism.",
      },
      {
        title: "By Invitation Only",
        desc: "Only eight guests a season. Each stay is written as a personal letter from Henrique.",
      },
    ],
  },
  faq: {
    eyebrow: "Aristocratic Questions",
    titleLead: "Answers ",
    titleGold: "Worthy",
    titleRest: "of Your Standard.",
    items: [
      {
        q: "How is the provenance of each label guaranteed?",
        a: "Every Cave Royale bottle travels a traced chain from producer to glass. We import directly from the estates or from certified auctions (Sotheby's, Christie's), with origin documents, château authenticity certificates, and export seals. Nothing enters our cellar without the personal signature of our Master Sommelier.",
      },
      {
        q: "Is temperature controlled in transit?",
        a: "Always — no exceptions. We ship in refrigerated containers at 14°C / 57°F and 70% humidity, monitored by IoT sensors around the clock. Final delivery is made in our own climate-controlled vehicles, on an agreed window, with a signature protocol. Your historic vintage arrives as it left the cellar of origin.",
      },
      {
        q: "Do you source rare labels on commission?",
        a: "It is one of the Circle's callings. VIP members have access to our Wine Hunter service — an international network that locates discontinued vintages, magnum and jeroboam formats, and limited editions. Average time to locate is 4 to 12 weeks, with a photographic preview before acquisition.",
      },
      {
        q: "What does it typically take to join the Circle?",
        a: "The Cave Royale Circle is by invitation and profile, not a subscription. There is no monthly fee — there is a relationship. Members typically commit between $15,000 and $110,000 a year. The real value is priority access to allocations that never reach the open market.",
      },
      {
        q: "Do you consult on private cellar design?",
        a: "Absolutely. Our Cellar Architecture service runs from the technical brief (climate control, UV-free lighting, anti-vibration systems) to a strategic portfolio with a 5-, 10-, and 25-year horizon — ageing, appreciation, and family legacy.",
      },
    ],
  },
  confraria: {
    badge: "By Invitation Only",
    titleLead: "Excellence",
    titleGold: "Doesn't Wait.",
    descriptionLead: "The Cave Royale Circle admits only ",
    descriptionGold: "37 new members a year",
    descriptionRest:
      ". Each application is reviewed personally by our Master Sommelier, with a reply within 72 hours.",
    perks: [
      "Priority allocation of limited vintages",
      "Wine Hunter for labels on commission",
      "Private tastings with international vignerons",
      "Cellar Architecture consulting included",
    ],
    formTitle: "Request Admission",
    formEyebrow: "Cave Royale Circle · 2026",
    successTitle: "Request Received.",
    successText: "Within 72 hours, our Master Sommelier will be in touch on the number you provided.",
    nameLabel: "Full Name",
    namePlaceholder: "How should we address you",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "+1 (212) 555-0100",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    grapeLabel: "Grape Preference",
    grapePlaceholder: "Select...",
    grapeOptions: [
      "Cabernet Sauvignon",
      "Pinot Noir",
      "Sangiovese",
      "Chardonnay",
      "Champagne / Sparkling",
      "All of it · I'm eclectic",
    ],
    submit: "Request VIP Access",
    finePrint: "Reviewed within 72 hours · Absolute discretion",
  },
  footer: {
    blurb:
      "Private curation of fine wines for palates that recognize time, land, and silence in every sip.",
    navigation: "Navigation",
    contact: "Contact",
    location: "Pinto Bandeira · Serra Gaúcha · Brazil",
    rights: "All rights reserved · Please drink responsibly",
  },
  a11y: {
    close: "Close",
    grapeSeal: "Grape seal",
  },
};

export const dictionaries: Record<Locale, Copy> = {
  pt: copyPt,
  en: copyEn,
};

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}
