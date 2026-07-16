"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Bookmark,
  Search,
  Grid3X3,
  List,
  FolderOpen,
  Plus,
  Trash2,
  Edit3,
  MoreVertical,
  X,
  Heart,
  Star,
  Clock,
  Users,
  Flame,
  Calendar,
  ShoppingCart,
  Check,
  Tag,
  Download,
  Share2,
  Filter,
  ArrowUpDown,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface BookmarkFolder {
  id: string;
  name: string;
  icon: string;
  color: string;
  recipeCount: number;
  lastUpdated: string;
}

interface BookmarkedRecipe {
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
  bookmarkedDate: string;
  folderId: string;
  notes?: string;
  tags: Array<{ id: string; name: string }>;
}

// Sample data
const sampleFolders: BookmarkFolder[] = [
  {
    id: "all",
    name: "All Bookmarks",
    icon: "📑",
    color: "from-pink-500 to-rose-500",
    recipeCount: 15,
    lastUpdated: "2024-01-15",
  },
  {
    id: "folder1",
    name: "Try Later",
    icon: "🍳",
    color: "from-orange-500 to-red-500",
    recipeCount: 5,
    lastUpdated: "2024-01-12",
  },
  {
    id: "folder2",
    name: "Weekly Rotation",
    icon: "🔄",
    color: "from-blue-500 to-cyan-500",
    recipeCount: 4,
    lastUpdated: "2024-01-10",
  },
  {
    id: "folder3",
    name: "Party Ideas",
    icon: "🎉",
    color: "from-purple-500 to-violet-500",
    recipeCount: 3,
    lastUpdated: "2024-01-08",
  },
  {
    id: "folder4",
    name: "Healthy Options",
    icon: "🥗",
    color: "from-green-500 to-emerald-500",
    recipeCount: 3,
    lastUpdated: "2024-01-05",
  },
];

const sampleBookmarks: BookmarkedRecipe[] = [
  {
    id: "1",
    title: "Korean BBQ Tacos",
    description:
      "Fusion tacos with Korean-style marinated beef and kimchi slaw.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 25,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Korean Fusion",
    calories: 480,
    rating: 4.7,
    bookmarkedDate: "2024-01-15",
    folderId: "folder1",
    notes: "Try with chicken instead of beef",
    tags: [
      { id: "1", name: "Fusion" },
      { id: "2", name: "Spicy" },
    ],
  },
  {
    id: "2",
    title: "Creamy Tuscan Chicken",
    description:
      "Pan-seared chicken in a creamy sun-dried tomato and spinach sauce.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Italian",
    calories: 520,
    rating: 4.8,
    bookmarkedDate: "2024-01-14",
    folderId: "folder2",
    tags: [
      { id: "3", name: "Italian" },
      { id: "4", name: "Creamy" },
    ],
  },
  {
    id: "3",
    title: "Rainbow Spring Rolls",
    description:
      "Fresh Vietnamese spring rolls with colorful vegetables and peanut sauce.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 30,
    cookTime: 10,
    servings: 6,
    difficulty: "Medium",
    cuisine: "Vietnamese",
    calories: 250,
    rating: 4.6,
    bookmarkedDate: "2024-01-12",
    folderId: "folder3",
    tags: [
      { id: "5", name: "Healthy" },
      { id: "6", name: "Vegetarian" },
    ],
  },
  {
    id: "4",
    title: "Quinoa Power Bowl",
    description:
      "Protein-packed bowl with quinoa, chickpeas, avocado, and tahini dressing.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    cuisine: "American",
    calories: 420,
    rating: 4.5,
    bookmarkedDate: "2024-01-10",
    folderId: "folder4",
    notes: "Add grilled tofu for extra protein",
    tags: [
      { id: "7", name: "Healthy" },
      { id: "8", name: "Vegan" },
    ],
  },
  {
    id: "5",
    title: "Lobster Mac and Cheese",
    description:
      "Decadent mac and cheese with chunks of lobster and truffle oil.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 20,
    cookTime: 35,
    servings: 6,
    difficulty: "Hard",
    cuisine: "American",
    calories: 750,
    rating: 4.9,
    bookmarkedDate: "2024-01-08",
    folderId: "folder1",
    tags: [
      { id: "9", name: "Indulgent" },
      { id: "10", name: "Seafood" },
    ],
  },
  {
    id: "6",
    title: "Matcha Chia Pudding",
    description:
      "Healthy breakfast pudding with matcha green tea and chia seeds.",
    imageUrl: "/api/placeholder/400/300",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Japanese",
    calories: 280,
    rating: 4.4,
    bookmarkedDate: "2024-01-05",
    folderId: "folder4",
    tags: [
      { id: "11", name: "Breakfast" },
      { id: "12", name: "Healthy" },
    ],
  },
];

