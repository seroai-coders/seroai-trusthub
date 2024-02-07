"use client";
import { Card, Table as TremorTable } from "@tremor/react";
import React, { ComponentProps } from "react";

const Table = (props: ComponentProps<typeof TremorTable>) => (
  <Card className="p-0 bg-base-100 text-base-content">
    <TremorTable {...props} />
  </Card>
);

export default Table;
