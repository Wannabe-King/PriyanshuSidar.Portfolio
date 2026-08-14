"use client";

import { motion } from "framer-motion";
import {
  Ellipsis,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MailOpen,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type Position = {
  left?: number;
  width?: number;
  opacity?: number;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  function switchState() {
    setIsOpen(!isOpen);
  }

  return (
    <header
      className="flex justify-center gap-2 md:gap-4 fixed bottom-10 left-0 right-0 overflow-x-scroll md:overflow-visible z-50
    ]
    "
    >
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-foreground glass rounded-full self-start mt-2 xs:mt-3 hover:bg-red-400 hover:text-on-accent"
          href={"#contact"}
        >
          <MailOpen size={25} className="m-3 md:m-4" fill="currentColor" />
        </Link>
      )}
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-foreground glass rounded-full self-start mt-2 xs:mt-3 hover:bg-blue-500 hover:text-white"
          href={"https://www.linkedin.com/in/priyanshu-sidar-639914144/"}
        >
          <Linkedin size={25} className="m-3 md:m-4" fill="currentColor" />
        </Link>
      )}
      <div
        className="bg-blurfg-100 glass rounded-full p-2 xs:p-2.5 font-bold"
        onClick={switchState}
        onMouseEnter={switchState}
        onMouseLeave={switchState}
      >
        {!isOpen && (
          <div className=" p-3 xs:p-4 bg-red-400 text-on-accent rounded-full">
            <Ellipsis />
          </div>
        )}
        {isOpen && (
          <nav className={`flex justify-center mx-8 z-5`}>
            <Tab name="HOME" href="/#" setPosition={setPosition} />
            <Tab name="ABOUT" href="/#about" setPosition={setPosition} />
            <Tab name="PROJECTS" href="/#projects" setPosition={setPosition} />
            <Tab
              name="WORK EXPERIENCE"
              href="/#exp"
              setPosition={setPosition}
            />
            <Tab name="CONTACT" href="/#contact" setPosition={setPosition} />
            {/* Hidden until the blog content is ready. The /todayilearned
                route still exists and is reachable directly. */}
            {/* <Tab
              name="TODAY I LEARNED"
              href="/todayilearned"
              setPosition={setPosition}
            /> */}
            <Cursor position={position} />
          </nav>
        )}
      </div>
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-foreground glass rounded-full self-start mt-2 xs:mt-3 hover:bg-blue-400 hover:text-white"
          href={"#"}
        >
          <Twitter size={25} className="m-3 md:m-4" fill="currentColor" />
        </Link>
      )}
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 glass text-foreground rounded-full self-start mt-2 xs:mt-3 hover:bg-foreground hover:text-background"
          href={"https://github.com/Wannabe-King"}
        >
          <Github size={25} className="m-3 md:m-4" fill="currentColor" />
        </Link>
      )}
    </header>
  );
};

const Tab = ({
  name,
  href,
  setPosition,
}: {
  name: string;
  href: string;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="py-4 px-4  rounded-4xl  whitespace-nowrap hover:text-on-accent "
    >
      {name}
    </Link>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    // A div, not an li: outside a list, `display: list-item` paints a bullet
    // marker to the left of the highlight.
    <motion.div
      animate={{
        ...position,
      }}
      className="absolute -z-10 h-14 rounded-4xl bg-red-400 py-4 text-on-accent"
    />
  );
};
