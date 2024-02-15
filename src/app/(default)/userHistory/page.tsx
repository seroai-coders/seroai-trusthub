import Filters from "@/components/common/UserHistory/Filters";
import Loader from "@/components/ui/Loader";
import dynamic from "next/dynamic";

const Cases = dynamic(() => import("@/components/common/UserHistory/Cases"), {
  loading: () => <Loader />,
});

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
