import About from "./sections/about";
import { Experiences } from "./sections/experiences";
import { Hero } from "./sections/hero";
import { Projects } from "./sections/projects";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl">
      <Hero />
      <About />
      <Projects />
      <Experiences/>
    </main>
  );
}
