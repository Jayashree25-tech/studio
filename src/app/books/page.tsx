"use client";

import { useState, useEffect, useMemo } from "react";
import { books } from "@/lib/data";
import type { Book } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { BookCard } from "@/components/book-card";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const genres = useMemo(() => ["all", ...Array.from(new Set(books.map((b) => b.genre)))], []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm);
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
    setFilteredBooks(results);

    // Save search term to localStorage
    if (searchTerm.trim().length > 2) {
      try {
        const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        const updatedHistory = [searchTerm, ...history.filter((item: string) => item !== searchTerm)].slice(0, 10);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      } catch (e) {
        console.error("Failed to update search history in localStorage", e);
      }
    }
  }, [searchTerm, selectedGenre]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-md border">
        <h1 className="text-3xl font-bold font-headline mb-2 text-foreground/90">Book Catalog</h1>
        <p className="text-muted-foreground mb-4">Search, filter, and discover your next great read.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full sm:w-[180px] h-12">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No books found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
