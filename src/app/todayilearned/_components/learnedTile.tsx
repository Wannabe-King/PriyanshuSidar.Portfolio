"use client";

import { ArrowUpRight } from "lucide-react";
import { Dispatch, Key, SetStateAction } from "react";

export type LearnedPost = {
  id: number;
  title: string;
  platform: string;
  date: string;
  description: string;
  href: string;
  image: string;
  tags: { id: Key; name: string }[];
};

type LearnedTileProps = LearnedPost & {
  setPreview: Dispatch<SetStateAction<string | null>>;
};

/**
 * One row in the writing list. The post itself lives on Hashnode or Substack,
 * so the whole row is a single external anchor rather than the modal the
 * project rows open.
 */
export const LearnedTile = ({
  title,
  platform,
  date,
  description,
  href,
  image,
  tags,
  setPreview,
}: LearnedTileProps) => {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        // Only rows that ship a cover feed the cursor preview; the rest clear
        // it, so moving between them never leaves a stale image on screen.
        onMouseEnter={() => setPreview(image || null)}
        onMouseLeave={() => setPreview(null)}
        onFocus={() => setPreview(image || null)}
        onBlur={() => setPreview(null)}
        className="group flex flex-wrap items-start justify-between gap-x-6 gap-y-4 py-10 sm:flex-nowrap sm:items-center"
      >
        <div className="min-w-0">
          <p className="text-2xl transition-colors group-hover:text-red-400">
            {title}
          </p>
          <p className="subtext mt-2">{description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sand">
            <span>{platform}</span>
            {tags.map((tag) => (
              <span key={tag.id} className="hidden md:inline">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-sm text-muted-foreground">{date}</span>
          <span className="flex items-center gap-1 hover-animation">
            Read
            <ArrowUpRight size={20} />
          </span>
        </div>
      </a>
      <div className="bg-gradient-to-r from-transparent via-divider to-transparent h-[1px] w-full" />
    </>
  );
};
