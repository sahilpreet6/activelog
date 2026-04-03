import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workouts", label: "Workouts" },
  { href: "/workouts/new", label: "Add Workout" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/goals", label: "Goals" },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-200 bg-white p-5 md:block">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
