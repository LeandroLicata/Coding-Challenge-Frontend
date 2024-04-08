import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import useProducts from "@/hooks/useProducts";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { products } = useProducts();
  const product = products.find((product) => product.id === id);

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center py-4">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Editar producto</h1>
          <ProductForm id={id} product={product} isEditing={true} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
