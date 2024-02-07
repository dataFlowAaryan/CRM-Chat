const express = require("express");
const router = express.Router();

// Auth related routes
router.use("/auth", require("./auth"));

// User related routes
router.use("/users", require("./users"));

// Message related routes
router.use("/messages", require("./messages"));

module.exports = router;
