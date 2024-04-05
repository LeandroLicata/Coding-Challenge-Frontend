import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardsContainer = ({ products }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, idx) => {
        const formattedPrice = new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(product.price);

        return (
          <motion.div key={idx} className="flex justify-center"
            layoutId={selectedId === idx ? product.name : null}
            onClick={() => setSelectedId(idx)}>
            <motion.div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
              <motion.img
                className="w-full h-48 object-cover"
                src={product.image_url}
                alt={product.name}
              />
              <motion.div className="p-4">
                <motion.h2 className="font-bold text-xl mb-2">{product.name}</motion.h2>
                <motion.p className="text-gray-700 text-base mb-2">{formattedPrice}</motion.p>
                <motion.button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setSelectedId(null)}>
                  Comprar
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
              className="w-64 bg-white shadow-md rounded-lg overflow-hidden"
              layoutId={selectedId !== null ? products[selectedId].name : null}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <motion.img
                className="w-full h-48 object-cover"
                src={products[selectedId].image_url}
                alt={products[selectedId].name}
              />
              <motion.div className="p-4">
                <motion.h2 className="font-bold text-xl mb-2">{products[selectedId].name}</motion.h2>
                <motion.p className="text-gray-700 text-base mb-2">
                  {new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(products[selectedId].price)}
                </motion.p>
                <motion.button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setSelectedId(null)}
                >
                  Comprar
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardsContainer;
