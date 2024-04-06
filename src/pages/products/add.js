import ProductForm from "@/components/ProductForm";

export default function AddProduct() {
  return (
    <div className="py-2">
      <ProductForm isEditing={false} />
    </div>
  );
}
