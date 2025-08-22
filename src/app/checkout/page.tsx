"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, IndianRupee } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  cardName: z.string().min(2, "Name on card is required."),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), "Must be 16 digits."),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), "Use MM/YY format."),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), "Must be 3 or 4 digits."),
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit() {
    toast({
      title: "Payment Successful!",
      description: "Your eBooks are now available. Thank you for your purchase.",
    });
    clearCart();
    router.push("/books");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard />Payment Details</CardTitle>
            <CardDescription>Enter your payment information to complete the purchase.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="cardName" render={({ field }) => (
                  <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John M. Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="flex gap-4">
                   <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem className="flex-1"><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem className="flex-1"><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Button type="submit" className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Pay ₹{totalPrice.toFixed(2)}
                </Button>
              </form>
            </Form>
             <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-semibold text-foreground/90 mb-2">Return Policy</h4>
                <p className="text-sm text-muted-foreground">
                  You can return any eBook within 14 days of purchase for a full refund, provided you have not read more than 10% of the book. No penalty fees will be applied if returned within the specified period.
                </p>
              </div>
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
           <CardHeader>
            <CardTitle className="flex items-center gap-2"><IndianRupee/>Order Summary</CardTitle>
            <CardDescription>Review the items in your cart.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <Image src={item.coverImage} alt={item.title} width={40} height={60} className="rounded-sm" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                      </div>
                  </div>
                  <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 flex justify-between items-center text-lg font-bold">
                <p>Total</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
