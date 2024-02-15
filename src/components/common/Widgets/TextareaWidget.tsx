"use client";
import { Textarea } from "@/components/ui/Textarea";
import { WidgetProps } from "@rjsf/utils";

export const TextareaWidget = ({
  value,
  label,
  onChange,
  id,
  placeholder,
}: WidgetProps) => (
  <Textarea
    name={id}
    label={label}
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    placeholder={placeholder}
  />
);
