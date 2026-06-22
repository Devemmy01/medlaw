import Image from "next/image";

import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";
import { impactCards, stats } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-navy-200 bg-paper-100 text-navy-950">
      <div className="container-px py-5">
        <AnimatedReveal className="relative overflow-hidden border border-navy-700 bg-navy-950 text-paper-50">
          <div className="grid min-h-[760px] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-6 border-b border-navy-700 pb-5">
                <Logo tone="dark" showTagline={false} />
                
              </div>

              <div className="py-12 lg:py-20">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-navy-100">
                  Health law / Patient rights / Bioethics
                </p>
                <h1 className="display-tight max-w-4xl text-[clamp(3.2rem,14vw,7.8rem)] text-paper-50">
                  Where Medicine Meets Law
                </h1>
                <p className="mt-7 max-w-xl font-serif text-2xl leading-8 text-navy-100 sm:text-3xl">
                  A specialist public-interest institution for the legal questions shaping modern healthcare.
                </p>
              </div>

              <div className="grid gap-6 border-t border-navy-700 pt-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  {/* <ButtonLink href="/donate" variant="light">
                    Donate
                  </ButtonLink> */}
                  <ButtonLink href="/charitable-work" variant="light">
                    Explore Our Work
                  </ButtonLink>
                </div>
                <p className="text-sm leading-7 text-navy-100">
                  Education, research, policy analysis and public awareness across clinical negligence,
                  telemedicine, AI in medicine, genomics and healthcare accountability.
                </p>
              </div>
            </div>

            <div className="relative min-h-[520px] border-t border-navy-700 lg:border-l lg:border-t-0">
              <Image
                src="/images/medlaw-hero.png"
                alt="Medical Law Hub visual representing law, healthcare policy and bioethics"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-navy-950/35" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-end px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-100">
                <p className="hidden text-xs font-semibold text-right uppercase tracking-[0.2em] text-navy-100 sm:block">
                  Global non-profit
                </p>
              </div>
              <div className="absolute bottom-5 left-5 right-5 border border-navy-600 bg-navy-950/85 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {impactCards.slice(0, 4).map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="border border-navy-700 bg-navy-900 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <Icon aria-hidden="true" className="size-5 text-navy-100" />
                          <span className="text-xs font-semibold text-navy-300">0{index + 1}</span>
                        </div>
                        <p className="text-sm font-semibold text-paper-50">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        <div className="mt-5 grid border-y border-navy-200 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-navy-200 py-5 sm:border-r sm:px-6 lg:border-b-0">
              <p className="font-display text-3xl font-semibold tracking-[-0.04em]">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-navy-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
