import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  tone?: "light" | "navy";
};

export function PageWrapper({ children, tone = "light" }: PageWrapperProps) {
  return (
    <main
      className={
        tone === "navy"
          ? "min-h-screen bg-navy-950 text-paper-50"
          : "min-h-screen overflow-hidden bg-paper-100 text-navy-950"
      }
    >
      {children}
    </main>
  );
}
