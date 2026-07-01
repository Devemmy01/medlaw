import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { charitablePrograms } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Charitable Medical Law Education Programmes",
  description:
    "Explore Medical Law Hub's charitable education programmes, medical law competitions, legal literacy toolkits, health law reform work and public awareness campaigns.",
  path: "/charitable-work",
  image: {
    url: "/images/medlaw-workshop.png",
    width: 1536,
    height: 1024,
    alt: "Community medical-law education workshop"
  },
  keywords: ["medical law charity", "legal literacy", "patient rights awareness"]
});

export default function CharitableWorkPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Charitable work"
        title="Programmes that make medical law usable, public and accountable."
        description="We operate through education, policy research, competitions, community awareness and open-access resources that support patient rights and ethical healthcare."
        primaryHref="/donate"
        primaryLabel="Fund the mission"
        secondaryHref="/get-involved"
        secondaryLabel="Volunteer or partner"
        mediaSrc="/images/medlaw-workshop.png"
        mediaAlt="Community medical-law awareness workshop with healthcare and public participants"
        mediaCaption="Community education / Patient rights / Public benefit"
      />

      <section className="section-y bg-paper-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.42fr_1fr]">
            <aside className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Programme pillars"
                title="A practical charitable model for law, health and public education."
                description="Each pillar turns specialist knowledge into resources and experiences that improve patient safety, professional confidence and accountability."
              />
            </aside>
            <div className="grid sm:grid-cols-2">
              {charitablePrograms.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedReveal key={item.title} delay={index * 0.035} className="min-h-60 border-b border-navy-200 p-6 transition hover:bg-navy-50 sm:border-r">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <Icon aria-hidden="true" className="size-6 text-navy-700" />
                        <span className="text-xs font-semibold text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="mt-10">
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

      <section id="training" className="section-y surface-grid bg-navy-50">
        <div className="container-px">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Training and awareness"
              title="Public education with professional-grade structure."
              description="The charitable programme turns legal and clinical complexity into tournaments, training modules and community-facing resources."
            />
            <AnimatedReveal className="border border-navy-200 bg-paper-50 p-6">
              <p className="section-label">Delivery model</p>
              <p className="mt-4 text-sm leading-7 text-navy-700">
                Each activity can be extended into registration flows, downloadable toolkits, archives and campaign pages.
              </p>
            </AnimatedReveal>
          </div>
          <div className="grid border border-navy-200 bg-paper-50 lg:grid-cols-3">
          {[
            {
              title: "Education & Professional Training Modules",
              body: "Structured learning for students, clinicians, lawyers and public-interest professionals on consent, negligence, bioethics and health technology."
            },
            {
              title: "National Medical Law Competitions",
              body: "Essay and debate tournaments that place students before contemporary dilemmas in clinical negligence, public health duties and biomedical innovation."
            },
            {
              title: "Community Sensitization Campaigns",
              body: "Plain-language outreach that helps communities understand patient rights, emergency care protections and accountable clinical pathways."
            }
          ].map((item) => (
            <article key={item.title} className="border-b border-navy-200 p-7 transition hover:bg-navy-50 lg:border-b-0 lg:border-r">
              <h2 className="safe-heading font-display text-2xl font-semibold uppercase leading-tight text-navy-950">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-navy-700">{item.body}</p>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section id="policy" className="section-y dark-surface text-paper-50">
        <div className="container-px grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              eyebrow="Policy desks"
              title="Independent analysis for legislation, clinical safety and digital medicine."
              description="The Hub researches implementation gaps and reform opportunities in public health mandates, safety benchmarks, data protection, telemedicine and AI."
              tone="dark"
            />
          </div>
          <div className="grid border border-navy-700 sm:grid-cols-2">
            {["Legislative critique", "Health data privacy", "Digital medical technology", "Patient equity and access"].map(
              (item, index) => (
                <div key={item} className="min-h-44 border-b border-navy-700 bg-navy-900 p-6 transition hover:bg-navy-800 sm:border-r">
                  <p className="text-xs font-semibold text-navy-300">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-10 safe-heading text-2xl font-semibold tracking-[-0.03em]">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Help turn specialist health law knowledge into public benefit."
        description="Your support can fund educational competitions, accessible toolkits, policy desks and community awareness campaigns."
      />
    </PageWrapper>
  );
}
