"use client";
import React from "react";
import { CaseLog, CaseLogType } from "@prisma/client";
import { formatDateTime } from "@/lib/utils/date";
import PoliciesRenderer from "../../GridRenderer/PoliciesRenderer";

export type PolicyLogType = CaseLog & {
  createdBy?: { name: string | null };
};

const PoliciesLog = ({
  data: { createdBy, type, fieldName, toValue, createdAt },
  policies,
}: {
  policies: { id: string; title: string }[];
  data: PolicyLogType;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="mb-2">
          <span className="label-text">{`At ${formatDateTime(
            createdAt,
            "medium",
            "short"
          )} - `}</span>
          <span className="font-semibold mr-1">{createdBy?.name}</span>
          <span>{type === CaseLogType.ADD ? "linked" : "unlinked"} the </span>
          <span className="font-semibold">{fieldName}</span>
        </div>
      </div>
      <PoliciesRenderer
        data={{
          policies: policies.filter((p) => {
            try {
              return JSON.parse(toValue).includes(p.id);
            } catch {
              return false;
            }
          }),
        }}
      />
    </div>
  );
};

export default PoliciesLog;
