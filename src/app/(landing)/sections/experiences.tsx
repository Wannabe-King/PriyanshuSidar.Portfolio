import { experiences } from "@/lib/constant";
import { Timeline } from "../components/timeline";

export const Experiences = () => {
  return (
    <section className="w-full">
      <Timeline data={experiences} />
    </section>
  );
};
