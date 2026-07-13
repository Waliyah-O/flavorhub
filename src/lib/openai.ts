import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMealPlan(preferences: {
  dietaryRestrictions: string[];
  caloriesPerDay: number;
  days: number;
  allergies: string[];
}) {
  const prompt = `Create a ${preferences.days}-day meal plan with the following requirements:
- Dietary restrictions: ${preferences.dietaryRestrictions.join(", ") || "none"}
- Daily calories: ${preferences.caloriesPerDay}
- Allergies: ${preferences.allergies.join(", ") || "none"}
- Include 3 meals and 2 snacks per day
- Provide nutritional information for each meal

Return as JSON array with structure:
[{
  day: number,
  meals: [{
    type: "breakfast" | "lunch" | "dinner" | "snack",
    recipeName: string,
    ingredients: string[],
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    instructions: string[]
  }]
}]`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function generateRecipeFromIngredients(ingredients: string[]) {
  const prompt = `Create a recipe using these ingredients: ${ingredients.join(", ")}.
Include nutritional information and step-by-step instructions.

Return as JSON:
{
  title: string,
  prepTime: number,
  cookTime: number,
  servings: number,
  difficulty: string,
  ingredients: [{name: string, amount: number, unit: string}],
  instructions: string[],
  nutritionalInfo: {
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    fiber: number
  }
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function generateShoppingList(recipes: any[]) {
  const prompt = `Create a consolidated shopping list from these recipes:
${JSON.stringify(recipes, null, 2)}

Group items by category (produce, dairy, meat, pantry, etc).
Return as JSON:
{
  categories: [{
    name: string,
    items: [{
      name: string,
      quantity: number,
      unit: string
    }]
  }]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
