import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const featuredRecipes = [
  {
    id: "1",
    title: "Mediterranean Grilled Salmon",
    description:
      "Fresh Atlantic salmon with herbs, lemon, and olive oil. A healthy and delicious dinner option.",
    image: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    calories: 450,
    rating: 4.8,
    tags: ["Healthy", "High Protein", "Gluten-Free"],
  },
  {
    id: "2",
    title: "Vegetarian Buddha Bowl",
    description:
      "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
    image: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Asian Fusion",
    calories: 380,
    rating: 4.6,
    tags: ["Vegetarian", "Vegan", "High Fiber"],
  },
  {
    id: "3",
    title: "Classic Italian Margherita Pizza",
    description:
      "Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    image: "/api/placeholder/400/300",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
    calories: 680,
    rating: 4.9,
    tags: ["Italian", "Classic", "Family-Friendly"],
  },
];

const categories = [
  {
    name: "Quick & Easy",
    icon: Clock,
    color: "from-orange-500 to-red-500",
    count: 245,
  },
  {
    name: "Healthy",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    count: 189,
  },
  {
    name: "International",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    count: 312,
  },
  {
    name: "Meal Prep",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    count: 156,
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Meal Planning",
    description:
      "Get personalized meal plans based on your dietary preferences, allergies, and calorie goals.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Nutritional Tracking",
    description:
      "Track your daily macros, calories, and nutrients with detailed nutritional information for every recipe.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShoppingCart,
    title: "Smart Shopping Lists",
    description:
      "Automatically generate organized shopping lists from your meal plans and favorite recipes.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: ChefHat,
    title: "Video Tutorials",
    description:
      "Learn cooking techniques with step-by-step video guides from professional chefs.",
    color: "from-purple-500 to-violet-500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Cook",
    content:
      "FlavorHub has completely transformed how I plan my meals. The AI meal planner saves me hours every week!",
    avatar: "/api/placeholder/100/100",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Fitness Enthusiast",
    content:
      "The nutritional tracking is incredible. I can finally hit my macros without spending hours calculating everything.",
    avatar: "/api/placeholder/100/100",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Parent",
    content:
      "Shopping lists generated from meal plans have made grocery shopping so much easier. Total game-changer!",
    avatar: "/api/placeholder/100/100",
    rating: 4,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400 px-4 py-2 text-sm">
                🎉 New: AI-Powered Meal Planning
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Discover, Cook &
                <span className="block bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Savor Delicious
                </span>
                Recipes
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Your intelligent recipe platform with AI-powered meal planning,
                nutritional insights, and smart shopping lists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/meal-planner">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Meal Planning
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-2"
                  >
                    Browse Recipes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-400"
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loved by 10,000+ home cooks
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Delicious food"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full opacity-20" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                {" "}
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
                className="p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find the perfect recipe for any occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                href={`/recipes?category=${category.name.toLowerCase()}`}
                key={index}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} recipes
                  </p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Recipes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Most loved by our community
              </p>
            </div>
            <Link href="/recipes">
              <Button variant="outline" className="hidden md:flex">
                View All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-800">
                      {recipe.cuisine}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-4 w-4" />
                      {recipe.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      🔥 {recipe.calories} cal
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/recipes/${recipe.id}`}>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                      View Recipe
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
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in three simple steps
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
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-bold">
                  {step.step}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied home cooks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join FlavorHub today and discover a smarter way to plan, cook, and
            enjoy delicious meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/meal-planner">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white border-white hover:bg-white/20"
              >
                Explore Recipes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">FlavorHub</span>
              </div>
              <p className="text-gray-400">
                Your intelligent recipe discovery platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Meal Planning</li>
                <li>Recipe Discovery</li>
                <li>Shopping Lists</li>
                <li>Nutrition Tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FlavorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
