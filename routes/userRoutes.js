const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUser,
  toSaveJob,
  watchlist,
  viewWatchlist,
  savedJobs,
} = require("../controllers/userController");
const { authuser } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const {
  postJob,
  getAllJobs,
  updateJob,
  deleteJob,
  filterJobs,
} = require("../controllers/jobControllers");
const {
  updateBid,
  postBids,
  deleteBid,
  allBids,
} = require("../controllers/bidsControllers");
const {
  getAllContracts,
  createContract,
  updateContract,
} = require("../controllers/contractsControllers");
const {
  createReview,
  getReviewsByContract,
} = require("../controllers/reviewController");
const {
  ToBannedUser,
  ToUpdateStatusJob,
  ToUpdateStatusBids,
} = require("../controllers/adminControllers");
const {
  toGetMessage,
  toMessage,
} = require("../controllers/messageControllers");
const router = express.Router();

// A rondom user
// @desc    Register a new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be have 6 charecters"),
  ],
  registerUser
);
// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be have 6 charecters"),
  ],
  loginUser
);
router.post("/update", authuser, updateUser);
// @desc    Get user profile all detail
router.get("/profile", authuser, getUserProfile);
// @desc    Logout user
router.post("/logout", authuser, logoutUser);

// For jobs
router.post("/jobPost", authuser, checkRole("client"), postJob);
router.get("/jobs", authuser, getAllJobs);
router.post("/updateJob/:id", authuser, checkRole("client"), updateJob);
router.delete("/deleteJob/:id", authuser, checkRole("client"), deleteJob);
router.get("/filterJobs/:id", authuser, filterJobs);

// For bids
router.post("/postBids", authuser, checkRole("freelancer"), postBids);
router.get("/bids", authuser, allBids);
router.put("/bids/:id", authuser, checkRole("freelancer"), updateBid);
router.put("/bids/:id", authuser, checkRole("freelancer"), deleteBid);

// For contracts
router.post("/createContract", authuser, checkRole("client"), createContract);
router.get("/contracts", authuser, getAllContracts);
router.put(
  "/updateContract/:id",
  authuser,
  checkRole("client"),
  updateContract
);

// For reviews
router.post("/review", authuser, createReview);
router.get("/reviews/:contractId", authuser, getReviewsByContract);

// For saved jobs and Watchlist
router.post("/save_job", authuser, checkRole("freelancer"), toSaveJob);
router.get("/saved_jobs/:id", authuser, checkRole("freelancer"), savedJobs);

router.post("/watchList", authuser, checkRole("freelancer"), watchlist);
router.get("/watchList/:id", authuser, checkRole("freelancer"), viewWatchlist);

// Admin routes
router.post("/bannedUser", authuser, checkRole("admin"), ToBannedUser);
router.put("/status_job/:id", authuser, checkRole("admin"), ToUpdateStatusJob);
router.put(
  "/status_bids/:id",
  authuser,
  checkRole("admin"),
  ToUpdateStatusBids
);

// for message between client and freelancer
router.post("/message", authuser, toMessage);
router.get("message/:user1/:user2", authuser, toGetMessage);
module.exports = router;
