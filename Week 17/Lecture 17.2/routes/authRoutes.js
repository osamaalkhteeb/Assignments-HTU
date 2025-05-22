import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router.post('/register',AuthController.register)

export default router;