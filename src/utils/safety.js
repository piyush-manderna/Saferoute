// ============================================
// SAFEROUTE - SAFETY SCORING ENGINE
// Member 4
// ============================================


// ============================================
// UTILITY FUNCTIONS
// ============================================

function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}


// Calculate distance between two coordinates
// Returns distance in kilometers.
function haversineDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}


// Find minimum distance from a location
// to any point on the route.
function getMinimumDistanceToRoute(
    route,
    latitude,
    longitude
) {

    if (
        !route?.geometry?.coordinates ||
        route.geometry.coordinates.length === 0
    ) {
        return Infinity;
    }

    let minimumDistance = Infinity;

    for (const coordinate of route.geometry.coordinates) {

        // GeoJSON format:
        // [longitude, latitude]

        const routeLongitude = coordinate[0];
        const routeLatitude = coordinate[1];

        const distance =
            haversineDistance(
                latitude,
                longitude,
                routeLatitude,
                routeLongitude
            );

        if (distance < minimumDistance) {
            minimumDistance = distance;
        }
    }

    return minimumDistance;
}


// ============================================
// 1. INCIDENT SAFETY
// ============================================

function getCategoryRisk(category) {

    const categoryRisk = {

        suspicious_activity: 0.60,

        theft: 0.70,

        harassment: 0.80,

        assault: 0.90,

        violent_incident: 1.00,

        accident: 0.60,

        vandalism: 0.50
    };

    return categoryRisk[category] ?? 0.60;
}


export function calculateIncidentSafety(
    route,
    reports = []
) {

    if (
        !Array.isArray(reports) ||
        reports.length === 0
    ) {
        return 1.0;
    }

    let totalRisk = 0;

    for (const report of reports) {

        if (!report?.location) {
            continue;
        }

        // Firebase GeoPoint
        const latitude =
            report.location.latitude;

        const longitude =
            report.location.longitude;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            continue;
        }

        const distance =
            getMinimumDistanceToRoute(
                route,
                latitude,
                longitude
            );

        // Only reports within 500 metres
        // affect this route.
        if (distance > 0.5) {
            continue;
        }

        const categoryRisk =
            getCategoryRisk(
                report.category
            );

        const credibility =
            typeof report.credibilityScore === "number"
                ? clamp(report.credibilityScore)
                : 0.5;

        const recencyScore =
            calculateReportRecency(report);

        // Recent report = higher risk.
        const recencyRisk =
            1 - recencyScore;

        const reportRisk =
            categoryRisk *
            (0.5 + 0.5 * credibility) *
            (0.5 + 0.5 * recencyRisk);

        totalRisk += reportRisk;
    }

    return clamp(
        1 - Math.min(totalRisk / 3, 0.8)
    );
}


// ============================================
// 2. LIGHTING SCORE
// ============================================

export function calculateLightingScore(
    lighting = 1
) {

    return clamp(
        typeof lighting === "number"
            ? lighting
            : 1
    );
}


// ============================================
// 3. SAFE ZONE SCORE
// ============================================

export function calculateSafeZoneScore(
    route,
    safeZones = []
) {

    if (
        !Array.isArray(safeZones) ||
        safeZones.length === 0
    ) {
        return 0.2;
    }

    let nearbyVerifiedZones = 0;

    for (const zone of safeZones) {

        if (!zone?.location) {
            continue;
        }

        if (zone.verified !== true) {
            continue;
        }

        const latitude =
            zone.location.latitude;

        const longitude =
            zone.location.longitude;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            continue;
        }

        const distance =
            getMinimumDistanceToRoute(
                route,
                latitude,
                longitude
            );

        // Within 500 metres
        if (distance <= 0.5) {
            nearbyVerifiedZones++;
        }
    }

    if (nearbyVerifiedZones >= 3) {
        return 1.0;
    }

    if (nearbyVerifiedZones === 2) {
        return 0.8;
    }

    if (nearbyVerifiedZones === 1) {
        return 0.6;
    }

    return 0.2;
}


// ============================================
// 4. CCTV SCORE
// ============================================

export function calculateCCTVScore(
    cctv = 1
) {

    return clamp(
        typeof cctv === "number"
            ? cctv
            : 1
    );
}


// ============================================
// 5. ACCESSIBILITY SCORE
// ============================================

export function calculateAccessibilityScore(
    accessibility = 1
) {

    return clamp(
        typeof accessibility === "number"
            ? accessibility
            : 1
    );
}


