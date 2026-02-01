"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";

// ──────────────── Types ────────────────
interface StepOneData {
  organisatienaam: string;
  kvkNummer: string;
  website: string;
}

interface StepTwoData {
  specialisaties: string[];
  gemeenten: string[];
}

interface StepThreeData {
  contactNaam: string;
  email: string;
  telefoon: string;
  akkoord: boolean;
}

const SPECIALISATIES = [
  "Budgetcoaching",
  "WSNP",
  "Schuldbemiddeling",
  "Juridisch Advies",
  "Sociale Raadslieden",
  "Schuldhulpverlening",
  "Inkomensbeheer",
  "Vroegsignalering",
];

const GEMEENTEN_OPTIES = [
  "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven",
  "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen",
  "Apeldoorn", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort",
  "Haarlemmermeer", "Den Bosch", "Zoetermeer", "Zwolle", "Leiden",
  "Maastricht", "Dordrecht", "Ede", "Alphen aan den Rijn", "Westland",
];

// ──────────────── Step 1: Basisgegevens ────────────────
function StepBasisgegevens({ onNext, data }: { onNext: (data: StepOneData) => void; data: StepOneData }) {
  const [organisatienaam, setOrganisatienaam] = useState(data.organisatienaam);
  const [kvkNummer, setKvkNummer] = useState(data.kvkNummer);
  const [website, setWebsite] = useState(data.website);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ organisatienaam, kvkNummer, website });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 justify-center items-start">
      {/* Left Sidebar Trust Indicators */}
      <aside className="w-full lg:w-64 space-y-8 lg:mt-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg font-bold">check</span>
            </div>
            <p className="font-semibold">Gratis aanmelden</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg font-bold">visibility</span>
            </div>
            <p className="font-semibold">Direct zichtbaar</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg font-bold">verified</span>
            </div>
            <p className="font-semibold">Konsensi Geverifieerd</p>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white/50 border border-[#e0e6db]/30">
          <p className="text-sm text-[#758961] leading-relaxed">
            Sluit je aan bij het grootste netwerk van zorg- en hulpverleners in Nederland.
          </p>
        </div>
      </aside>

      {/* Registration Card */}
      <section className="flex-1 w-full max-w-[720px]">
        <div className="bg-white rounded-xl shadow-sm border border-[#e0e6db]/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="p-8 lg:p-10 pb-0">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Basisgegevens</p>
                <p className="text-sm font-medium text-[#758961]">Stap 1 van 3 (33%)</p>
              </div>
              <div className="h-2 rounded-full bg-[#e0e6db] overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "33%" }} />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="px-8 lg:px-10 pt-10 text-center lg:text-left">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold leading-tight">Meld je organisatie aan</h1>
            <p className="text-[#758961] mt-3 text-lg">Laten we beginnen met de basisinformatie van je organisatie.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold pl-1">Organisatienaam</label>
              <input
                className="w-full rounded-xl border-[#e0e6db] bg-white h-16 px-6 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-[#758961]/60"
                placeholder="Bijv. Stichting Zorg & Welzijn"
                type="text"
                value={organisatienaam}
                onChange={(e) => setOrganisatienaam(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-bold pl-1">KVK-nummer</label>
              <input
                className="w-full rounded-xl border-[#e0e6db] bg-white h-16 px-6 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-[#758961]/60"
                placeholder="8-cijferig nummer"
                type="text"
                value={kvkNummer}
                onChange={(e) => setKvkNummer(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-bold pl-1">Website</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#758961] select-none">https://</span>
                <input
                  className="w-full rounded-xl border-[#e0e6db] bg-white h-16 pl-20 pr-6 text-lg focus:ring-primary focus:border-primary transition-all placeholder:text-[#758961]/60"
                  placeholder="www.organisatie.nl"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-forest-green font-bold text-lg h-16 rounded-full transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Volgende stap
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-center text-[#758961] text-sm mt-6">
                Heb je al een account?{" "}
                <Link className="font-bold underline decoration-primary underline-offset-4" href="/login">
                  Log hier in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

// ──────────────── Step 2: Expertise & Regio ────────────────
function StepExpertise({ onNext, onBack, data }: { onNext: (data: StepTwoData) => void; onBack: () => void; data: StepTwoData }) {
  const [specialisaties, setSpecialisaties] = useState<string[]>(data.specialisaties);
  const [gemeenten, setGemeenten] = useState<string[]>(data.gemeenten);
  const [gemeenteInput, setGemeenteInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSpecialisatie = (s: string) => {
    setSpecialisaties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const addGemeente = (g: string) => {
    if (!gemeenten.includes(g)) {
      setGemeenten([...gemeenten, g]);
    }
    setGemeenteInput("");
    setShowDropdown(false);
  };

  const removeGemeente = (g: string) => {
    setGemeenten(gemeenten.filter((x) => x !== g));
  };

  const filteredGemeenten = GEMEENTEN_OPTIES.filter(
    (g) =>
      g.toLowerCase().includes(gemeenteInput.toLowerCase()) &&
      !gemeenten.includes(g)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (specialisaties.length === 0) {
      toast.error("Selecteer minimaal één specialisatie");
      return;
    }
    if (gemeenten.length === 0) {
      toast.error("Selecteer minimaal één gemeente");
      return;
    }
    onNext({ specialisaties, gemeenten });
  };

  return (
    <div className="w-full max-w-[960px] mx-auto bg-white rounded-xl shadow-sm border border-[#e0e6db]/20 overflow-hidden">
      {/* Progress Bar */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-end">
            <p className="text-sm font-semibold uppercase tracking-wider">Aanmeldproces</p>
            <p className="text-sm font-medium text-[#758961]">Stap 2 van 3</p>
          </div>
          <div className="rounded-full bg-[#e0e6db] h-2 w-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "66%" }} />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="px-8 py-6">
        <h1 className="font-heading text-4xl font-black leading-tight tracking-tight">Expertise &amp; Regio</h1>
        <p className="text-[#758961] text-lg mt-3 max-w-2xl">
          Geef aan op welke gebieden uw organisatie gespecialiseerd is en in welke gemeenten u diensten verleent.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-8 pb-12 space-y-10">
        {/* Specialisaties */}
        <section>
          <h2 className="text-[22px] font-bold leading-tight mb-4">Specialisaties</h2>
          <div className="flex gap-3 flex-wrap">
            {SPECIALISATIES.map((s) => {
              const selected = specialisaties.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecialisatie(s)}
                  className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 cursor-pointer border-2 transition-colors ${
                    selected
                      ? "bg-primary border-primary font-semibold"
                      : "bg-gray-50 border-transparent hover:border-primary/50 text-gray-700 font-medium"
                  }`}
                >
                  {selected && <span className="material-symbols-outlined text-xl">check</span>}
                  <p className="text-base">{s}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Werkgebied */}
        <section>
          <h2 className="text-[22px] font-bold leading-tight mb-4">Werkgebied</h2>
          <div className="relative max-w-xl">
            <label className="block text-sm font-medium text-[#758961] mb-2">
              In welke gemeenten is uw organisatie actief?
            </label>
            <div className="relative">
              <div
                className="flex flex-wrap gap-2 p-3 min-h-[56px] w-full rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                onClick={() => setShowDropdown(true)}
              >
                {gemeenten.map((g) => (
                  <div key={g} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium">
                    {g}
                    <button type="button" onClick={() => removeGemeente(g)}>
                      <span className="material-symbols-outlined text-sm cursor-pointer hover:text-red-500">close</span>
                    </button>
                  </div>
                ))}
                <input
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 outline-none min-w-[120px]"
                  placeholder="Zoek gemeente..."
                  type="text"
                  value={gemeenteInput}
                  onChange={(e) => {
                    setGemeenteInput(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
              </div>

              {/* Dropdown */}
              {showDropdown && gemeenteInput.length > 0 && filteredGemeenten.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredGemeenten.slice(0, 8).map((g) => (
                    <button
                      key={g}
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 text-sm font-medium transition-colors"
                      onClick={() => addGemeente(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">U kunt meerdere gemeenten selecteren.</p>
          </div>
        </section>
      </form>

      {/* Footer Navigation */}
      <div className="px-8 py-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Vorige
        </button>
        <button
          onClick={handleSubmit as () => void}
          className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-forest-green font-bold hover:brightness-105 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          Volgende stap
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

// ──────────────── Step 3: Afronden ────────────────
function StepAfronden({
  onBack,
  onSubmit,
  data,
  isSubmitting,
}: {
  onBack: () => void;
  onSubmit: (data: StepThreeData) => void;
  data: StepThreeData;
  isSubmitting: boolean;
}) {
  const [contactNaam, setContactNaam] = useState(data.contactNaam);
  const [email, setEmail] = useState(data.email);
  const [telefoon, setTelefoon] = useState(data.telefoon);
  const [akkoord, setAkkoord] = useState(data.akkoord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!akkoord) {
      toast.error("Je moet akkoord gaan met de voorwaarden");
      return;
    }
    onSubmit({ contactNaam, email, telefoon, akkoord });
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto bg-white rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-6 justify-between items-end mb-3">
            <p className="text-base font-bold">Stap 3 van 3</p>
            <p className="text-sm text-[#758961]">100%</p>
          </div>
          <div className="rounded-full bg-[#e0e6db] h-2.5 w-full overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: "100%" }} />
          </div>
          <p className="text-[#758961] text-sm font-medium mt-2">Contactpersoon &amp; Afronden</p>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4">Afronden</h1>
          <p className="text-[#758961] text-base leading-relaxed max-w-md">
            Deze gegevens zijn voor administratieve doeleinden en worden niet openbaar gemaakt. We nemen contact met je op voor verificatie.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-base font-semibold pb-2">Naam contactpersoon</label>
            <input
              className="w-full rounded-xl border-[#e0e6db] bg-white h-14 placeholder:text-[#758961] px-4 text-base focus:ring-primary focus:border-primary transition-all"
              placeholder="Bijv. Jan Janssen"
              type="text"
              value={contactNaam}
              onChange={(e) => setContactNaam(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-base font-semibold pb-2">E-mailadres</label>
            <input
              className="w-full rounded-xl border-[#e0e6db] bg-white h-14 placeholder:text-[#758961] px-4 text-base focus:ring-primary focus:border-primary transition-all"
              placeholder="contact@organisatie.nl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-base font-semibold pb-2">Telefoonnummer</label>
            <input
              className="w-full rounded-xl border-[#e0e6db] bg-white h-14 placeholder:text-[#758961] px-4 text-base focus:ring-primary focus:border-primary transition-all"
              placeholder="06 12345678"
              type="tel"
              value={telefoon}
              onChange={(e) => setTelefoon(e.target.value)}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 py-2">
            <input
              className="mt-1 size-5 rounded text-primary focus:ring-primary border-[#e0e6db]"
              id="terms"
              type="checkbox"
              checked={akkoord}
              onChange={(e) => setAkkoord(e.target.checked)}
            />
            <label className="text-sm leading-normal" htmlFor="terms">
              Ik ga akkoord met de{" "}
              <Link className="text-primary font-bold underline underline-offset-2" href="/algemene-voorwaarden">
                algemene voorwaarden
              </Link>{" "}
              en het{" "}
              <Link className="text-primary font-bold underline underline-offset-2" href="/privacy-policy">
                privacybeleid
              </Link>
              .
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onBack}
              className="sm:w-auto px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Vorige
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center rounded-full h-16 bg-gradient-to-r from-primary to-[#a2f551] text-forest-green text-lg font-black tracking-wide hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                  Bezig met versturen...
                </>
              ) : (
                "Aanmelding versturen"
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[#758961] text-xs font-medium">
            <span className="material-symbols-outlined text-sm">lock</span>
            We gaan zorgvuldig om met je gegevens
          </div>
        </form>
      </div>

      {/* Image Sidebar */}
      <div className="hidden md:block w-1/3 lg:w-2/5 relative min-h-[600px]">
        <img
          alt="Hulpverlener die lacht"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFLcbPLJ8UsPvbxS3qGThdWuuoToT-QGXv81-gTYTE0cfS5EKRn9uZLjpIGuuDPTKD_SnfCSZFVRetYXyfJitU378rZ0ynfyiNBoQ8_V2VDJ8ALBUpeoPNPMPFPq6DTNLW12VuXjKvwHRv3628hKK0k6LnVBxYY_WoFEvx-J9fKqt2WgwsnNaNe24m2UefoG6f1UCDoPnPLlOtQ970ialLYLC4UXP7N-RVZLkpHdIaNs2Ok7xgvIw8ftRrqW0ydX6tNvWCj3qN4g"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-2xl font-bold italic">&ldquo;Samen maken we het verschil in de buurt.&rdquo;</p>
          <p className="text-sm mt-2 opacity-80">— Sarah, Buurtcoördinator</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────── Success Screen ────────────────
function StepSuccess() {
  return (
    <div className="w-full max-w-[720px] mx-auto text-center py-20">
      <div className="bg-white rounded-xl shadow-sm border border-[#e0e6db]/20 p-12 lg:p-20">
        <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
        </div>
        <h1 className="font-heading text-3xl lg:text-4xl font-black leading-tight mb-4">
          Aanmelding ontvangen!
        </h1>
        <p className="text-[#758961] text-lg mb-8 max-w-md mx-auto leading-relaxed">
          Bedankt voor je aanmelding. We nemen binnen 24 uur contact met je op om de verificatie te voltooien.
        </p>
        <div className="flex items-center justify-center gap-4 bg-primary/10 px-6 py-4 rounded-full border border-primary/20 mb-8 mx-auto w-fit">
          <span className="material-symbols-outlined text-primary">mail</span>
          <span className="font-medium">Controleer je inbox voor een bevestigingsmail</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full h-14 px-10 bg-primary text-forest-green text-lg font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Terug naar home
        </Link>
      </div>
    </div>
  );
}

// ──────────────── Main Page ────────────────
export default function AanmeldenPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stepOneData, setStepOneData] = useState<StepOneData>({
    organisatienaam: "",
    kvkNummer: "",
    website: "",
  });

  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    specialisaties: [],
    gemeenten: [],
  });

  const [stepThreeData, setStepThreeData] = useState<StepThreeData>({
    contactNaam: "",
    email: "",
    telefoon: "",
    akkoord: false,
  });

  const handleStepOneNext = (data: StepOneData) => {
    setStepOneData(data);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleStepTwoNext = (data: StepTwoData) => {
    setStepTwoData(data);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = async (data: StepThreeData) => {
    setStepThreeData(data);
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // Create a slug from organisation name
      const slug = stepOneData.organisatienaam
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Create the organisation in Supabase
      const { data: org, error: orgError } = await supabase
        .from("organisations")
        .insert({
          name: stepOneData.organisatienaam,
          slug,
          email: data.email,
          kvk_number: stepOneData.kvkNummer,
          website: stepOneData.website ? `https://${stepOneData.website}` : null,
          specialisaties: stepTwoData.specialisaties,
          gemeente: stepTwoData.gemeenten.join(", "),
          contact_naam: data.contactNaam,
          contact_email: data.email,
          contact_telefoon: data.telefoon,
          status: "pending_verification",
        })
        .select()
        .single();

      if (orgError) {
        console.error("Error creating organisation:", orgError);
        toast.error("Er is iets misgegaan. Probeer het opnieuw.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Aanmelding succesvol verstuurd!");
      setStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pt-28 pb-12 lg:pt-32 lg:pb-20">
        {step === 1 && <StepBasisgegevens onNext={handleStepOneNext} data={stepOneData} />}
        {step === 2 && (
          <StepExpertise
            onNext={handleStepTwoNext}
            onBack={() => { setStep(1); window.scrollTo(0, 0); }}
            data={stepTwoData}
          />
        )}
        {step === 3 && (
          <StepAfronden
            onBack={() => { setStep(2); window.scrollTo(0, 0); }}
            onSubmit={handleFinalSubmit}
            data={stepThreeData}
            isSubmitting={isSubmitting}
          />
        )}
        {step === 4 && <StepSuccess />}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[#758961]">
        <div className="flex justify-center gap-8 mb-4">
          <Link className="hover:text-forest-green transition-colors" href="/privacy-policy">Privacybeleid</Link>
          <Link className="hover:text-forest-green transition-colors" href="/algemene-voorwaarden">Algemene Voorwaarden</Link>
          <Link className="hover:text-forest-green transition-colors" href="/faq">FAQ</Link>
        </div>
        <p>© 2025 HulpRadar Organisatie Portaal. Alle rechten voorbehouden.</p>
      </footer>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>
    </div>
  );
}
