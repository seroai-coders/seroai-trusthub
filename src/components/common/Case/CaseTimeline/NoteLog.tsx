"use client";
import { Button } from "@/components/ui/Button";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { formatDateTime } from "@/lib/utils/date";
import { Note as NoteType } from "@prisma/client";
import { useState } from "react";
import { MdClose, MdModeEdit } from "react-icons/md";
import { Note } from "../Note";
import { updateNote } from "@/lib/api/case";

export type NoteLogType = NoteType & {
  createdBy?: { name: string | null };
};

export const NoteLog = ({
  data: { id, caseId, createdBy, description, createdAt, updatedAt },
}: {
  data: NoteLogType;
}) => {
  const [isEditNote, setIsEditNote] = useState(false);
  const { notifyError } = useNotification();
  const { showLoader } = useLoader();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="mb-2">
          <span className="label-text">{`At ${formatDateTime(
            createdAt,
            "medium",
            "short"
          )} - `}</span>
          <span className="font-semibold">{createdBy?.name}</span>
          <span className="label-text ml-1">
            {new Date(createdAt).valueOf() !== new Date(updatedAt).valueOf() &&
              "(edited)"}
          </span>
        </div>
        <Button
          variant="ghost"
          color="neutral"
          onClick={() => {
            setIsEditNote(!isEditNote);
          }}
        >
          {isEditNote ? <MdClose /> : <MdModeEdit />}
        </Button>
      </div>
      {isEditNote ? (
        <div className="mb-2">
          <Note
            value={{ description }}
            onChange={(formData) => {
              showLoader(true);
              updateNote({
                data: {
                  description: formData.description,
                  caseId,
                },
                where: { id },
              })
                .catch((e) => {
                  console.error(e);
                  notifyError(`Note updation failed`);
                })
                .finally(() => {
                  setIsEditNote(false);
                  showLoader(false);
                });
            }}
          />
        </div>
      ) : (
        <div className="ml-8 break-all">{description}</div>
      )}
    </div>
  );
};
