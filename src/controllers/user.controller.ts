import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs : ", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
