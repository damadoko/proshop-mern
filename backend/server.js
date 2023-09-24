import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use("/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(
    chalk.yellow(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
