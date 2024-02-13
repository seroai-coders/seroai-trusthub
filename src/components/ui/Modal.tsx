"use client";
import React from "react";
import { Button } from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  modalBoxClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "",
  showCloseButton = false,
  children = null,
  onClose = () => undefined,
  modalBoxClassName = "",
}) => {
  return (
    <dialog className="modal bg-black bg-opacity-40 !m-0" open={isOpen}>
      <div className={clsx("modal-box", modalBoxClassName)}>
        {showCloseButton && (
          <Button
            variant="secondary"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <AiOutlineClose />
          </Button>
        )}
        <h3 className="font-bold text-lg">{title}</h3>
        <div>{isOpen ? children : null}</div>
      </div>
    </dialog>
  );
};

export default Modal;
