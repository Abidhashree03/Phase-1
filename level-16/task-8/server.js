const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Static CSS
const PORT = 3000;

// Sample in-memory product array
let products = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Phone', price: 599.99, description: 'Latest smartphone' }
];

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// GET all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// GET a single product
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
});

// POST a new product
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
        description
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT to update a product
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, price, description } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    res.status(200).json(product);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const deleted = products.splice(index, 1);
    res.status(200).json({ message: 'Product deleted', product: deleted[0] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
