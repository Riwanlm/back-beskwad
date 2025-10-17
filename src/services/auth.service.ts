import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository";
import jwt from "jsonwebtoken";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email déjà utilisé");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await authRepository.createUser(
    username,
    email,
    hashedPassword
  );
  const createdUserResponse = {
    ...createUser,
    id: Number(createUser.id),
  };
  return createdUserResponse;
};

export const longinUser = async (email: string, password: string) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Email incorrect ou utilisateur inexistant");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  //Gestion token
  const token = jwt.sign(
    {
      id: Number(user.id),
      email: user.email,
      username: user.username,
      created_at: user.created_at,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" }
  );

  const userWithToken = {
    token,
    user: {
      id: Number(user.id),
      email: user.email,
      username: user.username,
      created_at: user.created_at,
    },
  };

  return userWithToken;
};
