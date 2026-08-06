import { generateMealPlan } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const preferences = await request.json();

    // Try OpenAI first, fall back to sample data
    let mealPlan = await generateMealPlan(preferences);

    if (!mealPlan) {
      // Fallback to sample data if OpenAI is not available
      mealPlan = generateSampleMealPlan(preferences);
    }

    return NextResponse.json({ mealPlan });
  } catch (error) {
    console.error("Meal plan generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate meal plan" },
      { status: 500 },
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const preferences = await request.json();

//     // Validate input
//     if (!preferences || typeof preferences !== "object") {
//       return NextResponse.json(
//         { error: "Invalid preferences data" },
//         { status: 400 },
//       );
//     }

//     // For now, generate a sample meal plan since OpenAI API might not be configured
//     // Replace this with actual OpenAI call when you have the API key
//     const mealPlan = generateSampleMealPlan(preferences);

//     return NextResponse.json({ mealPlan });
//   } catch (error) {
//     console.error("Meal plan generation error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to generate meal plan",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     );
//   }
// }

// Temporary function to generate sample meal plan
function generateSampleMealPlan(preferences: any) {
  const {
    days = 7,
    dietaryRestrictions = [],
    caloriesPerDay = 2000,
  } = preferences;

  const mealDatabase = {
    breakfast: [
      {
        name: "Overnight Oats with Berries",
        calories: 350,
        protein: 12,
        carbs: 55,
        fat: 10,
        ingredients: [
          "oats",
          "almond milk",
          "mixed berries",
          "honey",
          "chia seeds",
        ],
      },
      {
        name: "Avocado Toast with Eggs",
        calories: 400,
        protein: 18,
        carbs: 35,
        fat: 22,
        ingredients: [
          "whole grain bread",
          "avocado",
          "eggs",
          "cherry tomatoes",
          "red pepper flakes",
        ],
      },
      {
        name: "Greek Yogurt Parfait",
        calories: 300,
        protein: 20,
        carbs: 40,
        fat: 8,
        ingredients: [
          "Greek yogurt",
          "granola",
          "honey",
          "mixed nuts",
          "fresh fruit",
        ],
      },
      {
        name: "Protein Smoothie Bowl",
        calories: 380,
        protein: 25,
        carbs: 48,
        fat: 8,
        ingredients: [
          "banana",
          "protein powder",
          "almond milk",
          "berries",
          "granola",
        ],
      },
      {
        name: "Veggie Scramble",
        calories: 320,
        protein: 22,
        carbs: 15,
        fat: 18,
        ingredients: ["eggs", "spinach", "bell peppers", "onions", "cheese"],
      },
    ],
    lunch: [
      {
        name: "Mediterranean Quinoa Bowl",
        calories: 450,
        protein: 18,
        carbs: 55,
        fat: 20,
        ingredients: [
          "quinoa",
          "chickpeas",
          "cucumber",
          "tomatoes",
          "feta cheese",
          "olive oil",
        ],
      },
      {
        name: "Grilled Chicken Caesar Wrap",
        calories: 480,
        protein: 35,
        carbs: 40,
        fat: 22,
        ingredients: [
          "chicken breast",
          "romaine lettuce",
          "caesar dressing",
          "tortilla",
          "parmesan",
        ],
      },
      {
        name: "Buddha Bowl",
        calories: 420,
        protein: 15,
        carbs: 50,
        fat: 18,
        ingredients: [
          "brown rice",
          "tofu",
          "avocado",
          "sweet potato",
          "tahini",
        ],
      },
      {
        name: "Tuna Salad Sandwich",
        calories: 400,
        protein: 30,
        carbs: 35,
        fat: 15,
        ingredients: [
          "tuna",
          "whole grain bread",
          "Greek yogurt",
          "celery",
          "lettuce",
        ],
      },
      {
        name: "Lentil Soup",
        calories: 350,
        protein: 18,
        carbs: 45,
        fat: 8,
        ingredients: [
          "lentils",
          "carrots",
          "celery",
          "onions",
          "vegetable broth",
        ],
      },
    ],
    dinner: [
      {
        name: "Grilled Salmon with Vegetables",
        calories: 520,
        protein: 40,
        carbs: 25,
        fat: 28,
        ingredients: [
          "salmon fillet",
          "asparagus",
          "lemon",
          "olive oil",
          "garlic",
        ],
      },
      {
        name: "Chicken Stir Fry",
        calories: 450,
        protein: 35,
        carbs: 35,
        fat: 15,
        ingredients: [
          "chicken breast",
          "broccoli",
          "bell peppers",
          "soy sauce",
          "ginger",
        ],
      },
      {
        name: "Vegetable Pasta",
        calories: 480,
        protein: 15,
        carbs: 65,
        fat: 18,
        ingredients: [
          "whole wheat pasta",
          "tomato sauce",
          "zucchini",
          "mushrooms",
          "parmesan",
        ],
      },
      {
        name: "Turkey Meatballs",
        calories: 420,
        protein: 32,
        carbs: 30,
        fat: 18,
        ingredients: [
          "ground turkey",
          "breadcrumbs",
          "egg",
          "marinara sauce",
          "herbs",
        ],
      },
      {
        name: "Black Bean Tacos",
        calories: 400,
        protein: 18,
        carbs: 50,
        fat: 15,
        ingredients: [
          "black beans",
          "corn tortillas",
          "avocado",
          "salsa",
          "lime",
        ],
      },
    ],
    snack: [
      {
        name: "Apple with Almond Butter",
        calories: 200,
        protein: 7,
        carbs: 25,
        fat: 10,
        ingredients: ["apple", "almond butter"],
      },
      {
        name: "Greek Yogurt with Honey",
        calories: 150,
        protein: 15,
        carbs: 15,
        fat: 4,
        ingredients: ["Greek yogurt", "honey"],
      },
      {
        name: "Trail Mix",
        calories: 180,
        protein: 6,
        carbs: 20,
        fat: 10,
        ingredients: [
          "almonds",
          "walnuts",
          "dried cranberries",
          "dark chocolate chips",
        ],
      },
      {
        name: "Hummus and Vegetables",
        calories: 160,
        protein: 6,
        carbs: 18,
        fat: 8,
        ingredients: ["hummus", "carrot sticks", "cucumber", "bell peppers"],
      },
      {
        name: "Protein Bar",
        calories: 200,
        protein: 20,
        carbs: 22,
        fat: 6,
        ingredients: ["protein bar"],
      },
    ],
  };

  const mealPlan = [];

  for (let day = 1; day <= days; day++) {
    const targetCaloriesPerMeal = Math.floor(caloriesPerDay / 4); // 3 meals + snacks

    const breakfast =
      mealDatabase.breakfast[
        Math.floor(Math.random() * mealDatabase.breakfast.length)
      ];
    const lunch =
      mealDatabase.lunch[Math.floor(Math.random() * mealDatabase.lunch.length)];
    const dinner =
      mealDatabase.dinner[
        Math.floor(Math.random() * mealDatabase.dinner.length)
      ];
    const snack1 =
      mealDatabase.snack[Math.floor(Math.random() * mealDatabase.snack.length)];
    const snack2 =
      mealDatabase.snack[Math.floor(Math.random() * mealDatabase.snack.length)];

    mealPlan.push({
      day,
      meals: [
        {
          type: "breakfast",
          ...breakfast,
          instructions: [
            "Prepare ingredients",
            "Follow standard cooking method",
            "Serve and enjoy",
          ],
        },
        {
          type: "lunch",
          ...lunch,
          instructions: [
            "Prepare ingredients",
            "Follow standard cooking method",
            "Serve and enjoy",
          ],
        },
        {
          type: "snack",
          ...snack1,
          instructions: ["Combine ingredients", "Serve immediately"],
        },
        {
          type: "dinner",
          ...dinner,
          instructions: [
            "Prepare ingredients",
            "Follow standard cooking method",
            "Serve and enjoy",
          ],
        },
        {
          type: "snack",
          ...snack2,
          instructions: ["Combine ingredients", "Serve immediately"],
        },
      ],
    });
  }

  return mealPlan;
}

// import { NextResponse } from "next/server";
// import { generateMealPlan } from "@/lib/openai";

// export async function POST(request: Request) {
//   try {
//     const preferences = await request.json();
//     const mealPlan = await generateMealPlan(preferences);
//     return NextResponse.json({ mealPlan });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to generate meal plan" },
//       { status: 500 },
//     );
//   }
// }
