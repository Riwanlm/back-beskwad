import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/profil", authMiddleware, userController.userProfil);

export default router;
