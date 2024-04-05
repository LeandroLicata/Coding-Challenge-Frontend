import CardsContainer from "@/components/CardsContainer";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  const { products } = useProducts();

  return (
    <main className="min-h-[100vh]">
      <CardsContainer products={products} />
    </main>
  );
}
