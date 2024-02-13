import { CaseSeverity } from "@prisma/client";
import { OptionProps, SingleValueProps, components } from "react-select";
import SeverityRenderer from "../GridRenderer/SeverityRenderer";

export interface IdAndTitle {
  id: string;
  title: string;
}

export const SingleValue = (props: SingleValueProps<IdAndTitle>) => (
  <components.SingleValue {...props}>
    <SeverityRenderer data={{ severity: props.data.id as CaseSeverity }} />
  </components.SingleValue>
);

export const Option = (props: OptionProps<IdAndTitle>) => (
  <components.Option {...props}>
    <SeverityRenderer data={{ severity: props.data.id as CaseSeverity }} />
  </components.Option>
);
