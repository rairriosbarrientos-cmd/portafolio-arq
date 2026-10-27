"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { getLenis } from "@/lib/lenis";
import { site } from "@/lib/site";

const links = [
  { href: "/#obra", label: "Obra" },
  { href: "/#estudio", label: "Estudio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#arquitecto", label: "Arquitecto" },
  { href: "/#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cierra el menú al navegar
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white transition-transform duration-500 ease-out-expo ${
          open ? "" : "mix-blend-difference"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="ARQT, inicio">
            <Logo className="h-6 sm:h-7" />
            <span className="font-wide text-sm font-semibold tracking-[0.2em]">ARQT</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="label opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu"
            className="label flex h-11 items-center gap-3 md:hidden"
          >
            {open ? "Cerrar" : "Menú"}
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-navy px-4 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
            <nav className="relative flex flex-col" aria-label="Menú móvil">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/15 py-4"
                  >
                    <span className="label text-white/50">0{i + 1}</span>
                    <span className="font-display text-5xl font-semibold">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative space-y-1 text-sm text-white/70">
              <a href={`https://wa.me/${site.whatsapp}`} className="block">
                WhatsApp {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block">
                {site.email}
              </a>
              {site.facebook && (
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="block">
                  Facebook ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
