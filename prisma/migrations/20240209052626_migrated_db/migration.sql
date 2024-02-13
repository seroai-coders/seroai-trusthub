-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "InvolvedPartyType" AS ENUM ('LAW_ENFORCEMENT', 'REPORTING_USER', 'REPORTED_USER');

-- CreateEnum
CREATE TYPE "CaseLogType" AS ENUM ('ADD', 'DELETE', 'UPDATE');

-- CreateEnum
CREATE TYPE "CaseSeverity" AS ENUM ('URGENT', 'HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identifier" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Identifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvolvedParty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InvolvedPartyType" NOT NULL,

    CONSTRAINT "InvolvedParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "fieldName" TEXT NOT NULL,
    "type" "CaseLogType" NOT NULL,
    "fromValue" TEXT NOT NULL,
    "toValue" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "CaseLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "caseStatus" TEXT,
    "documentLinks" JSONB[],
    "severity" "CaseSeverity" NOT NULL DEFAULT 'MEDIUM',
    "assignedToId" TEXT,
    "caseInputData" JSONB,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IdentifierToInvolvedParty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseToInvolvedParty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_IdentifierToInvolvedParty_AB_unique" ON "_IdentifierToInvolvedParty"("A", "B");

-- CreateIndex
CREATE INDEX "_IdentifierToInvolvedParty_B_index" ON "_IdentifierToInvolvedParty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToInvolvedParty_AB_unique" ON "_CaseToInvolvedParty"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToInvolvedParty_B_index" ON "_CaseToInvolvedParty"("B");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseLog" ADD CONSTRAINT "CaseLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseLog" ADD CONSTRAINT "CaseLog_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentifierToInvolvedParty" ADD CONSTRAINT "_IdentifierToInvolvedParty_A_fkey" FOREIGN KEY ("A") REFERENCES "Identifier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentifierToInvolvedParty" ADD CONSTRAINT "_IdentifierToInvolvedParty_B_fkey" FOREIGN KEY ("B") REFERENCES "InvolvedParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToInvolvedParty" ADD CONSTRAINT "_CaseToInvolvedParty_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToInvolvedParty" ADD CONSTRAINT "_CaseToInvolvedParty_B_fkey" FOREIGN KEY ("B") REFERENCES "InvolvedParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
