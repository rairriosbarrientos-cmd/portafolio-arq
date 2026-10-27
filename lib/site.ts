// Textos y datos de contacto tomados del portafolio PDF de ARQT.

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
  base: "Chilpancingo, Gro.",
  coords: "17°33′N · 99°30′O",
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
  headline: "17 años de experiencia entendiendo la arquitectura desde el diseño hasta la obra.",
  years: 17,
  bio: [
    "Mi trayectoria profesional se ha desarrollado alrededor del diseño arquitectónico, la supervisión técnica y la construcción, adquiriendo una perspectiva integral sobre los diferentes momentos que convierten una idea en una obra.",
    "Esta experiencia me ha permitido desarrollar una manera de trabajar basada en la anticipación: entender desde el proyecto aquello que posteriormente tendrá impacto en la construcción.",
    "Para ARQT, la experiencia no representa únicamente años de trabajo, representa la capacidad de prever, decidir y resolver.",
    "Hoy, esta trayectoria se integra a una firma que busca desarrollar arquitectura contemporánea con identidad, cercana al cliente y respaldada por una visión constructiva y empresarial.",
  ],
  credentials: [
    { label: "Céd. Prof. Federal", value: "6276469" },
    { label: "Céd. Prof. Estatal", value: "PEJ 398631" },
    { label: "DRO Municipal", value: "#241" },
    { label: "DRO Estatal", value: "12G/DRO/188" },
    { label: "CODUA", value: "12G/CODUA/047 · 12G029/DRO/CODUA/082" },
  ],
};
