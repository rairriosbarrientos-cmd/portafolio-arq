import { services, site } from "./site";
import type { Category } from "./projects";

export const projectTypes = [
  { id: "casa", label: "Casa habitación", hint: "Residencia nueva" },
  { id: "departamentos", label: "Departamentos", hint: "Vivienda vertical o conjunto" },
  { id: "comercial", label: "Local o restaurante", hint: "Comercio, bar, hospitalidad" },
  { id: "oficina", label: "Oficina", hint: "Corporativo o consultorio" },
  { id: "turistico", label: "Turístico", hint: "Hotel, villas, complejo" },
  { id: "remodelacion", label: "Remodelación", hint: "Transformar un espacio existente" },
  { id: "interiorismo", label: "Interiorismo", hint: "Cocina, sala, acabados" },
  { id: "otro", label: "Otro", hint: "Cuéntanos en el último paso" },
] as const;

export type ProjectTypeId = (typeof projectTypes)[number]["id"];

/** Tipo de proyecto sugerido a partir de la tipología de un proyecto del portafolio. */
export const typeFromCategory: Record<Category, ProjectTypeId> = {
  Residencial: "casa",
  "Vivienda vertical": "departamentos",
  Comercial: "comercial",
  Turístico: "turistico",
  Cultural: "otro",
  Interiorismo: "interiorismo",
};

export const serviceOptions = services.map((s) => s.title);

export const stages = [
  "Tengo el terreno",
  "Ya tengo planos o proyecto",
  "Tengo un espacio para remodelar",
  "Estoy explorando ideas",
] as const;

export const sizes = ["Menos de 100 m²", "100 – 200 m²", "200 – 400 m²", "400 – 1,000 m²", "Más de 1,000 m²", "No lo sé aún"] as const;

export const timings = ["Lo antes posible", "En los próximos 3 meses", "En 6 meses o más", "Sin fecha definida"] as const;

export const budgets = [
  "Hasta $1.5 millones",
  "$1.5 – $3 millones",
  "$3 – $6 millones",
  "Más de $6 millones",
  "Prefiero platicarlo",
] as const;

export type Quote = {
  type: ProjectTypeId | null;
  services: string[];
  stage: string | null;
  city: string;
  size: string | null;
  timing: string | null;
  budget: string | null;
  name: string;
  notes: string;
  inspiration: string | null;
};

export const emptyQuote: Quote = {
  type: null,
  services: [],
  stage: null,
  city: "",
  size: null,
  timing: null,
  budget: null,
  name: "",
  notes: "",
  inspiration: null,
};

export function typeLabel(id: ProjectTypeId | null) {
  return projectTypes.find((t) => t.id === id)?.label ?? null;
}

export function quoteLines(q: Quote): [string, string][] {
  const rows: [string, string | null][] = [
    ["Proyecto", typeLabel(q.type)],
    ["Servicios", q.services.length ? q.services.join(", ") : null],
    ["Etapa", q.stage],
    ["Ubicación", q.city.trim() || null],
    ["Superficie", q.size],
    ["Inicio", q.timing],
    ["Presupuesto", q.budget],
    ["Referencia", q.inspiration],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

export function quoteMessage(q: Quote) {
  const hello = q.name.trim() ? `Hola ARQT, soy ${q.name.trim()}.` : "Hola ARQT.";
  const lines = quoteLines(q).map(([k, v]) => `• ${k}: ${v}`);
  const notes = q.notes.trim() ? `\n\n${q.notes.trim()}` : "";
  return `${hello} Me interesa cotizar un proyecto:\n\n${lines.join("\n")}${notes}\n\n(Enviado desde el sitio web)`;
}

export function whatsappUrl(q: Quote) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(quoteMessage(q))}`;
}

export function mailtoUrl(q: Quote) {
  const subject = `Cotización: ${typeLabel(q.type) ?? "proyecto"}${q.city.trim() ? ` en ${q.city.trim()}` : ""}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteMessage(q))}`;
}
