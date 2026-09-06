export function prepareHeatmapData(reports) {
    return reports
        .filter(report => 
            report.latitude !== undefined &&
            report.longitude !== undefined
        )
        .map(report => ({
            latitude: report.latitude,
            longitude: report.longitude,
            weight: report.severity ?? 1
        }));
}