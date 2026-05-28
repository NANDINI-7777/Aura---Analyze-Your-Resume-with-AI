import React, { useState, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FileUpload from "./components/FileUpload";
import JobInput from "./components/JobInput";
import ResultCard from "./components/ResultCard";
import Footer from "./components/Footer";
import { analyzeResume } from "./services/gemini";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState("pdf"); // "pdf" or "linkedin"
  const [resumeText, setResumeText] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const resultsRef = useRef(null);

  const handleResumeExtracted = useCallback((text, fileName) => {
    setResumeText(text);
    setResumeFileName(fileName);
    setError(null);
  }, []);

  const handleResetPDF = useCallback(() => {
    setResumeText("");
    setResumeFileName("");
    setAnalysisResults(null);
  }, []);

  const handleClearJobDesc = useCallback(() => {
    setJobDescription("");
    setAnalysisResults(null);
  }, []);

  const handleResetAll = useCallback(() => {
    setResumeText("");
    setResumeFileName("");
    setResumeUrl("");
    setJobDescription("");
    setAnalysisResults(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnalyze = async () => {
    // Check validation based on active tab
    const inputResume = activeTab === "pdf" ? resumeText : resumeUrl;
    
    if (!inputResume || !jobDescription) return;

    setLoading(true);
    setError(null);
    setAnalysisResults(null);

    try {
      const results = await analyzeResume(inputResume, jobDescription);
      setAnalysisResults(results);
      
      // Smoothly scroll to results dashboard
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err) {
      console.error("Analysis execution error:", err);
      setError(err.message || "An unexpected error occurred. Please verify your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isResumeProvided = activeTab === "pdf" ? (resumeText.trim().length > 0) : (resumeUrl.trim().length > 0);
  const isFormValid = isResumeProvided && jobDescription.trim().length > 0;

  return (
    <div className="min-h-screen bg-transparent text-slate-700 flex flex-col font-sans antialiased selection:bg-[#7c3aed]/20 selection:text-[#4c1d95]">
      
      {/* Redesigned Navbar */}
      <Navbar />

      {/* Shapes-animated Hero Section */}
      <HeroSection />

      {/* Main Container */}
      <main id="analyzer-section" className="flex-grow max-w-7xl w-full mx-auto px-6 py-16 space-y-12">
        
        {/* Step Indicator Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <h2 className="text-3xl font-extrabold text-[#4c1d95] tracking-tight sm:text-4xl">
            Analyze Compatibility
          </h2>
          <p className="text-slate-500 text-sm mt-3 font-medium">
            Provide either your resume PDF or LinkedIn profile, alongside the job description.
          </p>
        </motion.div>

        {/* Input grids styled with lavender card-borders and white backgrounds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Block: Tabbed Upload Zone */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glow-card bg-white border border-[#ddd6fe] rounded-3xl p-6 flex flex-col h-full shadow-sm"
          >
            <FileUpload
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onTextExtracted={handleResumeExtracted}
              onResetPDF={handleResetPDF}
              resumeFileName={resumeFileName}
              resumeText={resumeText}
              resumeUrl={resumeUrl}
              onResumeUrlChange={setResumeUrl}
            />
          </motion.div>

          {/* Right Block: Job Input Zone */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glow-card bg-white border border-[#ddd6fe] rounded-3xl p-6 flex flex-col h-full shadow-sm"
          >
            <JobInput
              value={jobDescription}
              onChange={setJobDescription}
              onClear={handleClearJobDesc}
            />
          </motion.div>

        </div>

        {/* Shimmer Button for trigger (CHANGE 4) */}
        <div className="flex flex-col items-center justify-center pt-6">
          <motion.button
            whileHover={isFormValid && !loading ? { scale: 1.03, y: -2 } : {}}
            whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
            onClick={handleAnalyze}
            disabled={!isFormValid || loading}
            className={`w-full sm:w-auto min-w-[240px] px-8 py-4.5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg ${
              !isFormValid
                ? "bg-slate-200 border border-slate-350 text-slate-400 cursor-not-allowed shadow-none"
                : loading
                ? "bg-[#7c3aed]/40 border border-[#7c3aed]/20 text-[#7c3aed] cursor-not-allowed"
                : "shimmer-btn bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer hover:shadow-purple-500/25 active:translate-y-0"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-white" />
                <span>Running AI Diagnosis...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 animate-pulse text-white" />
                <span>Analyze Now</span>
              </>
            )}
          </motion.button>
          
          {!isFormValid && !loading && (
            <p className="text-[11px] text-[#9ca3af] mt-3 font-semibold">
              Add your resume PDF/LinkedIn link and the job description to unlock the analysis button.
            </p>
          )}
        </div>

        {/* Dynamic error display */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto p-5 rounded-2xl border border-red-200 bg-red-50 text-red-500 text-sm flex items-start space-x-3 shadow-sm"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-650" />
              <div>
                <h4 className="font-bold text-[#4c1d95] mb-0.5">Analysis Failed</h4>
                <p className="text-xs leading-relaxed text-red-600/90 font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Panel Container */}
        <div ref={resultsRef} className="scroll-mt-24">
          {analysisResults && (
            <div className="border-t border-[#ddd6fe] pt-16 mt-8">
              <ResultCard results={analysisResults} onReset={handleResetAll} />
            </div>
          )}
        </div>

      </main>

      {/* Redesigned Footer */}
      <Footer />
    </div>
  );
}
