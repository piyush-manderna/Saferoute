import {
    getReports,
    getSafeZones
} from "../services/firestore.js";

import {
    calculateSafetyScore,
    rankRoutes
} from "./safety.js";


// ============================================
// TEMPORARY ROUTES
// ============================================
//
// These imitate Member 2's OSRM output.
//
// Later we will replace these with:
// fetchRoutes(start, end)
// ============================================

const routes = [

    {
        id: 1,

        geometry: {
            type: "LineString",

            coordinates: [
                [79.1320, 12.9060],
                [79.1330, 12.9070],
                [79.1340, 12.9080],
                [79.1350, 12.9090]
            ]
        },

        // metres
        distance: 3000,

        // seconds
        duration: 600
    },


    {
        id: 2,

        geometry: {
            type: "LineString",

            coordinates: [
                [79.1320, 12.9060],
                [79.1360, 12.9060],
                [79.1400, 12.9100]
            ]
        },

        // metres
        distance: 4000,

        // seconds
        duration: 800
    }
];


// ============================================
// TEST
// ============================================

async function testFirebaseIntegration() {

    try {

        console.log(
            "================================"
        );

        console.log(
            "FIREBASE + SAFETY INTEGRATION TEST"
        );

        console.log(
            "================================"
        );


        // ------------------------------------
        // GET REPORTS
        // ------------------------------------

        console.log(
            "\n1. Getting Firebase reports..."
        );

        const reports =
            await getReports();

        console.log(
            `Reports received: ${reports.length}`
        );

        console.log(reports);


        // ------------------------------------
        // GET SAFE ZONES
        // ------------------------------------

        console.log(
            "\n2. Getting Firebase safe zones..."
        );

        const safeZones =
            await getSafeZones();

        console.log(
            `Safe zones received: ${safeZones.length}`
        );

        console.log(safeZones);


        // ------------------------------------
        // CALCULATE SAFETY
        // ------------------------------------

        console.log(
            "\n3. Calculating route safety..."
        );

        const scoredRoutes =
            calculateSafetyScore(
                routes,
                reports,
                safeZones
            );

        console.log(
            "Scored routes:"
        );

        console.log(
            scoredRoutes
        );


        // ------------------------------------
        // RANK ROUTES
        // ------------------------------------

        console.log(
            "\n4. Ranking routes..."
        );

        const rankedRoutes =
            rankRoutes(
                scoredRoutes
            );


        rankedRoutes.forEach(
            (route, index) => {

                console.log(
                    `${index + 1}. ` +
                    `Route ${route.id} → ` +
                    `${route.score}/100 → ` +
                    `${route.safetyLevel}`
                );

            }
        );


        // ------------------------------------
        // SAFEST ROUTE
        // ------------------------------------

        console.log(
            "\n5. Safest route:"
        );

        console.log(
            `Route ${rankedRoutes[0].id}`
        );

        console.log(
            `Score: ${rankedRoutes[0].score}/100`
        );

        console.log(
            `Level: ${rankedRoutes[0].safetyLevel}`
        );


        // ------------------------------------
        // FEATURES
        // ------------------------------------

        console.log(
            "\nSafety factors of safest route:"
        );

        console.log(
            rankedRoutes[0].features
        );


        console.log(
            "\n================================"
        );

        console.log(
            "INTEGRATION TEST COMPLETE"
        );

        console.log(
            "================================"
        );


    } catch (error) {

        console.error(
            "\nINTEGRATION TEST FAILED"
        );

        console.error(error);
    }
}


testFirebaseIntegration();