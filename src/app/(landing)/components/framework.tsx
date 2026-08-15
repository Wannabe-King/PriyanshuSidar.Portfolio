import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export function Frameworks() {
  // Only logos that exist under public/assets/logos - the AI stack (FastAPI,
  // LangChain, Pinecone, OpenAI) has no assets checked in yet.
  const skills = [
    "python",
    "typescript",
    "nextjs",
    "react",
    "node",
    "postgresql",
    "tailwindcss",
    "firebase",
    "git",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={30}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={15} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

// No hover transform: these orbit on their own and aren't click targets, so a
// scale-up on hover is feedback for an interaction that doesn't exist.
const Icon = ({ src }: { src: string }) => (
  <img src={src} alt="" className="rounded-sm" />
);
