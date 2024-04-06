import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardsContainer = ({ products }) => {
  const [selectedId, setSelectedId] = useState(null);

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
              className="w-64 bg-white shadow-md rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                className="w-full h-48 object-cover"
                src={product.image_url}
                alt={product.name}
              />
              <motion.div className="p-4">
                <motion.h2 className="font-bold text-xl mb-2">
                  {product.name}
                </motion.h2>
                <motion.p className="text-gray-700 text-base mb-2">
                  {formattedPrice}
                </motion.p>
                <motion.button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setSelectedId(idx)}
                >
                  Ver más
                </motion.button>
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
        className="relative w-[50rem] h-[18rem] bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
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
              <p className="text-gray-700 text-base mb-2">
                {products[selectedId].description}
              </p>
            </div>
            <div className="flex items-center">
              <img
                className="w-20 mr-2"
                src={products[selectedId].Brand?.logo_url}
                alt={products[selectedId].Brand?.name}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                Actualizar
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
