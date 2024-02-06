const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
require("dotenv").config();
const http = require("http");
const db = require("./config/database");
const socket = require("./config/socket");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({
	limit: "8mb"
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", require("./routes"));

const server = http.createServer(app);

socket.init(server);

server.listen(port, () => {
	logger.info(`Server is running on port: ${port}`);
});
