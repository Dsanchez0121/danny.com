import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Danny.com — Random thoughts and adventures",
    template: "%s | Danny.com",
  },
  description:
    "Random thoughts and adventures by Daniel Sanchez. Lore maxing, languages, and keeping my brain active.",
  authors: [{ name: "Daniel Sanchez" }],
  openGraph: {
    title: "Danny.com",
    description:
      "Random thoughts and adventures by Daniel Sanchez. Lore maxing, languages, and keeping my brain active.",
    type: "website",
    locale: "en_US",
  },
  metadataBase: new URL("https://danny.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fdfbf7] text-stone-900 selection:bg-orange-200">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
