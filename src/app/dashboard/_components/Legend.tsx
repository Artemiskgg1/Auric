"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const getColor = (magnitude: number) => {
  return magnitude >= 5 ? "#ff0000" : magnitude >= 3 ? "#ffa500" : "#00ff00";
};

export default function Legend() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center mt-4">
      <Table className="ml-1 w-[25rem] md:w-full border border-gray-400 text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Magnitude</TableCell>
            {[
              { label: "< 3", magnitude: 2 },
              { label: "3 - 5", magnitude: 4 },
              { label: "≥ 5", magnitude: 6 },
            ].map(({ label }) => (
              <TableCell key={label} className="px-4 py-2 text-center">
                {label}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Color</TableCell>
            {[
              { label: "< 3", magnitude: 2 },
              { label: "3 - 5", magnitude: 4 },
              { label: "≥ 5", magnitude: 6 },
            ].map(({ magnitude }) => (
              <TableCell key={magnitude} className="px-4 py-2 text-center">
                <div
                  className="w-4 h-4 rounded-full inline-block"
                  style={{
                    backgroundColor: getColor(magnitude),
                    opacity: isVisible ? 0.6 : 0.2,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                ></div>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
