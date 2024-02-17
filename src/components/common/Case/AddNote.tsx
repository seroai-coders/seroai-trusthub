"use client";
import { Button } from "@/components/ui/Button";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import React from "react";
import { useNotification } from "@/lib/hooks/useNotification";
import { useLoader } from "@/lib/hooks/useLoader";
import { Note } from "./Note";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Note as NoteType, Prisma } from "@prisma/client";

const AddNote = ({
  caseId,
  createNote,
}: {
  caseId: string;
  createNote: (data: Prisma.NoteCreateArgs) => Promise<NoteType>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const { notifyError } = useNotification();
  const { showLoader } = useLoader();

  return (
    <>
      <Button
        variant="secondary"
        color="neutral"
        onClick={() => setIsModalOpen(true)}
      >
        <MdOutlineNoteAdd />
        <span>Add Note</span>
      </Button>
      <Modal
        isOpen={isModalOpen}
        title="Add Note"
        showCloseButton
        onClose={() => setIsModalOpen(false)}
      >
        <Note
          value={{ description: "" }}
          onChange={(formData) => {
            showLoader(true);
            setIsModalOpen(false);
            createNote({
              data: {
                description: formData.description,
                caseId,
                createdById: (user?.id as string) ?? "",
              },
            })
              .catch((e: Error) => {
                console.error(e);
                notifyError(`Note creation failed`);
              })
              .finally(() => {
                showLoader(false);
              });
          }}
        />
      </Modal>
    </>
  );
};

export default AddNote;
