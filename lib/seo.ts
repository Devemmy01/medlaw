import type { Metadata } from "next";

import { site } from "@/lib/content";

const defaultTitle = "Medical Law, Patient Rights & Bioethics";
const defaultDescription =
  "Medical Law Hub advances medical law education, patient rights, bioethics, health policy research and healthcare accountability for the public, clinicians, lawyers and institutions.";

export const seoKeywords = [
  "medical law",
  "medical law hub",
  "health law",
  "patient rights",
  "bioethics",
  "clinical negligence",
  "medical negligence",
  "healthcare accountability",
  "health policy reform",
  "public health law",
  "AI in medicine law",
  "telemedicine law",
  "organ transplantation law",
  "medical ethics",
  "medico-legal research",
  "Nigeria medical law",
  "UK health law"
];

export const defaultSeoImage = {
  url: "/images/medlaw-hero.png",
  width: 1200,
  height: 800,
  alt: "Medical Law Hub visual representing law, healthcare policy and bioethics"
};

type PageSeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: typeof defaultSeoImage;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title = defaultTitle,
  description = defaultDescription,
  path = "/",
  image = defaultSeoImage,
  keywords = [],
  noIndex = false
}: PageSeoInput = {}): Metadata {
  return {
    title,
    description,
    keywords: Array.from(new Set([...seoKeywords, ...keywords])),
    alternates: {
      canonical: path
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      images: [image],
      locale: "en_GB",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image.url]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
          }
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
