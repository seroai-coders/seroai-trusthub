"use client";
import { EditMode } from "../../EditMode";
import { Dropdown } from "@/components/ui/ReactSelect";
import { User } from "@prisma/client";
import { useState } from "react";

export const AssignedTo = ({
  value,
  onChange,
  users,
}: {
  value?: string | null;
  onChange: (value?: string | null) => void;
  users: User[];
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditMode
      label="Assigned To"
      isEditing={isEditing}
      content={
        <span>
          {users.find((item) => item.id === value)?.name || "No assignee"}
        </span>
      }
      onEdit={() => setIsEditing(true)}
    >
      <Dropdown
        name="assignedTo"
        placeholder="Assigned To"
        value={users.find((item) => item.id === value)}
        onChange={(assignedTo) => {
          onChange(assignedTo?.id ?? null);
          setIsEditing(false);
        }}
        onBlur={() => setIsEditing(false)}
        options={users ?? []}
        textKeys={["name"]}
        isClearable
        autoFocus
      />
    </EditMode>
  );
};
