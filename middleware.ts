import { NextResponse } from "next/server";

export function middleware() {
  // Protected route logic is planned for Sprint 2 auth flow.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/workouts/:path*", "/nutrition/:path*", "/goals/:path*"],
};
