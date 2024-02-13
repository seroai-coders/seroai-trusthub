-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "caseStatuses" TEXT[],
    "caseInputSchema" JSONB,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
