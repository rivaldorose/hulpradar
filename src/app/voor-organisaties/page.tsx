import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Voor Organisaties - HulpRadar",
  description: "Word partner van HulpRadar en bereik jongeren die op zoek zijn naar schuldhulp. Gratis aanmelden, geverifieerd keurmerk, slimme matching.",
};

export default function VoorOrganisatiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5] text-[#1A1A1A]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <header className="pt-40 pb-[120px] px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-forest-green leading-[1.1] mb-6">
                Laat jongeren jullie vinden
              </h1>
              <p className="text-lg text-forest-green/70 mb-10 leading-relaxed">
                Verbind jullie organisatie met lokale jongeren die op zoek zijn naar ondersteuning. Een professioneel profiel op HulpRadar zorgt voor vertrouwen, zichtbaarheid en de juiste matches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#aanmelden"
                  className="bg-primary hover:bg-[#72d411] text-forest-green font-bold py-5 px-10 rounded-full text-lg shadow-lg hover:scale-[1.02] transition-all text-center"
                >
                  Meld je aan
                </a>
                <Link
                  href="/#hoe-het-werkt"
                  className="bg-white border-2 border-forest-green/10 text-forest-green font-bold py-5 px-10 rounded-full text-lg hover:bg-forest-green hover:text-white transition-all text-center"
                >
                  Bekijk demo
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[24px] overflow-hidden shadow-soft-green border border-white/50 bg-white p-2">
                <img
                  alt="Organisatie Dashboard"
                  className="rounded-[18px] w-full aspect-[4/3] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF1FtLFuBoIE3_cBmJzhbMd7qiNGGfgD7WEwdv-BETdCbHr683o6fXqsK-FCB58UfkmH7g2XZl_vD5QTJ279up_5BPgKQyAXcN5XZaclV0zpgT_DzMpAhVIPvSt0t2x99tIosFEFwvP7DvDaOrWjda1QKIso2Jt6cv9sLGv4hXca5k9lxMIp9S1eZTXtVtlefRlXcRQ0iEuKRTfOa6E4UVslDLxJ5jkXvf95q7nDvHx2V4pGyZsBU_9dgExvgJG-OtmeQM38lZPQ"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[24px] shadow-xl max-w-[200px] border border-forest-green/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span className="font-bold text-sm">Geverifieerd</span>
                </div>
                <p className="text-xs text-forest-green/60">Uw organisatie is nu zichtbaar voor 500+ lokale jongeren.</p>
              </div>
            </div>
          </div>
        </header>

        {/* Waarom HulpRadar Section */}
        <section className="py-[120px] bg-white/50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl font-bold text-forest-green mb-4">Waarom HulpRadar?</h2>
              <p className="text-forest-green/60 max-w-2xl mx-auto">
                Wij helpen organisaties om hun impact te vergroten door de drempel voor jongeren zo laag mogelijk te maken.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-4 rounded-[24px] shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img
                    alt="Meer zichtbaarheid"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr9nA9BBo7-SUq51lWSWjIDQcp4-PTqFec8GG_2FGhPoVJARFygwVCoFS--QDax9qntRYtpNtJ94wlBTC8vCmvlpi6aW5zZbNNsuiyLIL6D7qpHLO0v7Uy0UWDdKYvo-xMK19foEmjYab4H2NrJQgIAcmNnY5gzE6AwTd-4libhPd1TiHRuHTJ6Hz-5FB4NvoRN_nCA-dhNYGF2bOllfNSRLod7VDS-rLYbdwg_bPGHWGHK_2td8uZUmNJ-_jxeV1AeG6HB6VjoQ"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="font-heading text-xl font-bold text-forest-green mb-2">Meer zichtbaarheid</h3>
                  <p className="text-forest-green/70">Word gevonden door jongeren in uw regio die specifiek op zoek zijn naar de hulp die u biedt.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-[24px] shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img
                    alt="Konsensi Geverifieerd"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV1UkgBhXlsam9ggbMTyk_pNIkRJZhcXFK2XxRp0kTr3tbq0c-f9g-GjJ28omyie5NU5vyVRkwYapv7nNdM5iWMYFQQnR9TnRkIveln3mnqpFxY9r1GY6BR3CcdTwH8CBXIpEDy2gUwLkrGg4CFwvxKNagsZB06f-7W3-jDrKMfo7L9gwkomMpCU-MI_WTmVt33uc1MgS0v6CQg7wbYy7b9mtS0hggW81dSSsOlGbRRSM-Zio3nL_t-Q7ZtvzhnUUtfR4Q8Gdziw"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="font-heading text-xl font-bold text-forest-green mb-2">Konsensi Geverifieerd</h3>
                  <p className="text-forest-green/70">Bouw direct vertrouwen op met ons keurmerk. Jongeren weten dat ze bij u in veilige handen zijn.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-[24px] shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img
                    alt="Gratis aanmelden"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF1FtLFuBoIE3_cBmJzhbMd7qiNGGfgD7WEwdv-BETdCbHr683o6fXqsK-FCB58UfkmH7g2XZl_vD5QTJ279up_5BPgKQyAXcN5XZaclV0zpgT_DzMpAhVIPvSt0t2x99tIosFEFwvP7DvDaOrWjda1QKIso2Jt6cv9sLGv4hXca5k9lxMIp9S1eZTXtVtlefRlXcRQ0iEuKRTfOa6E4UVslDLxJ5jkXvf95q7nDvHx2V4pGyZsBU_9dgExvgJG-OtmeQM38lZPQ"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="font-heading text-xl font-bold text-forest-green mb-2">Gratis aanmelden</h3>
                  <p className="text-forest-green/70">Begin vandaag nog zonder kosten. Maak uw profiel aan en start met het ontvangen van matches.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Stappen Section */}
        <section className="py-[120px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl font-bold text-forest-green">In 3 stappen online</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-forest-green text-3xl font-bold mb-8 shadow-lg">1</div>
                <h3 className="font-heading text-xl font-bold text-forest-green mb-4">Meld je aan</h3>
                <p className="text-forest-green/60">Vul uw organisatiegegevens in en beschrijf uw diensten.</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-forest-green text-3xl font-bold mb-8 shadow-lg">2</div>
                <h3 className="font-heading text-xl font-bold text-forest-green mb-4">Word geverifieerd</h3>
                <p className="text-forest-green/60">Ons team controleert uw aanmelding om de veiligheid te garanderen.</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-forest-green text-3xl font-bold mb-8 shadow-lg">3</div>
                <h3 className="font-heading text-xl font-bold text-forest-green mb-4">Ontvang matches</h3>
                <p className="text-forest-green/60">Jongeren kunnen direct contact opnemen of een hulpvraag sturen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA + Aanmeld Formulier */}
        <section id="aanmelden" className="mx-6 mb-12">
          <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-forest-green to-[#2E7D32] rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" fill="white" viewBox="0 0 100 100">
                <circle cx="100" cy="0" r="80" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Klaar om impact te maken?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Sluit u aan bij het netwerk van professionele organisaties en help ons de zorg voor jongeren te transformeren.
                </p>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-forest-green bg-gray-200 overflow-hidden">
                      <img className="object-cover w-full h-full" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF1FtLFuBoIE3_cBmJzhbMd7qiNGGfgD7WEwdv-BETdCbHr683o6fXqsK-FCB58UfkmH7g2XZl_vD5QTJ279up_5BPgKQyAXcN5XZaclV0zpgT_DzMpAhVIPvSt0t2x99tIosFEFwvP7DvDaOrWjda1QKIso2Jt6cv9sLGv4hXca5k9lxMIp9S1eZTXtVtlefRlXcRQ0iEuKRTfOa6E4UVslDLxJ5jkXvf95q7nDvHx2V4pGyZsBU_9dgExvgJG-OtmeQM38lZPQ" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-forest-green bg-gray-200 overflow-hidden">
                      <img className="object-cover w-full h-full" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr9nA9BBo7-SUq51lWSWjIDQcp4-PTqFec8GG_2FGhPoVJARFygwVCoFS--QDax9qntRYtpNtJ94wlBTC8vCmvlpi6aW5zZbNNsuiyLIL6D7qpHLO0v7Uy0UWDdKYvo-xMK19foEmjYab4H2NrJQgIAcmNnY5gzE6AwTd-4libhPd1TiHRuHTJ6Hz-5FB4NvoRN_nCA-dhNYGF2bOllfNSRLod7VDS-rLYbdwg_bPGHWGHK_2td8uZUmNJ-_jxeV1AeG6HB6VjoQ" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-forest-green bg-gray-200 overflow-hidden">
                      <img className="object-cover w-full h-full" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV1UkgBhXlsam9ggbMTyk_pNIkRJZhcXFK2XxRp0kTr3tbq0c-f9g-GjJ28omyie5NU5vyVRkwYapv7nNdM5iWMYFQQnR9TnRkIveln3mnqpFxY9r1GY6BR3CcdTwH8CBXIpEDy2gUwLkrGg4CFwvxKNagsZB06f-7W3-jDrKMfo7L9gwkomMpCU-MI_WTmVt33uc1MgS0v6CQg7wbYy7b9mtS0hggW81dSSsOlGbRRSM-Zio3nL_t-Q7ZtvzhnUUtfR4Q8Gdziw" />
                    </div>
                  </div>
                  <p className="text-sm font-medium">Al 150+ organisaties gingen u voor</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[24px] shadow-2xl">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-forest-green mb-1">Organisatienaam</label>
                    <input
                      className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary py-3 px-4"
                      placeholder="Bijv. Stichting Jeugd"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-forest-green mb-1">E-mailadres</label>
                    <input
                      className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary py-3 px-4"
                      placeholder="info@organisatie.nl"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-forest-green mb-1">Type organisatie</label>
                    <select className="w-full rounded-xl border-gray-200 focus:ring-primary focus:border-primary py-3 px-4">
                      <option>Welzijnsorganisatie</option>
                      <option>Zorginstelling</option>
                      <option>Vrijwilligersorganisatie</option>
                      <option>Anders</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-primary hover:bg-[#72d411] text-forest-green font-bold py-4 rounded-xl text-lg transition-all mt-4"
                  >
                    Start gratis aanmelding
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-4">
                    Door aan te melden gaat u akkoord met onze Algemene Voorwaarden.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
