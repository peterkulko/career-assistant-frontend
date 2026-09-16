"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [text, setText] = useState("");

  return (
    <div className="flex min-h-full">
      <aside className="w-56 shrink-0 border-r border-black/10 dark:border-white/10">
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-black/10 dark:bg-white/10"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent placeholder:text-black/60 dark:placeholder:text-white/60"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
