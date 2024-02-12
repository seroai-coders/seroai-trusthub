"use client";
import React, { startTransition, useEffect } from "react";
import { Button } from "../ui/Button";
import Card from "../ui/Card";
import { useRouter } from "next/navigation";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="w-96 m-auto">
      <Card>
        <div className="flex flex-col justify-center items-center space-y-4">
          <h2>Something went wrong!</h2>
          <Button color="accent" variant="secondary" onClick={reload}>
            Try again
          </Button>
        </div>
      </Card>
    </div>
  );
}
