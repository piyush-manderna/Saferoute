import { useState } from 'react';
import { X } from 'lucide-react';

const incidentCategories = [
  'Harassment',
  'Poor lighting',
  'Unsafe area',
  'Suspicious activity',
  'Other',
];

function ReportModal({ isOpen = false, onClose = () => {} }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategory('');
    setDescription('');
    onClose();
  };

  const handleCancel = () => {
    setCategory('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-[#0B0F17]/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center" role="presentation">
      <div
        className="w-full max-w-md rounded-xl border border-white/10 bg-gray-900/95 p-5 font-['Plus_Jakarta_Sans'] shadow-2xl shadow-black/50 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">Community safety</p>
            <h2 id="report-modal-title" className="mt-1 text-xl font-bold text-white">Report an incident</h2>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0B0F17] text-slate-300 transition-colors hover:border-rose-500/50 hover:text-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label="Close report incident modal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block" htmlFor="incident-category">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">Category</span>
            <select
              id="incident-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-white/10 bg-[#0B0F17] px-3 text-sm font-medium text-white outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="" disabled>Select a category</option>
              {incidentCategories.map((incidentCategory) => (
                <option key={incidentCategory} value={incidentCategory}>{incidentCategory}</option>
              ))}
            </select>
          </label>

          <label className="block" htmlFor="incident-description">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">Description</span>
            <textarea
              id="incident-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Share what happened and any details that could help others."
              rows="4"
              required
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F17] px-3 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-950/30 transition-all hover:-translate-y-px hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              Submit report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;
