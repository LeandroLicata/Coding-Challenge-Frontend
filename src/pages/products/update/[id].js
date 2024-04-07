import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import useProducts from "@/hooks/useProducts";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { products } = useProducts();
  const product = products.find((product) => product.id === id);

  return (
    <div className="py-2">
      <ProductForm id={id} product={product} isEditing={true} />
    </div>
  );
}
