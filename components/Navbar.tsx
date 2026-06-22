"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/Logo";
import { navItems, site } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-200 bg-paper-50">
      <div className="hidden border-b border-navy-200 bg-paper-100 text-navy-800 lg:block">
        <div className="container-px flex min-h-9 items-center justify-between gap-6 text-xs font-medium">
          <p>{site.tagline}</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition hover:text-navy-950">
              <Mail aria-hidden="true" className="size-3.5 text-navy-500" />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Phone aria-hidden="true" className="size-3.5 text-navy-500" />
              {site.phones.join(" | ")}
            </span>
          </div>
        </div>
      </div>
      <nav className="container-px flex min-h-20 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={[
                    "focus-ring inline-flex min-h-10 items-center gap-1 px-3.5 text-[12px] font-semibold uppercase tracking-[0.05em] transition",
                    active ? "bg-navy-950 text-paper-50" : "text-navy-700 hover:bg-navy-50 hover:text-navy-950"
                  ].join(" ")}
                >
                  {item.label}
                  {item.children ? <ChevronDown aria-hidden="true" className="size-3.5" /> : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-0 top-full w-72 translate-y-3 border border-navy-200 bg-paper-50 p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-950"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <HamburgerButton open={open} onClick={() => setOpen((value) => !value)} />
      </nav>

      <AnimatePresence>
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </header>
  );
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "focus-ring group inline-flex h-12 items-center gap-3 border px-3 transition lg:hidden",
        open ? "border-navy-950 bg-navy-950 text-paper-50" : "border-navy-300 bg-paper-50 text-navy-950"
      ].join(" ")}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <span className="relative block h-4 w-7" aria-hidden="true">
        <motion.span
          className="absolute left-0 top-0 h-[2px] w-7 bg-current"
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-current"
          animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] w-7 bg-current"
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
        {open ? "Close" : "Menu"}
      </span>
    </button>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panel = {
    hidden: { opacity: 0, y: -18, clipPath: "inset(0 0 100% 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.46,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.055,
        delayChildren: 0.08
      }
    },
    exit: {
      opacity: 0,
      y: -14,
      clipPath: "inset(0 0 100% 0)",
      transition: { duration: 0.26, ease: [0.55, 0.06, 0.68, 0.19] }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-x-0 top-full z-40 border-b border-navy-200 bg-paper-50 lg:hidden"
    >
      <div className="container-px py-5">
        <div className="overflow-hidden border border-navy-200 bg-paper-100">
          {navItems.map((navItem, index) => (
            <motion.div key={navItem.href} variants={item}>
              <Link
                href={navItem.href}
                onClick={onClose}
                className="focus-ring grid grid-cols-[3.5rem_1fr_auto] items-center border-b border-navy-200 px-4 py-4 text-navy-950 transition hover:bg-navy-50"
              >
                <span className="text-xs font-semibold text-navy-400">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold uppercase leading-none tracking-[-0.04em]">
                  {navItem.label}
                </span>
                <span className="text-lg leading-none">↗</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-4 grid gap-4 border border-navy-200 bg-paper-50 p-4 sm:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="section-label">Direct channels</p>
            <div className="mt-4 grid gap-2 text-sm font-medium text-navy-800">
              <a href={`mailto:${site.email}`} className="hover:text-navy-950">
                {site.email}
              </a>
              <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} className="hover:text-navy-950">
                {site.phones.join(" | ")}
              </a>
            </div>
          </div>
          <div className="grid gap-2">
            <Link
              href="/donate"
              onClick={onClose}
              className="focus-ring inline-flex min-h-11 items-center justify-center border border-navy-950 bg-navy-950 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-paper-50 transition hover:bg-paper-50 hover:text-navy-950"
            >
              Donate
            </Link>
            <Link
              href="/get-involved"
              onClick={onClose}
              className="focus-ring inline-flex min-h-11 items-center justify-center border border-navy-300 bg-paper-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy-950 transition hover:border-navy-950 hover:bg-navy-50"
            >
              Get Involved
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-4 border-x border-b border-navy-200 bg-navy-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-100"
        >
          Where Medicine Meets Law
        </motion.div>
      </div>
    </motion.div>
  );
}
