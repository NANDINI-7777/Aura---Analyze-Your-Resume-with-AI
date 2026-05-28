import React from "react";
import { ClipboardList } from "lucide-react";

export default function JobInput({ value, onChange, onClear }) {
  const charCount = value.length;

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="job-desc" className="block text-sm font-bold text-slate-700">
          Job Description <span className="text-[#7c3aed]">*</span>
        </label>
        {charCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-[#7c3aed] hover:text-[#6d28d9] font-bold cursor-pointer"
          >
            Clear Text
          </button>
        )}
      </div>

      <div className="flex-grow relative flex flex-col min-h-[220px]">
        {/* Large Text Area styled with lavender borders and white backgrounds */}
        <textarea
          id="job-desc"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here (e.g. key responsibilities, qualifications, required technical skills)..."
          className="flex-grow w-full min-h-[220px] md:min-h-full p-4 rounded-2xl bg-white text-slate-800 placeholder-[#9ca3af] border border-[#ddd6fe] focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/5 transition-all duration-200 outline-none resize-none text-sm leading-relaxed"
        />

        {/* Centered decorative background icon when empty */}
        {!value && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <ClipboardList className="h-20 w-20 text-[#7c3aed]" />
          </div>
        )}
      </div>

      {/* Footer details */}
      <div className="flex items-center justify-between text-[11px] text-[#9ca3af] font-mono px-1">
        <span>Required field</span>
        <span>
          <span className={charCount > 0 ? "text-[#7c3aed] font-bold" : ""}>
            {charCount.toLocaleString()}
          </span>{" "}
          characters
        </span>
      </div>
    </div>
  );
}
