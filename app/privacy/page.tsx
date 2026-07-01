import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Medical Law Hub privacy policy and data protection information.",
  path: "/privacy",
  noIndex: true
});

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
