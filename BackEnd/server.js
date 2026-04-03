const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// HEX color regex
const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

// ✅ GET route
app.get("/api/content", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ POST route (IMPORTANT: async added here)
app.post("/api/content", async (req, res) => {
  const { heading, paragraph, bgImage, textColor } = req.body;

  console.log("🔥 BACKEND HIT");
  console.log(req.body);

  // Validation
  if (!heading || !paragraph || !bgImage || !textColor) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!hexRegex.test(textColor)) {
    return res.status(400).json({ error: "Invalid HEX color" });
  }

  // Image URL check
  try {
    const response = await fetch(bgImage);
    if (!response.ok) throw new Error();
  } catch {
    return res.status(400).json({ error: "Invalid image URL" });
  }

  res.json({ message: "✅ Backend received data" });
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});