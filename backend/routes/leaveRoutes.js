const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createLeaveRequest,
  getMyLeaves,
  getAllLeaves,
  managerApprove,
  managerReject,
  hrApprove,
  hrReject,
  getDashboardStats
} = require("../controllers/leaveController");

router.post(
  "/",
  authMiddleware,
  createLeaveRequest
);

router.get(
  "/my-leaves",
  authMiddleware,
  getMyLeaves
);

router.get(
  "/all",
  authMiddleware,
  getAllLeaves
);

router.put(
  "/manager-approve/:id",
  authMiddleware,
  managerApprove
);

router.put(
  "/manager-reject/:id",
  authMiddleware,
  managerReject
);

router.put(
  "/hr-approve/:id",
  authMiddleware,
  hrApprove
);

router.put(
  "/hr-reject/:id",
  authMiddleware,
  hrReject
);

router.get(
  "/dashboard-stats",
  authMiddleware,
  getDashboardStats
);

module.exports = router;