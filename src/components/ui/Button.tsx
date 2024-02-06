import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      secondary: "btn-outline",
      ghost: "btn-outline border-0",
      square: "btn-square",
      squareSecondary: "btn-square btn-outline",
      circle: "btn-circle",
      circleSecondary: "btn-circle btn-outline",
    },
    color: {
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      link: "btn-link",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
    size: {
      lg: "btn-lg",
      sm: "btn-sm",
      xs: "btn-xs",
    },
  },
  defaultVariants: { color: "primary" },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariantProps {
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  color,
  variant,
  size,
  className = "",
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={buttonVariants({ variant, size, color, className })}
    {...props}
  />
);
