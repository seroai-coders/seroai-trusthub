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
import InvolvedParties from "./InvolvedParties";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";

const CaseManagement = ({
  data,
  updateCase,
  createInvolvedParty,
  updateInvolvedParty,
  deleteInvolvedParty,
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
  createInvolvedParty: (
    data: Prisma.InvolvedPartyCreateArgs
  ) => Promise<InvolvedParty>;
  updateInvolvedParty: (
    data: Prisma.InvolvedPartyUpdateArgs
  ) => Promise<InvolvedParty>;
  deleteInvolvedParty: (
    data: Prisma.InvolvedPartyDeleteArgs
  ) => Promise<InvolvedParty>;
  users: User[];
  settings: Settings | null;
}) => {
  const { notifyError } = useNotification();
  const { showLoader } = useLoader();

  const onSave = async (
    updatedData: Prisma.CaseUpdateInput | Prisma.CaseUncheckedUpdateInput
  ) => {
    showLoader(true);
    try {
      updateCase({
        data: updatedData,
        where: { id: data?.id ?? "" },
      });
    } catch {
      notifyError(`Case updation failed`);
    } finally {
      showLoader(false);
    }
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
          <InvolvedParties
            value={data?.involvedParties ?? []}
            caseId={data?.id ?? ""}
            createInvolvedParty={createInvolvedParty}
            updateInvolvedParty={updateInvolvedParty}
            deleteInvolvedParty={deleteInvolvedParty}
          />
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
