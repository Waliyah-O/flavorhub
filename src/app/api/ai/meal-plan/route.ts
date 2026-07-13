import { NextResponse } from "next/server";
import { generateMealPlan } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const preferences = await request.json();
    const mealPlan = await generateMealPlan(preferences);
    return NextResponse.json({ mealPlan });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate meal plan" },
      { status: 500 },
    );
  }
}
