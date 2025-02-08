const path = require("path");
const express = require("express");
require("dotenv").config(); // Load environment variables from .env file

// Log the environment variables
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

global.foodData = require("./db")(function call(err, data, CatData) {
  if (err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port if available

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware for JSON parsing
app.use(express.json());

// API Routes
app.use("/api/auth", require("./Routes/Auth"));
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

//-----------------Deployment------------------
const __dirname2 = path.resolve(); // This resolves to your backend folder

if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend's build directory, which is in the main folder
  app.use(express.static(path.join(__dirname2, "/build"))); // Go one level up to the main folder

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname2, "/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
