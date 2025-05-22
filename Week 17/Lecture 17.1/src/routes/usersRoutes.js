import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUser);
router.get("/createUser", createUser);
router.get("/update/:id", updateUser);
router.get("/delete/:id", deleteUser);

export default router;