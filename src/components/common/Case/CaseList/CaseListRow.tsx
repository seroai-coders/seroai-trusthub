"use client";
import { TableRow } from "@/components/ui/Table";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const CaseListRow = ({
  caseId,
  children,
}: PropsWithChildren<{ caseId: string }>) => {
  const router = useRouter();

  return (
    <TableRow
      className="hover:bg-primary hover:bg-opacity-10 cursor-pointer"
      onClick={() => {
        router.push(`case/${caseId}`);
      }}
    >
      {children}
    </TableRow>
  );
};

export default CaseListRow;
