const express = require("express");
const router = express.Router();

console.log("AUTH ROUTES LOADED");

const authMiddleware = require("../middleware/authMiddleware");

const {
  signup,
  login,
  profile
} = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", (req, res, next) => {
  console.log("PROFILE ROUTE HIT");
  next();
}, authMiddleware, profile);

module.exports = router;