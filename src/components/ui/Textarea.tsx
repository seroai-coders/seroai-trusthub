import clsx from "clsx";
import { ChangeEventHandler } from "react";

export const Textarea = ({
  name,
  label = "",
  required = false,
  allowResize = false,
  elementClassName = "",
  ...rest
}: {
  name: string;
  label?: string;
  required?: boolean | string;
  readOnly?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  allowResize?: boolean;
  elementClassName?: string;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label label-text justify-start" htmlFor={name}>
          {label}
          {required ? <span className="text-error text-sm ml-1">*</span> : null}
        </label>
      )}
      <textarea
        className={clsx(
          "textarea input-bordered w-full h-44",
          { "resize-none": !allowResize },
          elementClassName
        )}
        id={name}
        cols={30}
        rows={10}
        {...rest}
      />
    </div>
  );
};
