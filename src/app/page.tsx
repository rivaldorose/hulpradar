"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/hulp-zoeken?woonplaats=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/hulp-zoeken");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-foreground transition-colors duration-300">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-4 md:px-20 lg:px-[120px] max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Column */}
            <div className="w-full lg:w-3/5 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-[#2d4f07] dark:text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">verified_user</span>
                100% gratis en anoniem
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Schulden? Je hoeft het niet alleen op te lossen.
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl font-medium">
                Vind anoniem de juiste hulp die bij jouw situatie past. Speciaal ontwikkeld voor en door jongeren.
              </p>

              <div className="relative max-w-2xl" id="zoek-hulp">
                <div className="bg-card rounded-full p-2 flex items-center shadow-soft-green border border-border">
                  <span className="material-symbols-outlined text-muted-foreground ml-4">search</span>
                  <input
                    className="w-full border-none focus:ring-0 focus:outline-none bg-transparent text-lg px-4 placeholder:text-muted-foreground"
                    placeholder="Zoek hulp in jouw buurt..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Zoeken
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-2/5 relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  className="w-full h-[500px] object-cover"
                  alt="Illustratie van hulpverlener en jongere met telefoon"
                  src="/hero-illustratie.jpg"
                  width={1024}
                  height={768}
                />

              </div>

              {/* Background Decor */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0" />
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-20 px-4 md:px-[120px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card/40 backdrop-blur-sm p-8 rounded-3xl border border-border shadow-soft-green">
                <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest mb-2">Impact</p>
                <h3 className="text-4xl font-extrabold">5.000+</h3>
                <p className="text-muted-foreground mt-2">Jongeren succesvol geholpen</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-8 rounded-3xl border border-border shadow-soft-green">
                <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest mb-2">Snelheid</p>
                <h3 className="text-4xl font-extrabold">&lt; 24 uur</h3>
                <p className="text-muted-foreground mt-2">Gemiddelde reactietijd</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-8 rounded-3xl border border-border shadow-soft-green">
                <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest mb-2">Netwerk</p>
                <h3 className="text-4xl font-extrabold">150+</h3>
                <p className="text-muted-foreground mt-2">Geverifieerde partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hoe het werkt Section */}
        <section id="hoe-het-werkt" className="py-32 px-4 md:px-[120px] max-w-[1440px] mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Hoe het werkt</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              In drie simpele stappen naar een zorgeloze financiële toekomst. Volledig anoniem en zonder verplichtingen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-card p-10 rounded-[2rem] shadow-soft-green relative group hover:-translate-y-2 transition-transform duration-300 border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg shadow-primary/30">1</div>
              <h3 className="text-2xl font-bold mb-4">Vertel je verhaal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vul een korte vragenlijst in over je huidige situatie. Je hoeft je naam niet op te geven als je dat niet wilt.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-card p-10 rounded-[2rem] shadow-soft-green relative group hover:-translate-y-2 transition-transform duration-300 border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg shadow-primary/30">2</div>
              <h3 className="text-2xl font-bold mb-4">Wij zoeken een match</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ons algoritme koppelt je aan de beste lokale hulpverlener die gespecialiseerd is in jouw type situatie.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-card p-10 rounded-[2rem] shadow-soft-green relative group hover:-translate-y-2 transition-transform duration-300 border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg shadow-primary/30">3</div>
              <h3 className="text-2xl font-bold mb-4">Start je traject</h3>
              <p className="text-muted-foreground leading-relaxed">
                Maak vrijblijvend kennis met je hulpverlener en werk samen aan een duurzame oplossing voor je schulden.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="hulpverleners" className="px-4 md:px-[120px] pb-32">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-heading font-black text-forest-green max-w-4xl mx-auto leading-tight">
                Klaar om de eerste stap te zetten?
              </h2>
              <p className="text-forest-green/80 text-xl font-medium max-w-xl mx-auto">
                Het kost je niets, behalve een paar minuten van je tijd. We staan voor je klaar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/hulp-zoeken"
                  className="bg-forest-green text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform inline-block"
                >
                  Ik wil hulp vinden
                </Link>
                <Link
                  href="/login"
                  className="bg-white text-forest-green px-10 py-5 rounded-full text-lg font-bold hover:bg-opacity-90 transition-colors inline-block"
                >
                  Ik ben hulpverlener
                </Link>
              </div>
            </div>

            {/* Abstract Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-green/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-forest-green text-white rounded-t-[32px] pt-20 pb-10 px-4 md:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-hulpradar.png"
                  alt="Konsensi Hulp Radar"
                  width={372}
                  height={191}
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-white/60">
                Samen maken we een einde aan schuldzorgen onder jongeren. Anoniem, gratis en altijd in de buurt.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Navigatie</h4>
              <ul className="space-y-4 text-white/60">
                <li><Link className="hover:text-primary transition-colors" href="/hoe-het-werkt">Hoe het werkt</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/over-ons">Over ons</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/hulporganisaties">Hulpverleners</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="/faq">Veelgestelde vragen</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li>info@hulpradar.nl</li>
                <li>0800-1234567</li>
                <li>Amsterdam, Nederland</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Volg ons</h4>
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">share</span>
                </div>
                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">group</span>
                </div>
                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">camera</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
            <p>&copy; 2025 HulpRadar. Alle rechten voorbehouden.</p>
            <div className="flex gap-8">
              <Link className="hover:text-white" href="/privacy-policy">Privacyverklaring</Link>
              <Link className="hover:text-white" href="/algemene-voorwaarden">Algemene voorwaarden</Link>
              <a className="hover:text-white" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
