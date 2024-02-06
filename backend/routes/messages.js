const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route api/messages
 * @description Get all messages
 * @access Private
 */
router.get("/", authMiddleware, messageController.getMessages);

/**
 * @route api/messages
 * @description Create new message
 * @access Private
 */
router.post("/", authMiddleware, messageController.createMessage);

module.exports = router;