// ============================================
// 6. TIME SAFETY
// ============================================

export function calculateTimeSafety(
    hour = new Date().getHours()
) {

    if (hour >= 6 && hour < 18) {
        return 1.0;
    }

    if (hour >= 18 && hour < 21) {
        return 0.8;
    }

    if (hour >= 21 || hour < 5) {
        return 0.4;
    }

    return 0.6;
}


// ============================================
// 7. ROAD SAFETY
// ============================================

export function calculateRoadSafety(
    roadType = 1
) {

    if (typeof roadType === "number") {
        return clamp(roadType);
    }

    const road =
        String(roadType).toLowerCase();

    if (
        road.includes("main") ||
        road.includes("highway") ||
        road.includes("major")
    ) {
        return 1.0;
    }

    if (road.includes("residential")) {
        return 0.8;
    }

    if (
        road.includes("small") ||
        road.includes("minor")
    ) {
        return 0.6;
    }

    if (
        road.includes("narrow") ||
        road.includes("isolated")
    ) {
        return 0.3;
    }

    return 0.6;
}


// ============================================
// 8. EMERGENCY PROXIMITY
// ============================================

export function calculateEmergencyProximity(
    route,
    safeZones = []
) {

    const emergencyTypes = [
        "police",
        "police_station",
        "hospital",
        "fire_station",
        "ambulance"
    ];

    let closestDistance = Infinity;

    for (const zone of safeZones) {

        if (!zone?.location) {
            continue;
        }

        if (zone.verified !== true) {
            continue;
        }

        const type =
            String(zone.type || "").toLowerCase();

        const isEmergencyLocation =
            emergencyTypes.some(
                emergency =>
                    type.includes(emergency)
            );

        if (!isEmergencyLocation) {
            continue;
        }

        const latitude =
            zone.location.latitude;

        const longitude =
            zone.location.longitude;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            continue;
        }

        const distance =
            getMinimumDistanceToRoute(
                route,
                latitude,
                longitude
            );

        closestDistance =
            Math.min(
                closestDistance,
                distance
            );
    }

    if (closestDistance <= 0.5) {
        return 1.0;
    }

    if (closestDistance <= 1) {
        return 0.8;
    }

    if (closestDistance <= 2) {
        return 0.6;
    }

    if (closestDistance <= 5) {
        return 0.3;
    }

    return 0.1;
}


// ============================================
// 9. REPORT RECENCY
// ============================================

export function calculateReportRecency(
    reportOrDate
) {

    let date;

    // Firebase report timestamp
    if (
        reportOrDate?.timestamp &&
        typeof reportOrDate.timestamp.toDate === "function"
    ) {
        date =
            reportOrDate.timestamp.toDate();
    }

    // Firebase Timestamp directly
    else if (
        reportOrDate &&
        typeof reportOrDate.toDate === "function"
    ) {
        date =
            reportOrDate.toDate();
    }

    // JavaScript Date
    else if (
        reportOrDate instanceof Date
    ) {
        date = reportOrDate;
    }

    // String date
    else if (
        typeof reportOrDate === "string"
    ) {
        date =
            new Date(reportOrDate);
    }

    else {
        return 0.5;
    }

    if (
        Number.isNaN(date.getTime())
    ) {
        return 0.5;
    }

    const ageInDays =
        (Date.now() - date.getTime()) /
        (1000 * 60 * 60 * 24);

    if (ageInDays <= 7) {
        return 0.0;
    }

    if (ageInDays <= 30) {
        return 0.2;
    }

    if (ageInDays <= 90) {
        return 0.4;
    }

    if (ageInDays <= 180) {
        return 0.6;
    }

    if (ageInDays <= 365) {
        return 0.8;
    }

    return 1.0;
}


// ============================================
// 10. DISTANCE SAFETY
// ============================================

// OSRM distance is in metres.
export function calculateDistanceSafety(
    distanceMeters
) {

    if (
        typeof distanceMeters !== "number" ||
        distanceMeters < 0
    ) {
        return 0.5;
    }

    const distanceKm =
        distanceMeters / 1000;

    if (distanceKm <= 2) {
        return 1.0;
    }

    if (distanceKm <= 5) {
        return 0.8;
    }

    if (distanceKm <= 8) {
        return 0.6;
    }

    if (distanceKm <= 12) {
        return 0.4;
    }

    return 0.2;
}


// ============================================
// WEIGHTS
// ============================================

