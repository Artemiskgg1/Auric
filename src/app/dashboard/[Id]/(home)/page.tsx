import React from "react";
import EarthquakeMap from "@/components/Map";
import Legend from "../../_components/Legend";
// import Predictions from "../../_components/Predictions";

const page = () => {
  return (
    <div>
      <div>
        <EarthquakeMap />
        <Legend />
      </div>
    </div>
  );
};

export default page;
