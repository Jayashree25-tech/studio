"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart } from "lucide-react";

export function Cart() {
  const { items, removeFromCart, totalPrice, cartCount } = useCart();

  return (
    <div className="h-full flex flex-col">
      {cartCount > 0 ? (
        <>
          <ScrollArea className="flex-grow pr-4 -mr-4">
            <div className="flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={60}
                    height={90}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto border-t pt-4">
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingCart className="h-20 w-20 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium">Your cart is empty</p>
          <p className="text-muted-foreground">Add some books to get started!</p>
        </div>
      )}
    </div>
  );
}
