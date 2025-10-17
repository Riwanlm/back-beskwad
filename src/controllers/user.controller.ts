import { Request, Response } from "express";
import * as userService from "../services/user.service";

type RequestWithUser = Request & { user?: { id: number; email: string } };

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs : ", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const userProfil = (req: Request, res: Response) => {
  const user = (req as RequestWithUser).user;
  console.log(user, "USER");

  return res.status(200).json({
    user: "OK",
  });
};
