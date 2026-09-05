"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";

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
  // Which roles have their contributions open. Only consulted below md - the
  // panel is forced open from `md` up, so desktop ignores this entirely.
  const [expandedRoles, setExpandedRoles] = useState<ReadonlySet<number>>(
    new Set(),
  );
  const panelId = useId();

  const toggleContributions = (index: number) => {
    setExpandedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Observed rather than measured once: expanding a contributions panel
    // changes the list's height after mount, and a stale value would leave the
    // scroll progress line ending short of the last entry. getBoundingClientRect
    // over contentRect so the container's own pb-20 stays counted.
    const observer = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        {data.map((item, index) => {
          const isOpen = expandedRoles.has(index);

          return (
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
                  <h3 className="text-3xl text-muted-foreground">
                    {item.title}
                  </h3>
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

                {/* Mobile only: four bullets per role run long enough to push
                    the next entry off-screen, so they collapse behind a toggle
                    below md. Driven by a breakpoint rather than a matchMedia
                    read, so the server and the first client paint agree. */}
                <button
                  type="button"
                  onClick={() => toggleContributions(index)}
                  aria-expanded={isOpen}
                  aria-controls={`${panelId}-${index}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 mb-4 text-sm transition-colors border rounded-full cursor-pointer md:hidden text-muted-foreground border-border bg-input hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isOpen ? "Hide contributions" : "My contributions"}
                  <ChevronDown
                    aria-hidden
                    className={`size-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 0fr -> 1fr is what `height: auto` cannot animate, so the
                    panel opens smoothly with nothing measured in JS. The md
                    variant pins it open, which is why the button is md:hidden. */}
                <div
                  id={`${panelId}-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {item.contents.map((content, contentIndex) => (
                      <p
                        className="mb-3 font-normal text-muted-foreground max-w-[68ch]"
                        key={contentIndex}
                      >
                        {content}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
