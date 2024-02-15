import React from "react";
import { Button } from "./Button";
import { cx } from "class-variance-authority";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  actionButtons?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  actionButtons,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 overflow-hidden transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "translate-x-full",
        "sm:translate-x-0 z-50"
      )}
    >
      <div
        className="absolute inset-0 bg-base-100 opacity-50"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full sm:w-full md:w-2/3 lg:w-1/2 shadow-xl min-h-full p-8 bg-base-200 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl mt-4">{title}</h2>
          <div className="flex items-center justify-center gap-1">
            {actionButtons ? actionButtons : null}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
