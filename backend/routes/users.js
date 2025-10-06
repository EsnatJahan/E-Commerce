import express from "express";
import User from "../models/users.js";
import Order from "../models/orders.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const image_override = (x) => `http://localhost:3000${x}`;

// User Registration
router.post("/signup", async (req, res) => {
   // console.log("Signup request received:", req.body);
  const { name, email, address, phone, password } = req.body;

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
      address,
      phone,
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

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("product", "name images price")
      .sort({ createdAt: -1 }); // latest first

      const formattedOrders = orders.map(order => ({
      _id: order._id,
      productName: order.product?.name,
      productImage: order.product?.images?.[0],
      address: order.address,
      phone: order.phone,
      quantity: order.quantity,
      size: order.size,
      color: order.color,
      status: order.status,
      createdAt: order.createdAt,
    }));
      formattedOrders.forEach((order) => {    
      if (order.productImage) {
        order.productImage = image_override(order.productImage);
      }

    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update logged-in user info
router.put("/update", verifyToken, async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    const user = await User.findById(req.user.id); // req.user from verifyToken
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
