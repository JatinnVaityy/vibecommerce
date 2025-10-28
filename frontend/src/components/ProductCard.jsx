import { FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 object-contain mb-3 mx-auto"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description.slice(0, 60)}...
        </p>
        <p className="font-bold mt-3 text-blue-700">₹{product.price}</p>
      </div>
      <button
        onClick={() => onAdd(product)}
        className="mt-4 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Add to Cart
      </button>
    </div>
  );
}
