import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";
import RootClient from "./RootClient";
import "./globals.css";
import { COMPANY_DATA } from "@/data/constants";

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
  title: `${COMPANY_DATA.name} - Beton Pracetak Kualitas Tinggi`,
  description: `${COMPANY_DATA.name} - Supplier beton pracetak terpercaya di Medan. Mutu terjamin, kekuatan tekan teruji, pengiriman tepat. Dukung proyek infrastruktur Anda.`,

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: COMPANY_DATA.base_url,
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
    title: `${COMPANY_DATA.name} - Beton Pracetak Kualitas Tinggi`,
    images: ["/og-image.png"],
    description: `${COMPANY_DATA.name} - Supplier beton pracetak terpercaya di Medan. Mutu terjamin, kekuatan tekan teruji, pengiriman tepat. Dukung proyek infrastruktur Anda.`,
    url: `${COMPANY_DATA.base_url}`,
    siteName: `${COMPANY_DATA.name}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_DATA.name} - Beton Pracetak Kualitas Tinggi`,
    description: `${COMPANY_DATA.name} - Supplier beton pracetak terpercaya di Medan. Mutu terjamin, kekuatan tekan teruji, pengiriman tepat. Dukung proyek infrastruktur Anda.`,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jetbrains.variable} ${grotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: COMPANY_DATA.name,
              url: COMPANY_DATA.base_url,
              logo: `${COMPANY_DATA.base_url}/mustika-traso-logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: `+${COMPANY_DATA.wa_number}`,
                contactType: "customer service",
                availableLanguage: "Indonesian",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: COMPANY_DATA.address,
              },
            }),
          }}
        />
      </head>
      <body>
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
