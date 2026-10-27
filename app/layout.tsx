import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "ARQT Estudio de Arquitectura y Diseño — Arq. Gustavo Ríos Barrientos. Diseño arquitectónico, supervisión técnica, construcción, remodelación y dirección de obra en Guerrero y todo México.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ARQT — Estudio de Arquitectura y Diseño",
    template: "%s — ARQT Arquitectura",
  },
  description,
  openGraph: {
    title: "ARQT — Estudio de Arquitectura y Diseño",
    description,
    locale: "es_MX",
    type: "website",
    siteName: site.fullName,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#070b18",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
