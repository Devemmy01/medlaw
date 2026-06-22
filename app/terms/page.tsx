import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Terms",
  description: "Medical Law Hub terms placeholder for future legal publication."
};

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
