const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeCount
} = require("../controllers/employeeController");

router.get(
  "/count",
  authMiddleware,
  getEmployeeCount
);

router.post(
  "/",
  authMiddleware,
  createEmployee
);

router.get(
  "/",
  authMiddleware,
  getEmployees
);

router.put(
  "/:id",
  authMiddleware,
  updateEmployee
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEmployee
);

module.exports = router;