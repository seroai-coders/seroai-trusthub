import { Prisma } from "@prisma/client";
import { SecurePrisma } from "../prisma";

export const createInvolvedParty = async (
  data: Prisma.InvolvedPartyCreateArgs
) => {
  const prisma = await SecurePrisma();
  return prisma.involvedParty.create(data);
};

export const updateInvolvedParty = async (
  data: Prisma.InvolvedPartyUpdateArgs
) => {
  const prisma = await SecurePrisma();
  return prisma.involvedParty.update(data);
};

export const deleteInvolvedParty = async (
  data: Prisma.InvolvedPartyDeleteArgs
) => {
  const prisma = await SecurePrisma();
  return prisma.involvedParty.delete(data);
};
