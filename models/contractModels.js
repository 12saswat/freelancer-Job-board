const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  isCompleted: { type: Boolean, default: false },
});

const contractSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bid",
    required: true,
  },
  milestones: [milestoneSchema],
  status: {
    type: String,
    enum: ["Active", "Completed", "Cancelled"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contract", contractSchema);
