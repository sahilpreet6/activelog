import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Workout } from "@/lib/types";

type WorkoutBody = {
  exercise?: string;
  sets?: number;
  reps?: number;
  duration?: number;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 },
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

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
        user_id: user.id,
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

export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 },
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ workouts: (data ?? []) as Workout[] }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch workouts." }, { status: 500 });
  }
}

