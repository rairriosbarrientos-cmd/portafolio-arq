import type { ProjectImage } from "@/lib/projects";

type Props = {
  image: ProjectImage;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/** Imagen estática con variante ligera para móvil (el export estático no optimiza imágenes). */
export function Img({ image, alt, sizes = "100vw", className = "", priority = false }: Props) {
  const smWidth = Math.min(760, Math.round((image.width * 760) / Math.max(image.width, image.height)));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      srcSet={`${image.sm} ${smWidth}w, ${image.src} ${image.width}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
