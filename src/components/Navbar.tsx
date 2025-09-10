import {
  Ellipsis,
  Github,
  Instagram,
  Mail,
  MailOpen,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header
      className="flex justify-center gap-4 fixed bottom-10 left-0 right-0 overflow-x-scroll md:overflow-visible 
    bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1200px-Altja_j%C3%B5gi_Lahemaal.jpg)]
    "
    >
      <div className=" bg-blurfg-100 text-gray-700 glass rounded-full self-start hidden xs:block xs:mt-3 ">
        <MailOpen size={25} className="m-4" fill="white" />
      </div>
      <div className=" bg-blurfg-100 text-gray-700 glass rounded-full self-start hidden xs:block xs:mt-3 ">
        <Instagram size={25} className="m-4" fill="white" />
      </div>
      <div className="bg-blurfg-100 glass rounded-full p-2 xs:p-2.5">
        <div className=" p-3 xs:p-4 bg-red-400 text-blurfg-100 rounded-full ">
          <Ellipsis />
        </div>
      </div>
      <div className=" bg-blurfg-100 glass rounded-full self-start hidden xs:block xs:mt-3 ">
        <Twitter size={25} className="m-4" fill="white" />
      </div>
      <div className=" bg-blurfg-100 glass rounded-full self-start hidden xs:block xs:mt-3 ">
        <Github size={25} className="m-4" fill="white" />
      </div>
      {/* <nav className="flex justify-center gap-8 mx-8 ">
        <Link href={"/#"} className="bg-blurfg-100 py-4 px-4 rounded-4xl glass">
          HOME
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
          href={"/#exp"}
          className="py-4 bg-blurfg-100 px-4 glass rounded-4xl"
        >
          CONTACT
        </Link>
      </nav> */}
    </header>
  );
};
