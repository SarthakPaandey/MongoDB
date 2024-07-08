const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const productRouter = require("./routes/ProductRouter");

const userRouter = require("./routes/UserRouter");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Db connection Failed", err);
  });
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
// Create

app.listen(8086, () => {
  console.log("Server sarted at port 8086");
});
