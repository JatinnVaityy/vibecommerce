import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    axios
      .get("https://vibecommerce.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching products");
        setLoading(false);
      });
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post("https://vibecommerce.onrender.com/api/cart", {
        productId: product._id,
        qty: 1,
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Error adding to cart");
    }
  };

  // 🌀 Loader while fetching products
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        {/* Circle Loader */}
        <div className="relative">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        </div>
        <p className="text-gray-600 font-medium text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
