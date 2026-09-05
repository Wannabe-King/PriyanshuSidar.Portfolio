import type { Metadata } from "next";
import { myBlogs } from "@/lib/constant";
import { LearnedList } from "./_components/learnedList";

export const metadata: Metadata = {
  title: "Today I Learned — Priyanshu Sidar",
  description:
    "Write-ups on voice AI, RAG pipelines, and the systems around them.",
};

export default function TodayILearned() {
  return (
    <main className="c-space mx-auto max-w-5xl pt-28 pb-40 md:pt-36">
      {/* Fixed, so it holds still while the list scrolls over it. -z-10 puts it
          behind the rows but still in front of the page background, which body
          propagates to the canvas rather than painting here. */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-24 -z-10 text-center text-5xl font-extrabold tracking-tight text-subtle/20 sm:text-7xl lg:text-9xl"
      >
        TODAY I LEARNED
      </div>

      <header>
        <h1 className="text-heading">Today I Learned</h1>
        <p className="subtext mt-4">
          Things I ran into while building and then wrote up. Published on
          Hashnode and Substack — each one opens there.
        </p>
      </header>

      <div className="bg-gradient-to-r from-transparent via-divider to-transparent mt-12 h-[1px] w-full" />

      {/* myBlogs is stored oldest-first so a new post can be appended to the
          end rather than spliced in at the top; reversing here is what puts
          the newest one first on screen. Copied first - reverse() mutates. */}
      <LearnedList posts={[...myBlogs].reverse()} />
    </main>
  );
}
