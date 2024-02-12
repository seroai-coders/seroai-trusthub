import { Prisma } from "@prisma/client";
import { SecurePrisma } from "../prisma";
import { CaseFiltersValueProps } from "../types/case";

export const loadCases = async (filters?: CaseFiltersValueProps) => {
  const prisma = await SecurePrisma();

  return prisma.case.findMany({
    include: { assignedTo: true },
    where: {
      assignedToId: filters?.assignedTo,
      caseStatus: filters?.caseStatus,
      severity: filters?.severity,
    },
    orderBy: { updatedAt: "desc" },
  });
};

export const createCase = async (
  data: Prisma.CaseCreateInput | Prisma.CaseUncheckedCreateInput
) => {
  "use server";
  const prisma = await SecurePrisma();

  return prisma.case.create({ data });
};
