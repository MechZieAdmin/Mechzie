import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Radio,
  Users,
  PhoneCall,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Loader2,
  MapPin,
  Clock,
  Navigation,
  Signal,
  Gauge,
  MessageCircle,
  X
} from "lucide-react";

// Types for components
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

export function SOSShowcase() {
  // Request simulation states
  // 'idle' = ready to press-and-hold
  // 'countdown' = hold completed, request is being sent
  // 'connecting' = request sent, platform finding a mechanic
  // 'active' = a verified mechanic has accepted and is en route
  const [sosState, setSosState] = useState<"idle" | "countdown" | "connecting" | "active">("idle");

  // Interaction progress
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // Active request simulation state
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [gpsAccuracy, setGpsAccuracy] = useState(18); // Location accuracy improves in meters
  const [pingSpeed, setPingSpeed] = useState(140); // live-tracking update latency in ms
  const [audioWaves, setAudioWaves] = useState<number[]>([15, 30, 20, 45, 10, 25, 40, 15, 35, 20]);
  const [cancelHoldProgress, setCancelHoldProgress] = useState(0);
  const [isHoldingCancel, setIsHoldingCancel] = useState(false);

  // Refs for tracking animation loops and timers
  const holdAnimRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const telemetryTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const cancelAnimRef = useRef<number | null>(null);
  const cancelStartTimeRef = useRef<number | null>(null);

  // Rescue progress feed — mirrors the real MechZie job flow:
  // request → offers to verified mechanics → first accept claims → en route → live tracking
  const logSequence = [
    "Sending your help request…",
    "Sharing your live location with the MechZie platform…",
    "Location locked — accuracy improving…",
    "Offering your job to verified mechanics nearby…",
    "A verified mechanic accepted your request.",
    "Your mechanic is en route — live tracking started.",
    "In-app call and chat are now available.",
    "Your emergency contacts have been notified.",
    "ETA: 12 minutes. Help is on the way."
  ];

  // Fluctuate GPS and Network Ping in the active state
  useEffect(() => {
    if (sosState !== "active") return;

    const interval = setInterval(() => {
      setGpsAccuracy((prev) => Math.max(3, Number((prev - (prev > 5 ? 1 : 0.1)).toFixed(1))));
      setPingSpeed((prev) => Math.max(45, Math.min(220, Math.floor(prev + (Math.random() * 40 - 20)))));
      
      // Randomize waveform values to animate the in-call audio
      setAudioWaves(() =>
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 40) + 10)
      );
    }, 400);

    return () => clearInterval(interval);
  }, [sosState]);

  // Press & Hold Logic using precise high-performance requestAnimationFrame
  const animateHold = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    
    // Fill up over 1500ms
    const progress = Math.min(100, (elapsed / 1500) * 100);
    setHoldProgress(progress);

    if (progress < 100) {
      holdAnimRef.current = requestAnimationFrame(animateHold);
    } else {
      // Completed! Trigger Countdown
      setHoldProgress(100);
      setIsHolding(false);
      triggerCountdown();
    }
  }, []);

  const animateRelease = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    
    // Snap back to 0 at double speed (750ms)
    setHoldProgress((prev) => {
      const next = Math.max(0, prev - (elapsed / 750) * 100);
      if (next > 0) {
        holdAnimRef.current = requestAnimationFrame(animateRelease);
      } else {
        startTimeRef.current = null;
      }
      return next;
    });
  }, []);

  const handleStartHold = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (sosState !== "idle") return;
    
    setIsHolding(true);
    setWarningMessage(null);
    if (holdAnimRef.current) cancelAnimationFrame(holdAnimRef.current);
    startTimeRef.current = null;
    holdAnimRef.current = requestAnimationFrame(animateHold);
  };

  const handleEndHold = () => {
    if (sosState !== "idle") return;
    
    setIsHolding(false);
    if (holdAnimRef.current) cancelAnimationFrame(holdAnimRef.current);
    
    // If let go early, animate back to 0
    if (holdProgress < 100) {
      startTimeRef.current = null;
      holdAnimRef.current = requestAnimationFrame(animateRelease);
    }
  };

  // Safe Cancel Hold Logic (so user must hold Abort button to prevent misclicks)
  const animateCancelHold = useCallback((timestamp: number) => {
    if (!cancelStartTimeRef.current) cancelStartTimeRef.current = timestamp;
    const elapsed = timestamp - cancelStartTimeRef.current;
    
    // Hold Abort button for 800ms
    const progress = Math.min(100, (elapsed / 800) * 100);
    setCancelHoldProgress(progress);

    if (progress < 100) {
      cancelAnimRef.current = requestAnimationFrame(animateCancelHold);
    } else {
      resetSOS();
    }
  }, []);

  const animateCancelRelease = useCallback((timestamp: number) => {
    if (!cancelStartTimeRef.current) cancelStartTimeRef.current = timestamp;
    const elapsed = timestamp - cancelStartTimeRef.current;
    
    setCancelHoldProgress((prev) => {
      const next = Math.max(0, prev - (elapsed / 400) * 100);
      if (next > 0) {
        cancelAnimRef.current = requestAnimationFrame(animateCancelRelease);
      } else {
        cancelStartTimeRef.current = null;
      }
      return next;
    });
  }, []);

  const handleStartCancel = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsHoldingCancel(true);
    if (cancelAnimRef.current) cancelAnimationFrame(cancelAnimRef.current);
    cancelStartTimeRef.current = null;
    cancelAnimRef.current = requestAnimationFrame(animateCancelHold);
  };

  const handleEndCancel = () => {
    setIsHoldingCancel(false);
    if (cancelAnimRef.current) cancelAnimationFrame(cancelAnimRef.current);
    cancelStartTimeRef.current = null;
    cancelAnimRef.current = requestAnimationFrame(animateCancelRelease);
  };

  // Warning for simple clicks
  const handleSimpleClick = () => {
    if (sosState !== "idle") return;
    if (holdProgress > 0) return; // ignore if holding is in progress

    // Flash interactive helper tooltip
    setWarningMessage("Press and hold for 1.5 seconds to confirm — this prevents accidental requests.");
    setTimeout(() => {
      setWarningMessage(null);
    }, 4500);
  };

  // Clean-up hooks
  useEffect(() => {
    return () => {
      if (holdAnimRef.current) cancelAnimationFrame(holdAnimRef.current);
      if (cancelAnimRef.current) cancelAnimationFrame(cancelAnimRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      telemetryTimeoutRefs.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // 1. Trigger Countdown State
  const triggerCountdown = () => {
    setSosState("countdown");
    setCountdown(3);
    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!);
          triggerConnecting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 2. Trigger Connecting Simulation State
  const triggerConnecting = () => {
    setSosState("connecting");
    setTelemetryLogs([]);
    setActiveLogIndex(0);
    setGpsAccuracy(18);

    // Stagger progress lines so the flow reads step by step
    const delays = [100, 600, 1300, 2000, 2600, 3100, 3800, 4400, 4800, 5200];

    delays.forEach((delay, idx) => {
      const timeout = setTimeout(() => {
        setTelemetryLogs((prev) => [...prev, logSequence[idx]]);
        setActiveLogIndex(idx);

        // At final index, trigger Active status
        if (idx === logSequence.length - 1) {
          setSosState("active");
        }
      }, delay);
      telemetryTimeoutRefs.current.push(timeout);
    });
  };

  // Reset function to cancel the demo request
  const resetSOS = () => {
    if (holdAnimRef.current) cancelAnimationFrame(holdAnimRef.current);
    if (cancelAnimRef.current) cancelAnimationFrame(cancelAnimRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    telemetryTimeoutRefs.current.forEach((t) => clearTimeout(t));
    
    setSosState("idle");
    setHoldProgress(0);
    setIsHolding(false);
    setIsHoldingCancel(false);
    setCancelHoldProgress(0);
    setTelemetryLogs([]);
    setWarningMessage(null);
  };

  return (
    <section
      id="advanced-sos"
      className="relative py-24 sm:py-32 bg-background text-foreground border-y border-border overflow-hidden"
      style={{
        // Section-scoped dark theme: reuse the project's dark token palette
        // (mirrors `.dark` in src/index.css) so this section stays calm and
        // security-feeling while still cohering with the page's orange identity.
        "--background": "240 20% 4%",
        "--foreground": "240 10% 97%",
        "--card": "240 20% 6%",
        "--card-foreground": "240 10% 97%",
        "--border": "240 20% 12%",
        "--muted": "240 20% 12%",
        "--muted-foreground": "240 10% 65%",
        "--secondary": "240 20% 12%",
        "--secondary-foreground": "240 10% 97%",
      } as React.CSSProperties}
    >
      {/* Soft accent lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-60 z-0 bg-[radial-gradient(hsl(var(--foreground)/0.05)_1.2px,transparent_1.2px)] bg-[size:32px_32px]" />

      {/* Outer borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">

        {/* 1. Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-destructive/30 bg-destructive/10 text-xs font-semibold uppercase tracking-widest text-red-400 mb-6"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Emergency help, built in
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight"
          >
            Broken down? <br/>
            <span className="text-red-400">
              Help is on the way.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
          >
            Press and hold in the MechZie app, and a verified nearby mechanic is dispatched to your location — tracked live, reachable by in-app call, paid securely with Razorpay.
          </motion.p>
        </div>

        {/* 2. Interactive Console & SOS Button Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Main Visualizer Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] md:min-h-[500px] w-full rounded-3xl backdrop-blur-md bg-card/40 border border-border p-8 overflow-hidden">
            {/* Embedded accent within container */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-destructive/5 to-transparent opacity-50" />
            
            {/* Interactive State Visualizations */}
            <AnimatePresence mode="wait">
              
              {/* STATE: Idle or Holding (Showcase Main Button) */}
              {(sosState === "idle" || isHolding) && (
                <motion.div
                  key="idle-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center relative z-10"
                >
                  {/* Soft expanding rings around the button */}
                  <div className="absolute pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.8, 2.2], opacity: [0.35, 0.1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-red-500/30"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.4, 1.8], opacity: [0.25, 0.05, 0] }}
                      transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-rose-500/20"
                    />
                  </div>

                  {/* Press-and-hold request button wrapper */}
                  <div
                    onMouseDown={handleStartHold}
                    onMouseUp={handleEndHold}
                    onMouseLeave={handleEndHold}
                    onTouchStart={handleStartHold}
                    onTouchEnd={handleEndHold}
                    onClick={handleSimpleClick}
                    className="relative cursor-pointer select-none touch-none scale-100 active:scale-95 transition-transform duration-150"
                  >
                    {/* SVG Circular Progress Ring */}
                    <svg className="w-56 h-56 -rotate-90 pointer-events-none">
                      {/* Base Track */}
                      <circle
                        cx="112"
                        cy="112"
                        r="88"
                        className="stroke-muted fill-none"
                        strokeWidth="3.5"
                      />
                      {/* Active Glowing Path */}
                      <circle
                        cx="112"
                        cy="112"
                        r="88"
                        className="stroke-red-600 fill-none transition-all duration-75"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * (1 - holdProgress / 100)}
                      />
                    </svg>

                    {/* Inner capsule */}
                    <motion.div
                      animate={isHolding ? { y: 0, scale: 0.98 } : { y: [0, -8, 0] }}
                      transition={
                        isHolding
                          ? { duration: 0.15 }
                          : { repeat: Infinity, duration: 4, ease: "easeInOut" }
                      }
                      className="absolute inset-8 rounded-full bg-destructive flex flex-col items-center justify-center p-2 shadow-lg border border-red-500/40"
                    >
                      {/* Subtle top highlight */}
                      <div className="absolute top-1.5 inset-x-4 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />

                      <ShieldAlert className={`w-10 h-10 text-destructive-foreground mb-1 transition-transform duration-300 ${isHolding ? "scale-110" : ""}`} />

                      <span className="text-3xl font-black tracking-widest text-destructive-foreground font-sans select-none">
                        SOS
                      </span>

                      <span className="text-[9px] font-bold tracking-widest text-destructive-foreground/80 mt-1 uppercase text-center max-w-[100px] select-none">
                        {isHolding ? "Keep holding…" : "Get help"}
                      </span>
                    </motion.div>
                  </div>

                  {/* Dynamic Instructions */}
                  <div className="mt-8 text-center min-h-[50px]">
                    <AnimatePresence mode="wait">
                      {warningMessage ? (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-amber-400 font-semibold max-w-sm flex items-center justify-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 shadow-sm"
                        >
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-pulse" />
                          {warningMessage}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs tracking-wider text-muted-foreground font-light"
                        >
                          {isHolding ? (
                            <span className="font-semibold text-red-400 flex items-center justify-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                              Keep holding… {(holdProgress).toFixed(0)}%
                            </span>
                          ) : (
                            "Press and hold the button to request help."
                          )}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* STATE: Sending request */}
              {sosState === "countdown" && (
                <motion.div
                  key="countdown-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center z-10 w-full"
                >
                  {/* Soft expanding rings */}
                  <div className="absolute pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 2.5, 3.2], opacity: [0.6, 0.1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-red-500/40 bg-red-500/5"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.8, 2.4], opacity: [0.5, 0.05, 0] }}
                      transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-red-500/30"
                    />
                  </div>

                  <div className="relative w-44 h-44 rounded-full bg-destructive/20 border border-destructive/40 flex flex-col items-center justify-center">
                    <motion.span
                      key={countdown}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="text-7xl font-black text-foreground"
                    >
                      {countdown > 0 ? `0${countdown}` : "Sent"}
                    </motion.span>

                    <span className="text-[10px] tracking-widest text-red-400 font-bold mt-2 uppercase animate-pulse">
                      Sending…
                    </span>
                  </div>

                  <p className="mt-8 text-sm text-muted-foreground font-medium tracking-wide">
                    Sending your request and location…
                  </p>

                  <button
                    onClick={resetSOS}
                    className="mt-6 flex items-center gap-1.5 px-6 py-2 rounded-full border border-border hover:border-destructive/50 bg-secondary hover:bg-destructive/20 text-xs font-semibold tracking-wider text-muted-foreground hover:text-red-300 transition-all active:scale-95 z-20 shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel request
                  </button>
                </motion.div>
              )}

              {/* STATE: Finding a mechanic */}
              {sosState === "connecting" && (
                <motion.div
                  key="connecting-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col justify-between z-10 relative"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-xs text-muted-foreground tracking-wide font-semibold">
                        Finding a verified mechanic nearby
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                      Working…
                    </div>
                  </div>

                  {/* Location pulse map */}
                  <div className="h-44 w-full bg-card rounded-2xl border border-border relative overflow-hidden flex items-center justify-center mb-6">
                    
                    {/* Concentric Signal Circles */}
                    <div className="absolute w-36 h-36 rounded-full border border-red-500/10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-red-500/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/15 flex items-center justify-center animate-pulse">
                          <Radio className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                    </div>

                    {/* Vector coordinates mock grid lines */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-border/60" />
                    <div className="absolute left-1/2 top-0 h-full w-px bg-border/60" />
                    
                    {/* Your location — softly pulsing while mechanics are offered the job */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      className="absolute flex flex-col items-center pointer-events-none"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                      <span className="text-[9px] text-red-300 font-medium mt-1.5 bg-card/80 px-1.5 py-0.5 border border-border rounded">
                        You are here
                      </span>
                    </motion.div>
                  </div>

                  {/* Progress feed */}
                  <div className="flex-1 bg-secondary/60 rounded-xl p-4 border border-border text-[11px] leading-relaxed text-muted-foreground h-32 overflow-y-auto overflow-x-hidden flex flex-col gap-1.5">
                    {telemetryLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`truncate ${index === activeLogIndex ? "text-foreground font-semibold" : ""}`}
                      >
                        {log}
                      </motion.div>
                    ))}
                    <div className="animate-pulse w-1.5 h-3 bg-red-400 inline-block self-start mt-1" />
                  </div>
                </motion.div>
              )}

              {/* STATE: Fully Deployed Active Telemetry Dashboard */}
              {sosState === "active" && (
                <motion.div
                  key="active-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full h-full flex flex-col z-10"
                >
                  {/* Top status header */}
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs text-emerald-400 tracking-wide font-semibold">
                        Mechanic assigned · Help is on the way
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Signal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Live</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-red-400" />
                        <span className="font-mono">{pingSpeed}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard: tracking, call, assigned mechanic */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mb-5">

                    {/* Module 1: Live job tracking */}
                    <div className="bg-card/60 rounded-2xl border border-border p-4 relative overflow-hidden flex flex-col justify-between h-[160px]">

                      <div className="flex items-start justify-between z-10">
                        <div>
                          <h4 className="text-xs font-semibold text-foreground mb-0.5">
                            Live tracking
                          </h4>
                          <p className="text-[10px] text-muted-foreground">
                            Your mechanic's location updates in real time
                          </p>
                        </div>
                        <MapPin className="w-4 h-4 text-red-400 animate-pulse" />
                      </div>

                      {/* Live coordinates */}
                      <div className="my-2 z-10">
                        <div className="text-lg font-mono text-foreground font-bold leading-none mb-1">
                          17° 26' 53.9" N
                        </div>
                        <div className="text-lg font-mono text-foreground font-bold leading-none">
                          78° 22' 26.8" E
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-2 z-10">
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wide">
                          Location accuracy
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          ±{gpsAccuracy.toFixed(1)}m
                        </span>
                      </div>
                    </div>

                    {/* Module 2: In-job audio call */}
                    <div className="bg-card/60 rounded-2xl border border-border p-4 flex flex-col justify-between h-[160px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-foreground mb-0.5">
                            In-app call
                          </h4>
                          <p className="text-[10px] text-muted-foreground">
                            Talk to your mechanic without sharing numbers
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] text-emerald-400 font-semibold">On call</span>
                        </div>
                      </div>

                      {/* Interactive fluctuating Audio waves */}
                      <div className="h-14 flex items-end justify-center gap-1 px-4 my-2">
                        {audioWaves.map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: h }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-1.5 bg-red-400/80 rounded-full origin-bottom"
                            style={{
                              boxShadow: "0 0 6px rgba(239, 68, 68, 0.3)"
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-2">
                        <span className="text-[9px] text-muted-foreground uppercase tracking-wide">
                            Also available
                        </span>
                        <span className="text-[10px] text-foreground font-medium flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-red-400" />
                          In-job chat
                        </span>
                      </div>
                    </div>

                    {/* Module 3: Assigned mechanic */}
                    <div className="bg-card/60 rounded-2xl border border-border p-4 flex flex-col justify-between h-[160px] md:col-span-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center border border-destructive/30">
                            <Clock className="w-5 h-5 text-red-400" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground leading-none mb-1">
                              Your mechanic is on the way
                            </h4>
                            <span className="text-[10px] text-muted-foreground">
                              First verified mechanic to accept takes the job
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          ETA <span className="font-mono">12 min</span>
                        </span>
                      </div>

                      <div className="my-2 border-y border-border py-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[9px] uppercase tracking-wide">Assigned mechanic</span>
                          <span className="text-foreground font-bold">Vignan M. <span className="font-normal text-muted-foreground">· documents verified by MechZie</span></span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-muted-foreground text-[9px] uppercase tracking-wide">Status</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            En route
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-muted-foreground" />
                          Your emergency contacts have been notified
                        </span>
                        <span className="text-red-400 font-medium flex items-center gap-1">
                          <PhoneCall className="w-3 h-3 text-red-400" />
                          Call connected
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hold to cancel the demo request */}
                  <div
                    onMouseDown={handleStartCancel}
                    onMouseUp={handleEndCancel}
                    onMouseLeave={handleEndCancel}
                    onTouchStart={handleStartCancel}
                    onTouchEnd={handleEndCancel}
                    className="relative cursor-pointer select-none touch-none w-full scale-100 active:scale-98 transition-transform"
                  >
                    {/* Action Progress Bar */}
                    <div className="absolute inset-0 rounded-xl bg-secondary border border-border" />

                    <div
                      className="absolute inset-y-0 left-0 bg-destructive/25 border-r border-red-500/40 rounded-l-xl transition-all duration-75"
                      style={{ width: `${cancelHoldProgress}%` }}
                    />

                    <div className="relative h-12 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-red-400 hover:text-red-300">
                      <RefreshCw className={`w-4 h-4 ${isHoldingCancel ? "animate-spin" : ""}`} />
                      {isHoldingCancel
                        ? `Keep holding… ${(cancelHoldProgress).toFixed(0)}%`
                        : "Press and hold to cancel the request"
                      }
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Proof points — what actually happens */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FeatureCard
              title="Verified mechanics, first to accept"
              description="Every mechanic's documents are reviewed by the MechZie team before they can go online. Your job is offered to verified mechanics nearby — the first to accept claims it instantly."
              icon={<ClockCardIcon />}
              delay={0}
            />

            <FeatureCard
              title="Live tracking, door to door"
              description="Once a mechanic accepts, you watch them approach on the map with a live ETA. No guessing, no waiting in the dark."
              icon={<TrackingCardIcon />}
              delay={0.1}
            />

            <FeatureCard
              title="Call, chat, and pay in the app"
              description="Talk to your mechanic over an in-app call or chat without sharing your number, pay securely with Razorpay, and up to 2 emergency contacts can be kept informed."
              icon={<UsersCardIcon />}
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// CUSTOM FEATURE CARDS (WITH HOVER SPOTLIGHT)
// ---------------------------------------------------------
function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex items-start gap-5 p-6 rounded-2xl bg-card/60 hover:bg-card border border-border backdrop-blur-sm transition-all duration-300 group overflow-hidden relative"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Interactive mouse spotlight overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(239, 68, 68, 0.08), transparent 80%)"
        }}
      />

      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-red-400 group-hover:text-red-300 group-hover:border-red-500/30 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 relative z-10">
        {icon}
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-lg font-bold text-foreground group-hover:text-red-300 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground font-light leading-relaxed group-hover:text-foreground/90 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------
// MICRO-ANIMATED ICONS FOR INDIVIDUAL CARDS
// ---------------------------------------------------------

// 1. Stopwatch with sweeping timer sweep
function ClockCardIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Clock className="w-5 h-5" />
      {/* Sweeping dot or radar arc */}
      <svg className="absolute w-6 h-6 inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-0 group-hover:animate-[spin_2s_linear_infinite]">
        <circle
          cx="12"
          cy="12"
          r="10"
          className="stroke-red-500/30 fill-none"
          strokeWidth="1.5"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          className="stroke-red-500 fill-none"
          strokeWidth="2"
          strokeDasharray="62"
          strokeDashoffset="54"
        />
      </svg>
    </div>
  );
}

// 2. Tracking pin with a soft location pulse
function TrackingCardIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Navigation className="w-5 h-5 group-hover:scale-95 group-hover:rotate-[15deg] transition-transform duration-500" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />

      {/* Radiating location rings */}
      <svg className="absolute w-7 h-7 inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <circle
          cx="12"
          cy="12"
          r="8"
          className="stroke-red-400/60 fill-none animate-pulse"
          strokeWidth="1"
        />
        <circle
          cx="12"
          cy="12"
          r="11"
          className="stroke-red-400/30 fill-none animate-pulse"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// 3. Connecting users / broadcast ripple
function UsersCardIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Users className="w-5 h-5 group-hover:scale-95 transition-transform duration-300" />
      
      {/* Pulsing broadcast network rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute w-7 h-7 rounded-full border border-red-500/0 group-hover:border-red-500/25 group-hover:scale-125 transition-all duration-700 ease-out" />
        <span className="absolute w-7 h-7 rounded-full border border-red-500/0 group-hover:border-red-500/10 group-hover:scale-150 transition-all duration-700 ease-out delay-100" />
      </div>
    </div>
  );
}
