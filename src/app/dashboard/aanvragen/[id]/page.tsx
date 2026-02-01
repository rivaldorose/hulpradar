"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface HelpRequest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  gemeente: string;
  postcode: string;
  situation: string | null;
  contact_preference: string;
  status: string;
  created_at: string;
  help_category?: string;
}

interface Match {
  id: string;
  status: string;
  priority: number;
  expires_at: string;
  responded_at: string | null;
  response_note: string | null;
  organisation_id: string;
}

export default function AanvraagDetailPage() {
  const params = useParams();
  const router = useRouter();
  const helpRequestId = params.id as string;

  const [helpRequest, setHelpRequest] = useState<HelpRequest | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [organisationId, setOrganisationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, [helpRequestId]);

  async function fetchData() {
    try {
      const statusRes = await fetch(`/api/help-request/${helpRequestId}/status`);
      if (!statusRes.ok) throw new Error("Aanvraag niet gevonden");
      const statusData = await statusRes.json();

      setHelpRequest({
        id: statusData.id,
        name: statusData.name,
        email: null,
        phone: null,
        gemeente: statusData.gemeente,
        postcode: "",
        situation: null,
        contact_preference: "email",
        status: statusData.status,
        created_at: statusData.created_at,
      });

      const dashRes = await fetch(`/api/dashboard/aanvragen/${helpRequestId}`);
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        if (dashData.helpRequest) {
          setHelpRequest(dashData.helpRequest);
        }
        if (dashData.match) {
          setMatch(dashData.match);
          setOrganisationId(dashData.match.organisation_id);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept() {
    if (!organisationId) return;
    setActionLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/requests/${helpRequestId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisation_id: organisationId,
          note: note || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Aanvraag geaccepteerd! De hulpzoekende ontvangt een e-mail.");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject() {
    if (!organisationId) return;
    setActionLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/requests/${helpRequestId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisation_id: organisationId,
          reason: note || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Aanvraag afgewezen.");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#8ce830] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Aanvraag laden...</p>
        </div>
      </div>
    );
  }

  if (!helpRequest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">search_off</span>
          <p className="text-gray-500 mb-4">Aanvraag niet gevonden.</p>
          <Link
            href="/dashboard/aanvragen"
            className="inline-flex items-center gap-2 text-[#1B5E20] font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Terug naar overzicht
          </Link>
        </div>
      </div>
    );
  }

  const matchStatus = match?.status || helpRequest.status;
  const isPending = match?.status === "pending";
  const isAccepted = match?.status === "accepted";
  const isRejected = match?.status === "rejected";

  const hoursLeft = match?.expires_at
    ? Math.max(0, Math.round((new Date(match.expires_at).getTime() - Date.now()) / (1000 * 60 * 60)))
    : 0;

  const createdDate = new Date(helpRequest.created_at);
  const timeString = createdDate.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  const dateString = createdDate.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
        <Link href="/dashboard" className="hover:underline hover:text-gray-600">Dashboard</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/dashboard/aanvragen" className="hover:underline hover:text-gray-600">Hulpvragen</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#1B3022] font-medium">Aanvraag Details</span>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-green-600 mt-0.5">check_circle</span>
          <p className="font-medium">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
          <p>{error}</p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PENDING STATE: B2B Aanvraag Detail View
          ═══════════════════════════════════════════════════════════════ */}
      {isPending && (
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(140,232,48,0.12)] border border-white p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-[#FAFDF7]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8ce830]/10 rounded-full mb-3">
                <span className="w-2 h-2 bg-[#8ce830] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B3022]/60">Nieuwe Hulpvraag</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1B3022]">
                Hulpvraag van {helpRequest.name}
              </h1>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {dateString} om {timeString}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {helpRequest.help_category && (
                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#F1F8E8] text-[#3D5A20] rounded-full text-sm font-semibold border border-[#8ce830]/20">
                  <span className="material-symbols-outlined text-base">category</span>
                  {helpRequest.help_category}
                </div>
              )}
              <div className="flex items-center gap-1.5 px-4 py-2 bg-[#F1F8E8] text-[#3D5A20] rounded-full text-sm font-semibold border border-[#8ce830]/20">
                <span className="material-symbols-outlined text-base">location_on</span>
                {helpRequest.gemeente}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Situation Description */}
              {helpRequest.situation && (
                <section>
                  <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8ce830] text-2xl">description</span>
                    Omschrijving van de situatie
                  </h2>
                  <div className="text-gray-500 text-lg leading-relaxed">
                    <p>{helpRequest.situation}</p>
                  </div>
                </section>
              )}

              {/* Additional Details */}
              <section className="bg-[#FAFDF7]/50 rounded-xl p-6 border border-[#FAFDF7]">
                <h3 className="font-display font-semibold mb-3">Aanvullende Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-[#8ce830]">location_on</span>
                    <div>
                      <span className="block font-semibold">Locatie</span>
                      <span className="text-gray-500">{helpRequest.gemeente}{helpRequest.postcode ? ` (${helpRequest.postcode})` : ""}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-[#8ce830]">contact_mail</span>
                    <div>
                      <span className="block font-semibold">Contactvoorkeur</span>
                      <span className="text-gray-500 capitalize">{helpRequest.contact_preference}</span>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#FAFDF7] rounded-2xl p-6 border border-[#8ce830]/10 sticky top-32">
                <h3 className="font-display font-bold text-lg mb-2 text-center">Actie vereist</h3>
                <p className="text-gray-400 text-xs text-center mb-4">
                  Nog <span className="font-bold text-amber-600">{hoursLeft} uur</span> om te reageren
                </p>

                <div className="space-y-4">
                  <textarea
                    placeholder="Optioneel bericht aan hulpzoekende..."
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm resize-none focus:outline-none focus:border-[#8ce830] focus:ring-1 focus:ring-[#8ce830]"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />

                  <button
                    onClick={handleAccept}
                    disabled={actionLoading}
                    className="w-full bg-[#8ce830] hover:bg-[#7cd426] text-[#1B3022] font-bold py-4 px-6 rounded-full transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <div className="w-5 h-5 border-2 border-[#1B3022] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Accepteer aanvraag
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="w-full bg-white hover:bg-zinc-50 text-red-600 border border-red-100 font-semibold py-3 px-6 rounded-full transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    Afwijzen
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-[#8ce830]/10">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#8ce830]/60 shrink-0">info</span>
                    <p className="text-[13px] text-gray-400 leading-snug">
                      Na acceptatie ontvang je de volledige contactgegevens van de hulpzoekende om direct een kennismaking in te plannen.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 flex gap-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="material-symbols-outlined text-zinc-400 text-sm">lock</span>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Privacy Gewaarborgd</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ACCEPTED STATE: Contact Details View
          ═══════════════════════════════════════════════════════════════ */}
      {isAccepted && (
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-3xl p-10 shadow-[0_20px_40px_-10px_rgba(140,232,48,0.12)] border border-white">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8ce830]/10 text-[#76c428] text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="material-symbols-outlined text-[16px]">verified</span> Geverifieerde Match
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B3022] tracking-tight">
                  Neem contact op met {helpRequest.name}
                </h1>
                <p className="mt-3 text-lg text-gray-500 leading-relaxed">
                  {helpRequest.name} wacht op een reactie. Neem zo snel mogelijk contact op.
                </p>
              </div>

              {/* Direct Contact */}
              <section className="mb-12">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  Direct Contact <div className="h-px flex-1 bg-gray-100" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {helpRequest.phone && (
                    <div className="group p-6 rounded-2xl border-2 border-gray-50 hover:border-[#8ce830]/30 transition-all bg-gray-50/30">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#76c428]">
                          <span className="material-symbols-outlined">call</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Telefoon</p>
                          <p className="font-bold text-lg text-[#1B3022]">{helpRequest.phone}</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${helpRequest.phone}`}
                        className="block w-full text-center bg-white hover:bg-[#1B3022] hover:text-white border border-gray-200 py-4 rounded-full font-bold transition-all shadow-sm active:scale-95"
                      >
                        Bel nu
                      </a>
                    </div>
                  )}

                  {helpRequest.email && (
                    <div className="group p-6 rounded-2xl border-2 border-gray-50 hover:border-[#8ce830]/30 transition-all bg-gray-50/30">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#76c428]">
                          <span className="material-symbols-outlined">mail</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">E-mail</p>
                          <p className="font-bold text-lg text-[#1B3022]">{helpRequest.email}</p>
                        </div>
                      </div>
                      <a
                        href={`mailto:${helpRequest.email}`}
                        className="block w-full text-center bg-white hover:bg-[#1B3022] hover:text-white border border-gray-200 py-4 rounded-full font-bold transition-all shadow-sm active:scale-95"
                      >
                        Stuur e-mail
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* Message Templates */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  Bericht Sjablonen <div className="h-px flex-1 bg-gray-100" />
                </h2>
                <div className="space-y-4">
                  <div
                    className="p-6 rounded-2xl border border-gray-100 hover:border-[#8ce830]/50 transition-colors cursor-pointer group"
                    onClick={() => navigator.clipboard?.writeText(`Beste ${helpRequest.name}, we hebben je hulpvraag ontvangen en maken graag een afspraak voor een korte kennismaking. Wanneer komt het je uit?`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-[#1B3022]">Afspraak inplannen</h3>
                      <span className="text-xs font-bold text-[#76c428] opacity-0 group-hover:opacity-100 transition-opacity">KLIK OM TE KOPIËREN</span>
                    </div>
                    <p className="text-gray-600 italic">
                      &quot;Beste {helpRequest.name}, we hebben je hulpvraag ontvangen en maken graag een afspraak voor een korte kennismaking. Wanneer komt het je uit?&quot;
                    </p>
                  </div>
                  <div
                    className="p-6 rounded-2xl border border-gray-100 hover:border-[#8ce830]/50 transition-colors cursor-pointer group"
                    onClick={() => navigator.clipboard?.writeText(`Hallo ${helpRequest.name}, ik neem contact met je op namens onze organisatie via HulpRadar. We hebben een match gevonden voor je hulpvraag en willen je graag helpen.`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-[#1B3022]">Introductie</h3>
                      <span className="text-xs font-bold text-[#76c428] opacity-0 group-hover:opacity-100 transition-opacity">KLIK OM TE KOPIËREN</span>
                    </div>
                    <p className="text-gray-600 italic">
                      &quot;Hallo {helpRequest.name}, ik neem contact met je op namens onze organisatie via HulpRadar. We hebben een match gevonden voor je hulpvraag en willen je graag helpen.&quot;
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 sticky top-32">
            <div className="bg-white/50 border border-gray-200/60 rounded-3xl p-8">
              <h2 className="text-xl font-bold mb-6">Samenvatting Hulpvraag</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Gematcht
                  </span>
                </div>
                {helpRequest.situation && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Omschrijving</p>
                    <p className="text-sm leading-relaxed text-gray-700">
                      &quot;{helpRequest.situation}&quot;
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Locatie</p>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    {helpRequest.gemeente}{helpRequest.postcode ? `, ${helpRequest.postcode}` : ""}
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Geaccepteerd op {match?.responded_at
                      ? new Date(match.responded_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
                      : dateString
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-3xl bg-[#1B3022] text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[#8ce830]">lightbulb</span>
                <h3 className="font-bold">Pro-tip</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Hulpzoekenden reageren het best als je binnen 48 uur na de match contact opneemt.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          REJECTED/EXPIRED STATE
          ═══════════════════════════════════════════════════════════════ */}
      {(isRejected || match?.status === "expired") && (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-gray-400 text-3xl">
              {isRejected ? "cancel" : "timer_off"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3022] mb-3">
            {isRejected ? "Aanvraag afgewezen" : "Aanvraag verlopen"}
          </h1>
          <p className="text-gray-500 mb-2">
            {isRejected
              ? "Je hebt deze hulpvraag afgewezen."
              : "De reactietermijn voor deze aanvraag is verstreken."
            }
          </p>
          {match?.response_note && (
            <p className="text-gray-400 italic text-sm mb-6">&quot;{match.response_note}&quot;</p>
          )}
          <Link
            href="/dashboard/aanvragen"
            className="inline-flex items-center gap-2 bg-[#8ce830] hover:bg-[#76c428] text-[#1B3022] font-bold px-8 py-3 rounded-full transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Terug naar overzicht
          </Link>
        </div>
      )}

      {/* No match found state */}
      {!match && !loading && (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-amber-500">warning</span>
            <h1 className="text-2xl font-bold text-[#1B3022]">Geen match gevonden</h1>
          </div>
          <p className="text-gray-500 mb-6">
            Er is geen actieve match voor deze hulpvraag bij jouw organisatie.
          </p>
          <Link
            href="/dashboard/aanvragen"
            className="inline-flex items-center gap-2 text-[#1B5E20] font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Terug naar overzicht
          </Link>
        </div>
      )}
    </div>
  );
}
