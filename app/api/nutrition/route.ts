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

type MealRow = Record<string, unknown>;

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

    const meals = ((data ?? []) as MealRow[]).map((row) => ({
      id: String(row.id ?? ""),
      user_id: String(row.user_id ?? ""),
      name: String(row.name ?? row.food_name ?? ""),
      calories: Number(row.calories ?? 0),
      protein: Number(row.protein ?? 0),
      carbs: Number(row.carbs ?? 0),
      fat: Number(row.fat ?? row.fats ?? 0),
      created_at: String(row.created_at ?? ""),
    })) as Meal[];

    return NextResponse.json({ meals }, { status: 200 });
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
      const fallback = await supabase.from("meals").insert([
        {
          user_id: user.id,
          food_name: name,
          calories,
          protein,
          carbs,
          fats: fat,
        },
      ]);

      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }

      return NextResponse.json({ message: "Meal logged", data: fallback.data }, { status: 201 });
    }

    return NextResponse.json({ message: "Meal logged", data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
