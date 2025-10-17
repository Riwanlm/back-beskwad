import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authentificateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
// router.get("/profil", TODO);

export default router;
