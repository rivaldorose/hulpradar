"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1200px]">
      <div className="glass-nav rounded-full px-8 py-4 flex items-center justify-between shadow-soft-green">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-hulpradar.png"
            alt="Konsensi Hulp Radar"
            width={372}
            height={191}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/hoe-het-werkt" className="text-sm font-semibold hover:text-primary transition-colors">Hoe het werkt</Link>
          <Link href="/over-ons" className="text-sm font-semibold hover:text-primary transition-colors">Over ons</Link>
          <Link href="/hulporganisaties" className="text-sm font-semibold hover:text-primary transition-colors">Hulpverleners</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/aanmelden" className="px-6 py-2 text-sm font-bold bg-secondary rounded-full">
            Voor organisaties
          </Link>
          <Link href="/hulp-zoeken" className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20">
            Hulp zoeken
          </Link>
        </div>
      </div>
    </nav>
  );
}
