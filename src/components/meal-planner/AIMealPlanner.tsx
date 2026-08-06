"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  Calendar,
  Trash2,
  AlertCircle,
  RefreshCw,
  ChefHat,
  Clock,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Check,
} from "lucide-react";

interface Meal {
  type: string;
  recipeName: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  instructions: string[];
}

interface MealPlanDay {
  day: number;
  meals: Meal[];
}

export function MealPlanner() {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [] as string[],
    caloriesPerDay: 2000,
    days: 7,
    allergies: [] as string[],
  });

  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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
    setError(null);

    try {
      const response = await fetch("/api/ai/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate meal plan");
      }

      const data = await response.json();

      // Validate the response data
      if (!data.mealPlan || !Array.isArray(data.mealPlan)) {
        throw new Error("Invalid meal plan data received");
      }

      setMealPlan(data.mealPlan);
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
      setMealPlan([]); // Reset meal plan on error
    } finally {
      setLoading(false);
    }
  };

  const clearMealPlan = () => {
    setMealPlan([]);
    setError(null);
    setSelectedDay(null);
  };

  const getMealTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "breakfast":
        return "🌅";
      case "lunch":
        return "🌞";
      case "dinner":
        return "🌙";
      case "snack":
        return "🍎";
      default:
        return "🍽️";
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "lunch":
        return "bg-green-100 text-green-800 border-green-200";
      case "dinner":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "snack":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalCalories = mealPlan.reduce(
    (sum, day) =>
      sum + day.meals.reduce((daySum, meal) => daySum + meal.calories, 0),
    0,
  );

  const averageCalories =
    mealPlan.length > 0 ? Math.round(totalCalories / mealPlan.length) : 0;

  return (
    <div className="space-y-8">
      {/* Preferences Card */}
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
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => toggleDietary(diet)}
                >
                  {preferences.dietaryRestrictions.includes(diet) && (
                    <Check className="h-3 w-3 mr-1" />
                  )}
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
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => toggleAllergy(allergy)}
                >
                  {preferences.allergies.includes(allergy) && (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
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
                  days: parseInt(e.target.value) || 1,
                }))
              }
              min={1}
              max={30}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={generateMealPlan}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
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

          {mealPlan.length > 0 && (
            <Button
              variant="outline"
              onClick={clearMealPlan}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Plan
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">
                Error generating meal plan
              </p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={generateMealPlan}
                className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Try Again
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Meal Plan Summary */}
      {mealPlan.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Meal Plan Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Calendar className="h-6 w-6 text-pink-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{mealPlan.length}</p>
              <p className="text-sm text-gray-600">Days Planned</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Flame className="h-6 w-6 text-orange-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{averageCalories}</p>
              <p className="text-sm text-gray-600">Avg. Daily Cal</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <ChefHat className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{mealPlan.length * 5}</p>
              <p className="text-sm text-gray-600">Total Meals</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold">{mealPlan.length * 7}</p>
              <p className="text-sm text-gray-600">Recipes</p>
            </div>
          </div>
        </Card>
      )}

      {/* Meal Plan Grid */}
      {mealPlan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlan.map((day) => (
            <Card
              key={day.day}
              className={`p-6 transition-all duration-300 hover:shadow-lg ${
                selectedDay === day.day ? "ring-2 ring-pink-500" : ""
              }`}
              onClick={() =>
                setSelectedDay(selectedDay === day.day ? null : day.day)
              }
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                Day {day.day}
              </h3>

              <div className="space-y-4">
                {day.meals.map((meal, idx) => (
                  <div key={idx} className="border-b pb-3 last:border-b-0">
                    <Badge className={`mb-2 ${getMealTypeColor(meal.type)}`}>
                      {getMealTypeIcon(meal.type)} {meal.type}
                    </Badge>
                    <h4 className="font-medium">{meal.recipeName}</h4>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3" /> {meal.calories} cal
                      </span>
                      <span className="flex items-center gap-1">
                        <Beef className="h-3 w-3" /> {meal.protein}g protein
                      </span>
                      <span className="flex items-center gap-1">
                        <Wheat className="h-3 w-3" /> {meal.carbs}g carbs
                      </span>
                      <span className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" /> {meal.fat}g fat
                      </span>
                    </div>

                    {meal.ingredients && meal.ingredients.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {meal.ingredients.slice(0, 3).join(", ")}
                        {meal.ingredients.length > 3 && "..."}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">
                    Total:{" "}
                    {day.meals.reduce((sum, meal) => sum + meal.calories, 0)}{" "}
                    cal
                  </p>
                  <Badge variant="secondary">
                    {Math.round(
                      (day.meals.reduce((sum, meal) => sum + meal.calories, 0) /
                        preferences.caloriesPerDay) *
                        100,
                    )}
                    %
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && mealPlan.length === 0 && !error && (
        <Card className="p-12 text-center">
          <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Meal Plan Yet</h3>
          <p className="text-gray-500 mb-6">
            Set your preferences above and generate a personalized meal plan!
          </p>
        </Card>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import { Sparkles, Loader2, Calendar, Trash2 } from "lucide-react";

// interface MealPlan {
//   day: number;
//   meals: {
//     type: string;
//     recipeName: string;
//     ingredients: string[];
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//     instructions: string[];
//   }[];
// }

// export function MealPlanner() {
//   const [preferences, setPreferences] = useState({
//     dietaryRestrictions: [] as string[],
//     caloriesPerDay: 2000,
//     days: 7,
//     allergies: [] as string[],
//   });

//   const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
//   const [loading, setLoading] = useState(false);

//   const dietaryOptions = [
//     "Vegetarian",
//     "Vegan",
//     "Keto",
//     "Paleo",
//     "Gluten-Free",
//     "Dairy-Free",
//     "Low-Carb",
//     "Mediterranean",
//   ];

//   const allergyOptions = [
//     "Peanuts",
//     "Tree Nuts",
//     "Dairy",
//     "Eggs",
//     "Soy",
//     "Wheat",
//     "Fish",
//     "Shellfish",
//   ];

//   const toggleDietary = (diet: string) => {
//     setPreferences((prev) => ({
//       ...prev,
//       dietaryRestrictions: prev.dietaryRestrictions.includes(diet)
//         ? prev.dietaryRestrictions.filter((d) => d !== diet)
//         : [...prev.dietaryRestrictions, diet],
//     }));
//   };

//   const toggleAllergy = (allergy: string) => {
//     setPreferences((prev) => ({
//       ...prev,
//       allergies: prev.allergies.includes(allergy)
//         ? prev.allergies.filter((a) => a !== allergy)
//         : [...prev.allergies, allergy],
//     }));
//   };

//   const generateMealPlan = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/ai/meal-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(preferences),
//       });
//       const data = await response.json();
//       setMealPlan(data.mealPlan);
//     } catch (error) {
//       console.error("Failed to generate meal plan:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Card className="p-6">
//         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//           <Sparkles className="h-6 w-6 text-pink-500" />
//           AI Meal Planner
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label>Dietary Preferences</Label>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {dietaryOptions.map((diet) => (
//                 <Badge
//                   key={diet}
//                   variant={
//                     preferences.dietaryRestrictions.includes(diet)
//                       ? "default"
//                       : "outline"
//                   }
//                   className="cursor-pointer"
//                   onClick={() => toggleDietary(diet)}
//                 >
//                   {diet}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div>
//             <Label>Allergies</Label>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {allergyOptions.map((allergy) => (
//                 <Badge
//                   key={allergy}
//                   variant={
//                     preferences.allergies.includes(allergy)
//                       ? "destructive"
//                       : "outline"
//                   }
//                   className="cursor-pointer"
//                   onClick={() => toggleAllergy(allergy)}
//                 >
//                   {allergy}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div>
//             <Label>Daily Calories: {preferences.caloriesPerDay}</Label>
//             <Slider
//               value={[preferences.caloriesPerDay]}
//               onValueChange={([value]) =>
//                 setPreferences((prev) => ({ ...prev, caloriesPerDay: value }))
//               }
//               min={1200}
//               max={4000}
//               step={100}
//               className="mt-2"
//             />
//           </div>

//           <div>
//             <Label>Number of Days</Label>
//             <Input
//               type="number"
//               value={preferences.days}
//               onChange={(e) =>
//                 setPreferences((prev) => ({
//                   ...prev,
//                   days: parseInt(e.target.value),
//                 }))
//               }
//               min={1}
//               max={30}
//               className="mt-2"
//             />
//           </div>
//         </div>

//         <Button
//           onClick={generateMealPlan}
//           disabled={loading}
//           className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generating...
//             </>
//           ) : (
//             <>
//               <Sparkles className="mr-2 h-4 w-4" />
//               Generate Meal Plan
//             </>
//           )}
//         </Button>
//       </Card>

//       {mealPlan.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {mealPlan.map((day) => (
//             <Card key={day.day} className="p-6">
//               <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <Calendar className="h-5 w-5 text-pink-500" />
//                 Day {day.day}
//               </h3>
//               <div className="space-y-4">
//                 {day.meals.map((meal, idx) => (
//                   <div key={idx} className="border-b pb-3 last:border-b-0">
//                     <Badge variant="secondary" className="mb-2">
//                       {meal.type}
//                     </Badge>
//                     <h4 className="font-medium">{meal.recipeName}</h4>
//                     <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
//                       <span>🔥 {meal.calories} cal</span>
//                       <span>💪 {meal.protein}g protein</span>
//                       <span>🍞 {meal.carbs}g carbs</span>
//                       <span>🥑 {meal.fat}g fat</span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {meal.ingredients.slice(0, 3).join(", ")}...
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 pt-4 border-t">
//                 <p className="font-semibold">
//                   Total:{" "}
//                   {day.meals.reduce((sum, meal) => sum + meal.calories, 0)} cal
//                 </p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
