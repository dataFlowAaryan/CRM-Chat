const express = require("express");
const todoController = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @route api/todos
 * @description Get all todos
 * @access Private
 */
router.get("/", authMiddleware, todoController.getTodos);

/**
 * @route api/todos
 * @description Create new todo
 * @access Private
 */
router.post("/", authMiddleware, todoController.createTodo);

/**
 * @route api/todos/:id/comments
 * @description Create new comment
 * @access Private
 */
router.put("/:id/comments", authMiddleware, todoController.addComment);

/**
 * @route api/todos/:id
 * @description Update todo
 * @access Private
 */
router.put("/:id", authMiddleware, todoController.updateTodo);

/**
 * @route api/todos/:id
 * @description Delete todo
 * @access Private
 */
router.delete("/:id", authMiddleware, todoController.deleteTodo);

/**
 * @route api/todos/:id
 * @description Get todo by ID
 * @access Private
 */
router.get("/:id", authMiddleware, todoController.getTodoByID);

module.exports = router;
