import React from "react";
import { Award, Lightbulb, CheckCircle2, AlertCircle, RotateCcw, Check } from "lucide-react";
import { motion } from "framer-motion";
import ScoreCircle from "./ScoreCircle";

export default function ResultCard({ results, onReset }) {
  if (!results) return null;

  const {
    matchScore = 0,
    verdict = "",
    matchedKeywords = [],
    missingKeywords = [],
    strengths = [],
    suggestions = []
  } = results;

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10"
      id="results-section"
    >
      {/* Dashboard Title Block */}
      <motion.div variants={cardVariants} className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#4c1d95] tracking-tight">Diagnosis Dashboard</h2>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          Below is the detailed compatibility report comparing your profile to the job parameters.
        </p>
      </motion.div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Card 1: Score circle (White background, light lavender border) */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-white border border-[#ddd6fe] rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
        >
          <h3 className="text-sm font-bold text-[#4c1d95] w-full text-left pb-3 border-b border-slate-100 mb-4 uppercase tracking-wider">
            Overall Score
          </h3>
          <div className="flex-grow flex items-center justify-center">
            <ScoreCircle score={matchScore} verdict={verdict} />
          </div>
        </motion.div>

        {/* Card 2 & 3: Keywords (White background, light lavender border) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Card 2: Matched Keywords */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#ddd6fe] rounded-3xl p-6 shadow-sm flex flex-col flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 mb-4 text-[#7c3aed]">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="text-sm font-bold text-[#4c1d95] uppercase tracking-wider">
                Matched Keywords ({matchedKeywords.length})
              </h3>
            </div>
            
            {matchedKeywords.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {matchedKeywords.map((keyword, index) => (
                  <motion.span
                    variants={badgeVariants}
                    key={`match-${index}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#ede9fe] text-[#6d28d9] transition-all hover:scale-[1.03]"
                  >
                    <Check className="h-3 w-3 shrink-0 text-[#7c3aed]" />
                    <span>{keyword}</span>
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <p className="text-[#9ca3af] text-sm italic my-auto">
                No matching keywords were identified in the resume.
              </p>
            )}
          </motion.div>

          {/* Card 3: Missing Keywords */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#ddd6fe] rounded-3xl p-6 shadow-sm flex flex-col flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 mb-4 text-rose-500">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-sm font-bold text-[#4c1d95] uppercase tracking-wider">
                Missing Keywords ({missingKeywords.length})
              </h3>
            </div>
            
            {missingKeywords.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {missingKeywords.map((keyword, index) => (
                  <motion.span
                    variants={badgeVariants}
                    key={`miss-${index}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#fee2e2] text-[#dc2626] transition-all hover:scale-[1.03]"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0 text-rose-500" />
                    <span>{keyword}</span>
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <p className="text-emerald-600 text-sm font-semibold my-auto flex items-center space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                <span>Excellent! You matched all major keywords for this job description.</span>
              </p>
            )}
          </motion.div>

        </div>

        {/* Card 4: Strengths */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-white border border-[#ddd6fe] rounded-3xl p-6 md:col-span-1.5 flex flex-col shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
        >
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100 mb-4 text-[#7c3aed]">
            <Award className="h-5 w-5" />
            <h3 className="text-sm font-bold text-[#4c1d95] uppercase tracking-wider">Your Strengths</h3>
          </div>
          
          {strengths.length > 0 ? (
            <ul className="space-y-4 flex-grow">
              {strengths.map((strength, index) => (
                <li key={`strength-${index}`} className="flex items-start space-x-3 text-[#374151] text-sm font-medium leading-relaxed">
                  <div className="bg-[#ede9fe] text-[#6d28d9] p-0.5 rounded-full shrink-0 mt-0.5 border border-[#ddd6fe]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm italic my-auto">
              No standout strengths were highlighted for this job.
            </p>
          )}
        </motion.div>

        {/* Card 5: Suggestions to Improve */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-white border border-[#ddd6fe] rounded-3xl p-6 md:col-span-1.5 flex flex-col shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
        >
          <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100 mb-4 text-amber-500">
            <Lightbulb className="h-5 w-5" />
            <h3 className="text-sm font-bold text-[#4c1d95] uppercase tracking-wider">Suggestions to Improve</h3>
          </div>
          
          {suggestions.length > 0 ? (
            <ol className="space-y-4.5 flex-grow">
              {suggestions.map((suggestion, index) => (
                <li key={`suggestion-${index}`} className="flex items-start space-x-3.5 text-[#374151] text-sm font-medium leading-relaxed">
                  <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-[#ede9fe] text-[#6d28d9] border border-[#ddd6fe] text-xs font-mono font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-emerald-600 text-sm font-semibold my-auto flex items-center space-x-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
              <span>Amazing! Your profile is fully optimized for this role.</span>
            </p>
          )}
        </motion.div>

      </div>

      {/* Reset Analyze Another Button */}
      <motion.div variants={cardVariants} className="flex justify-center pt-4">
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl border border-[#ddd6fe] bg-white hover:bg-[#ede9fe]/30 text-[#7c3aed] font-bold shadow-sm transition-all duration-200 cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Analyze Another Resume
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
