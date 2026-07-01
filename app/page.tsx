import { CTASection } from "@/components/CTASection";
import { ImpactCard } from "@/components/Cards";
import { HeroSection } from "@/components/HeroSection";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { activities, audiences, focusSectors, impactCards } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Medical Law, Patient Rights & Bioethics",
  description:
    "Medical Law Hub connects medical law education, patient rights, bioethics, health policy research, clinical negligence awareness and healthcare accountability resources.",
  path: "/",
  keywords: ["medical law education", "patient rights education", "healthcare law research"]
});

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />

      <section className="border-b border-navy-200 bg-paper-50 py-14 sm:py-16 lg:py-20">
        <div className="container-px">
          <AnimatedReveal className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="border-b border-navy-200 bg-navy-950 p-6 text-paper-50 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-100">
                Institutional statement
              </p>
              <div className="mt-12 max-w-sm">
                <p className="safe-heading font-display text-[clamp(2.75rem,12vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-paper-50">
                  Public
                  <span className="block text-navy-200">Benefit</span>
                  Standard
                </p>
                <p className="mt-6 text-sm leading-7 text-navy-100">
                  Where Medicine Meets Law means turning specialist knowledge into practical public value.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 border-y border-navy-700">
                <div className="border-r border-navy-700 py-4 pr-4">
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em]">3</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy-200">core outputs</p>
                </div>
                <div className="py-4 pl-4">
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em]">1</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy-200">public mission</p>
                </div>
              </div>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="grid gap-10 xl:grid-cols-[1fr_0.38fr]">
                <div>
                  <p className="section-label">Education / Research / Advocacy</p>
                  <h2 className="safe-heading mt-6 max-w-5xl font-serif text-[clamp(2.4rem,9vw,4.5rem)] leading-[1.04] tracking-[-0.035em] text-navy-950">
                    We translate complex medico-legal questions into usable knowledge for safer, fairer and more accountable healthcare.
                  </h2>
                  <p className="mt-7 max-w-3xl text-base leading-8 text-navy-700 sm:text-lg">
                    The Hub connects patient rights, clinical ethics, law reform and emerging health technology through
                    public education, independent research and institutional advocacy.
                  </p>
                </div>

                <div className="border-t border-navy-200 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">In practice</p>
                  <div className="mt-5 grid gap-4">
                    {[
                      "Open-access legal literacy",
                      "Independent policy research",
                      "Professional education pathways"
                    ].map((item, index) => (
                      <div key={item} className="flex gap-4 border-t border-navy-200 pt-4">
                        <span className="text-xs font-semibold text-navy-400">0{index + 1}</span>
                        <p className="text-sm font-semibold leading-6 text-navy-950">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-y bg-paper-100">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-50 lg:grid-cols-[1.08fr_0.92fr]">
            <AnimatedReveal className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Featured video"
                title="Hear the Medical Law Hub conversation in motion."
                description="A short video feature for visitors who would rather watch first, then explore the Hub's education, research and advocacy work."
              />
              <div className="mt-8 overflow-hidden border border-navy-200 bg-navy-950">
                <div className="relative aspect-video">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/JMlfS7vFpcs"
                    title="Medical Law Hub featured video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.08} className="grid bg-navy-950 text-paper-50">
              <div className="relative min-h-[28rem]">
                <Image
                  src="/images/medlaw-consultation.png"
                  alt="A doctor and legal professional reviewing medical-law documents together"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="section-label text-navy-200">Multimedia learning</p>
                  <p className="safe-heading mt-4 max-w-md font-display text-[clamp(2.25rem,8vw,4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">
                    Watch. Read. Act.
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-7 text-navy-100">
                    Pairing explainers, expert conversations and visual resources with practical medico-legal guidance.
                  </p>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="section-y border-y border-navy-200 bg-paper-50">
        <div className="container-px">
          <div className="grid overflow-hidden border border-navy-200 bg-paper-100 lg:grid-cols-[0.45fr_0.55fr]">
            <AnimatedReveal className="bg-navy-950 p-5 sm:p-7 lg:p-8">
              <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden border border-navy-700 bg-navy-900 shadow-2xl shadow-navy-950/20">
                <Image
                  src="/images/medlaw-magazine-vol-1.png"
                  alt="MEDLAW Volume I quarterly magazine cover about organ transplantation"
                  fill
                  sizes="(min-width: 1024px) 36vw, 86vw"
                  className="object-cover"
                />
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.08} className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <p className="section-label">Quarterly magazine</p>
              <h2 className="safe-heading mt-6 font-display text-[clamp(2.65rem,10vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-navy-950">
                The Medical Hub Quarterly Magazine (Volume I)
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-navy-700 sm:text-lg">
                This is the first edition of the Medical Law Hub magazine and it&apos;s all about organ transplantation in Nigeria and the laws regulating same. It has other spicy additions and we&apos;re certain you&apos;ll love it
              </p>
              <div className="mt-8">
                <a
                  href="https://selar.com/p3zm"
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-12 items-center justify-center border border-navy-950 bg-navy-950 px-6 text-sm font-semibold uppercase tracking-[0.12em] text-paper-50 transition hover:-translate-y-0.5 hover:bg-paper-50 hover:text-navy-950"
                >
                  Buy Now
                </a>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-paper-100">
        <div className="container-px">
          <div className="grid gap-0 border border-navy-200 bg-paper-50 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <SectionHeader
                eyebrow="Impact areas"
                title="Built for the pressure points where healthcare, law and public trust meet."
                description="Medical Law Hub translates complex medico-legal questions into education, research, policy advocacy and public-interest resources."
              />
              <AnimatedReveal className="mt-12 border-t border-navy-200 pt-6">
                <p className="section-label">Institutional mandate</p>
                <p className="mt-4 max-w-xl text-base leading-8 text-navy-700">
                  Built for professionals, patients, scholars and policy actors who need credible guidance where clinical practice,
                  law, ethics and technology converge.
                </p>
              </AnimatedReveal>
            </div>
            <div className="grid sm:grid-cols-2">
              {impactCards.slice(0, 4).map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedReveal
                    key={item.title}
                    delay={index * 0.04}
                    className="min-h-64 border-b border-navy-200 p-6 transition hover:bg-navy-50 sm:border-r"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between gap-4">
                        <Icon aria-hidden="true" className="size-6 text-navy-700" />
                        <span className="text-xs font-semibold text-navy-400">0{index + 1}</span>
                      </div>
                      <div className="mt-10">
                        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-navy-950">{item.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-navy-700">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedReveal>
                );
              })}
            </div>
          </div>
          <div className="grid border-x border-b border-navy-200 bg-paper-50 md:grid-cols-2">
            {impactCards.slice(4).map((item, index) => (
              <ImpactCard key={item.title} item={item} delay={index * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-y border-navy-200 bg-paper-50">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader
              eyebrow="Who we serve"
              title="Supporting the public, practitioners and specialist communities."
              description="The Hub bridges clinical practice, legal research, policy development and public education across jurisdictions."
            />
            <div className="grid gap-0 sm:grid-cols-2">
              {audiences.map((item, index) => (
                <ImpactCard key={item.title} item={item} delay={index * 0.04} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y dark-surface text-paper-50">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                eyebrow="Core focus sectors"
                title="A rigorous agenda for modern health law."
                description="From clinical negligence to AI governance, our work follows the pressure points shaping safe, fair and legally accountable healthcare."
                tone="dark"
              />
            </div>
            <div className="border border-navy-700">
              {focusSectors.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedReveal
                    key={item.title}
                    delay={index * 0.025}
                    className="grid gap-5 border-b border-navy-700 p-5 transition hover:bg-navy-900 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
                  >
                    <span className="font-display text-3xl font-semibold tracking-[-0.04em] text-navy-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-paper-50">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-navy-100">{item.description}</p>
                    </div>
                    <Icon aria-hidden="true" className="hidden size-6 text-navy-200 sm:block" />
                  </AnimatedReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y surface-grid bg-navy-50">
        <div className="container-px">
          <div className="overflow-hidden border border-navy-200 bg-paper-50">
            <div className="grid border-b border-navy-200 lg:grid-cols-[0.42fr_1fr]">
              <div className="border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <p className="section-label">Mission / Vision</p>
                <p className="safe-heading mt-8 font-display text-[clamp(3rem,12vw,5.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-navy-100">
                  Rule of law
                </p>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="safe-heading max-w-4xl font-serif text-[clamp(2.4rem,9vw,4.5rem)] leading-[1.04] tracking-[-0.035em] text-navy-950">
                  We work toward healthcare systems where rights are understood, innovation is accountable, and patient dignity is protected.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">Our mission</p>
                <h2 className="safe-heading mt-4 font-display text-[clamp(2rem,8vw,3rem)] font-semibold uppercase leading-[1] tracking-[-0.04em] text-navy-950">Advance education and awareness in medical and health law.</h2>
                <p className="mt-5 text-base leading-8 text-navy-700">
                  We protect patient rights, promote ethical healthcare, research emerging medico-legal issues,
                  support vulnerable communities and collaborate with professionals to improve policy and accountability.
                </p>
              </div>
              <div className="border-t border-navy-200 bg-navy-950 p-6 text-paper-50 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-200">Our vision</p>
                <h2 className="safe-heading mt-4 font-display text-[clamp(2rem,8vw,3rem)] font-semibold uppercase leading-[1] tracking-[-0.04em]">Healthcare guided by law, bioethics and the public interest.</h2>
                <p className="mt-5 text-base leading-8 text-navy-100">
                  We envision systems where patient rights are respected, innovation is responsibly regulated and
                  healthcare delivery is anchored in justice, safety and human dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-navy-200 bg-paper-50">
        <div className="container-px">
          <SectionHeader
            eyebrow="Featured activities"
            title="Education, publication and policy work designed for public benefit."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {activities.map((item, index) => (
              <ImpactCard key={item.title} item={item} delay={index * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageWrapper>
  );
}
