const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "products.json";

// Agar fayl mavjud bo‘lmasa, uni yaratish
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]", "utf8");
}

// Barcha mahsulotlarni olish
app.get("/api", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  res.json(data);
});

// Yangi mahsulot qo‘shish
app.post("/api", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  const newProduct = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    ...req.body,
  };
  data.push(newProduct);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
  res.json(newProduct);
});

// Mahsulotni o‘chirish
app.delete("/api/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  data = data.filter((product) => product.id !== parseInt(req.params.id));
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
  res.json({ message: "O‘chirildi!" });
});

app.listen(5000, () => console.log("Server 5000-portda ishlayapti"));
