const { validationResult } = require("express-validator");
const { createUser } = require("../services/userService");
const userModel = require("../models/userModel");
const savedJobModel = require("../models/savedJobModel");
const watchListsModel = require("../models/watchListsModel");

// Register User
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { name, password, email, role, skills, portfolio, bio, avatar } =
    req.body;

  const exitingEmail = await userModel.findOne({ email });
  if (exitingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  // ✅ Convert skills to array if it's a string
  const formattedSkills =
    typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : skills;

  const user = await createUser({
    name,
    email,
    password: hashPassword,
    role,
    skills: formattedSkills,
    portfolio,
    bio,
    avatar,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

// Login User
module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { password, email } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true, // helps prevent XSS attacks
    secure: false, // set true if using HTTPS
    sameSite: "Lax", // or "Strict" / "None"
  });

  res.status(201).json({ token, user });
};

// Get User Profile
module.exports.getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(req.user); // use 200, not 201
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  res.status(200).json({ message: "Logout successfully" });
};

module.exports.updateUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { name, email, role, skills, portfolio, bio, avatar } = req.body;

  // ✅ Convert skills to array if it's a string
  const formattedSkills =
    typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : skills;

  const updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      role,
      skills: formattedSkills,
      portfolio,
      bio,
      avatar,
    },
    { new: true }
  );

  res.status(200).json(updatedUser);
};

module.exports.toSaveJob = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { freelancerId, jobId } = req.body;

    const existing = await savedJobModel.findOne({
      freelancer: freelancerId,
      job: jobId,
    });
    if (existing) return res.status(400).json({ error: "Job already saved." });

    const saved = new savedJobModel({ freelancer: freelancerId, job: jobId });
    await saved.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.savedJobs = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { id } = req.params;

    const savedJobs = await savedJobModel
      .find({ freelancer: id })
      .populate("job");

    if (!savedJobs || savedJobs.length === 0) {
      return res.status(404).json({ message: "No saved jobs found." });
    }

    res.status(200).json(savedJobs);
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.removeSavedJobs = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { freelancerId, jobId } = req.body;
    await savedJobModel.findOneAndDelete({
      freelancer: freelancerId,
      job: jobId,
    });
    res.status(200).json({ message: "Job removed from saved list." });
  } catch (error) {
    console.error("Error removing saved job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.watchlist = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { clientId, freelancerId } = req.body;

    const existing = await watchListsModel.findOne({
      client: clientId,
      freelancer: freelancerId,
    });
    if (existing)
      return res
        .status(400)
        .json({ error: "Freelancer already in watchlist." });

    const watch = new watchListsModel({
      client: clientId,
      freelancer: freelancerId,
    });
    await watch.save();

    res.status(201).json(watch);
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.viewWatchlist = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const list = await watchListsModel
      .find({ client: req.params.clientId })
      .populate("freelancer");
    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
