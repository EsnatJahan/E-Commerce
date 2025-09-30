// routes/product.js
import express from "express";
import Product from "../models/products.js";

const router = express.Router();

// Get all products OR by category
router.get("/GetProduct", async (req, res) => {
  const { category } = req.query; // category filter
  try {
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
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

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


export default router;
