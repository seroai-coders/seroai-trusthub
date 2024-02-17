import { CaseFilters } from "@/components/common/Case/CaseFilters";
import CaseList from "@/components/common/Case/CaseList/CaseList";
import { CreateCase } from "@/components/common/Case/CreateCase";
import { createCase } from "@/lib/api/case";
import { loadSettings } from "@/lib/api/settings";
import { loadUsers } from "@/lib/api/users";
import { CaseFiltersValueProps } from "@/lib/types/case";
import { Prisma } from "@prisma/client";

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

  const onCreateCase = async (
    data: Prisma.CaseCreateInput | Prisma.CaseUncheckedCreateInput
  ) => {
    "use server";
    return createCase(data);
  };

  return (
    <div className="px-20">
      <div className="flex items-center justify-between mb-8">
        <CreateCase createCase={onCreateCase} />
      </div>
      <CaseFilters
        caseStatuses={settings?.caseStatuses ?? []}
        users={users ?? []}
      />
      <CaseList filters={mapSearchParamsToFilters(searchParams)} />
    </div>
  );
}
