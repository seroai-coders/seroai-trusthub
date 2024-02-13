import { caseSeverity } from "@/lib/constants/case";
import { Case, CaseSeverity } from "@prisma/client";
import {
  FcCancel,
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

export const getSeverityIcon = (severity: CaseSeverity | string) => {
  switch (severity) {
    case CaseSeverity.URGENT:
      return <FcCancel size={20} />;
    case CaseSeverity.HIGH:
      return <FcHighPriority size={20} />;
    case CaseSeverity.LOW:
      return <FcLowPriority size={20} />;
    default:
      return <FcMediumPriority size={20} />;
  }
};

const SeverityRenderer = ({ data }: { data: Pick<Case, "severity"> }) => {
  return (
    <div className="flex items-center space-x-2">
      {getSeverityIcon(data.severity)}
      <span>{caseSeverity[data.severity]}</span>
    </div>
  );
};

export default SeverityRenderer;
