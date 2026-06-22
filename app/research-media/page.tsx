import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { ResourceCard } from "@/components/Cards";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research & Media",
  description:
    "Read Medical Law Hub research, magazine issues, AI in medicine analysis, telemedicine compliance notes, statutory critiques and policy briefs."
};

export default function ResearchMediaPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Research and media"
        title="Accessible medico-legal research for professionals, institutions and the public."
        description="Our editorial desk produces thematic magazines, statutory critiques, policy briefs and digital health deep-dives across the issues shaping modern healthcare law."
        primaryHref="/contact"
        primaryLabel="Submit inquiry"
        secondaryHref="/get-involved"
        secondaryLabel="Contribute research"
      />

      <section id="magazine" className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid gap-10 border-b border-navy-200 pb-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <SectionHeader
              eyebrow="Resource library"
              title="Magazine issues, policy briefs and research placeholders."
              description="These cards are ready for live articles, PDFs, archive pages and media releases when final publication assets are supplied."
            />
            <AnimatedReveal className="border border-navy-200 bg-paper-100 p-6">
              <p className="section-label">Editorial desk</p>
              <p className="mt-4 text-sm leading-7 text-navy-700">
                Designed for a future archive of research briefs, issue pages, downloadable PDFs and media releases.
              </p>
            </AnimatedReveal>
          </div>
          <div className="mt-10 grid gap-0 border border-navy-200 bg-paper-50 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <ResourceCard key={resource.title} resource={resource} delay={index * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section id="digital-health" className="section-y surface-grid bg-navy-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-50 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Editorial focus"
                title="Deep-dives in organ transplantation, digital health, genomics and AI."
                description="The Medical Hub Quarterly Magazine makes complex frameworks accessible while preserving analytical depth for lawyers, clinicians, scholars and policymakers."
              />
            </div>
            <div className="bg-navy-950 p-6 text-paper-50 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-200">Featured archive</p>
              <h2 className="safe-heading mt-6 font-display text-[clamp(2.4rem,9vw,4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">Organ Transplantation in Africa</h2>
              <p className="mt-6 text-base leading-8 text-navy-100">
                A landmark issue examining legal and regulatory frameworks for organ transplantation and translating technical statutes into accessible professional guidance.
              </p>
              <div className="mt-10 grid grid-cols-2 border-y border-navy-700">
                {["Volume I", "Open access"].map((item) => (
                  <div key={item} className="border-r border-navy-700 py-4 pr-4 last:border-r-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="briefs" className="section-y dark-surface text-paper-50">
        <div className="container-px grid gap-10 lg:grid-cols-[0.42fr_1fr]">
          <SectionHeader
            eyebrow="Policy briefs"
            title="Research designed to inform institutions and public-interest law reform."
            description="Future brief pages can house statutory critique papers, executive summaries, downloadable PDFs and calls for expert contribution."
            tone="dark"
          />
          <div className="grid border border-navy-700 sm:grid-cols-3">
            {["Statutory critique", "Executive summaries", "Expert contribution calls"].map((item, index) => (
              <AnimatedReveal key={item} delay={index * 0.04} className="min-h-48 border-b border-navy-700 bg-navy-900 p-6 sm:border-r">
                <p className="text-xs font-semibold text-navy-300">{String(index + 1).padStart(2, "0")}</p>
                <p className="safe-heading mt-12 text-xl font-semibold tracking-[-0.02em] text-paper-50">{item}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Contribute to open-access medical law research."
        description="Researchers, practitioners and institutions can help expand the Hub's publication archive and policy impact."
        primaryHref="/get-involved"
        primaryLabel="Get Involved"
        secondaryHref="/contact"
        secondaryLabel="Contact Editorial Desk"
      />
    </PageWrapper>
  );
}
