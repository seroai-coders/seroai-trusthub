"use client";
import Select, { OptionProps, SingleValueProps } from "react-select";
import { getClassNames, getTheme, styles } from "./stylesConfig";

interface ReactSelectProps<T> {
  isDisabled?: boolean;
  valueKey?: string;
  textKeys?: string[];
  options: T[];
  value?: T;
  label?: string;
  name: string;
  onChange: (newValue: T) => void;
  onBlur?: () => void;
  isRequired?: boolean;
  customComponents?: {
    SingleValue?: (props: SingleValueProps<T>) => JSX.Element;
    Option?: (props: OptionProps<T>) => JSX.Element;
  };
  menuPortalTarget?: HTMLElement | null;
  isLoading?: boolean;
  placeholder?: string;
  varient?: "filter" | "default";
  isClearable?: boolean;
  autoFocus?: boolean;
  defaultMenuIsOpen?: boolean;
}

const Dropdown = <T,>({
  isDisabled = false,
  valueKey = "id",
  textKeys = ["title"],
  options = [],
  value,
  label = "",
  name,
  onChange,
  onBlur,
  isRequired = false,
  customComponents = {},
  menuPortalTarget = null,
  isLoading = false,
  placeholder = "Select...",
  varient = "default",
  isClearable = false,
  autoFocus = false,
  defaultMenuIsOpen = false,
}: ReactSelectProps<T>) => {
  return (
    <div className="form-control text-base-content">
      {label ? (
        <label className="label label-text truncate justify-start" id={name}>
          {label}
          {isRequired ? (
            <span className="text-error text-sm ml-1">*</span>
          ) : null}
        </label>
      ) : null}
      <Select
        isClearable={isClearable}
        isDisabled={isDisabled}
        name={name}
        options={options}
        getOptionLabel={(option) =>
          textKeys.map((k) => option?.[k as keyof object] ?? "").join(" ")
        }
        getOptionValue={(option) => option?.[valueKey as keyof object] ?? ""}
        value={value}
        onChange={(newValue) => onChange(newValue as T)}
        classNames={getClassNames(varient)}
        styles={styles}
        aria-labelledby={name}
        components={customComponents}
        menuPortalTarget={menuPortalTarget}
        menuPlacement="auto"
        isLoading={isLoading}
        placeholder={placeholder}
        theme={getTheme}
        onBlur={onBlur}
        autoFocus={autoFocus}
        defaultMenuIsOpen={defaultMenuIsOpen}
      />
    </div>
  );
};

export default Dropdown;
