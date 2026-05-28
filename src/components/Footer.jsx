import React from "react";
import { Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#4c1d95] text-white py-12 px-6 mt-20 border-t border-purple-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        
        {/* Creator Attribution Title */}
        <h2 className="text-xl font-bold tracking-tight">
          Made by <span className="underline decoration-wavy decoration-[#a78bfa] underline-offset-4">Nandini Soni</span>
        </h2>

        {/* Dynamic Contact Action Buttons (LinkedIn & Gmail) */}
        <div className="flex items-center justify-center space-x-5">
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/nandini-soni-89817029a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 p-3 rounded-full text-white hover:text-[#a78bfa] hover:bg-white/20 transition-all duration-200 border border-white/10"
            title="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:nandinisoni7014@gmail.com"
            className="bg-white/10 p-3 rounded-full text-white hover:text-[#a78bfa] hover:bg-white/20 transition-all duration-200 border border-white/10"
            title="Email Nandini"
          >
            <Mail className="h-5 w-5" />
          </motion.a>
        </div>

        {/* Minimal Stack details */}
        <div className="text-[11px] text-purple-200/70 select-none">
          Built with React &bull; Tailwind CSS v3 &bull; Gemini AI &bull; PDF.js
        </div>

        {/* Fine copyright */}
        <div className="w-full border-t border-purple-800/60 pt-6">
          <p className="text-[10px] text-purple-200/50">
            &copy; {currentYear} Aura. All rights reserved. Nandini Soni Professional Portfolio.
          </p>
        </div>

      </div>
    </footer>
  );
}
