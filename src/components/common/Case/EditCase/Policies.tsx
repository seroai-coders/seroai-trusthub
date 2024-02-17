"use client";
import { EditMode } from "../../EditMode";
import { ReactSelect } from "@/components/ui/ReactSelect";
import { useEffect, useState } from "react";

export const Policies = ({
  value,
  onChange,
  policies,
}: {
  value?: string[];
  onChange: (value?: string[]) => void;
  policies: string[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>(
    value ?? []
  );
  const policiesOptions = policies.map((id) => ({ id, title: id })) ?? [];

  useEffect(() => {
    setSelectedPolicies(value ?? []);
  }, [value]);

  return (
    <EditMode
      label="Decision"
      isEditing={isEditing}
      content={
        <div className="space-y-1">
          {selectedPolicies?.length
            ? selectedPolicies.map((policy, index) => (
                <span key={index} className="badge badge-lg mr-1">
                  {policy}
                </span>
              ))
            : "-"}
        </div>
      }
      onEdit={() => setIsEditing(true)}
    >
      <ReactSelect
        name="policies"
        placeholder="Policies"
        value={policiesOptions?.filter((p) =>
          selectedPolicies?.includes(p.id ?? "")
        )}
        onChange={(policies) => {
          setSelectedPolicies(policies.map((item) => item.id));
        }}
        onBlur={() => {
          onChange(selectedPolicies);
          setIsEditing(false);
        }}
        options={policiesOptions ?? []}
        autoFocus
        defaultMenuIsOpen
        closeMenuOnSelect={false}
      />
    </EditMode>
  );
};
