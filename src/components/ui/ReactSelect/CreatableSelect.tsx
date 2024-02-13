"use client";
import React, { ComponentProps } from "react";
import { KeyboardEventHandler, useState } from "react";
import type { MultiValue } from "react-select";
import { classNames, getTheme, styles } from "./stylesConfig";
import dynamic from "next/dynamic";
const ReactCreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
  loading: () => <div className="min-h-[3rem]" />,
});

const components = {
  DropdownIndicator: null,
};

interface CreatableSelectProps {
  value: MultiValue<string>;
  onChange?: (value: MultiValue<string>) => void;
  label?: string;
  isRequired?: boolean;
  isValueValid?: (
    inputValue: string,
    selectedValue: MultiValue<string>
  ) => boolean;
}

const CreatableSelect = ({
  value,
  isDisabled = false,
  onChange = () => undefined,
  label = "",
  isRequired = false,
  name,
  isClearable = false,
  isValueValid = () => true,
  isLoading = false,
  ...props
}: CreatableSelectProps & ComponentProps<typeof ReactCreatableSelect>) => {
  const [inputValue, setInputValue] = useState("");
  console.log("props", props);
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (isValueValid(inputValue, value)) {
          setInputValue("");
          onChange([...value, inputValue]);
        }
        event.preventDefault();
    }
  };

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
      <ReactCreatableSelect
        isMulti
        isClearable={isClearable}
        name={name}
        menuIsOpen={false}
        placeholder="Type something and press enter..."
        components={components}
        onKeyDown={handleKeyDown}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        getOptionLabel={(option) => option as string}
        getOptionValue={(option): string => option as string}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        classNames={classNames}
        styles={styles}
        aria-labelledby={name}
        isLoading={isLoading}
        theme={getTheme}
        id={`${name}-select`}
      />
    </div>
  );
};

export default CreatableSelect;
