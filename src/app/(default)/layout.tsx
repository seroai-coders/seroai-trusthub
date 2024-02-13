import Global from "@/components/common/Global";
import Header from "@/components/common/Header/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mb-10">
      <Header />
      {children}
      <Global />
    </div>
  );
}
