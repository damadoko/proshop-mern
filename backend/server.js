const express = require("express");
const { find, propEq, isNil } = require("ramda");
const mockedProducts = require("./data/products");

const PORT = 4300;

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

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
