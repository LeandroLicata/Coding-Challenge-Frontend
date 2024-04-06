import CardsContainer from "@/components/CardsContainer";
import useProducts from "@/hooks/useProducts";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { products } = useProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <Navbar />
      <CardsContainer products={products} />
    </main>
  );
}
