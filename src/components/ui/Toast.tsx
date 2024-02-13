"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VariantProps, cva } from "class-variance-authority";
import { timeoutInMS } from "@/lib/constants/notifications";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiErrorCircle, BiInfoCircle } from "react-icons/bi";
import { Button } from "./Button";
import clsx from "clsx";

const Expire = ({
  timeout,
  onTimeout = () => undefined,
  children,
}: {
  timeout: number;
  onTimeout: () => void;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);

  return isVisible ? children : null;
};

const alertVariants = cva("alert shadow", {
  variants: {
    type: {
      error: "alert-error",
      success: "alert-success",
      info: "",
    },
  },
  defaultVariants: { type: "error" },
});

type AlertVariantProps = VariantProps<typeof alertVariants>;

interface ToastProps extends AlertVariantProps {
  message?: React.ReactNode;
  isActive?: boolean;
  onClose?: () => void;
  timeout?: number;
  onTimeout?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message = null,
  type,
  isActive = true,
  onClose = () => undefined,
  timeout = timeoutInMS.ONE_MINUTE,
  onTimeout = () => undefined,
}) => {
  return (
    isActive && (
      <Expire timeout={timeout} onTimeout={onTimeout}>
        <div className="toast">
          <div className={clsx(alertVariants({ type }))}>
            {type === "error" && <BiErrorCircle size={25} />}
            {type === "success" && <FaRegCircleCheck size={25} />}
            {type === "info" && (
              <BiInfoCircle size={25} className="stroke-info" />
            )}
            <div>{message}</div>
            <Button variant="ghost" color="neutral" onClick={onClose}>
              <AiOutlineClose size={15} />
            </Button>
          </div>
        </div>
      </Expire>
    )
  );
};

export default Toast;
