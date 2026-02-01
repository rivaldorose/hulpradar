import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Algemene Voorwaarden - Helder & Eerlijk | HulpRadar",
  description: "Onze spelregels: heldere afspraken om onze community veilig en transparant te houden. Zonder ingewikkelde juridische taal.",
};

export default function AlgemeneVoorwaardenPage() {
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
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full bg-forest-green/10 text-forest-green font-semibold transition-all" href="#gebruik">
                  <span className="material-symbols-outlined text-lg">explore</span>
                  <span className="text-sm">Gebruik van HulpRadar</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#verantwoordelijkheid">
                  <span className="material-symbols-outlined text-lg">person</span>
                  <span className="text-sm">Jouw verantwoordelijkheid</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#bemiddelaar">
                  <span className="material-symbols-outlined text-lg">handshake</span>
                  <span className="text-sm">Onze rol als bemiddelaar</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#beeindiging">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                  <span className="text-sm">Beëindiging</span>
                </a>
                <a className="group flex items-center gap-3 px-4 py-3 rounded-full hover:bg-forest-green/5 transition-all" href="#contact">
                  <span className="material-symbols-outlined text-lg">contact_support</span>
                  <span className="text-sm">Vragen &amp; Contact</span>
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
              Onze spelregels
            </h1>
            <p className="text-[20px] leading-[1.8] opacity-80 font-normal italic border-l-4 border-forest-green/20 pl-6">
              Welkom bij HulpRadar. Om onze community veilig en transparant te houden, hebben we een aantal heldere afspraken gemaakt. We geloven in eerlijkheid, zonder ingewikkelde juridische taal.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-16">
            <section id="gebruik">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">explore</span>
                Gebruik van HulpRadar
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  HulpRadar is een platform dat hulpzoekenden verbindt met hulpaanbieders. Door gebruik te maken van onze website, ga je akkoord met deze voorwaarden. We verwachten dat elke gebruiker zich respectvol en eerlijk opstelt.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">visibility</span>
                    <h4 className="font-bold mb-1">Transparantie</h4>
                    <p className="text-sm">We zijn altijd eerlijk over hoe ons platform werkt en wat je kunt verwachten.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-white dark:bg-white/5 border border-forest-green/10">
                    <span className="material-symbols-outlined text-forest-green mb-2">favorite</span>
                    <h4 className="font-bold mb-1">Gratis hulp</h4>
                    <p className="text-sm">Het zoeken naar een geschikte match op ons platform is en blijft kosteloos.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="verantwoordelijkheid">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">person</span>
                Jouw verantwoordelijkheid
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Als gebruiker ben je zelf verantwoordelijk voor de informatie die je deelt op ons platform. Zorg ervoor dat je profielgegevens up-to-date en correct zijn.
                </p>
                <ul className="list-none space-y-4 pl-0">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-forest-green shrink-0">check_circle</span>
                    <span>Je verstrekt alleen juiste en actuele informatie bij je aanmelding.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-forest-green shrink-0">check_circle</span>
                    <span>Je behandelt andere gebruikers met respect en integriteit.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-forest-green shrink-0">check_circle</span>
                    <span>Je deelt je inloggegevens niet met anderen om misbruik te voorkomen.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section id="bemiddelaar">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">handshake</span>
                Onze rol als bemiddelaar
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  HulpRadar fungeert uitsluitend als facilitator. Wij brengen partijen bij elkaar, maar zijn geen partij bij de uiteindelijke overeenkomst die tussen een hulpzoekende en een aanbieder wordt gesloten.
                </p>
                <p>
                  Hoewel wij hulpaanbieders screenen op basis van de door hen verstrekte informatie, kunnen wij niet aansprakelijk worden gesteld voor de feitelijke uitvoering van de diensten door derden.
                </p>
              </div>
            </section>

            <section id="beeindiging">
              <h2 className="text-forest-green text-2xl font-bold leading-tight tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">cancel</span>
                Beëindiging
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Je kunt je account op elk gewenst moment opzeggen via je profielinstellingen. Bij beëindiging worden je persoonlijke gegevens volgens ons privacybeleid verwerkt.
                </p>
                <p>
                  HulpRadar behoudt zich het recht voor om accounts te blokkeren of te verwijderen indien er sprake is van misbruik, fraude of gedrag dat niet in lijn is met onze waarden.
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
                  Heb je vragen over deze spelregels of twijfel je over een specifieke situatie? Ons team kijkt graag met je mee voor een heldere oplossing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a className="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all" href="mailto:hallo@hulpradar.nl">
                    <span className="material-symbols-outlined">alternate_email</span>
                    hallo@hulpradar.nl
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
            <p>Laatst bijgewerkt op: 28 mei 2024. © 2024 HulpRadar. Alle rechten voorbehouden.</p>
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
