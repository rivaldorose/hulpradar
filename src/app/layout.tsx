import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700"],
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
    <html lang="nl" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${manrope.variable} ${poppins.variable} antialiased min-h-screen font-display`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
