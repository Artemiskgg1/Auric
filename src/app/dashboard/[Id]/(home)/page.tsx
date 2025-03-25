import React from "react";
import EarthquakeMap from "@/components/Map";
import Legend from "../../_components/Legend";

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
