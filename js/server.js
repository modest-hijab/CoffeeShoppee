const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const coffeeFunFactSchema = new mongoose.Schema({
  funfact: String,  // Make sure this matches your collection
  source: String
});

const CoffeeFunFact = mongoose.model("coffeefunfacts", coffeeFunFactSchema);

// API Route to Get a Random Fun Fact
app.get("/funfact", async (req, res) => {
  try {
    const facts = await CoffeeFunFact.find();
    if (facts.length === 0) {
      return res.status(404).json({ error: "No fun facts available" });
    }

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json(randomFact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching fun facts");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));