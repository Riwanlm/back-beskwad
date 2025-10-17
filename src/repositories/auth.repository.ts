import { prisma } from "../config/prisma";

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string
) => {
  return prisma.users.create({
    data: {
      username: name,
      email: email,
      password_hash: passwordHash,
    },
    omit: { password_hash: true },
  });
};
