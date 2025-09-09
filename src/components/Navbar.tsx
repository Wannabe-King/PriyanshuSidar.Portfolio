import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="py-8 fixed bottom-10 left-0 right-0 overflow-x-scroll md:overflow-visible bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1200px-Altja_j%C3%B5gi_Lahemaal.jpg)]">
      <nav className="flex justify-center gap-8 mx-8 whitespace-nowrap">
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
          className="py-4 px-4 bg-blurfg-100 glass rounded-4xl"
        >
          WORK EXPERIENCE
        </Link>
        <Link
          href={"/#exp"}
          className="py-4 bg-blurfg-100 px-4 glass rounded-4xl"
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
};
