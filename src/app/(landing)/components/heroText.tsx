"use client";

import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "framer-motion";

export const HeroText = () => {
  const words = ["Real-Time", "Agentic", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const openResumeInNewPage = () => {
    window.open(process.env.NEXT_PUBLIC_RESUME_URL, "_blank");
  };

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium text-muted-foreground"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I&apos;m Priyanshu
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-muted-foreground"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            An AI Engineer <br /> Dedicated to Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-foreground text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-muted-foreground"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Voice AI & RAG Systems
          </motion.p>
          <motion.div
            onClick={openResumeInNewPage}
            className="mt-10 py-4 px-16 my-4 bg-red-400 text-on-accent rounded-2xl cursor-pointer"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            Resume
          </motion.div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium text-muted-foreground"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi,I&apos;m Priyanshu
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-muted-foreground"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-foreground text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-black text-muted-foreground"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Voice AI & RAG Systems
          </motion.p>
          <motion.div
            onClick={openResumeInNewPage}
            className="mt-5 py-3 my-4 w-40 mx-auto bg-red-400 text-on-accent rounded-2xl cursor-pointer"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            Resume
          </motion.div>
        </div>
      </div>
    </div>
  );
};
