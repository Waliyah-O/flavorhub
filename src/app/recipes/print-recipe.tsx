"use client";

import Image from "next/image";
import {
  Clock,
  Users,
  ChefHat,
  Flame,
  Scale,
  Thermometer,
  Beef,
  Wheat,
  Droplets,
  Leaf,
} from "lucide-react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

interface Instruction {
  step: number;
  description: string;
  duration?: number;
  temperature?: number;
  tip?: string;
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
  saturatedFat: number;
  vitamins: Array<{ name: string; amount: string; unit: string }>;
  minerals: Array<{ name: string; amount: string; unit: string }>;
}

interface PrintRecipeProps {
  recipe: {
    title: string;
    description: string;
    imageUrl: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    author: {
      name: string;
    };
    rating: number;
    reviewCount: number;
    ingredients: Ingredient[];
    instructions: Instruction[];
    nutritionalInfo: NutritionalInfo;
    tags: Array<{ name: string }>;
    tips: string[];
  };
  servings: number;
}

export function PrintRecipe({ recipe, servings }: PrintRecipeProps) {
  const calculateAmount = (
    originalAmount: number,
    originalServings: number,
  ) => {
    if (typeof originalAmount !== "number") return originalAmount;
    return (originalAmount * servings) / originalServings;
  };

  const formatAmount = (amount: number) => {
    if (amount === 0) return "0";
    if (amount < 0.125) return amount.toFixed(3);
    if (amount < 1) {
      const fractions: Record<number, string> = {
        0.25: "¼",
        0.33: "⅓",
        0.5: "½",
        0.67: "⅔",
        0.75: "¾",
      };
      return fractions[amount] || amount.toFixed(2);
    }
    return amount % 1 === 0 ? amount.toString() : amount.toFixed(1);
  };

  return (
    <div className="print-recipe" style={{ display: "none" }}>
      {/* Recipe Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{ fontSize: "32pt", marginBottom: "10px", color: "#1a1a1a" }}
        >
          {recipe.title}
        </h1>
        <p style={{ fontSize: "12pt", color: "#666", marginBottom: "20px" }}>
          By {recipe.author.name} | {recipe.cuisine} Cuisine | ⭐{" "}
          {recipe.rating} ({recipe.reviewCount} reviews)
        </p>

        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          width={800}
          height={400}
          style={{ borderRadius: "12px", marginBottom: "20px" }}
        />
      </div>

      {/* Meta Information */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt" }}>
            {recipe.prepTime + recipe.cookTime} min
          </div>
          <div style={{ color: "#666", fontSize: "10pt" }}>Total Time</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt" }}>{servings}</div>
          <div style={{ color: "#666", fontSize: "10pt" }}>Servings</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt" }}>
            {recipe.difficulty}
          </div>
          <div style={{ color: "#666", fontSize: "10pt" }}>Difficulty</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt" }}>
            {recipe.nutritionalInfo.calories}
          </div>
          <div style={{ color: "#666", fontSize: "10pt" }}>
            Calories/serving
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "11pt",
          lineHeight: "1.6",
          color: "#444",
          marginBottom: "30px",
        }}
      >
        {recipe.description}
      </p>

      {/* Ingredients */}
      <h2
        style={{
          fontSize: "18pt",
          borderBottom: "2px solid #e5e5e5",
          paddingBottom: "10px",
          marginBottom: "15px",
          color: "#333",
        }}
      >
        Ingredients
      </h2>
      <ul
        style={{
          columns: "2",
          columnGap: "40px",
          listStyle: "none",
          padding: "0",
          marginBottom: "30px",
        }}
      >
        {recipe.ingredients.map((ingredient, index) => {
          const amount = calculateAmount(ingredient.amount, 4); // Assuming 4 is default servings
          return (
            <li
              key={index}
              style={{
                breakInside: "avoid",
                padding: "4px 0",
                borderBottom: "1px dotted #e5e5e5",
                fontSize: "11pt",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {formatAmount(amount)} {ingredient.unit}
              </span>{" "}
              {ingredient.name}
              {ingredient.notes && (
                <span style={{ color: "#666", fontSize: "9pt" }}>
                  {" "}
                  ({ingredient.notes})
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Instructions */}
      <div className="page-break">
        <h2
          style={{
            fontSize: "18pt",
            borderBottom: "2px solid #e5e5e5",
            paddingBottom: "10px",
            marginBottom: "15px",
            marginTop: "30px",
            color: "#333",
          }}
        >
          Instructions
        </h2>
        <ol
          style={{
            listStyle: "none",
            padding: "0",
            counterReset: "step-counter",
          }}
        >
          {recipe.instructions.map((instruction) => (
            <li
              key={instruction.step}
              style={{
                breakInside: "avoid",
                marginBottom: "20px",
                paddingLeft: "40px",
                position: "relative",
                counterIncrement: "step-counter",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "28px",
                  height: "28px",
                  background: "#ec4899",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "12pt",
                }}
              >
                {instruction.step}
              </div>
              <p
                style={{
                  fontSize: "11pt",
                  lineHeight: "1.6",
                  margin: "0 0 5px 0",
                }}
              >
                {instruction.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  fontSize: "9pt",
                  color: "#666",
                }}
              >
                {instruction.duration && (
                  <span>⏱ {instruction.duration} min</span>
                )}
                {instruction.temperature && (
                  <span>🌡 {instruction.temperature}°F</span>
                )}
              </div>
              {instruction.tip && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "8px",
                    background: "#eff6ff",
                    borderRadius: "4px",
                    fontSize: "9pt",
                    color: "#1e40af",
                  }}
                >
                  💡 <strong>Tip:</strong> {instruction.tip}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Nutrition Information */}
      <div className="page-break">
        <h2
          style={{
            fontSize: "18pt",
            borderBottom: "2px solid #e5e5e5",
            paddingBottom: "10px",
            marginBottom: "15px",
            color: "#333",
          }}
        >
          Nutritional Information
        </h2>
        <p style={{ fontSize: "10pt", color: "#666", marginBottom: "15px" }}>
          Per serving
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "#fef2f2",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#ef4444" }}
            >
              {recipe.nutritionalInfo.calories}
            </div>
            <div style={{ fontSize: "9pt", color: "#666" }}>Calories</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "#eff6ff",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#3b82f6" }}
            >
              {recipe.nutritionalInfo.protein}g
            </div>
            <div style={{ fontSize: "9pt", color: "#666" }}>Protein</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "#fefce8",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#eab308" }}
            >
              {recipe.nutritionalInfo.carbs}g
            </div>
            <div style={{ fontSize: "9pt", color: "#666" }}>Carbs</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "#f0fdf4",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ fontSize: "16pt", fontWeight: "bold", color: "#22c55e" }}
            >
              {recipe.nutritionalInfo.fat}g
            </div>
            <div style={{ fontSize: "9pt", color: "#666" }}>Fat</div>
          </div>
        </div>

        {/* Detailed Nutrition */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "10pt",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e5e5" }}>
              <th style={{ textAlign: "left", padding: "5px" }}>Nutrient</th>
              <th style={{ textAlign: "right", padding: "5px" }}>Amount</th>
              <th style={{ textAlign: "right", padding: "5px" }}>
                % Daily Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Total Fat</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.fat}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>43%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Saturated Fat</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.saturatedFat}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>40%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Cholesterol</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.cholesterol}mg
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>32%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Sodium</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.sodium}mg
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>25%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Total Carbohydrates</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.carbs}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>4%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Dietary Fiber</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.fiber}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>11%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Sugars</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.sugar}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>-</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ padding: "5px" }}>Protein</td>
              <td style={{ textAlign: "right", padding: "5px" }}>
                {recipe.nutritionalInfo.protein}g
              </td>
              <td style={{ textAlign: "right", padding: "5px" }}>70%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tags */}
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: "3px 8px",
                background: "#f3f4f6",
                borderRadius: "12px",
                fontSize: "9pt",
                color: "#666",
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "30px",
          paddingTop: "15px",
          borderTop: "1px solid #e5e5e5",
          textAlign: "center",
          fontSize: "9pt",
          color: "#999",
        }}
      >
        <p>Generated by FlavorHub - Your Intelligent Recipe Platform</p>
        <p>
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
