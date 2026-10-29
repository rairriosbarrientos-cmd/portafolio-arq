// Textos y datos de contacto: portafolio PDF de ARQT y textos enviados por el Arq. Gustavo Ríos Barrientos.

export const site = {
  name: "ARQT",
  fullName: "ARQT Estudio de Arquitectura y Diseño",
  tagline: "Estudio de Arquitectura y Diseño",
  // Dominio final: NEXT_PUBLIC_SITE_URL si se define; si no, la URL que Netlify asigna en el build.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000",
  phone: "747 110 06 46",
  whatsapp: "527471100646",
  email: "arqt.estudio2004@gmail.com",
  social: "ARQT Estudio de Arquitectura y Diseño",
  facebook: "https://www.facebook.com/share/1CyiR3zu4u/" as string | null,
  // Pendiente: URL real de Instagram.
  instagram: null as string | null,
  base: "Guadalajara, Jal.",
  region: "Zona Metropolitana de Guadalajara",
  coords: "20°40′N · 103°21′O",
} as const;

export const quotes = {
  opening: "Crear es convertir una posibilidad en algo capaz de cambiar la manera de vivirla.",
  closingLead: "Cada espacio es una",
  closing: "decisión sobre cómo queremos vivir, sentir y pertenecer.",
};

export const about = [
  "ARQT Estudio de Arquitectura y Diseño es una firma enfocada en el desarrollo de proyectos residenciales y comerciales, donde la arquitectura se entiende como un equilibrio entre visión, funcionalidad y precisión constructiva.",
  "Integramos diseño arquitectónico, supervisión técnica, construcción, edificación y remodelación, acompañando cada proyecto desde su concepción hasta su materialización.",
  "Nuestra experiencia nos permite mirar la arquitectura desde dos perspectivas que deben coexistir: la del usuario que busca un espacio que haga sentido para su vida y la del inversionista que necesita tomar decisiones inteligentes sobre recursos, tiempos y valor.",
];

export const aboutClose = "En ARQT diseñamos con intención, construimos con rigor y acompañamos cada decisión con una visión integral.";

export const philosophy = {
  lead: "Diseñar no es imponer un estilo. Es interpretar una forma de vivir, trabajar o invertir.",
  body: [
    "En ARQT entendemos la arquitectura contemporánea como un lenguaje abierto. No partimos de una fórmula estética predeterminada; partimos de las necesidades, aspiraciones y posibilidades de cada proyecto.",
    "Buscamos crear espacios donde la estética tenga un propósito, donde la distribución responda al usuario y donde cada decisión arquitectónica encuentre sentido en su función.",
    "La experiencia constructiva nos permite llevar esta visión un paso más allá: anticipar cómo las decisiones tomadas en el diseño se traducirán en obra, materiales, tiempos y presupuesto.",
  ],
  close: "Porque una buena arquitectura no solamente debe verse bien.",
};

export const services = [
  {
    title: "Diseño Arquitectónico",
    text: "Conceptualización y desarrollo de proyectos residenciales y comerciales de acuerdo con las necesidades específicas de cada cliente.",
  },
  {
    title: "Supervisión Técnica",
    text: "Seguimiento especializado de los procesos constructivos para mantener el proyecto bajo criterios de calidad, precisión y cumplimiento.",
  },
  {
    title: "Construcción y Edificación",
    text: "Materialización integral del proyecto, coordinando los diferentes procesos y disciplinas involucradas en la obra.",
  },
  {
    title: "Remodelación",
    text: "Transformación y actualización de espacios existentes mediante soluciones que integran diseño, funcionalidad, estética y viabilidad constructiva.",
  },
  {
    title: "Dirección y Control de Obra",
    text: "Planeación, coordinación y seguimiento para mantener una visión integral sobre tiempos, recursos y ejecución.",
  },
];

export const architect = {
  name: "Arq. Gustavo Ríos Barrientos",
  role: "Director Fundador",
  headline: "18 años de experiencia entendiendo la arquitectura desde el diseño hasta la obra.",
  years: 18,
  bio: [
    "Detrás de ARQT Estudio de Arquitectura y Diseño se consolidan 18 años de mi trayectoria profesional dedicados a transformar ideas en realidades tangibles. Como fundador del estudio, he liderado proyectos de alta exigencia, especializándome con rigor en el diseño, la supervisión técnica y la construcción de espacios residenciales y comerciales.",
    "Mi llegada a la Zona Metropolitana de Guadalajara responde a una evolución natural. Traigo conmigo una madurez técnica y creativa lista para integrarse al dinamismo de esta región, ofreciendo soluciones de alto valor arquitectónico y un control absoluto en la ejecución de la obra.",
  ],
  signoff: "Bienvenido a ARQT Estudio, el espacio donde tu visión encuentra su mejor estructura.",
  credentials: [
    {
      scope: "Federal",
      items: [{ code: "6276469", label: "Cédula Profesional Federal" }],
    },
    {
      scope: "Guerrero",
      items: [
        { code: "12G029/DRO/082", label: "DRO Municipal" },
        { code: "12G029/DRO/CODUA/082", label: "Corresponsable de Obra en Diseño Urbano y Arquitectónico" },
        { code: "12G/DRO/188", label: "DRO Estatal" },
        { code: "CODUA 12G/CODUA/047", label: "Corresponsable de Obra en Diseño Urbano y Arquitectónico" },
      ],
    },
    {
      scope: "Jalisco",
      items: [{ code: "PEG 398631", label: "Cédula Profesional Estatal" }],
    },
  ],
};

export const focus = {
  title: "Foco absoluto.",
  lead: "He decidido concentrar mi experiencia exclusivamente en el sector residencial y comercial para ofrecer algo fundamental: foco absoluto. Al delimitar mi campo de acción, garantizo una atención meticulosa en cada etapa, asegurando que cada proyecto reciba el máximo estándar de calidad técnica y estética.",
  audiences: [
    {
      title: "Para las familias",
      text: "Diseño hogares que interpretan su estilo de vida, priorizando la habitabilidad, el confort y la conexión emocional con el espacio.",
    },
    {
      title: "Para los inversionistas",
      text: "Aporto una visión empresarial indispensable. Mi experiencia en supervisión técnica garantiza optimización de recursos, cumplimiento de tiempos y proyectos comerciales con un alto retorno de inversión y plusvalía.",
    },
  ],
  commitments: [
    {
      title: "Dirección experta",
      text: "Superviso personalmente desde el primer trazo conceptual hasta la entrega final en obra.",
    },
    {
      title: "Solidez técnica",
      text: "18 años en el sector me permiten anticipar retos constructivos, garantizando obras eficientes, seguras y fieles al presupuesto.",
    },
    {
      title: "Estética duradera",
      text: "Creo arquitectura contemporánea con identidad propia, pensada para trascender y generar impacto visual.",
    },
  ],
  portfolio:
    "Este portafolio reúne una selección de mis mejores proyectos. Es el testimonio de una carrera construida con disciplina, pasión por el detalle y respeto por la inversión de cada cliente.",
};
