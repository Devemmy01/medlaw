import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { involvement } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get Involved in Medical Law Hub",
  description:
    "Join Medical Law Hub through medical law volunteering, professional membership, academic fellowships, institutional partnerships and public-interest health law projects.",
  path: "/get-involved",
  image: {
    url: "/images/medlaw-workshop.png",
    width: 1536,
    height: 1024,
    alt: "Medical Law Hub community education and volunteer workshop"
  },
  keywords: ["medical law volunteer", "health law fellowship", "medical law membership"]
});

export default function GetInvolvedPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Get involved"
        title="Build medical law capacity with a global specialist network."
        description="Medical Law Hub welcomes professionals, volunteers, academics, institutions and corporate partners who want to advance rights-based healthcare accountability."
        primaryHref="#apply"
        primaryLabel="Start application"
        secondaryHref="/contact"
        secondaryLabel="Ask a question"
        mediaSrc="/images/medlaw-workshop.png"
        mediaAlt="Medical-law community education workshop with volunteers and participants"
        mediaCaption="Membership / Volunteering / Institutional partnership"
      />

      <section className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.42fr_1fr]">
            <aside className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Pathways"
                title="Choose a route into the Hub's public benefit work."
                description="Each pathway is ready for future workflow routing, onboarding steps and membership review."
              />
            </aside>
            <div className="grid sm:grid-cols-2">
              {involvement.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedReveal key={item.title} delay={index * 0.04} className="min-h-56 border-b border-navy-200 bg-paper-50 p-6 transition hover:bg-navy-50 sm:border-r">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <Icon aria-hidden="true" className="size-6 text-navy-700" />
                        <span className="text-xs font-semibold text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="mt-8">
                        <h3 className="safe-heading text-xl font-semibold tracking-[-0.02em] text-navy-950">{item.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-navy-700">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="section-y surface-grid bg-navy-50">
        <div className="container-px">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                eyebrow="Application placeholder"
                title="Register interest in membership, volunteering, fellowships or partnerships."
                description="The form captures a polished frontend flow and success state. Backend storage, email routing and review workflows can be added next."
              />
              <AnimatedReveal className="mt-8 border border-navy-200 bg-paper-50 p-6">
                <p className="section-label">Review flow</p>
                <p className="mt-4 text-sm leading-7 text-navy-700">
                  Applications can later route to membership review, volunteer onboarding or institutional partnership workflows.
                </p>
              </AnimatedReveal>
            </div>
            <ContactForm mode="involvement" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
