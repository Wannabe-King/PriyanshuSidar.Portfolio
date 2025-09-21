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
      className="flex justify-center gap-4 fixed bottom-10 left-0 right-0 overflow-x-scroll md:overflow-visible z-50
    ]
    "
    >
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-blurfg-100 glass rounded-full self-start hidden xs:block xs:mt-3 hover:bg-white"
          href={"#contact"}
        >
          <MailOpen size={25} className="m-4" fill="white" />
        </Link>
      )}
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-white glass rounded-full self-start hidden xs:block xs:mt-3 hover:bg-blue-500"
          href={"https://www.linkedin.com/in/priyanshu-sidar-639914144/"}
        >
          <Linkedin size={25} className="m-4" fill="white" />
        </Link>
      )}
      <div
        className="bg-blurfg-100 glass rounded-full p-2 xs:p-2.5 font-bold"
        onClick={switchState}
        onMouseEnter={switchState}
        onMouseLeave={switchState}
      >
        {!isOpen && (
          <div className=" p-3 xs:p-4 bg-red-400 text-blurfg-100 rounded-full">
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
            {/* To be implemented */}
            <Tab
              name="TODAY I LEARNED"
              href="/todayilearned"
              setPosition={setPosition}
            />
            <Cursor position={position} />
          </nav>
        )}
      </div>
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 text-white glass rounded-full self-start hidden xs:block xs:mt-3 hover:bg-blue-400"
          href={"#"}
        >
          <Twitter size={25} className="m-4" fill="white" />
        </Link>
      )}
      {!isOpen && (
        <Link
          className=" bg-blurfg-100 glass text-white rounded-full self-start hidden xs:block xs:mt-3 hover:bg-black"
          href={"https://github.com/Wannabe-King"}
        >
          <Github size={25} className="m-4" fill="white" />
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
      className="py-4 px-4  rounded-4xl  whitespace-nowrap hover:text-blurfg-100 "
    >
      {name}
    </Link>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute -z-10 h-14 rounded-4xl bg-red-400 py-4 text-blurfg-100"
    />
  );
};
