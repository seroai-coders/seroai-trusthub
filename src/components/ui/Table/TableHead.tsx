"use client";
import { TableHead as TremorTableHead } from "@tremor/react";
import clsx from "clsx";
import React, { ComponentProps } from "react";

export const TableHead = ({
  className,
  ...props
}: ComponentProps<typeof TremorTableHead>) => (
  <TremorTableHead
    className={clsx("border-b border-base-300", className)}
    {...props}
  />
);

export default TableHead;
