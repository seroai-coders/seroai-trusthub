"use client";
import Select, { GroupBase, MultiValue, StylesConfig } from "react-select";
import { classNames, getTheme, styles } from "./stylesConfig";
import clsx from "clsx";

export type Options<T> = MultiValue<T>;

interface ReactSelectProps<T> {
  isClearable?: boolean;
  name: string;
  textKeys?: string[];
  valueKey?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  options: Options<T>;
  value: Options<T>;
  onChange: (newValue: Options<T>) => void;
  label?: string;
  isRequired?: boolean;
  onAdd?: () => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
}

const ReactSelect = <T,>({
  isClearable = false,
  isDisabled = false,
  isLoading = false,
  isSearchable = false,
  valueKey = "id",
  textKeys = ["title"],
  options = [],
  value,
  onChange,
  name,
  label = "",
  isRequired = false,
}: ReactSelectProps<T>) => {
  return (
    <div className={clsx("form-control w-full text-base-content")}>
      {label ? (
        <label
          className="label label-text justify-start"
          htmlFor={name}
          id={name}
        >
          {label}
          {isRequired && <span className="text-error text-sm ml-1">*</span>}
        </label>
      ) : null}
      <Select
        isDisabled={isDisabled}
        isMulti
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        options={options}
        getOptionLabel={(option) =>
          textKeys.map((k) => option?.[k as keyof object] ?? "").join(" ")
        }
        getOptionValue={(option) => option?.[valueKey as keyof object] ?? ""}
        value={value}
        onChange={(newValue) => onChange(newValue as Options<T>)}
        classNames={classNames}
        styles={styles as StylesConfig<T, true, GroupBase<T>>}
        components={{
          ...(isDisabled ? { DropdownIndicator: null } : {}),
        }}
        aria-labelledby={name}
        theme={getTheme}
      />
    </div>
  );
};

export default ReactSelect;
