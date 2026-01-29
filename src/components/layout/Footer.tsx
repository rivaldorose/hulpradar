import Link from "next/link";
import { Radar } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Radar className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">HulpRadar</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              HulpRadar koppelt mensen met financiële problemen aan schuldhulporganisaties
              in hun regio. Gratis, snel en vertrouwelijk.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Een initiatief van{" "}
              <a
                href="https://konsensi.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Konsensi
              </a>
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Hulp Zoeken</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Vind Hulp
                </Link>
              </li>
              <li>
                <Link href="/over" className="hover:text-foreground transition-colors">
                  Hoe het werkt
                </Link>
              </li>
              <li>
                <Link href="/over#privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organisations */}
          <div>
            <h3 className="font-semibold mb-4">Voor Organisaties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/voor-organisaties" className="hover:text-foreground transition-colors">
                  Word Partner
                </Link>
              </li>
              <li>
                <Link href="/aanmelden" className="hover:text-foreground transition-colors">
                  Aanmelden
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HulpRadar by Konsensi. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
