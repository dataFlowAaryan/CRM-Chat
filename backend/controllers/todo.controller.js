const Todo = require("../models/todo.model");
const logger = require("../utils/logger");

const createTodo = async (req, res) => {
	try {
		const { title, description, attachments,completed } = req.body;

		const newTodo = new Todo({
			title,
			description,
			attachments,
			user: req.user._id,
			completed
		});

		const savedTodo = await newTodo.save();

		const data = savedTodo.toObject();

		return res.status(201).json(data);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getTodos = async (req, res) => {
	try {
		const todos = await Todo.find({
			user: req.user._id,
		});

		return res.status(200).json(todos);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const getTodoByID = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		if (!todo) {
			return res.status(404).json({
				message: "Todo not found",
			});
		}

		if (!todo.user.equals(req.user._id)) {
			return res.status(403).json({
				message: "You are not authorized to access this todo",
			});
		}

		return res.status(200).json(todo);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const updateTodo = async (req, res) => {
	try {
		const { title, description, completed, attachments, comments } = req.body;

		const todo = await Todo.findById(req.params.id);

		if (!todo) {
			return res.status(404).json({
				message: "Todo not found",
			});
		}

		if (title) {
			todo.title = title;
		}

		if (description) {
			todo.description = description;
		}

		if (completed !== undefined) {
			todo.completed = completed;
		}

		if (attachments) {
			todo.attachments = attachments;
		}

		if (comments) {
			todo.comments = comments;
		}

		const savedTodo = await todo.save();

		const data = savedTodo.toObject();

		return res.status(200).json(data);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const addComment = async (req, res) => {
	try {
		const { text } = req.body;

		const todo = await Todo.findById(req.params.id);

		if (!todo) {
			return res.status(404).json({
				message: "Todo not found",
			});
		}

		todo.comments.push(text);

		const savedTodo = await todo.save();

		const data = savedTodo.toObject();

		return res.status(200).json(data);
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const deleteTodo = async (req, res) => {
	try {
		const todo = await Todo.findByIdAndDelete(req.params.id);

		return res.status(200).json({
			message: "Todo deleted successfully",
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			message: "Something went wrong",
		});
	}
};

const todoController = {
	createTodo,
	getTodos,
	getTodoByID,
	updateTodo,
	deleteTodo,
	addComment,
};

module.exports = todoController;
