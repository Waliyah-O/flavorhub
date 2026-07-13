"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Star,
  Flame,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RecipeCardProps {
  recipe: {
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
  };
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  viewMode?: "grid" | "list";
  className?: string;
}

export function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
  viewMode = "grid",
  className,
}: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToMealPlan, setIsAddedToMealPlan] = useState(false);

  const totalTime = recipe.prepTime + recipe.cookTime;

  // Grid View
  if (viewMode === "grid") {
    return (
      <Card
        className={cn(
          "group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110",
            )}
          />

          {/* Overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 right-2 z-10 transition-all duration-300",
              isFavorite
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-white/80 hover:bg-white",
            )}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.();
            }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all",
                isFavorite && "fill-current",
              )}
            />
          </Button>

          {/* Quick Actions on Hover */}
          <div
            className={cn(
              "absolute bottom-2 left-2 right-2 flex gap-2 transition-all duration-300",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
          >
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.preventDefault();
                setIsAddedToMealPlan(!isAddedToMealPlan);
              }}
            >
              {isAddedToMealPlan ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 mr-1" />
                  Meal Plan
                </>
              )}
            </Button>
          </div>

          {/* Cuisine Badge */}
          <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
            {recipe.cuisine}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{recipe.rating}</span>
          </div>

          {/* Title */}
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="text-lg font-semibold mb-2 line-clamp-1 hover:text-pink-500 transition-colors">
              {recipe.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {recipe.description}
          </p>

          {/* Recipe Info Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 text-pink-500" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 text-pink-500" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <ChefHat className="h-4 w-4 text-pink-500" />
              <span>{recipe.difficulty}</span>
            </div>
            {recipe.calories && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Flame className="h-4 w-4 text-pink-500" />
                <span>{recipe.calories} cal</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* View Recipe Button */}
          <Link href={`/recipes/${recipe.id}`}>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 group">
              View Recipe
              <ChefHat className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  // List View
  return (
    <Card
      className={cn(
        "group overflow-hidden hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative w-48 h-36 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800 text-xs">
            {recipe.cuisine}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{recipe.rating}</span>
                </div>
              </div>
              <Link href={`/recipes/${recipe.id}`}>
                <h3 className="text-lg font-semibold hover:text-pink-500 transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
              </Link>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={isFavorite ? "text-pink-500" : ""}
              onClick={onToggleFavorite}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {totalTime} min
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings} servings
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.difficulty}
            </div>
            {recipe.calories && (
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                {recipe.calories} cal
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <Link href={`/recipes/${recipe.id}`} className="ml-auto">
              <Button size="sm" variant="outline">
                View Recipe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

// import Image from "next/image";
// import { Clock, Users, ChefHat, Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// interface RecipeCardProps {
//   recipe: {
//     id: string;
//     title: string;
//     description: string;
//     imageUrl?: string;
//     prepTime: number;
//     cookTime: number;
//     servings: number;
//     difficulty: string;
//     cuisine: string;
//     calories?: number;
//     tags: Array<{ name: string }>;
//   };
// }

// export function RecipeCard({ recipe }: RecipeCardProps) {
//   return (
//     <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="relative h-48 overflow-hidden">
//         <Image
//           src={recipe.imageUrl || "/placeholder-recipe.jpg"}
//           alt={recipe.title}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-300"
//         />
//         <div className="absolute top-2 right-2">
//           <Button
//             size="icon"
//             variant="ghost"
//             className="bg-white/80 hover:bg-white"
//           >
//             <Heart className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
//           <Badge variant="secondary" className="bg-pink-500 text-white">
//             {recipe.cuisine}
//           </Badge>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2 line-clamp-1">
//           {recipe.title}
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
//           {recipe.description}
//         </p>

//         <div className="grid grid-cols-2 gap-2 mb-3">
//           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//             <Clock className="h-4 w-4 mr-1" />
//             {recipe.prepTime + recipe.cookTime} min
//           </div>
//           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//             <Users className="h-4 w-4 mr-1" />
//             {recipe.servings} servings
//           </div>
//           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//             <ChefHat className="h-4 w-4 mr-1" />
//             {recipe.difficulty}
//           </div>
//           {recipe.calories && (
//             <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//               🔥 {recipe.calories} cal
//             </div>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-1 mb-3">
//           {recipe.tags.map((tag) => (
//             <Badge key={tag.name} variant="outline" className="text-xs">
//               {tag.name}
//             </Badge>
//           ))}
//         </div>

//         <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
//           View Recipe
//         </Button>
//       </div>
//     </div>
//   );
// }
