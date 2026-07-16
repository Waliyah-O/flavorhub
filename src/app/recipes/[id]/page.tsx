"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./print.css"; //
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Star,
  Flame,
  Printer,
  Share2,
  Bookmark,
  ShoppingCart,
  Play,
  Plus,
  Minus,
  Check,
  ChefHat as ChefHatIcon,
  Scale,
  Thermometer,
  Leaf,
  Beef,
  Wheat,
  Droplets,
  ArrowLeft,
  Calendar,
  UtensilsCrossed,
  Timer,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PrintRecipe } from "../print-recipe";
import { sampleRecipe, sampleRecipeDetails } from "@/lib/data";

// Types
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

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  rating: number;
  reviewCount: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionalInfo: NutritionalInfo;
  tags: Array<{ id: string; name: string }>;
  equipment: string[];
  tips: string[];
  reviews: Review[];
  relatedRecipes: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    calories: number;
    rating: number;
    tags: Array<{ id: string; name: string }>;
  }>;
}

// Sample recipe data

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showVideo, setShowVideo] = useState(false);

  // Load recipe data
  useEffect(() => {
    // In production, fetch from API using params.id
    // const fetchRecipe = async () => {
    //   const response = await fetch(`/api/recipes/${params.id}`)
    //   const data = await response.json()
    //   setRecipe(data)
    //   setLoading(false)
    // }
    // fetchRecipe()

    setTimeout(() => {
      const foundRecipe = sampleRecipeDetails.find((r) => r.id === params.id);

      if (foundRecipe) {
        setRecipe(foundRecipe);
        setServings(foundRecipe.servings);
      } else {
        // Handle case where recipe is not found
        console.error(`Recipe with id ${params.id} not found`);
        //  redirect to 404
      }

      setLoading(false);
    }, 500);
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = async () => {
    // Create a new window for printing to PDF
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Get the print content
    const printContent = document.querySelector(".print-recipe");
    if (!printContent) return;

    // Write print-friendly HTML
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${recipe?.title || "Recipe"} - FlavorHub</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }

          h1 {
            font-size: 28pt;
            margin-bottom: 10px;
            color: #1a1a1a;
            text-align: center;
          }

          h2 {
            font-size: 18pt;
            margin-top: 25px;
            margin-bottom: 10px;
            color: #333;
            border-bottom: 2px solid #ec4899;
            padding-bottom: 5px;
          }

          .meta-info {
            display: flex;
            justify-content: space-around;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            margin: 20px 0;
          }

          .meta-item {
            text-align: center;
          }

          .meta-value {
            font-weight: bold;
            font-size: 14pt;
          }

          .meta-label {
            color: #666;
            font-size: 10pt;
          }

          .ingredients-list {
            columns: 2;
            column-gap: 40px;
            list-style: none;
            padding: 0;
          }

          .ingredients-list li {
            break-inside: avoid;
            padding: 4px 0;
            border-bottom: 1px dotted #e5e5e5;
          }

          .instructions-list {
            list-style: none;
            padding: 0;
          }

          .instructions-list li {
            break-inside: avoid;
            margin-bottom: 20px;
            padding-left: 40px;
            position: relative;
          }

          .step-number {
            position: absolute;
            left: 0;
            top: 0;
            width: 28px;
            height: 28px;
            background: #ec4899;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }

          .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 15px 0;
          }

          .nutrition-item {
            text-align: center;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 8px;
          }

          .nutrition-value {
            font-size: 16pt;
            font-weight: bold;
          }

          .nutrition-label {
            font-size: 9pt;
            color: #666;
          }

          .tip-box {
            margin-top: 8px;
            padding: 8px;
            background: #eff6ff;
            border-radius: 4px;
            font-size: 10pt;
            color: #1e40af;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
          }

          th, td {
            padding: 5px;
            text-align: left;
            border-bottom: 1px solid #e5e5e5;
          }

          th {
            border-bottom: 2px solid #e5e5e5;
          }

          .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e5e5e5;
            text-align: center;
            font-size: 9pt;
            color: #999;
          }

          @media print {
            @page {
              margin: 2cm;
              size: A4;
            }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      // printWindow.close() // Uncomment to auto-close after print dialog
    };
  };

  // Calculate ingredient quantities based on servings

  const calculateAmount = (
    originalAmount: number,
    originalServings: number,
  ) => {
    if (typeof originalAmount !== "number") return originalAmount;
    return (originalAmount * servings) / originalServings;
  };

  // Format amount for display
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

  // Toggle step completion
  const toggleStep = (step: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(step)) {
        newSet.delete(step);
      } else {
        newSet.add(step);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The recipe you're looking for doesn't exist.
          </p>
          <Link href="/recipes">
            <Button>Back to Recipes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PrintRecipe recipe={recipe} servings={servings} />
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/recipes"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recipes
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-b from-gray-900 to-gray-700">
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} className="bg-white/20 text-white">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{recipe.rating}</span>
                <span>({recipe.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span>By {recipe.author.name}</span>
              <span>•</span>
              <span>{recipe.cuisine} cuisine</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Bar */}
            <Card className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Clock className="h-6 w-6 text-pink-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prep Time
                  </p>
                  <p className="font-semibold">{recipe.prepTime} min</p>
                </div>
                <div className="text-center">
                  <Timer className="h-6 w-6 text-pink-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cook Time
                  </p>
                  <p className="font-semibold">{recipe.cookTime} min</p>
                </div>
                <div className="text-center">
                  <ChefHat className="h-6 w-6 text-pink-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Difficulty
                  </p>
                  <p className="font-semibold">{recipe.difficulty}</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 text-pink-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Servings
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-semibold">{servings}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setServings(servings + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFavorite ? "default" : "outline"}
                className={isFavorite ? "bg-pink-500 hover:bg-pink-600" : ""}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={cn("mr-2 h-4 w-4", isFavorite && "fill-current")}
                />
                {isFavorite ? "Saved" : "Save Recipe"}
              </Button>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                className={isBookmarked ? "bg-pink-500 hover:bg-pink-600" : ""}
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={cn("mr-2 h-4 w-4", isBookmarked && "fill-current")}
                />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Shopping List
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Meal Plan
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleSaveAsPDF}
                title="Print / Save as PDF"
              >
                <Printer className="h-4 w-4" />
              </Button>

              {/* <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button> */}
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {recipe.description}
              </p>
            </Card>

            {/* Tabs: Instructions, Ingredients, Nutrition */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="instructions">
                  <ChefHatIcon className="h-4 w-4 mr-2" />
                  Instructions
                </TabsTrigger>
                <TabsTrigger value="ingredients">
                  <Scale className="h-4 w-4 mr-2" />
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="nutrition">
                  <Thermometer className="h-4 w-4 mr-2" />
                  Nutrition
                </TabsTrigger>
              </TabsList>

              {/* Instructions Tab */}
              <TabsContent value="instructions" className="space-y-6">
                {/* Video Tutorial */}
                {recipe.videoUrl && (
                  <Card className="p-4">
                    {!showVideo ? (
                      <div
                        className="relative h-64 bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer group"
                        onClick={() => setShowVideo(true)}
                      >
                        <Image
                          src={recipe.imageUrl}
                          alt="Video thumbnail"
                          fill
                          className="object-cover rounded-lg opacity-50"
                        />
                        <div className="relative z-10 text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                          <p className="text-white font-semibold">
                            Watch Video Tutorial
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-64 bg-gray-900 rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white">Video player placeholder</p>
                        </div>
                      </div>
                    )}
                  </Card>
                )}

                {/* Step-by-step Instructions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Step by Step Instructions
                  </h3>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction) => (
                      <div
                        key={instruction.step}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg transition-colors",
                          completedSteps.has(instruction.step)
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800",
                        )}
                      >
                        <button
                          onClick={() => toggleStep(instruction.step)}
                          className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                            completedSteps.has(instruction.step)
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-pink-500",
                          )}
                        >
                          {completedSteps.has(instruction.step) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">
                              {instruction.step}
                            </span>
                          )}
                        </button>
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-gray-800 dark:text-gray-200",
                              completedSteps.has(instruction.step) &&
                                "line-through text-gray-400",
                            )}
                          >
                            {instruction.description}
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            {instruction.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {instruction.duration} min
                              </span>
                            )}
                            {instruction.temperature && (
                              <span className="flex items-center gap-1">
                                <Thermometer className="h-3 w-3" />
                                {instruction.temperature}°F
                              </span>
                            )}
                          </div>
                          {instruction.tip && (
                            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <span>
                                  <strong>Pro Tip:</strong> {instruction.tip}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Tips Section */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-pink-500" />
                    Helpful Tips
                  </h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-pink-500 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Equipment */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-pink-500" />
                    Equipment Needed
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {recipe.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Ingredients Tab */}
              <TabsContent value="ingredients">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Ingredients</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Servings:</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setServings(Math.max(1, servings - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold w-8 text-center">
                        {servings}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setServings(servings + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, index) => {
                      const adjustedAmount = calculateAmount(
                        ingredient.amount,
                        recipe.servings,
                      );
                      const formattedAmount = formatAmount(adjustedAmount);

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                          />
                          <div className="flex-1">
                            <span className="font-medium">
                              {formattedAmount} {ingredient.unit}
                            </span>{" "}
                            <span>{ingredient.name}</span>
                            {ingredient.notes && (
                              <p className="text-sm text-gray-500">
                                {ingredient.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add All to Shopping List
                  </Button>
                </Card>
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    Nutritional Information
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Per serving</p>

                  {/* Main Macros */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <Flame className="h-6 w-6 text-red-500 mx-auto mb-1" />
                      <p className="text-2xl font-bold">
                        {recipe.nutritionalInfo.calories}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Calories
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Beef className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-2xl font-bold">
                        {recipe.nutritionalInfo.protein}g
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Protein
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <Wheat className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                      <p className="text-2xl font-bold">
                        {recipe.nutritionalInfo.carbs}g
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Carbs
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Droplets className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <p className="text-2xl font-bold">
                        {recipe.nutritionalInfo.fat}g
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Fat
                      </p>
                    </div>
                  </div>

                  {/* Detailed Nutrition */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Protein</span>
                        <span className="font-medium">
                          {recipe.nutritionalInfo.protein}g
                        </span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Carbohydrates</span>
                        <span className="font-medium">
                          {recipe.nutritionalInfo.carbs}g
                        </span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fat</span>
                        <span className="font-medium">
                          {recipe.nutritionalInfo.fat}g
                        </span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fiber</span>
                        <span className="font-medium">
                          {recipe.nutritionalInfo.fiber}g
                        </span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sugar</span>
                        <span className="font-medium">
                          {recipe.nutritionalInfo.sugar}g
                        </span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </div>

                  {/* Vitamins & Minerals */}
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        Vitamins
                      </h4>
                      <div className="space-y-2">
                        {recipe.nutritionalInfo.vitamins.map(
                          (vitamin, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {vitamin.name}
                              </span>
                              <span className="font-medium">
                                {vitamin.amount} {vitamin.unit}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Scale className="h-4 w-4 text-blue-500" />
                        Minerals
                      </h4>
                      <div className="space-y-2">
                        {recipe.nutritionalInfo.minerals.map(
                          (mineral, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {mineral.name}
                              </span>
                              <span className="font-medium">
                                {mineral.amount} {mineral.unit}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Reviews Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  Reviews ({recipe.reviews.length})
                </h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {recipe.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-semibold">
                        {review.userName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.userName}</p>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm">
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">About the Author</h3>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-2xl font-bold">
                  {recipe.author.name[0]}
                </div>
                <h4 className="font-semibold">{recipe.author.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {recipe.author.bio}
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Follow
                </Button>
              </div>
            </Card>

            {/* Recipe Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Link href={`/recipes?tags=${tag.name}`} key={tag.id}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-pink-100"
                    >
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Quick Nutrition Summary */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Quick Nutrition</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Calories</span>
                  <span className="font-semibold">
                    {recipe.nutritionalInfo.calories}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Protein</span>
                  <span className="font-semibold">
                    {recipe.nutritionalInfo.protein}g
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Carbs</span>
                  <span className="font-semibold">
                    {recipe.nutritionalInfo.carbs}g
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fat</span>
                  <span className="font-semibold">
                    {recipe.nutritionalInfo.fat}g
                  </span>
                </div>
              </div>
            </Card>

            {/* Related Recipes */}
            <div>
              <h3 className="font-semibold mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {recipe.relatedRecipes.map((related) => (
                  <Link href={`/recipes/${related.id}`} key={related.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex gap-3 p-3">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-pink-500 transition-colors">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {related.rating}
                            </div>
                            <span>•</span>
                            <span>{related.cuisine}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
