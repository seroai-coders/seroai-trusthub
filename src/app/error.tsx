"use client";

import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-96 m-auto">
      <Card>
        <div className="flex flex-col justify-center items-center space-y-4">
          <h2>Something went wrong!</h2>
          <Button color="accent" variant="secondary" onClick={reset}>
            Try again
          </Button>
        </div>
      </Card>
    </div>
  );
}
