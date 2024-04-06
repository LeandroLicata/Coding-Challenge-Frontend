import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 h-[10vh]">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-white font-bold text-2xl cursor-pointer">
              StoryDots
              <br /> <span className="text-teal-400">Coding Challenge</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Secciones */}
          <Link href="/seccion1">
            <span className="text-white mr-4 cursor-pointer">Sección 1</span>
          </Link>
          <Link href="/seccion2">
            <span className="text-white mr-4 cursor-pointer">Sección 2</span>
          </Link>
          <Link href="/seccion3">
            <span className="text-white mr-4 cursor-pointer">Sección 3</span>
          </Link>
          {/* Añade más secciones según necesites */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
