const mongoose = require("mongoose");
const socket = require("../config/socket");
const logger = require("../utils/logger");
const User = require("./user.model");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

Message.watch(
  [
    {
      $match: {
        operationType: "insert",
      },
    },
  ],
  {
    fullDocument: "updateLookup",
  }
).on("change", async (data) => {
  logger.info("Message.watch:change");
  const toUser = await User.findById(data.fullDocument.to);
  const fromUser = await User.findById(data.fullDocument.from);
  // console.log(message.toObject());
  socket.emit(data.fullDocument.from, {
    ...data.fullDocument,
    to: toUser,
    from: fromUser,
  });
  socket.emit(data.fullDocument.to, {
    ...data.fullDocument,
    to: toUser,
    from: fromUser,
  });
});

module.exports = Message;
