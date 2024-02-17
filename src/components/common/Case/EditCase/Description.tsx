"use client";
import { useState } from "react";
import { EditMode } from "../../EditMode";
import { Textarea } from "@/components/ui/Textarea";

export const Description = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [query, setQuery] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditMode
      label="Description"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onClose={() => {
        setQuery(value);
        setIsEditing(false);
      }}
      onSave={() => {
        onChange(query);
        setIsEditing(false);
      }}
      content={<span className="text-sm">{value || "-"}</span>}
      showActionButtons
    >
      <Textarea
        name="description"
        placeholder="Description"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        allowResize
        style={{ height: "5rem" }}
        autoFocus
      />
    </EditMode>
  );
};
