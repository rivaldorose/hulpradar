import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function RapportagePage() {
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

  const orgId = orgUserData?.organisation_id;
  const orgName = orgUserData?.organisations
    ? (orgUserData.organisations as unknown as { name: string })?.name
    : "Organisatie";

  if (!orgId) return null;

  // Fetch all matches for stats
  const { data: allMatches } = await supabase
    .from("matches")
    .select("id, status, created_at, responded_at, expires_at")
    .eq("organisation_id", orgId);

  const matches = allMatches || [];

  // Totals
  const total = matches.length;
  const pending = matches.filter((m) => m.status === "pending").length;
  const accepted = matches.filter((m) => m.status === "accepted").length;
  const completed = matches.filter((m) => m.status === "completed").length;
  const rejected = matches.filter((m) => m.status === "rejected").length;
  const expired = matches.filter((m) => m.status === "expired").length;

  // Accept rate
  const responded = accepted + rejected + completed;
  const acceptRate = responded > 0 ? Math.round(((accepted + completed) / responded) * 100) : 0;

  // Average response time (hours)
  const responseTimes = matches
    .filter((m) => m.responded_at && m.created_at)
    .map((m) => (new Date(m.responded_at!).getTime() - new Date(m.created_at).getTime()) / (1000 * 60 * 60));
  const avgResponseTime = responseTimes.length > 0 ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) : 0;

  // Monthly breakdown (last 6 months)
  const now = new Date();
  const monthlyData: { month: string; count: number; accepted: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const label = d.toLocaleDateString("nl-NL", { month: "short", year: "numeric" });
    const monthMatches = matches.filter((m) => {
      const cd = new Date(m.created_at);
      return cd >= d && cd <= monthEnd;
    });
    monthlyData.push({
      month: label,
      count: monthMatches.length,
      accepted: monthMatches.filter((m) => m.status === "accepted" || m.status === "completed").length,
    });
  }

  const maxMonthCount = Math.max(...monthlyData.map((m) => m.count), 1);

  return (
    <>
      {/* Header */}
      <div className="mb-12 px-4">
        <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Inzichten &amp; Data</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Rapportage <span className="text-primary/90">Dashboard</span>
        </h2>
        <p className="text-[#618964] text-lg mt-4 font-medium">
          Overzicht van de prestaties en impact van {orgName}.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="absolute -right-4 -top-4 size-20 bg-primary/5 rounded-full blur-2xl" />
          <p className="text-[#618964] text-[10px] font-bold uppercase tracking-widest mb-2">Totaal aanvragen</p>
          <p className="text-4xl font-black tabular-nums">{total}</p>
        </div>
        <div className="bg-white p-8 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-1 transition-all">
          <p className="text-[#618964] text-[10px] font-bold uppercase tracking-widest mb-2">Acceptatiegraad</p>
          <p className="text-4xl font-black tabular-nums text-primary">{acceptRate}%</p>
        </div>
        <div className="bg-white p-8 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-1 transition-all">
          <p className="text-[#618964] text-[10px] font-bold uppercase tracking-widest mb-2">Gem. Reactietijd</p>
          <p className="text-4xl font-black tabular-nums">{avgResponseTime}<span className="text-lg font-medium text-[#618964]">u</span></p>
        </div>
        <div className="bg-white p-8 rounded-[24px] shadow-soft-green border border-white relative overflow-hidden group hover:-translate-y-1 transition-all">
          <p className="text-[#618964] text-[10px] font-bold uppercase tracking-widest mb-2">Actieve dossiers</p>
          <p className="text-4xl font-black tabular-nums">{accepted}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Chart */}
        <div className="lg:col-span-2 bg-white rounded-[24px] shadow-soft-green border border-white p-8 md:p-10">
          <h3 className="text-xl font-bold mb-2">Maandelijks overzicht</h3>
          <p className="text-sm text-[#618964] mb-8">Aantal aanvragen per maand (laatste 6 maanden)</p>

          <div className="flex items-end gap-4 h-48">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: "160px" }}>
                  <span className="text-xs font-bold">{m.count}</span>
                  <div className="w-full flex-1 flex flex-col justify-end gap-1">
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all"
                      style={{ height: `${(m.accepted / maxMonthCount) * 100}%`, minHeight: m.accepted > 0 ? "4px" : "0" }}
                    />
                    <div
                      className="w-full bg-primary/20 rounded-b-lg transition-all"
                      style={{ height: `${((m.count - m.accepted) / maxMonthCount) * 100}%`, minHeight: m.count - m.accepted > 0 ? "4px" : "0" }}
                    />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#618964] uppercase tracking-wider">{m.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#F0F4F0]">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-primary" />
              <span className="text-xs text-[#618964] font-medium">Geaccepteerd</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm bg-primary/20" />
              <span className="text-xs text-[#618964] font-medium">Overig</span>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-[24px] shadow-soft-green border border-white p-8">
          <h3 className="text-xl font-bold mb-6">Status Verdeling</h3>
          <div className="space-y-5">
            {[
              { label: "Wachtend", count: pending, color: "bg-amber-400" },
              { label: "Geaccepteerd", count: accepted, color: "bg-primary" },
              { label: "Afgerond", count: completed, color: "bg-emerald-400" },
              { label: "Afgewezen", count: rejected, color: "bg-red-400" },
              { label: "Verlopen", count: expired, color: "bg-gray-300" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="text-sm font-bold">{s.count}</span>
                </div>
                <div className="h-2 bg-[#F0F4F0] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full transition-all`}
                    style={{ width: total > 0 ? `${(s.count / total) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1B3022] rounded-[24px] p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">trending_up</span>
            <h3 className="font-bold">Responspercentage</h3>
          </div>
          <p className="text-3xl font-black mb-2">{responded > 0 ? Math.round((responded / total) * 100) : 0}%</p>
          <p className="text-sm text-gray-400">van alle aanvragen beantwoord</p>
        </div>

        <div className="bg-[#1B3022] rounded-[24px] p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <h3 className="font-bold">Verlopen aanvragen</h3>
          </div>
          <p className="text-3xl font-black mb-2">{expired}</p>
          <p className="text-sm text-gray-400">niet op tijd beantwoord</p>
        </div>

        <div className="bg-[#1B3022] rounded-[24px] p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            <h3 className="font-bold">Succesvol afgerond</h3>
          </div>
          <p className="text-3xl font-black mb-2">{completed}</p>
          <p className="text-sm text-gray-400">dossiers succesvol gesloten</p>
        </div>
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
