"use client";
import { CreatableSelect } from "@/components/ui/ReactSelect";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { FC, useState } from "react";
import { Settings } from "@prisma/client";
import CaseInputSchema from "./CaseInputSchema";
import { Divider } from "@tremor/react";

export interface CaseSettingsProps {
  data: Settings | null;
  saveData: (data: Partial<Settings>) => void;
}

const CaseSettings: FC<CaseSettingsProps> = ({ data, saveData }) => {
  const [caseStatuses, setCaseStatuses] = useState<string[]>(
    data?.caseStatuses ?? []
  );
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();

  return (
    <div className="px-20">
      <CreatableSelect
        value={caseStatuses ?? []}
        onChange={async (newValue) => {
          setCaseStatuses(newValue as string[]);

          showLoader(true);
          try {
            await saveData({
              ...(data ?? {}),
              caseStatuses: newValue as string[],
            });
            notifySuccess(`Status updation successful`);
          } catch {
            notifyError(`Status updation failed`);
          } finally {
            showLoader(false);
          }
        }}
        label="Status"
        name="status1"
        isClearable
        isValueValid={(inputValue, selectedValue) =>
          !selectedValue.includes(inputValue)
        }
      />
      <Divider />
      <CaseInputSchema data={data} saveData={saveData} />
    </div>
  );
};

export default CaseSettings;
