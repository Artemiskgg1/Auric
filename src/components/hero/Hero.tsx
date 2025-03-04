"use client";
import React from "react";
import Nav from "./Nav";
import { ImagesSliderDemo } from "./BgImageSlider";

export default function Hero() {
  return (
    <div className="w-full pt-16 relative">
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-gray-900 h-full ">
        <ImagesSliderDemo />
      </div>
    </div>
  );
}
