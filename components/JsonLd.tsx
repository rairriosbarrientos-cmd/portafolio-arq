/** Datos estructurados (schema.org) para buscadores. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON generado en el build a partir de datos propios; se escapa "<" para no cerrar el script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
