"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & HTMLMotionProps<"div">;

export function AnimatedReveal({ children, className, delay = 0, ...props }: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
