"use server";
import { CaseLogType, CaseSeverity, Prisma } from "@prisma/client";
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

export const findCaseById = async (caseId: string) => {
  const prisma = await SecurePrisma();

  return prisma.case.findFirst({
    include: {
      createdBy: true,
      involvedParties: {
        include: { identifiers: true },
      },
    },
    where: {
      id: caseId,
    },
  });
};

export const createCase = async (
  data: Prisma.CaseCreateInput | Prisma.CaseUncheckedCreateInput
) => {
  const prisma = await SecurePrisma();

  return prisma.case.create({ data });
};

export const updateCase = async (data: Prisma.CaseUpdateArgs) => {
  const prisma = await SecurePrisma();

  return prisma.$transaction(async (tx) => {
    const caseData = await tx.case.update(data);

    const [log] = await tx.caseLog.findMany({
      where: { fieldName: "severity", caseId: caseData.id },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    if (log?.toValue !== caseData?.severity) {
      prisma.caseLog.create({
        data: {
          caseId: caseData.id,
          createdById: caseData.createdById,
          fieldName: "severity",
          type: CaseLogType.UPDATE,
          fromValue: log?.toValue ?? CaseSeverity.MEDIUM,
          toValue: caseData?.severity ?? "",
        },
      });
    }

    return caseData;
  });
};

export const loadCasesByIdentifier = async (identifier: string) => {
  const prisma = await SecurePrisma();

  return prisma.case.findMany({
    where: {
      involvedParties: {
        some: { identifiers: { some: { name: identifier } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const createNote = async (data: Prisma.NoteCreateArgs) => {
  const prisma = await SecurePrisma();

  return prisma.note.create(data);
};

export const updateNote = async (data: Prisma.NoteUpdateArgs) => {
  const prisma = await SecurePrisma();

  return prisma.note.update(data);
};

export const createCaseLog = async (data: Prisma.CaseLogCreateArgs) => {
  const prisma = await SecurePrisma();

  return prisma.caseLog.create(data);
};

export const loadCaseLogs = async (caseId: string) => {
  const prisma = await SecurePrisma();

  const options = {
    where: { caseId },
    include: { createdBy: true },
    orderBy: { createdAt: "desc" },
  };

  const [caseLogs, notes] = await Promise.all([
    prisma.caseLog.findMany(options as Prisma.CaseLogFindManyArgs),
    prisma.note.findMany(options as Prisma.NoteFindManyArgs),
  ]);

  return [
    ...caseLogs,
    ...notes.map((item) => ({ ...item, fieldName: "note" })),
  ].sort((a, b) => new Date(b.createdAt).valueOf() - a.createdAt.valueOf());
};
