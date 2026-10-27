import images from "./images.json";

export type ProjectImage = {
  src: string;
  sm: string;
  width: number;
  height: number;
};

export type Category = "Residencial" | "Vivienda vertical" | "Comercial" | "Turístico" | "Cultural" | "Interiorismo";

export type Project = {
  slug: keyof typeof images;
  /** Prefijo tal como aparece en el portafolio: "Casa", "Ristobar", "Complejo Vacacional"... */
  kind: string;
  name: string;
  location: string;
  category: Category;
  /** Descripción breve de lo que muestran los renders. */
  summary: string;
  /** Rasgos visibles en los renders, para la ficha del proyecto. */
  features: string[];
};

const data: Project[] = [
  {
    slug: "departamentos-ekato",
    kind: "Departamentos",
    name: "Ekato",
    location: "Chilpancingo, Gro.",
    category: "Vivienda vertical",
    summary:
      "Torre de departamentos con un muro verde que recorre la fachada de arriba abajo, balcones de cristal y lambrines de madera que calientan la volumetría blanca.",
    features: ["Muro verde en fachada", "Balcones con barandal de cristal", "Iluminación arquitectónica nocturna", "Áreas sociales integradas"],
  },
  {
    slug: "casa-montes-urales",
    kind: "Casa",
    name: "Montes Urales",
    location: "Guadalajara, Jal.",
    category: "Residencial",
    summary:
      "Volumen blanco suspendido envuelto en una celosía geométrica que filtra la luz y protege la privacidad, sobre un basamento oscuro y sobrio.",
    features: ["Celosía geométrica en fachada", "Volumen en voladizo", "Cocina con isla y barra", "Iluminación lineal LED"],
  },
  {
    slug: "pro-laguna-41",
    kind: "Complejo Vacacional",
    name: "Pro Laguna 41",
    location: "Acapulco, Gro.",
    category: "Turístico",
    summary:
      "Complejo vacacional sobre la laguna: muelles y terrazas de madera sobre el agua, palapas de techo alto y un plan maestro de villas alrededor de la alberca.",
    features: ["Muelles y terrazas sobre el agua", "Palapas de techo alto", "Plan maestro con villas", "Cancha y alberca"],
  },
  {
    slug: "casa-texcalco",
    kind: "Casa",
    name: "Texcalco",
    location: "Chilpancingo, Gro.",
    category: "Residencial",
    summary:
      "Residencia de carácter regional: teja de barro, vigas de madera aparente y muros de piedra, con un gran balcón corrido que mira a la calle.",
    features: ["Teja de barro y vigas aparentes", "Muros de piedra", "Balcón corrido", "Fachada con madera"],
  },
  {
    slug: "la-bocata",
    kind: "Ristobar",
    name: "La Bocata",
    location: "San Jerónimo, Gro.",
    category: "Comercial",
    summary:
      "Ristobar al aire libre bajo una pérgola de madera con cortinas de lino al viento, iluminación cálida y una alberca con camastros integrada al jardín.",
    features: ["Pérgola de madera", "Cortinas textiles", "Alberca con camastros", "Barra y comedor exterior"],
  },
  {
    slug: "casa-guerrero-200",
    kind: "Casa",
    name: "Guerrero 200",
    location: "Chilpancingo, Gro.",
    category: "Residencial",
    summary:
      "Composición de volúmenes puros que se proyectan sobre la calle: marcos oscuros enmarcan balcones y vegetación sobre una caja blanca.",
    features: ["Volúmenes en voladizo", "Marcos oscuros en balcones", "Jardinera en fachada"],
  },
  {
    slug: "casa-de-la-cultura",
    kind: "Proyecto",
    name: "Casa de la Cultura",
    location: "Ometepec, Gro.",
    category: "Cultural",
    summary:
      "Equipamiento cultural que retoma los arcos y portales tradicionales y los cubre con una gran techumbre de cristal que inunda de luz el patio central.",
    features: ["Patio central con cubierta de cristal", "Arcos y portales", "Lámparas tejidas artesanales", "Plaza de acceso"],
  },
  {
    slug: "oficina-romacal",
    kind: "Oficina",
    name: "Romacal",
    location: "Chilpancingo, Gro.",
    category: "Comercial",
    summary:
      "Oficinas corporativas organizadas alrededor de un vacío de doble altura con tragaluz, puentes de cristal y escaleras de madera.",
    features: ["Doble altura con tragaluz", "Barandales de cristal", "Escalera de madera", "Muro de identidad corporativa"],
  },
  {
    slug: "departamentos-solartiz",
    kind: "Departamentos",
    name: "Solartiz",
    location: "Chilpancingo, Gro.",
    category: "Vivienda vertical",
    summary:
      "Edificio de departamentos con marcos de color —azul y amarillo— que enmarcan cada balcón, alternados con celosías de madera.",
    features: ["Marcos de color en balcones", "Celosías de madera", "Planta baja con estacionamiento"],
  },
  {
    slug: "roof-garden-nogales",
    kind: "Roof Garden",
    name: "Nogales",
    location: "San Jerónimo, Gro.",
    category: "Comercial",
    summary:
      "Roof garden social con cubierta de lamas que tamiza el sol, celosía metálica orgánica, barra y zona de juegos.",
    features: ["Cubierta de lamas", "Celosía metálica", "Barra y área de juegos", "Vegetación integrada"],
  },
  {
    slug: "casa-torres",
    kind: "Casa",
    name: "Torres",
    location: "Chilpancingo, Gro.",
    category: "Residencial",
    summary:
      "Casa contemporánea con muros de piedra laminada, terraza con pérgola y un interior luminoso con escalera de cristal.",
    features: ["Piedra laminada en fachada", "Terraza con pérgola", "Escalera con barandal de cristal", "Jardín frontal"],
  },
  {
    slug: "departamentos-timotlan",
    kind: "Departamentos",
    name: "Timotlán",
    location: "Chilpancingo, Gro.",
    category: "Vivienda vertical",
    summary:
      "Edificio de departamentos con balcones en volado, enmarcados en concreto y protegidos con barandales blancos.",
    features: ["Balcones en volado", "Azotea habitable", "Acceso peatonal y vehicular"],
  },
  {
    slug: "casa-magnolias",
    kind: "Casa",
    name: "Magnolias",
    location: "Chilpancingo, Gro.",
    category: "Residencial",
    summary:
      "Fachada abierta con terraza al frente, muro de madera, lámparas colgantes tejidas y cochera para dos autos.",
    features: ["Terraza frontal", "Muro de madera", "Pérgola metálica", "Cochera doble"],
  },
  {
    slug: "casa-puebla",
    kind: "Proyecto",
    name: "Casa Puebla",
    location: "Puebla de Zaragoza",
    category: "Residencial",
    summary:
      "Conjunto de vivienda con fachadas de balcón, cipreses alineados y calle adoquinada, con interiores cálidos de madera.",
    features: ["Conjunto residencial", "Calle adoquinada", "Cocina con barra", "Interiores en madera"],
  },
  {
    slug: "cocina-parazal",
    kind: "Cocina",
    name: "Parazal",
    location: "Chilpancingo, Gro.",
    category: "Interiorismo",
    summary:
      "Cocina con una gran barra de granito negro y terrazo, gabinetes de madera y celosías que dejan pasar la luz.",
    features: ["Barra de granito y terrazo", "Gabinetes de madera", "Celosías decorativas"],
  },
  {
    slug: "casa-xicoh",
    kind: "Casa",
    name: "Xicoh",
    location: "Chilpancingo, Gro.",
    category: "Residencial",
    summary:
      "Un interior que se vuelve galería: muros blancos, piso de mármol y una perspectiva que remata en un jardín de bugambilias.",
    features: ["Interior minimalista", "Piso de mármol", "Remate visual a jardín"],
  },
];

export const projects = data.map((p, i) => {
  const list = images[p.slug] as ProjectImage[];
  return {
    ...p,
    index: i + 1,
    images: list,
    /** Versión "plano" (dibujo de líneas) de la imagen principal; ver scripts/make-planos.py. */
    plano: { ...list[0], src: `/obra/${p.slug}/plano.webp`, sm: `/obra/${p.slug}/plano-sm.webp` } as ProjectImage,
  };
});

export type FullProject = (typeof projects)[number];

export const categories: Category[] = ["Residencial", "Vivienda vertical", "Comercial", "Turístico", "Cultural", "Interiorismo"];

export const studioImages = images.estudio as ProjectImage[];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectTitle(p: Pick<Project, "kind" | "name">) {
  return p.kind === "Proyecto" ? p.name : `${p.kind} ${p.name}`;
}

export const locations = Array.from(new Set(data.map((p) => p.location)));
