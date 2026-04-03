import { NextResponse } from "next/server";
import type { Exercise } from "@/lib/types";

const EXERCISE_DB_BASE_URL = "https://exercisedb.p.rapidapi.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json({ exercises: [] }, { status: 200 });
  }

  const apiKey = process.env.EXERCISEDB_API_KEY;
  const apiHost = process.env.EXERCISEDB_API_HOST ?? "exercisedb.p.rapidapi.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing EXERCISEDB_API_KEY in environment variables." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${EXERCISE_DB_BASE_URL}/exercises/name/${encodeURIComponent(query)}?limit=10`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Exercise API request failed." }, { status: 502 });
    }

    const data = (await response.json()) as Exercise[];

    return NextResponse.json({ exercises: data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to search exercises." }, { status: 500 });
  }
}