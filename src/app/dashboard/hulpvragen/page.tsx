import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const statusConfig: Record<string, { label: string; bg: string; text: string; ring: string }> = {
  pending: { label: "Wachtend", bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100" },
  accepted: { label: "In behandeling", bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-100" },
  completed: { label: "Afgerond", bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-100" },
  rejected: { label: "Afgewezen", bg: "bg-red-50", text: "text-red-700", ring: "ring-red-100" },
  expired: { label: "Verlopen", bg: "bg-gray-50", text: "text-gray-700", ring: "ring-gray-100" },
};

export default async function HulpvragenPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orgUserData } = await supabase
    .from("organisation_users")
    .select("organisation_id, organisations(name)")
    .eq("user_id", user.id)
    .single();

  const organisation = orgUserData?.organisations as { name: string } | null;
  const orgId = orgUserData?.organisation_id;

  if (!orgId) return null;

  // Get counts per status
  const { count: totalCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", orgId);

  const { count: pendingCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", orgId)
    .eq("status", "pending");

  const { count: acceptedCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", orgId)
    .eq("status", "accepted");

  const { count: completedCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", orgId)
    .eq("status", "completed");

  // Get all matches
  const { data: matches } = await supabase
    .from("matches")
    .select(`
      id,
      status,
      created_at,
      help_requests (
        id,
        name,
        email,
        gemeente,
        situation,
        created_at
      )
    `)
    .eq("organisation_id", orgId)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <>
      {/* Header */}
      <div className="mb-12 px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Overzicht</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Hulpvragen <span className="text-primary/90">Lijst</span>
            </h2>
            <p className="text-[#618964] text-lg mt-4 font-medium">
              Beheer en verwerk alle binnenkomende aanvragen voor schuldhulpverlening.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="px-6 py-2.5 rounded-full bg-primary text-black font-bold text-xs shadow-md shadow-primary/20">
            Alle ({totalCount || 0})
          </span>
          <span className="px-6 py-2.5 rounded-full bg-white text-[#618964] font-bold text-xs border border-transparent">
            Wachtend ({pendingCount || 0})
          </span>
          <span className="px-6 py-2.5 rounded-full bg-white text-[#618964] font-bold text-xs border border-transparent">
            In behandeling ({acceptedCount || 0})
          </span>
          <span className="px-6 py-2.5 rounded-full bg-white text-[#618964] font-bold text-xs border border-transparent">
            Afgerond ({completedCount || 0})
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[24px] shadow-soft-green border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-[#F0F4F0]/30">
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Datum</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Aanvrager</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Gemeente</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Type Hulp</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em] text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F0]">
              {matches && matches.length > 0 ? (
                matches.map((match) => {
                  const request = match.help_requests as unknown as {
                    id: string;
                    name: string;
                    email: string;
                    gemeente: string;
                    situation: string;
                    created_at: string;
                  };
                  const initials = (request?.name || "??")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();
                  const status = statusConfig[match.status] || statusConfig.pending;

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
                          <div>
                            <p className="text-sm font-bold">{request?.name || "Anoniem"}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{request?.email || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-medium tracking-tight">{request?.gemeente || "Onbekend"}</td>
                      <td className="px-10 py-6">
                        <span className="text-xs font-semibold text-[#618964]">Schuldhulp</span>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-5 py-1.5 rounded-full ${status.bg} ${status.text} text-[10px] font-black uppercase tracking-widest ring-1 ${status.ring}`}>
                          {status.label}
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
                  <td colSpan={6} className="px-10 py-16 text-center text-[#618964]">
                    <span className="material-symbols-outlined text-4xl mb-4 block opacity-30">inbox</span>
                    <p className="font-medium">Geen hulpvragen gevonden</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {matches && matches.length > 0 && (
          <div className="px-10 py-8 bg-[#F0F4F0]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[11px] text-[#618964] font-bold uppercase tracking-widest">
              Toon {matches.length} van de {totalCount || 0} hulpvragen
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 py-10 flex flex-col md:flex-row justify-between items-center border-t border-primary/5 gap-6">
        <p className="text-xs font-medium text-[#618964]">© 2025 HulpRadar Organisatie Portaal. Alle rechten voorbehouden.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#618964]">
          <Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="/algemene-voorwaarden">Voorwaarden</Link>
        </div>
      </footer>
    </>
  );
}
