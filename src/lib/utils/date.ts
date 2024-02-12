export const formatDateTime = (
  input: string | number | Date,
  dateStyle: "long" | "short" | "full" | "medium" = "medium",
  timeStyle: "long" | "short" | "full" | "medium" = "medium"
): string =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle,
    timeStyle,
    hour12: true,
  }).format(new Date(input));
