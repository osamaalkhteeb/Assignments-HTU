import { Router } from "express";
import AuthController from "../controllers/authContoller.js";
import { authenticate } from "../middlewares/auth.js"; 

const router = Router();

router.post("/register",AuthController.register); //we give it a route and connect it to the controler
router.post("/login",AuthController.login); //same 
router.get("/me",authenticate, AuthController.me);// same but we add the auth bit so
router.post('/logout', AuthController.logout); 
export default router;