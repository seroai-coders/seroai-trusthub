"use client";
import { Identifier, InvolvedParty, InvolvedPartyType } from "@prisma/client";
import Dropdown from "@/components/ui/ReactSelect/Dropdown";
import { Button } from "@/components/ui/Button";
import { useCallback, useMemo, useState } from "react";
import { partyType } from "@/lib/constants/case";
import { AgGridReact } from "ag-grid-react";
import {
  CellClassParams,
  CellClassRules,
  CellEditingStoppedEvent,
  ColDef,
  IRowNode,
  RowClassParams,
} from "ag-grid-community";
import { nanoid } from "nanoid";
import { MasterDetailBase } from "@/lib/hooks/useAgMasterDetail";
import { Input } from "@/components/ui/Input";
import ActionRenderer, {
  ActionType,
  actionType,
} from "../../GridRenderer/ActionRenderer";

const involvedPartyType = Object.entries(partyType).map(([id, title]) => ({
  id,
  title,
}));

export type InvolvedPartyData = InvolvedParty & {
  identifiers: Identifier[] | null;
} & MasterDetailBase;

export const InvolvedPartyComp = ({
  value = {
    id: "",
    name: "",
    type: InvolvedPartyType.LAW_ENFORCEMENT,
    identifiers: [],
  },
  onChange,
  onDiscard,
}: {
  value?: InvolvedParty & { identifiers: Identifier[] };
  onChange: (value: InvolvedParty & { identifiers: Identifier[] }) => void;
  onDiscard: (value: InvolvedParty & { identifiers: Identifier[] }) => void;
}) => {
  const [formData, setFormData] = useState(value);
  const [inputRow, setInputRow] = useState<Partial<Identifier>>({
    id: nanoid(),
  });

  const isInputRow = (node?: IRowNode) => node?.rowPinned === "top";

  const cellClassRules: CellClassRules = {
    "!border !border-error": (params: CellClassParams) =>
      !!params.colDef.field && !isInputRow(params.node) && !params.value,
  };

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Identifier Type",
      field: "type",
      minWidth: 100,
      flex: 3,
    },
    {
      headerName: "Identifier Value",
      field: "name",
      minWidth: 100,
      flex: 3,
    },
    {
      headerName: "",
      field: "",
      minWidth: 40,
      maxWidth: 70,
      cellRenderer: ActionRenderer,
      cellRendererParams: {
        showActions: [actionType.DELETE],
        onClick: (identifier: Identifier, type: ActionType) => {
          if (type === actionType.DELETE) {
            setFormData((prev) => {
              const data = prev.identifiers.filter(
                (v) => v.id !== identifier.id
              );
              return { ...prev, identifiers: data };
            });
          }
        },
        isInputRow,
      },
      editable: false,
      pinned: "right",
      lockPinned: true,
    },
  ]);

  const createPinnedCellPlaceholder = ({ colDef }: { colDef: ColDef }) =>
    colDef.field === "type" ? "Add identifier here" : "";

  const isRowValid = (row: Partial<Identifier>) => row.name && row.type;

  const onCellEditingStopped = useCallback(
    (params: CellEditingStoppedEvent) => {
      const isPinnedRowDataCompleted = (node: IRowNode) => {
        if (!isInputRow(node)) return;
        return isRowValid(inputRow);
      };

      if (isPinnedRowDataCompleted(params.node)) {
        setFormData({
          ...formData,
          identifiers: [...formData.identifiers, inputRow as Identifier],
        });
        setInputRow({ id: nanoid() });
      }
    },
    [inputRow, formData]
  );

  const getRowClass = useCallback(
    (params: RowClassParams) =>
      isInputRow(params.node)
        ? ["label", "label-text", "font-semibold", "italic", "!text-gray-500"]
        : undefined,
    []
  );

  const pinnedRowData = useMemo(() => [inputRow], [inputRow]);

  return (
    <div className="flex flex-col space-y-2">
      <Input
        name="name"
        label="Name"
        required
        value={formData.name}
        onChange={(value) => {
          setFormData({ ...formData, name: value });
        }}
      />
      <Dropdown
        name="type"
        label="Type"
        value={involvedPartyType.find((o) => o.id === formData.type)}
        onChange={({ id }) => {
          setFormData({ ...formData, type: id as InvolvedPartyType });
        }}
        options={involvedPartyType}
        menuPortalTarget={document.body}
      />
      <div className="pb-4">
        <label className="label label-text justify-start">Identifiers</label>
        <div className="h-auto w-full ag-content-hide">
          <AgGridReact
            className={"ag-theme-quartz"}
            rowData={formData.identifiers}
            columnDefs={columnDefs}
            pinnedTopRowData={pinnedRowData}
            getRowClass={getRowClass}
            onCellEditingStopped={onCellEditingStopped}
            stopEditingWhenCellsLoseFocus
            domLayout={"autoHeight"}
            defaultColDef={{
              filter: false,
              sortable: false,
              editable: true,
              cellClassRules,
              valueFormatter: (params) => {
                const isEmptyPinnedCell =
                  params.node && isInputRow(params.node) && !params.value;

                return isEmptyPinnedCell
                  ? createPinnedCellPlaceholder(params)
                  : params.value;
              },
              singleClickEdit: true,
            }}
            onCellValueChanged={(event) => {
              setFormData((prev) => ({
                ...prev,
                identifiers: prev.identifiers.map((item) =>
                  item.id === event.data.id ? event.data : item
                ),
              }));
            }}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          color="neutral"
          onClick={() => onDiscard(formData)}
        >
          Discard
        </Button>
        <Button onClick={() => onChange(formData)} disabled={!formData.name}>
          Save
        </Button>
      </div>
    </div>
  );
};
