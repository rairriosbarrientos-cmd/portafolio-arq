import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareSlider } from "@/components/CompareSlider";
import { Gallery } from "@/components/Gallery";
import { Img } from "@/components/Img";
import { JsonLd } from "@/components/JsonLd";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { Contact } from "@/components/Sections";
import { getProject, projects, projectTitle } from "@/lib/projects";
import { projectSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = projectTitle(p);
  return {
    title,
    description: `${title}, ${p.location}. ${p.summary}`,
    alternates: { canonical: `/proyectos/${p.slug}/` },
    openGraph: { title: `${title} — ARQT`, description: p.summary, images: [{ url: p.images[0].src, width: p.images[0].width, height: p.images[0].height }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const title = projectTitle(p);
  const next = projects[p.index % projects.length];
  const prefix = p.kind === "Proyecto" ? "" : p.kind;

  const facts = [
    { label: "Ubicación", value: p.location },
    { label: "Tipología", value: p.category },
    { label: "Estudio", value: site.fullName },
    { label: "Índice", value: `${String(p.index).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}` },
  ];

  return (
    <main>
      <JsonLd data={projectSchema(p)} />
      <section className="relative h-[92svh] min-h-[560px] overflow-hidden bg-ink">
        <Parallax className="absolute inset-0" amount={10}>
          <Img image={p.images[0]} alt={title} priority className="h-full w-full scale-110 object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink" />
        <div className="blueprint pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-12 sm:px-8 sm:pb-16">
          <Link href="/#indice" className="label mb-8 inline-flex w-fit items-center gap-2 text-white/70 hover:text-white">
            ← Toda la obra
          </Link>
          <span className="label fade-in text-silver">
            {String(p.index).padStart(2, "0")} · {p.category}
          </span>
          <h1 className="font-display mt-4 text-[clamp(3rem,10vw,10rem)] font-semibold leading-[0.86]">
            {prefix && (
              <span className="block overflow-hidden">
                <span className="rise block text-[0.45em] font-medium text-silver">{prefix}</span>
              </span>
            )}
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="rise block" style={{ animationDelay: "0.08s" }}>
                {p.name}
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
          <dl className="grid grid-cols-2 border-y border-white/15 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div key={f.label} className={`py-6 ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${i > 1 ? "border-t border-white/15 lg:border-t-0" : ""} lg:pl-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
                <dt className="label text-mist">{f.label}</dt>
                <dd className="mt-2 text-base sm:text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.12]">{p.summary}</p>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <span className="label text-silver">Rasgos del proyecto</span>
              <ul className="mt-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 border-b border-white/10 py-3 text-mist">
                    <span className="h-1.5 w-1.5 rotate-45 bg-navy-bright" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/?proyecto=${p.slug}#cotizar`}
                className="group mt-8 flex h-14 items-center justify-between rounded-full bg-white px-6 text-ink transition-transform duration-500 hover:scale-[1.02]"
              >
                <span className="font-display font-semibold">Quiero un proyecto así</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal className="mt-20">
            <div className="mb-6 flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-semibold sm:text-5xl">
                Del plano <span className="text-silver">a la obra</span>
              </h2>
              <span className="label hidden text-mist sm:block">Arrastra para comparar ↔</span>
            </div>
            <CompareSlider plano={p.plano} render={p.images[0]} title={title} />
            <p className="label mt-3 text-mist sm:hidden">Arrastra para comparar ↔</p>
          </Reveal>

          <div className="mt-20">
            <Gallery images={p.images} title={title} />
          </div>
        </div>
      </section>

      <Link href={`/proyectos/${next.slug}`} className="group relative block h-[70svh] min-h-[420px] overflow-hidden bg-ink" data-cursor="view">
        <Img
          image={next.images[0]}
          alt={projectTitle(next)}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-[1400ms] ease-out-expo group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-12 sm:px-8 sm:pb-16">
          <span className="label text-silver">Siguiente proyecto →</span>
          <span className="font-display mt-4 text-[clamp(2.75rem,8vw,8rem)] font-semibold leading-[0.9] transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
            {projectTitle(next)}
          </span>
          <span className="mt-3 text-mist">{next.location}</span>
        </div>
      </Link>

      <Contact />
    </main>
  );
}
