import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useProducts from "@/hooks/useProducts";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const CardsContainer = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { data: session } = useSession();
  const { products, handleDeleteProduct } = useProducts();
  const router = useRouter();

  const handleEditProduct = (productId) => {
    if (!session) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Debes iniciar sesión para editar productos!",
      });
    } else {
      router.push(`/products/update/${productId}`);
    }
  };

  const handleDelete = (product) => {
    if (!session) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Debes iniciar sesión para borrar productos!",
      });
    } else {
      handleDeleteProduct(product, setSelectedId);
    }
  };

  return (
    <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-10">
      {products.map((product, idx) => {
        const formattedPrice = new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(product.price);

        return (
          <motion.div
            key={idx}
            className="flex justify-center"
            layoutId={selectedId === idx ? product.name : null}
            onClick={() => setSelectedId(idx)}
          >
            <motion.div
              className="w-64 bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                className="w-full h-48 object-cover"
                src={product.image_url}
                alt={product.name}
              />
              <motion.div className="p-4 flex flex-col flex-grow">
                <motion.h2 className="font-bold text-xl mb-2 overflow-auto">
                  {product.name}
                </motion.h2>
                <motion.p className="text-gray-700 text-base mb-2">
                  {formattedPrice}
                </motion.p>
                <div className="flex-grow" />
                <div className="flex justify-between items-end">
                  <motion.button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={() => setSelectedId(idx)}
                  >
                    Ver más
                  </motion.button>
                  <div className="flex items-center">
                    <img
                      className="h-10 w-20 ml-2 object-contain"
                      src={product.Brand?.logo_url}
                      alt={product.Brand?.name}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-[50rem] bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              layoutId={selectedId !== null ? products[selectedId].name : null}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <button
                className="absolute top-2 right-2 focus:outline-none"
                onClick={() => setSelectedId(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-1">
                <div className="w-[20rem] h-[18rem] flex-shrink-0">
                  <img
                    className="w-full h-full object-contain"
                    src={products[selectedId].image_url}
                    alt={products[selectedId].name}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-2">
                      {products[selectedId].name}
                    </h2>
                    <p className="text-gray-700 text-base mb-2">
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(products[selectedId].price)}
                    </p>
                    <p className="text-gray-700 text-base mb-2 overflow-auto h-20">
                      {products[selectedId].description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="h-15 w-20 mr-2 object-contain"
                      src={products[selectedId].Brand?.logo_url}
                      alt={products[selectedId].Brand?.name}
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                      onClick={() => handleEditProduct(products[selectedId].id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(products[selectedId])}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardsContainer;
