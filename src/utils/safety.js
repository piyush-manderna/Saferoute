// ========================================
// SAFEROUTE SAFETY ALGORITHM
// Member 4
// Technique: Weighted Sum
// ========================================


// ========================================
// SAFETY FACTOR WEIGHTS
// Total = 1.00 (100%)
// ========================================

const WEIGHTS = {
    incidentSafety: 0.20,        // 20%
    lighting: 0.15,              // 15%
    safeZones: 0.12,             // 12%
    cctv: 0.10,                  // 10%
    accessibility: 0.10,         // 10%
    timeSafety: 0.08,            //  8%
    roadSafety: 0.08,            //  8%
    emergencyProximity: 0.07,    //  7%
    reportRecency: 0.05,         //  5%
    distanceSafety: 0.05         //  5%
};


// ========================================
// HELPER FUNCTION
// Keeps values between 0 and 1
// ========================================

function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}


// ========================================
// 1. INCIDENT / CRIME SAFETY
// ========================================
// Fewer incidents = safer route
//
// 0 incidents  -> 1.00
// 1 incident   -> 0.85
// 2 incidents  -> 0.70
// 3 incidents  -> 0.55
// 4 incidents  -> 0.40
// 5+ incidents -> 0.20
// ========================================

export function calculateIncidentSafety(incidentCount = 0) {

    incidentCount = Math.max(0, Number(incidentCount) || 0);

    if (incidentCount === 0) return 1.00;
    if (incidentCount === 1) return 0.85;
    if (incidentCount === 2) return 0.70;
    if (incidentCount === 3) return 0.55;
    if (incidentCount === 4) return 0.40;

    return 0.20;
}


// ========================================
// 2. LIGHTING SCORE
// ========================================
// Input should be between 0 and 1.
//
// 1.0 = excellent lighting
// 0.0 = no lighting
// ========================================

export function calculateLightingScore(lightingLevel = 0.5) {

    return clamp(Number(lightingLevel) || 0);
}


// ========================================
// 3. SAFE ZONE SCORE
// ========================================
// More nearby safe zones = safer
//
// 0 zones -> 0.20
// 1 zone  -> 0.60
// 2 zones -> 0.80
// 3+      -> 1.00
// ========================================

export function calculateSafeZoneScore(safeZoneCount = 0) {

    safeZoneCount = Math.max(0, Number(safeZoneCount) || 0);

    if (safeZoneCount >= 3) return 1.00;
    if (safeZoneCount === 2) return 0.80;
    if (safeZoneCount === 1) return 0.60;

    return 0.20;
}


// ========================================
// 4. CCTV SCORE
// ========================================
// Input should be between 0 and 1.
//
// 1.0 = excellent CCTV coverage
// 0.0 = no CCTV
// ========================================

export function calculateCCTVScore(cctvLevel = 0.5) {

    return clamp(Number(cctvLevel) || 0);
}


// ========================================
// 5. ACCESSIBILITY SCORE
// ========================================
// Represents how populated / accessible
// the route is.
//
// 1.0 = highly accessible/populated
// 0.0 = isolated
// ========================================

export function calculateAccessibilityScore(
    accessibilityLevel = 0.5
) {

    return clamp(Number(accessibilityLevel) || 0);
}


// ========================================
// 6. TIME SAFETY
// ========================================
// Uses hour in 24-hour format.
//
// 06:00–18:00 -> 1.00
// 18:00–21:00 -> 0.80
// 21:00–05:00 -> 0.40
// 05:00–06:00 -> 0.60
// ========================================

export function calculateTimeSafety(
    hour = new Date().getHours()
) {

    hour = Number(hour);

    if (Number.isNaN(hour)) {
        hour = new Date().getHours();
    }

    if (hour >= 6 && hour < 18) {
        return 1.00;
    }

    if (hour >= 18 && hour < 21) {
        return 0.80;
    }

    if (hour >= 21 || hour < 5) {
        return 0.40;
    }

    return 0.60;
}


