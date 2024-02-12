import Cases from "@/components/common/UserHistory/Cases";
import Filters from "@/components/common/UserHistory/Filters";

export default function UserHistory({
  searchParams: { identifier },
}: {
  searchParams: { identifier: string };
}) {
  return (
    <div className="px-20">
      <Filters />
      <Cases key={identifier} identifier={identifier} />
    </div>
  );
}
