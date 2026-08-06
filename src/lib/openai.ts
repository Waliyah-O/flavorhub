import OpenAI from "openai";

// Initialize OpenAI client with error handling
const getOpenAIClient = (): OpenAI | null => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ OPENAI_API_KEY not found in environment variables");
    console.warn("   Add it to .env.local: OPENAI_API_KEY=sk-your-key-here");
    return null;
  }

  if (!apiKey.startsWith("sk-")) {
    console.warn(
      '⚠️ OPENAI_API_KEY appears to be invalid (should start with "sk-")',
    );
    return null;
  }

  return new OpenAI({ apiKey });
};

export async function generateMealPlan(preferences: {
  dietaryRestrictions: string[];
  caloriesPerDay: number;
  days: number;
  allergies: string[];
}) {
  const openai = getOpenAIClient();

  if (!openai) {
    console.log(
      "📝 Using sample meal plan generator (no OpenAI key configured)",
    );
    return null; // Will trigger fallback in API route
  }

  try {
    const prompt = `Create a ${preferences.days}-day meal plan with:
- Dietary restrictions: ${preferences.dietaryRestrictions.join(", ") || "none"}
- Daily calories: ${preferences.caloriesPerDay}
- Allergies: ${preferences.allergies.join(", ") || "none"}
- Include 3 meals and 2 snacks per day

Return ONLY a JSON object with this exact structure:
{
  "mealPlan": [
    {
      "day": 1,
      "meals": [
        {
          "type": "breakfast",
          "recipeName": "string",
          "ingredients": ["string"],
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "instructions": ["string"]
        }
      ]
    }
  ]
}`;

    console.log("🤖 Generating meal plan with OpenAI...");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cheaper than GPT-4
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    // Parse the response
    const parsed = JSON.parse(content);

    console.log("✅ Meal plan generated successfully");
    console.log("   Tokens used:", response.usage?.total_tokens);

    return parsed.mealPlan;
  } catch (error: any) {
    console.error("❌ OpenAI error:", error.message);

    // Handle specific errors
    if (error.message.includes("quota")) {
      console.log(
        "💡 You may have exceeded your rate limit. Check: https://platform.openai.com/usage",
      );
    } else if (error.message.includes("billing")) {
      console.log(
        "💡 Check your billing settings: https://platform.openai.com/account/billing",
      );
    }

    // Return null to trigger fallback
    return null;
  }
}

// import OpenAI from "openai";

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// const getOpenAIClient = () => {
//   if (!process.env.OPENAI_API_KEY) {
//     console.warn("OpenAI API key not found. Using sample data instead.");
//     return null;
//   }
//   return new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// };

// export async function generateMealPlan(preferences: {
//   dietaryRestrictions: string[];
//   caloriesPerDay: number;
//   days: number;
//   allergies: string[];
// }) {
//   const openai = getOpenAIClient();

//   // If no OpenAI client, return null (API route will use sample data)
//   if (!openai) {
//     return null;
//   }
//   const prompt = `Create a ${preferences.days}-day meal plan with the following requirements:
// - Dietary restrictions: ${preferences.dietaryRestrictions.join(", ") || "none"}
// - Daily calories: ${preferences.caloriesPerDay}
// - Allergies: ${preferences.allergies.join(", ") || "none"}
// - Include 3 meals and 2 snacks per day
// - Provide nutritional information for each meal

// Return as JSON array with structure:
// [{
//   day: number,
//   meals: [{
//     type: "breakfast" | "lunch" | "dinner" | "snack",
//     recipeName: string,
//     ingredients: string[],
//     calories: number,
//     protein: number,
//     carbs: number,
//     fat: number,
//     instructions: string[]
//   }]
// }]`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: prompt }],
//     response_format: { type: "json_object" },
//   });

//   return JSON.parse(response.choices[0].message.content || "{}");
// }

// export async function generateRecipeFromIngredients(ingredients: string[]) {
//   const prompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.
// Include nutritional information and step-by-step instructions.

// Return as JSON:
// {
//   title: string,
//   prepTime: number,
//   cookTime: number,
//   servings: number,
//   difficulty: string,
//   ingredients: [{name: string, amount: number, unit: string}],
//   instructions: string[],
//   nutritionalInfo: {
//     calories: number,
//     protein: number,
//     carbs: number,
//     fat: number,
//     fiber: number
//   }
// }`;

//   const openai = getOpenAIClient();

//   const response = await openai?.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: prompt }],
//     response_format: { type: "json_object" },
//   });

//   return JSON.parse(response?.choices[0].message.content || "{}");
// }

// export async function generateShoppingList(recipes: any[]) {
//   const prompt = `Create a consolidated shopping list from these recipes:
// ${JSON.stringify(recipes, null, 2)}

// Group items by category (produce, dairy, meat, pantry, etc).
// Return as JSON:
// {
//   categories: [{
//     name: string,
//     items: [{
//       name: string,
//       quantity: number,
//       unit: string
//     }]
//   }]
// }`;

//   const openai = getOpenAIClient();

//   const response = await openai?.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: prompt }],
//     response_format: { type: "json_object" },
//   });

//   return JSON.parse(response?.choices[0].message.content || "{}");
// }

/*****************/

// import OpenAI from 'openai';

// // Only initialize if API key is available
// const getOpenAIClient = () => {
//   if (!process.env.OPENAI_API_KEY) {
//     console.warn('OpenAI API key not found. Using sample data instead.');
//     return null;
//   }
//   return new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// };

// export async function generateMealPlan(preferences: {
//   dietaryRestrictions: string[];
//   caloriesPerDay: number;
//   days: number;
//   allergies: string[];
// }) {
//   const openai = getOpenAIClient();

//   // If no OpenAI client, return null (API route will use sample data)
//   if (!openai) {
//     return null;
//   }

//   const prompt = `Create a ${preferences.days}-day meal plan with the following requirements:
// - Dietary restrictions: ${preferences.dietaryRestrictions.join(', ') || 'none'}
// - Daily calories: ${preferences.caloriesPerDay}
// - Allergies: ${preferences.allergies.join(', ') || 'none'}
// - Include 3 meals and 2 snacks per day
// - Provide nutritional information for each meal

// Return as JSON array with structure:
// [{
//   day: number,
//   meals: [{
//     type: "breakfast" | "lunch" | "dinner" | "snack",
//     recipeName: string,
//     ingredients: string[],
//     calories: number,
//     protein: number,
//     carbs: number,
//     fat: number,
//     instructions: string[]
//   }]
// }]`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo", // Use gpt-3.5-turbo for lower cost
//     messages: [{ role: "user", content: prompt }],
//     response_format: { type: "json_object" },
//   });

//   const content = response.choices[0].message.content;
//   const parsed = JSON.parse(content || '{}');
//   return parsed.mealPlan || parsed;
// }
