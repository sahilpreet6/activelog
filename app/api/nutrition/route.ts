import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Meal } from "@/lib/types";

type MealBody = {
  name?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
};

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
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ meals: (data ?? []) as Meal[] }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch meals." }, { status: 500 });
  }
}

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

    const body = (await request.json()) as MealBody;
    const { name, calories, protein, carbs, fat } = body;

    if (!name || calories === undefined || protein === undefined || carbs === undefined || fat === undefined) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { data, error } = await supabase.from("meals").insert([
      {
        user_id: user.id,
        name,
        calories,
        protein,
        carbs,
        fat,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Meal logged", data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
