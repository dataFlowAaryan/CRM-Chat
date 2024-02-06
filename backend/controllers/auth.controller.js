const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!(email && password && firstName && lastName)) {
			res.status(400).json({
				message: "All input is required",
			});
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).json({
				message: "User Already exists. Please Login",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		const savedUser = await user.save();

		const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_TOKEN, {});

		const data = savedUser.toObject();

		delete data.password;

		return res.status(201).json({
			user: data,
			token: token,
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			return res.status(400).json({ message: "All input is required" });
		}

		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {});

			const data = user.toObject();

			delete data.password;

			return res.status(200).json({
				user: data,
				token: token,
			});
		}

		return res.status(400).json({
			message: "Invalid Credentials",
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const authController = {
	register,
	login,
};

module.exports = authController;
