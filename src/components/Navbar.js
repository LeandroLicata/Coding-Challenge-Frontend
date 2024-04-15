import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-10 h-[10vh]">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-white font-bold text-2xl cursor-pointer">
              StoryDots
              <br /> <span className="text-teal-400">Coding Challenge</span>
            </span>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:bg-gray-700"
          >
            <svg
              className="h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18ZM3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6ZM5 12C4.44772 12 4 12.4477 4 13C4 13.5523 4.44772 14 5 14H19C19.5523 14 20 13.5523 20 13C20 12.4477 19.5523 12 19 12H5ZM5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18H5Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center">
          <Link href="/">
            <span className="text-white mr-5 cursor-pointer border-b-2 border-transparent hover:border-white pb-1">
              Inicio
            </span>
          </Link>
          {!session ? (
            <>
              <Link href="/users/login">
                <span className="text-white mr-5 cursor-pointer border-b-2 border-transparent hover:border-white pb-1">
                  Iniciar sesión
                </span>
              </Link>
              <Link href="/users/register">
                <span className="flex text-purple-800 hover:text-teal-400 bg-teal-400 hover:bg-purple-800 px-5 py-2 rounded-lg text-md font-medium">
                  Registrarse
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/products/add">
                <span className="text-white mr-4 cursor-pointer border-b-2 border-transparent hover:border-white pb-1">
                  Agregar producto
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex text-purple-800 hover:text-teal-400 bg-teal-400 hover:bg-purple-800 px-5 py-2 rounded-lg text-md font-medium"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden text-xl mt-4">
          <div className="flex flex-col items-center">
            <Link href="/">
              <span className="text-white mt-4 cursor-pointer">Inicio</span>
            </Link>
            {!session ? (
              <>
                <Link href="/users/login">
                  <span className="text-white mt-4 cursor-pointer">
                    Iniciar sesión
                  </span>
                </Link>
                <Link href="/users/register">
                  <span className="flex text-purple-800 hover:text-teal-400 bg-teal-400 hover:bg-purple-800 px-5 py-2 rounded-lg text-md font-medium mt-3">
                    Registrarse
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/products/add">
                  <span className="text-white mt-4 cursor-pointer">
                    Agregar producto
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex text-purple-800 hover:text-teal-400 bg-teal-400 hover:bg-purple-800 px-5 py-2 rounded-lg text-md font-medium mt-3"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
