import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

type RequestWithUser = Request & { user?: { id: number; email: string } };

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Non authentifié" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as RequestWithUser).user = payload as any;

    return next();
  } catch {
    return res.status(401).json({ message: "Token invalide/expiré" });
  }
};
