"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";

// ──────────────── Step 1: Form ────────────────
function StepForm({ onSubmit, initialWoonplaats = "" }: { onSubmit: (data: FormData) => void; initialWoonplaats?: string }) {
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [woonplaats, setWoonplaats] = useState(initialWoonplaats);
  const [situation, setSituation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, postcode, woonplaats, situation, email, phone });
  };

  return (
    <main className="flex-1 flex flex-col items-center py-12 px-4">
      {/* Progress Indicator */}
      <div className="w-full max-w-[520px] mb-8 px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-forest-green uppercase tracking-wider">Stap 1 van 3</span>
          <span className="text-xs font-medium text-gray-400">Gegevens invullen</span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-1/3 rounded-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="w-full max-w-[520px] flex flex-col gap-8">
        {/* Headline */}
        <div className="text-center px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-3 text-forest-green">
            Vertel ons wat je nodig hebt
          </h1>
          <p className="text-gray-600 text-base">
            We zijn er om je te ondersteunen. Deel alleen wat je wilt, we gaan hier vertrouwelijk mee om.
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-6 px-4">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold px-2">Naam (optioneel)</label>
            <input
              className="w-full rounded-full border border-[#dbe6dc] bg-white px-6 h-14 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
              placeholder="Bijv. Alex"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold px-2">Waar woon je?</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                <input
                  className="w-full rounded-full border border-[#dbe6dc] bg-white pl-14 pr-6 h-14 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                  placeholder="Postcode (bijv. 1012 AB)"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
              </div>
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">apartment</span>
                <input
                  className="w-full rounded-full border border-[#dbe6dc] bg-white pl-14 pr-6 h-14 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                  placeholder="Woonplaats (bijv. Amsterdam)"
                  type="text"
                  value={woonplaats}
                  onChange={(e) => setWoonplaats(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 px-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              Op basis van je locatie zoeken we organisaties bij jou in de buurt.
            </p>
          </div>

          {/* Situation */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold px-2">Wat is je situatie?</label>
            <textarea
              className="w-full rounded-3xl border border-[#dbe6dc] bg-white p-6 min-h-[160px] focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 resize-none"
              placeholder="Vertel ons kort waar je tegenaan loopt... Bijvoorbeeld openstaande rekeningen of hulp bij administratie."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              required
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold px-2">Hoe kunnen we je bereiken?</label>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                <input
                  className="w-full rounded-full border border-[#dbe6dc] bg-white pl-14 pr-6 h-14 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                  placeholder="Je e-mailadres"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">call</span>
                <input
                  className="w-full rounded-full border border-[#dbe6dc] bg-white pl-14 pr-6 h-14 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
                  placeholder="Je telefoonnummer"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 px-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              Je gegevens zijn veilig bij ons en worden niet gedeeld.
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-opacity-90 text-white font-bold text-lg py-5 px-8 rounded-full shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Vind hulp voor mij</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-8 mt-4 opacity-60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-xs font-medium">Veilig &amp; Discreet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">volunteer_activism</span>
            <span className="text-xs font-medium">Gratis Support</span>
          </div>
        </div>
      </form>
    </main>
  );
}

// ──────────────── Step 2: Radar Animation ────────────────
function StepRadar({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto space-y-16 py-12">
      {/* Progress */}
      <div className="w-full max-w-[520px] px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-forest-green uppercase tracking-wider">Stap 2 van 3</span>
          <span className="text-xs font-medium text-gray-400">Zoeken naar matches</span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-2/3 rounded-full transition-all duration-500"></div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-forest-green leading-tight">
          We zoeken naar de beste match...
        </h1>
      </div>

      {/* Radar Animation */}
      <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
        {/* Radar circles */}
        <div className="absolute inset-0 border border-primary/10 rounded-full"></div>
        <div className="absolute inset-0 border border-primary/10 rounded-full scale-[0.75]"></div>
        <div className="absolute inset-0 border border-primary/10 rounded-full scale-[0.5] animate-pulse"></div>
        <div className="absolute inset-0 border border-primary/10 rounded-full scale-[0.25]"></div>

        {/* Sweep */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "5s" }}>
          <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent origin-bottom-left rounded-tl-full"></div>
          <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-primary/40 to-transparent"></div>
        </div>

        {/* Nodes */}
        <div className="absolute top-1/4 left-1/4 size-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-1/3 right-1/4 size-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1.2s" }}></div>
        <div className="absolute top-1/2 right-1/3 size-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }}></div>

        {/* Center Icon */}
        <div className="relative z-10 size-20 md:size-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-primary/10 border border-primary/10">
          <span className="material-symbols-outlined text-primary text-4xl md:text-5xl">radar</span>
        </div>
      </div>

      <div className="max-w-md">
        <p className="text-forest-green/70 text-lg md:text-xl font-medium leading-relaxed">
          Onze radar scant 200+ organisaties bij jou in de buurt.
        </p>
      </div>

      {/* Trust Footer */}
      <div className="flex items-center justify-center gap-2 text-forest-green/30 text-sm">
        <span className="material-symbols-outlined text-sm">verified_user</span>
        <span>Veilig en anoniem scannen</span>
      </div>
    </main>
  );
}