// ========================================
// 7. ROAD SAFETY
// ========================================
// Can accept either:
//   "main"
//   "residential"
//   "small"
//   "isolated"
// or a number between 0 and 1.
//
// ========================================

export function calculateRoadSafety(
    roadType = "residential"
) {

    // If a numerical safety value is supplied
    if (typeof roadType === "number") {
        return clamp(roadType);
    }

    const type = String(roadType).toLowerCase();

    switch (type) {

        case "main":
        case "highway":
        case "major":
            return 1.00;

        case "residential":
            return 0.80;

        case "small":
        case "minor":
            return 0.60;

        case "narrow":
        case "isolated":
            return 0.30;

        default:
            return 0.60;
    }
}


// ========================================
// 8. EMERGENCY PROXIMITY
// ========================================
// Distance to nearest police station,
// hospital, or emergency service.
//
// Closer = safer.
//
// <= 0.5 km -> 1.00
// <= 1 km   -> 0.80
// <= 2 km   -> 0.60
// <= 5 km   -> 0.30
// > 5 km    -> 0.10
// ========================================

export function calculateEmergencyProximity(
    distanceKm = 1
) {

    distanceKm = Math.max(
        0,
        Number(distanceKm) || 0
    );

    if (distanceKm <= 0.5) return 1.00;
    if (distanceKm <= 1) return 0.80;
    if (distanceKm <= 2) return 0.60;
    if (distanceKm <= 5) return 0.30;

    return 0.10;
}


// ========================================
// 9. REPORT RECENCY
// ========================================
// Recent reports are more relevant.
//
// <= 7 days   -> 0.00
// <= 30 days  -> 0.20
// <= 90 days  -> 0.40
// <= 180 days -> 0.60
// <= 365 days -> 0.80
// > 365 days  -> 1.00
//
// IMPORTANT:
// This returns a SAFETY score.
// Therefore, older reports produce
// a higher safety value.
// ========================================

export function calculateReportRecency(
    daysSinceReport = 365
) {

    daysSinceReport = Math.max(
        0,
        Number(daysSinceReport) || 0
    );

    if (daysSinceReport <= 7) return 0.00;
    if (daysSinceReport <= 30) return 0.20;
    if (daysSinceReport <= 90) return 0.40;
    if (daysSinceReport <= 180) return 0.60;
    if (daysSinceReport <= 365) return 0.80;

    return 1.00;
}


// ========================================
// 10. DISTANCE SAFETY
// ========================================
// Shorter route = less exposure.
//
// <= 2 km  -> 1.00
// <= 5 km  -> 0.80
// <= 8 km  -> 0.60
// <= 12 km -> 0.40
// > 12 km  -> 0.20
// ========================================

export function calculateDistanceSafety(
    distanceKm = 5
) {

    distanceKm = Math.max(
        0,
        Number(distanceKm) || 0
    );

    if (distanceKm <= 2) return 1.00;
    if (distanceKm <= 5) return 0.80;
    if (distanceKm <= 8) return 0.60;
    if (distanceKm <= 12) return 0.40;

    return 0.20;
}


// ========================================
// 11. WEIGHTED SUM
// ========================================
// All features must be 0–1.
// Higher value = safer.
//
// Final result = 0–100
// ========================================

