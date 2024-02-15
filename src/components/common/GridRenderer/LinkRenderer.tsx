import Link from "next/link";

const LinkRenderer = ({ value, href }: { value: string; href: string }) => {
  return (
    <Link href={href} className="font-semibold hover:opacity-75">
      {value}
    </Link>
  );
};

export default LinkRenderer;
