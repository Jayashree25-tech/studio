import { Button } from "@/components/ui/button";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 -mt-16">
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary/20">
        <BookOpenCheck className="h-20 w-20 mx-auto text-primary" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground/80 mt-6 mb-4">
          HELLO WELCOME TO E READER BOOK SHELF
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover your next favorite book from our curated collection.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/login-page">
              Login
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/catalog">
              Browse as Guest
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
