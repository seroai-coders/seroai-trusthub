import React from "react";
import SeverityLog, { SeverityType } from "./SeverityLog";
import { NoteLog, NoteLogType } from "./NoteLog";
import Timeline from "@/components/ui/Timeline";
import { ActivityLog, ActivityLogType } from "./ActivityLog";
import { loadCaseLogs } from "@/lib/api/case";

const CaseTimeline = async ({ caseId }: { caseId: string }) => {
  const caseLogs = await loadCaseLogs(caseId);

  return (
    <Timeline
      items={caseLogs.map((item) => ({
        children:
          item.fieldName === "note" ? (
            <NoteLog data={item as NoteLogType} />
          ) : item.fieldName === "severity" ? (
            <SeverityLog data={item as SeverityType} />
          ) : (
            <ActivityLog data={item as ActivityLogType} />
          ),
      }))}
    />
  );
};

export default CaseTimeline;
