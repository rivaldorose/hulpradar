import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HulpRadar - Vind Schuldhulp in jouw Regio",
  description: "HulpRadar koppelt mensen met financiële problemen aan schuldhulporganisaties in hun regio. Gratis, snel en anoniem.",
  keywords: ["schuldhulp", "financiële hulp", "schulden", "hulpverlening", "Nederland"],
  authors: [{ name: "Konsensi" }],
  openGraph: {
    title: "HulpRadar - Vind Schuldhulp in jouw Regio",
    description: "HulpRadar koppelt mensen met financiële problemen aan schuldhulporganisaties in hun regio.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
