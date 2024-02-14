const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("", userSchema);

module.exports = Agent;
