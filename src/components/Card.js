const Card = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(product.price);

  return (
    <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={product.image_url}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base mb-2">{formattedPrice}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
