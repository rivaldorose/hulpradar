import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const statusConfig: Record<string, { label: string; bg: string; text: string; ring: string; barColor: string }> = {
  pending: { label: "Intake", bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100", barColor: "bg-primary" },
  accepted: { label: "Actief", bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-100", barColor: "bg-emerald-400" },
  completed: { label: "Afronding", bg: "bg-purple-50", text: "text-purple-700", ring: "ring-purple-100", barColor: "bg-purple-400" },
  rejected: { label: "Gestopt", bg: "bg-red-50", text: "text-red-700", ring: "ring-red-100", barColor: "bg-red-400" },
};

export default async function DossiersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orgUserData } = await supabase
    .from("organisation_users")
    .select("organisation_id")
    .eq("user_id", user.id)
    .single();

  const orgId = orgUserData?.organisation_id;
  if (!orgId) return null;

  // Get accepted/active matches as "dossiers"
  const { data: dossiers } = await supabase
    .from("matches")
    .select(`
      id,
      status,
      created_at,
      help_requests (
        id,
        name,
        gemeente,
        situation
      )
    `)
    .eq("organisation_id", orgId)
    .in("status", ["accepted", "completed", "pending"])
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <>
      {/* Header */}
      <div className="mb-14 px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Beheer &amp; Overzicht</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Lopende <span className="text-primary/90">Dossiers</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Dossier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dossiers && dossiers.length > 0 ? (
          dossiers.map((dossier) => {
            const request = dossier.help_requests as unknown as {
              id: string;
              name: string;
              gemeente: string;
              situation: string;
            };
            const initials = (request?.name || "??")
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();
            const status = statusConfig[dossier.status] || statusConfig.pending;
            const dossierNumber = `#DOS-${new Date(dossier.created_at).getFullYear()}-${dossier.id.substring(0, 3).toUpperCase()}`;

            // Calculate a pseudo-progress based on status
            const progress = dossier.status === "completed" ? 95 : dossier.status === "accepted" ? 45 : 15;

            return (
              <div key={dossier.id} className="bg-white p-8 rounded-[24px] shadow-soft-green border border-white flex flex-col group hover:-translate-y-2 transition-all duration-500">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{request?.name || "Anoniem"}</h3>
                      <p className="text-xs text-[#618964] font-medium uppercase tracking-wider">{dossierNumber}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-1 rounded-full ${status.bg} ${status.text} text-[10px] font-black uppercase tracking-widest ring-1 ${status.ring}`}>
                    {status.label}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#618964]">Voortgang</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#F0F4F0] rounded-full overflow-hidden">
                    <div className={`h-full ${status.barColor} rounded-full`} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-auto pt-6 border-t border-[#F0F4F0] grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#618964] font-black uppercase tracking-widest mb-1">Gemeente</p>
                    <p className="text-sm font-bold">{request?.gemeente || "Onbekend"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#618964] font-black uppercase tracking-widest mb-1">Aangemeld</p>
                    <p className="text-sm font-medium">
                      {new Date(dossier.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/aanvragen/${request?.id}`}
                  className="mt-6 w-full py-3 rounded-xl bg-[#F0F4F0] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all text-center block"
                >
                  Bekijk Details
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 text-[#618964]">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">folder_open</span>
            <p className="font-medium text-lg">Nog geen dossiers</p>
            <p className="text-sm mt-2">Accepteer hulpvragen om dossiers te starten.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 flex flex-col md:flex-row justify-between items-center border-t border-primary/5 gap-6">
        <p className="text-xs font-medium text-[#618964]">© 2025 HulpRadar Dossierbeheer. Alle rechten voorbehouden.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#618964]">
          <Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="/algemene-voorwaarden">Voorwaarden</Link>
        </div>
      </footer>
    </>
  );
}
