"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBookRecommendation } from "@/ai/flows/book-recommendation";
import { Wand2, Loader2 } from "lucide-react";

export function RecommendationEngine() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const searchHistoryRaw = localStorage.getItem("searchHistory");
      if (!searchHistoryRaw) {
        setError("Your search history is empty. Search for some books to get a recommendation.");
        return;
      }
      const searchHistory = JSON.parse(searchHistoryRaw).join(', ');
      
      const result = await getBookRecommendation({ searchHistory });
      setRecommendation(result.bookRecommendation);
    } catch (e) {
      setError("Sorry, we couldn't generate a recommendation at this time.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 my-8 bg-primary/10 rounded-lg border border-primary/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-headline text-xl font-semibold text-foreground/90">Need a suggestion?</h3>
          <p className="text-muted-foreground">Click the button to get a book recommendation based on your recent searches.</p>
        </div>
        <Button onClick={handleGetRecommendation} disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Get AI Recommendation
        </Button>
      </div>

      {recommendation && (
        <Alert className="mt-4 bg-white/80">
          <Wand2 className="h-4 w-4" />
          <AlertTitle>Your Personalized Recommendation</AlertTitle>
          <AlertDescription>
            {recommendation}
          </AlertDescription>
        </Alert>
      )}

      {error && (
         <Alert variant="destructive" className="mt-4">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
