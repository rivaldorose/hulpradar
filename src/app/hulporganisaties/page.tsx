import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Partners & Directory - HulpRadar",
  description: "Word onderdeel van het meest vertrouwde netwerk voor jongerenhulp. Bekijk onze geverifieerde partners.",
};

const partners = [
  { name: "JeugdZorg NL", location: "Utrecht", sector: "GGZ" },
  { name: "Welzijn Groep", location: "Amsterdam", sector: "Welzijn" },
  { name: "De Luisterlijn", location: "Landelijk", sector: "Support" },
  { name: "Coach4U", location: "Rotterdam", sector: "Coaching" },
  { name: "Impact Kids", location: "Eindhoven", sector: "Jeugd" },
  { name: "Safe Space", location: "Den Haag", sector: "Veiligheid" },
  { name: "Buddy NL", location: "Utrecht", sector: "Buddy" },
  { name: "Samen Sterk", location: "Nijmegen", sector: "Maatschappelijk" },
];

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBF1FtLFuBoIE3_cBmJzhbMd7qiNGGfgD7WEwdv-BETdCbHr683o6fXqsK-FCB58UfkmH7g2XZl_vD5QTJ279up_5BPgKQyAXcN5XZaclV0zpgT_DzMpAhVIPvSt0t2x99tIosFEFwvP7DvDaOrWjda1QKIso2Jt6cv9sLGv4hXca5k9lxMIp9S1eZTXtVtlefRlXcRQ0iEuKRTfOa6E4UVslDLxJ5jkXvf95q7nDvHx2V4pGyZsBU_9dgExvgJG-OtmeQM38lZPQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCr9nA9BBo7-SUq51lWSWjIDQcp4-PTqFec8GG_2FGhPoVJARFygwVCoFS--QDax9qntRYtpNtJ94wlBTC8vCmvlpi6aW5zZbNNsuiyLIL6D7qpHLO0v7Uy0UWDdKYvo-xMK19foEmjYab4H2NrJQgIAcmNnY5gzE6AwTd-4libhPd1TiHRuHTJ6Hz-5FB4NvoRN_nCA-dhNYGF2bOllfNSRLod7VDS-rLYbdwg_bPGHWGHK_2td8uZUmNJ-_jxeV1AeG6HB6VjoQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBV1UkgBhXlsam9ggbMTyk_pNIkRJZhcXFK2XxRp0kTr3tbq0c-f9g-GjJ28omyie5NU5vyVRkwYapv7nNdM5iWMYFQQnR9TnRkIveln3mnqpFxY9r1GY6BR3CcdTwH8CBXIpEDy2gUwLkrGg4CFwvxKNagsZB06f-7W3-jDrKMfo7L9gwkomMpCU-MI_WTmVt33uc1MgS0v6CQg7wbYy7b9mtS0hggW81dSSsOlGbRRSM-Zio3nL_t-Q7ZtvzhnUUtfR4Q8Gdziw",
];

