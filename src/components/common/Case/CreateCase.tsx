"use client";
import { useState } from "react";
import HeaderAndCreate from "../HeaderAndCreate";
import CreateCaseModal from "./CreateCaseModal";
import { Case } from "@prisma/client";

export const CreateCase = ({
  createCase,
}: {
  createCase: (data: { title: string; createdById: string }) => Promise<Case>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeaderAndCreate
        title="Case Management"
        onCreateClick={() => setIsModalOpen(true)}
        showCreateButton
      />
      <CreateCaseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        createCase={createCase}
      />
    </>
  );
};
