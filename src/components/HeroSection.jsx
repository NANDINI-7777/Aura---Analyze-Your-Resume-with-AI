import React from "react";
import { ArrowRight, Cpu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const handleScrollToAnalyzer = () => {
    const section = document.getElementById("analyzer-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#f5f3ff] to-white border-b border-[#ddd6fe]">
      
      {/* 21st.dev Inspired Floating Shapes Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Shape 1: Translucent Glowing Purple Blob */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#a78bfa]/10 blur-[60px]"
        />

        {/* Shape 2: Translucent Glowing Violet Blob */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#7c3aed]/10 blur-[80px]"
        />

        {/* Shape 3: Geometric Floating Square */}
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-2xl border-2 border-[#a78bfa]/20 bg-[#a78bfa]/5"
        />

        {/* Shape 4: Floating Small Circle */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full border border-[#7c3aed]/30 bg-[#ede9fe]/30"
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* AI Tech Chip Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#ddd6fe] bg-white text-[#7c3aed] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
        >
          <Cpu className="h-3.5 w-3.5 animate-pulse" />
          <span>Gemini 2.0 AI Fallback Engine</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#4c1d95] mb-6 leading-[1.12]"
        >
          Analyze Your Resume <br />
          <span className="gradient-text font-black">with AI</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#374151] max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Know exactly how well you match any job description — instantly
        </motion.p>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrollToAnalyzer}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-white bg-[#7c3aed] hover:bg-[#6d28d9] font-bold shadow-lg shadow-purple-500/20 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Get Started
            <ArrowRight className="ml-2.5 h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Value Props checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto text-left"
        >
          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-[#ddd6fe] shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-[#7c3aed] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#4c1d95] text-sm">Instant Diagnoses</h3>
              <p className="text-slate-500 text-xs mt-1">Direct overall compatibility match.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-[#ddd6fe] shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-[#7c3aed] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#4c1d95] text-sm">LinkedIn URL Support</h3>
              <p className="text-slate-500 text-xs mt-1">Analyze professional profiles instantly.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-[#ddd6fe] shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-[#7c3aed] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#4c1d95] text-sm">Actionable Fixes</h3>
              <p className="text-slate-500 text-xs mt-1">Improve your score step-by-step.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
