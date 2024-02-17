"use client";
import { Button } from "@/components/ui/Button";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { MdModeEdit } from "react-icons/md";

interface Props {
  label?: string;
  content?: React.ReactNode;
  onClose?: () => void;
  onSave?: () => void;
  isEditing?: boolean;
  onEdit?: () => void;
  showActionButtons?: boolean;
}

export const EditMode = ({
  isEditing = false,
  showActionButtons = false,
  children,
  label = "",
  content = null,
  onClose = () => undefined,
  onSave = () => undefined,
  onEdit = () => undefined,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx(
        "group/edit w-full grid",
        label ? "grid-cols-[1fr,2fr]" : "grid-cols-[1fr]"
      )}
    >
      <label className="font-semibold pt-1" title={label}>
        {label}
      </label>
      <div className="flex justify-between flex-col space-y-2">
        {isEditing ? (
          children
        ) : (
          <div className="flex items-center space-x-2 min-h-8">
            {content}
            <Button
              variant="iconGhost"
              color="neutral"
              onClick={onEdit}
              size="sm"
              className="hidden group-hover/edit:inline-flex"
            >
              <MdModeEdit />
            </Button>
          </div>
        )}
        {showActionButtons && isEditing && (
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" color="neutral" onClick={onClose} size="sm">
              Cancel
            </Button>
            <Button color="accent" onClick={onSave} size="sm">
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
