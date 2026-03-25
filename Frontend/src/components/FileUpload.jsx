import React, { useState } from "react"
import API from "../services/api"

const FileUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      setError("")
      const res = await API.post("/api/upload-report", formData)
      onSuccess(res.data.text_preview)
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Upload medical report
        </label>
        <p className="text-xs text-gray-500">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-medium
                     file:bg-teal-50 file:text-teal-700
                     hover:file:bg-teal-100"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="
            bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400
            text-white text-sm font-medium
            px-4 py-2 rounded-lg
            transition
          "
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {file && (
        <p className="text-xs text-gray-600">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload
