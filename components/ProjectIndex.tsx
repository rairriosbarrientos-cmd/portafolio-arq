"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { Img } from "./Img";
import type { Category, FullProject } from "@/lib/projects";
import { projectTitle } from "@/lib/projects";

export function ProjectIndex({ projects, categories }: { projects: FullProject[]; categories: Category[] }) {
  const [filter, setFilter] = useState<Category | "Todos">("Todos");
  const [hover, setHover] = useState<FullProject | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28 });
  const y = useSpring(my, { stiffness: 260, damping: 28 });

  const list = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);
  const available = categories.filter((c) => projects.some((p) => p.category === c));

  return (
    <section id="indice" className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label text-navy">Índice de obra</span>
            <h2 className="font-display mt-4 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.9]">
              Todos los
              <br />
              proyectos
            </h2>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0" role="group" aria-label="Filtrar por tipología">
            {(["Todos", ...available] as const).map((c) => {
              const count = c === "Todos" ? projects.length : projects.filter((p) => p.category === c).length;
              const on = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`label flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 transition-colors duration-300 ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60"
                  }`}
                >
                  {c}
                  <span className={on ? "text-paper/60" : "text-ink/40"}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul
          className="mt-14 border-t border-ink/15"
          onPointerMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b border-ink/15"
              >
                <Link
                  href={`/proyectos/${p.slug}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p)}
                  onFocus={() => setHover(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[4rem_1fr_14rem_12rem_2rem] sm:gap-6 sm:py-7"
                >
                  <span className="label text-ink/40">{String(p.index).padStart(2, "0")}</span>
                  <span className="font-display text-2xl font-medium transition-transform duration-500 ease-out-expo group-hover:translate-x-3 sm:text-4xl lg:text-5xl">
                    {projectTitle(p)}
                  </span>
                  <span className="hidden text-sm text-ink/60 sm:block">{p.location}</span>
                  <span className="label hidden text-ink/50 sm:block">{p.category}</span>
                  <span className="relative block h-14 w-20 overflow-hidden sm:hidden">
                    <Img image={p.images[0]} alt="" sizes="80px" className="h-full w-full object-cover" />
                  </span>
                  <span className="hidden text-xl transition-transform duration-500 group-hover:translate-x-1 sm:block" aria-hidden>
                    →
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {/* Vista previa que sigue al cursor (solo con mouse) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      >
        <AnimatePresence>
          {hover && (
            <motion.div
              key={hover.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -translate-x-1/2 -translate-y-[115%] overflow-hidden shadow-2xl"
              style={{ width: 360, aspectRatio: "4 / 3" }}
            >
              <Img image={hover.images[0]} alt="" sizes="360px" className="h-full w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
