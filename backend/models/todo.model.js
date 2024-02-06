const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		completed: { type: Boolean, default: false },
		attachments: [{ type: String }],
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		comments: [{ type: String }],
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
