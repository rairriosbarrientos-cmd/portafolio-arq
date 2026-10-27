"use client";

import { useRef, useState } from "react";
import { Img } from "./Img";
import type { ProjectImage } from "@/lib/projects";

/** Comparador arrastrable plano / render. */
export function CompareSlider({ plano, render, title }: { plano: ProjectImage; render: ProjectImage; title: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden"
      style={{ aspectRatio: `${render.width} / ${render.height}` }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Img image={plano} alt={`${title} — plano`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img image={render} alt={title} className="h-full w-full object-cover" />
      </div>
      <span className="label pointer-events-none absolute left-3 top-3 rounded-full bg-ink/50 px-3 py-1.5 backdrop-blur">Obra</span>
      <span className="label pointer-events-none absolute right-3 top-3 rounded-full bg-ink/50 px-3 py-1.5 backdrop-blur">Plano</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-ink/60 text-sm backdrop-blur">
          ↔
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar plano y obra"
        className="sr-only"
      />
    </div>
  );
}
