import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
};

const variants = {
  primary:
    "border border-navy-950 bg-navy-950 text-paper-50 hover:bg-paper-50 hover:text-navy-950",
  secondary:
    "border border-navy-300 bg-paper-50 text-navy-950 hover:border-navy-950 hover:bg-navy-50",
  ghost: "text-navy-800 hover:bg-navy-50",
  light: "border border-paper-50 bg-transparent text-paper-50 hover:bg-paper-50 hover:text-navy-950"
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "focus-ring inline-flex min-h-11 items-center justify-center rounded-none px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition",
        variants[variant],
        className
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
