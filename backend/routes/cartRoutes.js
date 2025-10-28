import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cart = await CartItem.find().populate("productId");
    const total = cart.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cart, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const existingItem = await CartItem.findOne({ productId });
    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new CartItem({ productId, qty });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty <= 0)
      return res.status(400).json({ message: "Quantity must be greater than 0" });

    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { qty },
      { new: true }
    ).populate("productId");

    if (!updatedItem)
      return res.status(404).json({ message: "Cart item not found" });

    res.json({ updatedItem });
  } catch (err) {
    res.status(500).json({ message: "Error updating cart item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
});

export default router;
