import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "@/features/product/productSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const useProducts = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
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
        dispatch(deleteProduct(product.id))
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Producto borrado",
              text: `El producto ${product.name} ha sido borrado exitosamente.`,
            }).then(() => {
              setSelectedId(null);
              dispatch(fetchProducts());
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al intentar borrar el producto.",
            });
          });
      }
    });
  };

  return { products, handleDeleteProduct };
};

export default useProducts;
