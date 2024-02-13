"use client";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { ComponentProps } from "react";

export default function Error(props: ComponentProps<typeof ErrorBoundary>) {
  return <ErrorBoundary {...props} />;
}
