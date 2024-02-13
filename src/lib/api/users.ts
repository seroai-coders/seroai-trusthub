import { SecurePrisma } from "../prisma";

export const loadUsers = async () => {
  const prisma = await SecurePrisma();

  return prisma.user.findMany();
};
