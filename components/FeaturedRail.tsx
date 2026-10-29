"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Img } from "./Img";
import type { FullProject } from "@/lib/projects";
import { projectTitle } from "@/lib/projects";

function Card({ p, tall }: { p: FullProject; tall: boolean }) {
  return (
    <Link href={`/proyectos/${p.slug}`} className="group block" data-cursor="view">
      <div className={`relative overflow-hidden bg-ink-2 ${tall ? "aspect-[4/5]" : "aspect-[5/4]"}`}>
        <Img
          image={p.images[0]}
          alt={projectTitle(p)}
          sizes="(min-width: 768px) 40vw, 85vw"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80" />
        <span className="label absolute left-4 top-4 rounded-full border border-white/30 bg-ink/30 px-3 py-1.5 backdrop-blur">
          {p.category}
        </span>
        <span className="label absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Ver proyecto <span aria-hidden>→</span>
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-4">
        <span className="label text-mist">{String(p.index).padStart(2, "0")}</span>
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-medium sm:text-3xl">{projectTitle(p)}</h3>
          <p className="mt-1 text-sm text-mist">{p.location}</p>
        </div>
      </div>
    </Link>
  );
}

function Intro({ count }: { count: number }) {
  return (
    <div className="flex flex-col justify-between">
      <span className="label text-silver">Portafolio · 2026</span>
      <div>
        <h2 className="font-display text-[clamp(3rem,12vw,7.5rem)] md:text-[clamp(3rem,5.2vw,6.5rem)] font-semibold leading-[0.9]">
          Obra
          <br />
          <span className="text-silver">seleccionada.</span>
        </h2>
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
          {count} proyectos residenciales, comerciales, turísticos y culturales, de Guerrero a Jalisco y Puebla.
        </p>
      </div>
    </div>
  );
}

export function FeaturedRail({ projects, total }: { projects: FullProject[]; total: number }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div id="obra">
      {/* Escritorio: scroll vertical se convierte en recorrido horizontal */}
      <section
        ref={section}
        className="relative hidden bg-ink md:block"
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="blueprint pointer-events-none absolute inset-0 opacity-30" />
          <motion.div ref={track} style={{ x }} className="relative flex w-max items-end gap-[4vw] px-8 will-change-transform">
            <div className="flex h-[70vh] w-[32vw] shrink-0 pr-[2vw]">
              <Intro count={total} />
            </div>
            {projects.map((p, i) => (
              <div key={p.slug} className={`shrink-0 ${i % 2 === 0 ? "w-[30vw] self-start" : "w-[38vw]"}`} style={{ marginTop: i % 2 === 0 ? 0 : "8vh" }}>
                <Card p={p} tall={i % 2 === 0} />
              </div>
            ))}
            <Link
              href="#indice"
              className="group flex h-[60vh] w-[24vw] shrink-0 flex-col items-start justify-end border-l border-white/15 pl-8"
            >
              <span className="label text-silver">Índice completo</span>
              <span className="font-display mt-4 text-5xl font-semibold leading-none">
                Ver los {total}
                <br />
                proyectos <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">↓</span>
              </span>
            </Link>
          </motion.div>
          <div className="absolute inset-x-8 bottom-8 h-px bg-white/10">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-white" />
          </div>
        </div>
      </section>

      {/* Móvil: carrusel con deslizamiento nativo */}
      <section className="relative bg-ink py-20 md:hidden" aria-label="Obra seleccionada">
        <div className="px-4">
          <Intro count={total} />
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
          {projects.map((p, i) => (
            <div key={p.slug} className="w-[82vw] shrink-0 snap-center">
              <Card p={p} tall={i % 2 === 0} />
            </div>
          ))}
        </div>
        <p className="label mt-4 px-4 text-mist">Desliza para ver más →</p>
      </section>
    </div>
  );
}
