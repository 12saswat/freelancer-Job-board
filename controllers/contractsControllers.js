const { validationResult } = require("express-validator");
const bidsModel = require("../models/bidsModel");
const contractModels = require("../models/contractModels");

module.exports.createContract = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { bidId, milestones } = req.body;

    const bid = await bidsModel.findById(bidId).populate("job freelancer");
    if (!bid) return res.status(404).json({ error: "Bid not found" });

    const contract = new contractModels({
      job: bid.job._id,
      client: bid.job.postedBy,
      freelancer: bid.freelancer._id,
      bid: bid._id,
      milestones,
    });

    await contract.save();
    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contract" });
  }
};

module.exports.getAllContracts = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const contracts = await contractModels
      .find()
      .populate("job")
      .populate("client")
      .populate("freelancer")
      .populate("bid");

    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contracts" });
  }
};

module.exports.updateContract = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { status } = req.body;
    const contract = await contractModels.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contract) return res.status(404).json({ error: "Contract not found" });

    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contract" });
  }
};
