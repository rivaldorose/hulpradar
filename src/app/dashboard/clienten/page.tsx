import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

export default async function ClientenPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
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

  const searchQuery = params.search || "";
  const currentPage = Math.max(1, parseInt(params.page || "1"));

  // Get all unique clients (help requests that have matches with this org)
  const { data: clientMatches } = await supabase
    .from("matches")
    .select(`
      id,
      status,
      created_at,
      help_requests (
        id,
        name,
        email,
        phone,
        gemeente,
        created_at
      )
    `)
    .eq("organisation_id", orgId)
    .order("created_at", { ascending: false });

  // Group by help_request to get unique clients with their stats
  const clientMap = new Map<string, {
    name: string;
    email: string;
    phone: string;
    gemeente: string;
    firstContact: string;
    activeCases: number;
    completedCases: number;
    requestId: string;
  }>();

  clientMatches?.forEach((match) => {
    const req = match.help_requests as unknown as {
      id: string;
      name: string;
      email: string;
      phone: string;
      gemeente: string;
      created_at: string;
    };
    if (!req?.id) return;

    const existing = clientMap.get(req.id);
    if (existing) {
      if (match.status === "accepted") existing.activeCases++;
      if (match.status === "completed") existing.completedCases++;
    } else {
      clientMap.set(req.id, {
        name: req.name || "Anoniem",
        email: req.email || "",
        phone: req.phone || "",
        gemeente: req.gemeente || "Onbekend",
        firstContact: req.created_at,
        activeCases: match.status === "accepted" ? 1 : 0,
        completedCases: match.status === "completed" ? 1 : 0,
        requestId: req.id,
      });
    }
  });

  let clients = Array.from(clientMap.values());

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    clients = clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.gemeente.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }

  const totalClients = clients.length;
  const totalPages = Math.max(1, Math.ceil(totalClients / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedClients = clients.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  function buildUrl(overrides: Record<string, string | undefined>) {
    const p = new URLSearchParams();
    const merged = {
      search: searchQuery || undefined,
      page: safePage > 1 ? String(safePage) : undefined,
      ...overrides,
    };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) p.set(k, v);
    });
    const qs = p.toString();
    return `/dashboard/clienten${qs ? `?${qs}` : ""}`;
  }

  return (
    <>
      {/* Header */}
      <div className="mb-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Cliënten Directory Overzicht</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Cliënten <span className="text-primary/90">Beheer</span>
            </h2>
            <p className="text-[#618964] text-lg mt-4 max-w-2xl font-medium">
              Centraal overzicht van alle cliënten ondersteund door de organisatie.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8">
          <form action="/dashboard/clienten" method="get" className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#618964]/40 text-lg">search</span>
            <input
              name="search"
              type="text"
              defaultValue={searchQuery}
              placeholder="Zoek op naam, email of gemeente..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#e0e6db] text-sm focus:ring-primary focus:border-primary focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[24px] shadow-soft-green border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-[#F0F4F0]/30 border-b border-[#F0F4F0]">
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Cliënt Naam</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Contact Informatie</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Actieve Cases</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em]">Succesverhalen</th>
                <th className="px-10 py-6 text-[#618964] text-[10px] font-black uppercase tracking-[0.2em] text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F0]">
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client) => {
                  const initials = client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  const memberSince = new Date(client.firstContact).toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

                  return (
                    <tr key={client.requestId} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{client.name}</p>
                            <p className="text-[11px] text-[#618964] font-medium">Lid sinds {memberSince}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <div className="flex flex-col gap-1">
                          {client.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="material-symbols-outlined text-xs text-primary">mail</span>
                              {client.email}
                            </div>
                          )}
                          {client.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="material-symbols-outlined text-xs text-primary">call</span>
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <span className={`px-4 py-1 rounded-full text-[11px] font-black ${
                          client.activeCases > 0
                            ? "bg-primary/10 text-primary"
                            : "bg-[#F0F4F0]/50 text-[#618964]"
                        }`}>
                          {client.activeCases} Lopende dossier{client.activeCases !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-amber-400 text-lg">star</span>
                          <span className="text-sm font-bold">{client.completedCases}</span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <Link
                          href={`/dashboard/aanvragen/${client.requestId}`}
                          className="bg-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all opacity-0 group-hover:opacity-100"
                        >
                          Profiel
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-16 text-center text-[#618964]">
                    <span className="material-symbols-outlined text-4xl mb-4 block opacity-30">people</span>
                    <p className="font-medium">
                      {searchQuery ? `Geen resultaten voor "${searchQuery}"` : "Nog geen cliënten"}
                    </p>
                    {searchQuery ? (
                      <Link href={buildUrl({ search: undefined })} className="text-primary text-sm font-bold mt-2 inline-block hover:underline">
                        Zoekopdracht wissen
                      </Link>
                    ) : (
                      <p className="text-sm mt-2">Cliënten verschijnen hier zodra hulpvragen worden geaccepteerd.</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalClients > 0 && (
          <div className="px-10 py-6 bg-[#F0F4F0]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#618964] font-bold uppercase tracking-widest">
              Toon {(safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, totalClients)} van de {totalClients} cliënten
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                {safePage > 1 && (
                  <Link
                    href={buildUrl({ page: String(safePage - 1) })}
                    className="px-4 py-2 rounded-full bg-white border border-[#e0e6db] text-sm font-bold hover:border-primary transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                    Vorige
                  </Link>
                )}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (safePage <= 3) {
                    pageNum = i + 1;
                  } else if (safePage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = safePage - 2 + i;
                  }
                  return (
                    <Link
                      key={pageNum}
                      href={buildUrl({ page: pageNum > 1 ? String(pageNum) : undefined })}
                      className={`size-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        pageNum === safePage
                          ? "bg-primary text-black"
                          : "bg-white border border-[#e0e6db] hover:border-primary"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                {safePage < totalPages && (
                  <Link
                    href={buildUrl({ page: String(safePage + 1) })}
                    className="px-4 py-2 rounded-full bg-white border border-[#e0e6db] text-sm font-bold hover:border-primary transition-colors flex items-center gap-1"
                  >
                    Volgende
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 flex flex-col md:flex-row justify-between items-center border-t border-primary/10 gap-6">
        <p className="text-xs font-medium text-[#618964]">© 2025 HulpRadar Beheerpaneel. Alle rechten voorbehouden.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#618964]">
          <Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="/algemene-voorwaarden">Voorwaarden</Link>
        </div>
      </footer>
    </>
  );
}
