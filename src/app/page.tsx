"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Utensils,
  Sparkles,
  ShoppingCart,
  BarChart3,
  Clock,
  Users,
  ChefHat,
  Heart,
  Star,
  Search,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Globe,
  Zap,
  Flame,
  TrendingUp,
  Award,
  Quote,
  ChevronRight,
  Play,
  // Instagram,
  // Twitter,
  // Facebook,
  // Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { RecipeImage } from "@/components/recipe/recipe-image";

const featuredRecipes = [
  {
    id: "1",
    title: "Mediterranean Grilled Salmon",
    description:
      "Fresh Atlantic salmon with herbs, lemon, and olive oil. A healthy and delicious dinner option.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    calories: 450,
    rating: 4.8,
    reviews: 234,
    tags: ["Healthy", "High Protein", "Gluten-Free"],
    isPopular: true,
    isNew: false,
  },
  {
    id: "2",
    title: "Vegetarian Buddha Bowl",
    description:
      "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Asian Fusion",
    calories: 380,
    rating: 4.6,
    reviews: 178,
    tags: ["Vegetarian", "Vegan", "High Fiber"],
    isPopular: false,
    isNew: true,
  },
  {
    id: "3",
    title: "Classic Italian Margherita Pizza",
    description:
      "Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
    calories: 680,
    rating: 4.9,
    reviews: 312,
    tags: ["Italian", "Classic", "Family-Friendly"],
    isPopular: true,
    isNew: false,
  },
];