// ──────────────── Step 3: Confirmation ────────────────
function StepConfirmation() {
  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="max-w-[720px] w-full flex flex-col items-center bg-white p-8 md:p-16 rounded-xl shadow-sm border border-gray-100">
        {/* Progress */}
        <div className="w-full max-w-[520px] mb-12 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-forest-green uppercase tracking-wider">Stap 3 van 3</span>
            <span className="text-xs font-medium text-gray-400">Bevestiging</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-full rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Image */}
          <div className="relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-48 w-48 ring-8 ring-primary/10"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwumphrm3kjw1N2sN2TeMjp33tz1WPDV72A5QDyfjFehkq7XDXBdOgC0Z3_9NBPC2TV-UtTFp0q3hV5cDrHXgEmbIX4z7XvXdF_s2ZH47UU0S5tW9Xp5_1EVpMSRQ1lBO_0h1s4dll3ebDrJryW3i2k_DTTeTuVD0VSDa0AH1PRSZkM5lXApmjVnQPYBszOfl0f7TlCaDq7muuXc4H5G_eHkrJs6rMhUyFxuUBZqJq-Tzfml3sFGgHS83PpgMgj19BzXsdXTT3cw')" }}
            />
            {/* Success Icon */}
            <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-3 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-forest-green text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Even geduld, we gaan voor je aan de slag.
            </h1>
            <p className="text-[#618964] text-lg md:text-xl font-normal max-w-lg leading-relaxed">
              We benaderen nu persoonlijk de organisaties in jouw regio om te kijken wie je het snelst kan helpen. Je ontvangt binnen 24 uur een mail met jouw matches.
            </p>
          </div>
        </div>

        {/* Status & CTA */}
        <div className="mt-12 w-full flex flex-col gap-6 items-center">
          <div className="flex items-center gap-4 bg-primary/10 px-6 py-4 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-primary">mail</span>
            <span className="text-forest-green font-medium">Controleer straks je inbox voor updates</span>
          </div>

          <Link
            href="/"
            className="flex min-w-[240px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Terug naar home
          </Link>
        </div>

        {/* Loading dots */}
        <div className="mt-10 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </main>
  );
}

// ──────────────── Types ────────────────
interface FormData {
  name: string;
  postcode: string;
  woonplaats: string;
  situation: string;
  email: string;
  phone: string;
}

// ──────────────── Inner Content ────────────────
function HulpZoekenContent() {
  const searchParams = useSearchParams();
  const initialWoonplaats = searchParams.get("woonplaats") || "";
  const [step, setStep] = useState(1);

  const handleFormSubmit = (_data: FormData) => {
    // TODO: Send data to API
    setStep(2);
  };

  const handleRadarComplete = () => {
    setStep(3);
  };

  return (
    <>
      <div className="pt-24 flex-1 flex flex-col">
        {step === 1 && <StepForm onSubmit={handleFormSubmit} initialWoonplaats={initialWoonplaats} />}
        {step === 2 && <StepRadar onComplete={handleRadarComplete} />}
        {step === 3 && <StepConfirmation />}
      </div>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>&copy; 2025 HulpRadar. Wij helpen je weer op weg.</p>
      </footer>
    </>
  );
}

// ──────────────── Main Page ────────────────
export default function HulpZoekenPage() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="pt-24 flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      }>
        <HulpZoekenContent />
      </Suspense>
    </div>
  );
}
