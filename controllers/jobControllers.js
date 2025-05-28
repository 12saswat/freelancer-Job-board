const { validationResult } = require("express-validator");
const { createJob, updateJobByOwner } = require("../services/jobServices");
const jobModel = require("../models/jobModel");

// To post a job
module.exports.postJob = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      skillsRequired,
      deadline,
    } = req.body;

    // ✅ Convert skills to array if it's a string
    const formattedSkills =
      typeof skillsRequired === "string"
        ? skillsRequired.split(",").map((s) => s.trim())
        : skillsRequired;

    const job = await createJob({
      title,
      description,
      company,
      location,
      salary,
      skillsRequired: formattedSkills,
      deadline,
      postedBy: req.user._id,
    });
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// To get all jobs
module.exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobModel.find().populate("postedBy", "name");
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// To update a job by owner only
module.exports.updateJob = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;
    const updatedJob = await updateJobByOwner(jobId, userId, req.body);
    if (!updatedJob) {
      return res
        .status(404)
        .json({ message: "Job not found or not owned by user" });
    }
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// To delete a job by owner only
module.exports.deleteJob = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    // Find the job by ID and ensure it belongs to the user
    const job = await jobModel.findById(jobId).populate("postedBy", "name");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.postedBy._id.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You do not have permission to delete this job",
      });
    }

    // Delete the job
    await jobModel.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For filter the jobs form lists
module.exports.filterJobs = async (req, res, next) => {
  try {
    const { title, location, skills, company } = req.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // case-insensitive
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (company) {
      filter.company = { $regex: company, $options: "i" };
    }

    if (skills) {
      const skillsArray = skills.split(",");
      filter.skillsRequired = { $all: skillsArray };
    }

    const jobs = await jobModel.find(filter);
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
