# ✨ Aura — AI Resume Analyzer

A premium, portfolio-ready Applicant Tracking System (ATS) optimizer and career coach powered by Google Gemini AI. Built using React.js (Vite), Tailwind CSS v3, and Framer Motion. 

Aura parses PDF resumes locally in your browser, evaluates professional profile structures against job descriptions, identifies matched/missing keyword criteria, and delivers actionable career suggestions to maximize your interview conversion rate.

---

## 🚀 Key Features

*   **🔒 Client-Side PDF Parsing (Privacy-First)**: Parses and extracts text from your PDF resumes entirely on the frontend using `pdfjs-dist`. No backend servers read or store your resume details.
*   **🔗 LinkedIn URL Switcher**: Give candidates the freedom to paste their LinkedIn Profile URL instead of a file. The Gemini AI engine dynamically reviews the profile structure and provides targeted optimization tips.
*   **💫 Premium 21st.dev Animations**:
    *   **Kokonutd Shape Landing Hero**: Translucent geometric canvas shapes float, drift, and rotate elegantly in the background.
    *   **Shimmer Action Buttons**: Primary buttons feature high-fidelity glass shimmers sweeping across on hover.
    *   **Sequential Sliding Grids**: Dashboard cards slide upward and fade in sequentially when analysis finishes.
    *   **Pop-in Tag Chips**: Keyword badges pop into view with spring-scale physics.
*   **📊 Dynamic Diagnostic Dashboard**:
    *   Match percentage displayed inside an animated circular progress ring.
    *   Matched keywords represented in elegant lavender chips (`#ede9fe`).
    *   Missing keywords highlighted in red alert chips (`#fee2e2`).
    *   Interactive checklists for candidate Strengths and suggestions for Improvement.
*   **⚡ Gemini AI Fallback Protocol**: Automatically cycles through a prioritised model chain (`gemini-flash-latest`, `gemini-2.0-flash`, etc.) to bypass API throttles or quota limitations.

---

## 🛠️ Technology Stack

*   **Frontend Library**: React.js (Vite Single Page Application)
*   **Styling**: Tailwind CSS v3 (Custom Lavender & White SaaS Theme)
*   **Animations**: Framer Motion
*   **AI Engine**: Google Gemini API Generative SDK
*   **PDF Extraction**: PDF.js (`pdfjs-dist`)
*   **Icon Assets**: Lucide React
*   **Deployment**: Vercel ready (`vercel.json` SPA configuration included)

---

## 📦 Local Installation

To set up and run Aura on your local machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Aura.git
cd Aura
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure your API key
Create a `.env` file in the root directory (or open the existing one) and add your Google Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note:** The `.env` file is configured inside `.gitignore` and will never be committed or exposed on GitHub.

### 4. Run the development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser to experience Aura locally!

---

## 🚀 Quick Vercel Deployment

Aura is configured for immediate deployment to Vercel:

1. Create a new project on your **[Vercel Dashboard](https://vercel.com/new)** and import your GitHub repository.
2. Under the project settings, add the following **Environment Variable**:
   * **Name**: `VITE_GEMINI_API_KEY`
   * **Value**: *Your actual Google Gemini API Key*
3. Click **"Deploy"**. Vercel will build and launch your live site instantly!

---

## 👩‍💻 Made By
Developed with ♥ by **Nandini Soni**. Let's connect!
*   **LinkedIn**: [Nandini Soni](https://www.linkedin.com/in/nandini-soni-89817029a?utm_source=share_via&utm_content=profile&utm_medium=member_android)
*   **Email**: [nandinisoni7014@gmail.com](mailto:nandinisoni7014@gmail.com)
