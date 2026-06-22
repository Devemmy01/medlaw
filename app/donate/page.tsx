import type { Metadata } from "next";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";

import { CTASection } from "@/components/CTASection";
import { DonationTierCard, ImpactCard } from "@/components/Cards";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { donationTiers, faqs, impactCards } from "@/lib/content";

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
        primaryHref="#tiers"
        primaryLabel="Choose a tier"
        secondaryHref="/contact"
        secondaryLabel="Sponsor a programme"
      />

      <section id="tiers" className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid gap-10 border-b border-navy-200 pb-10 lg:grid-cols-[0.68fr_1fr] lg:items-end">
            <SectionHeader
              eyebrow="Direct impact giving"
              title="Donation tiers tied to programme outcomes."
              description="Payment integration is intentionally left as a secure placeholder until provider details are supplied."
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

      <section className="section-y surface-grid bg-navy-50">
        <div className="container-px grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Secure payment placeholder"
              title="A ready donation flow without live payment processing."
              description="The interface is structured for a future provider such as Stripe, Paystack or a donor CRM, but it does not collect payment details today."
            />
            <div className="mt-8 grid gap-0 border border-navy-200 bg-paper-50 sm:grid-cols-3">
              {[
                { title: "Corporate sponsorships", icon: impactCards[3].icon },
                { title: "Transparency guarantee", icon: ShieldCheck },
                { title: "Secure payment CTA", icon: LockKeyhole }
              ].map((item) => (
                <ImpactCard
                  key={item.title}
                  item={{
                    title: item.title,
                    description: "Prepared for provider connection, governance review and donor reporting workflows.",
                    icon: item.icon
                  }}
                />
              ))}
            </div>
          </div>

          <div className="border border-navy-200 bg-paper-50">
            <div className="border-b border-navy-200 p-6">
              <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center border border-navy-200 bg-navy-50 text-navy-900">
                <CreditCard aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h2 className="safe-heading font-display text-2xl font-semibold uppercase text-navy-950">Donation checkout</h2>
                <p className="text-sm text-navy-500">Provider pending</p>
              </div>
              </div>
            </div>
            <div className="grid gap-4 p-6">
              {["Donation tier", "Donor name", "Email receipt", "Payment provider"].map((label) => (
                <label key={label} className="block">
                  <span className="text-sm font-semibold text-navy-950">{label}</span>
                  <input className="form-input mt-2" placeholder={label === "Payment provider" ? "To be connected" : ""} />
                </label>
              ))}
              <button
                type="button"
                className="focus-ring inline-flex min-h-11 w-full items-center justify-center border border-navy-950 bg-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-paper-50 transition hover:bg-paper-50 hover:text-navy-950"
              >
                Continue securely
              </button>
              <p className="text-xs leading-6 text-navy-500">
                Placeholder only. No payment data is processed or stored by this frontend.
              </p>
            </div>
          </div>
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
