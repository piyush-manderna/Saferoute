import { useState } from "react";

const CATEGORIES = [
  { label: "Poor lighting", value: "poor_lighting" },
  { label: "Harassment", value: "harassment" },
  { label: "Broken CCTV", value: "broken_cctv" },
  { label: "Isolated road", value: "isolated_road" },
  { label: "Other", value: "other" },
];

export default function ReportModal({ isOpen, onClose, onSubmit }) {
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Please add a short description.");
      return;
    }
    if (category === "other" && !customCategory.trim()) {
      setError("Please specify the issue type.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({
    category,
    customCategory: category === "other" ? customCategory.trim() : null,
    description,
    lat: null,   // TODO: waiting on Member 2's map for real coordinates
    lng: null,
});
      setDescription("");
      setCategory(CATEGORIES[0].value);
      setCustomCategory("");
      onClose();
    } catch (err) {
      console.error("Failed to submit report:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Report an Issue</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (error) setError("");
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {category === "other" && (
            <>
              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                Specify issue
              </label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. Stray dogs, stalking..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError("");
            }}
            placeholder="Describe what you noticed..."
            rows={3}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-400"
            }`}
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}