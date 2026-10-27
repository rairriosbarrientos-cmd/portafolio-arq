"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { hasMounted, markMounted } from "@/lib/first-load";

/** Cortina azul con el isotipo al navegar entre páginas (no en la carga inicial). */
export default function Template({ children }: { children: ReactNode }) {
  const [curtain] = useState(hasMounted);
  useEffect(markMounted, []);

  return (
    <>
      {curtain && (
        <div aria-hidden className="curtain pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-navy text-white">
          <Logo className="curtain-mark h-14" />
        </div>
      )}
      {children}
    </>
  );
}
