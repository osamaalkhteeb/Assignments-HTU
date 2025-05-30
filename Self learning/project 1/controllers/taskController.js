import { query } from "../config/db.js";

const TaskController = {
  // Get all tasks for a user
  async getTasks(req, res, next) {
    try {
      const { rows } = await query(
        "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
        [req.user.id]
      );
      res.json({ success: true, tasks: rows });
    } catch (error) {
      next(error);
    }
  },

  // Get a single task by ID
  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const { rows } = await query(
        "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
        [id, req.user.id]
      );
      
      if (rows.length === 0) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
      }
      
      res.json({ success: true, task: rows[0] });
    } catch (error) {
      next(error);
    }
  },

  // Create a new task
  async createTask(req, res, next) {
    try {
      const { title, description, due_date, priority } = req.body;
      
      const { rows } = await query(
        "INSERT INTO tasks (title, description, due_date, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, due_date, priority, req.user.id]
      );
      
      res.status(201).json({ success: true, task: rows[0] });
    } catch (error) {
      next(error);
    }
  },

  // Update a task
  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, due_date, priority, completed } = req.body;
      
      // First check if the task exists and belongs to the user
      const checkResult = await query(
        "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
        [id, req.user.id]
      );
      
      if (checkResult.rows.length === 0) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
      }
      
      const { rows } = await query(
        "UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), \
        due_date = COALESCE($3, due_date), priority = COALESCE($4, priority), \
        completed = COALESCE($5, completed), updated_at = NOW() \
        WHERE id = $6 AND user_id = $7 RETURNING *",
        [title, description, due_date, priority, completed, id, req.user.id]
      );
      
      res.json({ success: true, task: rows[0] });
    } catch (error) {
      next(error);
    }
  },

  // Delete a task
  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      
      // First check if the task exists and belongs to the user
      const checkResult = await query(
        "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
        [id, req.user.id]
      );
      
      if (checkResult.rows.length === 0) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
      }
      
      await query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [id, req.user.id]);
      
      res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};

export default TaskController;