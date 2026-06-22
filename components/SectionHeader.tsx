import { AnimatedReveal } from "@/components/AnimatedReveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = ""
}: SectionHeaderProps) {
  const centered = align === "center";
  const isDark = tone === "dark";

  return (
    <AnimatedReveal
      className={[
        "max-w-3xl",
        centered ? "mx-auto text-center" : "",
        className
      ].join(" ")}
    >
      {eyebrow ? (
        <p className={["mb-3 text-xs font-semibold uppercase tracking-[0.16em]", isDark ? "text-navy-200" : "text-navy-500"].join(" ")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={[
          "safe-heading font-display text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl",
          isDark ? "text-paper-50" : "text-navy-950"
        ].join(" ")}
      >
        {title}
      </h2>
      {description ? (
        <p className={["mt-5 max-w-2xl text-base leading-8", isDark ? "text-navy-100" : "text-navy-700"].join(" ")}>
          {description}
        </p>
      ) : null}
    </AnimatedReveal>
  );
}
