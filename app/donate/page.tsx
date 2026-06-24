import type { Metadata } from "next";
import { Building2, HandHeart, Landmark, ShieldCheck } from "lucide-react";

import { CTASection } from "@/components/CTASection";
import { DonationTierCard } from "@/components/Cards";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { donationTiers, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate & Support",
  description:
    "Support Medical Law Hub's legal literacy, patient empowerment, medical law competitions, public health policy briefs and bioethics research."
};

export default function DonatePage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Donate and support"
        title="Fuel public legal education, research and healthcare accountability."
        description="Every contribution supports open-access resources, inter-university bioethics programmes, policy research and public awareness at the intersection of medicine and law."
        primaryHref="#bank-details"
        primaryLabel="View account details"
        secondaryHref="/contact"
        secondaryLabel="Sponsor a programme"
      />

      <section id="tiers" className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid gap-10 border-b border-navy-200 pb-10 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <SectionHeader
              eyebrow="Direct impact giving"
              title="Donation tiers tied to programme outcomes."
              description="These suggested giving levels show the kind of programme outcomes your support can help make possible. You may donate any amount by bank transfer."
            />
            <AnimatedReveal className="border border-navy-200 bg-paper-100 p-6">
              <p className="section-label">Giving model</p>
              <p className="mt-4 text-sm leading-7 text-navy-700">
                Tiers are written around programme outcomes so donors understand what their support can unlock.
              </p>
            </AnimatedReveal>
          </div>
          <div className="mt-10 grid gap-0 border border-navy-200 bg-paper-50 md:grid-cols-2 xl:grid-cols-4">
            {donationTiers.map((tier, index) => (
              <DonationTierCard key={tier.title} {...tier} delay={index * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section id="bank-details" className="section-y surface-grid scroll-mt-24 bg-navy-50">
        <div className="container-px grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Donate by bank transfer"
              title="Make a direct contribution to Medical Law Hub."
              description="Use the account details provided to transfer your donation securely through your bank. Every contribution, at any level, helps advance our public-interest work."
            />
            <div className="mt-8 grid gap-0 border border-navy-200 bg-paper-50 sm:grid-cols-3">
              {[
                { title: "Direct transfer", icon: Landmark },
                { title: "Public-interest impact", icon: HandHeart },
                { title: "Responsible stewardship", icon: ShieldCheck }
              ].map(({ title, icon: Icon }) => (
                <div key={title} className="border border-navy-200 p-5">
                  <Icon aria-hidden="true" className="size-5 text-navy-700" />
                  <p className="mt-5 text-sm font-semibold text-navy-950">{title}</p>
                </div>
              ))}
            </div>
          </div>

          <AnimatedReveal className="border border-navy-200 bg-paper-50">
            <div className="border-b border-navy-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center border border-navy-200 bg-navy-50 text-navy-900">
                  <Building2 aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <h2 className="safe-heading font-display text-2xl font-semibold uppercase text-navy-950">
                    Bank account details
                  </h2>
                  <p className="text-sm text-navy-500">Nigerian naira account</p>
                </div>
              </div>
            </div>
            <dl className="divide-y divide-navy-200 p-6">
              {[
                ["Bank", "UBA"],
                ["Account name", "Medical Law Hub"],
                ["Account number", "1025746887"]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[0.42fr_1fr] sm:items-baseline">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-500">{label}</dt>
                  <dd className="break-words text-lg font-semibold text-navy-950 sm:text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr]">
          <SectionHeader eyebrow="FAQ" title="Donation questions" />
          <div className="grid gap-0 border border-navy-200 bg-paper-50">
            {faqs.map((faq) => (
              <details key={faq.question} className="border-b border-navy-200 p-5 transition open:bg-navy-50">
                <summary className="cursor-pointer text-base font-semibold text-navy-950">{faq.question}</summary>
                <p className="mt-4 text-sm leading-7 text-navy-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Sponsor research, competitions or public legal literacy."
        description="Institutions can align with specific programme pillars while preserving the Hub's non-profit integrity and transparency commitments."
        primaryHref="/contact"
        primaryLabel="Discuss sponsorship"
      />
    </PageWrapper>
  );
}
