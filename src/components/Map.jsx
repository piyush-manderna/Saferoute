import React, { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
  Marker,
  LngLatBounds
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchRoutes } from "../services/routes";
import {
  geocodeLocation,
  geocodeSuggestions
} from "../services/geocoding";

const INITIAL_CENTER = [79.1550, 12.9692];

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [startSuggestions, setStartSuggestions] = useState([]);
const [destinationSuggestions, setDestinationSuggestions] = useState([]);

const [selectedStart, setSelectedStart] = useState(null);
const [selectedDestination, setSelectedDestination] = useState(null);
  const startMarker = useRef(null);
  const destinationMarker = useRef(null);

  const [start, setStart] = useState("VIT Vellore");
  const [destination, setDestination] = useState(
    "Katpadi Railway Station, Vellore, Tamil Nadu, India"
  );
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    if (map.current) return;

    const mapInstance = new MapLibreMap({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: INITIAL_CENTER,
      zoom: 14
    });

    map.current = mapInstance;

    mapInstance.addControl(
      new NavigationControl(),
      "top-right"
    );

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, []);
async function handleStartChange(value) {
  setStart(value);
  setSelectedStart(null);

  if (!value.trim()) {
    setStartSuggestions([]);
    return;
  }

  try {
    const results = await geocodeSuggestions(value);
    setStartSuggestions(results);
  } catch (error) {
    console.error("Start suggestions error:", error);
    setStartSuggestions([]);
  }
}

