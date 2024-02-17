import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import "./globals.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sero AI Trusthub",
  description: "Sero AI Trusthub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <UserProvider>
          <div className="min-h-screen overflow-x-hidden grid">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
