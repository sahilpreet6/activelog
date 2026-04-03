"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

const PUBLIC_ROUTES = new Set(["/", "/login", "/signup"]);

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideChrome = PUBLIC_ROUTES.has(pathname);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-1">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
