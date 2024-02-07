import React, { PropsWithChildren } from "react";
import { Button } from "../../ui/Button";
import Link from "next/link";

const NavButton = ({ link, children }: PropsWithChildren<{ link: string }>) => (
  <Link href={link}>
    <Button
      color="neutral"
      variant="ghost"
      className="w-full justify-start rounded-none h-12"
    >
      {children}
    </Button>
  </Link>
);

export default NavButton;