async function handleDestinationChange(value) {
  setDestination(value);
  setSelectedDestination(null);

  if (!value.trim()) {
    setDestinationSuggestions([]);
    return;
  }

  try {
    const results = await geocodeSuggestions(value);
    setDestinationSuggestions(results);
  } catch (error) {
    console.error("Destination suggestions error:", error);
    setDestinationSuggestions([]);
  }
}

  async function findRoutes() {
    if (!start.trim() || !destination.trim()) {
      console.error("Please enter both locations");
      return;
    }

    setLoading(true);

    try {
      // 1. GET START COORDINATES
let startCoordinates;

if (selectedStart) {
  startCoordinates = selectedStart.coordinates;
} else {
  const startLocation = await geocodeLocation(start);
  startCoordinates = startLocation.coordinates;
}

// 2. GET DESTINATION COORDINATES
let endCoordinates;

if (selectedDestination) {
  endCoordinates = selectedDestination.coordinates;
} else {
  const destinationLocation =
    await geocodeLocation(destination);

  endCoordinates = destinationLocation.coordinates;
}

      console.log(
        "START COORDINATES:",
        startCoordinates
      );

      console.log(
        "DESTINATION COORDINATES:",
        endCoordinates
      );

      // 4. REMOVE OLD MARKERS
      if (startMarker.current) {
        startMarker.current.remove();
      }

      if (destinationMarker.current) {
        destinationMarker.current.remove();
      }

      // 5. ADD NEW START MARKER
      startMarker.current = new Marker({
        color: "blue"
      })
        .setLngLat(startCoordinates)
        .addTo(map.current);

      // 6. ADD NEW DESTINATION MARKER
      destinationMarker.current = new Marker({
        color: "red"
      })
        .setLngLat(endCoordinates)
        .addTo(map.current);

      // 7. REMOVE OLD ROUTES
      const oldSources = [
        "route-source-1",
        "route-source-2",
        "route-source-3"
      ];

      const oldLayers = [
        "route-layer-1",
        "route-layer-2",
        "route-layer-3"
      ];

      oldLayers.forEach((layerId) => {
        if (map.current.getLayer(layerId)) {
          map.current.removeLayer(layerId);
        }
      });

      oldSources.forEach((sourceId) => {
        if (map.current.getSource(sourceId)) {
          map.current.removeSource(sourceId);
        }
      });

      // 8. FETCH ROUTES
              const routeResults = await fetchRoutes(
          startCoordinates,
          endCoordinates
        );

        console.log("Routes received:", routeResults);

        setRoutes(routeResults);

        if (!routeResults || routeResults.length === 0) {
          console.error("No routes found");
          return;
        }

      // 9. ROUTE COLORS
      const routeColors = [
        "#22c55e",
        "#eab308",
        "#ef4444"
      ];

      // 10. DRAW ROUTES
       routeResults.forEach((route, index) => {
        const sourceId =
          `route-source-${route.id}`;

        const layerId =
          `route-layer-${route.id}`;

        map.current.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {
              routeId: route.id
            },
            geometry: route.geometry
          }
        });

        map.current.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color":
              routeColors[index] || "#3b82f6",
            "line-width": 6,
            "line-opacity": 0.8
          }
        });

        // 11. CLICK ROUTE TO HIGHLIGHT
        map.current.on("click", layerId, () => {
          routeResults.forEach((otherRoute) => {
            const otherLayerId =
              `route-layer-${otherRoute.id}`;

            if (map.current.getLayer(otherLayerId)) {
              map.current.setPaintProperty(
                otherLayerId,
                "line-opacity",
                otherRoute.id === route.id
                  ? 1
                  : 0.3
              );

              map.current.setPaintProperty(
                otherLayerId,
                "line-width",
                otherRoute.id === route.id
                  ? 8
                  : 4
              );
            }
          });

          console.log(
            "Selected route:",
            route
          );
        });

        // 12. CHANGE CURSOR
        map.current.on(
          "mouseenter",
          layerId,
          () => {
            map.current.getCanvas().style.cursor =
              "pointer";
          }
        );

        map.current.on(
          "mouseleave",
          layerId,
          () => {
            map.current.getCanvas().style.cursor =
              "";
          }
        );
      });

      // 13. FIT MAP TO ROUTES
      const allCoordinates = routeResults.flatMap(
        (route) => route.geometry.coordinates
      );

      if (allCoordinates.length > 0) {
        const bounds = allCoordinates.reduce(
          (bounds, coordinate) =>
            bounds.extend(coordinate),
          new LngLatBounds(
            allCoordinates[0],
            allCoordinates[0]
          )
        );

        map.current.fitBounds(bounds, {
          padding: 60
        });
      }

      // 14. DISPLAY DISTANCE AND TIME
      routes.forEach((route) => {
        console.log({
          route: route.id,
          distanceKm: (
            route.distance / 1000
          ).toFixed(2),
          durationMinutes: Math.round(
            route.duration / 60
          )
        });
      });
    } catch (error) {
      console.error(
        "Map/routing error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    >
      {/* SEARCH PANEL */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          zIndex: 10,
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          width: "300px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Start Location
          </label>

          <input
            type="text"
            value={start}
            onChange={(e) =>
               handleStartChange(e.target.value)
            }
            placeholder="Enter starting location"
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          {startSuggestions.length > 0 && (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginTop: "5px",
      background: "white"
    }}
  >
    {startSuggestions.map((suggestion, index) => (
      <div
        key={index}
        onClick={() => {
          setStart(suggestion.name);
          setSelectedStart(suggestion);
          setStartSuggestions([]);
        }}
        style={{
          padding: "8px",
          cursor: "pointer",
          borderBottom: "1px solid #eee"
        }}
      >
        <strong>{suggestion.name}</strong>

        {suggestion.address && (
          <div
            style={{
              fontSize: "12px",
              color: "#666"
            }}
          >
            {suggestion.address}
          </div>
        )}
      </div>
    ))}
  </div>
)}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            Destination
          </label>

          <input
            type="text"
            value={destination}
            onChange={(e) =>
              handleDestinationChange(e.target.value)

            }
            placeholder="Enter destination"
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          {destinationSuggestions.length > 0 && (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginTop: "5px",
      background: "white"
    }}
  >
    {destinationSuggestions.map((suggestion, index) => (
      <div
        key={index}
        onClick={() => {
          setDestination(suggestion.name);
          setSelectedDestination(suggestion);
          setDestinationSuggestions([]);
        }}
        style={{
          padding: "8px",
          cursor: "pointer",
          borderBottom: "1px solid #eee"
        }}
      >
        <strong>{suggestion.name}</strong>

        {suggestion.address && (
          <div
            style={{
              fontSize: "12px",
              color: "#666"
            }}
          >
            {suggestion.address}
          </div>
        )}
      </div>
    ))}
  </div>
)}
        </div>

        <button
          onClick={findRoutes}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading
            ? "Finding Routes..."
            : "Find Routes"}
        </button>
        {routes.length > 0 && (
  <div style={{ marginTop: "15px" }}>
    {routes.map((route, index) => (
      <div
        key={route.id}
        style={{
          padding: "10px",
          marginBottom: "8px",
          border: "1px solid #ddd",
          borderRadius: "6px"
        }}
      >
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "5px"
  }}
>
  <div
    style={{
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      backgroundColor:
        ["#22c55e", "#eab308", "#ef4444"][index]
    }}
  />

  <strong>Route {index + 1}</strong>
</div>

<div>
  Distance: {(route.distance / 1000).toFixed(2)} km
</div>

<div>
  Time: {Math.round(route.duration / 60)} min
</div>
      </div>
    ))}
  </div>
)}
      </div>

      {/* MAP */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}

export default Map;