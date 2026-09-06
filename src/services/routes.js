const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

export async function fetchRoutes(start, end) {
  const url = `${OSRM_URL}/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=2&overview=full&geometries=geojson&steps=false`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }

  const data = await response.json();

  if (data.code !== "Ok") {
    throw new Error(data.message || "No route found");
  }

  return data.routes.map((route, index) => ({
    id: index + 1,
    geometry: route.geometry,
    duration: route.duration,
    distance: route.distance
  }));
}