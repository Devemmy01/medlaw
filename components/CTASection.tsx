import { ButtonLink } from "@/components/ButtonLink";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  title = "Build a fairer, safer healthcare future with us.",
  description = "Support education, open-access research, policy reform and public legal awareness at the point where medicine meets law.",
  primaryHref = "/donate",
  primaryLabel = "Donate",
  secondaryHref = "/get-involved",
  secondaryLabel = "Get Involved"
}: CTASectionProps) {
  return (
    <section className="section-y border-y border-navy-200 bg-paper-100 text-navy-950">
      <div className="container-px">
        <div className="border border-navy-200 bg-paper-50 p-7 sm:p-10 lg:p-12">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">Public benefit</p>
            <h2 className="safe-heading font-display text-[clamp(2.4rem,10vw,4rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em]">{title}</h2>
            <p className="mt-4 text-base leading-8 text-navy-700">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
