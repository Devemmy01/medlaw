import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Medical Law Hub terms of use, disclaimers and legal notices.",
  path: "/terms",
  noIndex: true
});

export default function TermsPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Terms"
        title="Terms placeholder"
        description="This page is ready for Medical Law Hub's formal terms of use, disclaimers and legal notices."
      />
    </PageWrapper>
  );
}
