import { CaseFilters } from "@/components/common/Case/CaseFilters";
import CaseList from "@/components/common/Case/CaseList";
import { CreateCase } from "@/components/common/Case/CreateCase";
import { createCase } from "@/lib/api/case";
import { loadSettings } from "@/lib/api/settings";
import { loadUsers } from "@/lib/api/users";
import { CaseFiltersValueProps } from "@/lib/types/CaseFilters";

const mapSearchParamsToFilters = ({
  assignedTo,
  caseStatus,
  severity,
}: CaseFiltersValueProps) => ({
  assignedTo: assignedTo || undefined,
  caseStatus: caseStatus || undefined,
  severity: severity || undefined,
});

export default async function Page({
  searchParams,
}: {
  searchParams: CaseFiltersValueProps;
}) {
  const [settings, users] = await Promise.all([loadSettings(), loadUsers()]);

  return (
    <div className="px-20">
      <div className="flex items-center justify-between mb-8">
        <CreateCase createCase={createCase} />
      </div>
      <CaseFilters
        caseStatuses={settings?.caseStatuses ?? []}
        users={users ?? []}
      />
      <CaseList filters={mapSearchParamsToFilters(searchParams)} />
    </div>
  );
}
