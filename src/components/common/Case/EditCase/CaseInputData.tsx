import { Prisma, Settings } from "@prisma/client";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { Button } from "@/components/ui/Button";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, deepEquals } from "@rjsf/utils";
import { useMemo, useState } from "react";
import { InputWidget } from "../../Widgets/InputWidget";

const CaseInputData = ({
  data,
  settings,
  onSave,
}: {
  data: Prisma.JsonValue;
  settings: Settings | null;
  onSave: (
    updatedData: Prisma.CaseUpdateInput | Prisma.CaseUncheckedUpdateInput
  ) => void;
}) => {
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();
  const [formData, setFormData] = useState(data ?? {});

  const onSaveCaseInputData = async (data: Prisma.InputJsonValue) => {
    showLoader(true);

    try {
      await onSave({ caseInputData: data });
      notifySuccess(`Case updation successful`);
    } catch {
      notifyError(`Case updation failed`);
    } finally {
      showLoader(false);
    }
  };

  const isDirty = useMemo(() => !deepEquals(data, formData), [data, formData]);

  return (
    <Form
      schema={(settings?.caseInputSchema ?? {}) as RJSFSchema}
      validator={validator}
      widgets={{ TextWidget: InputWidget }}
      onChange={({ formData }) => {
        setFormData(formData);
      }}
      onSubmit={({ formData }) => {
        onSaveCaseInputData(formData as Prisma.InputJsonValue);
      }}
      formData={formData}
      className="Mui-Object-NoSpacing"
    >
      <div className="flex justify-end space-x-2 pt-2">
        {Object.keys(settings?.caseInputSchema ?? {}).length > 0 && (
          <>
            <Button
              variant="ghost"
              color="neutral"
              onClick={() => {
                setFormData(data ?? {});
              }}
              disabled={!isDirty}
            >
              Discard
            </Button>
            <Button disabled={!isDirty}>Save</Button>
          </>
        )}
      </div>
    </Form>
  );
};

export default CaseInputData;
