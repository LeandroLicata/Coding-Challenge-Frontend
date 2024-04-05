import CardsContainer from "@/components/CardsContainer";
import useProducts from "@/hooks/useProducts";

export default function Home() {
  const { products } = useProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <CardsContainer products={products} />
    </main>
  );
}
