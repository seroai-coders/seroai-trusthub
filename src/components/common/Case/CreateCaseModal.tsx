"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Case } from "@prisma/client";
import { useState } from "react";

const CreateCaseModal = ({
  isModalOpen,
  setIsModalOpen,
  initialFormData = { title: "" },
  createCase,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  initialFormData?: { title: string };
  createCase: (data: { title: string; createdById: string }) => Promise<Case>;
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { showLoader } = useLoader();
  const { notifySuccess, notifyError } = useNotification();
  const { user } = useUser();

  const onSave = async () => {
    showLoader(true);

    try {
      await createCase({
        ...formData,
        createdById: (user?.id as string) ?? "",
      });
      notifySuccess(`Case creation successful`);
    } catch {
      notifyError(`Case creation failed`);
    } finally {
      setIsModalOpen(false);
      setFormData({ title: "" });
      showLoader(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      title="Create Case"
      showCloseButton
      onClose={() => setIsModalOpen(false)}
    >
      <div className="flex flex-col space-y-4">
        <Input
          name="title"
          label="Title"
          required
          onChange={(title) => {
            setFormData({ ...formData, title });
          }}
          value={formData.title}
        />
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={!formData.title}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCaseModal;
