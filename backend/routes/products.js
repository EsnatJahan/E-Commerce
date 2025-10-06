// routes/product.js
import express from "express";
import Product from "../models/products.js";
import User from "../models/users.js";
import Order from "../models/orders.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

import multer from "multer";
import path from "path";

const router = express.Router();

const image_override = (x) => `http://localhost:3000${x}`;
// Get all products OR by category
router.get("/GetProduct", async (req, res) => {
  const { type } = req.query; // category filter
  try {
    const filter = type ? { type } : {};
    const products = await Product.find(filter);
    products.forEach((product) => {
      product.images = product.images.map(image_override);
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/GetProductDetail/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.images = product.images.map(image_override);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Get products by brand and type (for recommendations)
router.get("/GetProductofBrand", async (req, res) => {
  const { brand, type } = req.query;

  try {
    // Build filter based on query
    const filter = {};
    if (brand) filter.brand = brand;
    if (type) filter.type = type;

    const products = await Product.find(filter);

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    products.forEach((product) => {
      product.images = product.images.map(image_override);
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


// User Registration
router.post("/signup", async (req, res) => {
    console.log("Signup request received:", req.body);
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user`
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    
    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Place an order
router.post("/order", verifyToken, async (req, res) => {
  try {
    const { productId, address, phone, quantity, paymentMethod, size, color } = req.body;

    // Find product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check stock
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Create order
    const order = new Order({
      user: req.user.id,   // comes from verifyToken
      product: productId,
      address,
      phone,
      quantity,
      paymentMethod,
      size,
      color
    });

    await order.save();

    // Decrease stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* 📦 GET all pending orders (admin only) */
router.get("/pending", verifyToken, async (req, res) => {
  try {
    // ensure the requester is an admin
    const currentUser = await User.findById(req.user.id).select("role");
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // find pending orders and populate user name + email from User model
    const orders = await Order.find({ status: "pending" })
      .populate("user", "name email _id") // populate only name & email
      .populate("product", "name images type") 
      .sort({ createdAt: -1 })
      .lean();

    // map to the exact shape frontend expects:
    console.log(orders.length);
    console.log(orders[0]);
    const formatted = orders.map((o) => ({
      _id: o._id,
      productName: o.product?.name,
      productImage: o.product?.images?.[0],  // from Order
      quantity: o.quantity,            // from Order
      size: o.size,                    // from Order
      color: o.color,                  // from Order
      address: o.address,              // from Order
      phone: o.phone,                  // from Order
      type: o.product?.type,                    // from Order
      status: o.status,                // from Order
      createdAt: o.createdAt,    
      paymentMethod: o.paymentMethod,      // from Order
      userId: o.user?._id || null,   // populated User._id (or null)
      userName: o.user?.name || null,// populated User.name
      userEmail: o.user?.email || null // populated User.email
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
});




// ✅ Ensure uploads folder exists
import fs from "fs";
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // save images in uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Add product route
router.post("/add-product", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Image paths
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    // Convert sizes/colors to arrays (if sent as multiple fields in FormData)
    const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : [req.body.sizes].filter(Boolean);
    const colors = Array.isArray(req.body.colors) ? req.body.colors : [req.body.colors].filter(Boolean);

    const newProduct = new Product({
      name: req.body.name,
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      discount: req.body.discount,
      sizes,
      colors,
      stock: req.body.stock,
      createdAt: req.body.createdAt,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;
