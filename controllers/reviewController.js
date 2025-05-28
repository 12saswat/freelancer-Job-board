const { validationResult } = require("express-validator");
const contractModels = require("../models/contractModels");
const reviewModel = require("../models/reviewModel");

module.exports.createReview = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { contractId, rating, comment } = req.body;

    const contract = await contractModels.findById(contractId);
    if (!contract) return res.status(404).json({ error: "Contract not found" });

    const review = new reviewModel({
      contract: contract._id,
      reviewer: req.user._id,
      reviewedUser: contract.freelancer,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

module.exports.getReviewsByContract = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ reviewedUser: req.params.userId })
      .populate("reviewer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};
