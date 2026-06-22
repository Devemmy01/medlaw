import type { Metadata } from "next";
import { Building2, Newspaper } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { ImpactCard } from "@/components/Cards";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { contactCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Medical Law Hub for central inquiries, press desk requests, institutional partnerships, medical law research and donor support."
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <PageHero
        eyebrow="Contact"
        title="Reach the Medical Law Hub central inquiry desk."
        description="Route institutional, academic, press and philanthropic communications through verified Medical Law Hub channels."
      />

      <section className="section-y bg-paper-50">
        <div className="container-px grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              eyebrow="Verified channels"
              title="Central contact details"
              description="Use these details for formal communications while the digital inquiry flow remains a frontend placeholder."
            />
            <div className="mt-8 grid gap-0 border border-navy-200 bg-paper-50">
              {contactCards.map((item, index) => (
                <ImpactCard key={item.title} item={item} delay={index * 0.04} />
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section-y surface-grid bg-navy-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-50 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="section-label">Routing desks</p>
              <h2 className="safe-heading mt-6 font-display text-[clamp(2.4rem,9vw,4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-navy-950">
                Press, partnerships and office routing.
              </h2>
              <p className="mt-6 text-base leading-8 text-navy-700">
                Use the correct desk for faster routing across editorial, institutional, academic and philanthropic inquiries.
              </p>
            </div>
            <div className="grid sm:grid-cols-2">
              <ImpactCard
                item={{
                  title: "Press desk",
                  description: "For media requests, expert comment and publication inquiries related to health law and public policy.",
                  icon: Newspaper
                }}
              />
              <ImpactCard
                item={{
                  title: "Institutional inquiry",
                  description: "For universities, healthcare institutions, law firms, NGOs and public agencies exploring collaboration.",
                  icon: Building2
                }}
              />
              <AnimatedReveal className="min-h-72 border-t border-navy-200 bg-paper-100 p-6 sm:col-span-2">
                <p className="section-label">Registered office</p>
                <div className="mt-5 flex min-h-52 items-center justify-center border border-dashed border-navy-300 bg-paper-50 p-6 text-center text-sm font-medium leading-7 text-navy-600">
                  Royal Drive, Bolsover S44 6ZD, United Kingdom
                </div>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
