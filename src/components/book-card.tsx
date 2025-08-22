
"use client";

import Image from "next/image";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart, Check, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  
  const isRentInCart = items.some(item => item.id === `${book.id}-rent`);
  const isBuyInCart = items.some(item => item.id === `${book.id}-buy`);

  const handleAddToCart = (purchaseType: 'rent' | 'buy') => {
    const price = purchaseType === 'rent' ? book.rentPrice : book.buyPrice;
    addToCart(book, purchaseType);
    toast({
      title: "Added to cart!",
      description: `"${book.title}" has been added for ${purchaseType}.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/60">
      <CardHeader className="p-0">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          width={300}
          height={450}
          className="w-full h-auto object-cover aspect-[2/3]"
          data-ai-hint={book.data_ai_hint}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline leading-tight mb-1">{book.title}</CardTitle>
        <CardDescription className="text-sm">{book.author}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-2">
        <div className="w-full flex justify-between items-center">
            <p className="font-bold text-lg text-primary">Rent: ₹{book.rentPrice.toFixed(2)}</p>
            <Button onClick={() => handleAddToCart('rent')} disabled={isRentInCart} variant={isRentInCart ? "outline" : "default"} size="sm" className="bg-accent hover:bg-accent/90 disabled:bg-primary/80">
                {isRentInCart ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                {isRentInCart ? 'Added' : 'Rent'}
            </Button>
        </div>
        <div className="w-full flex justify-between items-center">
             <p className="font-bold text-lg text-primary">Buy: ₹{book.buyPrice.toFixed(2)}</p>
            <Button onClick={() => handleAddToCart('buy')} disabled={isBuyInCart} variant={isBuyInCart ? "outline" : "secondary"} size="sm" >
                {isBuyInCart ? <Check className="mr-2 h-4 w-4" /> : <Tag className="mr-2 h-4 w-4" />}
                {isBuyInCart ? 'Added' : 'Buy'}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
