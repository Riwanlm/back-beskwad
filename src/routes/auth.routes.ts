import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authMiddleware, authController.checkAuth);

export default router;
