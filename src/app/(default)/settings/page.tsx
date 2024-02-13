import CaseSettings from "@/components/common/Settings/CaseSettings";
import {
  createSettings,
  loadSettings,
  updateSettings,
} from "@/lib/api/settings";
import { Prisma, Settings } from "@prisma/client";

export default async function Settings() {
  const data = await loadSettings();

  const saveSettings = async (data: Partial<Settings>) => {
    "use server";

    if (data.id) {
      updateSettings(data as Prisma.SettingsUpdateInput);
    } else {
      createSettings(data as Prisma.SettingsCreateInput);
    }
  };

  return <CaseSettings data={data} saveData={saveSettings} />;
}
