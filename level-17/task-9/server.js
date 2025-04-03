const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/transactions_example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schemas
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Order = mongoose.model("Order", orderSchema);
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

// Custom Error Handling Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Create Order Without Transactions
app.post("/api/orders", async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    let totalAmount = 0;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    // Validate and calculate total price
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) throw new AppError(`Product ${item.product} not found`, 404);
      if (product.stock < item.quantity) throw new AppError(`Insufficient stock for ${product.name}`, 400);
      
      // Deduct stock
      product.stock -= item.quantity;
      totalAmount += product.price * item.quantity;
      
      // Save updated product
      await product.save();
    }

    // Create order
    const order = new Order({ user: userId, products, totalAmount, status: "Completed" });
    await order.save();

    // Update user purchase history
    user.purchaseHistory.push(order._id);
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || "Internal Server Error" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