const categories = [
  {
    name: "Quick & Easy",
    icon: Clock,
    color: "from-orange-500 to-red-500",
    count: 245,
    description: "Ready in 30 minutes or less",
  },
  {
    name: "Healthy",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    count: 189,
    description: "Nutritious and balanced meals",
  },
  {
    name: "International",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    count: 312,
    description: "Flavors from around the world",
  },
  {
    name: "Meal Prep",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    count: 156,
    description: "Cook once, eat all week",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Meal Planning",
    description:
      "Get personalized meal plans based on your dietary preferences, allergies, and calorie goals.",
    color: "from-pink-500 to-rose-500",
    stats: "Save 5+ hours weekly",
  },
  {
    icon: BarChart3,
    title: "Nutritional Tracking",
    description:
      "Track your daily macros, calories, and nutrients with detailed nutritional information for every recipe.",
    color: "from-blue-500 to-cyan-500",
    stats: "Track 30+ nutrients",
  },
  {
    icon: ShoppingCart,
    title: "Smart Shopping Lists",
    description:
      "Automatically generate organized shopping lists from your meal plans and favorite recipes.",
    color: "from-green-500 to-emerald-500",
    stats: "Save 20% on groceries",
  },
  {
    icon: ChefHat,
    title: "Video Tutorials",
    description:
      "Learn cooking techniques with step-by-step video guides from professional chefs.",
    color: "from-purple-500 to-violet-500",
    stats: "500+ HD videos",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Cook",
    content:
      "FlavorHub has completely transformed how I plan my meals. The AI meal planner saves me hours every week!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 5,
    location: "New York, USA",
  },
  {
    name: "Mike Chen",
    role: "Fitness Enthusiast",
    content:
      "The nutritional tracking is incredible. I can finally hit my macros without spending hours calculating everything.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 5,
    location: "San Francisco, USA",
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Parent",
    content:
      "Shopping lists generated from meal plans have made grocery shopping so much easier. Total game-changer!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rating: 4,
    location: "Austin, USA",
  },
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (recipeId: string) => {
    setLikedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <Badge className="bg-linear-to-r from-pink-500 to-rose-500 text-white px-4 py-2 text-sm shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  New: AI-Powered Meal Planning
                </Badge>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up animation-delay-200">
                Discover, Cook &
                <span className="block mt-2 bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Savor Delicious
                </span>
                Recipes
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl animate-fade-in-up animation-delay-400">
                Your intelligent recipe platform with AI-powered meal planning,
                nutritional insights, and smart shopping lists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <Link href="/meal-planner">
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Meal Planning
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-2 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 hover:scale-105 group"
                  >
                    Browse Recipes
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 animate-fade-in-up animation-delay-800">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-pink-400 to-rose-400 shadow-lg"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Loved by 10,000+ home cooks
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-400 ">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop"
                  alt="Delicious food"
                  width={600}
                  height={400}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold">
                    Mediterranean Grilled Salmon
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 flex items-center gap-2 animate-float   z-100">
                <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">450 kcal</p>
                  <p className="text-xs text-gray-500">Per serving</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 flex items-center gap-2 animate-float animation-delay-2000   z-100">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">4.8 Rating</p>
                  <p className="text-xs text-gray-500">234 reviews</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-pink-500 to-rose-500 rounded-full opacity-20   z-100" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full opacity-20   z-100" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-linear-to-r from-pink-500 to-rose-500 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "50K+", label: "Recipes", icon: Utensils },
              { value: "1M+", label: "Meals Planned", icon: TrendingUp },
              { value: "4.9/5", label: "User Rating", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-75" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="outline">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Master Cooking
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features to simplify your cooking journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.color}" />
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-pink-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {feature.stats}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="outline">
              Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find the perfect recipe for any occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                href={`/recipes?category=${category.name.toLowerCase()}`}
                key={index}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${category.color}" />
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {category.description}
                  </p>
                  <Badge variant="secondary">{category.count} recipes</Badge>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Badge className="mb-4" variant="outline">
                Popular
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trending Recipes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Most loved by our community
              </p>
            </div>
            <Link href="/recipes">
              <Button
                variant="outline"
                className="hidden md:flex group hover:border-pink-500 hover:text-pink-500"
              >
                View All Recipes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <RecipeImage
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  /> */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {recipe.isPopular && (
                      <Badge className="bg-orange-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {recipe.isNew && (
                      <Badge className="bg-green-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>

                  {/* Like Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-all duration-300 ${
                      likedRecipes.has(recipe.id)
                        ? "text-pink-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => toggleLike(recipe.id)}
                  >
                    <Heart
                      className={`h-4 w-4 transition-transform ${
                        likedRecipes.has(recipe.id)
                          ? "fill-pink-500 scale-110"
                          : "group-hover:scale-110"
                      }`}
                    />
                  </Button>

                  {/* Cuisine Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-800">
                      {recipe.cuisine}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {recipe.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({recipe.reviews})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {recipe.prepTime + recipe.cookTime} min
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-pink-500 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-pink-500" />
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-pink-500" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-4 w-4 text-pink-500" />
                      {recipe.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-pink-500" />
                      {recipe.calories} cal
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {recipe.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{recipe.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/recipes/${recipe.id}`}>
                    <Button className="w-full bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 group/button">
                      View Recipe
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/recipes">
              <Button variant="outline">
                View All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-linear-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="outline">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your journey to better cooking begins here
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Set Your Preferences",
                description:
                  "Tell us about your dietary needs, allergies, and taste preferences.",
                icon: CheckCircle2,
              },
              {
                step: "2",
                title: "Get AI Recommendations",
                description:
                  "Our AI creates personalized meal plans and recipe suggestions.",
                icon: Sparkles,
              },
              {
                step: "3",
                title: "Cook & Enjoy",
                description:
                  "Follow step-by-step instructions and track your nutrition.",
                icon: Utensils,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="relative inline-block">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="outline">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied home cooks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="p-8 md:p-12">
                <Quote className="h-12 w-12 text-pink-500 mb-6 opacity-50" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ),
                  )}
                </div>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                  "{testimonials[activeTestimonial].content}"
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeTestimonial].role} •{" "}
                      {testimonials[activeTestimonial].location}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-pink-500 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-pink-500 via-rose-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join FlavorHub today and discover a smarter way to plan, cook, and
            enjoy delicious meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/meal-planner">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white border-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Explore Recipes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-pink-500 to-rose-500">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">FlavorHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your intelligent recipe discovery platform.
              </p>
              <div className="flex gap-3">
                {["Instagram", "Twitter", "Facebook", "Youtube"].map(
                  (Icon, index) => (
                    // {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
                    >
                      {/* className="h-5 w-5"  */}
                      <Icon />
                    </a>
                  ),
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/meal-planner"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Meal Planning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipes"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Recipe Discovery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shopping-list"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Shopping Lists
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nutrition"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Nutrition Tracking
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-pink-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-pink-500 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@flavorhub.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                &copy; 2024 FlavorHub. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <Link
                  href="#"
                  className="hover:text-pink-500 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-500 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-500 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Utensils,
//   Sparkles,
//   ShoppingCart,
//   BarChart3,
//   Clock,
//   Users,
//   ChefHat,
//   Heart,
//   Star,
//   Search,
//   ArrowRight,
//   CheckCircle2,
//   Leaf,
//   Globe,
//   Zap,
// } from "lucide-react";

// const featuredRecipes = [
//   {
//     id: "1",
//     title: "Mediterranean Grilled Salmon",
//     description:
//       "Fresh Atlantic salmon with herbs, lemon, and olive oil. A healthy and delicious dinner option.",
//     image: "/api/placeholder/400/300",
//     prepTime: 15,
//     cookTime: 20,
//     servings: 4,
//     difficulty: "Medium",
//     cuisine: "Mediterranean",
//     calories: 450,
//     rating: 4.8,
//     tags: ["Healthy", "High Protein", "Gluten-Free"],
//   },
//   {
//     id: "2",
//     title: "Vegetarian Buddha Bowl",
//     description:
//       "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
//     image: "/api/placeholder/400/300",
//     prepTime: 20,
//     cookTime: 25,
//     servings: 2,
//     difficulty: "Easy",
//     cuisine: "Asian Fusion",
//     calories: 380,
//     rating: 4.6,
//     tags: ["Vegetarian", "Vegan", "High Fiber"],
//   },
//   {
//     id: "3",
//     title: "Classic Italian Margherita Pizza",
//     description:
//       "Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
//     image: "/api/placeholder/400/300",
//     prepTime: 30,
//     cookTime: 15,
//     servings: 4,
//     difficulty: "Medium",
//     cuisine: "Italian",
//     calories: 680,
//     rating: 4.9,
//     tags: ["Italian", "Classic", "Family-Friendly"],
//   },
// ];

// const categories = [
//   {
//     name: "Quick & Easy",
//     icon: Clock,
//     color: "from-orange-500 to-red-500",
//     count: 245,
//   },
//   {
//     name: "Healthy",
//     icon: Leaf,
//     color: "from-green-500 to-emerald-500",
//     count: 189,
//   },
//   {
//     name: "International",
//     icon: Globe,
//     color: "from-blue-500 to-cyan-500",
//     count: 312,
//   },
//   {
//     name: "Meal Prep",
//     icon: Zap,
//     color: "from-purple-500 to-pink-500",
//     count: 156,
//   },
// ];

// const features = [
//   {
//     icon: Sparkles,
//     title: "AI-Powered Meal Planning",
//     description:
//       "Get personalized meal plans based on your dietary preferences, allergies, and calorie goals.",
//     color: "from-pink-500 to-rose-500",
//   },
//   {
//     icon: BarChart3,
//     title: "Nutritional Tracking",
//     description:
//       "Track your daily macros, calories, and nutrients with detailed nutritional information for every recipe.",
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     icon: ShoppingCart,
//     title: "Smart Shopping Lists",
//     description:
//       "Automatically generate organized shopping lists from your meal plans and favorite recipes.",
//     color: "from-green-500 to-emerald-500",
//   },
//   {
//     icon: ChefHat,
//     title: "Video Tutorials",
//     description:
//       "Learn cooking techniques with step-by-step video guides from professional chefs.",
//     color: "from-purple-500 to-violet-500",
//   },
// ];

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Home Cook",
//     content:
//       "FlavorHub has completely transformed how I plan my meals. The AI meal planner saves me hours every week!",
//     avatar: "/api/placeholder/100/100",
//     rating: 5,
//   },
//   {
//     name: "Mike Chen",
//     role: "Fitness Enthusiast",
//     content:
//       "The nutritional tracking is incredible. I can finally hit my macros without spending hours calculating everything.",
//     avatar: "/api/placeholder/100/100",
//     rating: 5,
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Busy Parent",
//     content:
//       "Shopping lists generated from meal plans have made grocery shopping so much easier. Total game-changer!",
//     avatar: "/api/placeholder/100/100",
//     rating: 4,
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-linear-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5" />
//         <div className="container mx-auto px-4 py-20 md:py-32">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <Badge className="bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400 px-4 py-2 text-sm">
//                 🎉 New: AI-Powered Meal Planning
//               </Badge>
//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
//                 Discover, Cook &
//                 <span className="block bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
//                   Savor Delicious
//                 </span>
//                 Recipes
//               </h1>
//               <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
//                 Your intelligent recipe platform with AI-powered meal planning,
//                 nutritional insights, and smart shopping lists.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link href="/meal-planner">
//                   <Button
//                     size="lg"
//                     className="bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8"
//                   >
//                     <Sparkles className="mr-2 h-5 w-5" />
//                     Start Meal Planning
//                   </Button>
//                 </Link>
//                 <Link href="/recipes">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="text-lg px-8 border-2"
//                   >
//                     Browse Recipes
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Button>
//                 </Link>
//               </div>

//               <div className="flex items-center gap-8 pt-4">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-pink-400 to-rose-400"
//                     />
//                   ))}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className="h-4 w-4 fill-yellow-400 text-yellow-400"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Loved by 10,000+ home cooks
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
//                 <Image
//                   src="/api/placeholder/600/400"
//                   alt="Delicious food"
//                   width={600}
//                   height={400}
//                   className="w-full h-auto"
//                 />
//               </div>
//               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-pink-500 to-rose-500 rounded-full opacity-20" />
//               <div className="absolute -top-6 -left-6 w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full opacity-20" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Everything You Need to
//               <span className="bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
//                 {" "}
//                 Master Cooking
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Powerful features to simplify your cooking journey
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="p-6 hover:shadow-xl transition-all duration-300 group"
//               >
//                 <div
//                   className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
//                 >
//                   <feature.icon className="h-7 w-7 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {feature.description}
//                 </p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Browse by Category
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Find the perfect recipe for any occasion
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {categories.map((category, index) => (
//               <Link
//                 href={`/recipes?category=${category.name.toLowerCase()}`}
//                 key={index}
//               >
//                 <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center">
//                   <div
//                     className={`w-16 h-16 mx-auto rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
//                   >
//                     <category.icon className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-lg font-semibold mb-1">
//                     {category.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {category.count} recipes
//                   </p>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Recipes Section */}
//       <section className="py-20 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-end mb-12">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Popular Recipes
//               </h2>
//               <p className="text-xl text-gray-600 dark:text-gray-300">
//                 Most loved by our community
//               </p>
//             </div>
//             <Link href="/recipes">
//               <Button variant="outline" className="hidden md:flex">
//                 View All Recipes
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredRecipes.map((recipe) => (
//               <Card
//                 key={recipe.id}
//                 className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <Image
//                     src={recipe.image}
//                     alt={recipe.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute top-3 right-3">
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       className="bg-white/80 hover:bg-white"
//                     >
//                       <Heart className="h-4 w-4" />
//                     </Button>
//                   </div>
//                   <div className="absolute bottom-3 left-3">
//                     <Badge className="bg-white/90 text-gray-800">
//                       {recipe.cuisine}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <div className="flex items-center gap-1 mb-2">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-medium">{recipe.rating}</span>
//                   </div>

//                   <h3 className="text-lg font-semibold mb-2 line-clamp-1">
//                     {recipe.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
//                     {recipe.description}
//                   </p>

//                   <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" />
//                       {recipe.prepTime + recipe.cookTime} min
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="h-4 w-4" />
//                       {recipe.servings} servings
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <ChefHat className="h-4 w-4" />
//                       {recipe.difficulty}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       🔥 {recipe.calories} cal
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {recipe.tags.map((tag) => (
//                       <Badge key={tag} variant="secondary" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>

//                   <Link href={`/recipes/${recipe.id}`}>
//                     <Button className="w-full bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
//                       View Recipe
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           <div className="mt-8 text-center md:hidden">
//             <Link href="/recipes">
//               <Button variant="outline">
//                 View All Recipes
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 bg-linear-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Get started in three simple steps
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {[
//               {
//                 step: "1",
//                 title: "Set Your Preferences",
//                 description:
//                   "Tell us about your dietary needs, allergies, and taste preferences.",
//                 icon: CheckCircle2,
//               },
//               {
//                 step: "2",
//                 title: "Get AI Recommendations",
//                 description:
//                   "Our AI creates personalized meal plans and recipe suggestions.",
//                 icon: Sparkles,
//               },
//               {
//                 step: "3",
//                 title: "Cook & Enjoy",
//                 description:
//                   "Follow step-by-step instructions and track your nutrition.",
//                 icon: Utensils,
//               },
//             ].map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-bold">
//                   {step.step}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {step.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               What Our Users Say
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Join thousands of satisfied home cooks
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <Card key={index} className="p-6">
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-5 w-5 fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
//                   "{testimonial.content}"
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-rose-400" />
//                   <div>
//                     <p className="font-semibold">{testimonial.name}</p>
//                     <p className="text-sm text-gray-500">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-linear-to-r from-pink-500 to-rose-500">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to Transform Your Cooking?
//           </h2>
//           <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
//             Join FlavorHub today and discover a smarter way to plan, cook, and
//             enjoy delicious meals.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/meal-planner">
//               <Button size="lg" variant="secondary" className="text-lg px-8">
//                 <Sparkles className="mr-2 h-5 w-5" />
//                 Start Free Trial
//               </Button>
//             </Link>
//             <Link href="/recipes">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="text-lg px-8 text-white border-white hover:bg-white/20"
//               >
//                 Explore Recipes
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-pink-500 to-rose-500">
//                   <Utensils className="h-5 w-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">FlavorHub</span>
//               </div>
//               <p className="text-gray-400">
//                 Your intelligent recipe discovery platform.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Features</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Meal Planning</li>
//                 <li>Recipe Discovery</li>
//                 <li>Shopping Lists</li>
//                 <li>Nutrition Tracking</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>About Us</li>
//                 <li>Blog</li>
//                 <li>Careers</li>
//                 <li>Contact</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Privacy Policy</li>
//                 <li>Terms of Service</li>
//                 <li>Cookie Policy</li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 FlavorHub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
