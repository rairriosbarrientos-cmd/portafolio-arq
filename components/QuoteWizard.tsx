"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import type { Category } from "@/lib/projects";
import {
  budgets,
  emptyQuote,
  mailtoUrl,
  projectTypes,
  quoteLines,
  serviceOptions,
  sizes,
  stages,
  timings,
  typeFromCategory,
  whatsappUrl,
  type Quote,
} from "@/lib/quote";

type Ref = { slug: string; title: string; category: Category };

const STEPS = ["Proyecto", "Alcance", "Detalles", "Contacto"] as const;
const DRAFT_KEY = "arqt-cotizacion";
const cities = ["Chilpancingo", "Acapulco", "Guadalajara", "Puebla"];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 py-2 text-left text-sm transition-colors duration-300 ${
        on ? "border-white bg-white text-ink" : "border-white/25 text-white/80 hover:border-white/60"
      }`}
    >
      {children}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <legend className="label mb-3 text-white/50">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function QuoteWizard({ refs }: { refs: Ref[] }) {
  const [q, setQ] = useState<Quote>(emptyQuote);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const top = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  // Borrador local + proyecto de referencia desde ?proyecto=slug
  useEffect(() => {
    let draft: Partial<Quote> = {};
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) draft = JSON.parse(raw) as Partial<Quote>;
    } catch {}
    const slug = new URLSearchParams(window.location.search).get("proyecto");
    const ref = refs.find((r) => r.slug === slug);
    const next = { ...emptyQuote, ...draft };
    if (ref) {
      next.inspiration = ref.title;
      next.type = typeFromCategory[ref.category];
    }
    // Sincroniza con datos que solo existen en el navegador (borrador y URL).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQ(next);
    loaded.current = true;
  }, [refs]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(q));
    } catch {}
  }, [q]);

  const set = <K extends keyof Quote>(k: K, v: Quote[K]) => setQ((s) => ({ ...s, [k]: v }));
  const toggle = <K extends "stage" | "size" | "timing" | "budget">(k: K, v: string) =>
    setQ((s) => ({ ...s, [k]: s[k] === v ? null : v }));

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const lines = quoteLines(q);
  const canNext = step !== 0 || q.type !== null;

  const reset = () => {
    setQ(emptyQuote);
    go(0);
  };

  return (
    <section id="cotizar" className="relative scroll-mt-0 overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-30" />
      <div ref={top} className="relative mx-auto grid max-w-[1600px] scroll-mt-20 gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="label text-silver">Cotizador</span>
          <h2 className="font-display mt-4 text-[clamp(2.75rem,6.5vw,6.5rem)] font-semibold leading-[0.9]">
            Cuéntanos
            <br />
            <span className="text-silver">tu proyecto.</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            Cuatro pasos, menos de un minuto. Al final se abre WhatsApp con todo listo para enviarlo directo al arquitecto.
          </p>

          {/* Progreso */}
          <ol className="mt-10 grid grid-cols-4 gap-2" aria-label="Pasos">
            {STEPS.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => (i <= step || q.type ? go(i) : undefined)}
                  aria-current={i === step ? "step" : undefined}
                  className="w-full text-left"
                >
                  <span className="block h-px w-full overflow-hidden bg-white/15">
                    <span
                      className="block h-full origin-left bg-white transition-transform duration-700 ease-out-expo"
                      style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                    />
                  </span>
                  <span className={`label mt-3 block ${i === step ? "text-white" : "text-white/40"}`}>
                    0{i + 1} <span className="hidden sm:inline">· {s}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative mt-10 min-h-[360px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={step}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div>
                    <p className="font-display text-2xl font-medium sm:text-3xl">¿Qué quieres construir?</p>
                    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {projectTypes.map((t, i) => {
                        const on = q.type === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              set("type", t.id);
                              window.setTimeout(() => go(1), 260);
                            }}
                            className={`group flex min-h-[120px] flex-col justify-between border p-4 text-left transition-colors duration-300 ${
                              on ? "border-white bg-white text-ink" : "border-white/15 hover:border-white/50 hover:bg-white/[0.04]"
                            }`}
                          >
                            <span className={`label ${on ? "text-ink/50" : "text-white/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                            <span>
                              <span className="font-display block text-lg font-medium leading-tight">{t.label}</span>
                              <span className={`mt-1 block text-xs ${on ? "text-ink/60" : "text-white/50"}`}>{t.hint}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <p className="font-display text-2xl font-medium sm:text-3xl">¿En qué te podemos ayudar?</p>
                    <div className="mt-6">
                      <Group label="Servicios (elige los que necesites)">
                        {serviceOptions.map((s) => (
                          <Chip
                            key={s}
                            on={q.services.includes(s)}
                            onClick={() =>
                              set("services", q.services.includes(s) ? q.services.filter((x) => x !== s) : [...q.services, s])
                            }
                          >
                            {s}
                          </Chip>
                        ))}
                      </Group>
                      <Group label="¿En qué etapa estás?">
                        {stages.map((s) => (
                          <Chip key={s} on={q.stage === s} onClick={() => toggle("stage", s)}>
                            {s}
                          </Chip>
                        ))}
                      </Group>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="font-display text-2xl font-medium sm:text-3xl">Los detalles</p>
                    <div className="mt-6">
                      <fieldset>
                        <legend className="label mb-3 text-white/50">Ubicación del proyecto</legend>
                        <input
                          value={q.city}
                          onChange={(e) => set("city", e.target.value)}
                          placeholder="Ciudad o colonia"
                          autoComplete="address-level2"
                          className="h-12 w-full border-b border-white/30 bg-transparent text-lg outline-none transition-colors placeholder:text-white/30 focus:border-white"
                        />
                        <div className="mt-3 flex flex-wrap gap-2">
                          {cities.map((c) => (
                            <Chip key={c} on={q.city === c} onClick={() => set("city", q.city === c ? "" : c)}>
                              {c}
                            </Chip>
                          ))}
                        </div>
                      </fieldset>
                      <Group label="Superficie aproximada">
                        {sizes.map((s) => (
                          <Chip key={s} on={q.size === s} onClick={() => toggle("size", s)}>
                            {s}
                          </Chip>
                        ))}
                      </Group>
                      <Group label="¿Cuándo te gustaría empezar?">
                        {timings.map((s) => (
                          <Chip key={s} on={q.timing === s} onClick={() => toggle("timing", s)}>
                            {s}
                          </Chip>
                        ))}
                      </Group>
                      <Group label="Presupuesto estimado (opcional)">
                        {budgets.map((s) => (
                          <Chip key={s} on={q.budget === s} onClick={() => toggle("budget", s)}>
                            {s}
                          </Chip>
                        ))}
                      </Group>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="font-display text-2xl font-medium sm:text-3xl">¿A quién le respondemos?</p>
                    <div className="mt-6 space-y-6">
                      <label className="block">
                        <span className="label mb-2 block text-white/50">Tu nombre</span>
                        <input
                          value={q.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Nombre"
                          autoComplete="name"
                          className="h-12 w-full border-b border-white/30 bg-transparent text-lg outline-none transition-colors placeholder:text-white/30 focus:border-white"
                        />
                      </label>
                      <label className="block">
                        <span className="label mb-2 block text-white/50">¿Algo más que debamos saber? (opcional)</span>
                        <textarea
                          value={q.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          rows={3}
                          placeholder="Número de recámaras, estilo que te gusta, medidas del terreno…"
                          className="w-full resize-none border-b border-white/30 bg-transparent py-2 text-lg outline-none transition-colors placeholder:text-white/30 focus:border-white"
                        />
                      </label>
                      {lines.length > 0 && (
                        <dl className="border border-white/15 px-4 py-2 text-sm lg:hidden">
                          {lines.map(([k, v]) => (
                            <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-white/10 py-2 last:border-b-0">
                              <dt className="text-white/45">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <a
                          href={whatsappUrl(q)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-16 items-center justify-between gap-6 rounded-full bg-[#25D366] px-7 text-ink transition-transform duration-500 hover:scale-[1.02] sm:justify-start"
                        >
                          <span className="font-display text-lg font-semibold">Enviar por WhatsApp</span>
                          <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                            →
                          </span>
                        </a>
                        <a
                          href={mailtoUrl(q)}
                          className="flex h-16 items-center justify-between gap-6 rounded-full border border-white/30 px-7 transition-colors hover:bg-white/10 sm:justify-start"
                        >
                          <span className="font-display text-lg font-medium">Enviar por correo</span>
                          <span aria-hidden>↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => (step === 0 ? reset() : go(step - 1))}
              className="label h-11 text-white/60 hover:text-white"
            >
              {step === 0 ? (lines.length ? "Empezar de nuevo" : "") : "← Atrás"}
            </button>
            {step < 3 && (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => go(step + 1)}
                className="label flex h-12 items-center gap-3 rounded-full bg-white px-6 text-ink transition-opacity disabled:opacity-30"
              >
                {step === 0 && !q.type ? "Elige una opción" : "Siguiente →"}
              </button>
            )}
          </div>
        </div>

        {/* Resumen en vivo */}
        <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block" aria-live="polite">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden border border-white/15 bg-ink/60 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
                <span className="label text-silver">Tu proyecto</span>
                <Logo className="h-4 text-white/60" />
              </div>
              <dl className="min-h-[220px] px-5 py-2">
                {lines.length === 0 ? (
                  <p className="py-6 text-sm leading-relaxed text-white/40">
                    Aquí va apareciendo el resumen de lo que elijas. Es exactamente lo que recibirá el arquitecto.
                  </p>
                ) : (
                  lines.map(([k, v]) => (
                    <motion.div
                      key={k}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-[7rem_1fr] gap-3 border-b border-white/10 py-3 text-sm last:border-b-0"
                    >
                      <dt className="text-white/45">{k}</dt>
                      <dd>{v}</dd>
                    </motion.div>
                  ))
                )}
              </dl>
              <div className="label border-t border-white/15 px-5 py-3 text-white/40">Llega directo al WhatsApp de ARQT</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
