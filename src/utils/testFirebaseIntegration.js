// ============================================
// SAFEROUTE - FULL INTEGRATION TEST
// Member 2 + Member 3 + Member 4
// ============================================

import {
  getReports,
  getSafeZones
} from "../services/firestore.js";

import {
  calculateSafetyScore,
  rankRoutes
} from "./safety.js";

import {
  fetchRoutes
} from "../services/routes.js";

// ============================================
// TEST FUNCTION
// ============================================

async function testFullIntegration() {

  try {

    console.log("================================");
    console.log("SAFEROUTE FULL INTEGRATION TEST");
    console.log("================================");

    // ============================================
    // 1. GET ROUTES FROM MEMBER 2
    // ============================================

    console.log("\n1. Getting routes from Member 2...");

    // [longitude, latitude]
    const start = [79.1320, 12.9060];
    const end = [79.1400, 12.9100];

    const routes = await fetchRoutes(start, end);

    console.log(`Routes received: ${routes.length}`);
    console.log(routes);

    // ============================================
    // 2. GET REPORTS FROM MEMBER 3
    // ============================================

    console.log("\n2. Getting Firebase reports...");

    const reports = await getReports();

    console.log(`Reports received: ${reports.length}`);
    console.log(reports);

    // ============================================
    // 3. GET SAFE ZONES FROM MEMBER 3
    // ============================================

    console.log("\n3. Getting Firebase safe zones...");

    const safeZones = await getSafeZones();

    console.log(`Safe zones received: ${safeZones.length}`);
    console.log(safeZones);

    // ============================================
    // 4. CALCULATE SAFETY SCORES
    // ============================================

    console.log("\n4. Calculating route safety...");

    const scoredRoutes = calculateSafetyScore(
      routes,
      reports,
      safeZones
    );

    console.log("Scored routes:");
    console.log(scoredRoutes);

    // ============================================
    // 5. RANK ROUTES
    // ============================================

    console.log("\n5. Ranking routes...");

    const rankedRoutes = rankRoutes(scoredRoutes);

    rankedRoutes.forEach((route, index) => {

      console.log(
        `${index + 1}. Route ${route.id} → ${route.score}/100 → ${route.safetyLevel}`
      );

    });

    // ============================================
    // 6. SAFEST ROUTE
    // ============================================

    console.log("\n6. Safest route:");

    if (rankedRoutes.length > 0) {

      console.log(
        `Route: ${rankedRoutes[0].id}`
      );

      console.log(
        `Score: ${rankedRoutes[0].score}/100`
      );

      console.log(
        `Level: ${rankedRoutes[0].safetyLevel}`
      );

      console.log(
        "\nSafety factors:"
      );

      console.log(
        rankedRoutes[0].features
      );

    } else {

      console.log("No routes available.");

    }

    // ============================================
    // 7. TEST COMPLETE
    // ============================================

    console.log("\n================================");
    console.log("FULL INTEGRATION TEST COMPLETE");
    console.log("================================");

  } catch (error) {

    console.error("\n================================");
    console.error("INTEGRATION TEST FAILED");
    console.error("================================");

    console.error(error);

  }

}

// ============================================
// RUN TEST
// ============================================

testFullIntegration();