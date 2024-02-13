"use client";
import { MdFilterList } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { caseSeverity } from "@/lib/constants/case";
import { Dropdown } from "@/components/ui/ReactSelect";
import { SingleValue, Option } from "./CustomSeverity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";

export const CaseFilters = ({
  caseStatuses,
  users,
}: {
  caseStatuses: string[];
  users: User[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const caseSeverityOptions = Object.entries(caseSeverity).map(
    ([id, title]) => ({ id, title })
  );
  const caseStatusOptions = caseStatuses.map((id) => ({ id, title: id })) ?? [];

  const onChange = (name: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 flex items-center space-x-4 rounded-md bg-base-200">
      <MdFilterList size={20} className="mx-4 text-base-content" />
      <div className="min-w-32">
        <Dropdown
          key={searchParams.get("severity")}
          name="severity"
          placeholder="Severity"
          value={caseSeverityOptions.find(
            (item) => item.id === searchParams.get("severity")
          )}
          onChange={(severity) => {
            onChange("severity", severity?.id);
          }}
          options={caseSeverityOptions ?? []}
          customComponents={{ SingleValue, Option }}
          varient="filter"
          isClearable
        />
      </div>
      <div className="min-w-32">
        <Dropdown
          key={searchParams.get("caseStatus")}
          name="status"
          placeholder="Status"
          value={caseStatusOptions.find(
            (item) => item.id === searchParams.get("caseStatus")
          )}
          onChange={(caseStatus) => {
            onChange("caseStatus", caseStatus?.id);
          }}
          options={caseStatusOptions ?? []}
          varient="filter"
          isClearable
        />
      </div>
      <div className="min-w-32">
        <Dropdown
          key={searchParams.get("assignedTo")}
          name="assignedTo"
          placeholder="Assigned To"
          value={users.find(
            (item) => item.id === searchParams.get("assignedTo")
          )}
          onChange={(assignedTo) => {
            onChange("assignedTo", assignedTo?.id);
          }}
          options={users ?? []}
          varient="filter"
          textKeys={["name"]}
          isClearable
        />
      </div>
      <div>
        <Button onClick={clearAll} className="text-white">
          Clear
        </Button>
      </div>
    </div>
  );
};
