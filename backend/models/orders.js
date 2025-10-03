import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    size: { type: String },  // optional if not all products have sizes
    color: { type: String }, // optional
    quantity: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash_on_delivery", "card", "bkash"], default: "cash_on_delivery" },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
