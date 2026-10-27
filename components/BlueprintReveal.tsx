"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Img } from "./Img";
import type { FullProject } from "@/lib/projects";
import { projectTitle } from "@/lib/projects";

/** Sección fija: al hacer scroll el plano se convierte en el render. */
export function BlueprintReveal({ project }: { project: FullProject }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const wipe = useTransform(scrollYProgress, [0.12, 0.82], [0, 100], { clamp: true });
  const clip = useTransform(wipe, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(wipe, (v) => `${v}%`);
  // La etiqueta no se sale de la pantalla en los extremos
  const tagX = useTransform(wipe, (v) => `${v < 8 ? 0 : v > 92 ? -100 : -50}%`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const [pct, setPct] = useState(0);
  useMotionValueEvent(wipe, "change", (v) => setPct(Math.round(v)));

  const image = project.images[0];

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink" aria-label="Del plano a la obra">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Img image={project.plano} alt={`${projectTitle(project)} — plano`} className="absolute inset-0 h-full w-full object-cover" />
          <motion.div style={{ clipPath: clip }} className="absolute inset-0">
            <Img image={image} alt={projectTitle(project)} className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />

        {/* Línea de corte */}
        <motion.div style={{ left }} className="absolute inset-y-0 z-10 w-px bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.6)]">
          <motion.span
            style={{ x: tagX }}
            className="label absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/40 bg-ink/60 px-3 py-2 backdrop-blur"
          >
            {pct < 50 ? "Plano" : "Obra"} · {String(pct).padStart(3, "0")}%
          </motion.span>
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-4 pb-24 pt-24 sm:px-8 sm:pb-14 sm:pt-28">
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-display text-[clamp(2.75rem,8vw,8.5rem)] font-semibold leading-[0.88]">
              Del plano
              <br />
              <span className="text-silver">a la obra.</span>
            </h2>
            <span className="label hidden pt-3 text-white/60 sm:block">Desliza ↓</span>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
              Anticipamos en el proyecto todo lo que después tendrá impacto en la construcción. Cada línea se dibuja pensando en cómo se va a construir.
            </p>
            <Link href={`/proyectos/${project.slug}`} className="label shrink-0 border-b border-white/40 pb-1 hover:border-white">
              {projectTitle(project)} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
