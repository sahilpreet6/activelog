import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <header className="border-b bg-white px-4 py-3">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          ActiveLog
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/workouts">Workouts</Link>
          <Link href="/nutrition">Nutrition</Link>
          <Link href="/goals">Goals</Link>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
