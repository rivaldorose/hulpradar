"use client";

import Link from "next/link";
import { Radar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <Radar className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-radar-pulse" />
          </div>
          <span className="font-bold text-xl">HulpRadar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/over"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Over HulpRadar
          </Link>
          <Link
            href="/voor-organisaties"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Voor Organisaties
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Organisatie Login
            </Button>
          </Link>
          <Link href="/#zoek-hulp">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Zoek Hulp
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
