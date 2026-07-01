import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/content";
import { absoluteUrl, createPageMetadata, seoKeywords } from "@/lib/seo";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/newsreader/opsz.css";
import "./globals.css";

export const metadata: Metadata = {
  ...createPageMetadata(),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Medical law education and research",
  title: {
    default: "Medical Law Hub | Where Medicine Meets Law",
    template: "%s | Medical Law Hub"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "MedLawHub",
    url: site.url,
    logo: absoluteUrl("/images/logoblue.png"),
    image: absoluteUrl("/images/medlaw-hero.png"),
    description:
      "Medical Law Hub is a public-interest platform for medical law education, patient rights, bioethics, health policy research and healthcare accountability.",
    slogan: site.tagline,
    email: site.email,
    telephone: site.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "GB"
    },
    knowsAbout: seoKeywords,
    areaServed: ["United Kingdom", "Nigeria", "Global"]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: {
      "@id": `${site.url}/#organization`
    },
    inLanguage: "en-GB",
    description:
      "Medical law articles, research, magazine features and public education resources on patient rights, bioethics, clinical negligence, digital health and healthcare accountability."
  }
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
