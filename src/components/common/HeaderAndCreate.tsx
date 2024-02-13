"use client";
import { Button } from "../ui/Button";
import { FaPlus } from "react-icons/fa";

export default function HeaderAndCreate({
  title,
  onCreateClick = () => undefined,
  showCreateButton = false,
}: {
  title: string;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
}) {
  return (
    <div className="flex items-center space-x-4">
      <p className="text-md font-bold">{title}</p>
      {showCreateButton && (
        <div className="prose relative">
          <Button
            variant="secondary"
            onClick={() => {
              onCreateClick();
            }}
          >
            <FaPlus />
            <span>Create</span>
          </Button>
        </div>
      )}
    </div>
  );
}
