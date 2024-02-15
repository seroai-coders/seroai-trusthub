"use client";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { TextareaWidget } from "../Widgets/TextareaWidget";
import { Button } from "@/components/ui/Button";

export const Note = ({
  value,
  onChange,
}: {
  value: { description: string };
  onChange: (note: { description: string }) => void;
}) => {
  return (
    <div className="flex flex-col">
      <Form
        schema={{
          type: "object",
          required: ["description"],
          properties: {
            description: { type: "string", title: "Note" },
          },
        }}
        validator={validator}
        uiSchema={{
          description: {
            "ui:widget": "TextareaWidget",
            "ui:placeholder": "Enter a note",
            "ui:title": "",
          },
          "ui:submitButtonOptions": { props: { className: "float-right" } },
        }}
        widgets={{ TextareaWidget }}
        onSubmit={({ formData }) => {
          onChange(formData);
        }}
        formData={value}
      >
        <div className="flex justify-end space-x-2 pt-2">
          <Button>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
