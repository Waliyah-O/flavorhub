"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Apple, Beef, Wheat, Droplets } from "lucide-react";

interface NutritionalData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export function NutritionalDashboard() {
  const dailyData: NutritionalData[] = [
    {
      date: "Mon",
      calories: 2100,
      protein: 120,
      carbs: 250,
      fat: 65,
      fiber: 25,
    },
    {
      date: "Tue",
      calories: 1950,
      protein: 110,
      carbs: 230,
      fat: 60,
      fiber: 28,
    },
    {
      date: "Wed",
      calories: 2200,
      protein: 130,
      carbs: 260,
      fat: 70,
      fiber: 30,
    },
    {
      date: "Thu",
      calories: 2000,
      protein: 115,
      carbs: 240,
      fat: 62,
      fiber: 27,
    },
    {
      date: "Fri",
      calories: 2150,
      protein: 125,
      carbs: 255,
      fat: 68,
      fiber: 29,
    },
    {
      date: "Sat",
      calories: 2300,
      protein: 135,
      carbs: 270,
      fat: 72,
      fiber: 32,
    },
    {
      date: "Sun",
      calories: 2050,
      protein: 118,
      carbs: 245,
      fiber: 26,
      fat: 63,
    },
  ];

  const macroData = [
    { name: "Protein", value: 125, color: "#FF6384" },
    { name: "Carbs", value: 250, color: "#36A2EB" },
    { name: "Fat", value: 65, color: "#FFCE56" },
  ];

  const goals = {
    calories: { current: 2100, target: 2000 },
    protein: { current: 125, target: 150 },
    carbs: { current: 250, target: 300 },
    fat: { current: 65, target: 67 },
    fiber: { current: 28, target: 30 },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nutritional Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Apple className="h-5 w-5 text-red-500" />
              Calories
            </h3>
          </div>
          <p className="text-2xl font-bold">{goals.calories.current}</p>
          <p className="text-sm text-gray-500">
            / {goals.calories.target} kcal
          </p>
          <Progress
            value={(goals.calories.current / goals.calories.target) * 100}
            className="mt-2"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Beef className="h-5 w-5 text-blue-500" />
              Protein
            </h3>
          </div>
          <p className="text-2xl font-bold">{goals.protein.current}g</p>
          <p className="text-sm text-gray-500">/ {goals.protein.target}g</p>
          <Progress
            value={(goals.protein.current / goals.protein.target) * 100}
            className="mt-2 bg-blue-100"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Wheat className="h-5 w-5 text-yellow-500" />
              Carbs
            </h3>
          </div>
          <p className="text-2xl font-bold">{goals.carbs.current}g</p>
          <p className="text-sm text-gray-500">/ {goals.carbs.target}g</p>
          <Progress
            value={(goals.carbs.current / goals.carbs.target) * 100}
            className="mt-2 bg-yellow-100"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Droplets className="h-5 w-5 text-green-500" />
              Fat
            </h3>
          </div>
          <p className="text-2xl font-bold">{goals.fat.current}g</p>
          <p className="text-sm text-gray-500">/ {goals.fat.target}g</p>
          <Progress
            value={(goals.fat.current / goals.fat.target) * 100}
            className="mt-2 bg-green-100"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Macronutrient Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Calorie Intake</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#FF6384"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#36A2EB"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
