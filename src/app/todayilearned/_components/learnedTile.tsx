import { ArrowUpRight } from "lucide-react";

export type LearnedPost = {
  id: number;
  title: string;
  platform: string;
  date: string;
  description: string;
  href: string;
  image: string;
  /** Plain strings - they are unique within a post, so they key themselves. */
  tags: readonly string[];
};

/**
 * Resolved from the post's `platform` string rather than stored per post, so
 * adding an article stays a matter of writing "Hashnode" or "Substack".
 * Keyed lowercase to survive a stray capital. Both marks carry their brand
 * colour, so neither takes the `theme-icon` invert.
 */
const PLATFORM_LOGOS: Record<string, string> = {
  hashnode: "/assets/logos/hashnode.svg",
  substack: "/assets/logos/substack.svg",
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
}: LearnedPost) => {
  const logo = PLATFORM_LOGOS[platform.toLowerCase()];

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-start gap-4 py-8 sm:gap-7"
      >
        {/* The ratio lives on the container, not the image, so the frame is
            exactly 16:9 whatever the source is - and self-start stops flexbox
            stretching it to the row height and drawing its border round the
            empty space underneath. bg-muted backs the covers saved as
            transparent PNGs. */}
        <div className="aspect-video w-24 shrink-0 self-start overflow-hidden rounded-lg border border-border bg-muted sm:w-40 md:w-48">
          {image ? (
            <img
              src={image}
              // Decorative: the title next to it already names the post.
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              {logo && <img src={logo} alt="" className="h-6 w-6 opacity-40" />}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-x-6 gap-y-3 sm:flex-nowrap sm:items-center">
          <div className="min-w-0">
            <p className="text-xl transition-colors group-hover:text-red-400 md:text-2xl">
              {title}
            </p>
            <p className="subtext mt-2 line-clamp-2">{description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sand">
              {/* Falls back to the plain name so an unmapped platform still
                  reads correctly instead of rendering nothing. */}
              {logo ? (
                <img
                  src={logo}
                  alt={platform}
                  title={platform}
                  className="h-5 w-5 shrink-0"
                />
              ) : (
                <span>{platform}</span>
              )}
              {tags.length > 0 && (
                <span
                  aria-hidden
                  className="hidden h-4 w-px shrink-0 bg-divider md:inline-block"
                />
              )}
              {tags.map((tag) => (
                <span key={tag} className="hidden md:inline">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="text-sm text-muted-foreground">{date}</span>
            <span className="flex items-center gap-1 transition-transform duration-200 group-hover:-translate-y-1">
              Read
              <ArrowUpRight size={20} />
            </span>
          </div>
        </div>
      </a>
      <div className="bg-gradient-to-r from-transparent via-divider to-transparent h-[1px] w-full" />
    </>
  );
};
