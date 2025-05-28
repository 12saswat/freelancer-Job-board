const { validationResult } = require("express-validator");
const bidsModel = require("../models/bidsModel");
const { model } = require("mongoose");

module.exports.postBids = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { jobId, freelancerId, proposal, deliveryTime, amount } = req.body;

    const existingBid = await bidsModel.findOne({
      job: jobId,
      freelancer: freelancerId,
    });
    if (existingBid) {
      return res
        .status(400)
        .json({ error: "You already placed a bid on this job." });
    }

    const bid = await bidsModel.create({
      job: jobId,
      freelancer: freelancerId,
      proposal,
      deliveryTime,
      amount,
    });

    await bid.save();
    res.status(201).json({ message: "Bid posted successfully", bid });
  } catch (err) {
    console.error("Error posting bid:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateBid = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { proposal, deliveryTime, amount } = req.body;
    const bidId = req.params.id;

    const updatedBid = await bidsModel.findByIdAndUpdate(
      bidId,
      { proposal, deliveryTime, amount },
      { new: true }
    );

    if (!updatedBid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    res.status(200).json({ message: "Bid updated successfully", updatedBid });
  } catch (err) {
    console.error("Error updating bid:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteBid = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const bidId = req.params.id;

    const deletedBid = await bidsModel.findByIdAndDelete(bidId);

    if (!deletedBid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (err) {
    console.error("Error deleting bid:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.allBids = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const bids = await bidsModel
      .find()
      .populate("job freelancer", "title name");
    res.status(200).json(bids);
  } catch (err) {
    console.error("Error fetching bids:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
