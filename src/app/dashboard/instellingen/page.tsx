"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Link from "next/link";

interface Organisation {
  id: string;
  name: string;
  email: string;
  website: string | null;
  kvk_number: string | null;
  specialisaties: string[] | null;
  gemeente: string | null;
  contact_naam: string | null;
  contact_email: string | null;
  contact_telefoon: string | null;
  max_capacity: number | null;
  current_capacity: number | null;
  status: string;
}

export default function InstellingenPage() {
  const [org, setOrg] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [contactNaam, setContactNaam] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTelefoon, setContactTelefoon] = useState("");
  const [website, setWebsite] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(10);

  useEffect(() => {
    fetchOrg();
  }, []);

  async function fetchOrg() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: orgUser } = await supabase
      .from("organisation_users")
      .select("organisation_id")
      .eq("user_id", user.id)
      .single();

    if (!orgUser?.organisation_id) { setLoading(false); return; }

    const { data } = await supabase
      .from("organisations")
      .select("*")
      .eq("id", orgUser.organisation_id)
      .single();

    if (data) {
      setOrg(data as unknown as Organisation);
      setContactNaam(data.contact_naam || "");
      setContactEmail(data.contact_email || data.email || "");
      setContactTelefoon(data.contact_telefoon || "");
      setWebsite(data.website || "");
      setMaxCapacity(data.max_capacity || 10);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!org) return;
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("organisations")
      .update({
        contact_naam: contactNaam,
        contact_email: contactEmail,
        contact_telefoon: contactTelefoon,
        website,
        max_capacity: maxCapacity,
      })
      .eq("id", org.id);

    if (error) {
      toast.error("Opslaan mislukt. Probeer het opnieuw.");
      console.error(error);
    } else {
      toast.success("Instellingen opgeslagen!");
      fetchOrg();
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="text-center py-20">
        <p className="text-[#618964]">Geen organisatie gevonden.</p>
      </div>
    );
  }

  const statusLabel: Record<string, { text: string; color: string }> = {
    pending_verification: { text: "Wacht op verificatie", color: "bg-amber-50 text-amber-700" },
    verified: { text: "Geverifieerd", color: "bg-emerald-50 text-emerald-700" },
    active: { text: "Actief", color: "bg-emerald-50 text-emerald-700" },
    suspended: { text: "Geschorst", color: "bg-red-50 text-red-700" },
  };
  const st = statusLabel[org.status] || statusLabel.pending_verification;

  return (
    <>
      {/* Header */}
      <div className="mb-12 px-4">
        <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mb-3">Instellingen</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Organisatie <span className="text-primary/90">Beheer</span>
        </h2>
        <p className="text-[#618964] text-lg mt-4 font-medium">
          Beheer je organisatieprofiel, contactgegevens en capaciteit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Organisation Info Card */}
          <div className="bg-white rounded-[24px] shadow-soft-green border border-white p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Organisatiegegevens</h3>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${st.color}`}>
                {st.text}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Organisatienaam</label>
                <div className="w-full rounded-xl bg-[#F0F4F0]/50 border border-[#e0e6db] py-3 px-4 text-sm font-medium text-gray-500">
                  {org.name}
                </div>
                <p className="text-[10px] text-[#618964] mt-1">Neem contact op met support om de naam te wijzigen.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">KVK-nummer</label>
                  <div className="w-full rounded-xl bg-[#F0F4F0]/50 border border-[#e0e6db] py-3 px-4 text-sm font-medium text-gray-500">
                    {org.kvk_number || "—"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-[#e0e6db] py-3 px-4 text-sm focus:ring-primary focus:border-primary"
                    placeholder="https://www.organisatie.nl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Specialisaties</label>
                <div className="flex flex-wrap gap-2">
                  {org.specialisaties?.map((s) => (
                    <span key={s} className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {s}
                    </span>
                  )) || <span className="text-sm text-gray-400">Geen specialisaties</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Werkgebied</label>
                <div className="text-sm font-medium">{org.gemeente || "Niet ingesteld"}</div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-[24px] shadow-soft-green border border-white p-8 md:p-10">
            <h3 className="text-xl font-bold mb-8">Contactpersoon</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Naam contactpersoon</label>
                <input
                  type="text"
                  value={contactNaam}
                  onChange={(e) => setContactNaam(e.target.value)}
                  className="w-full rounded-xl border border-[#e0e6db] py-3 px-4 text-sm focus:ring-primary focus:border-primary"
                  placeholder="Jan Janssen"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">E-mailadres</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#e0e6db] py-3 px-4 text-sm focus:ring-primary focus:border-primary"
                    placeholder="contact@organisatie.nl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Telefoonnummer</label>
                  <input
                    type="tel"
                    value={contactTelefoon}
                    onChange={(e) => setContactTelefoon(e.target.value)}
                    className="w-full rounded-xl border border-[#e0e6db] py-3 px-4 text-sm focus:ring-primary focus:border-primary"
                    placeholder="06 12345678"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Capacity Card */}
          <div className="bg-white rounded-[24px] shadow-soft-green border border-white p-8">
            <h3 className="text-xl font-bold mb-2">Capaciteit</h3>
            <p className="text-sm text-[#618964] mb-6">Stel in hoeveel actieve cliënten je tegelijk kunt ondersteunen.</p>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-[#618964] uppercase tracking-widest">Huidige bezetting</span>
                <span className="text-2xl font-black">{org.current_capacity || 0}<span className="text-sm font-medium text-[#618964]"> / {maxCapacity}</span></span>
              </div>
              <div className="h-3 bg-[#F0F4F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((org.current_capacity || 0) / maxCapacity) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#618964] uppercase tracking-widest mb-2">Max. capaciteit</label>
              <input
                type="number"
                min={1}
                max={100}
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-[#e0e6db] py-3 px-4 text-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-[#1B3022] rounded-[24px] p-8 text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Account Info
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="font-bold">{st.text}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lid sinds</span>
                <span className="font-bold">2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email notificaties</span>
                <span className="font-bold text-primary">Aan</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-full transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined">save</span>
                Wijzigingen opslaan
              </>
            )}
          </button>
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
