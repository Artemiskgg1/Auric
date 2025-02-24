"use client";

import { useEffect, useState } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export default function Map() {
  interface EarthquakeFeature {
    geometry: {
      coordinates: [number, number, number];
    };
    properties: {
      mag: number;
      place: string;
    };
  }

  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);

  useEffect(() => {
    async function fetchEarthquakeData() {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
        );
        const data = await response.json();
        setEarthquakes(data.features);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    }

    fetchEarthquakeData();
    const interval = setInterval(fetchEarthquakeData, 80000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [0, 20],
      zoom: 2.5,
      accessToken: mapboxToken,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      mapboxgl: mapboxgl as unknown as typeof mapboxgl,
      marker: false,
    });

    map.addControl(geocoder, "top-right");

    map.on("load", () => {
      earthquakes.forEach((quake) => {
        const { coordinates } = quake.geometry;
        const magnitude = quake.properties.mag;
        const color =
          magnitude < 1
            ? "blue"
            : magnitude < 3
            ? "green"
            : magnitude < 5
            ? "yellow"
            : "red";

        new mapboxgl.Marker({ color })
          .setLngLat([coordinates[0], coordinates[1]])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<strong>Magnitude:</strong> ${magnitude}<br/><strong>Location:</strong> ${quake.properties.place}`
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [earthquakes]);

  return (
    <div
      id="map"
      style={{ width: "50vw", height: "65vh", borderRadius: "10px" }}
    ></div>
  );
}
