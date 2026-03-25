import React, { useContext } from "react"
import { ModeContext } from "../Context/ModeContext"

const ModeToggle = () => {
  const { mode, setMode } = useContext(ModeContext)

  return (
    <div className="inline-flex bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => setMode("patient")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          mode === "patient"
            ? "bg-teal-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Patient
      </button>

      <button
        onClick={() => setMode("doctor")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          mode === "doctor"
            ? "bg-teal-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Doctor
      </button>
    </div>
  )
}

export default ModeToggle
