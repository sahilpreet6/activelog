import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Goal } from "@/lib/types";

type GoalBody = {
  title?: string;
  target_value?: number;
  current_value?: number;
};

type GoalRow = Record<string, unknown>;

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
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const goals = ((data ?? []) as GoalRow[]).map((row) => ({
      id: String(row.id ?? ""),
      user_id: String(row.user_id ?? ""),
      title: String(row.title ?? row.goal_name ?? ""),
      target_value: Number(row.target_value ?? 0),
      current_value: Number(row.current_value ?? 0),
      created_at: String(row.created_at ?? ""),
    })) as Goal[];

    return NextResponse.json({ goals }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch goals." }, { status: 500 });
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

    const body = (await request.json()) as GoalBody;
    const { title, target_value, current_value } = body;

    if (!title || target_value === undefined || current_value === undefined) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { data, error } = await supabase.from("goals").insert([
      {
        user_id: user.id,
        title,
        target_value,
        current_value,
      },
    ]);

    if (error) {
      const fallback = await supabase.from("goals").insert([
        {
          user_id: user.id,
          goal_name: title,
          target_value,
          current_value,
          goal_type: "general",
        },
      ]);

      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 500 });
      }

      return NextResponse.json({ message: "Goal created", data: fallback.data }, { status: 201 });
    }

    return NextResponse.json({ message: "Goal created", data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
