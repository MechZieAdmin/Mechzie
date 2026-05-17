import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-6 text-primary"
        >
          <Settings size={64} strokeWidth={1.5} />
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
