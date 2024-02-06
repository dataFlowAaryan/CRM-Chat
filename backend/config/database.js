const mongoose = require("mongoose");
const logger = require("../utils/logger");

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
	logger.error(error);
});

db.once("open", () => {
	logger.info("MongoDB connection established successfully");
});

module.exports = db;
