import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Medical Law Hub privacy placeholder for future policy publication."
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy placeholder"
        description="This page is ready for Medical Law Hub's formal privacy, data protection and GDPR policy text."
      />
    </PageWrapper>
  );
}
