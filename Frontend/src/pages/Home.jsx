import React, { useContext, useState } from "react"
import Disclaimer from "../components/Disclaimer"
import FileUpload from "../components/FileUpload"
import ModeToggle from "../components/ModeToggle"
import { ModeContext } from "../Context/ModeContext"
import API from "../services/api"
import SummaryCard from "../components/SummaryCard"
import ChatPanel from "../components/ChatPanel"

const Home = () => {
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const { mode } = useContext(ModeContext);

  const generateSummary = async () => {
    try {
      setLoading(true);
      const res = await API.post("/api/generate-summary", {
        text: extractedText,
        mode,
      });
      setSummary(res.data.summary);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="w-full h-full px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-8 overflow-y-auto">
          <header className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              MedBrief AI
            </h1>
            <p className="text-sm text-gray-600">
              AI-powered medical report summarization
            </p>
          </header>

          <Disclaimer />

          <ModeToggle />

          <FileUpload onSuccess={setExtractedText} />

          {extractedText && (
            <div>
              <button
                onClick={generateSummary}
                disabled={loading}
                className="
                bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400
                text-white font-medium
                px-5 py-2.5 rounded-lg
                transition
              "
              >
                {loading ? "Generating summary..." : "Generate Summary"}
              </button>
            </div>
          )}

          <SummaryCard summary={summary} mode={mode} />
        </div>
        <div className="h-full">
          <ChatPanel reportText={extractedText} mode={mode} />
        </div>
      </div>
    </div>
  )
}

export default Home
