import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { ImpactCard, TeamCard } from "@/components/Cards";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { activities, focusSectors, team } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Medical Law Hub",
  description:
    "Learn about Medical Law Hub, its public-interest medical law mission, expert contributors, governance safeguards, health law research and patient rights education work.",
  path: "/about",
  keywords: ["about Medical Law Hub", "medical law experts", "health law governance"]
});

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="border-b border-navy-200 bg-paper-100 text-navy-950">
        <div className="container-px py-6">
          <AnimatedReveal className="overflow-hidden border border-navy-200 bg-paper-50">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex min-h-[520px] min-w-0 flex-col justify-between border-b border-navy-200 p-6 sm:min-h-[560px] sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                
                <div className="min-w-0 py-10 sm:py-12">
                  <p className="section-label mb-5">About the Hub</p>
                  <h1 className="display-tight max-w-4xl text-[clamp(2.65rem,11.5vw,6.1rem)]">
                    Medical science meets legal jurisprudence
                  </h1>
                </div>
                <div className="grid gap-6 border-t border-navy-200 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-xl text-base leading-8 text-navy-700">
                    Medical Law Hub drives systemic healthcare improvement, statutory awareness and independent
                    policy analysis for patient safety and modern healthcare delivery.
                  </p>
                  <div className="flex flex-col gap-3">
                    <ButtonLink href="/get-involved">Join the network</ButtonLink>
                    <ButtonLink href="/contact" variant="secondary">
                      Institutional inquiry
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <div className="bg-navy-950 p-6 text-paper-50 sm:p-8 lg:p-10">
                <div className="grid h-full content-between gap-8">
                  <div className="border border-navy-700 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-200">Institutional profile</p>
                    <p className="safe-heading mt-8 font-display text-[clamp(2.5rem,12vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
                      Research
                      <span className="block text-navy-300">Education</span>
                      Accountability
                    </p>
                  </div>
                  <div className="grid grid-cols-3 border-y border-navy-700">
                    {[
                      ["13", "expert contributors"],
                      ["7+", "programme pillars"],
                      ["100%", "public benefit"]
                    ].map(([value, label]) => (
                      <div key={label} className="border-r border-navy-700 py-5 pr-4 last:border-r-0">
                        <p className="font-display text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-200">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-navy-100">
                    The Hub brings together legal scholars, medical practitioners, scientists, programme leaders
                    and policy specialists around one public-interest mandate.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section id="who-we-are" className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.44fr_1fr]">
            <aside className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="section-label">Who we are</p>
              <h2 className="safe-heading mt-6 font-display text-[clamp(2.35rem,10vw,3.75rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-navy-950">
                A platform for health law education, research and accountability.
              </h2>
            </aside>
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-base leading-8 text-navy-700">
                  Our work supports students, medical practitioners, legal professionals and the wider public by
                  bridging healthcare, law, ethics and policy.
                </p>
                <p className="mt-6 text-base leading-8 text-navy-700">
                  We focus on the legal systems, professional standards and public education needed to protect
                  patient rights and improve healthcare accountability.
                </p>
              </div>
              <div className="bg-paper-50 p-6 sm:p-8 lg:p-10">
                <p className="section-label">Journey and track record</p>
                <p className="mt-6 text-base leading-8 text-navy-700">
                  The Hub has developed collaborative models with academic, legal and clinical stakeholders,
                  building a respected role in health law discourse, legal research competitions and public policy advocacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section-y bg-paper-100">
        <div className="container-px">
          <div className="grid gap-10 border-b border-navy-200 pb-10 lg:grid-cols-[0.65fr_1fr] lg:items-end">
            <SectionHeader
              eyebrow="Team and board"
              title="A multidisciplinary assembly of legal, medical, science and policy specialists."
              description="Profile cards use initials until official portrait assets are supplied."
            />
            <AnimatedReveal className="border border-navy-200 bg-paper-50 p-6">
              <p className="section-label">Directory</p>
              <p className="mt-4 text-sm leading-7 text-navy-700">
                A compact expert directory spanning legal scholarship, clinical practice, health policy,
                content, technology and programme operations.
              </p>
            </AnimatedReveal>
          </div>
          <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member, index) => (
              <TeamCard key={member.name} {...member} delay={index * 0.025} />
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="section-y dark-surface text-paper-50">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                eyebrow="Governance"
                title="Regulatory integration built around public trust."
                description="Trustees maintain legal, fiduciary and administrative oversight while expert contributors support technical steering through conflict-aware safeguards."
                tone="dark"
              />
            </div>
          <div className="grid border border-navy-700 lg:grid-cols-3">
            {[
              {
                title: "Voluntary Governance",
                description: "Board and trustee oversight is structured as unpaid fiduciary service.",
                icon: focusSectors[1].icon
              },
              {
                title: "Remuneration Safeguards",
                description: "Distinct technical services can be governed by conflict-of-interest and recusal rules.",
                icon: focusSectors[6].icon
              },
              {
                title: "Operational Structure",
                description: "Research, education, legal advisory, compliance and regional liaison desks support delivery.",
                icon: focusSectors[2].icon
              }
            ].map((item, index) => (
              <ImpactCard key={item.title} item={item} delay={index * 0.05} />
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Public benefit statement"
                title="Open-access education, competitions, research and public awareness."
                description="Medical Law Hub operates for public benefit through accessible legal toolkits, educational competitions, public health awareness and independent research briefs on fast-moving healthcare law."
              />
            </div>
            <div className="grid sm:grid-cols-3">
              {activities.map((item, index) => (
                <ImpactCard key={item.title} item={item} delay={index * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  );
}
