import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Hoe Werkt Het - Stappenplan | HulpRadar",
  description: "Ontdek hoe HulpRadar werkt. In drie simpele stappen van zorgen naar een oplossing. Volledig anoniem en gratis.",
};

export default function HoeHetWerktPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background-light">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-forest-green leading-tight mb-8">
              Hoe werkt HulpRadar?
            </h1>
            <p className="text-xl md:text-2xl text-[#758961] leading-relaxed font-medium">
              In drie simpele stappen van zorgen naar een oplossing. Volledig anoniem en gratis.
            </p>
          </div>
        </section>

        {/* Wat is HulpRadar - Intro Section */}
        <section className="bg-white py-24 md:py-32 border-t border-[#f2f4f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/15 rounded-full blur-3xl"></div>
                  <Image
                    src="/budget-overzicht.jpg"
                    alt="Budget Overzicht - Hoe werkt de radar"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl relative z-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-forest-green text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="material-symbols-outlined text-sm">radar</span>
                  Wat is HulpRadar?
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-forest-green">
                  Jouw radar voor schuldhulp.
                </h2>
                <p className="text-lg text-[#758961] leading-relaxed">
                  HulpRadar is een gratis platform dat jongeren met geldzorgen verbindt met de juiste hulporganisaties. Of je nu schulden hebt, moeite hebt met rondkomen of gewoon advies wilt — wij helpen je de eerste stap te zetten.
                </p>
                <p className="text-lg text-[#758961] leading-relaxed">
                  Je hoeft geen account aan te maken en je gegevens blijven anoniem. Vul simpelweg in waar je hulp bij nodig hebt, in welke gemeente je woont, en wij matchen je met een geverifieerde hulporganisatie bij jou in de buurt.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-forest-green">100%</p>
                    <p className="text-sm text-[#758961] font-medium mt-1">Gratis</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-forest-green">150+</p>
                    <p className="text-sm text-[#758961] font-medium mt-1">Organisaties</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-forest-green">&lt; 24u</p>
                    <p className="text-sm text-[#758961] font-medium mt-1">Reactietijd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Privacy */}
        <section className="bg-background-light py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-forest-green text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Stap 1: Jouw Privacy
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-forest-green">
                  Je privacy staat bij ons altijd voorop.
                </h2>
                <p className="text-lg text-[#758961] leading-relaxed">
                  Hulp zoeken moet veilig en zonder zorgen kunnen. Daarom is anonimiteit de kern van ons platform. We slaan geen persoonlijke data op die naar jou herleidbaar is.
                </p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-forest-green">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">Geen account of registratie verplicht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-forest-green">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">Browsen zonder digitale voetafdruk</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-forest-green">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">End-to-end versleutelde verbinding</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <span className="absolute -top-20 -right-10 text-[180px] font-black opacity-[0.05] pointer-events-none select-none">01</span>
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center rounded-xl shadow-2xl relative z-10"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-hg1Z12CzEiwYcoN-z0pq3wDXlMq0AX2Mew1ccfAIhvDZhbYcvrZhfadJFtFYSj2TdOeRMpN38P8_GaVlGeHjt5SM4xp8VEftcS4EXOnPfxAQpkTiNthvOQicVlekKs_U4xUDB8yx-9JRcrJ_h_-8EtLFg07MWHIe6Z8_iKn4T_VOY7ocrqIQr4H0EomhWpTT1x7qbVby9IQM1LZdNcfEEQKcSWFU2gRzfCgWfxipKAT_dm19PWcMGPQ9CMKZmy6pUx0ijNyDRA')" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Kwaliteitscheck */}
        <section className="bg-[#E8F5E9] py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 relative">
                <span className="absolute -top-20 -left-10 text-[180px] font-black opacity-[0.05] pointer-events-none select-none">02</span>
                <div className="relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center rounded-xl shadow-2xl"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDINOXDfWvk82vsP4GJ3YfKY1Wqw4e_8_0lmxGqX6wRr5AacwBxVGCuMrjDKrqiaofwea3-K3L3ARuXlhHN5uUeTZzIK1SvYfpR7LqDNe6gQ0g06J5B1Vwm2WlInLq4Rry7wEJYNU-mA8RiuObZUTOdEfAjJvwS0ALZpntQPaoZfAqdsxOAeA3gR4GS-SOb3hPNG23LU5P4VGjcGuKK4A_pRYI8kSTe-iP5Qz-0wbjlp3vskopi586KdnqTH8wc_tQUtm7QbqF7Ew')" }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-forest-green text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  Stap 2: Kwaliteitscheck
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-forest-green">
                  Alleen geverifieerde hulporganisaties.
                </h2>
                <p className="text-lg text-[#758961] leading-relaxed">
                  Kwaliteit en integriteit zijn essentieel. Elke instantie op ons platform ondergaat een strenge screening voordat ze het &apos;Konsensi&apos; keurmerk ontvangen. Zo weet je zeker dat je in goede handen bent.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-primary/20 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-forest-green mb-3">fact_check</span>
                    <h4 className="font-bold mb-1">Handmatige screening</h4>
                    <p className="text-sm text-[#758961]">Elke aanmelding wordt door ons team gecontroleerd.</p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-primary/20 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-forest-green mb-3">quickreply</span>
                    <h4 className="font-bold mb-1">Direct contact</h4>
                    <p className="text-sm text-[#758961]">Korte lijnen naar gecertificeerde professionals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Smart Matching */}
        <section className="bg-white py-24 md:py-32 overflow-hidden border-b border-[#f2f4f0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 flex justify-center relative">
                <span className="absolute -top-20 -left-10 text-[180px] font-black opacity-[0.05] pointer-events-none select-none">03</span>
                {/* Phone Mockup */}
                <div className="relative w-[300px] h-[600px] bg-[#192210] rounded-[3rem] p-3 shadow-2xl border-8 border-[#192210] z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#192210] rounded-b-2xl z-20"></div>
                  <div className="bg-white h-full w-full rounded-[2rem] overflow-hidden relative">
                    <div className="bg-primary/10 p-4 pt-10">
                      <div className="h-4 w-24 bg-primary/20 rounded-full mb-4"></div>
                      <div className="h-8 w-48 bg-[#192210] rounded-lg mb-2"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                      <div className="p-4 border border-gray-100 rounded-xl flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-20 bg-primary/40 rounded-full"></div>
                          <div className="size-4 bg-primary rounded-full"></div>
                        </div>
                        <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                        <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-xl flex flex-col gap-2">
                        <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl flex flex-col gap-2">
                        <div className="h-4 w-24 bg-primary/40 rounded-full"></div>
                        <div className="h-10 w-full bg-primary rounded-lg mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-forest-green text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Stap 3: Direct Resultaat
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-forest-green">
                  De beste hulp, dankzij Smart Matching.
                </h2>
                <p className="text-lg text-[#758961] leading-relaxed">
                  Geen eindeloze lijsten en keuzestress. Onze intelligente algoritmes analyseren jouw behoeften en verbinden je direct met de meest relevante hulp in de buurt of digitaal.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="size-12 rounded-xl bg-background-light flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-forest-green">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Lokaal Aanbod</h4>
                      <p className="text-sm text-[#758961]">Vind direct hulp bij jou in de buurt, fysiek of digitaal.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-12 rounded-xl bg-background-light flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-forest-green">auto_awesome</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Gepersonaliseerd</h4>
                      <p className="text-sm text-[#758961]">De resultaten worden aangepast op basis van jouw specifieke situatie.</p>
                    </div>
                  </div>
                </div>
                <Link href="/#zoek-hulp" className="mt-4 px-10 py-5 bg-forest-green text-white font-bold rounded-full w-fit hover:scale-105 transition-transform shadow-lg shadow-forest-green/20">
                  Start je gratis zoekopdracht
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-background-light">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-forest-green">
              Klaar om de juiste hulp te vinden?
            </h2>
            <p className="text-xl text-[#758961] max-w-2xl">
              Het is tijd om de eerste stap te zetten naar een oplossing. Volledig anoniem, veilig en zonder enige verplichting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/#zoek-hulp" className="px-10 py-5 bg-primary text-[#192210] font-extrabold rounded-full text-lg hover:shadow-xl hover:shadow-primary/30 transition-all">
                Zoek direct hulp
              </Link>
              <Link href="/voor-organisaties" className="px-10 py-5 bg-forest-green text-white font-extrabold rounded-full text-lg hover:opacity-90 transition-all">
                Hulporganisaties bekijken
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
