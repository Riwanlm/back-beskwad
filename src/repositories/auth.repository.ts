import { prisma } from "../config/prisma";

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
) => {
  return prisma.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password_hash: passwordHash,
    },
    omit: { password_hash: true },
  });
};
