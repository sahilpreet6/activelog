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
    <aside className="hidden min-h-[calc(100vh-57px)] w-64 border-r bg-slate-50 p-4 md:block">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
