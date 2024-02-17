import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";
import { formatDateTime } from "@/lib/utils/date";
import { loadCasesByIdentifier } from "@/lib/api/case";
import CaseListRow from "../Case/CaseList/CaseListRow";

const Cases = async ({ identifier }: { identifier: string }) => {
  const data = await loadCasesByIdentifier(identifier);

  return (
    <div className="flex space-x-8 mt-8">
      <Table className="rounded-lg text-black">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {identifier &&
            data?.map((item) => (
              <CaseListRow key={item.id} caseId={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.caseStatus}</TableCell>
                <TableCell>
                  {item.createdAt ? formatDateTime(item.createdAt) : null}
                </TableCell>
              </CaseListRow>
            ))}
          {!data?.length && (
            <TableRow>
              <TableCell colSpan={3} className="h-32 text-center">
                {!identifier ? "Please Select Identifier" : "No Rows To Show"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Cases;
