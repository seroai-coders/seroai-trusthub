"use client";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { FC, useState } from "react";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { Settings, Prisma } from "@prisma/client";
import {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from "json-schema";
import { RJSFSchema } from "@rjsf/utils";
import { InputWidget } from "../Widgets/InputWidget";
import { DropdownWidget } from "../Widgets/DropdownWidget";
import { Button } from "@/components/ui/Button";

const mapInputSchemaToUI = (
  inputSchema: Prisma.InputJsonValue
): Prisma.InputJsonValue[] => {
  const { properties } = inputSchema as RJSFSchema;

  return Object.entries(properties ?? {}).map(([title, type]) => ({
    title,
    type: (type as JSONSchema7).type,
  }));
};

export interface CaseInputSchemaProps {
  data: Settings | null;
  saveData: (data: Partial<Settings>) => void;
}

const CaseInputSchema: FC<CaseInputSchemaProps> = ({ data, saveData }) => {
  const [schema, setSchema] = useState(
    mapInputSchemaToUI(data?.caseInputSchema ?? {})
  );
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();

  const mapUIToInputSchema = (
    data: Prisma.InputJsonValue[]
  ): Prisma.JsonValue => {
    const properties: { [title: string]: JSONSchema7Definition } = {};

    (data as Record<string, string>[]).forEach(({ title, type }) => {
      properties[title] = { type: type as JSONSchema7TypeName };
    });

    return { type: "object", properties } as Prisma.JsonValue;
  };

  const onSubmit = async ({
    formData,
  }: {
    formData: Prisma.InputJsonValue[];
  }) => {
    setSchema(formData);
    showLoader(true);
    try {
      await saveData({
        ...(data ?? {}),
        caseInputSchema: mapUIToInputSchema(formData),
      });
      notifySuccess(`Status updation successful`);
    } catch {
      notifyError(`Status updation failed`);
    } finally {
      showLoader(false);
    }
  };

  return (
    <>
      <Form
        schema={{
          type: "array",
          items: {
            required: ["title", "type"],
            type: "object",
            properties: {
              title: { type: "string", title: "Title" },
              type: {
                type: "string",
                title: "Type",
                enum: ["string"],
                default: "string",
              },
            },
          },
        }}
        validator={validator}
        uiSchema={{
          "ui:classNames": "Mui-Array-NoBorders",
          items: {
            "ui:classNames": "Mui-MultiColumn",
          },
          "ui:options": {
            orderable: false,
          },
          "ui:hideError": true,
        }}
        onSubmit={({ formData }) => onSubmit({ formData })}
        formData={schema}
        widgets={{ TextWidget: InputWidget, SelectWidget: DropdownWidget }}
        showErrorList={false}
        focusOnFirstError
      >
        <div className="flex justify-end space-x-2 pt-2">
          <Button>Save</Button>
        </div>
      </Form>
    </>
  );
};

export default CaseInputSchema;
