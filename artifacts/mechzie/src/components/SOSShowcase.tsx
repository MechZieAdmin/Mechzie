import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Radio,
  Satellite,
  Volume2,
  Users,
  PhoneCall,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Mic,
  Wifi,
  Compass,
  MapPin,
  Clock,
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
  // SOS Simulation States
  // 'idle' = normal, ready to press-and-hold
  // 'holding' = button currently being held down, progress bar filling
  // 'countdown' = progress reached 100%, ticking down 3, 2, 1
  // 'connecting' = countdown finished, mock telemetry spinning & satellite connecting
  // 'active' = fully deployed telemetry console
  const [sosState, setSosState] = useState<"idle" | "countdown" | "connecting" | "active">("idle");
  
  // Interaction Progress
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  
  // Active Telemetry Simulation State
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [gpsAccuracy, setGpsAccuracy] = useState(18); // Accuracy improves in meters
  const [pingSpeed, setPingSpeed] = useState(140); // ping in ms fluctuating
  const [audioWaves, setAudioWaves] = useState<number[]>([15, 30, 20, 45, 10, 25, 40, 15, 35, 20]);
  const [dispatcherUnit, setDispatcherUnit] = useState<string | null>(null);
  const [cancelHoldProgress, setCancelHoldProgress] = useState(0);
  const [isHoldingCancel, setIsHoldingCancel] = useState(false);

  // Refs for tracking animation loops and timers
  const holdAnimRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const telemetryTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const cancelAnimRef = useRef<number | null>(null);
  const cancelStartTimeRef = useRef<number | null>(null);

  // Telemetry Log Feed Sequence
  const logSequence = [
    "[SYSTEM] SOS Protocol Initiated via Secure Transceiver...",
    "[NETWORK] Checking primary LEO satellite constellation...",
    "[NETWORK] Connection established with Sat-ID: MECH-X11 [Signal: Strong]",
    "[GPS] High-accuracy telemetry packet broadcasting on 137.9 MHz...",
    "[GPS] Triangulating ground position via carrier-phase differential...",
    "[SECURITY] One-Touch emergency callout distributed to designate contacts...",
    "[AUDIO] Remote Blackbox ambient audio recording active. Storage cryptographically sealed.",
    "[DISPATCH] Dispatch signal routed to Elite Command Center.",
    "[DISPATCH] Elite Response Unit #098 Assigned (Mech-Specialist: Vignan Muraharirao).",
    "[STATUS] Interception ETA: 12 Minutes. Active satellite beacon pinging..."
  ];

  // Fluctuate GPS and Network Ping in the active state
  useEffect(() => {
    if (sosState !== "active") return;

    const interval = setInterval(() => {
      setGpsAccuracy((prev) => Math.max(3, Number((prev - (prev > 5 ? 1 : 0.1)).toFixed(1))));
      setPingSpeed((prev) => Math.max(45, Math.min(220, Math.floor(prev + (Math.random() * 40 - 20)))));
      
      // Randomize waveform values to animate recording mic
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
    setWarningMessage("TACTILE ENGAGEMENT REQUIRED: Press & hold the capsule button for 1.5s to deploy SOS.");
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
    setDispatcherUnit(null);

    // Stagger telemetry loading log lines for premium hacking feel
    const delays = [100, 600, 1300, 2000, 2600, 3100, 3800, 4400, 4800, 5200];
    
    delays.forEach((delay, idx) => {
      const timeout = setTimeout(() => {
        setTelemetryLogs((prev) => [...prev, logSequence[idx]]);
        setActiveLogIndex(idx);
        
        // At index 8, assign the elite dispatcher unit name
        if (idx === 8) {
          setDispatcherUnit("Dispatch Unit RX-098 (Vignan Muraharirao)");
        }

        // At final index, trigger Active status
        if (idx === logSequence.length - 1) {
          setSosState("active");
        }
      }, delay);
      telemetryTimeoutRefs.current.push(timeout);
    });
  };

  // Reset function to abort emergency session
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
    <section id="advanced-sos" className="relative py-24 sm:py-32 bg-[#09090B] border-y border-zinc-900 overflow-hidden">
      {/* Self-contained encapsulated advanced styling */}
      <style>{`
        .sos-pattern-grid {
          background-image: radial-gradient(rgba(239, 68, 68, 0.06) 1.2px, transparent 1.2px);
          background-size: 32px 32px;
        }
        .glowing-radar-sweep {
          background: linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0) 100%);
          animation: scanLine 4s infinite linear;
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .text-neon-glow {
          text-shadow: 0 0 10px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2);
        }
        .card-glowing-border {
          position: relative;
          z-index: 10;
        }
        .card-glowing-border::before {
          content: "";
          position: absolute;
          inset: 0px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(to bottom right, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.02) 40%, rgba(239, 68, 68, 0) 70%, rgba(239, 68, 68, 0.08));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .premium-shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .premium-shimmer-btn::after {
          content: "";
          position: absolute;
          top: 0; right: 0; bottom: 0; left: -100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
          animation: buttonShimmer 3s infinite;
        }
        @keyframes buttonShimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>

      {/* Cybernetic Accent Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-orange-950/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Interactive Tactical Grid */}
      <div className="absolute inset-0 sos-pattern-grid pointer-events-none opacity-60 z-0" />
      
      {/* Outer borders and glow accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-950/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-950/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. Catchy Premium Slogan / Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-950/10 text-xs font-semibold uppercase tracking-widest text-red-500 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Mechzie Active Telemetry
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Instant Peace of Mind. <br/>
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent text-neon-glow">
              Premium Security on Wheels.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Mechzie's Advanced SOS bridges the gap between emergency and immediate elite assistance with a single touch.
          </motion.p>
        </div>

        {/* 2. Interactive Console & SOS Button Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Main Visualizer Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[460px] md:min-h-[500px] w-full rounded-3xl backdrop-blur-md bg-white/[0.01] border border-zinc-900 p-8 shadow-[inset_0_0_30px_rgba(239,68,68,0.01)] overflow-hidden">
            {/* Embedded glow accent within container */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-950/5 to-transparent opacity-50" />
            
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
                  {/* Glowing background rings (Anti-gravity floating pulse waves) */}
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

                  {/* Tactile SOS Button Trigger Wrapper */}
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
                    <svg className="w-56 h-56 -rotate-90 pointer-events-none drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      {/* Base Track */}
                      <circle
                        cx="112"
                        cy="112"
                        r="88"
                        className="stroke-zinc-900/60 fill-none"
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
                        style={{
                          filter: holdProgress > 0 ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))" : "none"
                        }}
                      />
                    </svg>

                    {/* Anti-Gravity Inner Floating Capsule */}
                    <motion.div
                      animate={isHolding ? { y: 0, scale: 0.98 } : { y: [0, -8, 0] }}
                      transition={
                        isHolding 
                          ? { duration: 0.15 } 
                          : { repeat: Infinity, duration: 4, ease: "easeInOut" }
                      }
                      className="absolute inset-8 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-rose-950 flex flex-col items-center justify-center p-2 shadow-[0_0_40px_rgba(239,68,68,0.4),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-4px_10px_rgba(0,0,0,0.4)] border border-red-500/40"
                    >
                      {/* Glass Shimmer Glare */}
                      <div className="absolute top-1.5 inset-x-4 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-full pointer-events-none" />
                      
                      <ShieldAlert className={`w-10 h-10 text-white mb-1 drop-shadow-md transition-transform duration-300 ${isHolding ? "scale-110 rotate-12" : ""}`} />
                      
                      <span className="text-3xl font-black tracking-widest text-white font-sans drop-shadow-md select-none">
                        SOS
                      </span>
                      
                      <span className="text-[9px] font-bold tracking-widest text-red-100/90 mt-1 uppercase text-center max-w-[100px] select-none">
                        {isHolding ? "ENGAGING..." : "ACTIVATE RESCUE"}
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
                          className="text-xs text-amber-500 font-semibold max-w-sm flex items-center justify-center gap-1.5 bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-500/20 shadow-sm"
                        >
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-bounce" />
                          {warningMessage}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs tracking-wider text-zinc-400 font-light"
                        >
                          {isHolding ? (
                            <span className="font-semibold text-red-500 flex items-center justify-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                              HOLD SECURE: {(holdProgress).toFixed(0)}%
                            </span>
                          ) : (
                            "CRITICAL INITIATION: Touch & hold to establish emergency link."
                          )}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* STATE: Countdown State */}
              {sosState === "countdown" && (
                <motion.div
                  key="countdown-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center z-10 w-full"
                >
                  {/* Multi-layered expanding alert waves */}
                  <div className="absolute pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 2.5, 3.2], opacity: [0.6, 0.1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-red-500/40 bg-red-500/5"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.8, 2.4], opacity: [0.5, 0.05, 0] }}
                      transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-rose-500/30"
                    />
                  </div>

                  <div className="relative w-44 h-44 rounded-full bg-red-950/40 border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.3)] flex flex-col items-center justify-center">
                    <motion.span
                      key={countdown}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="text-7xl font-black text-white text-neon-glow"
                    >
                      {countdown > 0 ? `0${countdown}` : "GO"}
                    </motion.span>
                    
                    <span className="text-[10px] tracking-widest text-red-500 font-bold mt-2 uppercase animate-pulse">
                      BROADCASTING...
                    </span>
                  </div>

                  <p className="mt-8 text-sm text-zinc-300 font-medium tracking-wide">
                    Satellite transponder locking onto coordinates...
                  </p>

                  <button
                    onClick={resetSOS}
                    className="mt-6 flex items-center gap-1.5 px-6 py-2 rounded-full border border-white/10 hover:border-red-500/40 bg-zinc-900/60 hover:bg-red-950/20 text-xs font-semibold tracking-wider text-zinc-400 hover:text-red-500 transition-all active:scale-95 z-20 shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                    CANCEL LAUNCH
                  </button>
                </motion.div>
              )}

              {/* STATE: Connecting / Connecting Telemetry Logs */}
              {sosState === "connecting" && (
                <motion.div
                  key="connecting-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col justify-between z-10 relative"
                >
                  {/* Top Scanning Status Header */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-mono text-zinc-300 tracking-wider font-semibold uppercase">
                        Establishing LEO Sat-Link
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                      <Loader2 className="w-3 h-3 animate-spin text-red-500" />
                      SYNCHRONIZING...
                    </div>
                  </div>

                  {/* Vector Orbit Mapping Grid */}
                  <div className="h-44 w-full bg-[#030303] rounded-2xl border border-zinc-900 relative overflow-hidden flex items-center justify-center mb-6">
                    {/* Glowing radar sweep */}
                    <div className="absolute inset-x-0 h-1/2 glowing-radar-sweep pointer-events-none" />
                    
                    {/* Concentric Signal Circles */}
                    <div className="absolute w-36 h-36 rounded-full border border-red-500/10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-red-500/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/15 flex items-center justify-center animate-pulse">
                          <Radio className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                    </div>

                    {/* Vector coordinates mock grid lines */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-900/50" />
                    <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-900/50" />
                    
                    {/* Moving satellite node */}
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        x: [0, 5, 0, -5, 0],
                        y: [0, -4, 0, 4, 0]
                      }}
                      transition={{ 
                        rotate: { repeat: Infinity, duration: 12, ease: "linear" },
                        default: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                      }}
                      className="absolute w-24 h-24 origin-center pointer-events-none"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
                        <span className="text-[7px] font-mono text-red-500 font-bold mt-1 bg-zinc-950/80 px-1 border border-red-500/20 rounded">LEO-M09</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Console logs output */}
                  <div className="flex-1 bg-black/60 rounded-xl p-4 border border-zinc-900 font-mono text-[10px] leading-relaxed text-red-500/90 h-32 overflow-y-auto overflow-x-hidden flex flex-col gap-1.5 scrollbar-thin">
                    {telemetryLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`truncate ${index === activeLogIndex ? "text-white font-semibold" : ""}`}
                      >
                        {log}
                      </motion.div>
                    ))}
                    <div className="animate-pulse w-1.5 h-3 bg-red-500 inline-block self-start mt-1" />
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
                  {/* Top Security Status Header */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-mono text-emerald-400 tracking-wider font-semibold uppercase">
                        Tactile Link Secure [Active]
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                        <span>SAT: SECURE</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-red-500 animate-spin" />
                        <span>PING: {pingSpeed}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* 2x2 Tactical Grid Dashboard Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mb-5">
                    
                    {/* Module 1: Live Orbit Map Coordinate Telemetry */}
                    <div className="bg-black/60 rounded-2xl border border-zinc-900 p-4 relative overflow-hidden flex flex-col justify-between h-[160px] shadow-[inset_0_0_15px_rgba(239,68,68,0.01)]">
                      <div className="absolute inset-0 glowing-radar-sweep pointer-events-none" />
                      
                      <div className="flex items-start justify-between z-10">
                        <div>
                          <h4 className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider mb-1">
                            GPS Live Tracking
                          </h4>
                          <p className="text-[9px] font-mono text-zinc-400">
                            Carrier-phase Differential GPS
                          </p>
                        </div>
                        <MapPin className="w-4 h-4 text-red-500 animate-bounce" />
                      </div>

                      {/* Mock Interactive Mapping coordinates */}
                      <div className="my-2 z-10">
                        <div className="text-lg font-mono text-white font-bold leading-none mb-1">
                          17° 26' 53.9" N
                        </div>
                        <div className="text-lg font-mono text-white font-bold leading-none">
                          78° 22' 26.8" E
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 z-10">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          ACCURACY RANGE
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold">
                          ±{gpsAccuracy.toFixed(1)}m (Optimized)
                        </span>
                      </div>
                    </div>

                    {/* Module 2: Blackbox Ambient Audio recording wave */}
                    <div className="bg-black/60 rounded-2xl border border-zinc-900 p-4 flex flex-col justify-between h-[160px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider mb-1">
                            Blackbox Audio Link
                          </h4>
                          <p className="text-[9px] font-mono text-zinc-400">
                            Streaming encrypted ambient feeds
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span className="text-[9px] font-mono text-red-500 font-bold uppercase">REC</span>
                        </div>
                      </div>

                      {/* Interactive fluctuating Audio waves */}
                      <div className="h-14 flex items-end justify-center gap-1 px-4 my-2">
                        {audioWaves.map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: h }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-1.5 bg-red-500 rounded-full origin-bottom"
                            style={{
                              boxShadow: "0 0 6px rgba(239, 68, 68, 0.4)"
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          ENC SCHEME
                        </span>
                        <span className="text-[9px] font-mono text-zinc-300 font-semibold">
                          AES-GCM 256bit
                        </span>
                      </div>
                    </div>

                    {/* Module 3: Active Response Unit info */}
                    <div className="bg-black/60 rounded-2xl border border-zinc-900 p-4 flex flex-col justify-between h-[160px] md:col-span-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-rose-950 flex items-center justify-center border border-red-500/30">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-none mb-1">
                              Elite Roadside Dispatch
                            </h4>
                            <span className="text-[10px] font-mono text-zinc-400">
                              Unit #098 intercepted GPS signal
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-amber-500 bg-amber-950/20 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase">
                          ETA: 12 MINS
                        </span>
                      </div>

                      <div className="my-2 border-y border-zinc-900 py-2.5 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex flex-col">
                          <span className="text-zinc-500 text-[8px] uppercase">Specialist Assigned</span>
                          <span className="text-white font-bold">Vignan Muraharirao (Mech-Expert)</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-zinc-500 text-[8px] uppercase">Deployment Status</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            EN ROUTE
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-zinc-500" />
                          Family notified via priority SMS gateway
                        </span>
                        <span className="text-red-500 font-semibold uppercase flex items-center gap-1">
                          <PhoneCall className="w-3 h-3 text-red-500" />
                          LINE: CONNECTED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hold Abort button to reset showcase securely */}
                  <div
                    onMouseDown={handleStartCancel}
                    onMouseUp={handleEndCancel}
                    onMouseLeave={handleEndCancel}
                    onTouchStart={handleStartCancel}
                    onTouchEnd={handleEndCancel}
                    className="relative cursor-pointer select-none touch-none w-full scale-100 active:scale-98 transition-transform"
                  >
                    {/* Action Progress Bar */}
                    <div className="absolute inset-0 rounded-xl bg-zinc-900 border border-zinc-800" />
                    
                    <div 
                      className="absolute inset-y-0 left-0 bg-red-950/50 border-r border-red-500/40 rounded-l-xl transition-all duration-75"
                      style={{ width: `${cancelHoldProgress}%` }}
                    />

                    <div className="relative h-12 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-red-400 hover:text-red-300">
                      <RefreshCw className={`w-4 h-4 ${isHoldingCancel ? "animate-spin" : ""}`} />
                      {isHoldingCancel 
                        ? `HOLDING TO ABORT: ${(cancelHoldProgress).toFixed(0)}%` 
                        : "HOLD SECURE TO ABORT EMERGENCY PACKET"
                      }
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Advanced Features Interactive Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FeatureCard
              title="2-Second Elite Dispatch"
              description="Instant satellite routing directly connects you to premier luxury mechanics and towing dispatchers in under two seconds."
              icon={<ClockCardIcon />}
              delay={0}
            />

            <FeatureCard
              title="Satellite Live-Tracking"
              description="Seamless precision telemetry broadcast locks your exact coordinates, operating reliably even in no-network zones."
              icon={<SatelliteCardIcon />}
              delay={0.1}
            />

            <FeatureCard
              title="Blackbox Ambient Audio"
              description="Simultaneous cryptographically sealed audio recording activates automatically on deploy to secure legal safety."
              icon={<MicCardIcon />}
              delay={0.2}
            />

            <FeatureCard
              title="One-Touch Family Alert"
              description="Automated SMS and calling relays dispatch your exact GPS coordinates and vehicle status logs to family members instantly."
              icon={<UsersCardIcon />}
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// CUSTOM PREMIUM FEATURE CARDS (WITH HOVER GRADIENTS)
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
      className="card-glowing-border flex items-start gap-5 p-6 rounded-2xl bg-zinc-950/40 hover:bg-zinc-950/70 border border-zinc-900/60 backdrop-blur-sm transition-all duration-300 group overflow-hidden"
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

      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-red-500 group-hover:text-red-400 group-hover:border-red-500/20 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 relative z-10">
        {icon}
      </div>
      
      <div className="flex-1 relative z-10">
        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
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

// 2. Rotating satellite dish that transmits signals
function SatelliteCardIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <Satellite className="w-5 h-5 group-hover:scale-95 group-hover:rotate-[15deg] transition-transform duration-500" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
      
      {/* Emitter waves */}
      <svg className="absolute w-7 h-7 inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <path
          d="M 17 6 A 7 7 0 0 1 20 12"
          className="stroke-red-400 fill-none animate-pulse"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 3 A 11 11 0 0 1 21 10"
          className="stroke-red-400/60 fill-none animate-pulse delay-75"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// 3. Audio waveform recording bars
function MicCardIcon() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center gap-[2.5px]">
      <Mic className="w-4 h-4 group-hover:scale-90 transition-transform duration-300" />
      
      {/* Mini audio equalizer wave bars */}
      <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900">
        <span className="w-[2.5px] h-3 bg-red-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
        <span className="w-[2.5px] h-5 bg-red-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.15s]" />
        <span className="w-[2.5px] h-4 bg-red-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
        <span className="w-[2.5px] h-2.5 bg-red-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.45s]" />
      </div>
    </div>
  );
}

// 4. Connecting users / broadcast ripple
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
