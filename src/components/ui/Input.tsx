export const Input = ({
  id = "",
  value = "",
  label = "",
  name = "",
  className = "",
  required = false,
  placeholder = "Type here",
  onChange = () => undefined,
  onBlur = () => undefined,
  isDisabled = false,
}: {
  id?: string;
  value?: string;
  label?: string;
  name?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <div className="form-control w-full">
      <label className="label label-text justify-start" htmlFor={name}>
        {label}
        {required ? <span className="text-error text-sm ml-1">*</span> : null}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        disabled={isDisabled}
      />
    </div>
  );
};
