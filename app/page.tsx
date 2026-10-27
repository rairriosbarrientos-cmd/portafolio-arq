import { BlueprintReveal } from "@/components/BlueprintReveal";
import { FeaturedRail } from "@/components/FeaturedRail";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Architect, ClosingQuote, Contact, Philosophy, Services, Studio } from "@/components/Sections";
import { categories, getProject, locations, projects, studioImages } from "@/lib/projects";
import { services } from "@/lib/site";

function mustGet(slug: string) {
  const project = getProject(slug);
  if (!project) throw new Error(`Proyecto inexistente: ${slug}`);
  return project;
}

const heroSlides = [
  { slug: "departamentos-ekato", imageIndex: 1 },
  { slug: "casa-texcalco", imageIndex: 0 },
  { slug: "la-bocata", imageIndex: 0 },
  { slug: "casa-montes-urales", imageIndex: 0 },
  { slug: "pro-laguna-41", imageIndex: 0 },
].map(({ slug, imageIndex }) => ({ project: mustGet(slug), imageIndex }));

const blueprint = mustGet("casa-montes-urales");

const portrait = { src: "/obra/gustavo.webp", sm: "/obra/gustavo.webp", width: 484, height: 648 };

export default function Home() {
  return (
    <main>
      <Hero slides={heroSlides} total={projects.length} />
      <Marquee items={services.map((s) => s.title)} />
      <Studio total={projects.length} cities={locations.length} images={studioImages} />
      <BlueprintReveal project={blueprint} />
      <FeaturedRail projects={projects.slice(0, 8)} total={projects.length} />
      <ProjectIndex projects={projects} categories={categories} />
      <Philosophy wireframe="/obra/wireframe.webp" />
      <Services />
      <Architect portrait={portrait} />
      <ClosingQuote image={studioImages[1]} />
      <Contact />
    </main>
  );
}
