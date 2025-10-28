import express from "express";
import Receipt from "../models/Receipt.js";
import CartItem from "../models/CartItem.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { cartItems, name, email } = req.body;

  if (!cartItems || !cartItems.length)
    return res.status(400).json({ message: "Cart is empty" });

  const total = cartItems.reduce((sum, i) => sum + i.productId.price * i.qty, 0);

  const receipt = new Receipt({ items: cartItems, total, name, email });
  await receipt.save();

  await CartItem.deleteMany();

  res.json({ message: "Checkout successful", receipt });
});

export default router;
