import { Router } from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = Router();

// @desc Fetch all products
// @route GET /products
// @access Public
router.get(
  "/",
  asyncHandler(async (_, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch single product
// @route GET /products/:id
// @access Public
router.get(
  "/:id",
  asyncHandler(async ({ params }, res) => {
    const { id } = params;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
