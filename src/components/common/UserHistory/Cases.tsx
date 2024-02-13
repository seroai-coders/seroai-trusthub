import React from "react";
import { Case } from "@prisma/client";
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

const CaseList = ({
  data,
  isIdentifierEmpty,
}: {
  data?: Case[];
  isIdentifierEmpty: boolean;
}) => {
  return (
    <Table className="rounded-lg text-black">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Created At</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isIdentifierEmpty &&
          data?.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-primary hover:bg-opacity-10 cursor-pointer"
              // onClick={() => {
              // TODO: Add routing
              //   // router.push(createPath(orgName, `case/${item.id}`));
              // }}
            >
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.caseStatus}</TableCell>
              <TableCell>
                {item.createdAt ? formatDateTime(item.createdAt) : null}
              </TableCell>
            </TableRow>
          ))}
        {!data?.length && (
          <TableRow>
            <TableCell colSpan={3} className="h-32 text-center">
              {isIdentifierEmpty
                ? "Please Select Identifier"
                : "No Rows To Show"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const Cases = async ({ identifier }: { identifier: string }) => {
  const data = await loadCasesByIdentifier(identifier);

  return (
    <div className="flex space-x-8 mt-8">
      <CaseList data={identifier ? data : []} isIdentifierEmpty={!identifier} />
    </div>
  );
};

export default Cases;
