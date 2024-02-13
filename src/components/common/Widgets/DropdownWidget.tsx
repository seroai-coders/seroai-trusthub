"use client";
import { Dropdown } from "@/components/ui/ReactSelect";
import { WidgetProps } from "@rjsf/utils";

export const DropdownWidget = ({
  value,
  label,
  onChange,
  id,
  placeholder,
  options,
  required,
}: WidgetProps) => {
  return (
    <Dropdown
      name={id}
      label={label}
      value={options.enumOptions?.find((i) => i.value === value)}
      onChange={(newValue) => onChange(newValue?.value)}
      placeholder={placeholder}
      options={options.enumOptions ?? []}
      menuPortalTarget={global.document?.body}
      valueKey="value"
      textKeys={["label"]}
      isRequired={required}
    />
  );
};
