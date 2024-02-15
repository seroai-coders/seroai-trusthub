"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import {
  Identifier,
  InvolvedParty,
  InvolvedPartyType,
  Prisma,
} from "@prisma/client";
import { AgGridReact } from "ag-grid-react";
import { partyType } from "@/lib/constants/case";
import {
  CellClassParams,
  CellEditingStoppedEvent,
  ColDef,
  ICellRendererParams,
  IRowNode,
  ISelectCellEditorParams,
  RowClassParams,
} from "ag-grid-community";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { nanoid } from "nanoid";
import { InvolvedPartyData } from "./InvolvedParty";
import { useAgMasterDetail } from "@/lib/hooks/useAgMasterDetail";
import IdentifiersRenderer from "../../GridRenderer/IdentifiersRenderer";
import ActionRenderer, {
  ActionType,
  actionType,
} from "../../GridRenderer/ActionRenderer";
import FullWidthCellRenderer from "../../GridRenderer/FullWidthCellRenderer";
import { TabsEnum as UserHistoryTabsEnum } from "@/lib/types/userHistoryTypes";
import LinkRenderer from "../../GridRenderer/LinkRenderer";

const getInitialInputRow = () => ({
  id: nanoid(),
  type: InvolvedPartyType.LAW_ENFORCEMENT,
  identifiers: [],
});

const InvolvedParties = ({
  value,
  caseId,
  createInvolvedParty,
  updateInvolvedParty,
  deleteInvolvedParty,
}: {
  value: InvolvedPartyData[];
  caseId: string;
  createInvolvedParty: (createArgs: Prisma.InvolvedPartyCreateArgs) => void;
  updateInvolvedParty: (updateArgs: Prisma.InvolvedPartyUpdateArgs) => void;
  deleteInvolvedParty: (deleteArgs: Prisma.InvolvedPartyDeleteArgs) => void;
}) => {
  const {
    rowData,
    setRowData,
    showDetailRowForMaster,
    hideDetailRowById,
    getRowHeight,
    isFullWidthRow,
  } = useAgMasterDetail<InvolvedPartyData>(value, true);
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();
  const gridRef = useRef<AgGridReact<InvolvedPartyData>>(null);
  const [inputRow, setInputRow] =
    useState<Partial<InvolvedPartyData>>(getInitialInputRow);

  useEffect(() => {
    setRowData(value);
  }, [setRowData, value]);

  const onDeleteInvlovedParty = async (involvedParty: InvolvedParty) => {
    showLoader(true);

    try {
      await deleteInvolvedParty({ where: { id: involvedParty.id } });
      notifySuccess(`Involved Party delete successful`);
    } catch {
      notifyError(`Involved Party delete failed`);
    } finally {
      showLoader(false);
    }
  };

  const isInputRow = (node?: IRowNode) => node?.rowPinned === "top";

  const createPinnedCellPlaceholder = ({ colDef }: { colDef: ColDef }) =>
    colDef.field === "name" ? "Add party here" : "";

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: (params) => params.node && isInputRow(params.node),
      filter: false,
      sortable: false,
      autoHeight: true,
      cellClassRules: {
        "!border !border-error": (params: CellClassParams) =>
          !!params.colDef.field && !isInputRow(params.node) && !params.value,
      },
      valueFormatter: (params) => {
        const isEmptyPinnedCell =
          params.node && isInputRow(params.node) && !params.value;

        return isEmptyPinnedCell
          ? createPinnedCellPlaceholder(params)
          : params.value;
      },
      singleClickEdit: true,
    };
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Name",
      field: "name",
      minWidth: 120,
      flex: 1,
      cellRenderer: LinkRenderer,
      cellRendererParams: (params: ICellRendererParams) => ({
        href: `/userHistory?identifier=${params?.value}&tab=${UserHistoryTabsEnum.CASES}`,
      }),
    },
    {
      headerName: "Type",
      field: "type",
      minWidth: 140,
      flex: 1,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(partyType),
      } as ISelectCellEditorParams,
      valueFormatter: (params) =>
        partyType[params.value as keyof typeof partyType],
    },
    {
      headerName: "Identifiers",
      field: "identifiers",
      cellRenderer: IdentifiersRenderer,
      cellRendererParams: { isInputRow },
      valueFormatter: (params: { value: Identifier[] }) =>
        params.value.map(({ name }) => name).join(", "),
      minWidth: 100,
      flex: 1,
      editable: false,
    },
    {
      headerName: "",
      field: "",
      flex: 1,
      minWidth: 50,
      maxWidth: 100,
      cellRenderer: ActionRenderer,
      cellRendererParams: {
        showActions: [actionType.EDIT, actionType.DELETE],
        onClick: (involvedParty: InvolvedPartyData, type: ActionType) => {
          if (type === actionType.EDIT) {
            showDetailRowForMaster(involvedParty.id);
          }

          if (type === actionType.DELETE) {
            onDeleteInvlovedParty(involvedParty);
          }
        },
        isInputRow,
      },
      pinned: "right",
      lockPinned: true,
      editable: false,
    },
  ]);

  const fullWidthCellRenderer = useMemo(() => FullWidthCellRenderer, []);

  const fullWidthCellRendererParams = useMemo(
    () => ({
      onDiscard: (party: InvolvedPartyData) => {
        hideDetailRowById(party.id);
      },
      caseId,
      updateInvolvedParty,
    }),
    [caseId, hideDetailRowById, updateInvolvedParty]
  );

  const isRowValid = (row: Partial<InvolvedPartyData>) => row.name && row.type;

  const onUpdateInvlovedParty = useCallback(
    async (involvedParty: InvolvedParty) => {
      showLoader(true);

      try {
        await createInvolvedParty({
          data: {
            name: involvedParty.name,
            type: involvedParty.type,
            cases: { connect: [{ id: caseId }] },
          },
        });
        notifySuccess("Party creation successful");
      } catch {
        notifyError("Party creation failed");
      } finally {
        showLoader(false);
      }
    },
    [caseId, createInvolvedParty, notifyError, notifySuccess, showLoader]
  );

  const onCellEditingStopped = useCallback(
    (params: CellEditingStoppedEvent) => {
      const isPinnedRowDataCompleted = (node: IRowNode) => {
        if (!isInputRow(node)) return;
        return isRowValid(inputRow);
      };

      if (isPinnedRowDataCompleted(params.node)) {
        onUpdateInvlovedParty(inputRow as InvolvedParty);
        setInputRow(getInitialInputRow());
      }
    },
    [inputRow, onUpdateInvlovedParty]
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
      <label className="label label-text justify-start">Involved Parties</label>
      <div className="h-auto w-full ag-content-hide">
        <AgGridReact
          className={"ag-theme-quartz"}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pinnedTopRowData={pinnedRowData}
          getRowClass={getRowClass}
          onCellEditingStopped={onCellEditingStopped}
          stopEditingWhenCellsLoseFocus
          domLayout={"autoHeight"}
          enableBrowserTooltips
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
          fullWidthCellRendererParams={fullWidthCellRendererParams}
          getRowHeight={getRowHeight}
          ref={gridRef}
          getRowId={(params) => params.data.id}
        />
      </div>
    </div>
  );
};

export default InvolvedParties;
