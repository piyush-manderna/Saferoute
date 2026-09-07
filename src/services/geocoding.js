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
export async function geocodeSuggestions(query) {
  if (!query.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    limit: "5"
  });

  const response = await fetch(
    `${PHOTON_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`);
  }

  const data = await response.json();

  return (data.features || []).map((feature) => ({
    name:
      feature.properties.name ||
      feature.properties.city ||
      query,
    coordinates: feature.geometry.coordinates,
    address: [
      feature.properties.street,
      feature.properties.city,
      feature.properties.state
    ]
      .filter(Boolean)
      .join(", ")
  }));
}