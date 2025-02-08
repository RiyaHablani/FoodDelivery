const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET; // Use the environment variable

// Log the JWT secret for debugging (make sure not to expose it in production)
console.log(`JWT Secret: ${jwtSecret}`);

const fetch = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Invalid Auth Token" });
  }

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid Auth Token" });
  }
};

module.exports = fetch;
