"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Search,
  Grid3X3,
  List,
  Filter,
  Trash2,
  ShoppingCart,
  Calendar,
  ChefHat,
  Clock,
  Users,
  Star,
  Flame,
  Bookmark,
  Download,
  Share2,
  MoreVertical,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface SavedRecipe {
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
  savedDate: string;
  tags: Array<{ id: string; name: string }>;
  collections: string[];
}

// Sample data
const sampleSavedRecipes: SavedRecipe[] = [
  {
    id: "1",
    title: "Mediterranean Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs, lemon, and olive oil.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    calories: 450,
    rating: 4.8,
    savedDate: "2024-01-15",
    tags: [
      { id: "1", name: "Healthy" },
      { id: "2", name: "High Protein" },
    ],
    collections: ["Weekly Favorites", "Dinner Ideas"],
  },
  {
    id: "2",
    title: "Thai Green Curry",
    description:
      "Aromatic Thai green curry with tender chicken and vegetables.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Thai",
    calories: 520,
    rating: 4.7,
    savedDate: "2024-01-10",
    tags: [
      { id: "3", name: "Asian" },
      { id: "4", name: "Spicy" },
    ],
    collections: ["Weekly Favorites"],
  },
  {
    id: "3",
    title: "Classic Margherita Pizza",
    description: "Authentic Neapolitan pizza with fresh mozzarella and basil.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
    calories: 680,
    rating: 4.9,
    savedDate: "2024-01-08",
    tags: [
      { id: "5", name: "Italian" },
      { id: "6", name: "Classic" },
    ],
    collections: ["Dinner Ideas", "Comfort Food"],
  },
  {
    id: "4",
    title: "Berry Smoothie Bowl",
    description: "Energizing breakfast bowl with mixed berries and granola.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    cuisine: "American",
    calories: 350,
    rating: 4.5,
    savedDate: "2024-01-05",
    tags: [
      { id: "7", name: "Breakfast" },
      { id: "8", name: "Quick" },
    ],
    collections: ["Breakfast Ideas"],
  },
  {
    id: "5",
    title: "Beef Tacos with Salsa",
    description: "Mexican-style beef tacos with homemade pico de gallo.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 20,
    servings: 6,
    difficulty: "Easy",
    cuisine: "Mexican",
    calories: 450,
    rating: 4.8,
    savedDate: "2023-12-28",
    tags: [
      { id: "9", name: "Mexican" },
      { id: "10", name: "Quick" },
    ],
    collections: ["Comfort Food"],
  },
  {
    id: "6",
    title: "Vegetarian Buddha Bowl",
    description: "Nutritious bowl with quinoa, roasted vegetables, and tahini.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Asian Fusion",
    calories: 380,
    rating: 4.6,
    savedDate: "2023-12-20",
    tags: [
      { id: "11", name: "Vegetarian" },
      { id: "12", name: "Healthy" },
    ],
    collections: ["Weekly Favorites", "Healthy Meals"],
  },
];

const collections = [
  "All Saved",
  "Weekly Favorites",
  "Dinner Ideas",
  "Breakfast Ideas",
  "Comfort Food",
  "Healthy Meals",
  "Quick & Easy",
];

