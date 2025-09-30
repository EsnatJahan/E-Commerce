import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // or ObjectId if you link to Category
  type: { type: String, required: true},
  description: { type: String, default: "" },
  brand: { type: String, required : true},
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage
  sizes: { type: [String], default: [] }, // e.g., ["S", "M", "L"]
  colors: { type: [String], default: [] }, // e.g., ["Red", "Blue"]
  stock: { type: Number, default: 0 },
  images: { type: [String], default: [] }, // array of image URLs
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
