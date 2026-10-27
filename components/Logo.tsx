type Props = { variant?: "full" | "mark"; className?: string; title?: string };

/** Logo ARQT como máscara: toma el color de `currentColor`. */
export function Logo({ variant = "mark", className = "", title = "ARQT" }: Props) {
  const src = variant === "full" ? "/arqt-logo.png" : "/arqt-mark.png";
  const ratio = variant === "full" ? "521 / 284" : "208 / 144";
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: ratio,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
