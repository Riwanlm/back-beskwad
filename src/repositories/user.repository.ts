import { prisma } from "../config/prisma";

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      created_at: true,
    },
    orderBy: { created_at: "desc" },
  });

  return users.map((u) => ({ ...u, id: Number(u.id) }));
};
