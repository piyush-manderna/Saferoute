const PHOTON_URL = "https://photon.komoot.io/api/";

export async function geocodeLocation(query) {
  const params = new URLSearchParams({
    q: query,
    limit: "1"
  });

  const response = await fetch(
    `${PHOTON_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error(`Location not found: ${query}`);
  }

  const feature = data.features[0];

  return {
    name: feature.properties.name || query,
    coordinates: feature.geometry.coordinates
  };
}