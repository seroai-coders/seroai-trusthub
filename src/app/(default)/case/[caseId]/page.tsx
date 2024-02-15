import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import { createNote, findCaseById, updateCase } from "@/lib/api/case";
import { Prisma } from "@prisma/client";
import { loadUsers } from "@/lib/api/users";
import { loadSettings } from "@/lib/api/settings";

const CaseManagement = dynamic(
  () => import("@/components/common/Case/EditCase/CaseManagement"),
  { loading: () => <Loader /> }
);
const CaseTimeline = dynamic(
  () => import("@/components/common/Case/CaseTimeline/CaseTimeline"),
  { loading: () => <Loader /> }
);
const AddNote = dynamic(() => import("@/components/common/Case/AddNote"), {
  loading: () => <Loader />,
});

export default async function CasePage({
  params: { caseId },
}: {
  params: { caseId: string };
}) {
  console.log(caseId);
  const [caseData, users, settings] = await Promise.all([
    findCaseById(caseId),
    loadUsers(),
    loadSettings(),
  ]);

  const onCreateNote = async (data: Prisma.NoteCreateArgs) => {
    "use server";
    return createNote(data);
  };

  const onUpdateCase = async (data: Prisma.CaseUpdateArgs) => {
    "use server";
    return updateCase(data);
  };

  return (
    <div className="flex justify-center w-full layout-offset -mb-10">
      <div className="grid grid-cols-5 w-full">
        <div className="col-span-2 p-6 h-content overflow-y-auto">
          <CaseManagement
            data={caseData}
            updateCase={onUpdateCase}
            users={users}
            settings={settings}
          />
        </div>
        <div className="col-span-3 grid grid-rows-[auto,1fr] bg-gray-100 w-full h-content overflow-y-auto">
          <div className="sticky px-20 py-6 bg-gray-100 top-0 z-10">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Activity</span>
              <AddNote caseId={caseId} createNote={onCreateNote} />
            </div>
          </div>
          <div className="px-20 pb-6 flex items-end">
            <CaseTimeline caseId={caseId as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
