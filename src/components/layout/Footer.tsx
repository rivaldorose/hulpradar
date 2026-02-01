import Link from "next/link";

function HulpRadarLogoSimple({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L6 33.8C8 32.7 11 31.2 13.8 30.6C16.7 29.9 20.2 29.5 24 29.5C27.8 29.5 31.3 29.9 34.2 30.6C37 31.2 40 32.7 41.4 33.8L24 4Z" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-green text-white pt-20 pb-10 px-4 md:px-[120px] rounded-t-[32px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HulpRadarLogoSimple className="size-8 text-primary" />
              <h2 className="text-2xl font-extrabold tracking-tight">HulpRadar</h2>
            </div>
            <p className="text-white/60">
              Samen maken we een einde aan schuldzorgen onder jongeren. Anoniem, gratis en altijd in de buurt.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Navigatie</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link className="hover:text-primary transition-colors" href="/hoe-het-werkt">Hoe het werkt</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/over-ons">Over ons</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/hulporganisaties">Hulpverleners</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/faq">Veelgestelde vragen</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li>info@hulpradar.nl</li>
              <li>0800-1234567</li>
              <li>Amsterdam, Nederland</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Volg ons</h4>
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">share</span>
              </div>
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-forest-green transition-all cursor-pointer">
                <span className="material-symbols-outlined text-xl">camera</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>&copy; 2025 HulpRadar. Alle rechten voorbehouden.</p>
          <div className="flex gap-8">
            <Link className="hover:text-white" href="/privacy-policy">Privacyverklaring</Link>
            <Link className="hover:text-white" href="/algemene-voorwaarden">Algemene voorwaarden</Link>
            <a className="hover:text-white" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
