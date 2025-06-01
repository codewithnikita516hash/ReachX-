require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ MongoDB Connection Failed:", err));

// API Routes
app.use("/api", contactRoutes);

// Serve static frontend files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
