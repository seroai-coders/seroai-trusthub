import React, { PropsWithChildren } from "react";
import { clsx } from "clsx";

interface CardProps {
  title?: string;
  hoverable?: boolean;
  className?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  title = "",
  className = "",
  hoverable = true,
}) => {
  return (
    <div
      className={clsx(
        "card bg-base-100 shadow-lg border border-base-300",
        { "hover:drop-shadow-xl": hoverable },
        className
      )}
    >
      <div className={clsx("card-body", { "cursor-pointer": hoverable })}>
        {title ? <h2 className="card-title">{title}</h2> : null}
        {children ? <div>{children}</div> : null}
      </div>
    </div>
  );
};

export default Card;
