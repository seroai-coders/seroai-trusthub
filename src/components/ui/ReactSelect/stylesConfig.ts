import clsx from "clsx";
import { CSSObjectWithLabel, ThemeConfig } from "react-select";

export const classNames = {
  control: () => "p-1 !min-h-[3rem]",
  placeholder: () => "!text-base-content",
  menu: () => "!z-10",
};

export const getClassNames = (varient: string) => ({
  control: () =>
    clsx(
      "p-1",
      "!rounded-lg",
      { "!min-h-[3rem]": varient === "default" },
      { "!rounded-3xl !text-sm": varient === "filter" }
    ),
  placeholder: () => "!text-base-content",
  menu: () => "!z-10",
  ...(varient === "filter"
    ? {
        dropdownIndicator: (state: { hasValue: boolean }) =>
          state?.hasValue ? "!hidden" : "",
        indicatorSeparator: () => "!hidden",
        clearIndicator: () => "!rounded-full hover:bg-base-200 cursor-pointer",
      }
    : {}),
});

export const styles = {
  control: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
    ...base,
    borderColor: "hsl(146 0% 19% / 0.2)",
    ...(state.isFocused
      ? {
          boxShadow: "0 !important",
          outlineStyle: "solid !important",
          outlineWidth: "2px !important",
          outlineOffset: "2px !important",
          outlineColor: "hsl(var(--bc) / 0.2) !important",
        }
      : {}),
    "&:hover": {
      borderColor: "hsl(146 0% 19% / 0.2) !important",
    },
  }),
};

export const getTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "oklch(var(--p)/0.1)",
    neutral0: "oklch(var(--b1))",
    neutral80: "oklch(var(--bc))",
  },
});
