import express from "express";
import dotenv from "dotenv";
import { find, propEq, isNil } from "ramda";

import mockedProducts from "./data/products.js";

dotenv.config();

const app = express();

app.get("/", (_, res) => {
  res.send("server is running");
});

app.get("/products", (_, res) => {
  res.json(mockedProducts);
});

app.get("/products/:id", ({ params }, res) => {
  const { id } = params;
  try {
    const product = find(propEq("_id", id))(mockedProducts);
    if (isNil(product)) throw new Error();

    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
