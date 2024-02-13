"use client";
import { Input } from "@/components/ui/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FC } from "react";

export interface FiltersProps {}

const Filters: FC<FiltersProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [identifierQuery, setIdentifierQuery] = useState(
    searchParams.get("identifier") ?? ""
  );

  return (
    <div className="flex items-end space-x-2 mb-8">
      <Input
        name="identifier"
        label="Identifier"
        placeholder="Identifier"
        required
        onChange={(value) => {
          setIdentifierQuery(value);
        }}
        onBlur={() => {
          const params = new URLSearchParams(searchParams);

          if (identifierQuery) params.set("identifier", identifierQuery);
          else params.delete("identifier");

          router.replace(`${pathname}?${params.toString()}`);
        }}
        value={identifierQuery ?? ""}
      />
    </div>
  );
};

export default Filters;
