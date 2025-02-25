"use client";
import React from "react";
import Nav from "./Nav";

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

        <p className="max-w-2xl text-lg md:text-xl mb-6 text-gray-700">
          {
            "Your ultimate anime watchlist! Keep track of all the shows you've watched and explore your anime journey with a cute and immersive Japanese vibe! Join our community and keep your anime memories alive."
          }
        </p>
      </div>
    </div>
  );
}
