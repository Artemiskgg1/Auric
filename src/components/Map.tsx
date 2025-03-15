"use client";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
const USGS_EARTHQUAKE_API =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

export default function EarthquakeMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;

      const mapBounds = new google.maps.LatLngBounds(
        { lat: -85, lng: -180 }, 
        { lat: 85, lng: 180 }
      );

      const mapInstance = new google.maps.Map(          
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 20, lng: 0 }, // Default to the world view
          zoom: 2,
          mapTypeId: "terrain",
          // mapTypeId: "hybrid",
          // mapTypeId: "satellite",
          // mapTypeId: "roadmap",
          restriction: {
            latLngBounds: mapBounds, 
            strictBounds: true, 
          },
        }
      );

      setMap(mapInstance);
      fetchEarthquakes(mapInstance);
      const interval = setInterval(
        () => fetchEarthquakes(mapInstance),
        600
      ); // Auto-refresh every hour
      return () => clearInterval(interval);
    });
  }, []);

  const fetchEarthquakes = async (mapInstance: google.maps.Map) => {
    try {
      const response = await fetch(USGS_EARTHQUAKE_API);
      const data = await response.json();
      const earthquakes = data.features;

      earthquakes.forEach((quake: any) => {
        const { coordinates } = quake.geometry;
        const magnitude = quake.properties.mag;
        const place = quake.properties.place;
        const time = new Date(quake.properties.time).toLocaleString();

        const marker = new google.maps.Marker({
          position: { lat: coordinates[1], lng: coordinates[0] },
          map: mapInstance,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10 + magnitude * 2, // Marker size based on magnitude
            fillColor: getColor(magnitude),
            fillOpacity: 0.6, 
            strokeWeight: 0.8,
          },
        });

        let isVisible = true;
        setInterval(() => {
          if (marker.getMap()) {
            isVisible = !isVisible;
            marker.setIcon({
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10 + magnitude * 2,
              fillColor: getColor(magnitude),
              fillOpacity: isVisible ? 0.6 : 0.2, 
              strokeWeight: isVisible ? 0.8 : 0.2,
            });
          }
        }, 800);

        const infoWindow = new google.maps.InfoWindow({
          content: `<div class="p-2">
                      <strong>Location:</strong> ${place}<br>
                      <strong>Magnitude:</strong> ${magnitude}<br>
                      <strong>Time:</strong> ${time}
                    </div>`,
        });

        marker.addListener("click", () => infoWindow.open(mapInstance, marker));
      });
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
    }
  };

  const getColor = (magnitude: number) => {
    return magnitude >= 5 ? "#ff0000" : magnitude >= 3 ? "#ffa500" : "#00ff00";
  };

  return (
    <div className="h-screen w-full"> 
      <div id="map" className="w-full h-[90vh]"></div>
    </div>
  );
}
