const { Server } = require("socket.io");
const logger = require("../utils/logger");

class socket {
	static io = null;
	static init(server) {
		this.io = new Server(server, {
			cors: {
				origin: "*",
			},
		});
		this.io.on("connection", (socket) => {
			logger.info("New client connected");

			//join a room
			socket.on("join room", (roomName) => {
				socket.join(roomName);
				this.io.to(roomName).emit("room status", "joined");
				console.log(`User joined room: ${roomName}`);
			});

			socket.on("disconnect", () => {
				logger.info("Client disconnected");
			});
		});
	}

	static emit(event, data) {
		if (!this.io) {
			logger.error("Socket not initialized");
			return;
		}
		this.io.emit(event, data);
	}
	static to(roomName) {
		if (!this.io) {
			logger.error("Socket not initialized");
			return;
		}
		return this.io.to(roomName);
	}
}

module.exports = socket;
