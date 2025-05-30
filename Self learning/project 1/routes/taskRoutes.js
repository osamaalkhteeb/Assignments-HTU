import { Router } from "express";
import TaskController from "../controllers/taskController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// All task routes require authentication
router.use(authenticate);

router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;