import type { Prisma } from "@prisma/client";
import { SecurePrisma } from "../prisma";

export const loadSettings = async () => {
  const prisma = await SecurePrisma();

  return prisma.settings.findFirst();
};

export const createSettings = async (data: Prisma.SettingsCreateInput) => {
  const prisma = await SecurePrisma();
  return prisma.settings.create({ data });
};

export const updateSettings = async (data: Prisma.SettingsUpdateInput) => {
  const prisma = await SecurePrisma();
  return prisma.settings.update({ data, where: { id: data.id as string } });
};
