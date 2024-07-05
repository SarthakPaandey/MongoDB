const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sarthakpandey973:L8jaxyxmaT8COjAM@trymongo.jevh8hi.mongodb.net/?retryWrites=true&w=majority&appName=TryMongo"
  )
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Failed", err);
  });

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

// Create
app.post("/api/products", async (req, res) => {
  try {
    const product = await productModel.create({
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      isInStock: req.body.isInStock,
      category: req.body.category,
    });

    console.log(product);

    return res.status(201).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// Get a product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// Update a product by ID
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        isInStock: req.body.isInStock,
        category: req.body.category,
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// Delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

app.listen(8086, () => {
  console.log("Server started at port 8086");
});
