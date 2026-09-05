"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEventHandler, useState } from "react";
import { LearnedTile, type LearnedPost } from "./learnedTile";

/**
 * Owns the cursor-following cover preview, which has to sit above the rows
 * rather than inside one - same arrangement as the projects list.
 */
export const LearnedList = ({ posts }: { posts: LearnedPost[] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState<string | null>(null);

  const handleMouseMove: MouseEventHandler<HTMLElement> = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      {posts.map((post) => (
        <LearnedTile key={post.id} {...post} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          alt=""
        />
      )}
    </div>
  );
};
