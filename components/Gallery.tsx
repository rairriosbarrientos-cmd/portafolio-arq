"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Img } from "./Img";
import { RevealMask } from "./Reveal";
import type { ProjectImage } from "@/lib/projects";
import { getLenis } from "@/lib/lenis";

export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open, go]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {images.map((img, i) => {
          const wide = img.width / img.height > 1.45 || (images.length % 2 === 1 && i === 0);
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="view"
              className={`group relative block cursor-zoom-in text-left ${wide ? "sm:col-span-2" : ""}`}
              aria-label={`Ampliar imagen ${i + 1} de ${title}`}
            >
              <RevealMask delay={(i % 2) * 0.1}>
                <Img
                  image={img}
                  alt={`${title} — imagen ${i + 1}`}
                  sizes={wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="w-full transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]"
                />
              </RevealMask>
              <span className="label absolute bottom-3 left-3 rounded-full bg-ink/50 px-3 py-1.5 text-white/80 backdrop-blur">
                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title}, imagen ${open + 1} de ${images.length}`}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-8">
              <span className="label text-white/60">
                {title} · {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="label h-11 px-2 text-white" autoFocus>
                Cerrar ✕
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20" onClick={() => setOpen(null)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-full w-full items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Img image={images[open]} alt={`${title} — imagen ${open + 1}`} className="max-h-full max-w-full object-contain" />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl hover:bg-white/10 sm:flex"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl hover:bg-white/10 sm:flex"
                    aria-label="Siguiente"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
