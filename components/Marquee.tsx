import { Logo } from "./Logo";

export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="font-display whitespace-nowrap px-6 text-[clamp(2rem,6vw,5.5rem)] font-semibold sm:px-10">{t}</span>
          <Logo className="h-6 text-navy-bright sm:h-9" title="" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-6 sm:py-10" aria-label={items.join(", ")}>
      <div className="marquee-track flex w-max" aria-hidden>
        {row}
        {row}
      </div>
    </div>
  );
}
