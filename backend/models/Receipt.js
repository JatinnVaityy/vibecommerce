import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
