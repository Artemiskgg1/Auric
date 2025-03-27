import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import csvParser from "csv-parser";

const BUCKET_NAME = "cloud-ai-platform-49f1a01b-5ba8-4d3b-947b-c5ca82ea0bc3";
const FILE_PATH =
  "prediction-usgs_earthquakes-2025_03_25T06_28_43_123Z/prediction.results-00000-of-00001.csv";

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Set in .env
});

export async function GET() {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(FILE_PATH);
    const stream = file.createReadStream();

    return new Promise((resolve, reject) => {
      const results: any[] = [];

      stream
        .pipe(csvParser())
        .on("data", (data: any) => results.push(data))
        .on("end", () => resolve(NextResponse.json(results)))
        .on("error", (error: any) => reject(NextResponse.json({ error })));
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
