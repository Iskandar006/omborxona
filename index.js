const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;  // Port raqami

// CORS va JSON tanlash uchun middleware
app.use(cors());
app.use(bodyParser.json());

// Mahsulotlar ro'yxati (mock data)
let products = [
  { id: 1, name: "Mahsulot 1", price: 100, quantity: 10 },
  { id: 2, name: "Mahsulot 2", price: 200, quantity: 5 },
  { id: 3, name: "Mahsulot 3", price: 150, quantity: 8 },
  { id: 4, name: "Mahsulot 4", price: 300, quantity: 2 },
  { id: 5, name: "Mahsulot 5", price: 500, quantity: 20 },
];

// Mahsulotlar ro'yxatini olish
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Yangi mahsulot qo'shish
app.post('/api/products', (req, res) => {
  const { name, price, quantity } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
    quantity,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Mahsulotni o'chirish
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.status(200).json({ message: 'Mahsulot o‘chirildi' });
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishga tushdi.`);
});