export default function HulporganisatiesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 bg-background-light">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-forest-green leading-[1.05] mb-8">
                Laat jongeren jullie vinden
              </h1>
              <p className="text-xl text-forest-green/70 mb-10 leading-relaxed">
                Word onderdeel van het meest vertrouwde netwerk voor jongerenhulp. Maak jullie diensten zichtbaar en bereik direct de juiste doelgroep in jullie regio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/voor-organisaties" className="bg-primary hover:bg-[#72d411] text-forest-green font-bold py-5 px-10 rounded-full text-lg shadow-lg hover:scale-[1.02] transition-all text-center">
                  Meld je aan
                </Link>
                <a href="#directory" className="bg-white border-2 border-forest-green/10 text-forest-green font-bold py-5 px-10 rounded-full text-lg hover:bg-forest-green hover:text-white transition-all text-center">
                  Bekijk directory
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-soft-green border border-white p-2 bg-white">
                <img
                  alt="Professional Partner"
                  className="rounded-3xl w-full aspect-[4/5] lg:aspect-square object-cover"
                  src={images[0]}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl max-w-[220px] border border-forest-green/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span className="font-bold text-sm text-forest-green">Geverifieerd Partner</span>
                </div>
                <p className="text-xs text-forest-green/60">Samen bouwen we aan een veiligere toekomst voor de jeugd.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-soft-green border border-gray-50 flex flex-col h-full">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                  <img alt="Zichtbaarheid" className="w-full h-full object-cover" src={images[1]} />
                </div>
                <h3 className="text-2xl font-bold text-forest-green mb-4">Directe zichtbaarheid</h3>
                <p className="text-forest-green/70 leading-relaxed">Presenteer uw organisatie op een platform waar dagelijks honderden jongeren zoeken naar specifieke hulp en ondersteuning.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-soft-green border border-gray-50 flex flex-col h-full">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                  <img alt="Verificatie" className="w-full h-full object-cover" src={images[2]} />
                </div>
                <h3 className="text-2xl font-bold text-forest-green mb-4">Geverifieerd vertrouwen</h3>
                <p className="text-forest-green/70 leading-relaxed">Ons verificatieproces bevestigt uw expertise. Dit verlaagt de drempel voor jongeren om die eerste, belangrijke stap te zetten.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-soft-green border border-gray-50 flex flex-col h-full">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                  <img alt="Matching" className="w-full h-full object-cover" src={images[0]} />
                </div>
                <h3 className="text-2xl font-bold text-forest-green mb-4">Slimme matching</h3>
                <p className="text-forest-green/70 leading-relaxed">Onze algoritmes verbinden uw specifieke aanbod aan de juiste hulpvragen, zodat u effectiever kunt helpen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Directory */}
        <section id="directory" className="py-24 md:py-32 bg-background-light">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="font-heading text-4xl font-bold text-forest-green mb-4">Al 200+ partners gingen je voor</h2>
                <p className="text-forest-green/60">Bekijk wie er al actief zijn op het HulpRadar platform.</p>
              </div>
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    className="w-full md:w-80 rounded-full border-gray-200 py-3 pl-12 pr-4 focus:ring-primary focus:border-primary bg-white"
                    placeholder="Zoek op naam of stad..."
                    type="text"
                    readOnly
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              <span className="bg-primary text-forest-green font-bold py-2 px-6 rounded-full text-sm">Alle sectoren</span>
              <span className="bg-white border border-gray-200 text-forest-green py-2 px-6 rounded-full text-sm">GGZ</span>
              <span className="bg-white border border-gray-200 text-forest-green py-2 px-6 rounded-full text-sm">Welzijn</span>
              <span className="bg-white border border-gray-200 text-forest-green py-2 px-6 rounded-full text-sm">Jeugdzorg</span>
              <span className="bg-white border border-gray-200 text-forest-green py-2 px-6 rounded-full text-sm">Onderwijs</span>
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Logo"
                      className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all"
                      src={images[index % images.length]}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="font-bold text-forest-green">{partner.name}</h4>
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  </div>
                  <p className="text-xs text-forest-green/50">{partner.location} • {partner.sector}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/voor-organisaties" className="bg-white border-2 border-forest-green/10 text-forest-green font-bold py-4 px-10 rounded-full hover:border-primary transition-all inline-block">
                Bekijk alle partners
              </Link>
            </div>
          </div>
        </section>

        {/* How it works for organisations */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl font-bold text-forest-green mb-4">Hoe het werkt</h2>
              <p className="text-forest-green/60">In drie eenvoudige stappen naar een professionele aanwezigheid op HulpRadar.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-12 relative">
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-forest-green text-2xl font-bold mb-6 shadow-lg border-4 border-white">1</div>
                <h3 className="text-xl font-bold text-forest-green mb-3">Meld je aan</h3>
                <p className="text-forest-green/60 text-sm">Maak binnen 5 minuten een profiel aan voor uw organisatie.</p>
              </div>
              <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gray-100 -z-0"></div>
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-forest-green text-2xl font-bold mb-6 shadow-lg border-4 border-white">2</div>
                <h3 className="text-xl font-bold text-forest-green mb-3">Word geverifieerd</h3>
                <p className="text-forest-green/60 text-sm">Wij controleren uw gegevens om de kwaliteit van ons netwerk te waarborgen.</p>
              </div>
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-forest-green text-2xl font-bold mb-6 shadow-lg border-4 border-white">3</div>
                <h3 className="text-xl font-bold text-forest-green mb-3">Ontvang matches</h3>
                <p className="text-forest-green/60 text-sm">Start met het ontvangen van relevante vragen van jongeren uit de regio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA with Form */}
        <section className="px-6 py-24">
          <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[3rem] p-8 lg:p-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <circle cx="90" cy="10" fill="white" r="40" />
                <circle cx="10" cy="90" fill="white" r="30" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-2xl w-full max-w-2xl text-center">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-forest-green mb-4">Jouw organisatie ook op de radar?</h2>
                <p className="text-forest-green/60 mb-10">Laat je gegevens achter en wij nemen binnen 24 uur contact met je op.</p>
                <form className="space-y-4 max-w-md mx-auto">
                  <input
                    className="w-full rounded-full border border-gray-200 py-3 px-6 focus:ring-primary focus:border-primary"
                    placeholder="Naam organisatie"
                    type="text"
                  />
                  <input
                    className="w-full rounded-full border border-gray-200 py-3 px-6 focus:ring-primary focus:border-primary"
                    placeholder="E-mailadres"
                    type="email"
                  />
                  <select className="w-full rounded-full border border-gray-200 py-3 px-6 focus:ring-primary focus:border-primary appearance-none bg-white">
                    <option>Type organisatie</option>
                    <option>Welzijn</option>
                    <option>Zorg</option>
                    <option>Vrijwilligers</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#72d411] text-forest-green font-bold py-4 rounded-full text-lg transition-all shadow-lg hover:translate-y-[-2px] mt-4"
                  >
                    Verstuur aanvraag
                  </button>
                </form>
                <p className="text-[11px] text-gray-400 mt-6">
                  Door te versturen ga je akkoord met onze{" "}
                  <Link href="/privacy-policy" className="underline hover:text-forest-green">privacyverklaring</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
