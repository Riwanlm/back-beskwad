import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

export const authentificateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: "Token invalidé" });
    }
    (req as any).user = decoded as JwtPayload;
  });
  next();
};
