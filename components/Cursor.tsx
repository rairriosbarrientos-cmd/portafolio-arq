"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Cursor personalizado (solo con mouse). Crece sobre enlaces y muestra "Ver" sobre proyectos. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "view">("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      const view = t?.closest?.("[data-cursor='view']");
      const link = t?.closest?.("a, button, [role='tab'], input, label");
      setMode(view ? "view" : link ? "link" : "idle");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 96 : mode === "link" ? 44 : 10;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          mode === "link" ? "border border-white" : "bg-white"
        }`}
      >
        {mode === "view" && <span className="label text-ink">Ver</span>}
      </motion.div>
    </motion.div>
  );
}
