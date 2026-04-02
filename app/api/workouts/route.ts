import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type WorkoutBody = {
  exercise?: string;
  sets?: number;
  reps?: number;
  duration?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WorkoutBody;
    const { exercise, sets, reps, duration } = body;

    if (!exercise || !sets || !reps || !duration) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.from("workouts").insert([
      {
        exercise,
        sets,
        reps,
        duration,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Workout created", data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