export default function SavedRecipesPage() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>(sampleSavedRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All Saved");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(
    new Set(),
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCollection =
        selectedCollection === "All Saved" ||
        recipe.collections.includes(selectedCollection);

      return matchesSearch && matchesCollection;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        case "calories":
          return a.calories - b.calories;
        default:
          return 0;
      }
    });

  const toggleRecipeSelection = (recipeId: string) => {
    setSelectedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  const removeRecipe = (recipeId: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    setSelectedRecipes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(recipeId);
      return newSet;
    });
    setShowDeleteConfirm(null);
  };

  const removeSelected = () => {
    setRecipes((prev) =>
      prev.filter((recipe) => !selectedRecipes.has(recipe.id)),
    );
    setSelectedRecipes(new Set());
  };

  const addToMealPlan = (recipeId: string) => {
    // Add to meal plan logic
    console.log("Adding to meal plan:", recipeId);
  };

  const addToShoppingList = (recipeId: string) => {
    // Add to shopping list logic
    console.log("Adding to shopping list:", recipeId);
  };

  const exportRecipes = () => {
    // Export recipes logic
    console.log("Exporting recipes");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
              Saved Recipes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {recipes.length} recipes saved • {collections.length - 1}{" "}
              collections
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={exportRecipes}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Collection
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search saved recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
              <option value="calories">Lowest Calories</option>
            </select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="flex flex-wrap gap-2 mb-6">
          {collections.map((collection) => (
            <Badge
              key={collection}
              variant={
                selectedCollection === collection ? "default" : "outline"
              }
              className={cn(
                "cursor-pointer px-4 py-2",
                selectedCollection === collection && "bg-pink-500",
              )}
              onClick={() => setSelectedCollection(collection)}
            >
              {collection}
              {collection !== "All Saved" && (
                <span className="ml-2 text-xs opacity-70">
                  (
                  {
                    recipes.filter((r) => r.collections.includes(collection))
                      .length
                  }
                  )
                </span>
              )}
            </Badge>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedRecipes.size > 0 && (
          <Card className="p-4 mb-6 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {selectedRecipes.size} recipe
                {selectedRecipes.size > 1 ? "s" : ""} selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    selectedRecipes.forEach((id) => addToMealPlan(id));
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Meal Plan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    selectedRecipes.forEach((id) => addToShoppingList(id));
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Shopping List
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeSelected}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Recipe Grid/List */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No saved recipes found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Start exploring and save your favorite recipes!"}
            </p>
            {!searchQuery && (
              <Link href="/recipes">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
                  Discover Recipes
                </Button>
              </Link>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className={cn(
                  "group overflow-hidden hover:shadow-xl transition-all duration-300",
                  selectedRecipes.has(recipe.id) && "ring-2 ring-pink-500",
                )}
                onClick={() => toggleRecipeSelection(recipe.id)}
              >
                <div className="relative h-48">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        selectedRecipes.has(recipe.id)
                          ? "bg-pink-500 border-pink-500"
                          : "border-white bg-black/20",
                      )}
                    >
                      {selectedRecipes.has(recipe.id) && (
                        <X className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(recipe.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-white/90 text-gray-800">
                      {recipe.cuisine}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>

                  <Link href={`/recipes/${recipe.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-1 hover:text-pink-500 transition-colors">
                      {recipe.title}
                    </h3>
                  </Link>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {recipe.calories} cal
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.collections.map((collection) => (
                      <Badge
                        key={collection}
                        variant="secondary"
                        className="text-xs"
                      >
                        {collection}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToMealPlan(recipe.id);
                      }}
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      Meal Plan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToShoppingList(recipe.id);
                      }}
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      Shopping
                    </Button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === recipe.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center m-4">
                      <p className="mb-3">Remove from saved recipes?</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecipe(recipe.id);
                          }}
                        >
                          Remove
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className={cn(
                  "hover:shadow-lg transition-all",
                  selectedRecipes.has(recipe.id) && "ring-2 ring-pink-500",
                )}
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Link href={`/recipes/${recipe.id}`}>
                        <h3 className="font-semibold hover:text-pink-500 transition-colors">
                          {recipe.title}
                        </h3>
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeRecipe(recipe.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recipe.prepTime + recipe.cookTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        {recipe.calories} cal
                      </span>
                      <span>{recipe.cuisine}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {recipe.rating}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToMealPlan(recipe.id)}
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        Meal Plan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToShoppingList(recipe.id)}
                      >
                        <ShoppingCart className="mr-1 h-3 w-3" />
                        Shopping
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredRecipes.length > 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-gray-500">
              Showing {filteredRecipes.length} of {recipes.length} recipes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
