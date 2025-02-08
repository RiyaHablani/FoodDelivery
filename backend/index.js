const path = require("path");
const express = require("express");

// Directly set the environment variables
process.env.NODE_ENV = "production";
process.env.PORT = 5000;

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
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
