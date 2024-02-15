"use client";
import {
  Case,
  Identifier,
  InvolvedParty,
  Prisma,
  Settings,
  User,
} from "@prisma/client";
import { Divider } from "@tremor/react";
import { Title } from "./Title";
import { Description } from "./Description";
import { AssignedTo } from "./AssignedTo";
import { Severity } from "./Severity";
import { Status } from "./Status";
import CaseInputData from "./CaseInputData";
import { DocumentLink, DocumentLinks } from "./DocumentLinks";

const CaseManagement = ({
  data,
  updateCase,
  users,
  settings,
}: {
  data:
    | (Case & {
        createdBy: User | null;
        involvedParties:
          | (InvolvedParty & { identifiers: Identifier[] | null })[]
          | null;
      })
    | null;
  updateCase: (data: Prisma.CaseUpdateArgs) => Promise<Case>;
  users: User[];
  settings: Settings | null;
}) => {
  // TODO: Add Severity into Logs

  const onSave = (
    updatedData: Prisma.CaseUpdateInput | Prisma.CaseUncheckedUpdateInput
  ) => {
    updateCase({
      data: updatedData,
      where: { id: data?.id ?? "" },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="space-y-2 horizontal">
          <Title
            value={data?.title ?? ""}
            onChange={(title) => onSave({ title })}
          />
          <Description
            value={data?.description ?? ""}
            onChange={(description) => onSave({ description })}
          />
          <AssignedTo
            users={users}
            value={data?.assignedToId}
            onChange={(assignedToId) => onSave({ assignedToId })}
          />
          <Severity
            value={data?.severity}
            onChange={(severity) => onSave({ severity })}
          />
          <Status
            value={data?.caseStatus}
            onChange={(caseStatus) => onSave({ caseStatus })}
            caseStatuses={settings?.caseStatuses ?? []}
          />
        </div>
        <Divider />
        <div className="flex flex-col space-y-4">
          {/* <InvolvedParties
            value={data?.involvedParties ?? []}
            caseId={caseId}
          /> */}
          <DocumentLinks
            value={data?.documentLinks as unknown as DocumentLink[]}
            onSave={onSave}
          />
        </div>
        <Divider />
        <CaseInputData
          data={data?.caseInputData ?? {}}
          settings={settings}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default CaseManagement;
