"use client";
import { CreatableSelect } from "@/components/ui/ReactSelect";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { FC } from "react";
import { Settings } from "@prisma/client";
import CaseInputSchema from "./CaseInputSchema";
import { Divider } from "@tremor/react";
import { MultiValue } from "react-select";

export interface CaseSettingsProps {
  data: Settings | null;
  saveData: (data: Partial<Settings>) => void;
}

const CaseSettings: FC<CaseSettingsProps> = ({ data, saveData }) => {
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();

  const isValueValid = (
    inputValue: string,
    selectedValue: MultiValue<string>
  ) => !selectedValue.includes(inputValue);

  return (
    <div className="px-20">
      <CreatableSelect
        value={data?.caseStatuses ?? []}
        onChange={async (newValue) => {
          showLoader(true);
          try {
            await saveData({
              ...(data ?? {}),
              caseStatuses: newValue as string[],
            });
            notifySuccess(`Status updation successful`);
          } catch (e) {
            notifyError(`Status updation failed`);
          } finally {
            showLoader(false);
          }
        }}
        label="Status"
        name="status"
        isClearable
        isValueValid={isValueValid}
      />
      <CreatableSelect
        value={data?.policies ?? []}
        onChange={async (newValue) => {
          showLoader(true);
          try {
            await saveData({
              ...(data ?? {}),
              policies: newValue as string[],
            });
            notifySuccess(`Policy updation successful`);
          } catch {
            notifyError(`Policy updation failed`);
          } finally {
            showLoader(false);
          }
        }}
        label="Policies"
        name="policies"
        isClearable
        isValueValid={isValueValid}
      />
      <Divider />
      <CaseInputSchema data={data} saveData={saveData} />
    </div>
  );
};

export default CaseSettings;
