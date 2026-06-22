import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/content";

type LogoProps = {
  tone?: "light" | "dark";
  href?: string;
  className?: string;
  showTagline?: boolean;
};

export function Logo({ tone = "light", href = "/", className = "", showTagline = true }: LogoProps) {
  const mark = tone === "dark" ? "/images/logowhite2.png" : "/images/logoblue.png";

  return (
    <Link href={href} className={["focus-ring inline-flex items-center gap-3", className].join(" ")}>
      <Image
        src={mark}
        alt={`${site.name} logo`}
        width={199}
        height={58}
        priority
        className="h-10 w-auto sm:h-11"
      />
      {showTagline ? (
        <span
          className={[
            "hidden border-l pl-3 text-xs font-semibold leading-5 lg:block",
            tone === "dark" ? "border-navy-700 text-navy-100" : "border-navy-200 text-navy-600"
          ].join(" ")}
        >
          {site.tagline}
        </span>
      ) : null}
    </Link>
  );
}
