import React from "react";
import { Sparkles, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-[#ddd6fe] shadow-sm px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name (Aura) */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 5 }}
            className="bg-gradient-to-tr from-[#7c3aed] to-[#a78bfa] p-2 rounded-xl text-white shadow-md shadow-purple-500/10"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-[#4c1d95] transition-colors duration-300">
            Aura<span className="text-[#7c3aed] font-extrabold text-2xl">.</span>
          </span>
        </div>

        {/* Scroll Links (Smooth Scroll) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#374151]">
          <button
            onClick={() => handleScrollToSection("analyzer-section")}
            className="hover:text-[#7c3aed] transition-colors duration-200 cursor-pointer"
          >
            Analyzer
          </button>
          <button
            onClick={() => {
              const sec = document.getElementById("results-section");
              if (sec) {
                sec.scrollIntoView({ behavior: "smooth" });
              } else {
                handleScrollToSection("analyzer-section");
              }
            }}
            className="hover:text-[#7c3aed] transition-colors duration-200 cursor-pointer"
          >
            Results Report
          </button>
        </div>

        {/* Action Links & Socials */}
        <div className="flex items-center space-x-4">
          <motion.a
            whileHover={{ y: -2, scale: 1.05 }}
            href="https://www.linkedin.com/in/nandini-soni-89817029a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-450 hover:text-[#7c3aed] transition-colors duration-200 p-2 rounded-lg hover:bg-[#ede9fe]"
            title="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>
          
          <motion.a
            whileHover={{ y: -2, scale: 1.05 }}
            href="mailto:nandinisoni7014@gmail.com"
            className="text-slate-450 hover:text-[#7c3aed] transition-colors duration-200 p-2 rounded-lg hover:bg-[#ede9fe]"
            title="Email Nandini"
          >
            <Mail className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
