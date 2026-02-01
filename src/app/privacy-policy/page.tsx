import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy - Helder & Veilig | HulpRadar",
  description: "Bij HulpRadar geloven we dat je privacy geen bijzaak is, maar een fundamenteel recht. Lees hoe we met je gegevens omgaan.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-[140px] flex flex-col lg:flex-row gap-16">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block w-[300px] shrink-0">
          <div className="sticky top-32 flex flex-col h-[calc(100vh-200px)] justify-between">
            <div>
              <h3 className="text-forest-green font-bold text-sm uppercase tracking-widest mb-6">Inhoudsopgave</h3>
              <nav className="flex flex-col gap-1">
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full bg-forest-green/10 text-forest-green font-semibold transition-all" href="#gegevens">
                  <span className="material-symbols-outlined text-lg">info</span>
                  <span className="text-sm">Gegevens verzamelen</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#gebruik">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <span className="text-sm">Data gebruik</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#rechten">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                  <span className="text-sm">Jouw rechten</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#bescherming">
                  <span className="material-symbols-outlined text-lg">shield</span>
                  <span className="text-sm">Data bescherming</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#contact">
                  <span className="material-symbols-outlined text-lg">mail</span>
                  <span className="text-sm">Contact opnemen</span>
                </a>
              </nav>
            </div>
            <Link href="/" className="flex items-center justify-center gap-2 bg-forest-green text-white rounded-full py-3 px-6 font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Terug naar Home
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <article className="flex-1 max-w-[720px]">
          {/* Headline Section */}
          <section className="mb-12">
            <h1 className="font-heading text-forest-green text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
              Privacy is onze prioriteit
            </h1>
            <p className="text-[20px] leading-[1.8] opacity-80 font-normal italic border-l-4 border-forest-green/20 pl-6">
              Bij HulpRadar geloven we dat je privacy geen bijzaak is, maar een fundamenteel recht. We leggen je hier in begrijpelijke taal uit hoe we met je gegevens omgaan. Geen kleine lettertjes, maar heldere afspraken.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-16">
            <section id="gegevens">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">database</span>
                Welke gegevens we verzamelen
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Om je de beste hulp te kunnen bieden, hebben we een aantal basisgegevens nodig. Dit gaat om je naam, e-mailadres en de voorkeuren die je aangeeft bij het aanmelden.
                </p>
                <p>
                  Daarnaast verzamelen we anonieme gebruiksstatistieken. Dit doen we niet om te zien wie je bent, maar om te begrijpen hoe onze website wordt gebruikt, zodat we deze constant kunnen verbeteren voor al onze gebruikers.
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 text-forest-green font-medium">
                  <li>Naam en contactgegevens</li>
                  <li>Dienstvoorkeuren</li>
                  <li>Anonieme interactiegegevens</li>
                </ul>
              </div>
            </section>

            <section id="gebruik">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">insights</span>
                Hoe we je data gebruiken
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Je data wordt uitsluitend gebruikt om onze diensten aan jou te leveren. We verkopen je gegevens nooit door aan derden. Punt. Dat past niet bij onze visie van een veilige haven.
                </p>
                <p>
                  We gebruiken je e-mailadres alleen om belangrijke updates over je account te sturen of als je expliciet hebt aangegeven dat je onze nieuwsbrief wilt ontvangen. Je kunt je op elk moment met één klik uitschrijven.
                </p>
              </div>
            </section>

            <section id="rechten">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">gavel</span>
                Jouw rechten
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Jij hebt de controle. Dat betekent dat je op elk moment het recht hebt om:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">visibility</span>
                    <h4 className="font-bold mb-1">Inzage</h4>
                    <p className="text-sm">Je kunt opvragen welke gegevens we precies van je hebben.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">edit</span>
                    <h4 className="font-bold mb-1">Correctie</h4>
                    <p className="text-sm">Kloppen je gegevens niet? We passen het direct voor je aan.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">delete_forever</span>
                    <h4 className="font-bold mb-1">Verwijdering</h4>
                    <p className="text-sm">Wil je weg? We wissen al je persoonlijke data op verzoek.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">download</span>
                    <h4 className="font-bold mb-1">Overdraagbaarheid</h4>
                    <p className="text-sm">Je kunt je data in een handig formaat meenemen.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="bescherming">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">security</span>
                Hoe we je data beschermen
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Veiligheid is verweven in alles wat we bouwen. We gebruiken moderne encryptie-technieken om ervoor te zorgen dat jouw gegevens onderweg en tijdens opslag altijd beschermd zijn.
                </p>
                <p>
                  Onze servers staan in beveiligde datacenters binnen de Europese Unie, wat betekent dat we voldoen aan de strengste privacywetgeving ter wereld (AVG/GDPR).
                </p>
              </div>
            </section>

            <section className="pt-8" id="contact">
              <div className="bg-forest-green/5 dark:bg-white/5 rounded-xl p-8 border border-forest-green/10">
                <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">contact_support</span>
                  Vragen? We staan voor je klaar
                </h2>
                <p className="text-lg mb-6">
                  Heb je een specifieke vraag over ons privacybeleid of wil je gebruikmaken van je rechten? Aarzel niet om contact op te nemen met onze privacy-officer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a className="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all" href="mailto:privacy@hulpradar.nl">
                    <span className="material-symbols-outlined">alternate_email</span>
                    privacy@hulpradar.nl
                  </a>
                  <button className="flex items-center gap-2 border-2 border-forest-green text-forest-green px-6 py-3 rounded-full font-bold hover:bg-forest-green/5 transition-all">
                    <span className="material-symbols-outlined">chat</span>
                    Live Chat
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Small */}
          <div className="mt-24 pt-8 border-t border-forest-green/10 text-sm opacity-50">
            <p>Laatst bijgewerkt op: 24 mei 2024. © 2024 HulpRadar. Alle rechten voorbehouden.</p>
          </div>
        </article>
      </main>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="size-14 bg-forest-green text-white rounded-full shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">menu_open</span>
        </button>
      </div>

      <Footer />
    </>
  );
}
