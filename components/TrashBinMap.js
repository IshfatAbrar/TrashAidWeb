"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const TrashBinMap = () => {
  const mapRef = useRef(null);

  // Sample trash bin locations - replace with your actual data
  const trashBinLocations = [
    { lat: 28.0587, lng: -82.4139, title: "USF Main Campus Bin" }, // USF location
    { lat: 28.0551, lng: -82.4143, title: "Library Recycling Station" },
    { lat: 28.0622, lng: -82.4127, title: "Student Center Bin" },
  ];

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      try {
        const google = await loader.load();
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 28.0587, lng: -82.4139 }, // Centered at USF
          zoom: 15,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "on" }],
            },
          ],
        });

        // Create SVG marker icon using FontAwesome trash icon
        const markerSvg = {
          path: "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z",
          fillColor: "oklch(72.3% 0.219 149.579)",
          fillOpacity: 1,
          strokeWeight: 0,
          rotation: 0,
          scale: 0.05,
          anchor: new google.maps.Point(224, 256),
        };

        // Add markers for each trash bin location
        trashBinLocations.forEach((location) => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
            icon: markerSvg,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <strong>${location.title}</strong>
                <p style="margin-top: 4px; font-size: 12px;">Click for directions</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-red-50 flex items-center justify-center">
        <div className="text-red-600 text-center p-4">
          <p className="font-semibold">Google Maps API key is missing</p>
          <p className="text-sm mt-2">
            Please check your configuration and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default TrashBinMap;