const WEIGHTS = {

    incidentSafety: 0.20,

    lighting: 0.15,

    safeZones: 0.12,

    cctv: 0.10,

    accessibility: 0.10,

    timeSafety: 0.08,

    roadSafety: 0.08,

    emergencyProximity: 0.07,

    reportRecency: 0.05,

    distanceSafety: 0.05
};


// ============================================
// WEIGHTED SUM
// ============================================

export function calculateWeightedScore(
    features
) {

    const score =

        features.incidentSafety *
        WEIGHTS.incidentSafety +

        features.lighting *
        WEIGHTS.lighting +

        features.safeZones *
        WEIGHTS.safeZones +

        features.cctv *
        WEIGHTS.cctv +

        features.accessibility *
        WEIGHTS.accessibility +

        features.timeSafety *
        WEIGHTS.timeSafety +

        features.roadSafety *
        WEIGHTS.roadSafety +

        features.emergencyProximity *
        WEIGHTS.emergencyProximity +

        features.reportRecency *
        WEIGHTS.reportRecency +

        features.distanceSafety *
        WEIGHTS.distanceSafety;

    return Math.round(
        clamp(score) * 100
    );
}


// ============================================
// SAFETY LEVEL
// ============================================

export function getSafetyLevel(score) {

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


// ============================================
// MAIN SAFETY SCORE FUNCTION
// ============================================

export function calculateSafetyScore(
    routes,
    reports = [],
    safeZones = []
) {

    if (!Array.isArray(routes)) {
        return [];
    }

    return routes.map(route => {

        // -----------------------------
        // Firebase-based factors
        // -----------------------------

        const incidentSafety =
            calculateIncidentSafety(
                route,
                reports
            );

        const safeZonesScore =
            calculateSafeZoneScore(
                route,
                safeZones
            );

        const emergencyProximity =
            calculateEmergencyProximity(
                route,
                safeZones
            );


        // -----------------------------
        // Route-based factors
        // -----------------------------

        const distanceSafety =
            calculateDistanceSafety(
                route.distance
            );


        // -----------------------------
        // Time-based factor
        // -----------------------------

        const timeSafety =
            calculateTimeSafety();


        // -----------------------------
        // Temporary/default factors
        // -----------------------------

        const lighting =
            calculateLightingScore(
                route.lighting ?? 1
            );

        const cctv =
            calculateCCTVScore(
                route.cctv ?? 1
            );

        const accessibility =
            calculateAccessibilityScore(
                route.accessibility ?? 1
            );

        const roadSafety =
            calculateRoadSafety(
                route.roadType ?? 1
            );


        // -----------------------------
        // Reports near this route
        // -----------------------------

        const nearbyReports =
            Array.isArray(reports)
                ? reports.filter(report => {

                    if (!report?.location) {
                        return false;
                    }

                    const latitude =
                        report.location.latitude;

                    const longitude =
                        report.location.longitude;

                    if (
                        typeof latitude !== "number" ||
                        typeof longitude !== "number"
                    ) {
                        return false;
                    }

                    return (
                        getMinimumDistanceToRoute(
                            route,
                            latitude,
                            longitude
                        ) <= 0.5
                    );

                })
                : [];


        // -----------------------------
        // Report recency
        // -----------------------------

        let reportRecency = 1.0;

        if (nearbyReports.length > 0) {

            const values =
                nearbyReports.map(
                    report =>
                        calculateReportRecency(
                            report
                        )
                );

            reportRecency =
                values.reduce(
                    (sum, value) =>
                        sum + value,
                    0
                ) / values.length;
        }


        // -----------------------------
        // Feature vector
        // -----------------------------

        const features = {

            incidentSafety,

            lighting,

            safeZones:
                safeZonesScore,

            cctv,

            accessibility,

            timeSafety,

            roadSafety,

            emergencyProximity,

            reportRecency,

            distanceSafety
        };


        // -----------------------------
        // Final weighted score
        // -----------------------------

        const score =
            calculateWeightedScore(
                features
            );


        return {

            ...route,

            score,

            safetyLevel:
                getSafetyLevel(score),

            features
        };
    });
}


// ============================================
// ROUTE RANKING
// ============================================

export function rankRoutes(
    scoredRoutes
) {

    if (!Array.isArray(scoredRoutes)) {
        return [];
    }

    return [...scoredRoutes].sort(
        (a, b) =>
            b.score - a.score
    );
}


// ============================================
// GET WEIGHTS
// ============================================

export function getWeights() {

    return {
        ...WEIGHTS
    };
}