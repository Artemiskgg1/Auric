// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useTheme } from "next-themes";

// export default function Predictions() {
//   const [predictions, setPredictions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { theme } = useTheme();

//   const isDarkMode = theme === "dark";

//   useEffect(() => {
//     const fetchPredictions = async () => {
//       try {
//         const res = await fetch("/api/predictions");
//         const data = await res.json();
//         console.log("Fetched predictions:", data);
//         setPredictions(data);
//       } catch (error) {
//         console.error("Error fetching predictions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPredictions();
//   }, []);

//   return (
//     <Card
//       className={`shadow-lg rounded-xl mt-2 p-4 w-full max-w-4xl mx-auto transition-all ${
//         isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       <CardHeader>
//         <CardTitle className="text-xl font-bold">
//           Earthquake Predictions
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(5)].map((_, index) => (
//               <Skeleton key={index} className="h-6 w-full rounded-md" />
//             ))}
//           </div>
//         ) : (
//           <Table className="w-full text-sm">
//             <TableHeader>
//               <TableRow className={isDarkMode ? "bg-gray-800" : "bg-gray-200"}>
//                 {predictions.length > 0 &&
//                   Object.keys(predictions[0]).map((key) => (
//                     <TableHead key={key} className="p-3 font-semibold">
//                       {key}
//                     </TableHead>
//                   ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {predictions.map((row, index) => (
//                 <TableRow
//                   key={index}
//                   className={`transition-all hover:${
//                     isDarkMode ? "bg-gray-800" : "bg-gray-100"
//                   }`}
//                 >
//                   {Object.values(row).map((value, i) => (
//                     <TableCell key={i} className="p-3 border-t">
//                       {value as React.ReactNode}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
