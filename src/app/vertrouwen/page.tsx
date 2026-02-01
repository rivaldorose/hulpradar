import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vertrouwen & Privacy - HulpRadar",
  description: "Ontdek hoe HulpRadar jouw privacy beschermt, alleen geverifieerde organisaties toelaat en slimme matching gebruikt om je te helpen.",
};

export default function VertrouwenPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-foreground transition-colors duration-300">
      <Header />

      <main className="flex-1 pt-20">
        {/* Feature Block 1: Anonymity (Image Left, Text Right) */}
        <section className="bg-[#FAFDF7] dark:bg-background-dark py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center rounded-xl shadow-2xl"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-hg1Z12CzEiwYcoN-z0pq3wDXlMq0AX2Mew1ccfAIhvDZhbYcvrZhfadJFtFYSj2TdOeRMpN38P8_GaVlGeHjt5SM4xp8VEftcS4EXOnPfxAQpkTiNthvOQicVlekKs_U4xUDB8yx-9JRcrJ_h_-8EtLFg07MWHIe6Z8_iKn4T_VOY7ocrqIQr4H0EomhWpTT1x7qbVby9IQM1LZdNcfEEQKcSWFU2gRzfCgWfxipKAT_dm19PWcMGPQ9CMKZmy6pUx0ijNyDRA')",
                    }}
                    role="img"
                    aria-label="Jongere die ontspannen op de bank een smartphone gebruikt"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Privacy Eerst
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
                  Je privacy staat bij ons altijd voorop.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hulp zoeken moet veilig en zonder zorgen kunnen. Daarom is anonimiteit de kern van ons platform. We slaan geen persoonlijke data op die naar jou herleidbaar is.
                </p>

                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">Geen account of registratie verplicht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">Browsen zonder digitale voetafdruk</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-base font-medium">End-to-end versleutelde verbinding</span>
                  </li>
                </ul>

                <Link
                  href="/over-ons"
                  className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full w-fit hover:scale-105 transition-transform inline-block"
                >
                  Lees meer over privacy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Block 2: Verified (Text Left, Image Right) */}
        <section className="bg-[#E8F5E9] dark:bg-background-dark/50 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="flex items-center gap-3 p-3 bg-card dark:bg-white/5 rounded-2xl border border-primary/30 w-fit shadow-sm">
                  <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Geverifieerd Keurmerk</p>
                    <p className="text-sm font-extrabold">Konsensi Geverifieerd</p>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
                  Alleen geverifieerde hulporganisaties.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kwaliteit en integriteit zijn essentieel. Elke instantie op ons platform ondergaat een strenge screening voordat ze het &apos;Konsensi&apos; keurmerk ontvangen. Zo weet je zeker dat je in goede handen bent.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-card dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                    <span className="material-symbols-outlined text-primary mb-3">fact_check</span>
                    <h4 className="font-bold mb-1">Handmatige screening</h4>
                    <p className="text-sm text-muted-foreground">Elke aanmelding wordt door ons team gecontroleerd.</p>
                  </div>
                  <div className="p-6 bg-card dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                    <span className="material-symbols-outlined text-primary mb-3">quickreply</span>
                    <h4 className="font-bold mb-1">Direct contact</h4>
                    <p className="text-sm text-muted-foreground">Korte lijnen naar gecertificeerde professionals.</p>
                  </div>
                </div>

                <Link
                  href="/#zoek-hulp"
                  className="mt-4 px-8 py-4 border-2 border-foreground font-bold rounded-full w-fit hover:bg-foreground hover:text-background transition-all inline-block"
                >
                  Bekijk alle organisaties
                </Link>
              </div>

              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center rounded-xl shadow-2xl"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDINOXDfWvk82vsP4GJ3YfKY1Wqw4e_8_0lmxGqX6wRr5AacwBxVGCuMrjDKrqiaofwea3-K3L3ARuXlhHN5uUeTZzIK1SvYfpR7LqDNe6gQ0g06J5B1Vwm2WlInLq4Rry7wEJYNU-mA8RiuObZUTOdEfAjJvwS0ALZpntQPaoZfAqdsxOAeA3gR4GS-SOb3hPNG23LU5P4VGjcGuKK4A_pRYI8kSTe-iP5Qz-0wbjlp3vskopi586KdnqTH8wc_tQUtm7QbqF7Ew')",
                    }}
                    role="img"
                    aria-label="Professionele therapeut in een warm modern kantoor"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Block 3: Smart Matching (Phone Mockup Left, Text Right) */}
        <section className="bg-[#FAFDF7] dark:bg-background-dark py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2 flex justify-center">
                {/* Phone Mockup */}
                <div className="relative w-[300px] h-[600px] bg-[#192210] rounded-[3rem] p-3 shadow-2xl border-8 border-[#192210]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#192210] rounded-b-2xl z-10" />
                  <div className="bg-white h-full w-full rounded-[2rem] overflow-hidden relative">
                    <div className="bg-primary/10 p-4 pt-10">
                      <div className="h-4 w-24 bg-primary/20 rounded-full mb-4" />
                      <div className="h-8 w-48 bg-[#192210] rounded-lg mb-2" />
                      <div className="h-4 w-32 bg-gray-300 rounded-full" />
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                      <div className="p-4 border border-gray-100 rounded-xl flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-20 bg-primary/40 rounded-full" />
                          <div className="size-4 bg-primary rounded-full" />
                        </div>
                        <div className="h-4 w-full bg-gray-100 rounded-full" />
                        <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
                      </div>
                      <div className="p-4 border border-gray-100 rounded-xl flex flex-col gap-2">
                        <div className="h-4 w-20 bg-gray-200 rounded-full" />
                        <div className="h-4 w-full bg-gray-100 rounded-full" />
                      </div>
                      <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl flex flex-col gap-2">
                        <div className="h-4 w-24 bg-primary/40 rounded-full" />
                        <div className="h-10 w-full bg-primary rounded-lg mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Slimme Technologie
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
                  De beste hulp, dankzij Smart Matching.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Geen eindeloze lijsten en keuzestress. Onze intelligente algoritmes analyseren jouw behoeften en verbinden je direct met de meest relevante hulp in de buurt.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="size-12 rounded-xl bg-background-light dark:bg-white/5 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Lokaal Aanbod</h4>
                      <p className="text-sm text-muted-foreground">Vind direct hulp bij jou in de buurt, fysiek of digitaal.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-12 rounded-xl bg-background-light dark:bg-white/5 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Gepersonaliseerd</h4>
                      <p className="text-sm text-muted-foreground">De resultaten worden aangepast op basis van jouw specifieke situatie.</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/#zoek-hulp"
                  className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full w-fit hover:scale-105 transition-transform shadow-lg shadow-primary/20 inline-block"
                >
                  Start met zoeken
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Klaar om de juiste hulp te vinden?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Start vandaag nog je zoektocht, volledig anoniem en veilig. We helpen je de weg te vinden in een woud van mogelijkheden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/#zoek-hulp"
                className="px-10 py-5 bg-primary text-primary-foreground font-extrabold rounded-full text-lg hover:shadow-xl hover:shadow-primary/30 transition-all inline-block"
              >
                Zoek direct hulp
              </Link>
              <Link
                href="/#hoe-het-werkt"
                className="px-10 py-5 bg-foreground text-background font-extrabold rounded-full text-lg hover:opacity-90 transition-all inline-block"
              >
                Hoe werkt het?
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
