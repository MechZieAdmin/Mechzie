import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

const STORAGE_KEY = "mechzie_loader_seen";

export function LoadingScreen() {
  // Show the intro only on the first visit in this browser; never block returning
  // users or mobile visitors who just need the product.
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      // Never block mobile visitors — the whole audience arrives on phones.
      if (window.innerWidth < 768) return false;
      return !window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return false; // storage unavailable (private mode etc.) -> skip the loader
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* non-fatal */
    }

    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const hideTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease-in-out",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-primary"
        >
          <Logo size={100} animate={true} />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-foreground"
        >
          Mech<span className="text-primary">Zie</span>
        </motion.div>
      </div>
    </div>
  );
}
