import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.get("https://vibecommerce.onrender.com/api/cart");
      const cartItems = data.cart;

      const res = await axios.post("https://vibecommerce.onrender.com/api/checkout", {
        name,
        email,
        cartItems,
      });

      setReceipt(res.data.receipt);
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error("Checkout failed!");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">Checkout</h2>
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </div>

      {receipt && (
        <div className="mt-6 bg-green-100 border border-green-300 rounded p-4 w-full max-w-md">
          <h3 className="text-lg font-bold mb-2 text-green-700">
            Order Successful
          </h3>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Time:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
