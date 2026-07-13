"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Calendar, Trash2 } from "lucide-react";

interface MealPlan {
  day: number;
  meals: {
    type: string;
    recipeName: string;
    ingredients: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    instructions: string[];
  }[];
}

export function MealPlanner() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [] as string[],
    caloriesPerDay: 2000,
    days: 7,
    allergies: [] as string[],
  });

  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Mediterranean",
  ];

  const allergyOptions = [
    "Peanuts",
    "Tree Nuts",
    "Dairy",
    "Eggs",
    "Soy",
    "Wheat",
    "Fish",
    "Shellfish",
  ];

  const toggleDietary = (diet: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(diet)
        ? prev.dietaryRestrictions.filter((d) => d !== diet)
        : [...prev.dietaryRestrictions, diet],
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setPreferences((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const generateMealPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });
      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-pink-500" />
          AI Meal Planner
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Dietary Preferences</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {dietaryOptions.map((diet) => (
                <Badge
                  key={diet}
                  variant={
                    preferences.dietaryRestrictions.includes(diet)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleDietary(diet)}
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Allergies</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {allergyOptions.map((allergy) => (
                <Badge
                  key={allergy}
                  variant={
                    preferences.allergies.includes(allergy)
                      ? "destructive"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleAllergy(allergy)}
                >
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Daily Calories: {preferences.caloriesPerDay}</Label>
            <Slider
              value={[preferences.caloriesPerDay]}
              onValueChange={([value]) =>
                setPreferences((prev) => ({ ...prev, caloriesPerDay: value }))
              }
              min={1200}
              max={4000}
              step={100}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Number of Days</Label>
            <Input
              type="number"
              value={preferences.days}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  days: parseInt(e.target.value),
                }))
              }
              min={1}
              max={30}
              className="mt-2"
            />
          </div>
        </div>

        <Button
          onClick={generateMealPlan}
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Meal Plan
            </>
          )}
        </Button>
      </Card>

      {mealPlan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlan.map((day) => (
            <Card key={day.day} className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                Day {day.day}
              </h3>
              <div className="space-y-4">
                {day.meals.map((meal, idx) => (
                  <div key={idx} className="border-b pb-3 last:border-b-0">
                    <Badge variant="secondary" className="mb-2">
                      {meal.type}
                    </Badge>
                    <h4 className="font-medium">{meal.recipeName}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <span>🔥 {meal.calories} cal</span>
                      <span>💪 {meal.protein}g protein</span>
                      <span>🍞 {meal.carbs}g carbs</span>
                      <span>🥑 {meal.fat}g fat</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {meal.ingredients.slice(0, 3).join(", ")}...
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-semibold">
                  Total:{" "}
                  {day.meals.reduce((sum, meal) => sum + meal.calories, 0)} cal
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
