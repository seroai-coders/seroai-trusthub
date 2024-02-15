"use client";
import { EditMode } from "../../EditMode";
import { Dropdown } from "@/components/ui/ReactSelect";
import { useState } from "react";

export const Status = ({
  value,
  onChange,
  caseStatuses,
}: {
  value?: string | null;
  onChange: (value?: string | null) => void;
  caseStatuses: string[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const caseStatusOptions = caseStatuses.map((id) => ({ id, title: id })) ?? [];

  return (
    <EditMode
      label="Status"
      isEditing={isEditing}
      content={
        <span>{caseStatuses.find((item) => item === value) || "-"}</span>
      }
      onEdit={() => setIsEditing(true)}
    >
      <Dropdown
        name="status"
        placeholder="Status"
        value={caseStatusOptions.find((item) => item.id === value)}
        onChange={({ id }) => {
          onChange(id);
          setIsEditing(false);
        }}
        onBlur={() => setIsEditing(false)}
        options={caseStatusOptions ?? []}
        autoFocus
      />
    </EditMode>
  );
};
