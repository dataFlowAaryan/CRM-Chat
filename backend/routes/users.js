const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @route api/users?...
 */
router.get("/", authMiddleware, userController.getUserByQuery);

/**
 * @route api/users/me
 * @description Get user profile
 * @access Private
 */
router.get("/me", authMiddleware, userController.getSelf);

/**
 * @route api/users/:id
 * @description Get user profile
 * @access Private
 */
router.get("/:id", authMiddleware, userController.getUserByID);

module.exports = router;
