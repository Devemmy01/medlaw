import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { navItems, site } from "@/lib/content";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/Medlawhub",
    icon: Facebook
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/Medlawhub",
    icon: Instagram
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@medicallawhub2365?si=Fma7zG02sTdNaVZt",
    icon: Youtube
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/medical-law-hub/",
    icon: Linkedin
  }
];

export function Footer() {
  return (
    <footer className="dark-surface text-paper-50">
      <div className="container-px py-16">
        <div className="mb-12 border border-navy-700 bg-navy-900 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <Logo tone="dark" showTagline={false} />
            <p className="max-w-2xl text-sm leading-7 text-navy-100">
              A global non-profit platform advancing patient rights, ethical healthcare, legal accountability
              and modern medico-legal research.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.8fr_1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-200">Where Medicine Meets Law</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-navy-100">
              Advancing education, research and public awareness in medical, clinical and health law.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-200">Quick links</h2>
            <div className="mt-5 grid gap-3">
              {navItems.slice(0, 8).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-navy-100 transition hover:text-paper-50">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-200">Contact</h2>
            <div className="mt-5 grid gap-4 text-sm text-navy-100">
              <p className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy-200" />
                <a href={`mailto:${site.email}`} className="hover:text-paper-50">
                  {site.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy-200" />
                <span>{site.phones.join(" | ")}</span>
              </p>
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy-200" />
                <span>{site.address}</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-200">Socials</h2>
            <p className="mt-5 text-sm leading-7 text-navy-100">
              Follow Medical Law Hub for publication updates, public education campaigns and event notices.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex min-h-12 items-center gap-3 border border-navy-700 bg-navy-900 px-4 text-sm font-semibold text-navy-100 transition hover:border-paper-50 hover:bg-paper-50 hover:text-navy-950"
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-700 pt-6 text-sm text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© Medical Law Hub. Where Medicine Meets Law.</p>
          <p>
            Powered by{" "}
            <a
              href="https://www.hardensoft.com.ng"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-paper-50 underline underline-offset-4 transition hover:text-navy-200"
            >
              Hardensoft Digitals
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
