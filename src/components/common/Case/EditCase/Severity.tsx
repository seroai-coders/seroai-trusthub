"use client";
import { EditMode } from "../../EditMode";
import { Dropdown } from "@/components/ui/ReactSelect";
import { caseSeverity } from "@/lib/constants/case";
import { useState } from "react";
import { SingleValue, Option } from "@/components/common/Case/CustomSeverity";
import SeverityRenderer from "../../GridRenderer/SeverityRenderer";
import { CaseSeverity } from "@prisma/client";

export const Severity = ({
  value,
  onChange,
}: {
  value?: CaseSeverity;
  onChange: (value?: CaseSeverity) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const caseSeverityOptions = Object.entries(caseSeverity).map(
    ([id, title]) => ({ id, title })
  );

  return (
    <EditMode
      label="Severity"
      isEditing={isEditing}
      content={
        <SeverityRenderer data={{ severity: value ?? CaseSeverity.MEDIUM }} />
      }
      onEdit={() => setIsEditing(true)}
    >
      <Dropdown
        name="severity"
        placeholder="Severity"
        value={caseSeverityOptions.find((item) => item.id === value)}
        onChange={(severity) => {
          onChange(severity?.id as CaseSeverity);
          setIsEditing(false);
        }}
        onBlur={() => setIsEditing(false)}
        options={caseSeverityOptions ?? []}
        customComponents={{ SingleValue, Option }}
        autoFocus
      />
    </EditMode>
  );
};
