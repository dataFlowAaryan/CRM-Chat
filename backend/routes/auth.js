const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @route api/auth/register
 * @description Register user
 * @access Public
 */
router.post("/register", authController.register);

/**
 * @route api/auth/login
 * @description Login user
 * @access Public
 */
router.post("/login", authController.login);

module.exports = router;
