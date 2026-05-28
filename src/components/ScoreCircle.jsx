import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScoreCircle({ score = 0, verdict = "" }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score counting up when mounted or updated
  useEffect(() => {
    const duration = 1200; // 1.2s smooth animation
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      const val = Math.round(easedProgress * score);
      
      setAnimatedScore(val);

      if (currentStep >= steps) {
        setAnimatedScore(score);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Color config based on exact Lavender redesign specs
  const getColor = (val) => {
    if (val <= 40) return { stroke: "#ef4444", text: "text-red-650", bg: "bg-red-50", border: "border-red-100" }; // Low: Red
    if (val <= 70) return { stroke: "#f59e0b", text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" }; // Medium: Yellow/Amber
    return { stroke: "#7c3aed", text: "text-[#7c3aed]", bg: "bg-[#f5f3ff]", border: "border-[#ddd6fe]" }; // High: Deep Lavender
  };

  const colors = getColor(score);

  // SVG dimensions for the circular progress
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Animated Ring using standard SVG */}
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {/* Animated Foreground Ring */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            fill="transparent"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Text inside circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-[#4c1d95] tracking-tight">
            {animatedScore}%
          </span>
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
            Match Score
          </span>
        </div>
      </div>

      {/* Verdict Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={`px-5 py-2 rounded-2xl border font-bold text-sm tracking-wide ${colors.bg} ${colors.border} ${colors.text} shadow-sm`}
      >
        {verdict || "Analysis Done!"}
      </motion.div>
    </div>
  );
}
