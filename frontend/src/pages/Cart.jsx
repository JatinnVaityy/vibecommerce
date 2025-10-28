import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://vibecommerce.onrender.com/api/cart");
      setCart(res.data.cart || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error("Error fetching cart");
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`https://vibecommerce.onrender.com/api/cart/${id}`);
      setCart((prev) => prev.filter((item) => item._id !== id));
      toast.info("Item removed from cart");
    } catch {
      toast.error("Error removing item");
    }
  };

  // Update quantity (increment/decrement)
  const updateQuantity = async (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    try {
      const res = await axios.put(`https://vibecommerce.onrender.com/api/cart/${id}`, {
        qty,
      });
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, qty: res.data.updatedItem.qty } : item
        )
      );
      toast.success("Cart updated");
    } catch {
      toast.error("Error updating quantity");
    }
  };

  const handleCheckout = () => {
    if (!cart.length) {
      toast.warning("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">
        Your Cart
      </h2>

      {!cart.length ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 mb-3 flex justify-between items-center"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.productId.name}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.qty - 1)}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-3 font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.qty + 1)}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-lg">
                  ₹{item.productId.price * item.qty}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <p className="font-bold text-lg">
              Total: ₹
              {cart.reduce(
                (acc, item) => acc + item.productId.price * item.qty,
                0
              )}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Go to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
