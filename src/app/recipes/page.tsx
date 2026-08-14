"use client";

import { useState, useEffect, useMemo } from "react";
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
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Flame,
  ChefHat,
  Users,
  Heart,
  Filter,
  RotateCcw,
  TrendingUp,
  Leaf,
  Globe,
  Zap,
  Salad,
  Soup,
  Cake,
  Coffee,
  Pizza,
  Fish,
  Beef,
  Wheat,
  Milk,
  Egg,
  Carrot,
  Apple,
  Cookie,
  UtensilsCrossed,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { sampleRecipes } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  totalTime?: number;
  difficulty: string;
  cuisine: string;
  author?: {
    name: string;
    avatar: string;
    bio: string;
  };
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  rating: number;
  reviewCount?: number;
  ingredients?: any[];
  instructions?: any[];
  nutritionalInfo?: any;
  tips?: string[];
  tags: Array<{ id: string; name: string }>;
  reviews?: Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    date: string;
    rating: number;
    comment: string;
    helpful?: number;
  }>;
  relatedRecipes?: any[];
  equipment?: string[];
  isFavorite?: boolean;
  createdAt?: string;
}

const cuisines = [
  { name: "All", icon: Globe, color: "from-gray-500 to-gray-600" },
  { name: "Italian", icon: Pizza, color: "from-green-500 to-emerald-600" },
  {
    name: "Mexican",
    icon: UtensilsCrossed,
    color: "from-orange-500 to-red-600",
  },
  { name: "Asian", icon: Soup, color: "from-red-500 to-rose-600" },
  { name: "Mediterranean", icon: Fish, color: "from-blue-500 to-cyan-600" },
  { name: "Indian", icon: Flame, color: "from-yellow-500 to-orange-600" },
  { name: "American", icon: Beef, color: "from-purple-500 to-violet-600" },
  { name: "Thai", icon: Leaf, color: "from-emerald-500 to-green-600" },
  { name: "Japanese", icon: Salad, color: "from-pink-500 to-rose-600" },
  { name: "French", icon: Cake, color: "from-indigo-500 to-blue-600" },
];

const difficulties = [
  { name: "All", color: "from-gray-500 to-gray-600" },
  { name: "Easy", color: "from-green-500 to-emerald-600" },
  { name: "Medium", color: "from-yellow-500 to-orange-600" },
  { name: "Hard", color: "from-red-500 to-rose-600" },
];

const dietaryOptions = [
  { name: "Vegetarian", icon: Carrot },
  { name: "Vegan", icon: Leaf },
  { name: "Gluten-Free", icon: Wheat },
  { name: "Dairy-Free", icon: Milk },
  { name: "Keto", icon: Egg },
  { name: "Paleo", icon: Beef },
];

const sortOptions = [
  { value: "popular", label: "Most Popular", icon: TrendingUp },
  { value: "quick", label: "Quickest", icon: Clock },
  { value: "healthy", label: "Healthiest", icon: Leaf },
  { value: "rating", label: "Highest Rated", icon: Star },
  { value: "newest", label: "Newest", icon: Sparkles },
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
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        // Uncomment when API is ready
        // const response = await fetch("/api/recipes");
        // const data = await response.json();
        // setRecipes(data);

        // Simulate loading
        setTimeout(() => {
          setRecipes(sampleRecipes);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Track active filters
  useEffect(() => {
    const filters = [];
    if (selectedCuisine !== "All") filters.push(`Cuisine: ${selectedCuisine}`);
    if (selectedDifficulty !== "All")
      filters.push(`Difficulty: ${selectedDifficulty}`);
    if (selectedDietary.length > 0)
      filters.push(`Dietary: ${selectedDietary.join(", ")}`);
    if (calorieRange[0] > 0 || calorieRange[1] < 1000)
      filters.push(`Calories: ${calorieRange[0]}-${calorieRange[1]}`);
    if (cookTimeRange[0] > 0 || cookTimeRange[1] < 120)
      filters.push(`Time: ${cookTimeRange[0]}-${cookTimeRange[1]} min`);
    setActiveFilters(filters);
  }, [
    selectedCuisine,
    selectedDifficulty,
    selectedDietary,
    calorieRange,
    cookTimeRange,
  ]);

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
  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    filtered = filtered.filter((recipe) => {
      if (!recipe.calories) return true;
      return (
        recipe.calories >= calorieRange[0] && recipe.calories <= calorieRange[1]
      );
    });

    // Cook time filter
    filtered = filtered.filter((recipe) => {
      const totalTime = recipe.prepTime + recipe.cookTime;
      return totalTime >= cookTimeRange[0] && totalTime <= cookTimeRange[1];
    });

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
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }

    return filtered;
  }, [
    recipes,
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

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Discover Recipes</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find the perfect recipe for any occasion
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div
              className={cn(
                "relative flex-1 transition-all duration-300",
                isSearchFocused && "scale-[1.02]",
              )}
            >
              <Search
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                  isSearchFocused ? "text-pink-500" : "text-gray-400",
                )}
              />
              <Input
                placeholder="Search recipes, ingredients, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "pl-10 h-12 text-lg transition-all duration-300",
                  isSearchFocused && "ring-2 ring-pink-500 border-pink-500",
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-12 px-4 transition-all duration-300",
                showFilters && "bg-pink-500 hover:bg-pink-600",
              )}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-pink-500 text-white">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded-none h-12 w-12 transition-all duration-300",
                  viewMode === "grid" && "bg-pink-500 hover:bg-pink-600",
                )}
              >
                <Grid3X3 className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-none h-12 w-12 transition-all duration-300",
                  viewMode === "list" && "bg-pink-500 hover:bg-pink-600",
                )}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="h-12 px-4"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                        sortBy === option.value
                          ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
                          : "text-gray-700 dark:text-gray-300",
                      )}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                      {sortBy === option.value && (
                        <CheckCircle2 className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Cuisine Filters */}
          <div className="flex flex-wrap gap-2">
            {cuisines.slice(0, 6).map((cuisine) => (
              <Badge
                key={cuisine.name}
                variant={
                  selectedCuisine === cuisine.name ? "default" : "outline"
                }
                className={cn(
                  "cursor-pointer px-4 py-2 transition-all duration-300 hover:scale-105",
                  selectedCuisine === cuisine.name
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "hover:border-pink-300 hover:text-pink-500",
                )}
                onClick={() =>
                  setSelectedCuisine(
                    cuisine.name === selectedCuisine ? "All" : cuisine.name,
                  )
                }
              >
                <cuisine.icon className="h-3 w-3 mr-1" />
                {cuisine.name}
              </Badge>
            ))}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {filter}
                  <button
                    onClick={() => {
                      // Remove specific filter
                      if (filter.startsWith("Cuisine"))
                        setSelectedCuisine("All");
                      else if (filter.startsWith("Difficulty"))
                        setSelectedDifficulty("All");
                      else if (filter.startsWith("Dietary"))
                        setSelectedDietary([]);
                      else if (filter.startsWith("Calories"))
                        setCalorieRange([0, 1000]);
                      else if (filter.startsWith("Time"))
                        setCookTimeRange([0, 120]);
                    }}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-pink-500 hover:text-pink-600"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
          )}

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6 animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5 text-pink-500" />
                  Advanced Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <RotateCcw className="h-4 w-4 mr-1" />
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
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                  >
                    {cuisines.map((cuisine) => (
                      <option key={cuisine.name} value={cuisine.name}>
                        {cuisine.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <Badge
                        key={difficulty.name}
                        variant={
                          selectedDifficulty === difficulty.name
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "cursor-pointer transition-all duration-300",
                          selectedDifficulty === difficulty.name &&
                            "bg-gradient-to-r from-pink-500 to-rose-500",
                        )}
                        onClick={() =>
                          setSelectedDifficulty(
                            difficulty.name === selectedDifficulty
                              ? "All"
                              : difficulty.name,
                          )
                        }
                      >
                        {difficulty.name}
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
                        key={diet.name}
                        variant={
                          selectedDietary.includes(diet.name)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => {
                          setSelectedDietary((prev) =>
                            prev.includes(diet.name)
                              ? prev.filter((d) => d !== diet.name)
                              : [...prev, diet.name],
                          );
                        }}
                      >
                        <diet.icon className="h-3 w-3 mr-1" />
                        {diet.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Calorie Range */}
                <div>
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
        <Card className="p-6 mb-8 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Not sure what to cook?
                </h3>
                <p className="text-pink-100">
                  Let our AI suggest recipes based on your preferences
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="group/button hover:scale-105 transition-transform"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover/button:rotate-12 transition-transform" />
              Get Suggestions
            </Button>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold">{filteredRecipes.length}</span>{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"}
              {hasActiveFilters && (
                <span className="text-pink-500"> (filtered)</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              Top Rated
            </Badge>
          </div>
        </div>

        {/* Recipe Grid/List */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-pink-500 mb-4" />
            <p className="text-gray-500">Loading recipes...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4",
            )}
          >
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.has(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="hover:border-pink-500 hover:text-pink-500"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// // import { RecipeCard } from "@/components/recipes/recipe-card"
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import {
//   Search,
//   SlidersHorizontal,
//   X,
//   Grid3X3,
//   List,
//   ChevronDown,
//   Sparkles,
//   Loader2,
// } from "lucide-react";
// import { RecipeCard } from "@/components/recipe/RecipeCard";
// import { sampleRecipes } from "@/lib/data";

// export interface Recipe {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   videoUrl?: string;
//   prepTime: number;
//   cookTime: number;
//   servings: number;
//   totalTime?: number;
//   difficulty: string;
//   cuisine: string;
//   author?: {
//     name: string;
//     avatar: string;
//     bio: string;
//   };
//   calories?: number;
//   protein?: number;
//   carbs?: number;
//   fat?: number;
//   rating: number;
//   reviewCount?: number;
//   ingredients?: any[];
//   instructions?: any[];
//   nutritionalInfo?: any;
//   tips?: string[];
//   tags: Array<{ id: string; name: string }>;
//   reviews?: Array<{
//     id: string;
//     userId: string;
//     userName: string;
//     userAvatar: string;
//     date: string;
//     rating: number;
//     comment: string;
//     helpful?: number;
//   }>;
//   relatedRecipes?: any[];
//   equipment?: string[];
//   isFavorite?: boolean;
// }

// const cuisines = [
//   "All",
//   "Italian",
//   "Mexican",
//   "Asian",
//   "Mediterranean",
//   "Indian",
//   "American",
//   "Thai",
//   "Japanese",
//   "French",
// ];

// const difficulties = ["All", "Easy", "Medium", "Hard"];
// const dietaryOptions = [
//   "Vegetarian",
//   "Vegan",
//   "Gluten-Free",
//   "Dairy-Free",
//   "Keto",
//   "Paleo",
// ];

// export default function RecipesPage() {
//   const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCuisine, setSelectedCuisine] = useState("All");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("All");
//   const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
//   const [calorieRange, setCalorieRange] = useState([0, 1000]);
//   const [cookTimeRange, setCookTimeRange] = useState([0, 120]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [sortBy, setSortBy] = useState("popular");
//   const [loading, setLoading] = useState(false);
//   const [favorites, setFavorites] = useState<Set<string>>(new Set(["2"]));

//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         const response = await fetch("/api/recipes");
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Failed to fetch recipes:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRecipes();
//   }, []);

//   // Toggle favorite
//   const toggleFavorite = (recipeId: string) => {
//     setFavorites((prev) => {
//       const newFavorites = new Set(prev);
//       if (newFavorites.has(recipeId)) {
//         newFavorites.delete(recipeId);
//       } else {
//         newFavorites.add(recipeId);
//       }
//       return newFavorites;
//     });
//   };

//   // Filter and search recipes
//   useEffect(() => {
//     let filtered = [...sampleRecipes];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (recipe) =>
//           recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           recipe.description
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           recipe.tags.some((tag) =>
//             tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
//           ),
//       );
//     }

//     // Cuisine filter
//     if (selectedCuisine !== "All") {
//       filtered = filtered.filter(
//         (recipe) => recipe.cuisine === selectedCuisine,
//       );
//     }

//     // Difficulty filter
//     if (selectedDifficulty !== "All") {
//       filtered = filtered.filter(
//         (recipe) => recipe.difficulty === selectedDifficulty,
//       );
//     }

//     // Dietary filter
//     if (selectedDietary.length > 0) {
//       filtered = filtered.filter((recipe) =>
//         selectedDietary.every((diet) =>
//           recipe.tags.some(
//             (tag) => tag.name.toLowerCase() === diet.toLowerCase(),
//           ),
//         ),
//       );
//     }

//     // Calorie range filter
//     filtered = filtered.filter(
//       (recipe) =>
//         recipe.calories &&
//         recipe.calories >= calorieRange[0] &&
//         recipe.calories <= calorieRange[1],
//     );

//     // Cook time filter
//     filtered = filtered.filter(
//       (recipe) =>
//         recipe.prepTime + recipe.cookTime >= cookTimeRange[0] &&
//         recipe.prepTime + recipe.cookTime <= cookTimeRange[1],
//     );

//     // Sort
//     switch (sortBy) {
//       case "popular":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case "quick":
//         filtered.sort(
//           (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime),
//         );
//         break;
//       case "healthy":
//         filtered.sort((a, b) => (a.calories || 0) - (b.calories || 0));
//         break;
//       case "newest":
//         // In real app, sort by date
//         break;
//     }

//     setRecipes(filtered);
//   }, [
//     searchQuery,
//     selectedCuisine,
//     selectedDifficulty,
//     selectedDietary,
//     calorieRange,
//     cookTimeRange,
//     sortBy,
//   ]);

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedCuisine("All");
//     setSelectedDifficulty("All");
//     setSelectedDietary([]);
//     setCalorieRange([0, 1000]);
//     setCookTimeRange([0, 120]);
//     setSortBy("popular");
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">Discover Recipes</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Find the perfect recipe for any occasion
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <div className="mb-8 space-y-4">
//           {/* Search Bar */}
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <Input
//                 placeholder="Search recipes, ingredients, or tags..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 h-12 text-lg"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   <X className="h-5 w-5 text-gray-400" />
//                 </button>
//               )}
//             </div>
//             <Button
//               variant={showFilters ? "default" : "outline"}
//               onClick={() => setShowFilters(!showFilters)}
//               className="h-12 px-4"
//             >
//               <SlidersHorizontal className="h-5 w-5 mr-2" />
//               Filters
//               {(selectedCuisine !== "All" ||
//                 selectedDifficulty !== "All" ||
//                 selectedDietary.length > 0) && (
//                 <Badge className="ml-2 bg-pink-500">!</Badge>
//               )}
//             </Button>
//             <div className="flex border rounded-lg">
//               <Button
//                 variant={viewMode === "grid" ? "default" : "ghost"}
//                 size="icon"
//                 onClick={() => setViewMode("grid")}
//                 className="rounded-r-none"
//               >
//                 <Grid3X3 className="h-5 w-5" />
//               </Button>
//               <Button
//                 variant={viewMode === "list" ? "default" : "ghost"}
//                 size="icon"
//                 onClick={() => setViewMode("list")}
//                 className="rounded-l-none"
//               >
//                 <List className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Quick Filters */}
//           <div className="flex flex-wrap gap-2">
//             {cuisines.slice(0, 5).map((cuisine) => (
//               <Badge
//                 key={cuisine}
//                 variant={selectedCuisine === cuisine ? "default" : "outline"}
//                 className="cursor-pointer hover:bg-pink-50 transition-colors"
//                 onClick={() =>
//                   setSelectedCuisine(
//                     cuisine === selectedCuisine ? "All" : cuisine,
//                   )
//                 }
//               >
//                 {cuisine}
//               </Badge>
//             ))}
//             {selectedCuisine !== "All" && (
//               <Badge
//                 variant="destructive"
//                 className="cursor-pointer"
//                 onClick={() => setSelectedCuisine("All")}
//               >
//                 Clear <X className="h-3 w-3 ml-1" />
//               </Badge>
//             )}
//           </div>

//           {/* Advanced Filters */}
//           {showFilters && (
//             <Card className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold">Advanced Filters</h3>
//                 <Button variant="ghost" size="sm" onClick={clearFilters}>
//                   Clear All Filters
//                 </Button>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {/* Cuisine Filter */}
//                 <div>
//                   <label className="text-sm font-medium mb-2 block">
//                     Cuisine
//                   </label>
//                   <select
//                     value={selectedCuisine}
//                     onChange={(e) => setSelectedCuisine(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                   >
//                     {cuisines.map((cuisine) => (
//                       <option key={cuisine} value={cuisine}>
//                         {cuisine}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Difficulty Filter */}
//                 <div>
//                   <label className="text-sm font-medium mb-2 block">
//                     Difficulty
//                   </label>
//                   <div className="flex gap-2">
//                     {difficulties.map((difficulty) => (
//                       <Badge
//                         key={difficulty}
//                         variant={
//                           selectedDifficulty === difficulty
//                             ? "default"
//                             : "outline"
//                         }
//                         className="cursor-pointer"
//                         onClick={() =>
//                           setSelectedDifficulty(
//                             difficulty === selectedDifficulty
//                               ? "All"
//                               : difficulty,
//                           )
//                         }
//                       >
//                         {difficulty}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Dietary Filters */}
//                 <div>
//                   <label className="text-sm font-medium mb-2 block">
//                     Dietary Preferences
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {dietaryOptions.map((diet) => (
//                       <Badge
//                         key={diet}
//                         variant={
//                           selectedDietary.includes(diet) ? "default" : "outline"
//                         }
//                         className="cursor-pointer"
//                         onClick={() => {
//                           setSelectedDietary((prev) =>
//                             prev.includes(diet)
//                               ? prev.filter((d) => d !== diet)
//                               : [...prev, diet],
//                           );
//                         }}
//                       >
//                         {diet}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Sort By */}
//                 <div>
//                   <label className="text-sm font-medium mb-2 block">
//                     Sort By
//                   </label>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full p-2 border rounded-md"
//                   >
//                     <option value="popular">Most Popular</option>
//                     <option value="quick">Quickest</option>
//                     <option value="healthy">Healthiest</option>
//                     <option value="newest">Newest</option>
//                   </select>
//                 </div>

//                 {/* Calorie Range */}
//                 <div className="md:col-span-2">
//                   <label className="text-sm font-medium mb-2 block">
//                     Calories: {calorieRange[0]} - {calorieRange[1]} cal
//                   </label>
//                   <Slider
//                     value={calorieRange}
//                     onValueChange={setCalorieRange}
//                     min={0}
//                     max={1000}
//                     step={50}
//                     className="mt-2"
//                   />
//                 </div>

//                 {/* Cook Time Range */}
//                 <div className="md:col-span-2">
//                   <label className="text-sm font-medium mb-2 block">
//                     Cook Time: {cookTimeRange[0]} - {cookTimeRange[1]} min
//                   </label>
//                   <Slider
//                     value={cookTimeRange}
//                     onValueChange={setCookTimeRange}
//                     min={0}
//                     max={120}
//                     step={15}
//                     className="mt-2"
//                   />
//                 </div>
//               </div>
//             </Card>
//           )}
//         </div>

//         {/* AI Suggestion Banner */}
//         <Card className="p-6 mb-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-bold mb-1">Not sure what to cook?</h3>
//               <p className="text-pink-100">
//                 Let our AI suggest recipes based on your preferences
//               </p>
//             </div>
//             <Button variant="secondary" size="lg">
//               <Sparkles className="mr-2 h-5 w-5" />
//               Get Suggestions
//             </Button>
//           </div>
//         </Card>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600 dark:text-gray-400">
//             Showing <span className="font-semibold">{recipes.length}</span>{" "}
//             recipes
//           </p>
//         </div>

//         {/* Recipe Grid/List */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
//           </div>
//         ) : recipes.length > 0 ? (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 : "space-y-4"
//             }
//           >
//             {recipes.map((recipe) => (
//               <div key={recipe.id}>
//                 <RecipeCard
//                   recipe={recipe}
//                   // recipe={recipeData}
//                   isFavorite={favorites.has(recipe.id)}
//                   onToggleFavorite={() => {
//                     setFavorites((prev) => {
//                       const newFavs = new Set(prev);
//                       if (newFavs.has(recipe.id)) {
//                         newFavs.delete(recipe.id);
//                       } else {
//                         newFavs.add(recipe.id);
//                       }
//                       return newFavs;
//                     });
//                   }}
//                   viewMode={viewMode}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <p className="text-xl text-gray-500 mb-4">No recipes found</p>
//             <p className="text-gray-400 mb-6">
//               Try adjusting your filters or search terms
//             </p>
//             <Button onClick={clearFilters} variant="outline">
//               Clear All Filters
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
