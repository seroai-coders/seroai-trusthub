import { timeoutInMS } from "@/lib/constants/notifications";
import { create } from "zustand";

export enum NotificationType {
  Error = "error",
  Success = "success",
  Info = "info",
}

interface NotificationState {
  type: NotificationType;
  message: React.ReactNode;
  timeout: number;
  notifySuccess: (message: React.ReactNode, timeout?: number) => void;
  notifyError: (message: React.ReactNode, timeout?: number) => void;
  notifyInfo: (message: React.ReactNode, timeout?: number) => void;
  clearNotification: () => void;
}

export const useNotification = create<NotificationState>((set) => ({
  type: NotificationType.Error,
  message: null,
  timeout: timeoutInMS.THREE_SECONDS,
  notifySuccess: (message, timeout = timeoutInMS.THREE_SECONDS) =>
    set(() => ({ type: NotificationType.Success, message, timeout })),
  notifyError: (message, timeout = timeoutInMS.THREE_SECONDS) =>
    set(() => ({ type: NotificationType.Error, message, timeout })),
  notifyInfo: (message, timeout = timeoutInMS.THREE_SECONDS) =>
    set(() => ({ type: NotificationType.Info, message, timeout })),
  clearNotification: () => set(() => ({ message: "" })),
}));
