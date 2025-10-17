import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { CreateUserSchema } from "../validators/user.schema";

export const createUser = async (req: Request, res: Response) => {
  const parseResult = CreateUserSchema.safeParse(req.body);
  if (parseResult.error) {
    console.error(parseResult.error.message);
    return res.status(400).json({
      error: "Validation échouée : ",
      details: parseResult.error.message,
    });
  }
  const { username, email, password } = parseResult.data;
  try {
    const createdUser = await authService.createUser(username, email, password);
    return res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.longinUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
