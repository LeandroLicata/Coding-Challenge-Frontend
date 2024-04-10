import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "@/features/product/productSlice";
import Swal from "sweetalert2";

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProducts())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  const handleDeleteProduct = (product, setSelectedId) => {
    Swal.fire({
      text: `¿Estás seguro de que deseas borrar el producto ${product.name}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        dispatch(deleteProduct(product.id))
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Producto borrado",
              text: `El producto ${product.name} ha sido borrado exitosamente.`,
            }).then(() => {
              setSelectedId(null);
              dispatch(fetchProducts());
              setIsLoading(false);
            });
          })
          .catch(() => {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al intentar borrar el producto.",
            });
          });
      }
    });
  };

  return { products, isLoading, handleDeleteProduct };
};

export default useProducts;
