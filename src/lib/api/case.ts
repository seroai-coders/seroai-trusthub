"use server";
import { CaseLogType, CaseSeverity, Prisma } from "@prisma/client";
import { SecurePrisma } from "../prisma";
import { CaseFiltersValueProps } from "../types/case";
import { findDelta } from "../constants/delta";

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
    const prevCase = await tx.case.findFirst({
      where: { id: data.data.id as string },
      select: {
        policies: true,
        severity: true,
      },
    });

    const caseData = await tx.case.update(data);

    const policyDelta = findDelta<{ id: string }>(
      prevCase?.policies?.map((id: string) => ({ id })),
      caseData.policies.map((id) => ({ id }))
    );

    console.log(
      "policyDelta**********************************",
      prevCase?.policies,
      caseData.policies,
      policyDelta
    );

    const caseLog = {
      fromValue: "",
      toValue: "",
      caseId: caseData.id,
      createdById: caseData.createdById,
    };

    const caseLogs = [
      ...(policyDelta.create.length
        ? [
            {
              ...caseLog,
              fieldName: "policies",
              type: CaseLogType.ADD,
              toValue: JSON.stringify(policyDelta.create.map(({ id }) => id)),
            },
          ]
        : []),
      ...(policyDelta.delete.length
        ? [
            {
              ...caseLog,
              fieldName: "policies",
              type: CaseLogType.DELETE,
              fromValue: JSON.stringify(prevCase?.policies ?? []),
              toValue: JSON.stringify(policyDelta.delete.map(({ id }) => id)),
            },
          ]
        : []),
      ...(prevCase?.severity !== caseData.severity
        ? [
            {
              ...caseLog,
              fieldName: "severity",
              type: CaseLogType.UPDATE,
              fromValue: prevCase?.severity ?? CaseSeverity.MEDIUM,
              toValue: caseData.severity,
            },
          ]
        : []),
    ];

    if (caseLogs.length) prisma.caseLog.createMany({ data: caseLogs });

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
