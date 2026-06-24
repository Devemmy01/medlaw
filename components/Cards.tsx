import type { IconItem } from "@/lib/content";
import { AnimatedReveal } from "@/components/AnimatedReveal";

export function ImpactCard({ item, delay = 0 }: { item: IconItem; delay?: number }) {
  const Icon = item.icon;

  return (
    <AnimatedReveal
      delay={delay}
      className="group min-h-64 border border-navy-200 bg-paper-50 p-6 transition hover:border-navy-800 hover:bg-navy-50"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <Icon aria-hidden="true" className="size-6 text-navy-700" />
          <span className="h-px flex-1 bg-navy-200" />
        </div>
        <div className="mt-10">
          <h3 className="max-w-xs text-xl font-semibold tracking-[-0.02em] text-navy-950">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-navy-700">{item.description}</p>
        </div>
      </div>
    </AnimatedReveal>
  );
}

export function FocusSectorCard({ item, delay = 0 }: { item: IconItem; delay?: number }) {
  const Icon = item.icon;

  return (
    <AnimatedReveal
      delay={delay}
      className="group min-h-56 border border-navy-700 bg-navy-900 p-5 text-paper-50 transition hover:border-navy-100"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <Icon aria-hidden="true" className="size-5 text-navy-100" />
          <span className="h-px flex-1 bg-navy-700" />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-navy-100">{item.description}</p>
        </div>
      </div>
    </AnimatedReveal>
  );
}

export function TeamCard({
  name,
  role,
  bio,
  delay = 0
}: {
  name: string;
  role: string;
  bio: string;
  delay?: number;
}) {
  const initials = name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <AnimatedReveal
      delay={delay}
      className="border border-navy-200 bg-paper-50 p-5 transition hover:border-navy-700"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center border border-navy-950 bg-navy-950 text-sm font-bold text-paper-50">
          {initials}
        </div>
        <div>
          <h3 className="text-base font-semibold text-navy-950">{name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">{role}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-navy-700">{bio}</p>
    </AnimatedReveal>
  );
}

export function DonationTierCard({
  amount,
  title,
  description,
  delay = 0
}: {
  amount: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <AnimatedReveal
      delay={delay}
      className="flex h-full flex-col border border-navy-200 bg-paper-50 p-6 transition hover:border-navy-950"
    >
      <p className="text-sm font-semibold text-navy-500">{amount}</p>
      <h3 className="mt-3 text-xl font-semibold text-navy-950">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-navy-700">{description}</p>
    </AnimatedReveal>
  );
}

export function ResourceCard({
  resource,
  delay = 0
}: {
  resource: { title: string; category: string; description: string; meta: string };
  delay?: number;
}) {
  return (
    <AnimatedReveal
      delay={delay}
      className="group border border-navy-200 bg-paper-50 transition hover:border-navy-700"
    >
      <div className="p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="border border-navy-200 bg-paper-100 px-3 py-1 text-xs font-semibold text-navy-800">
          {resource.category}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">
          {resource.meta}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-navy-950">{resource.title}</h3>
      <p className="mt-4 text-sm leading-7 text-navy-700">{resource.description}</p>
      </div>
    </AnimatedReveal>
  );
}
