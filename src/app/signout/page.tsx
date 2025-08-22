"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 -mt-16">
       <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary/20">
        <CheckCircle className="h-20 w-20 mx-auto text-primary" />
        <h1 className="text-3xl md:text-5xl font-headline font-bold text-foreground/80 mt-6 mb-4">
          THANK YOU FOR VISITING OUR E READER SHELF !!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          WAITING TO SEE YOU SOON
        </p>
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
