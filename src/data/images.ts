export const recipeImages = {
  mediterraneanGrilledSalmon: {
    id: "",
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    thumbnail:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop",
    credit: "Photo by Casey Lee on Unsplash",
  },

  classicItalianMargheritaPizza: {
    id: "",
    url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    thumbnail:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
    credit: "Photo by Ivan Torres on Unsplash",
  },

  beefTacosWithFreshSalsa: {
    url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    thumbnail:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200&h=200&fit=crop",
    credit: "Photo by Tyson on Unsplash",
  },

  thaiGreenCurryWithChicken: {
    id: "",
    url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    thumbnail:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop",
    credit: "Photo by Jonathan Borba on Unsplash",
  },

  vegetarianBuddhaBowl: {
    id: "",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    thumbnail:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
    credit: "Photo by Anna Pelzer on Unsplash",
  },

  berryProteinSmoothieBowl: {
    id: "",
    url: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
    thumbnail:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200&h=200&fit=crop",
    credit: "Photo by Brenda Godinez on Unsplash",
  },
};

export const backupRecipeImages = {
  mediterraneanGrilledSalmon: [
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop",
  ],

  classicItalianMargheritaPizza: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
  ],

  beefTacosWithFreshSalsa: [
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&h=600&fit=crop",
  ],

  thaiGreenCurryWithChicken: [
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=600&fit=crop",
  ],

  vegetarianBuddhaBowl: [
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  ],

  berryProteinSmoothieBowl: [
    "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop",
  ],
};

export const recipes = [
  {
    id: "1",
    title: "Mediterranean Grilled Salmon",
    description:
      "Fresh Atlantic salmon with herbs, lemon, and olive oil. A healthy and delicious dinner option.",
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    calories: 450,
    rating: 4.8,
    tags: [
      { id: "1", name: "Healthy" },
      { id: "2", name: "High Protein" },
      { id: "3", name: "Gluten-Free" },
    ],
  },
  {
    id: "2",
    title: "Classic Italian Margherita Pizza",
    description:
      "Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Italian",
    calories: 680,
    rating: 4.9,
    tags: [
      { id: "4", name: "Italian" },
      { id: "5", name: "Classic" },
      { id: "6", name: "Family-Friendly" },
    ],
  },
  {
    id: "3",
    title: "Beef Tacos with Fresh Salsa",
    description:
      "Mexican-style beef tacos with homemade pico de gallo, guacamole, and lime crema.",
    imageUrl:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 20,
    servings: 6,
    difficulty: "Easy",
    cuisine: "Mexican",
    calories: 450,
    rating: 4.8,
    tags: [
      { id: "7", name: "Mexican" },
      { id: "8", name: "Quick" },
      { id: "9", name: "Family-Friendly" },
    ],
  },
  {
    id: "4",
    title: "Thai Green Curry with Chicken",
    description:
      "Aromatic and spicy Thai green curry with tender chicken, bamboo shoots, and basil.",
    imageUrl:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Thai",
    calories: 520,
    rating: 4.7,
    tags: [
      { id: "10", name: "Asian" },
      { id: "11", name: "Spicy" },
      { id: "12", name: "Curry" },
    ],
  },
  {
    id: "5",
    title: "Vegetarian Buddha Bowl",
    description:
      "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Asian Fusion",
    calories: 380,
    rating: 4.6,
    tags: [
      { id: "13", name: "Vegetarian" },
      { id: "14", name: "Vegan" },
      { id: "15", name: "High Fiber" },
    ],
  },
  {
    id: "6",
    title: "Berry Protein Smoothie Bowl",
    description:
      "Energizing breakfast bowl with mixed berries, banana, protein powder, and granola.",
    imageUrl:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    cuisine: "American",
    calories: 350,
    rating: 4.5,
    tags: [
      { id: "16", name: "Breakfast" },
      { id: "17", name: "Quick" },
      { id: "18", name: "High Protein" },
    ],
  },
];
