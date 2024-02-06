const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers["x-auth-token"];
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		req.user = decoded;
		next();
	} catch (err) {
		logger.error(err);
		return res.status(401).json({
			message: "Invalid Token",
		});
	}
};

module.exports = authMiddleware;
