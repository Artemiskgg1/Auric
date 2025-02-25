"use client";
import React from "react";
import Nav from "./Nav";
import DottedMap from "./DottedMap";

export default function Hero() {
  return (
    <div className="w-full pt-16 relative">
      <div className="relative m-8 md:m-20 z-10 flex flex-col items-center justify-center text-center text-gray-900 h-full px-4">
        <h1 className="text-3xl md:text-7xl font-bold mb-4 font-quichesans">
          Visualize the disasters in{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 text-transparent bg-clip-text">
            Real Time
          </span>
        </h1>

        <p className="max-w-2xl text-sm md:text-lg mb-2 text-gray-700">
          {
            "Empowering Disaster Response with AI-Powered Insights. Stay ahead of emergencies with real-time predictions, risk analysis, and intelligent response strategies."
          }
        </p>
        <DottedMap />
      </div>
    </div>
  );
}
