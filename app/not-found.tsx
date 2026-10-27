import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center bg-navy px-4 text-center">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
      <Logo className="relative h-16" />
      <h1 className="font-display relative mt-8 text-6xl font-semibold sm:text-8xl">404</h1>
      <p className="relative mt-4 text-white/70">Este espacio todavía no está construido.</p>
      <Link href="/" className="label relative mt-10 rounded-full border border-white/40 px-6 py-4 hover:bg-white/10">
        Volver al inicio
      </Link>
    </main>
  );
}
