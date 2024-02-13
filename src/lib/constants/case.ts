import { CaseSeverity, InvolvedPartyType } from "@prisma/client";

export const caseSeverity = {
  [CaseSeverity.URGENT]: "Urgent",
  [CaseSeverity.HIGH]: "High",
  [CaseSeverity.MEDIUM]: "Medium",
  [CaseSeverity.LOW]: "Low",
};

export const partyType = {
  [InvolvedPartyType.LAW_ENFORCEMENT]: "Law enforcement",
  [InvolvedPartyType.REPORTING_USER]: "Reporting user",
  [InvolvedPartyType.REPORTED_USER]: "Reported user",
};
