import Card from "./Card";

const CardsContainer = ({ products }) => {
  return (
    <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, idx) => {
        return (
          <div key={idx} className="flex justify-center">
            <Card product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
