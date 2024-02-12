import { CaseSeverity } from "@prisma/client";

export interface CaseFiltersValueProps {
  assignedTo?: string;
  caseStatus?: string;
  severity?: CaseSeverity;
}
