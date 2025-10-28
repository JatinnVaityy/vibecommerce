import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products cleared!");

    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    const products = await response.json();

    const formatted = products.map(p => ({
      name: p.title,
      price: p.price,
      description: p.description,
      image: p.image,
    }));

    await Product.insertMany(formatted);
    console.log("Fake Store API data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
