const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.authuser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  // Split the header to get the token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token " });
  }
};
