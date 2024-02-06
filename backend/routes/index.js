const express = require("express");
const router = express.Router();

// Auth related routes
router.use("/auth", require("./auth"));

// User related routes
router.use("/users", require("./users"));

// Todo related routes
router.use("/todos", require("./todos"));

// Message related routes
router.use("/messages", require("./messages"));

module.exports = router;
