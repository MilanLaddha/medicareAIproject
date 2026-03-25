import React from "react"

const SummaryCard = ({ summary, mode }) => {
  if (!summary) return null

  const title = mode === "doctor" ? "CLINICAL SUMMARY" : "PATIENT SUMMARY"

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
      <div className="text-sm font-semibold text-teal-700 tracking-wide">
        {title}
      </div>

      <div className="h-px bg-gray-200" />

      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
        {summary}
      </div>
    </div>
  )
}

export default SummaryCard
