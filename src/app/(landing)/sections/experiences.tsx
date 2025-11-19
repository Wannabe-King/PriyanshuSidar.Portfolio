import { experiences } from "@/lib/constant";
import { Timeline } from "../components/timeline";

export const Experiences = () => {
  return (
    <section id="exp" className="w-full">
      <Timeline data={experiences} />
    </section>
  );
};
