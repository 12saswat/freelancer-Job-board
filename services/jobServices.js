const { model } = require("mongoose");
const jobModel = require("../models/jobModel");

module.exports.createJob = async ({
  title,
  description,
  company,
  location,
  salary,
  skillsRequired,
  deadline,
  postedBy,
}) => {
  // Required fields validation
  if (
    !title ||
    !description ||
    !company ||
    !location ||
    !salary ||
    !skillsRequired ||
    !postedBy
  ) {
    throw new Error(
      "Missing required fields: title, description, company, location, salary, skillsRequired, postedBy"
    );
  }

  const job = await jobModel.create({
    title,
    description,
    company,
    location,
    salary,
    skillsRequired,
    deadline,
    postedBy,
  });

  return job;
};

module.exports.updateJobByOwner = async (jobId, userId, updateData) => {
  // Find the job by ID and ensure it belongs to the user
  const job = await jobModel.findById(jobId).populate("postedBy", "name");

  if (!job) {
    return null; // Job not found
  }
  if (job.postedBy._id.toString() !== userId.toString()) {
    return res.status(403).json({
      message: "You do not have permission to update this job",
    });
  }
  // Don't allow updating postedBy
  delete updateData.postedBy;

  // Perform the update
  const updatedJob = await jobModel
    .findByIdAndUpdate(
      jobId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )
    .populate("postedBy", "name"); // Populate after update

  return updatedJob;
};
