import { stats } from "@/lib/content";

export function StatsSection() {
  return (
    <section className="section-y bg-paper-50">
      <div className="container-px grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-navy-200 bg-navy-50 p-6">
            <p className="font-display text-4xl font-semibold text-navy-950">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-navy-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
