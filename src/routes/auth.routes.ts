import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;
