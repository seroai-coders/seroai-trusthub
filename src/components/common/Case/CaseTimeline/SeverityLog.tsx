import React from "react";
import { CaseLog, CaseSeverity } from "@prisma/client";
import { caseSeverity } from "@/lib/constants/case";
import { formatDateTime } from "@/lib/utils/date";

export type SeverityType = CaseLog & {
  createdBy?: { name: string | null };
};

const SeverityLog = ({
  data: { createdBy, fieldName, fromValue, toValue, createdAt },
}: {
  data: SeverityType;
}) => {
  return (
    <div className="flex space-x-1 items-center">
      <span className="label-text">{`At ${formatDateTime(
        createdAt,
        "medium",
        "short"
      )} - `}</span>
      <span className="font-semibold">{createdBy?.name}</span>
      <span>updated the {fieldName} from</span>
      <span className="font-semibold">
        {caseSeverity[fromValue as CaseSeverity]}
      </span>
      <span>to</span>
      <span className="font-semibold">
        {caseSeverity[toValue as CaseSeverity]}
      </span>
    </div>
  );
};

export default SeverityLog;
