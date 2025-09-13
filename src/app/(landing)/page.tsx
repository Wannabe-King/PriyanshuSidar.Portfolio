import About from "./sections/about";
import { Hero } from "./sections/hero";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl">
      <Hero />
      <About />
    </main>
  );
}
