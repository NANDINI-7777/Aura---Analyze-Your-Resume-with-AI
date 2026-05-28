import React, { useState, useCallback, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertTriangle, Loader2, Linkedin, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";

// Set PDFjs worker path from unpkg CDN matching the installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function FileUpload({
  activeTab = "pdf",
  onTabChange,
  onTextExtracted,
  onResetPDF,
  resumeFileName,
  resumeText,
  resumeUrl,
  onResumeUrlChange
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const extractText = async (file) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file only.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useSystemFonts: true
      });
      
      const pdf = await loadingTask.promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      const cleanText = extractedText.trim();
      if (!cleanText) {
        throw new Error("No readable text found inside the PDF. It might be scanned or image-only.");
      }

      onTextExtracted(cleanText, file.name);
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      setError(err.message || "Could not read text from the PDF file. Please ensure it is not password protected.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      extractText(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      extractText(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* 21st.dev Style Tab Switcher */}
      <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200">
        <button
          onClick={() => onTabChange("pdf")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === "pdf"
              ? "bg-[#7c3aed] text-white shadow-md shadow-purple-500/10"
              : "text-[#7c3aed] hover:bg-[#ede9fe]"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Upload PDF</span>
        </button>
        
        <button
          onClick={() => onTabChange("linkedin")}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === "linkedin"
              ? "bg-[#7c3aed] text-white shadow-md shadow-purple-500/10"
              : "text-[#7c3aed] hover:bg-[#ede9fe]"
          }`}
        >
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn URL</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleChange}
      />

      {/* Tab Contents Container */}
      <div className="flex-1 flex flex-col min-h-[260px]">
        <AnimatePresence mode="wait">
          
          {activeTab === "pdf" ? (
            /* TAB 1: PDF Upload */
            <motion.div
              key="pdf-upload-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">
                  Select PDF Resume <span className="text-[#7c3aed]">*</span>
                </label>
                {resumeText && (
                  <button
                    onClick={onResetPDF}
                    className="text-xs text-[#7c3aed] hover:text-[#6d28d9] font-bold cursor-pointer"
                  >
                    Clear File
                  </button>
                )}
              </div>

              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={!resumeText && !loading ? onButtonClick : undefined}
                className={`flex-grow flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-350 relative overflow-hidden ${
                  isDragActive
                    ? "border-[#7c3aed] bg-[#ede9fe]/50 scale-[0.99] shadow-inner"
                    : resumeText
                    ? "border-[#ddd6fe] bg-white cursor-default"
                    : "border-[#ddd6fe] bg-slate-50 hover:border-[#7c3aed] hover:bg-[#ede9fe]/10 cursor-pointer"
                }`}
              >
                {loading ? (
                  <div className="flex flex-col items-center py-6">
                    <Loader2 className="h-10 w-10 text-[#7c3aed] animate-spin mb-4" />
                    <h3 className="text-[#4c1d95] font-bold mb-1">Extracting Resume Text</h3>
                    <p className="text-slate-500 text-xs">Locally reading document layout...</p>
                  </div>
                ) : resumeText ? (
                  /* Animated Success State */
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center py-4 w-full"
                  >
                    <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-600 mb-4 border border-emerald-500/20">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-[#4c1d95] font-bold text-sm mb-1 truncate max-w-full px-4">
                      {resumeFileName}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ede9fe] text-[#6d28d9] border border-[#ddd6fe] mb-4">
                      PDF Text Parsed ({resumeText.length.toLocaleString()} chars)
                    </span>
                    
                    {/* Confirmation text snippet */}
                    <div className="w-full text-left bg-slate-50 border border-slate-100 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block mb-1">
                        Text Content Extracted
                      </span>
                      <p className="text-xs text-[#374151] font-mono line-clamp-3 select-none leading-relaxed">
                        {resumeText.substring(0, 300)}...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* Animated File Icon Drag State */
                  <div className="flex flex-col items-center py-6 select-none group">
                    <motion.div 
                      animate={isDragActive ? { scale: 1.15, y: -5 } : { scale: 1, y: 0 }}
                      className="bg-white p-4 rounded-2xl text-slate-400 mb-4 border border-[#ddd6fe] shadow-sm group-hover:scale-105 transition-transform duration-300"
                    >
                      <Upload className="h-7 w-7 text-[#7c3aed]" />
                    </motion.div>
                    <h3 className="text-[#4c1d95] font-bold text-base mb-1">
                      Drag & Drop your Resume
                    </h3>
                    <p className="text-slate-500 text-xs mb-3">
                      or <span className="text-[#7c3aed] font-bold hover:underline">browse files</span> from your computer
                    </p>
                    <span className="text-[#9ca3af] text-[10px] font-semibold">
                      Only PDF files accepted
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* TAB 2: LINKEDIN URL */
            <motion.div
              key="linkedin-url-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="linkedin-input" className="block text-sm font-bold text-slate-700">
                  Profile URL <span className="text-[#7c3aed]">*</span>
                </label>
                {resumeUrl && (
                  <button
                    onClick={() => onResumeUrlChange("")}
                    className="text-xs text-[#7c3aed] hover:text-[#6d28d9] font-bold cursor-pointer"
                  >
                    Clear URL
                  </button>
                )}
              </div>

              {/* URL Input Box Card */}
              <div className="flex-grow flex flex-col justify-center border-2 border-dashed border-[#ddd6fe] rounded-2xl p-6 bg-white shadow-sm">
                <div className="space-y-4 max-w-md mx-auto w-full">
                  <div className="text-center select-none">
                    <div className="inline-flex bg-[#ede9fe] p-3.5 rounded-full text-[#7c3aed] border border-[#ddd6fe] mb-4">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <h3 className="text-[#4c1d95] font-bold text-base mb-1">
                      Link LinkedIn Profile
                    </h3>
                    <p className="text-slate-500 text-xs">
                      Analyze professional skills, experience, and accomplishments directly.
                    </p>
                  </div>

                  {/* Icon Text Input */}
                  <div className="relative rounded-xl shadow-sm border border-[#ddd6fe] bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-[#7c3aed]/10 focus-within:border-[#7c3aed] transition-all duration-200">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Linkedin className="h-4.5 w-4.5 text-[#a78bfa]" />
                    </div>
                    <input
                      id="linkedin-input"
                      type="url"
                      value={resumeUrl}
                      onChange={(e) => onResumeUrlChange(e.target.value)}
                      placeholder="linkedin.com/in/yourname"
                      className="block w-full pl-10 pr-3 py-3 border-0 bg-transparent text-[#374151] placeholder-slate-400 focus:ring-0 outline-none text-sm font-medium"
                    />
                  </div>

                  {/* LinkedIn explanation subnote */}
                  <div className="flex items-start space-x-2 text-[11px] text-slate-500 bg-[#ede9fe]/30 border border-[#ddd6fe]/50 p-3 rounded-xl">
                    <HelpCircle className="h-4 w-4 shrink-0 text-[#a78bfa] mt-0.5" />
                    <span className="leading-relaxed">
                      <strong>We'll analyze your LinkedIn profile as your resume.</strong> Gemini AI will review the profile URL context and match it against the job qualifications.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start space-x-2 p-3.5 rounded-xl border border-red-200 bg-red-55/70 text-red-500 text-xs animate-fade-in shadow-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="font-semibold leading-relaxed">{error}</span>
        </div>
      )}
    </div>
  );
}
