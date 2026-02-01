"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Match {
  id: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  organisation: {
    name: string;
    email: string;
    phone: string | null;
    website: string | null;
    gemeente: string;
    estimated_wait_days: number;
    is_verified: boolean;
    specialisaties?: string[];
  };
  responded_at: string | null;
}

interface HelpRequestStatus {
  id: string;
  status: string;
  name: string;
  gemeente: string;
  created_at: string;
  matches: Match[];
}

export default function StatusPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<HelpRequestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/help-request/${resolvedParams.id}/status`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Aanvraag niet gevonden");
        } else {
          setError("Er ging iets mis bij het ophalen van de status");
        }
        return;
      }

      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch {
      setError("Er ging iets mis bij het ophalen van de status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [resolvedParams.id]);

  // Check if any match is accepted → show dossier view
  const acceptedMatch = status?.matches.find((m) => m.status === "accepted");
  const pendingMatches = status?.matches.filter((m) => m.status === "pending") || [];
  const hasMatches = (status?.matches.length || 0) > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDF7]">
      <Header />

      {/* Loading State */}
      {loading && !status && (
        <main className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#8ce830] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#1B3022]/60 font-medium">Status ophalen...</p>
          </div>
        </main>
      )}

      {/* Error State */}
      {error && (
        <main className="flex-1 pt-32 pb-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-red-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#1B3022] mb-3">{error}</h2>
              <p className="text-[#1B3022]/60 mb-8">Controleer of je de juiste link hebt gebruikt.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#8ce830] hover:bg-[#76c428] text-[#1B3022] font-bold px-8 py-3 rounded-full transition-all"
              >
                Terug naar home
              </Link>
            </div>
          </div>
        </main>
      )}

      {/* Accepted State: Dossier View */}
      {status && acceptedMatch && (
        <>
          <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-[#1B5E20] mb-4">
              Jouw pad naar een oplossing
            </h1>
            <p className="text-lg text-[#1B3022]/60 max-w-xl mx-auto">
              Hier kun je de status van je hulpvraag volgen en je matches bekijken. We staan aan je zijde.
            </p>
          </header>

          <main className="flex-grow px-6 pb-32">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(27,94,32,0.08)] overflow-hidden">
                {/* Progress Steps */}
                <div className="p-8 md:p-12 border-b border-gray-50">
                  <div className="flex items-center justify-between mb-8">
                    {/* Step 1: Completed */}
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B5E20]">
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                      </div>
                      <span className="text-xs font-bold text-[#1B5E20] text-center">Hulpvraag<br />ingediend</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-[#1B5E20] -mt-8" />
                    {/* Step 2: Completed */}
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B5E20]">
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                      </div>
                      <span className="text-xs font-bold text-[#1B5E20] text-center">Matches<br />gevonden</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-[#1B5E20] -mt-8" />
                    {/* Step 3: Active */}
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#8ce830] ring-4 ring-green-100">
                        <div className="w-3 h-3 rounded-full bg-[#1B5E20] animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-[#1B5E20] text-center">Hulp<br />gestart</span>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#1B5E20]">info</span>
                    <p className="text-sm text-[#1B5E20] font-medium">
                      Je bent momenteel in de fase &apos;Hulp gestart&apos;. De organisatie heeft je dossier geopend.
                    </p>
                  </div>
                </div>

                {/* Organisation Info */}
                <div className="p-8 md:p-12 bg-[#FBFEF9]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Deelnemende Organisatie</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-[#8ce830]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#1B5E20] text-4xl">corporate_fare</span>
                      </div>
                      {acceptedMatch.organisation.is_verified && (
                        <div className="absolute -bottom-2 -right-2 bg-[#8ce830] text-[#1B5E20] w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <span className="material-symbols-outlined text-lg">verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="text-2xl font-bold text-[#1B5E20]">{acceptedMatch.organisation.name}</h4>
                        {acceptedMatch.organisation.is_verified && (
                          <span className="px-3 py-1 bg-[#1B5E20] text-white text-[10px] font-bold rounded-full uppercase">
                            Konsensi Geverifieerd
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4 max-w-lg">
                        Gespecialiseerd in hulpverlening en persoonlijke begeleiding in {acceptedMatch.organisation.gemeente}.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {acceptedMatch.organisation.phone && (
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[#1B5E20] text-xl">call</span>
                            <span>{acceptedMatch.organisation.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="material-symbols-outlined text-[#1B5E20] text-xl">mail</span>
                          <span>{acceptedMatch.organisation.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="p-8 md:p-12">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Wat kun je nu verwachten?</h3>
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#1B5E20] text-xs font-bold">1</span>
                      </div>
                      <p className="text-gray-600">Binnen 2 werkdagen neemt een vaste begeleider contact met je op voor een kennismaking.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#1B5E20] text-xs font-bold">2</span>
                      </div>
                      <p className="text-gray-600">Samen maken jullie een plan van aanpak dat past bij jouw persoonlijke situatie.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#1B5E20] text-xs font-bold">3</span>
                      </div>
                      <p className="text-gray-600">Je kunt altijd contact opnemen als je vragen hebt of extra hulp nodig hebt.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`mailto:${acceptedMatch.organisation.email}`}
                      className="bg-[#8ce830] hover:bg-[#76c428] text-[#1B5E20] font-extrabold px-10 py-4 rounded-full shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">send</span>
                      Stuur een bericht
                    </a>
                    {acceptedMatch.organisation.phone && (
                      <a
                        href={`tel:${acceptedMatch.organisation.phone}`}
                        className="border-2 border-gray-100 hover:border-gray-200 text-gray-500 font-bold px-10 py-4 rounded-full transition-all text-center"
                      >
                        Bel de organisatie
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {/* Matches View (not yet accepted) */}
      {status && !acceptedMatch && hasMatches && (
        <>
          <header className="bg-[#E8F5E9] pt-32 pb-20 px-6" style={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl md:text-5xl text-[#1B3022] mb-4">
                Dit zijn jouw matches, {status.name}
              </h1>
              <p className="text-lg md:text-xl text-[#1B3022]/80 font-medium max-w-2xl mx-auto">
                We hebben organisaties gevonden die je direct kunnen ondersteunen bij jouw vraag.
              </p>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-6 -mt-10 pb-20">
            {/* Timer Banner */}
            <div className="bg-white/90 border border-[#8ce830]/20 rounded-2xl p-4 mb-8 flex items-center justify-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-[#76c428]">timer</span>
              <p className="text-[#1B3022] font-medium">
                Deze matches zijn nog <span className="font-bold underline decoration-[#8ce830] decoration-2">48 uur geldig</span>. Neem tijdig contact op.
              </p>
            </div>

            {/* Match Cards */}
            <div className="flex flex-col gap-8">
              {status.matches.map((match) => (
                <div
                  key={match.id}
                  className={`bg-white rounded-3xl p-8 shadow-[0_10px_30px_-5px_rgba(140,232,48,0.12)] border border-[#E8F5E9] flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden group ${
                    match.status === "expired" || match.status === "rejected" ? "opacity-60" : ""
                  }`}
                >
                  {/* Green side accent */}
                  <div className={`absolute top-0 left-0 w-2 h-full transition-all group-hover:w-3 ${
                    match.status === "rejected" ? "bg-red-400" : match.status === "expired" ? "bg-gray-300" : "bg-[#8ce830]"
                  }`} />

                  <div className="flex-1 pl-4">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2 className="font-display font-bold text-2xl text-[#1B3022]">
                        {match.organisation.name}
                      </h2>
                      {match.organisation.is_verified && (
                        <div className="flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B3022] px-3 py-1 rounded-full text-xs font-bold border border-[#8ce830]/10">
                          <span className="material-symbols-outlined text-sm text-[#76c428] font-bold">verified</span>
                          Konsensi Geverifieerd
                        </div>
                      )}
                      {match.status === "rejected" && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">Afgewezen</span>
                      )}
                      {match.status === "expired" && (
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Verlopen</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex items-center gap-2 text-[#1B3022]/70">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span className="text-sm font-semibold">
                          Verwachte wachttijd:{" "}
                          <span className="text-[#1B3022]">
                            {match.organisation.estimated_wait_days <= 1
                              ? "Direct beschikbaar"
                              : `${match.organisation.estimated_wait_days} werkdagen`}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#1B3022]/70">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                        <span className="text-sm font-semibold">{match.organisation.gemeente}</span>
                      </div>
                    </div>
                  </div>

                  {match.status === "pending" && (
                    <div className="w-full md:w-auto">
                      <span className="w-full md:min-w-[260px] bg-[#8ce830]/20 text-[#1B3022] font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-xl animate-pulse">hourglass_top</span>
                        Wacht op reactie organisatie
                      </span>
                    </div>
                  )}

                  {match.status === "accepted" && (
                    <div className="w-full md:w-auto">
                      <a
                        href={`mailto:${match.organisation.email}`}
                        className="w-full md:min-w-[260px] bg-[#8ce830] hover:bg-[#76c428] transition-all text-[#1B3022] font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md"
                      >
                        Bekijk profiel &amp; neem contact op
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Help Text */}
            <div className="mt-16 text-center text-[#1B3022]/60 text-sm max-w-xl mx-auto">
              <p>
                Heb je hulp nodig bij het kiezen? Ons support team staat voor je klaar.<br />
                Neem contact op via <Link href="/faq" className="text-[#76c428] font-bold hover:underline">onze FAQ</Link>.
              </p>
            </div>
          </main>
        </>
      )}

      {/* No matches yet */}
      {status && !acceptedMatch && !hasMatches && (
        <>
          <header className="bg-[#E8F5E9] pt-32 pb-20 px-6" style={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display font-bold text-4xl md:text-5xl text-[#1B3022] mb-4">
                Hoi {status.name}!
              </h1>
              <p className="text-lg md:text-xl text-[#1B3022]/80 font-medium max-w-2xl mx-auto">
                We zijn nog op zoek naar organisaties in jouw regio. Even geduld...
              </p>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-6 -mt-10 pb-20">
            <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
              <div className="w-20 h-20 bg-[#8ce830]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#8ce830] text-4xl animate-pulse">radar</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#1B3022] mb-3">Radar scant...</h2>
              <p className="text-[#1B3022]/60 max-w-md mx-auto mb-8">
                We zijn bezig met het vinden van de beste organisaties voor jouw situatie. Je ontvangt automatisch een e-mail zodra er matches zijn.
              </p>
              <button
                onClick={fetchStatus}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#1B5E20] font-bold px-8 py-3 rounded-full hover:bg-[#d4eed6] transition-all"
              >
                <span className={`material-symbols-outlined text-lg ${loading ? "animate-spin" : ""}`}>refresh</span>
                Vernieuwen
              </button>
            </div>
          </main>
        </>
      )}

      <Footer />

      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    </div>
  );
}
