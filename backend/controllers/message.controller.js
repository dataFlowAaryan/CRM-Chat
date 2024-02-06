const Message = require("../models/message.model");
const logger = require("../utils/logger");

const createMessage = async (req, res) => {
	try {
		const { message, to } = req.body;

		const newMessage = new Message({
			message,
			from: req.user._id,
			to,
		});

		const savedMessage = await newMessage.save();

		const data = savedMessage.toObject();

		return res.status(201).json(data);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			$or: [
				{ from: req.user._id },
				{ to: req.user._id }
			]
		})
			.sort({
				"createdAt": "asc",
			})
			.populate("from")
			.populate("to").exec();

		return res.status(200).json(messages);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getMessageByID = async (req, res) => {
	try {
		const message = await Message.findById(req.params.id).populate("user");

		if (!message) {
			return res.status(404).json({
				message: "Message not found",
			});
		}

		return res.status(200).json({
			message,
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const messageController = {
	createMessage,
	getMessages,
	getMessageByID,
};

module.exports = messageController;
