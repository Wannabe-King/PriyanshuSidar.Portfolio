"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { Ref, useEffect, useRef, useState } from "react";

interface TimelineProp {
  data: {
    title: string;
    job: string;
    date: string;
    /** Omitted on older roles, so every consumer must treat it as optional. */
    location?: string;
    stack?: string;
    contents: string[];
  }[];
}

export const Timeline = ({ data }: TimelineProp) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div className="w-4 h-4 p-2 border rounded-full bg-surface border-divider" />
              </div>
              <div className="exp-role flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-foreground">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-muted-foreground">{item.title}</h3>
                {/* Company sits a step below the role: same size, but light
                    against the role's bold so the two stop reading as one
                    block. Manrope's axis bottoms out at 200, so 300 is safe. */}
                <h3 className="text-3xl font-light text-subtle">{item.job}</h3>
                {item.location && (
                  <p className="text-lg font-normal text-subtle">
                    {item.location}
                  </p>
                )}
                {item.stack && (
                  <p className="text-sm font-normal text-subtle text-pretty">
                    {item.stack}
                  </p>
                )}
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="exp-role block mb-4 text-2xl font-bold text-left text-foreground md:hidden ">
                <h3>{item.date}</h3>
                <h3 className="text-muted-foreground">{item.title}</h3>
                <h3 className="font-light text-subtle">{item.job}</h3>
                {item.location && (
                  <p className="text-base font-normal text-subtle">
                    {item.location}
                  </p>
                )}
                {item.stack && (
                  <p className="text-sm font-normal text-subtle text-pretty">
                    {item.stack}
                  </p>
                )}
              </div>
              {item.contents.map((content, index) => (
                <p
                  className="mb-3 font-normal text-muted-foreground max-w-[68ch]"
                  key={index}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-divider to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-red-400 via-red-400/40 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
