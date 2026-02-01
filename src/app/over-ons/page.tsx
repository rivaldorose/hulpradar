import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Over Ons - HulpRadar",
  description: "Ontdek waarom HulpRadar bestaat en hoe we jongeren helpen met schulden. Onze missie, waarden en het Konsensi ecosysteem.",
};

export default function OverOnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-foreground transition-colors duration-300">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="px-4 md:px-40 py-20 lg:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-forest-green/10 z-10" />
                  <img
                    alt="Diverse groep lachende jongeren"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAecMnNjoyIJ-tl7JIOq2fnYkJR9DQoGKifN2hoQrS18I-UIomMUESAtBBeXxn6BCCI0vd745pLnF054CphTIliYz1WECXbKWNNRbv0e4nkm7kUfEt_ydW5-wfWuUfq2rFMrU6QcgyMI3SdXfMpz3BlHNnK9oQZJ1dtJ_ca4VHuR5uwu3K2X5S2lkyK1DP12G_qp-Zb1aeDBhuCWLVUpHMUg3S85d45xBOfhHFsCRSpo3NZvTbMQMkJ_IspI2vMlBcBR2hrPlLa9g"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <h1 className="font-heading text-forest-green dark:text-primary text-5xl md:text-6xl font-bold leading-[1.1]">
                  Waarom HulpRadar bestaat
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic border-l-4 border-primary pl-6 py-2">
                  &ldquo;Mijn eigen reis door schulden leerde me dat het systeem vaak een doolhof is. Daarom bouwen we aan een wegwijzer die jongeren écht ziet en ondersteunt.&rdquo;
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Bij HulpRadar geloven we dat financiële educatie en ondersteuning geen bureaucratische strijd moeten zijn. We zijn ontstaan uit de behoefte aan menselijke maat in een digitaal tijdperk.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#missie"
                    className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                  >
                    Onze Reis
                  </a>
                  <a
                    href="#ecosysteem"
                    className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 px-8 border-2 border-forest-green text-forest-green dark:border-primary dark:text-primary font-bold hover:bg-forest-green hover:text-white dark:hover:bg-primary dark:hover:text-forest-green transition-all"
                  >
                    Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missie Section */}
        <section id="missie" className="bg-[#FAFDF7] dark:bg-forest-green/20 py-24 md:py-32">
          <div className="px-4 md:px-40 max-w-[1200px] mx-auto text-center">
            <div className="flex flex-col items-center gap-8">
              <span className="inline-block p-3 rounded-full bg-primary/20 text-forest-green dark:text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">favorite</span>
              </span>
              <h2 className="font-heading text-forest-green dark:text-white text-3xl md:text-4xl font-bold">Onze Missie</h2>
              <blockquote className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-[900px]">
                &ldquo;Geen jongere mag verdwalen in het schuldhulpsysteem.&rdquo;
              </blockquote>
              <div className="h-1.5 w-24 bg-primary rounded-full mt-4" />
            </div>
          </div>
        </section>

        {/* Kernwaarden Section */}
        <section id="waarden" className="px-4 md:px-40 py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="font-heading text-forest-green dark:text-white text-3xl font-bold mb-4">Onze Kernwaarden</h2>
              <p className="text-gray-600 dark:text-gray-400">De fundamenten van ons handelen</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-10 rounded-[2rem] shadow-soft-green flex flex-col items-center text-center gap-6 border border-primary/5 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold">Transparantie</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Eerlijke hulp zonder verborgen agenda&apos;s of kleine lettertjes.</p>
              </div>

              <div className="bg-card p-10 rounded-[2rem] shadow-soft-green flex flex-col items-center text-center gap-6 border border-primary/5 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">universal_currency</span>
                </div>
                <h3 className="text-xl font-bold">Toegankelijkheid</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Hulp die voor iedereen begrijpelijk is, ongeacht je achtergrond.</p>
              </div>

              <div className="bg-card p-10 rounded-[2rem] shadow-soft-green flex flex-col items-center text-center gap-6 border border-primary/5 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">group</span>
                </div>
                <h3 className="text-xl font-bold">Gemeenschap</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Samen staan we sterker tegenover schulden en financiële stress.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Konsensi Ecosysteem Section */}
        <section id="ecosysteem" className="px-4 md:px-40 py-24 bg-card overflow-hidden relative">
          <div className="absolute -right-20 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="bg-background-light dark:bg-forest-green/30 rounded-[3rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-12 border border-primary/10">
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest-green rounded-xl flex items-center justify-center text-primary font-black italic">K</div>
                  <span className="text-xl font-bold tracking-tight">Konsensi Connection</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green dark:text-primary">
                  Onderdeel van een groter geheel
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  HulpRadar is een trots onderdeel van het Konsensi-ecosysteem. Wij geloven in een holistische benadering van welzijn, waarbij financiële stabiliteit de basis vormt voor persoonlijke groei.
                </p>
                <a
                  href="https://www.konsensi-budgetbeheer.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit cursor-pointer items-center justify-center rounded-full h-12 px-10 bg-forest-green text-white font-bold hover:bg-black transition-colors"
                >
                  Bezoek Konsensi
                </a>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-card rounded-[2rem] shadow-xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">hub</span>
                    <span className="text-sm font-bold">Ecosysteem</span>
                  </div>
                  <div className="h-40 translate-y-8 bg-primary rounded-[2rem] shadow-xl p-6 flex flex-col justify-center items-center text-center text-forest-green">
                    <span className="material-symbols-outlined text-4xl mb-2">volunteer_activism</span>
                    <span className="text-sm font-bold">Ondersteuning</span>
                  </div>
                  <div className="h-40 bg-card rounded-[2rem] shadow-xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">psychology</span>
                    <span className="text-sm font-bold">Mindset</span>
                  </div>
                  <div className="h-40 translate-y-8 bg-card rounded-[2rem] shadow-xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">trending_up</span>
                    <span className="text-sm font-bold">Groei</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
