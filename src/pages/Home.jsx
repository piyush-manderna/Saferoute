

import { useState } from "react";
import ReportModal from "../components/ReportModal";
import SafeZoneCard from "../components/SafeZoneCard";

const MOCK_SAFE_ZONES = [
  { id: 1, name: "Katpadi Police Station", type: "police", distance: "0.8 km" },
  { id: 2, name: "CSI Hospital", type: "hospital", distance: "1.2 km" },
  { id: 3, name: "Katpadi Railway Station", type: "metro", distance: "0.5 km" },
  { id: 4, name: "24x7 Medical Store", type: "open24", distance: "0.3 km" },
  { id: 5, name: "VIT Main Gate Police Booth", type: "police", distance: "1.5 km" },
  { id: 6, name: "Global Hospital", type: "hospital", distance: "2.0 km" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([]);

  
  const handleReportSubmit = async (data) => {
    console.log("New report submitted:", data);
    setReports((prev) => [...prev, data]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">SafeRoute</h1>
      <p className="text-sm text-gray-500 mb-6">Katpadi, Tamil Nadu</p>

      {/* === MOVE INTO MEMBER 1's LAYOUT: Report trigger button === */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
      >
        Report an Issue
      </button>
      {/* === END BLOCK === */}

      {/* === MOVE INTO MEMBER 1's LAYOUT: Safe Zones section === */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Nearby Safe Zones</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {MOCK_SAFE_ZONES.map((zone) => (
          <SafeZoneCard key={zone.id} zone={zone} />
        ))}
      </div>
      {/* === END BLOCK === */}

      {/* Temporary visibility for reports - remove once real UI decided */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Reports</h2>
      {reports.length > 0 ? (
        <div className="space-y-2">
          {reports.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
              <span className="font-medium text-red-600">{r.category}</span> — {r.description}
            </div>
          ))}
        </div>
) : (
  <p className="text-sm text-gray-400 italic">No reports yet. Be the first to report an issue.</p>
)}

      {/* === MOVE INTO MEMBER 1's LAYOUT: Report modal (always render, controlled by state) === */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
      {/* === END BLOCK === */}
    </div>
  );
}