import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import LostSvg from "../public/assets/lost.svg";

export default function NotFound() {
  return (
    <div className="flex space-x-12">
      <Image src={LostSvg} alt="You seem to be lost." className="max-w-96" />
      <div className="flex flex-col justify-center items-center space-y-4">
        <h2 className="text-xl">
          <span className="font-semibold">404</span>
          <span> | Page Not Found</span>
        </h2>
        <Link href="/">
          <Button color="accent" variant="secondary">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
