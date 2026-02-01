"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function HulpRadarLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor" />
      <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/#zoek-hulp?gemeente=${encodeURIComponent(searchQuery)}`);
      // Scroll to form section
      const el = document.getElementById("zoek-hulp");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-foreground transition-colors duration-300">
      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px]">
        <div className="glass-nav rounded-full px-8 py-3 flex items-center justify-between shadow-soft-green">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary">
              <HulpRadarLogo />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">HulpRadar</h2>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/hoe-het-werkt" className="text-sm font-semibold hover:text-primary transition-colors">Hoe het werkt</Link>
            <Link href="/over-ons" className="text-sm font-semibold hover:text-primary transition-colors">Over ons</Link>
            <a href="#hulpverleners" className="text-sm font-semibold hover:text-primary transition-colors">Hulpverleners</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="px-6 py-2 text-sm font-bold bg-secondary rounded-full">
              Voor organisaties
            </Link>
            <Link href="#zoek-hulp" className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20">
              Hulp zoeken
            </Link>
          </div>
        </div>
      </nav>

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
                <img
                  className="w-full h-[500px] object-cover"
                  alt="Jongere die opgelucht op smartphone kijkt"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWLY2fk_D85QkPw432r_or1ftKet5UM92g4w-l0qGZUHlTQlzXZdLZLrZld2MiGFm_GCLyILS0AXOc-edH_bsQDXwRteEw_JdgltQswEOZn0rV_E0gO-nvfPDMG5II8CslvjYJD8e63D3GsRW37zh0M0G-kGDLSYGxWIu7D-jU1Axz4r4lYe8MyADOb8OqlrlTeIHTPwy2RbTuRSI6JY04VKrsU8YhcCwj-AE59yYWhVyikvhBSNJp4Nl3gnZsaIe0iCYO5dK-A"
                />

                {/* Floating Match Card */}
                <div className="absolute top-10 -left-8 bg-card p-4 rounded-2xl shadow-soft-green flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-primary size-10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">favorite</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Hulp Radar</p>
                    <p className="text-sm font-extrabold">Match gevonden!</p>
                  </div>
                </div>
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
                <a
                  href="#zoek-hulp"
                  className="bg-forest-green text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform inline-block"
                >
                  Ik wil hulp vinden
                </a>
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
                <div className="text-primary">
                  <HulpRadarLogo />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight">HulpRadar</h2>
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
                <li><a className="hover:text-primary transition-colors" href="#hulpverleners">Hulpverleners</a></li>
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
