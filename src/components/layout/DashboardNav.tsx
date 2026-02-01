"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Hulpvragen", href: "/dashboard/hulpvragen" },
  { label: "Dossiers", href: "/dashboard/dossiers" },
  { label: "Cliënten", href: "/dashboard/clienten" },
  { label: "Rapportage", href: "/dashboard/rapportage" },
];

interface DashboardNavProps {
  organisationName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

export function DashboardNav({ organisationName, userName, userRole }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Je bent uitgelogd");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass-nav rounded-full h-16 px-6 flex items-center justify-between shadow-glass pointer-events-auto">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="size-9 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl font-bold">account_balance</span>
          </div>
          <span className="text-lg font-bold tracking-tight">HulpRadar</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const isDashboardExact = item.href === "/dashboard" && pathname === "/dashboard";
            const active = isDashboardExact || (item.href !== "/dashboard" && isActive);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  active
                    ? "bg-primary/10 font-semibold"
                    : "hover:bg-primary/5 text-[#618964] font-medium"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/instellingen" className="size-10 rounded-full flex items-center justify-center text-[#618964] hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <div className="h-8 w-px bg-gray-200 mx-1" />
          <div className="flex items-center gap-3 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">{userName || "Gebruiker"}</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{userRole || "Beheerder"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm hover:bg-primary/20 transition-colors"
              title="Uitloggen"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
