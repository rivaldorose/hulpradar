import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Ons - HulpRadar",
  description: "Ontdek waarom HulpRadar bestaat en hoe we jongeren helpen met schulden. Onze missie, waarden en het Konsensi ecosysteem.",
};

function HulpRadarLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor" />
      <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function HulpRadarLogoSimple({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L6 33.8C8 32.7 11 31.2 13.8 30.6C16.7 29.9 20.2 29.5 24 29.5C27.8 29.5 31.3 29.9 34.2 30.6C37 31.2 40 32.7 41.4 33.8L24 4Z" fill="currentColor" />
    </svg>
  );
}

export default function OverOnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-10 md:px-40 py-5 bg-card">
        <Link href="/" className="flex items-center gap-4 text-forest-green dark:text-primary">
          <HulpRadarLogo className="size-6" />
          <h2 className="text-xl font-bold leading-tight tracking-tight text-forest-green dark:text-white">HulpRadar</h2>
        </Link>

        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#missie">Missie</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#waarden">Waarden</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#ecosysteem">Ecosysteem</a>
          </nav>
          <Link
            href="/#zoek-hulp"
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary text-primary-foreground text-sm font-bold tracking-wide hover:opacity-90 transition-all"
          >
            Zoek Hulp
          </Link>
        </div>
      </header>

      <main className="flex-1">
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
                  href="https://konsensi.nl"
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

      {/* Footer */}
      <footer className="bg-forest-green text-white pt-24 pb-12 px-4 md:px-40 rounded-t-[4rem]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <HulpRadarLogoSimple className="size-8 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">HulpRadar</h2>
              </div>
              <p className="text-gray-300 max-w-sm leading-relaxed">
                De nieuwe standaard voor jeugd schuldhulpverlening. Toegankelijk, transparant en met het hart op de juiste plek.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-6">Navigatie</h4>
              <ul className="flex flex-col gap-4">
                <li><Link className="hover:text-primary transition-colors" href="/over-ons">Over Ons</Link></li>
                <li><a className="hover:text-primary transition-colors" href="#missie">Missie</a></li>
                <li><a className="hover:text-primary transition-colors" href="#waarden">Waarden</a></li>
                <li><Link className="hover:text-primary transition-colors" href="/#zoek-hulp">Hulp Zoeken</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-primary mb-6">Social</h4>
              <ul className="flex flex-col gap-4">
                <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 HulpRadar. Alle rechten voorbehouden.</p>
            <div className="flex gap-8">
              <a className="hover:text-white" href="#">Privacy Policy</a>
              <a className="hover:text-white" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
