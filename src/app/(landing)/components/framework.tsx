import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export function Frameworks() {
  const skills = [
    "git",
    "react",
    "tailwindcss",
    "nextjs",
    "python",
    "typescript",
    "firebase",
    "postgresql",
    "flutter",
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

const Icon = ({ src }: { src: string }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
