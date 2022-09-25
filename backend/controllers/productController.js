import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /products
// @access Public
export const getProducts = asyncHandler(async (_, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single product
// @route GET /products/:id
// @access Public
export const getProductById = asyncHandler(async ({ params }, res) => {
  const { id } = params;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
