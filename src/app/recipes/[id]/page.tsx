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

interface RecipeDetail {
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
const sampleRecipe: RecipeDetail = {
  id: "1",
  title: "Mediterranean Grilled Salmon with Herb Crust",
  description:
    "Fresh Atlantic salmon fillet coated with a fragrant herb crust, grilled to perfection. Served with a light lemon butter sauce and roasted Mediterranean vegetables. This restaurant-quality dish is surprisingly easy to make at home and perfect for both weeknight dinners and special occasions.",
  imageUrl: "/api/placeholder/800/400",
  videoUrl: "https://example.com/video",
  prepTime: 15,
  cookTime: 20,
  totalTime: 35,
  servings: 4,
  difficulty: "Medium",
  cuisine: "Mediterranean",
  author: {
    name: "Chef Maria Rodriguez",
    avatar: "/api/placeholder/100/100",
    bio: "Professional chef with 15 years of experience in Mediterranean cuisine. Passionate about making gourmet cooking accessible to everyone.",
  },
  rating: 4.8,
  reviewCount: 234,
  ingredients: [
    {
      name: "Salmon fillets",
      amount: 4,
      unit: "pieces",
      notes: "6 oz each, skin-on",
    },
    {
      name: "Fresh parsley",
      amount: 1 / 4,
      unit: "cup",
      notes: "finely chopped",
    },
    { name: "Fresh dill", amount: 2, unit: "tablespoons", notes: "chopped" },
    {
      name: "Fresh thyme",
      amount: 1,
      unit: "tablespoon",
      notes: "leaves only",
    },
    { name: "Garlic cloves", amount: 4, unit: "pieces", notes: "minced" },
    {
      name: "Lemon",
      amount: 2,
      unit: "pieces",
      notes: "1 for zest and juice, 1 for serving",
    },
    {
      name: "Olive oil",
      amount: 3,
      unit: "tablespoons",
      notes: "extra virgin",
    },
    { name: "Dijon mustard", amount: 1, unit: "tablespoon" },
    { name: "Salt", amount: 1, unit: "teaspoon", notes: "or to taste" },
    {
      name: "Black pepper",
      amount: 1 / 2,
      unit: "teaspoon",
      notes: "freshly ground",
    },
    { name: "Cherry tomatoes", amount: 2, unit: "cups", notes: "halved" },
    { name: "Zucchini", amount: 2, unit: "pieces", notes: "sliced" },
    { name: "Red bell pepper", amount: 1, unit: "piece", notes: "sliced" },
    { name: "Red onion", amount: 1, unit: "piece", notes: "cut into wedges" },
    { name: "Butter", amount: 2, unit: "tablespoons", notes: "unsalted" },
  ],
  instructions: [
    {
      step: 1,
      description:
        "Preheat your grill or grill pan to medium-high heat (about 400°F/200°C).",
      duration: 5,
      temperature: 400,
    },
    {
      step: 2,
      description:
        "In a small bowl, mix together the chopped parsley, dill, thyme, minced garlic, lemon zest, olive oil, Dijon mustard, salt, and pepper to create the herb crust paste.",
      duration: 5,
    },
    {
      step: 3,
      description:
        "Pat the salmon fillets dry with paper towels. Spread the herb mixture evenly over the top of each fillet, pressing gently to adhere.",
      duration: 3,
    },
    {
      step: 4,
      description:
        "Toss the cherry tomatoes, zucchini, bell pepper, and red onion with 1 tablespoon olive oil, salt, and pepper.",
      duration: 3,
    },
    {
      step: 5,
      description:
        "Place the vegetables in a grill basket or on a piece of aluminum foil on the grill. Cook for 8-10 minutes, stirring occasionally, until tender and lightly charred.",
      duration: 10,
      tip: "If using wooden skewers for vegetables, soak them in water for 30 minutes before grilling to prevent burning.",
    },
    {
      step: 6,
      description:
        "Place the salmon fillets on the grill, herb-side up. Close the lid and cook for 6-8 minutes, or until the fish is just cooked through and flakes easily with a fork. Do not flip the salmon.",
      duration: 8,
      tip: "The internal temperature should reach 145°F (63°C) for perfectly cooked salmon.",
    },
    {
      step: 7,
      description:
        "While the salmon cooks, melt the butter in a small saucepan. Add the lemon juice and stir to combine.",
      duration: 2,
    },
    {
      step: 8,
      description:
        "Remove salmon and vegetables from the grill. Drizzle the lemon butter sauce over the salmon. Serve immediately with lemon wedges on the side.",
      duration: 2,
    },
  ],
  nutritionalInfo: {
    calories: 450,
    protein: 35,
    carbs: 12,
    fat: 28,
    fiber: 3,
    sugar: 4,
    sodium: 580,
    cholesterol: 95,
    saturatedFat: 8,
    vitamins: [
      { name: "Vitamin A", amount: "15", unit: "% DV" },
      { name: "Vitamin C", amount: "45", unit: "% DV" },
      { name: "Vitamin D", amount: "80", unit: "% DV" },
      { name: "Vitamin B12", amount: "120", unit: "% DV" },
    ],
    minerals: [
      { name: "Iron", amount: "10", unit: "% DV" },
      { name: "Calcium", amount: "6", unit: "% DV" },
      { name: "Potassium", amount: "20", unit: "% DV" },
      { name: "Magnesium", amount: "15", unit: "% DV" },
    ],
  },
  tags: [
    { id: "1", name: "Healthy" },
    { id: "2", name: "High Protein" },
    { id: "3", name: "Gluten-Free" },
    { id: "4", name: "Keto-Friendly" },
    { id: "5", name: "Mediterranean" },
    { id: "6", name: "Seafood" },
  ],
  equipment: [
    "Grill or grill pan",
    "Grill basket or aluminum foil",
    "Small mixing bowl",
    "Measuring spoons",
    "Chef's knife",
    "Cutting board",
    "Small saucepan",
    "Paper towels",
  ],
  tips: [
    "For best results, bring salmon to room temperature 15-20 minutes before cooking.",
    "Don't overcook the salmon - it will continue cooking from residual heat after removing from grill.",
    "Fresh herbs make a big difference in this recipe. Dried herbs can be substituted but use half the amount.",
    "This recipe works great with other fish like halibut, sea bass, or trout.",
  ],
  reviews: [
    {
      id: "1",
      userId: "1",
      userName: "Sarah Johnson",
      userAvatar: "/api/placeholder/50/50",
      rating: 5,
      comment:
        "This recipe is absolutely amazing! The herb crust gives so much flavor. I've made it three times already and my family loves it. The tips about not overcooking were really helpful.",
      date: "2024-01-15",
      helpful: 42,
    },
    {
      id: "2",
      userId: "2",
      userName: "Mike Chen",
      userAvatar: "/api/placeholder/50/50",
      rating: 5,
      comment:
        "Restaurant quality at home! The lemon butter sauce is divine. I added some capers for extra flavor. Will definitely make this again.",
      date: "2024-01-10",
      helpful: 28,
    },
    {
      id: "3",
      userId: "3",
      userName: "Emily Brown",
      userAvatar: "/api/placeholder/50/50",
      rating: 4,
      comment:
        "Really good recipe! I used dried herbs since I didn't have fresh ones and it still turned out great. Next time I'll make sure to use fresh herbs as recommended.",
      date: "2024-01-08",
      helpful: 15,
    },
  ],
  relatedRecipes: [
    {
      id: "2",
      title: "Lemon Herb Grilled Chicken",
      description:
        "Juicy grilled chicken breasts marinated in lemon and herbs.",
      imageUrl: "/api/placeholder/400/300",
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: "Easy",
      cuisine: "Mediterranean",
      calories: 380,
      rating: 4.6,
      tags: [
        { id: "1", name: "Healthy" },
        { id: "2", name: "High Protein" },
      ],
    },
    {
      id: "3",
      title: "Garlic Butter Shrimp Skewers",
      description: "Succulent shrimp with garlic butter and fresh herbs.",
      imageUrl: "/api/placeholder/400/300",
      prepTime: 20,
      cookTime: 10,
      servings: 4,
      difficulty: "Easy",
      cuisine: "Mediterranean",
      calories: 320,
      rating: 4.7,
      tags: [
        { id: "1", name: "Seafood" },
        { id: "2", name: "Quick" },
      ],
    },
    {
      id: "4",
      title: "Mediterranean Vegetable Pasta",
      description:
        "Fresh pasta with roasted Mediterranean vegetables and feta.",
      imageUrl: "/api/placeholder/400/300",
      prepTime: 10,
      cookTime: 25,
      servings: 6,
      difficulty: "Easy",
      cuisine: "Mediterranean",
      calories: 420,
      rating: 4.5,
      tags: [
        { id: "1", name: "Vegetarian" },
        { id: "2", name: "Pasta" },
      ],
    },
  ],
};

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

    // Using sample data for now
    setTimeout(() => {
      setRecipe(sampleRecipe);
      setServings(sampleRecipe.servings);
      setLoading(false);
    }, 500);
  }, [params.id]);

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
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
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
