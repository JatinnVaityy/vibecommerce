import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error("Error fetching products"));
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        productId: product._id,
        qty: 1,
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Products
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
