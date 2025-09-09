import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="py-8 fixed bottom-10 left-0 right-0 overflow-x-scroll bg-amber-300">
      <nav className="flex justify-center gap-8 mx-8 whitespace-nowrap">
        <Link href={"/#"} className="bg-blurfg-100 py-4 px-4 rounded-3xl glass">
          HOME
        </Link>

        <Link
          href={"/#projects"}
          className="py-2 px-4 bg-blur-100 backdrop-filter bg-opacity-0 backdrop-blur-3xl rounded-3xl"
        >
          PROJECTS
        </Link>
        <Link href={"/#exp"} className="py-2 px-4 glass rounded-3xl">
          WORK EXPERIENCE
        </Link>
      </nav>
    </header>
  );
};
