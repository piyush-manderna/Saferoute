// ============================================
// SAFEROUTE - SAFETY SCORING ENGINE
// Member 4
// ============================================

// ---------- Utility ----------

function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}


// Calculate distance between two coordinates.
// Returns distance in kilometers.
function haversineDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

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


// Find the minimum distance from a location
// to any coordinate in the route.
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

        // GeoJSON uses [longitude, latitude]
        const routeLongitude = coordinate[0];
        const routeLatitude = coordinate[1];

        const distance = haversineDistance(
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
        return 1;
    }

    let totalRisk = 0;

    for (const report of reports) {

        // Member 3 stores location as Firebase GeoPoint
        if (!report?.location) {
            continue;
        }

        const latitude = report.location.latitude;
        const longitude = report.location.longitude;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            continue;
        }

        const distance = getMinimumDistanceToRoute(
            route,
            latitude,
            longitude
        );

        // Only consider reports within 500 metres.
        if (distance > 0.5) {
            continue;
        }

        const categoryRisk =
            getCategoryRisk(report.category);

        const credibility =
            typeof report.credibilityScore === "number"
                ? clamp(report.credibilityScore)
                : 0.5;

        const recencyScore =
            calculateReportRecency(report);

        // Recent report = more risk.
        const recencyRisk =
            1 - recencyScore;

        const reportRisk =
            categoryRisk *
            (0.5 + 0.5 * credibility) *
            (0.5 + 0.5 * recencyRisk);

        totalRisk += reportRisk;
    }

    // More incidents = lower safety.
    return clamp(
        1 - Math.min(totalRisk / 3, 0.8)
    );
}


// ============================================
// 2. LIGHTING
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
// 3. SAFE ZONES
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

        // Only verified safe zones.
        if (zone.verified !== true) {
            continue;
        }

        const latitude = zone.location.latitude;
        const longitude = zone.location.longitude;

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

        // Safe zone within 500 metres.
        if (distance <= 0.5) {
            nearbyVerifiedZones++;
        }
    }

    if (nearbyVerifiedZones >= 3) return 1.0;
    if (nearbyVerifiedZones === 2) return 0.8;
    if (nearbyVerifiedZones === 1) return 0.6;

    return 0.2;
}


// ============================================
// 4. CCTV
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
// 5. ACCESSIBILITY
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

    if (closestDistance <= 0.5) return 1.0;
    if (closestDistance <= 1) return 0.8;