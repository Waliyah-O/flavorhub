"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Trash2, Check } from "lucide-react";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  isPurchased: boolean;
}

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "piece",
    category: "other",
  });

  const categories = ["produce", "dairy", "meat", "pantry", "frozen", "other"];

  const addItem = () => {
    if (!newItem.name.trim()) return;
    const item: ShoppingItem = {
      id: Date.now().toString(),
      ...newItem,
      isPurchased: false,
    };
    setItems([...items, item]);
    setNewItem({ name: "", quantity: 1, unit: "piece", category: "other" });
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const generateFromMealPlan = async () => {
    // Fetch from meal plan and generate shopping list
    try {
      const response = await fetch("/api/shopping-list/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error("Failed to generate shopping list:", error);
    }
  };

  const groupedItems = categories.reduce(
    (acc, category) => {
      const categoryItems = items.filter((item) => item.category === category);
      if (categoryItems.length > 0) {
        acc[category] = categoryItems;
      }
      return acc;
    },
    {} as Record<string, ShoppingItem[]>,
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-pink-500" />
            Shopping List
          </h2>
          <Button
            onClick={generateFromMealPlan}
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-50"
          >
            Generate from Meal Plan
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add item..."
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            className="flex-1"
          />
          <Input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            className="w-20"
            min="1"
          />
          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="px-3 py-2 border rounded-md"
          >
            <option value="piece">piece</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
            <option value="cup">cup</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
          </select>
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="px-3 py-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Button onClick={addItem} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 capitalize flex items-center gap-2">
                <Badge variant="secondary">{category}</Badge>
                <span className="text-sm text-gray-500">
                  {categoryItems.filter((i) => i.isPurchased).length}/
                  {categoryItems.length} items
                </span>
              </h3>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      item.isPurchased
                        ? "bg-green-50 dark:bg-green-900/20"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={item.isPurchased}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <span
                        className={
                          item.isPurchased ? "line-through text-gray-400" : ""
                        }
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        {item.quantity} {item.unit}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {items.filter((i) => i.isPurchased).length} of {items.length}{" "}
                items purchased
              </span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(items.filter((i) => i.isPurchased).length / items.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
