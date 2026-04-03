import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Goal } from "@/lib/types";

type GoalBody = {
  title?: string;
  target_value?: number;
  current_value?: number;
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
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ goals: (data ?? []) as Goal[] }, { status: 200 });
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Goal created", data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 500 });
  }
}
