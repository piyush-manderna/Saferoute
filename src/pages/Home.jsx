import { useEffect, useState } from "react";
import ReportModal from "../components/ReportModal";
import SafeZoneCard from "../components/SafeZoneCard";
import {
  submitReport,
  getReports,
  getSafeZones,
} from "../services/firestore";

// Temporary fallback data.
// This will be replaced by Firebase safe_zones data once available.
const MOCK_SAFE_ZONES = [
  {
    id: 1,
    name: "Katpadi Police Station",
    type: "police",
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "CSI Hospital",
    type: "hospital",
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "Katpadi Railway Station",
    type: "metro",
    distance: "0.5 km",
  },
  {
    id: 4,
    name: "24x7 Medical Store",
    type: "open24",
    distance: "0.3 km",
  },
  {
    id: 5,
    name: "VIT Main Gate Police Booth",
    type: "police",
    distance: "1.5 km",
  },
  {
    id: 6,
    name: "Global Hospital",
    type: "hospital",
    distance: "2.0 km",
  },
];

// Firestore category values → friendly display names
const CATEGORY_LABELS = {
  poor_lighting: "Poor lighting",
  harassment: "Harassment",
  broken_cctv: "Broken CCTV",
  isolated_road: "Isolated road",
  other: "Other",
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reports, setReports] = useState([]);

  const [safeZones, setSafeZones] = useState(MOCK_SAFE_ZONES);

  const [loadingReports, setLoadingReports] = useState(true);

  // --------------------------------------------------
  // Load reports and safe zones from Firebase
  // --------------------------------------------------
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        setLoadingReports(true);

        // Get reports
        const firebaseReports = await getReports();

        console.log(
          "✅ Reports loaded from Firebase:",
          firebaseReports
        );

        setReports(firebaseReports);

        // Get safe zones
        const firebaseSafeZones = await getSafeZones();

        console.log(
          "✅ Safe zones loaded from Firebase:",
          firebaseSafeZones
        );

        // Only replace mock data if Firebase has data
        if (firebaseSafeZones.length > 0) {
          setSafeZones(firebaseSafeZones);
        }
      } catch (error) {
        console.error(
          "❌ Failed to load Firebase data:",
          error
        );
      } finally {
        setLoadingReports(false);
      }
    };

    loadFirebaseData();
  }, []);

  // --------------------------------------------------
  // Submit report to Firebase
  // --------------------------------------------------
  const handleReportSubmit = async (data) => {
    try {
      const report = await submitReport(data);

      console.log(
        "✅ Report saved to Firebase:",
        report
      );

      // Reload reports after submitting
      const updatedReports = await getReports();

      console.log(
        "✅ Updated reports:",
        updatedReports
      );

      setReports(updatedReports);
    } catch (error) {
      console.error(
        "❌ Firebase report submission failed:",
        error
      );

      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        SafeRoute
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Katpadi, Tamil Nadu
      </p>

      {/* --------------------------------------------------
          Report Button
      -------------------------------------------------- */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
      >
        Report an Issue
      </button>

      {/* --------------------------------------------------
          Safe Zones
      -------------------------------------------------- */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Nearby Safe Zones
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {safeZones.map((zone) => (
          <SafeZoneCard
            key={zone.id}
            zone={zone}
          />
        ))}
      </div>

      {/* --------------------------------------------------
          Recent Reports
      -------------------------------------------------- */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Recent Reports
      </h2>

      {loadingReports ? (
        <p className="text-sm text-gray-400">
          Loading reports...
        </p>
      ) : reports.length > 0 ? (
        <div className="space-y-2">

          {reports.map((report) => {
            // Firestore Timestamp handling
            let reportDate = null;

            if (report.timestamp?.toDate) {
              reportDate = report.timestamp.toDate();
            } else if (report.createdAt) {
              reportDate = new Date(report.createdAt);
            }

            return (
              <div
                key={report.id}
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-red-600">
                    {report.category === "other" &&
                    report.customCategory
                      ? report.customCategory
                      : CATEGORY_LABELS[
                          report.category
                        ] || report.category}
                  </span>

                  {" — "}

                  {report.description}
                </div>

                {reportDate && (
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {reportDate.toLocaleDateString()}{" "}
                    {reportDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            );
          })}

        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">
          No reports yet. Be the first to report an issue.
        </p>
      )}

      {/* --------------------------------------------------
          Report Modal
      -------------------------------------------------- */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
      />

    </div>
  );
}