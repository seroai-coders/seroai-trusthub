"use client";
import Toast from "@/components/ui/Toast";
import Loader from "@/components/ui/Loader";
import { useLoader } from "@/lib/hooks/useLoader";
import { useNotification } from "@/lib/hooks/useNotification";

export default function Global() {
  const { message, type, timeout, clearNotification } = useNotification();
  const { isLoading } = useLoader();

  return (
    <>
      <Toast
        isActive={!!message}
        message={message}
        type={type}
        onClose={clearNotification}
        timeout={timeout}
        onTimeout={clearNotification}
      />
      {isLoading && (
        <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <Loader />
        </div>
      )}
    </>
  );
}
