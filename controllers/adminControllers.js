const bidsModel = require("../models/bidsModel");
const userModel = require("../models/userModel");

module.exports.ToBannedUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's status to 'banned'
    user.status = "banned";
    await user.save();

    res.status(200).json({ message: "User has been banned successfully" });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.ToUpdateStatusJob = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { status } = req.body; // "Approved" or "Rejected"

    const job = await jobModel.findByIdAndUpdate(
      req.params.jobId,
      { status },
      { new: true }
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: `Job ${status.toLowerCase()}`, job });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.ToUpdateStatusBids = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { status } = req.body; // "Approved" or "Rejected"

    const bid = await bidsModel.findByIdAndUpdate(
      req.params.bidId,
      { status },
      { new: true }
    );

    if (!bid) return res.status(404).json({ error: "Bid not found" });

    res.status(200).json({ message: `Bid ${status.toLowerCase()}`, bid });
  } catch (error) {
    console.error("Error updating bid status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
