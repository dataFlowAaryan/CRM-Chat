const User = require("../models/user.model");
const logger = require("../utils/logger");

const getSelf = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({
				message: "User not found!",
			});
		}

		return res.status(200).json(user);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong!"
		});
	}
};

const getUserByID = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		return res.status(200).json({
			user,
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getUserByQuery = async (req, res) => {
	try {
		const { email } = req.query;

		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		return res.status(200).json(user);

	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const userController = {
	getUserByID,
	getSelf,
	getUserByQuery
};

module.exports = userController;
