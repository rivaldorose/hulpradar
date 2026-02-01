import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get user's organisation
  const { data: orgUserData } = await supabase
    .from("organisation_users")
    .select("organisation_id, organisations(*)")
    .eq("user_id", user.id)
    .single();

  const organisation = orgUserData?.organisations as {
    id: string;
    name: string;
    current_capacity: number;
    max_capacity: number;
  } | null;

  if (!organisation) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Geen organisatie gevonden</h2>
          <p className="text-[#618964] mb-4">Je account is nog niet gekoppeld aan een organisatie.</p>
          <Link href="/voor-organisaties" className="bg-primary px-8 py-4 rounded-full font-bold text-sm">
            Organisatie aanmelden
          </Link>
        </div>
      </div>
    );
  }

  // Get stats
  const { count: pendingCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", organisation.id)
    .eq("status", "pending");

  const { count: acceptedCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", organisation.id)
    .eq("status", "accepted");

  const { count: completedCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", organisation.id)
    .eq("status", "completed");

  // Get recent pending requests
  const { data: recentRequests } = await supabase
    .from("matches")
    .select(`
      id,
      status,
      created_at,
      expires_at,
      help_requests (
        id,
        name,
        gemeente,
        created_at
      )
    `)
    .eq("organisation_id", organisation.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <>
      {/* Header */}
      <div className="mb-14 px-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Organisatie Dashboard</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Welkom terug, <span className="text-primary/90">{organisation.name}</span>
            </h2>
            <p className="text-[#618964] text-lg mt-4 max-w-2xl font-medium">
              {pendingCount && pendingCount > 0
                ? `Er ${pendingCount === 1 ? "is" : "zijn"} vandaag ${pendingCount} nieuwe aanvra${pendingCount === 1 ? "ag" : "gen"} die uw aandacht nodig ${pendingCount === 1 ? "heeft" : "hebben"}.`
                : "Er zijn momenteel geen nieuwe aanvragen."}
            </p>
          </div>
          <div className="hidden lg:block">
            <Link
              href="/dashboard/hulpvragen"
              className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-3 shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined font-bold">inbox</span>
              Bekijk Hulpvragen
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-10 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div className="absolute -right-6 -top-6 size-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          <p className="text-[#618964] text-xs font-bold uppercase tracking-widest mb-3">Nieuwe aanvragen</p>
          <p className="text-primary text-6xl font-black tabular-nums">{pendingCount || 0}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 w-fit px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Wachtend op reactie</span>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <p className="text-[#618964] text-xs font-bold uppercase tracking-widest mb-3">In behandeling</p>
          <p className="text-6xl font-black tabular-nums tracking-tighter">{acceptedCount || 0}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#618964] bg-[#F0F4F0]/50 w-fit px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">hourglass_empty</span>
            <span>Actieve cliënten</span>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <p className="text-[#618964] text-xs font-bold uppercase tracking-widest mb-3">Succesvol afgerond</p>
          <p className="text-6xl font-black tabular-nums tracking-tighter">{completedCount || 0}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-50 w-fit px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Dit kwartaal</span>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-[24px] shadow-soft-green border border-white overflow-hidden">
        <div className="px-10 py-8 border-b border-[#F0F4F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">Nieuwe Hulpvragen</h3>
          <Link
            href="/dashboard/hulpvragen"
            className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
          >
            Alle hulpvragen bekijken →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-[#F0F4F0]/30">
                <th className="px-10 py-5 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Datum</th>
                <th className="px-10 py-5 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Naam</th>
                <th className="px-10 py-5 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Woonplaats</th>
                <th className="px-10 py-5 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-5 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em] text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F0]">
              {recentRequests && recentRequests.length > 0 ? (
                recentRequests.map((match) => {
                  const request = match.help_requests as unknown as {
                    id: string;
                    name: string;
                    gemeente: string;
                    created_at: string;
                  };
                  const initials = (request?.name || "??")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={match.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-10 py-6 text-sm font-medium text-gray-500">
                        {new Date(match.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {initials}
                          </div>
                          <span className="text-sm font-bold">{request?.name || "Anoniem"}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-medium tracking-tight">{request?.gemeente || "Onbekend"}</td>
                      <td className="px-10 py-6">
                        <span className="px-5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest ring-1 ring-amber-100">
                          Wachtend
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <Link
                          href={`/dashboard/aanvragen/${request?.id}`}
                          className="bg-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all opacity-0 group-hover:opacity-100"
                        >
                          Bekijk
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-16 text-center text-[#618964]">
                    <span className="material-symbols-outlined text-4xl mb-4 block opacity-30">inbox</span>
                    <p className="font-medium">Geen nieuwe aanvragen op dit moment</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {recentRequests && recentRequests.length > 0 && (
          <div className="px-10 py-6 bg-[#F0F4F0]/20 flex items-center justify-between">
            <p className="text-[11px] text-[#618964] font-bold uppercase tracking-widest">
              Toon {recentRequests.length} van de {pendingCount || 0} aanvragen
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 flex flex-col md:flex-row justify-between items-center border-t border-primary/5 gap-6">
        <p className="text-xs font-medium text-[#618964]">© 2025 HulpRadar Beheerpaneel. Alle rechten voorbehouden.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#618964]">
          <Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="/algemene-voorwaarden">Voorwaarden</Link>
        </div>
      </footer>
    </>
  );
}
