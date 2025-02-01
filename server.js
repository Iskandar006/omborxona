const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS yordamida React frontend bilan bog'lanishga ruxsat beramiz
app.use(cors());

// Body parsing uchun middleware
app.use(express.json());

// API endpoint: Bu endpoint React ilovasidan ma'lumotlarni olish uchun ishlatiladi
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// POST endpoint (ma'lumot yuborish uchun)
app.post('/api', (req, res) => {
  const { data } = req.body;
  res.json({ message: `Received data: ${data}` });
});

// Serverni ishga tushurish
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
