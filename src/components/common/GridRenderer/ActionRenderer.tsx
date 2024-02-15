import React from "react";

import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Button } from "../../ui/Button";
import { IRowNode } from "ag-grid-community";

export const actionType = {
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export type ActionType = (typeof actionType)[keyof typeof actionType];

const ActionRenderer = ({
  data,
  onClick,
  showActions = [],
  isInputRow = () => false,
  inputRowActions = [],
  node,
}: {
  data: { id: string };
  onClick: (
    data: { id: string },
    actionType: ActionType,
    isInputRow: boolean
  ) => void;
  showActions?: ActionType[];
  isInputRow?: (node: IRowNode) => boolean;
  inputRowActions?: ActionType[];
  node: IRowNode;
}) => {
  if (!data.id) return "";

  const inputRow = isInputRow(node);
  const actions = inputRow ? inputRowActions : showActions;

  return (
    <div>
      {actions.includes(actionType.EDIT) && (
        <Button
          variant="iconGhost"
          color="neutral"
          size="sm"
          onClick={() => onClick(data, actionType.EDIT, inputRow)}
        >
          <MdModeEdit />
        </Button>
      )}
      {actions.includes(actionType.DELETE) && (
        <Button
          variant="iconGhost"
          color="neutral"
          size="sm"
          onClick={() => onClick(data, actionType.DELETE, inputRow)}
        >
          <MdDeleteForever />
        </Button>
      )}
    </div>
  );
};

export default ActionRenderer;
