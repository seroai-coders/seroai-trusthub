"use client";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { EditMode } from "../../EditMode";

export const Title = ({
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
      content={<h1 className="text-lg font-bold">{value}</h1>}
      showActionButtons
    >
      <Input
        name="title"
        onChange={setQuery}
        value={query}
        placeholder="Title"
        autoFocus
      />
    </EditMode>
  );
};
