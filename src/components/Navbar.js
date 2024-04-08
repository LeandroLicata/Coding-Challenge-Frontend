import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 h-[10vh]">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-white font-bold text-2xl cursor-pointer">
              StoryDots
              <br /> <span className="text-teal-400">Coding Challenge</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center">
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
    </nav>
  );
};

export default Navbar;
