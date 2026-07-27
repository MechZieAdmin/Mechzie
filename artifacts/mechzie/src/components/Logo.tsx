import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export function Logo({ className = "", size = 40, animate = false }: LogoProps) {
  // Speed lines subtle sliding/charging animation
  const line1Variants = {
    initial: { x: 0 },
    animate: {
      x: [0, -6, 0],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
      },
    },
  };

  const line2Variants = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  const line3Variants = {
    initial: { x: 0 },
    animate: {
      x: [0, -8, 0],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
  };

  const dotVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 0.8, 1],
      opacity: [1, 0.7, 1],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const line4Variants = {
    initial: { x: 0 },
    animate: {
      x: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.6,
      },
    },
  };

  // Subtle rotation or pulse for the wrench head
  const wrenchVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 8,
        ease: "linear",
      },
    },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <mask id="wrench-mask-logo">
          {/* Keep everything inside the white rect, subtract the black shapes */}
          <rect width="200" height="200" fill="white" />
          <circle cx="140" cy="100" r="22" fill="black" />
          <rect x="140" y="86" width="50" height="28" fill="black" />
        </mask>
      </defs>

      {/* Speed lines (left side) */}
      <motion.path
        d="M 55 76 L 120 76"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        variants={animate ? line1Variants : undefined}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 15 100 L 110 100"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        variants={animate ? line2Variants : undefined}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 65 124 L 120 124"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        variants={animate ? line3Variants : undefined}
        initial="initial"
        animate="animate"
      />
      <motion.circle
        cx="40"
        cy="124"
        r="6"
        fill="currentColor"
        variants={animate ? dotVariants : undefined}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 100 145 L 135 145"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        variants={animate ? line4Variants : undefined}
        initial="initial"
        animate="animate"
      />

      {/* Wrench head circle (right side) */}
      <motion.circle
        cx="140"
        cy="100"
        r="45"
        fill="currentColor"
        mask="url(#wrench-mask-logo)"
        style={{ originX: "140px", originY: "100px" }}
        variants={animate ? wrenchVariants : undefined}
        initial="initial"
        animate="animate"
      />
    </svg>
  );
}
