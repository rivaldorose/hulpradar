"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Radar,
  LayoutDashboard,
  Inbox,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Aanvragen",
    href: "/dashboard/aanvragen",
    icon: Inbox,
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    label: "Instellingen",
    href: "/dashboard/instellingen",
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  organisationName?: string;
}

export function DashboardSidebar({ organisationName }: DashboardSidebarProps) {
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
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Radar className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">HulpRadar</span>
        </Link>
        {organisationName && (
          <p className="text-sm text-muted-foreground mt-2 truncate">
            {organisationName}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Uitloggen
        </Button>
      </div>
    </aside>
  );
}
