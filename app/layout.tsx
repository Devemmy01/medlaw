import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/content";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/newsreader/opsz.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Medical Law Hub | Where Medicine Meets Law",
    template: "%s | Medical Law Hub"
  },
  description:
    "Medical Law Hub advances education, research and public awareness in medical law, health law, patient rights, bioethics and healthcare accountability.",
  keywords: [
    "medical law",
    "health law",
    "patient rights",
    "bioethics",
    "clinical negligence",
    "AI in medicine",
    "telemedicine law",
    "public health policy",
    "legal research",
    "healthcare accountability"
  ],
  openGraph: {
    title: "Medical Law Hub",
    description: "Where Medicine Meets Law.",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/medlaw-hero.png",
        width: 1200,
        height: 800,
        alt: "Medical Law Hub abstract hero visual"
      }
    ],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Law Hub",
    description: "Where Medicine Meets Law.",
    images: ["/images/medlaw-hero.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
