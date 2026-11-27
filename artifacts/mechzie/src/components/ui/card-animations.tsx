/**
 * ReactBits-style animation primitives for MechZie cards.
 * SpotlightCard — radial glow that follows the cursor
 * TiltCard — 3D perspective tilt on hover
 * FadeSlideIn — staggered entrance animation wrapper
 */

import { useRef, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── SpotlightCard ──────────────────────────────────────────── */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "hsl(26 88% 52% / 0.12)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
    card.style.setProperty(
      "--spotlight-gradient",
      `radial-gradient(280px circle at ${x}% ${y}%, ${spotlightColor}, transparent 65%)`
    );
  }, [spotlightColor]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--spotlight-gradient", "none");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("spotlight-card", className)}
      style={{ "--spotlight-gradient": "none" } as React.CSSProperties}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "var(--spotlight-gradient, none)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ── TiltCard ───────────────────────────────────────────────── */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const scale = useSpring(1, { damping: 20, stiffness: 200 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.02);
  }, [scale]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformOrigin: "center",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn("cursor-default will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* ── FadeSlideIn ────────────────────────────────────────────── */
interface FadeSlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  once?: boolean;
}

export function FadeSlideIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: FadeSlideInProps) {
  const initial =
    direction === "up"
      ? { opacity: 0, y: 28 }
      : direction === "left"
      ? { opacity: 0, x: -28 }
      : { opacity: 0, x: 28 };

  const animate =
    direction === "up"
      ? { opacity: 1, y: 0 }
      : direction === "left"
      ? { opacity: 1, x: 0 }
      : { opacity: 1, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggeredGrid ──────────────────────────────────────────── */
interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggeredGrid({ children, className, stagger = 0.07 }: StaggeredGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: any = {
  hidden: { y: 22, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
