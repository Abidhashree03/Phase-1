const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aggregation_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
});

productSchema.index({ name: 'text' }); // Index for text search

const Product = mongoose.model('Product', productSchema);

// Seed Database with Sample Products
const seedProducts = async () => {
  const products = [
    { name: 'Laptop', price: 1000, category: 'Electronics', stock: 10 },
    { name: 'Smartphone', price: 700, category: 'Electronics', stock: 20 },
    { name: 'Tablet', price: 500, category: 'Electronics', stock: 15 },
    { name: 'TV', price: 800, category: 'Electronics', stock: 8 },
    { name: 'Sofa', price: 1200, category: 'Furniture', stock: 5 },
    { name: 'Chair', price: 150, category: 'Furniture', stock: 30 },
    { name: 'Table', price: 400, category: 'Furniture', stock: 12 },
    { name: 'Bed', price: 900, category: 'Furniture', stock: 7 },
    { name: 'T-Shirt', price: 20, category: 'Clothing', stock: 100 },
    { name: 'Jeans', price: 50, category: 'Clothing', stock: 60 },
    { name: 'Jacket', price: 120, category: 'Clothing', stock: 40 },
    { name: 'Shoes', price: 80, category: 'Clothing', stock: 50 }
  ];

  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Database seeded!');
};

seedProducts();

// Aggregation: Get Product Statistics by Category
app.get('/api/products/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', totalProducts: { $sum: 1 }, avgPrice: { $avg: '$price' } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complex Queries: Filter by price range and stock availability
app.get('/api/products/filter', async (req, res) => {
  try {
    const { minPrice, maxPrice, minStock } = req.query;
    const filter = {
      price: { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity },
      stock: { $gte: Number(minStock) || 0 }
    };
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Text Search in Product Names
app.get('/api/products/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });
    const products = await Product.find({ $text: { $search: query } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aggregation: Calculate Average Prices by Category
app.get('/api/products/avg-price', async (req, res) => {
  try {
    const avgPrices = await Product.aggregate([
      { $group: { _id: '$category', avgPrice: { $avg: '$price' } } }
    ]);
    res.json(avgPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sorting and Advanced Filtering
app.get('/api/products', async (req, res) => {
  try {
    const { category, sortBy, order } = req.query;
    const filter = category ? { category } : {};
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const products = await Product.find(filter).sort(sortOptions);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
