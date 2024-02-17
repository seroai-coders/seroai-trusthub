import { formatDateTime } from "@/lib/utils/date";
import { CaseLog, CaseLogType } from "@prisma/client";

const getAction = (type: string) => {
  switch (type) {
    case CaseLogType.ADD:
      return "added";
    case CaseLogType.DELETE:
      return "deleted";
    default:
      return "updated";
  }
};

export type ActivityLogType = CaseLog & {
  createdBy?: { name: string | null };
};

export const ActivityLog = ({
  data: { createdBy, type, fieldName, fromValue, toValue, createdAt },
}: {
  data: ActivityLogType;
}) => (
  <div>
    <div className="flex justify-between items-center">
      <div className="mb-2">
        <span className="label-text">{`At ${formatDateTime(
          createdAt,
          "medium",
          "short"
        )} - `}</span>
        <span className="font-semibold mr-1">{createdBy?.name}</span>
        <span>{getAction(type)} the </span>
        <span className="font-semibold">{fieldName}</span>
      </div>
    </div>
    <div className="ml-8 break-all">{toValue || fromValue}</div>
  </div>
);
