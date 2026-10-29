import type { FullProject } from "./projects";
import { projectTitle } from "./projects";
import { architect, services, site } from "./site";

const base = () => site.url.replace(/\/$/, "");

export function studioSchema() {
  const url = `${base()}/`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#estudio`,
    name: site.fullName,
    alternateName: site.name,
    description:
      "Estudio de arquitectura enfocado exclusivamente en proyectos residenciales y comerciales: diseño arquitectónico, supervisión técnica, construcción, remodelación y dirección de obra.",
    url,
    logo: `${base()}/icon.png`,
    image: `${base()}/opengraph-image.jpg`,
    telephone: `+52 ${site.phone}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guadalajara",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
    geo: { "@type": "GeoCoordinates", latitude: 20.6597, longitude: -103.3496 },
    areaServed: ["Zona Metropolitana de Guadalajara", "Jalisco", "Guerrero", "México"].map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsAbout: ["Arquitectura", "Diseño arquitectónico", "Construcción", "Remodelación", "Interiorismo"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.text },
      })),
    },
    founder: {
      "@type": "Person",
      name: "Gustavo Ríos Barrientos",
      honorificPrefix: "Arq.",
      jobTitle: architect.role,
      description: architect.headline,
    },
    sameAs: [site.facebook, site.instagram].filter(Boolean),
  };
}

export function projectSchema(p: FullProject) {
  const url = `${base()}/proyectos/${p.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#proyecto`,
        name: projectTitle(p),
        description: p.summary,
        url,
        genre: p.category,
        locationCreated: { "@type": "Place", name: p.location },
        image: p.images.map((i) => `${base()}${i.src}`),
        creator: { "@id": `${base()}/#estudio` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${base()}/` },
          { "@type": "ListItem", position: 2, name: "Obra", item: `${base()}/#indice` },
          { "@type": "ListItem", position: 3, name: projectTitle(p), item: url },
        ],
      },
    ],
  };
}