export function calculateWeightedScore(features) {

    const safeFeatures = {

        incidentSafety:
            clamp(features.incidentSafety),

        lighting:
            clamp(features.lighting),

        safeZones:
            clamp(features.safeZones),

        cctv:
            clamp(features.cctv),

        accessibility:
            clamp(features.accessibility),

        timeSafety:
            clamp(features.timeSafety),

        roadSafety:
            clamp(features.roadSafety),

        emergencyProximity:
            clamp(features.emergencyProximity),

        reportRecency:
            clamp(features.reportRecency),

        distanceSafety:
            clamp(features.distanceSafety)
    };


    const weightedScore =
        (safeFeatures.incidentSafety *
            WEIGHTS.incidentSafety) +

        (safeFeatures.lighting *
            WEIGHTS.lighting) +

        (safeFeatures.safeZones *
            WEIGHTS.safeZones) +

        (safeFeatures.cctv *
            WEIGHTS.cctv) +

        (safeFeatures.accessibility *
            WEIGHTS.accessibility) +

        (safeFeatures.timeSafety *
            WEIGHTS.timeSafety) +

        (safeFeatures.roadSafety *
            WEIGHTS.roadSafety) +

        (safeFeatures.emergencyProximity *
            WEIGHTS.emergencyProximity) +

        (safeFeatures.reportRecency *
            WEIGHTS.reportRecency) +

        (safeFeatures.distanceSafety *
            WEIGHTS.distanceSafety);


    return Math.round(
        weightedScore * 100
    );
}


// ========================================
// 12. SAFETY LEVEL
// ========================================

export function getSafetyLevel(score) {

    score = Number(score) || 0;

    if (score >= 80) {
        return "Safe";
    }

    if (score >= 60) {
        return "Moderate";
    }

    if (score >= 40) {
        return "Risky";
    }

    return "High Risk";
}


// ========================================
// 13. CALCULATE COMPLETE SAFETY SCORE
// ========================================
// This function will eventually receive
// REAL Firebase + Mapbox data.
//
// For now it uses route properties.
// ========================================

export function calculateSafetyScore(
    routes,
    reports = [],
    safeZones = []
) {

    return routes.map(route => {

        // --------------------------------
        // Temporary route data
        // --------------------------------

        const incidentCount =
            route.incidentCount ?? 0;

        const safeZoneCount =
            route.safeZoneCount ?? 0;

        const lightingLevel =
            route.lighting ?? 0.80;

        const cctvLevel =
            route.cctv ?? 0.70;

        const accessibilityLevel =
            route.accessibility ?? 0.80;

        const hour =
            route.hour ?? new Date().getHours();

        const roadType =
            route.roadType ?? "residential";

        const emergencyDistance =
            route.emergencyDistanceKm ?? 1;

        const reportAge =
            route.reportAgeDays ?? 30;

        const distance =
            route.distanceKm ?? 5;


        // --------------------------------
        // Calculate all 10 factors
        // --------------------------------

        const features = {

            incidentSafety:
                calculateIncidentSafety(
                    incidentCount
                ),

            lighting:
                calculateLightingScore(
                    lightingLevel
                ),

            safeZones:
                calculateSafeZoneScore(
                    safeZoneCount
                ),

            cctv:
                calculateCCTVScore(
                    cctvLevel
                ),

            accessibility:
                calculateAccessibilityScore(
                    accessibilityLevel
                ),

            timeSafety:
                calculateTimeSafety(
                    hour
                ),

            roadSafety:
                calculateRoadSafety(
                    roadType
                ),

            emergencyProximity:
                calculateEmergencyProximity(
                    emergencyDistance
                ),

            reportRecency:
                calculateReportRecency(
                    reportAge
                ),

            distanceSafety:
                calculateDistanceSafety(
                    distance
                )
        };


        // --------------------------------
        // Weighted Sum
        // --------------------------------

        const score =
            calculateWeightedScore(
                features
            );


        // --------------------------------
        // Safety Level
        // --------------------------------

        const level =
            getSafetyLevel(score);


        // --------------------------------
        // Return route
        // --------------------------------

        return {

            ...route,

            score,

            level,

            features
        };
    });
}


// ========================================
// 14. RANK ROUTES
// ========================================
// Highest safety score first.
// ========================================

export function rankRoutes(
    scoredRoutes
) {

    return [...scoredRoutes].sort(
        (a, b) => b.score - a.score
    );
}


// ========================================
// OPTIONAL
// Get weights for UI/debugging
// ========================================

export function getWeights() {

    return { ...WEIGHTS };
}