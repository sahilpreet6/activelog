"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const HIDE_ON = ["/", "/login", "/signup"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname)) return null;
  return <Navbar />;
}