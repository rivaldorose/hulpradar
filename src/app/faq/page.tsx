"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  { id: "hulpradar", label: "Over HulpRadar", icon: "radar" },
  { id: "privacy", label: "Privacy & Veiligheid", icon: "shield" },
  { id: "organisaties", label: "Voor Organisaties", icon: "business" },
  { id: "educatie", label: "Financiële Educatie", icon: "school" },
];

const faqs: Record<string, { question: string; answer: string }[]> = {
  hulpradar: [
    {
      question: "Hoe werkt HulpRadar precies?",
      answer:
        "HulpRadar koppelt je aan de juiste instanties en biedt een overzichtelijk stappenplan om je schulden aan te pakken. We begeleiden je van begin tot eind door je financiën in kaart te brengen en je te verbinden met lokale coaches.",
    },
    {
      question: "Zijn er kosten verbonden aan de hulp?",
      answer:
        "Nee, voor jou als jongere is onze hulp volledig kosteloos. Wij werken samen met gemeenten en maatschappelijke organisaties om ervoor te zorgen dat jij zonder extra kosten uit de schulden kunt komen.",
    },
    {
      question: "Hoe kom ik in contact met een adviseur?",
      answer:
        "Zodra je je hebt aangemeld en je situatie kort hebt beschreven, koppelen we je binnen 48 uur aan een persoonlijke adviseur in jouw regio. Je kunt dan zelf kiezen of je via WhatsApp, telefoon of fysiek wilt afspreken.",
    },
    {
      question: "Moet ik een account aanmaken?",
      answer:
        "Nee, je hoeft geen account aan te maken om hulp te zoeken. Je kunt volledig anoniem een hulpvraag indienen. Alleen als je je voortgang wilt bijhouden of berichten wilt ontvangen, kun je optioneel een account aanmaken.",
    },
  ],
  privacy: [
    {
      question: "Is mijn data veilig bij jullie?",
      answer:
        "Absoluut. Privacy is onze prioriteit. We gebruiken bankwaardige encryptie en delen je gegevens alleen met partners wanneer jij daar expliciet toestemming voor geeft. Je houdt altijd de volledige controle.",
    },
    {
      question: "Welke gegevens worden er verzameld?",
      answer:
        "We verzamelen alleen de informatie die nodig is om je te matchen met de juiste hulporganisatie: je gemeente, het type hulp dat je zoekt en optioneel je contactgegevens. We slaan geen onnodige persoonlijke data op.",
    },
    {
      question: "Kunnen anderen zien dat ik hulp heb gezocht?",
      answer:
        "Nee. Je hulpvraag is volledig vertrouwelijk. Alleen de hulporganisatie die aan jou gekoppeld wordt, kan je aanvraag inzien. Wij delen nooit informatie met derden zonder jouw expliciete toestemming.",
    },
  ],
  organisaties: [
    {
      question: "Hoe kan mijn organisatie zich aanmelden?",
      answer:
        "Je kunt je organisatie aanmelden via onze pagina 'Voor Organisaties'. Na aanmelding doorloop je een verificatieproces waarbij we controleren of je organisatie voldoet aan onze kwaliteitseisen.",
    },
    {
      question: "Wat zijn de vereisten voor hulporganisaties?",
      answer:
        "Organisaties moeten erkend zijn door de gemeente of een relevante branchevereniging. Daarnaast controleren we of je organisatie actief is, een goed track record heeft en voldoet aan de AVG/GDPR-wetgeving.",
    },
    {
      question: "Zijn er kosten voor organisaties?",
      answer:
        "HulpRadar is momenteel gratis voor alle geverifieerde hulporganisaties. Ons doel is om zoveel mogelijk jongeren te helpen, en dat doen we door de drempel voor organisaties zo laag mogelijk te houden.",
    },
  ],
  educatie: [
    {
      question: "Biedt HulpRadar ook financieel advies?",
      answer:
        "HulpRadar is primair een matchmaking platform. We verbinden je met professionals die je wél persoonlijk financieel advies kunnen geven. Op onze website vind je daarnaast handige tips en artikelen over geldzaken.",
    },
    {
      question: "Waar kan ik meer leren over budgetteren?",
      answer:
        "Via onze partner Konsensi Budgetbeheer kun je terecht voor budgetcoaching en financiële educatie. Zij bieden gratis workshops en persoonlijke begeleiding aan jongeren in heel Nederland.",
    },
    {
      question: "Wat moet ik doen als ik acute schulden heb?",
      answer:
        "Bij acute schulden raden we je aan om direct hulp te zoeken via HulpRadar. Vul je gemeente en situatie in, en wij koppelen je zo snel mogelijk aan een organisatie die je kan helpen. In noodgevallen kun je ook bellen met de Geldlijn: 0900-8115.",
    },
  ],
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-soft-green overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between p-8 w-full text-left"
      >
        <h3 className="text-xl font-bold pr-4">{question}</h3>
        <div
          className={`flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-8">
          <p className="text-[#648766] text-lg leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("hulpradar");

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-[960px] mx-auto text-center px-6 mb-20">
          <h1 className="font-heading text-5xl md:text-6xl text-forest-green mb-6 leading-tight font-bold">
            Vragen? We zijn er voor je.
          </h1>
          <p className="text-lg md:text-xl text-[#648766] max-w-2xl mx-auto leading-relaxed">
            Hier vind je antwoorden op de meest gestelde vragen over schuldhulp, privacy en hoe HulpRadar werkt.
          </p>
        </section>

        {/* FAQ Layout */}
        <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 items-start">
          {/* Left Sidebar Navigation */}
          <aside className="sticky top-32 flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-between rounded-full px-6 py-4 transition-all ${
                  activeCategory === cat.id
                    ? "bg-forest-green text-white shadow-md"
                    : "bg-white border border-[#dce5dc] hover:border-forest-green"
                }`}
              >
                <span className={activeCategory === cat.id ? "font-bold" : "font-medium"}>
                  {cat.label}
                </span>
                <span className={`material-symbols-outlined ${activeCategory !== cat.id ? "opacity-40" : ""}`}>
                  chevron_right
                </span>
              </button>
            ))}
          </aside>

          {/* Right Content Area */}
          <div className="flex flex-col gap-6">
            {faqs[activeCategory]?.map((faq, index) => (
              <FAQItem key={`${activeCategory}-${index}`} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-[800px] mx-auto mt-32 px-6 text-center">
          <div className="bg-forest-green/5 rounded-xl py-12 px-8 border border-forest-green/10">
            <h2 className="font-heading text-3xl font-bold mb-4">Nog steeds vragen?</h2>
            <p className="text-[#648766] mb-8 max-w-md mx-auto">
              Staat je vraag er niet bij? Ons team staat klaar om je persoonlijk verder te helpen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:hallo@hulpradar.nl"
                className="bg-forest-green text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined">mail</span>
                Stuur een mail
              </a>
              <button className="bg-white border-2 border-forest-green text-forest-green font-bold py-4 px-10 rounded-full flex items-center justify-center gap-2 hover:bg-forest-green hover:text-white transition-all">
                <span className="material-symbols-outlined">chat</span>
                Start een chat
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
