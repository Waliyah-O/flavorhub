"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Plus,
  Trash2,
  Search,
  Download,
  Share2,
  Printer,
  Edit3,
  Check,
  X,
  Minus,
  ChevronDown,
  ChevronUp,
  Filter,
  SortAsc,
  Sparkles,
  UtensilsCrossed,
  Apple,
  Beef,
  Wheat,
  Milk,
  Fish,
  Cookie,
  GlassWater,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  isPurchased: boolean;
  price?: number;
  notes?: string;
  recipeSource?: string;
}

interface ShoppingCategory {
  name: string;
  icon: any;
  color: string;
}

const categories: ShoppingCategory[] = [
  { name: "Produce", icon: Apple, color: "text-green-500" },
  { name: "Meat & Seafood", icon: Beef, color: "text-red-500" },
  { name: "Dairy & Eggs", icon: Milk, color: "text-blue-500" },
  { name: "Bakery", icon: Wheat, color: "text-yellow-500" },
  { name: "Pantry", icon: Package, color: "text-orange-500" },
  { name: "Frozen", icon: Cookie, color: "text-cyan-500" },
  { name: "Beverages", icon: GlassWater, color: "text-purple-500" },
  { name: "Other", icon: ShoppingCart, color: "text-gray-500" },
];

// Sample shopping list
const sampleShoppingList: ShoppingItem[] = [
  // Produce
  {
    id: "1",
    name: "Cherry Tomatoes",
    quantity: 2,
    unit: "cups",
    category: "Produce",
    isPurchased: false,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "2",
    name: "Zucchini",
    quantity: 2,
    unit: "pieces",
    category: "Produce",
    isPurchased: false,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "3",
    name: "Red Bell Pepper",
    quantity: 1,
    unit: "piece",
    category: "Produce",
    isPurchased: true,
  },
  {
    id: "4",
    name: "Red Onion",
    quantity: 1,
    unit: "piece",
    category: "Produce",
    isPurchased: false,
  },
  {
    id: "5",
    name: "Lemon",
    quantity: 2,
    unit: "pieces",
    category: "Produce",
    isPurchased: false,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "6",
    name: "Fresh Parsley",
    quantity: 0.25,
    unit: "cup",
    category: "Produce",
    isPurchased: false,
  },
  {
    id: "7",
    name: "Fresh Dill",
    quantity: 2,
    unit: "tbsp",
    category: "Produce",
    isPurchased: false,
  },
  {
    id: "8",
    name: "Garlic Cloves",
    quantity: 4,
    unit: "pieces",
    category: "Produce",
    isPurchased: true,
  },

  // Meat & Seafood
  {
    id: "9",
    name: "Salmon Fillets",
    quantity: 4,
    unit: "pieces",
    category: "Meat & Seafood",
    isPurchased: false,
    price: 24.99,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "10",
    name: "Chicken Breast",
    quantity: 2,
    unit: "lbs",
    category: "Meat & Seafood",
    isPurchased: false,
    price: 8.99,
    recipeSource: "Weekly Meal Plan",
  },

  // Dairy & Eggs
  {
    id: "11",
    name: "Butter",
    quantity: 2,
    unit: "tbsp",
    category: "Dairy & Eggs",
    isPurchased: true,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "12",
    name: "Greek Yogurt",
    quantity: 1,
    unit: "cup",
    category: "Dairy & Eggs",
    isPurchased: false,
    recipeSource: "Breakfast Smoothie",
  },

  // Pantry
  {
    id: "13",
    name: "Olive Oil",
    quantity: 3,
    unit: "tbsp",
    category: "Pantry",
    isPurchased: true,
  },
  {
    id: "14",
    name: "Dijon Mustard",
    quantity: 1,
    unit: "tbsp",
    category: "Pantry",
    isPurchased: false,
    recipeSource: "Mediterranean Salmon",
  },
  {
    id: "15",
    name: "Salt",
    quantity: 1,
    unit: "tsp",
    category: "Pantry",
    isPurchased: true,
  },
  {
    id: "16",
    name: "Black Pepper",
    quantity: 0.5,
    unit: "tsp",
    category: "Pantry",
    isPurchased: true,
  },
  {
    id: "17",
    name: "Quinoa",
    quantity: 2,
    unit: "cups",
    category: "Pantry",
    isPurchased: false,
    recipeSource: "Buddha Bowl",
  },
];

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(sampleShoppingList);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "piece",
    category: "Other",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    name: "",
    quantity: 1,
    unit: "piece",
  });

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, ShoppingItem[]>,
  );

  // Filter items
  const filterItems = (categoryItems: ShoppingItem[]) => {
    let filtered = categoryItems;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.recipeSource?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  };

  // Calculate totals
  const totalItems = items.length;
  const purchasedItems = items.filter((item) => item.isPurchased).length;
  const progressPercentage =
    totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;

  const estimatedTotal = items
    .filter((item) => item.price)
    .reduce((sum, item) => sum + (item.price || 0), 0);

  // Toggle item purchased
  const toggleItem = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, isPurchased: !item.isPurchased } : item,
      ),
    );
  };

  // Add new item
  const addItem = () => {
    if (!newItem.name.trim()) return;

    const item: ShoppingItem = {
      id: Date.now().toString(),
      ...newItem,
      isPurchased: false,
    };

    setItems([...items, item]);
    setNewItem({ name: "", quantity: 1, unit: "piece", category: "Other" });
    setShowAddForm(false);
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Update item
  const updateItem = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, ...editValues } : item,
      ),
    );
    setEditingItem(null);
  };

  // Clear purchased items
  const clearPurchased = () => {
    setItems(items.filter((item) => !item.isPurchased));
  };

  // Toggle category collapse
  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Generate shopping list from meal plan
  const generateFromMealPlan = () => {
    console.log("Generating from meal plan...");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-pink-500" />
              Shopping List
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {purchasedItems} of {totalItems} items purchased
              {estimatedTotal > 0 &&
                ` • Estimated total: $${estimatedTotal.toFixed(2)}`}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateFromMealPlan} variant="outline">
              <UtensilsCrossed className="mr-2 h-4 w-4" />
              Generate from Meal Plan
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progress</span>
              <Badge variant="secondary">
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearPurchased}
              className="text-xs"
              disabled={purchasedItems === 0}
            >
              Clear Purchased
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search items..."
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

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                className={cn(
                  "cursor-pointer",
                  selectedCategory === cat.name && "bg-pink-500",
                )}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? null : cat.name,
                  )
                }
              >
                <cat.icon className="h-3 w-3 mr-1" />
                {cat.name}
                <span className="ml-1 text-xs opacity-70">
                  ({groupedItems[cat.name]?.length || 0})
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <Card className="p-4 mb-6 border-pink-200 dark:border-pink-800">
            <h3 className="font-semibold mb-3">Add New Item</h3>
            <div className="grid md:grid-cols-4 gap-3">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && addItem()}
                autoFocus
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseFloat(e.target.value) || 0,
                  })
                }
                min="0"
                step="0.25"
              />
              <select
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
                className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
              >
                <option value="piece">piece(s)</option>
                <option value="cup">cup(s)</option>
                <option value="tbsp">tablespoon(s)</option>
                <option value="tsp">teaspoon(s)</option>
                <option value="oz">ounce(s)</option>
                <option value="lb">pound(s)</option>
                <option value="g">gram(s)</option>
                <option value="kg">kilogram(s)</option>
                <option value="ml">milliliter(s)</option>
                <option value="l">liter(s)</option>
              </select>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end mt-3">
              <Button onClick={addItem} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Shopping List by Category */}
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Your shopping list is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add items manually or generate from your meal plan
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <Button variant="outline" onClick={generateFromMealPlan}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate from Meal Plan
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {(selectedCategory ? [selectedCategory] : Object.keys(groupedItems))
              .filter((cat) => groupedItems[cat])
              .map((category) => {
                const categoryItems = filterItems(groupedItems[category]);
                const categoryData = categories.find(
                  (c) => c.name === category,
                );
                const CategoryIcon = categoryData?.icon || Package;
                const isCollapsed = collapsedCategories.has(category);
                const purchasedInCategory = categoryItems.filter(
                  (i) => i.isPurchased,
                ).length;

                if (categoryItems.length === 0) return null;

                return (
                  <Card key={category} className="overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon
                          className={cn("h-5 w-5", categoryData?.color)}
                        />
                        <h3 className="text-lg font-semibold">{category}</h3>
                        <Badge variant="secondary">
                          {purchasedInCategory}/{categoryItems.length}
                        </Badge>
                      </div>
                      {isCollapsed ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {/* Category Items */}
                    {!isCollapsed && (
                      <div className="divide-y">
                        {categoryItems.map((item) => (
                          <div
                            key={item.id}
                            className={cn(
                              "flex items-center gap-3 p-4 transition-colors",
                              item.isPurchased
                                ? "bg-green-50 dark:bg-green-900/20 opacity-75"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800",
                            )}
                          >
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleItem(item.id)}
                              className={cn(
                                "flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",
                                item.isPurchased
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-gray-300 hover:border-pink-500",
                              )}
                            >
                              {item.isPurchased && (
                                <Check className="h-4 w-4" />
                              )}
                            </button>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                              {editingItem === item.id ? (
                                <div className="flex gap-2">
                                  <Input
                                    value={editValues.name}
                                    onChange={(e) =>
                                      setEditValues({
                                        ...editValues,
                                        name: e.target.value,
                                      })
                                    }
                                    className="h-8 text-sm"
                                    autoFocus
                                  />
                                  <Input
                                    type="number"
                                    value={editValues.quantity}
                                    onChange={(e) =>
                                      setEditValues({
                                        ...editValues,
                                        quantity:
                                          parseFloat(e.target.value) || 0,
                                      })
                                    }
                                    className="w-20 h-8 text-sm"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => updateItem(item.id)}
                                    className="h-8"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingItem(null)}
                                    className="h-8"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <span
                                    className={cn(
                                      "font-medium",
                                      item.isPurchased &&
                                        "line-through text-gray-400",
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {item.quantity} {item.unit}
                                    </Badge>
                                    {item.price && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        ${item.price.toFixed(2)}
                                      </Badge>
                                    )}
                                    {item.recipeSource && (
                                      <span className="text-xs">
                                        📋 {item.recipeSource}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setEditingItem(item.id);
                                  setEditValues({
                                    name: item.name,
                                    quantity: item.quantity,
                                    unit: item.unit,
                                  });
                                }}
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
          </div>
        )}

        {/* Quick Add Section */}
        {items.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, Plus, Trash2, Check } from "lucide-react";

// interface ShoppingItem {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   category: string;
//   isPurchased: boolean;
// }

// export function ShoppingList() {
//   const [items, setItems] = useState<ShoppingItem[]>([]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     quantity: 1,
//     unit: "piece",
//     category: "other",
//   });

//   const categories = ["produce", "dairy", "meat", "pantry", "frozen", "other"];

//   const addItem = () => {
//     if (!newItem.name.trim()) return;
//     const item: ShoppingItem = {
//       id: Date.now().toString(),
//       ...newItem,
//       isPurchased: false,
//     };
//     setItems([...items, item]);
//     setNewItem({ name: "", quantity: 1, unit: "piece", category: "other" });
//   };

//   const toggleItem = (id: string) => {
//     setItems(
//       items.map((item) =>
//         item.id === id ? { ...item, isPurchased: !item.isPurchased } : item,
//       ),
//     );
//   };

//   const removeItem = (id: string) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const generateFromMealPlan = async () => {
//     // Fetch from meal plan and generate shopping list
//     try {
//       const response = await fetch("/api/shopping-list/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       setItems(data.items);
//     } catch (error) {
//       console.error("Failed to generate shopping list:", error);
//     }
//   };

//   const groupedItems = categories.reduce(
//     (acc, category) => {
//       const categoryItems = items.filter((item) => item.category === category);
//       if (categoryItems.length > 0) {
//         acc[category] = categoryItems;
//       }
//       return acc;
//     },
//     {} as Record<string, ShoppingItem[]>,
//   );

//   return (
//     <div className="space-y-6">
//       <Card className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <ShoppingCart className="h-6 w-6 text-pink-500" />
//             Shopping List
//           </h2>
//           <Button
//             onClick={generateFromMealPlan}
//             variant="outline"
//             className="border-pink-500 text-pink-500 hover:bg-pink-50"
//           >
//             Generate from Meal Plan
//           </Button>
//         </div>

//         <div className="flex gap-2 mb-6">
//           <Input
//             placeholder="Add item..."
//             value={newItem.name}
//             onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//             onKeyPress={(e) => e.key === "Enter" && addItem()}
//             className="flex-1"
//           />
//           <Input
//             type="number"
//             value={newItem.quantity}
//             onChange={(e) =>
//               setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
//             }
//             className="w-20"
//             min="1"
//           />
//           <select
//             value={newItem.unit}
//             onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
//             className="px-3 py-2 border rounded-md"
//           >
//             <option value="piece">piece</option>
//             <option value="kg">kg</option>
//             <option value="g">g</option>
//             <option value="l">l</option>
//             <option value="ml">ml</option>
//             <option value="cup">cup</option>
//             <option value="tbsp">tbsp</option>
//             <option value="tsp">tsp</option>
//           </select>
//           <select
//             value={newItem.category}
//             onChange={(e) =>
//               setNewItem({ ...newItem, category: e.target.value })
//             }
//             className="px-3 py-2 border rounded-md"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//           <Button onClick={addItem} size="icon">
//             <Plus className="h-4 w-4" />
//           </Button>
//         </div>

//         <div className="space-y-6">
//           {Object.entries(groupedItems).map(([category, categoryItems]) => (
//             <div key={category}>
//               <h3 className="text-lg font-semibold mb-3 capitalize flex items-center gap-2">
//                 <Badge variant="secondary">{category}</Badge>
//                 <span className="text-sm text-gray-500">
//                   {categoryItems.filter((i) => i.isPurchased).length}/
//                   {categoryItems.length} items
//                 </span>
//               </h3>
//               <div className="space-y-2">
//                 {categoryItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
//                       item.isPurchased
//                         ? "bg-green-50 dark:bg-green-900/20"
//                         : "bg-gray-50 dark:bg-gray-800"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3 flex-1">
//                       <Checkbox
//                         checked={item.isPurchased}
//                         onCheckedChange={() => toggleItem(item.id)}
//                       />
//                       <span
//                         className={
//                           item.isPurchased ? "line-through text-gray-400" : ""
//                         }
//                       >
//                         {item.name}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <Badge variant="outline">
//                         {item.quantity} {item.unit}
//                       </Badge>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => removeItem(item.id)}
//                       >
//                         <Trash2 className="h-4 w-4 text-red-500" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {items.length > 0 && (
//           <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold">
//                 {items.filter((i) => i.isPurchased).length} of {items.length}{" "}
//                 items purchased
//               </span>
//               <div className="w-48 bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-green-500 h-2 rounded-full transition-all"
//                   style={{
//                     width: `${(items.filter((i) => i.isPurchased).length / items.length) * 100}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }
