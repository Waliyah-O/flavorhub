"use client";

import { useState, useEffect } from "react";
// import { RecipeCard } from "@/components/recipes/recipe-card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronDown,
  Sparkles,
  Loader2,
} from "lucide-react";
import { RecipeCard } from "@/components/recipe/RecipeCard";

// Types for our recipe
interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  rating: number;
  tags: Array<{ id: string; name: string }>;
  isFavorite?: boolean;
}

const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Grilled Salmon",
    description:
      "Fresh Atlantic salmon with herbs, lemon, and olive oil. A healthy and delicious dinner option perfect for any occasion.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    calories: 450,
    protein: 35,
    carbs: 12,
    fat: 28,
    rating: 4.8,
    tags: [
      { id: "1", name: "Healthy" },
      { id: "2", name: "High Protein" },
      { id: "3", name: "Gluten-Free" },
    ],
    isFavorite: false,
  },
  {
    id: "2",
    title: "Vegetarian Buddha Bowl",
    description:
      "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Asian Fusion",
    calories: 380,
    protein: 15,
    carbs: 45,
    fat: 18,
    rating: 4.6,
    tags: [
      { id: "4", name: "Vegetarian" },
      { id: "5", name: "Vegan" },
      { id: "6", name: "High Fiber" },
    ],
    isFavorite: true,
  },
  {
    id: "3",
    title: "Classic Italian Margherita Pizza",
    description:
      "Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
    calories: 680,
    protein: 24,
    carbs: 72,
    fat: 32,
    rating: 4.9,
    tags: [
      { id: "7", name: "Italian" },
      { id: "8", name: "Classic" },
      { id: "9", name: "Family-Friendly" },
    ],
  },
  {
    id: "4",
    title: "Thai Green Curry with Chicken",
    description:
      "Aromatic and spicy Thai green curry with tender chicken, bamboo shoots, and basil.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Thai",
    calories: 520,
    protein: 28,
    carbs: 35,
    fat: 30,
    rating: 4.7,
    tags: [
      { id: "10", name: "Asian" },
      { id: "11", name: "Spicy" },
      { id: "12", name: "Curry" },
    ],
  },
  {
    id: "5",
    title: "Berry Protein Smoothie Bowl",
    description:
      "Energizing breakfast bowl with mixed berries, banana, protein powder, and granola.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    cuisine: "American",
    calories: 350,
    protein: 25,
    carbs: 48,
    fat: 8,
    rating: 4.5,
    tags: [
      { id: "13", name: "Breakfast" },
      { id: "14", name: "Quick" },
      { id: "15", name: "High Protein" },
    ],
  },
  {
    id: "6",
    title: "Beef Tacos with Fresh Salsa",
    description:
      "Mexican-style beef tacos with homemade pico de gallo, guacamole, and lime crema.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 20,
    servings: 6,
    difficulty: "Easy",
    cuisine: "Mexican",
    calories: 450,
    protein: 30,
    carbs: 38,
    fat: 22,
    rating: 4.8,
    tags: [
      { id: "16", name: "Mexican" },
      { id: "17", name: "Family-Friendly" },
      { id: "18", name: "Quick" },
    ],
  },
];

const cuisines = [
  "All",
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "Indian",
  "American",
  "Thai",
  "Japanese",
  "French",
];

const difficulties = ["All", "Easy", "Medium", "Hard"];
const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [calorieRange, setCalorieRange] = useState([0, 1000]);
  const [cookTimeRange, setCookTimeRange] = useState([0, 120]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["2"]));

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Toggle favorite
  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  // Filter and search recipes
  useEffect(() => {
    let filtered = [...sampleRecipes];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          recipe.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Cuisine filter
    if (selectedCuisine !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.cuisine === selectedCuisine,
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === selectedDifficulty,
      );
    }

    // Dietary filter
    if (selectedDietary.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedDietary.every((diet) =>
          recipe.tags.some(
            (tag) => tag.name.toLowerCase() === diet.toLowerCase(),
          ),
        ),
      );
    }

    // Calorie range filter
    filtered = filtered.filter(
      (recipe) =>
        recipe.calories &&
        recipe.calories >= calorieRange[0] &&
        recipe.calories <= calorieRange[1],
    );

    // Cook time filter
    filtered = filtered.filter(
      (recipe) =>
        recipe.prepTime + recipe.cookTime >= cookTimeRange[0] &&
        recipe.prepTime + recipe.cookTime <= cookTimeRange[1],
    );

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "quick":
        filtered.sort(
          (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime),
        );
        break;
      case "healthy":
        filtered.sort((a, b) => (a.calories || 0) - (b.calories || 0));
        break;
      case "newest":
        // In real app, sort by date
        break;
    }

    setRecipes(filtered);
  }, [
    searchQuery,
    selectedCuisine,
    selectedDifficulty,
    selectedDietary,
    calorieRange,
    cookTimeRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("All");
    setSelectedDifficulty("All");
    setSelectedDietary([]);
    setCalorieRange([0, 1000]);
    setCookTimeRange([0, 120]);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Recipes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the perfect recipe for any occasion
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search recipes, ingredients, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-4"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              {(selectedCuisine !== "All" ||
                selectedDifficulty !== "All" ||
                selectedDietary.length > 0) && (
                <Badge className="ml-2 bg-pink-500">!</Badge>
              )}
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {cuisines.slice(0, 5).map((cuisine) => (
              <Badge
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                className="cursor-pointer hover:bg-pink-50 transition-colors"
                onClick={() =>
                  setSelectedCuisine(
                    cuisine === selectedCuisine ? "All" : cuisine,
                  )
                }
              >
                {cuisine}
              </Badge>
            ))}
            {selectedCuisine !== "All" && (
              <Badge
                variant="destructive"
                className="cursor-pointer"
                onClick={() => setSelectedCuisine("All")}
              >
                Clear <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Cuisine Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cuisine
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Difficulty
                  </label>
                  <div className="flex gap-2">
                    {difficulties.map((difficulty) => (
                      <Badge
                        key={difficulty}
                        variant={
                          selectedDifficulty === difficulty
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedDifficulty(
                            difficulty === selectedDifficulty
                              ? "All"
                              : difficulty,
                          )
                        }
                      >
                        {difficulty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Filters */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Dietary Preferences
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map((diet) => (
                      <Badge
                        key={diet}
                        variant={
                          selectedDietary.includes(diet) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedDietary((prev) =>
                            prev.includes(diet)
                              ? prev.filter((d) => d !== diet)
                              : [...prev, diet],
                          );
                        }}
                      >
                        {diet}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="quick">Quickest</option>
                    <option value="healthy">Healthiest</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Calorie Range */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Calories: {calorieRange[0]} - {calorieRange[1]} cal
                  </label>
                  <Slider
                    value={calorieRange}
                    onValueChange={setCalorieRange}
                    min={0}
                    max={1000}
                    step={50}
                    className="mt-2"
                  />
                </div>

                {/* Cook Time Range */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Cook Time: {cookTimeRange[0]} - {cookTimeRange[1]} min
                  </label>
                  <Slider
                    value={cookTimeRange}
                    onValueChange={setCookTimeRange}
                    min={0}
                    max={120}
                    step={15}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* AI Suggestion Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Not sure what to cook?</h3>
              <p className="text-pink-100">
                Let our AI suggest recipes based on your preferences
              </p>
            </div>
            <Button variant="secondary" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Suggestions
            </Button>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{recipes.length}</span>{" "}
            recipes
          </p>
        </div>

        {/* Recipe Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
          </div>
        ) : recipes.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                // recipe={{
                //   id: "1",
                //   title: "Mediterranean Grilled Salmon",
                //   description: "Fresh Atlantic salmon with herbs...",
                //   imageUrl: "/api/placeholder/400/300",
                //   prepTime: 15,
                //   cookTime: 20,
                //   servings: 4,
                //   difficulty: "Medium",
                //   cuisine: "Mediterranean",
                //   calories: 450,
                //   rating: 4.8,
                //   protein: 35,
                //   carbs: 12,
                //   fat: 28,
                //   tags: [
                //     { id: "1", name: "Healthy" },
                //     { id: "2", name: "High Protein" },
                //   ],
                // }}
                // recipe={recipeData}
                isFavorite={favorites.has(recipe.id)}
                onToggleFavorite={() => {
                  setFavorites((prev) => {
                    const newFavs = new Set(prev);
                    if (newFavs.has(recipe.id)) {
                      newFavs.delete(recipe.id);
                    } else {
                      newFavs.add(recipe.id);
                    }
                    return newFavs;
                  });
                }}
                viewMode={viewMode}
              />
              // <RecipeCard
              //   key={recipe.id}
              //   recipe={recipe}
              //   isFavorite={favorites.has(recipe.id)}
              //   onToggleFavorite={() => toggleFavorite(recipe.id)}
              //   viewMode={viewMode}
              // />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">No recipes found</p>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
