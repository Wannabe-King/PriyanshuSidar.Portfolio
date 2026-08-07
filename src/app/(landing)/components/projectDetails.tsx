import { Tag } from "@/lib/utils";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ProjectDetailsProp {
  title: string;
  description: string;
  subDescription: string[];
  image: string;
  tags?: Tag[];
  href: string;
  closeModal: MouseEventHandler<HTMLButtonElement>;
}

export const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}: ProjectDetailsProp) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-border"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm cursor-pointer top-5 right-5 bg-midnight hover:bg-storm"
        >
          <img src="assets/close.svg" className="w-6 h-6 theme-icon" alt="Close" />
        </button>
        <img src={image} alt={title} className="w-full max-h-120 rounded-t-2xl"/>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-foreground">{title}</h5>
          <p className="mb-3 font-normal text-muted-foreground">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-muted-foreground">
              {subDesc}
            </p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              {tags &&
                tags.map(
                  (tag) =>
                    tag.path != "" && (
                      <img
                        key={tag.id}
                        src={tag.path}
                        alt={tag.name}
                        className="rounded-lg size-10 hover-animation"
                      />
                    )
                )}
            </div>
            <a
              className="inline-flex items-center gap-1 font-medium cursor-pointer text-foreground hover-animation"
              href={href}
              target="_blank"
            >
              View Project <img src="assets/arrow-up.svg" className="size-4 theme-icon" alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
