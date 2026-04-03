import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <nav className="flex w-full items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          ActiveLog
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">Dashboard</Link>
          <Link href="/workouts" className="text-slate-700 hover:text-slate-900">Workouts</Link>
          <Link href="/nutrition" className="text-slate-700 hover:text-slate-900">Nutrition</Link>
          <Link href="/goals" className="text-slate-700 hover:text-slate-900">Goals</Link>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
