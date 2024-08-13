const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors middleware
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// let corsoption={
//     origin:"localhost:3000"

// }

app.use(cors());

// Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_URL);

// Define Schema and Models for MongoDB
const ProductSchema = new mongoose.Schema({
  id: Number,
});
const Edu = mongoose.model("Education", ProductSchema);
const Legal = mongoose.model("Legal", ProductSchema);
const Remedies = mongoose.model("Remedies", ProductSchema);
const Govt = mongoose.model("Govt-scheme", ProductSchema);

app.use(bodyParser.json());

// Define routes
// Get all Products

app.get("/", async (req, res) => {
  try {
    res.status(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/education", async (req, res) => {
  try {
    const data = await Edu.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/legal", async (req, res) => {
  try {
    const data = await Legal.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/remedies", async (req, res) => {
  try {
    const data = await Remedies.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/scheme", async (req, res) => {
  try {
    const data = await Govt.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
