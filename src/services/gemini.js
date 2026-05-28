import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Clean and parse the JSON string response from Gemini.
 * Gemini might wrap the output in markdown block code tags, e.g. ```json ... ```
 */
function cleanAndParseJSON(responseText) {
  let cleaned = responseText.trim();
  
  // Remove markdown JSON code blocks if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\s*/i, "");
    cleaned = cleaned.replace(/^```\s*/, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }
  
  cleaned = cleaned.trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse JSON response directly from Gemini:", error, "\nRaw text was:\n", responseText);
    
    // Attempt fallback extraction in case there was surrounding commentary
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (nestedError) {
        console.error("Failed to parse regex-extracted JSON:", nestedError);
      }
    }
    
    throw new Error("The AI response was not in a valid JSON format. Please try again.");
  }
}

/**
 * Analyzes resume text against a job description using Gemini 1.5 Flash.
 * @param {string} resumeText - Extracted text of the resume
 * @param {string} jobDescription - Pasted job description
 * @returns {Promise<object>} Analysis results matching the requested format
 */
export async function analyzeResume(resumeText, jobDescription) {
  // Retrieve API Key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "your_key_here") {
    throw new Error("Gemini API key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // High-fidelity list of fallback models to cycle through in case of 404 or 429 quota errors
  const modelsToTry = [
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-3.5-flash"
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting analysis with Gemini model: ${modelName}...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: "You are an expert ATS (Applicant Tracking System) and career coach.",
        generationConfig: {
          responseMimeType: "application/json"
        }
      });

      const isLinkedInUrl = resumeText.trim().toLowerCase().includes("linkedin.com") || resumeText.startsWith("http");

      const prompt = `Analyze this resume against the job description and respond ONLY in the following JSON format, nothing else:
{
  "matchScore": <number between 0 and 100>,
  "verdict": "<one line verdict>",
  "matchedKeywords": ["keyword1", "keyword2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "strengths": ["strength1", "strength2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...]
}

${isLinkedInUrl ? "NOTE: The user has provided their LinkedIn Profile URL as their resume. Evaluate their online professional profile representation, and provide targeted recommendations on what they need to add to both their LinkedIn profile and resume to fit this job." : ""}

RESUME TEXT / PROFILE:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const parsedData = cleanAndParseJSON(text);
      console.log(`Successfully completed analysis using model: ${modelName}`);
      return parsedData;
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error.message || error);
      lastError = error;
      
      // If it's a parsing issue from cleanAndParseJSON, throw it directly
      if (error.message && error.message.includes("JSON format")) {
        throw error;
      }
      
      // Otherwise, continue to try the next model
    }
  }

  // If all models failed, throw the last error
  console.error("All attempted Gemini models failed to process the request.");
  
  // Extract a user-friendly message from the GoogleGenerativeAI error
  let friendlyMessage = lastError?.message || "An error occurred while communicating with the Gemini API.";
  if (friendlyMessage.includes("429")) {
    friendlyMessage = "Google Gemini API rate limit or quota exceeded. Free tier accounts are heavily throttled. Please wait a few seconds and try again.";
  }
  
  throw new Error(friendlyMessage);
}
