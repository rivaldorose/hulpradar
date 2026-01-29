import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HelpRequestForm } from "@/components/forms/HelpRequestForm";
import { Badge } from "@/components/ui/badge";
import {
  Radar,
  Shield,
  Clock,
  Users,
  CheckCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

          {/* Animated radar circles in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-radar-pulse" />
            <div className="absolute inset-12 rounded-full border-2 border-primary animate-radar-pulse [animation-delay:0.5s]" />
            <div className="absolute inset-24 rounded-full border-2 border-primary animate-radar-pulse [animation-delay:1s]" />
          </div>

          <div className="container max-w-screen-xl mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                <Radar className="h-3 w-3 mr-1" />
                Gratis & Vertrouwelijk
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Vind{" "}
                <span className="text-primary">Schuldhulp</span>{" "}
                in jouw Regio
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                HulpRadar koppelt je snel en anoniem aan geverifieerde schuldhulporganisaties
                bij jou in de buurt. Geen wachttijden, geen gedoe.
              </p>
            </div>

            {/* Help Request Form */}
            <div id="zoek-hulp" className="scroll-mt-20">
              <HelpRequestForm />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-card">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hoe het werkt</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                In drie simpele stappen vind je de juiste hulp voor jouw situatie
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: MapPin,
                  title: "Vul je gegevens in",
                  description:
                    "Alleen je naam, postcode en hoe je bereikt wilt worden. Geen account nodig.",
                },
                {
                  step: "2",
                  icon: Radar,
                  title: "We zoeken matches",
                  description:
                    "Onze radar vindt automatisch geverifieerde organisaties in jouw gemeente.",
                },
                {
                  step: "3",
                  icon: CheckCircle,
                  title: "Word geholpen",
                  description:
                    "Een organisatie neemt contact met je op en helpt je verder met je financiën.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative p-6 rounded-xl bg-background border border-border"
                  >
                    <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="mt-4">
                      <Icon className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "100% Vertrouwelijk",
                  description:
                    "Je gegevens worden veilig behandeld en alleen gedeeld met organisaties die je kunnen helpen.",
                },
                {
                  icon: Clock,
                  title: "Snelle Reactie",
                  description:
                    "Organisaties reageren binnen 48 uur. Je hoeft niet weken te wachten op hulp.",
                },
                {
                  icon: Users,
                  title: "Geverifieerde Partners",
                  description:
                    "Alle organisaties zijn gecontroleerd en dragen het Konsensi Keurmerk.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA for Organisations */}
        <section className="py-20 bg-card">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                Voor Organisaties
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Bent u een schuldhulporganisatie?
              </h2>
              <p className="text-muted-foreground mb-8">
                Word partner van HulpRadar en help meer mensen in nood. Ontvang
                automatisch hulpvragen uit uw regio en beheer alles via ons
                gebruiksvriendelijke dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/voor-organisaties"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Meer informatie
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/aanmelden"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Direct aanmelden
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