export default function BookmarksPage() {
  const [folders, setFolders] = useState<BookmarkFolder[]>(sampleFolders);
  const [bookmarks, setBookmarks] =
    useState<BookmarkedRecipe[]>(sampleBookmarks);
  const [activeFolder, setActiveFolder] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const activeFolderData = folders.find((f) => f.id === activeFolder);

  // Filter bookmarks
  const filteredBookmarks = bookmarks
    .filter((bookmark) => {
      const matchesSearch =
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesFolder =
        activeFolder === "all" || bookmark.folderId === activeFolder;

      return matchesSearch && matchesFolder;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.bookmarkedDate).getTime() -
            new Date(a.bookmarkedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.bookmarkedDate).getTime() -
            new Date(b.bookmarkedDate).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: BookmarkFolder = {
        id: `folder${Date.now()}`,
        name: newFolderName,
        icon: "📁",
        color: "from-gray-500 to-gray-600",
        recipeCount: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
      setIsCreatingFolder(false);
    }
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter((f) => f.id !== folderId));
    setBookmarks(bookmarks.filter((b) => b.folderId !== folderId));
    if (activeFolder === folderId) {
      setActiveFolder("all");
    }
  };

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    // Update folder counts
    const bookmark = bookmarks.find((b) => b.id === bookmarkId);
    if (bookmark) {
      setFolders(
        folders.map((f) =>
          f.id === bookmark.folderId
            ? { ...f, recipeCount: f.recipeCount - 1 }
            : f,
        ),
      );
    }
  };

  const moveToFolder = (bookmarkId: string, newFolderId: string) => {
    setBookmarks(
      bookmarks.map((b) =>
        b.id === bookmarkId ? { ...b, folderId: newFolderId } : b,
      ),
    );
  };

  const updateNotes = (bookmarkId: string, notes: string) => {
    setBookmarks(
      bookmarks.map((b) => (b.id === bookmarkId ? { ...b, notes } : b)),
    );
    setEditingNotes(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-pink-500 fill-pink-500" />
              Bookmarks
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {bookmarks.length} bookmarks • {folders.length - 1} folders
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsCreatingFolder(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Create Folder Dialog */}
        {isCreatingFolder && (
          <Card className="p-4 mb-6 border-pink-200 dark:border-pink-800">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && createFolder()}
                autoFocus
                className="flex-1"
              />
              <Button onClick={createFolder} size="sm">
                Create
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreatingFolder(false);
                  setNewFolderName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Folders Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {folders.map((folder) => (
            <Card
              key={folder.id}
              className={cn(
                "p-4 cursor-pointer hover:shadow-lg transition-all",
                activeFolder === folder.id && "ring-2 ring-pink-500",
              )}
              onClick={() => setActiveFolder(folder.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-2xl",
                    folder.color,
                  )}
                >
                  {folder.icon}
                </div>
                {folder.id !== "all" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFolder(folder.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </Button>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{folder.name}</h3>
              <p className="text-xs text-gray-500">
                {folder.recipeCount} recipes
              </p>
            </Card>
          ))}
        </div>

        {/* Current Folder Header */}
        {activeFolderData && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold">{activeFolderData.name}</h2>
              <Badge variant="secondary">
                {filteredBookmarks.length} bookmarks
              </Badge>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search bookmarks..."
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

        {/* Bookmarks Display */}
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search"
                : "Bookmark recipes to save them for later!"}
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
            {filteredBookmarks.map((bookmark) => (
              <Card
                key={bookmark.id}
                className="group overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={bookmark.imageUrl}
                    alt={bookmark.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white h-8 w-8"
                      onClick={() => removeBookmark(bookmark.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white h-8 w-8"
                      onClick={() => {
                        setEditingNotes(bookmark.id);
                        setNoteText(bookmark.notes || "");
                      }}
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/recipes/${bookmark.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-1 hover:text-pink-500 transition-colors">
                      {bookmark.title}
                    </h3>
                  </Link>

                  {bookmark.notes && (
                    <p className="text-sm text-gray-500 mb-2 italic">
                      📝 {bookmark.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {bookmark.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {bookmark.prepTime + bookmark.cookTime} min
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={bookmark.folderId}
                      onChange={(e) =>
                        moveToFolder(bookmark.id, e.target.value)
                      }
                      className="flex-1 text-xs px-2 py-1 border rounded"
                    >
                      {folders
                        .filter((f) => f.id !== "all")
                        .map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.icon} {folder.name}
                          </option>
                        ))}
                    </select>
                    <Link href={`/recipes/${bookmark.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Notes Editor */}
                {editingNotes === bookmark.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full">
                      <h4 className="font-semibold mb-2">Edit Notes</h4>
                      <Input
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add your notes..."
                        className="mb-3"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => updateNotes(bookmark.id, noteText)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNotes(null)}
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
            {filteredBookmarks.map((bookmark) => (
              <Card
                key={bookmark.id}
                className="hover:shadow-lg transition-all"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={bookmark.imageUrl}
                      alt={bookmark.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/recipes/${bookmark.id}`}>
                          <h3 className="font-semibold hover:text-pink-500 transition-colors">
                            {bookmark.title}
                          </h3>
                        </Link>
                        {bookmark.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            📝 {bookmark.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeBookmark(bookmark.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {bookmark.rating}
                      </span>
                      <span>{bookmark.cuisine}</span>
                      <span>{bookmark.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
