"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CellClassParams,
  CellClassRules,
  CellEditingStoppedEvent,
  ColDef,
  IRowNode,
  RowClassParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useNotification } from "@/lib/hooks/useNotification";
import { useLoader } from "@/lib/hooks/useLoader";
import { Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import ActionRenderer, {
  ActionType,
  actionType,
} from "@/components/common/GridRenderer/ActionRenderer";

export interface DocumentLink {
  id: string;
  title: string;
  link: string;
}

export const DocumentLinks = ({
  value = [],
  onSave,
}: {
  value?: DocumentLink[];
  onSave: (
    updatedData: Prisma.CaseUpdateInput | Prisma.CaseUncheckedUpdateInput
  ) => void;
}) => {
  const [formData, setFormData] = useState(value);
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();
  const [inputRow, setInputRow] = useState<Partial<DocumentLink>>({
    id: nanoid(),
  });

  const isInputRow = (node?: IRowNode) => node?.rowPinned === "top";

  useEffect(() => {
    setFormData(value);
  }, [value]);

  const cellClassRules: CellClassRules = {
    "!border !border-error": (params: CellClassParams) =>
      !!params.colDef.field && !isInputRow(params.node) && !params.value,
  };

  const isRowValid = (row: Partial<DocumentLink>) => row.link && row.title;

  const onSaveCase = useCallback(
    async (data: DocumentLink[]) => {
      const isFormValid = data.length && !data.find((row) => !isRowValid(row));
      if (!isFormValid) return;

      showLoader(true);

      try {
        await onSave({
          documentLinks: data as unknown as Prisma.InputJsonValue[],
        });
        notifySuccess(`Case updation successful`);
      } catch {
        notifyError(`Case updation failed`);
      } finally {
        showLoader(false);
      }
    },
    [notifyError, notifySuccess, onSave, showLoader]
  );

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Title",
        field: "title",
        minWidth: 100,
        flex: 1,
      },
      {
        headerName: "Link",
        field: "link",
        minWidth: 100,
        flex: 1,
      },
      {
        headerName: "",
        field: "",
        minWidth: 40,
        maxWidth: 70,
        cellRenderer: ActionRenderer,
        cellRendererParams: {
          showActions: [actionType.DELETE],
          onClick: (documentLink: DocumentLink, type: ActionType) => {
            if (type === actionType.DELETE) {
              onSaveCase(formData.filter((v) => v.id !== documentLink.id));
            }
          },
          isInputRow,
        },
        editable: false,
        pinned: "right",
        lockPinned: true,
      },
    ],
    [formData, onSaveCase]
  );

  const createPinnedCellPlaceholder = ({ colDef }: { colDef: ColDef }) =>
    colDef.field === "title" ? "Add document link here" : "";

  const onCellEditingStopped = useCallback(
    (params: CellEditingStoppedEvent) => {
      if (isInputRow(params.node) && isRowValid(inputRow)) {
        onSaveCase([...formData, inputRow as DocumentLink]);
        setInputRow({ id: nanoid() });
        return;
      }

      if (!isInputRow(params.node)) {
        onSaveCase(formData);
      }
    },
    [formData, inputRow, onSaveCase]
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
      <div className="pb-4">
        <label className="label label-text justify-start">Document Links</label>
        <div className="h-auto w-full ag-content-hide">
          <AgGridReact
            className={"ag-theme-quartz"}
            rowData={formData}
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
          />
        </div>
      </div>
    </div>
  );
};
