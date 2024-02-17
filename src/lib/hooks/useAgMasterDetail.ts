import { IsFullWidthRowParams, RowHeightParams } from "ag-grid-community";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";

export interface MasterDetailBase {
  id: string;
  masterRowId?: string;
  isMasterRow?: boolean;
}

export const useAgMasterDetail = <T extends MasterDetailBase>(
  value: T[],
  hideMasterRowOnOpen = false,
  detailRowHeight = 300
) => {
  const [rowData, setRowData] = useState<T[]>(value);

  const showDetailRowForMaster = useCallback(
    (masterRowId: string) => {
      setRowData((prev) => {
        const prev_ = prev.filter((v) => v.masterRowId !== masterRowId);
        return prev_
          .map((v) => {
            if (v.id === masterRowId) {
              if (hideMasterRowOnOpen) {
                return [{ ...v, id: nanoid(), masterRowId: v.id }];
              }

              return [
                { ...v, isMasterRow: true },
                { ...v, id: nanoid(), masterRowId: v.id },
              ];
            }
            return [v];
          })
          .flat();
      });
    },
    [hideMasterRowOnOpen]
  );

  const removeRows = useCallback(
    (rowData: T[], toBeRemoved: T) => {
      if (hideMasterRowOnOpen)
        return rowData.map((v) =>
          v.id === toBeRemoved.id
            ? value.find((v) => v.id === toBeRemoved?.masterRowId) ?? v
            : v
        );

      return rowData
        .map((v) => {
          if (v.id === toBeRemoved.id) return [];
          if (v.id === toBeRemoved.masterRowId)
            return [value.find((d) => d.id === toBeRemoved?.masterRowId) ?? v];

          return [v];
        })
        .flat();
    },
    [hideMasterRowOnOpen, value]
  );

  const hideDetailRowById = useCallback(
    (id: string) => {
      setRowData((prev) => {
        const toBeRemoved = prev.find((v) => v.id === id);

        if (!toBeRemoved) return prev;

        return removeRows(prev, toBeRemoved);
      });
    },
    [removeRows]
  );

  const isDetailRow = useCallback(
    (node: { data: { masterRowId: string } }) => !!node.data.masterRowId,
    []
  );

  const getRowHeight = useCallback(
    (params: RowHeightParams) => {
      if (isDetailRow(params.node)) return detailRowHeight;
    },
    [detailRowHeight, isDetailRow]
  );

  const isFullWidthRow = useCallback(
    (params: IsFullWidthRowParams) => isDetailRow(params.rowNode),
    [isDetailRow]
  );

  return {
    showDetailRowForMaster,
    hideDetailRowById,
    rowData,
    setRowData,
    isDetailRow,
    getRowHeight,
    isFullWidthRow,
  };
};
