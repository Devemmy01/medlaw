import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: PageHeroProps) {
  return (
    <section className="border-b border-navy-200 bg-paper-100 py-5 text-navy-950">
      <div className="container-px">
        <AnimatedReveal className="overflow-hidden border border-navy-200 bg-paper-50">
          <div className="grid lg:grid-cols-[1fr_0.44fr]">
            <div className="min-w-0 border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center justify-between gap-6 border-b border-navy-200 pb-5">
                <Logo showTagline={false} />
                <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-navy-500 sm:block">
                  MLH / Page
                </p>
              </div>
              <div className="py-10 sm:py-12">
                <p className="section-label mb-5">{eyebrow}</p>
                <h1 className="safe-heading font-display text-[clamp(2.75rem,11vw,5.75rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em]">
                  {title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-navy-700 sm:text-lg">{description}</p>
              </div>
              {primaryHref && primaryLabel ? (
                <div className="flex flex-col gap-3 border-t border-navy-200 pt-6 sm:flex-row">
                  <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
                  {secondaryHref && secondaryLabel ? (
                    <ButtonLink href={secondaryHref} variant="secondary">
                      {secondaryLabel}
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
            <aside className="flex min-h-72 flex-col justify-between bg-navy-950 p-6 text-paper-50 sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-200">Where Medicine Meets Law</p>
                <p className="mt-8 font-display text-[clamp(2.5rem,10vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
                  Rights
                  <span className="block text-navy-300">Research</span>
                  Reform
                </p>
              </div>
              <p className="mt-10 max-w-sm text-sm leading-7 text-navy-100">
                A public-interest platform for education, policy, ethics and healthcare accountability.
              </p>
            </aside>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
