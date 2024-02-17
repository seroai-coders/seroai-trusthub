import { Identifier, Prisma } from "@prisma/client";
import { ICellRendererParams } from "ag-grid-community";
import { useNotification } from "@/lib/hooks/useNotification";
import { useLoader } from "@/lib/hooks/useLoader";
import {
  InvolvedPartyComp,
  InvolvedPartyData,
} from "../Case/EditCase/InvolvedParty";
import { findDelta } from "@/lib/constants/delta";

const FullWidthCellRenderer = ({
  node,
  onDiscard = () => {},
  caseId,
  updateInvolvedParty,
}: ICellRendererParams & {
  onDiscard?: () => void;
  caseId: string;
  updateInvolvedParty: (updateArgs: Prisma.InvolvedPartyUpdateArgs) => void;
}) => {
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();

  const onUpdateInvlovedParty = async ({
    masterRowId,
    name,
    type,
    identifiers,
  }: InvolvedPartyData) => {
    const party = { id: masterRowId, name, type, identifiers };
    showLoader(true);
    const delta = findDelta<Identifier>(
      node.data?.identifiers,
      party.identifiers ?? []
    );

    try {
      await updateInvolvedParty({
        data: {
          ...party,
          identifiers: {
            update: delta.update.map((identifier) => {
              return {
                where: { id: identifier.id },
                data: identifier,
              };
            }),
            create: delta.create,
            delete: delta.delete,
          },
          cases: { connect: [{ id: caseId }] },
        },
        where: {
          id: party.id,
        },
      });
      notifySuccess(`Involved Party updation successful`);
    } catch {
      notifyError(`Involved Party updation failed`);
    } finally {
      showLoader(false);
    }
  };

  return (
    <div className="bg-gray-200 p-4" id="involved-party">
      <InvolvedPartyComp
        value={node.data}
        onChange={(involvedParty) => onUpdateInvlovedParty(involvedParty)}
        onDiscard={onDiscard}
      />
    </div>
  );
};

export default FullWidthCellRenderer;
