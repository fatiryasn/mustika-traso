import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import RootClient from "./RootClient";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
  description:
    "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Beton",
    "Beton Pracetak",
    "Beton Pracetak Medan",
    "Beton Pracetak Sumut",
    "Beton Medan Sumatera Utara",
    "PT. Mustika Traso",
    "Mustika Traso",
    "Supplier Beton Pracetak",
    "Precast Concrete",
  ],

  openGraph: {
    title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
    // images: ["/og-image.png"],
    description:
      "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",
    url: "https://mustika-traso.vercel.app",
    siteName: "Mustika Traso Medan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
    description:
      "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",
    // images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${grotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
