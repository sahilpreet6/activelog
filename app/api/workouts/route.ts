import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Workout } from "@/lib/types";

type WorkoutBody = {
  exercise?: string;
  sets?: number;
  reps?: number;
  duration?: number;
};

type WorkoutRow = Record<string, unknown>;

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
      const fallback = await supabase.from("workouts").insert([
        {
          user_id: user.id,
          exercise_name: exercise,
          sets,
          reps,
          duration,
        },
      ]);

      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }

      return NextResponse.json({ message: "Workout created", data: fallback.data }, { status: 201 });
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

    const workouts = ((data ?? []) as WorkoutRow[]).map((row) => ({
      id: String(row.id ?? ""),
      user_id: String(row.user_id ?? ""),
      exercise: String(row.exercise ?? row.exercise_name ?? ""),
      sets: Number(row.sets ?? 0),
      reps: Number(row.reps ?? 0),
      duration: Number(row.duration ?? 0),
      date: String(row.date ?? row.created_at ?? ""),
      created_at: String(row.created_at ?? ""),
    })) as Workout[];

    return NextResponse.json({ workouts }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch workouts." }, { status: 500 });
  }
}

