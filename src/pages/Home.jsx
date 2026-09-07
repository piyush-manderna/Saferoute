import { useEffect, useState } from "react";

import ReportModal from "../components/ReportModal";
import SafeZoneCard from "../components/SafeZoneCard";

import {
  submitReport,
  getReports,
  getSafeZones,
} from "../services/firestore";

import { fetchRoutes } from "../services/routes";

import {
  calculateSafetyScore,
  rankRoutes,
} from "../utils/safety";

// Temporary fallback safe zones
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

  const [safeZones, setSafeZones] =
    useState(MOCK_SAFE_ZONES);

  const [loadingReports, setLoadingReports] =
    useState(true);

  // ---------------------------------------------
  // M4 SAFETY SCORING STATE
  // ---------------------------------------------

  const [rankedRoutes, setRankedRoutes] =
    useState([]);

  const [loadingRoutes, setLoadingRoutes] =
    useState(true);

  const [routeError, setRouteError] =
    useState(null);

  // ---------------------------------------------
  // LOAD FIREBASE DATA + ROUTES + SAFETY SCORE
  // ---------------------------------------------

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingReports(true);
        setLoadingRoutes(true);
        setRouteError(null);

        // -----------------------------------------
        // 1. GET REPORTS FROM FIREBASE - M3
        // -----------------------------------------

        const firebaseReports =
          await getReports();

        console.log(
          "✅ Reports loaded from Firebase:",
          firebaseReports
        );

        setReports(firebaseReports);

        // -----------------------------------------
        // 2. GET SAFE ZONES FROM FIREBASE - M3
        // -----------------------------------------

        const firebaseSafeZones =
          await getSafeZones();

        console.log(
          "✅ Safe zones loaded from Firebase:",
          firebaseSafeZones
        );

        if (firebaseSafeZones.length > 0) {
          setSafeZones(firebaseSafeZones);
        }

        // -----------------------------------------
        // 3. GET ROUTES FROM OSRM - M2
        // -----------------------------------------

        // Demo coordinates for Katpadi, Vellore
        const start = [
          79.1320,
          12.9060,
        ];

        const end = [
          79.1400,
          12.9100,
        ];

        const routes =
          await fetchRoutes(
            start,
            end
          );

        console.log(
          "✅ Routes loaded from OSRM:",
          routes
        );

        // -----------------------------------------
        // 4. CALCULATE SAFETY SCORE - M4
        // -----------------------------------------

        const scoredRoutes =
          calculateSafetyScore(
            routes,
            firebaseReports,
            firebaseSafeZones
          );

        console.log(
          "✅ M4 scored routes:",
          scoredRoutes
        );

        // -----------------------------------------
        // 5. RANK ROUTES - M4
        // -----------------------------------------

        const ranked =
          rankRoutes(
            scoredRoutes
          );

        console.log(
          "✅ M4 ranked routes:",
          ranked
        );

        setRankedRoutes(ranked);

      } catch (error) {
        console.error(
          "❌ Failed to load SafeRoute data:",
          error
        );

        setRouteError(
          error.message ||
          "Failed to calculate route safety"
        );

      } finally {
        setLoadingReports(false);
        setLoadingRoutes(false);
      }
    };

    loadData();
  }, []);

  // ---------------------------------------------
  // SUBMIT REPORT TO FIREBASE
  // ---------------------------------------------

  const handleReportSubmit = async (data) => {
    try {
      const report =
        await submitReport(data);

      console.log(
        "✅ Report saved to Firebase:",
        report
      );

      // Reload reports after submitting
      const updatedReports =
        await getReports();

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

  // ---------------------------------------------
  // SAFEST ROUTE
  // ---------------------------------------------

  const safestRoute =
    rankedRoutes.length > 0
      ? rankedRoutes[0]
      : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ----------------------------------------- */}
      {/* HEADER */}
      {/* ----------------------------------------- */}

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        SafeRoute
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Katpadi, Tamil Nadu
      </p>

      {/* ----------------------------------------- */}
      {/* REPORT BUTTON */}
      {/* ----------------------------------------- */}

      <button
        onClick={() =>
          setIsModalOpen(true)
        }
        className="mb-8 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
      >
        Report an Issue
      </button>

      {/* ----------------------------------------- */}
      {/* SAFEST ROUTE - M4 RESULT */}
      {/* ----------------------------------------- */}

      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Safest Route
      </h2>

      {loadingRoutes ? (
        <p className="text-sm text-gray-400 mb-8">
          Calculating safest route...
        </p>
      ) : routeError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-red-600">
            {routeError}
          </p>
        </div>
      ) : safestRoute ? (
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8 shadow-sm">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-sm text-gray-500">
                Recommended Route
              </p>

              <h3 className="text-xl font-bold text-gray-900">
                Route {safestRoute.id}
              </h3>
            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-gray-900">
                {safestRoute.score}/100
              </p>

              <p className="text-sm font-medium text-gray-600">
                {safestRoute.safetyLevel}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Incident Safety
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .incidentSafety * 100
                ).toFixed(0)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Safe Zones
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .safeZones * 100
                ).toFixed(0)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Time Safety
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .timeSafety * 100
                ).toFixed(0)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Emergency Proximity
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .emergencyProximity * 100
                ).toFixed(0)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Report Recency
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .reportRecency * 100
                ).toFixed(0)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Distance Safety
              </p>

              <p className="font-semibold">
                {(
                  safestRoute.features
                    .distanceSafety * 100
                ).toFixed(0)}
              </p>
            </div>

          </div>

        </div>
      ) : (
        <p className="text-sm text-gray-400 mb-8">
          No routes available.
        </p>
      )}

      {/* ----------------------------------------- */}
      {/* ALL RANKED ROUTES */}
      {/* ----------------------------------------- */}

      {rankedRoutes.length > 1 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Route Comparison
          </h2>

          <div className="space-y-2 mb-8">

            {rankedRoutes.map(
              (route, index) => (
                <div
                  key={route.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >

                  <div>
                    <p className="font-medium text-gray-900">
                      #{index + 1} Route {route.id}
                    </p>

                    <p className="text-xs text-gray-500">
                      {route.safetyLevel}
                    </p>
                  </div>

                  <p className="font-bold text-gray-900">
                    {route.score}/100
                  </p>

                </div>
              )
            )}

          </div>
        </>
      )}

      {/* ----------------------------------------- */}
      {/* SAFE ZONES */}
      {/* ----------------------------------------- */}

      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Nearby Safe Zones
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 mb-8">

        {safeZones.map(
          (zone) => (
            <SafeZoneCard
              key={zone.id}
              zone={zone}
            />
          )
        )}

      </div>

      {/* ----------------------------------------- */}
      {/* RECENT REPORTS */}
      {/* ----------------------------------------- */}

      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Recent Reports
      </h2>

      {loadingReports ? (

        <p className="text-sm text-gray-400">
          Loading reports...
        </p>

      ) : reports.length > 0 ? (

        <div className="space-y-2">

          {reports.map(
            (report) => {

              let reportDate = null;

              if (
                report.timestamp?.toDate
              ) {
                reportDate =
                  report.timestamp.toDate();

              } else if (
                report.createdAt
              ) {
                reportDate =
                  new Date(
                    report.createdAt
                  );
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
                          ] ||
                          report.category}

                    </span>

                    {" — "}

                    {report.description}

                  </div>

                  {reportDate && (
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">

                      {reportDate.toLocaleDateString()}{" "}

                      {reportDate.toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}

                    </span>
                  )}

                </div>
              );
            }
          )}

        </div>

      ) : (

        <p className="text-sm text-gray-400 italic">
          No reports yet. Be the first to report an issue.
        </p>

      )}

      {/* ----------------------------------------- */}
      {/* REPORT MODAL */}
      {/* ----------------------------------------- */}

      <ReportModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleReportSubmit}
      />

    </div>
  );
}