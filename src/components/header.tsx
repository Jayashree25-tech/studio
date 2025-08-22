"use client";

import Link from "next/link";
import { BookOpen, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Cart } from "@/components/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            E-Reader Oasis
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="/catalog"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Catalog
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Shopping Cart</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
               <span className="text-sm font-medium hidden sm:inline">Welcome, {user?.name}</span>
               <Button variant="ghost" size="icon" onClick={logout} asChild>
                <Link href="/signout"><LogOut className="h-5 w-5"/></Link>
               </Button>
            </div>
          ) : (
            <Button asChild variant="ghost" className="gap-2">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
