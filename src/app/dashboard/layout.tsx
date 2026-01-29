import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's organisation
  const { data: orgUser } = await supabase
    .from("organisation_users")
    .select("organisation_id, role, organisations(name)")
    .eq("user_id", user.id)
    .single();

  const organisationName = orgUser?.organisations
    ? (orgUser.organisations as unknown as { name: string })?.name
    : undefined;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar organisationName={organisationName} />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
