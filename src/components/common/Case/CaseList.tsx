import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";
import { Text } from "@tremor/react";
import { loadCases } from "@/lib/api/case";
import SeverityRenderer from "../GridRenderer/SeverityRenderer";
import { CaseFiltersValueProps } from "@/lib/types/CaseFilters";

const CaseList = async ({ filters }: { filters?: CaseFiltersValueProps }) => {
  const data = await loadCases(filters);

  return (
    <Table className="mt-5 rounded-lg text-black">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Severity</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Assigned To</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item) => (
          <TableRow
            key={item.id}
            className="hover:bg-primary hover:bg-opacity-10 cursor-pointer"
            // onClick={() => {
            // TODO: Add routing
            //   // router.push(createPath(orgName, `case/${item.id}`));
            // }}
          >
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <SeverityRenderer data={item} />
            </TableCell>
            <TableCell>{item.caseStatus}</TableCell>
            <TableCell>
              <Text>{item.assignedTo?.name}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CaseList;
