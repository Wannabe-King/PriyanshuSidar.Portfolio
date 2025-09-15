import { mySocials } from "@/lib/constant";
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

// TODO: Make navbar to appear on hover over the div

export const Navbar = () => {
  return (
    <header
      className="flex justify-center gap-4 fixed bottom-10 left-0 right-0 overflow-x-scroll md:overflow-visible z-10
    ]
    "
    >
      <Link
        className=" bg-blurfg-100 text-gray-600 glass rounded-full self-start hidden xs:block xs:mt-3 "
        href={"#contact"}
      >
        <MailOpen size={25} className="m-4" fill="white" />
      </Link>
      <Link
        className=" bg-blurfg-100 text-white glass rounded-full self-start hidden xs:block xs:mt-3 "
        href={"https://www.linkedin.com/in/priyanshu-sidar-639914144/"}
      >
        <Linkedin size={25} className="m-4" fill="white" />
      </Link>
      <div className="bg-blurfg-100 glass rounded-full p-2 xs:p-2.5">
        <div className=" p-3 xs:p-4 bg-red-400 text-blurfg-100 rounded-full ">
          <Ellipsis />
        </div>
      </div>
      <Link
        className=" bg-blurfg-100 text-white glass rounded-full self-start hidden xs:block xs:mt-3 "
        href={"#"}
      >
        <Twitter size={25} className="m-4" fill="white" />
      </Link>
      <Link
        className=" bg-blurfg-100 glass text-white rounded-full self-start hidden xs:block xs:mt-3 "
        href={"https://github.com/Wannabe-King"}
      >
        <Github size={25} className="m-4" fill="white" />
      </Link>
      
      
      {/* FIX THIS */}


      {/* <nav className="flex justify-center gap-8 mx-8 ">
        <Link href={"/#"} className="bg-blurfg-100 py-4 px-4 rounded-4xl glass">
          HOME
        </Link>

        <Link
          href={"/#about"}
          className="py-4 px-4 bg-blurfg-100 glass rounded-4xl"
        >
          ABOUT
        </Link>
        <Link
          href={"/#projects"}
          className="py-4 px-4 bg-blurfg-100 glass rounded-4xl"
        >
          PROJECTS
        </Link>
        <Link
          href={"/#exp"}
          className="py-4 px-4 bg-blurfg-100 glass whitespace-nowrap rounded-4xl"
        >
          WORK EXPERIENCE
        </Link>
        <Link
          href={"/#contact"}
          className="py-4 bg-blurfg-100 px-4 glass rounded-4xl"
        >
          CONTACT
        </Link>
      </nav> */}
    </header>
  );
};
