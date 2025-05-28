const userModel = require("../models/userModel");

module.exports.createUser = async ({
  name,
  email,
  password,
  role,
  skills,
  portfolio,
  bio,
  avatar,
}) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists.");
  }

  const user = await userModel.create({
    name,
    email,
    password,
    role: role || "freelancer", // default to freelancer
    skills,
    portfolio,
    bio,
    avatar,
  });

  return user;
};
