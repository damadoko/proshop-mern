import dotenv from "dotenv";
import chalk from "chalk";

import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);

    console.log(chalk.green.inverse("Data Imported!"));
    process.exit();
  } catch (error) {
    console.error(chalk.red.inverse(error));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log(chalk.red.inverse("Data Destroyed!"));
    process.exit();
  } catch (error) {
    console.error(chalk.red.inverse(error));
    process.exit(1);
  }
};

connectDB();

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
