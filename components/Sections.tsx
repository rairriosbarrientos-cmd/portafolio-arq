import Link from "next/link";
import { Counter } from "./Counter";
import { Img } from "./Img";
import { Logo } from "./Logo";
import { Parallax } from "./Parallax";
import { Reveal, RevealMask } from "./Reveal";
import { RevealWords } from "./RevealWords";
import type { ProjectImage } from "@/lib/projects";
import { about, aboutClose, architect, focus, philosophy, quotes, services, site } from "@/lib/site";

export function Studio({ total, cities, images }: { total: number; cities: number; images: ProjectImage[] }) {
  const stats = [
    { value: architect.years, label: "Años de experiencia" },
    { value: total, label: "Proyectos en portafolio" },
    { value: cities, label: "Ciudades" },
    { value: services.length, label: "Servicios integrales" },
  ];
  return (
    <section id="estudio" className="relative overflow-hidden bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="label text-silver">¿Quiénes somos?</span>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <RevealWords
              text={about[0]}
              className="font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.08]"
            />
            <div className="mt-14 grid gap-8 text-mist sm:grid-cols-2 sm:gap-12">
              {about.slice(1).map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="leading-relaxed">{t}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`border-b border-white/10 py-8 ${i % 2 === 1 ? "pl-6" : ""} lg:border-b-0 lg:pl-8 lg:first:pl-0 ${i > 0 ? "lg:border-l" : ""}`}>
              <div className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-none">
                <Counter to={s.value} />
              </div>
              <div className="label mt-3 text-mist">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-4 sm:grid-cols-12 sm:gap-6">
          <RevealMask className="aspect-[4/3] sm:col-span-7">
            <Img image={images[0]} alt="Cocina — render ARQT" sizes="(min-width: 640px) 58vw, 100vw" className="h-full w-full object-cover" />
          </RevealMask>
          <div className="flex flex-col justify-end gap-6 sm:col-span-5">
            <RevealMask className="aspect-[4/3]" delay={0.15}>
              <Img image={images[2]} alt="Sala — render ARQT" sizes="(min-width: 640px) 40vw, 100vw" className="h-full w-full object-cover" />
            </RevealMask>
            <Reveal>
              <p className="font-display text-2xl leading-snug sm:text-3xl">{aboutClose}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Philosophy({ wireframe }: { wireframe: string }) {
  return (
    <section id="filosofia" className="relative bg-navy py-24 sm:py-36">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="label text-white/60">Filosofía de diseño</span>
            <h2 className="font-display mt-6 text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.92]">
              Una buena arquitectura no solamente debe verse bien.
            </h2>
            <div className="relative mt-10 hidden aspect-[530/1275] max-h-[52vh] overflow-hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={wireframe} alt="" loading="lazy" className="h-full w-full object-cover object-left mix-blend-screen" />
            </div>
          </div>
        </div>
        <div className="space-y-16 lg:col-span-6 lg:col-start-7 lg:pt-40">
          <Reveal>
            <p className="font-display text-3xl font-medium leading-tight sm:text-4xl">{philosophy.lead}</p>
          </Reveal>
          {philosophy.body.map((t, i) => (
            <Reveal key={i}>
              <div className="flex gap-6 border-t border-white/20 pt-6">
                <span className="label pt-1 text-white/50">0{i + 1}</span>
                <p className="text-lg leading-relaxed text-white/80">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicios" className="relative bg-bone py-24 text-ink sm:py-36">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label text-navy">Servicios</span>
            <h2 className="font-display mt-4 text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.9]">
              De la idea
              <br />a la entrega.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink/60">
              Acompañamos cada proyecto desde su concepción hasta su materialización, con una sola visión de principio a fin.
            </p>
          </div>
          <ol className="lg:col-span-8">
            {services.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.05}
                className="group relative grid grid-cols-[3rem_1fr] gap-4 overflow-hidden border-t border-ink/15 py-8 last:border-b sm:grid-cols-[5rem_1fr_1fr] sm:gap-8 sm:py-10"
              >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                  <span className="label relative pt-2 text-ink/40 transition-colors duration-500 group-hover:text-white/60">
                    0{i + 1}
                  </span>
                  <h3 className="font-display relative text-3xl font-medium leading-none transition-colors duration-500 group-hover:text-white sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="relative col-start-2 text-ink/60 transition-colors duration-500 group-hover:text-white/80 sm:col-start-3">
                    {s.text}
                  </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Architect({ portrait }: { portrait: ProjectImage }) {
  return (
    <section id="arquitecto" className="relative overflow-hidden bg-ink py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <RevealMask className="relative aspect-[3/4] max-w-md">
              <Img image={portrait} alt={architect.name} sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full object-cover" />
            </RevealMask>
            <div className="label mt-4 flex max-w-md justify-between text-mist">
              <span>{architect.role} · ARQT</span>
              <span>{site.base}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <span className="label text-silver">Trayectoria y visión</span>
          <h2 className="font-display mt-4 text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.92]">
            Gustavo
            <br />
            Ríos Barrientos
          </h2>
          <Reveal>
            <p className="font-display mt-8 max-w-2xl text-2xl leading-snug text-silver sm:text-3xl">{architect.headline}</p>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-mist">
            {architect.bio.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 border border-white/15">
              <div className="label flex items-center justify-between border-b border-white/15 bg-white/[0.03] px-5 py-3 text-silver">
                <span>Registro profesional</span>
                <span className="text-white/40">{architect.credentials.reduce((n, g) => n + g.items.length, 0)} registros</span>
              </div>
              {architect.credentials.map((g) => (
                <div key={g.scope} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <h3 className="label pt-0.5 text-white">{g.scope}</h3>
                  <dl className="space-y-3">
                    {g.items.map((c) => (
                      <div key={c.code} className="grid gap-0.5 sm:grid-cols-[13rem_1fr] sm:gap-4">
                        <dt className="font-mono text-sm text-white/90">{c.code}</dt>
                        <dd className="text-sm text-mist">{c.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Focus({ portrait }: { portrait: ProjectImage }) {
  return (
    <section id="enfoque" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-36">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="label text-navy">Filosofía y enfoque estratégico</span>
            <h2 className="font-display mt-4 text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.88]">{focus.title}</h2>
            <Reveal>
              <p className="font-display mt-8 max-w-3xl text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-snug">{focus.lead}</p>
            </Reveal>
          </div>
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <RevealMask className="aspect-[3/4]">
              <Img image={portrait} alt="Arq. Gustavo Ríos Barrientos en el estudio" sizes="30vw" className="h-full w-full object-cover" />
            </RevealMask>
          </div>
        </div>

        <span className="label mt-20 block text-ink/50">Mi filosofía une dos mundos esenciales</span>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {focus.audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <article
                className={`group relative h-full overflow-hidden p-8 sm:p-12 ${i === 0 ? "bg-ink text-white" : "bg-navy text-white"}`}
              >
                <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
                <span className="label relative text-white/50">0{i + 1}</span>
                <h3 className="font-display relative mt-10 text-4xl font-semibold sm:text-5xl">{a.title}</h3>
                <p className="relative mt-5 max-w-md text-lg leading-relaxed text-white/75">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label text-navy">Mi compromiso en cada obra</span>
            <h3 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[0.95]">
              Del primer trazo
              <br />
              <span className="text-ink/40">a la entrega.</span>
            </h3>
          </div>
          <div className="grid gap-px bg-ink/15 sm:grid-cols-3 lg:col-span-8">
            {focus.commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="bg-paper">
                <div className="flex h-full flex-col p-6 sm:p-8">
                  <span className="font-display text-6xl font-semibold text-navy">0{i + 1}</span>
                  <h4 className="font-display mt-8 text-2xl font-semibold">{c.title}</h4>
                  <p className="mt-3 leading-relaxed text-ink/65">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-24 grid gap-8 border-t border-ink/15 pt-12 lg:grid-cols-12">
            <p className="text-lg leading-relaxed text-ink/70 lg:col-span-6">{focus.portfolio}</p>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">{architect.signoff}</p>
              <p className="mt-6 font-display text-lg font-semibold">{architect.name}</p>
              <p className="label mt-1 text-ink/50">
                {architect.role} · {site.fullName}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingQuote({ image }: { image: ProjectImage }) {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink">
      <Parallax className="absolute inset-0" amount={18}>
        <Img image={image} alt="" className="h-full w-full scale-110 object-cover" />
      </Parallax>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1600px] px-4 py-24 sm:px-8">
        <span className="font-display block text-8xl leading-none text-navy-bright sm:text-9xl" aria-hidden>
          “
        </span>
        <p className="font-display max-w-5xl text-[clamp(2.25rem,5.5vw,5.5rem)] font-medium leading-[1]">
          <span className="text-silver">{quotes.closingLead} </span>
          {quotes.closing}
        </p>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <footer id="contacto" className="relative overflow-hidden bg-navy pt-24 sm:pt-36">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <span className="label text-white/60">Contacto</span>
        <h2 className="font-display mt-6 text-[clamp(3.5rem,13vw,13rem)] font-semibold leading-[0.85]">
          Hablemos
          <br />
          <span className="text-white/50">de tu proyecto.</span>
        </h2>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola ARQT, me interesa platicar sobre un proyecto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-16 items-center justify-between gap-6 rounded-full bg-white px-8 text-ink transition-transform duration-500 hover:scale-[1.02] sm:justify-start"
          >
            <span className="font-display text-lg font-semibold">Escríbenos por WhatsApp</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex h-16 items-center justify-between gap-6 rounded-full border border-white/40 px-8 transition-colors duration-500 hover:bg-white/10 sm:justify-start"
          >
            <span className="font-display text-lg font-medium">Enviar correo</span>
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/20 py-12 sm:grid-cols-3">
          <div>
            <div className="label text-white/50">Teléfono / WhatsApp</div>
            <a href={`tel:+52${site.phone.replace(/\s/g, "")}`} className="mt-2 block text-lg">
              {site.phone}
            </a>
          </div>
          <div>
            <div className="label text-white/50">Correo</div>
            <a href={`mailto:${site.email}`} className="mt-2 block break-all text-lg">
              {site.email}
            </a>
          </div>
          <div>
            <div className="label text-white/50">Facebook · Instagram</div>
            {site.facebook || site.instagram ? (
              <div className="mt-2 flex gap-4 text-lg">
                {site.facebook && (
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="border-b border-white/40 hover:border-white">
                    Facebook ↗
                  </a>
                )}
                {site.instagram && <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
              </div>
            ) : (
              <p className="mt-2 text-lg">{site.social}</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-4 py-8 sm:flex-row sm:items-center sm:px-8">
          <Link href="/" aria-label="ARQT, inicio">
            <Logo variant="full" className="h-12" />
          </Link>
          <p className="label text-white/50">
            © {new Date().getFullYear()} {site.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}
