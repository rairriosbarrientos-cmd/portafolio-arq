"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Img } from "./Img";
import { Logo } from "./Logo";
import type { FullProject } from "@/lib/projects";
import { projectTitle } from "@/lib/projects";
import { quotes, site } from "@/lib/site";

const SLIDE_MS = 5500;
const INTRO_DELAY = 1.45;

type Slide = { project: FullProject; imageIndex: number };

export function Hero({ slides, total }: { slides: Slide[]; total: number }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const id = window.setTimeout(() => setActive((a) => (a + 1) % slides.length), active === 0 ? SLIDE_MS + 1400 : SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, slides.length]);

  const current = slides[active].project;
  const lines = ["Diseñamos", "con intención.", "Construimos", "con rigor."];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink" aria-label="Portada">
      <motion.div style={{ y }} className="absolute inset-0">
        {slides.map((s, i) => {
          const image = s.project.images[s.imageIndex];
          return (
            <div
              key={s.project.slug}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out-expo ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <div
                key={i === active ? `on-${active}` : "off"}
                className="h-full w-full"
                style={{ animation: i === active ? `kenburns ${SLIDE_MS + 2000}ms linear both` : undefined }}
              >
                <Img
                  image={image}
                  alt={projectTitle(s.project)}
                  priority={i === 0}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </motion.div>
      <div className="blueprint pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-28 pt-24 sm:px-8 sm:pb-32">
        <div className="label fade-in mb-6 flex items-center gap-3 text-silver" style={{ animationDelay: `${INTRO_DELAY + 0.4}s` }}>
          <span className="h-px w-10 bg-silver/60" />
          {site.tagline}
        </div>
        <h1 className="font-display text-[clamp(2.5rem,min(11.8vw,14.5svh),11rem)] font-semibold leading-[0.86]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className={`rise block ${i % 2 === 1 ? "pl-[0.35em] text-silver sm:pl-[0.6em]" : ""}`}
                style={{ animationDelay: `${INTRO_DELAY + i * 0.09}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="fade-in mt-8 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base"
          style={{ animationDelay: `${INTRO_DELAY + 0.6}s` }}
        >
          “{quotes.opening}”
        </p>
      </motion.div>

      {/* Barra inferior: proyecto actual + progreso */}
      <div
        className="fade-in absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-ink/30 backdrop-blur-md"
        style={{ animationDelay: `${INTRO_DELAY + 0.7}s` }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-4 sm:gap-8 sm:px-8">
          <Link href={`/proyectos/${current.slug}`} className="group min-w-0 flex-1">
            <span className="label block text-white/50">
              {String(current.index).padStart(2, "0")} / {String(total).padStart(2, "0")} · {current.location}
            </span>
            <span className="mt-1 block truncate font-display text-lg font-medium sm:text-xl">
              {projectTitle(current)}
              <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </Link>
          <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Proyectos destacados">
            {slides.map((s, i) => (
              <button
                key={s.project.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={projectTitle(s.project)}
                onClick={() => setActive(i)}
                className="group flex h-11 w-5 items-center sm:w-12"
              >
                <span className="relative block h-px w-full overflow-hidden bg-white/25">
                  {i === active && (
                    <span
                      key={active}
                      className="absolute inset-0 origin-left bg-white"
                      style={{ animation: `progress ${active === 0 ? SLIDE_MS + 1400 : SLIDE_MS}ms linear both` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="label hidden text-white/50 lg:block">{site.coords}</div>
        </div>
      </div>

      <div
        className="fade-in absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 sm:right-8 md:flex"
        style={{ animationDelay: `${INTRO_DELAY + 0.9}s` }}
      >
        <span className="label text-white/60 [writing-mode:vertical-rl]">Desliza</span>
        <span className="scroll-cue relative block h-16 w-px overflow-hidden bg-white/20 text-white" />
      </div>

      {/* Intro */}
      <div className="intro fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy text-white" aria-hidden>
        <Logo variant="full" className="intro-mark w-44 sm:w-60" />
        <div className="mt-10 h-px w-44 overflow-hidden bg-white/20 sm:w-60">
          <div className="intro-bar h-full w-full bg-white" />
        </div>
        <span className="label mt-4 text-white/60">{site.base}</span>
      </div>
    </section>
  );
}
