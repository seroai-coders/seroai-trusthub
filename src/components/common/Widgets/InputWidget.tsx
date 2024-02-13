"use client";
import { Input } from "@/components/ui/Input";
import { WidgetProps } from "@rjsf/utils";

export const InputWidget = ({
  value,
  label,
  onChange,
  id,
  placeholder,
  required,
}: WidgetProps) => (
  <Input
    id={id}
    name={id}
    label={label}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);
