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
import { CreditCard, IndianRupee, Home, Building, Landmark } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  addressLine1: z.string().min(5, "Address is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  zipCode: z.string().min(6, "A valid zip code is required."),
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
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit() {
    toast({
      title: "Payment Successful!",
      description: "Your eBooks are now available for rent. Thank you for your order.",
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
            <CardTitle className="flex items-center gap-2"><Home />Billing Information</CardTitle>
            <CardDescription>Enter your billing and payment details to complete the rental.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="addressLine1" render={({ field }) => (
                  <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="1234 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <div className="flex gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input placeholder="Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>State</FormLabel><FormControl><Input placeholder="Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
                 <FormField control={form.control} name="zipCode" render={({ field }) => (
                  <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="400001" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="border-t pt-4 mt-2">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><CreditCard />Payment Details</h3>
                   <div className="flex flex-col gap-2 mb-4">
                     <p className="text-sm text-muted-foreground">Choose a payment method:</p>
                     <div className="flex gap-2">
                       <Button variant="outline" className="flex-1"><CreditCard className="mr-2 h-4 w-4"/> Credit Card</Button>
                       <Button variant="ghost" className="flex-1 text-muted-foreground"><Landmark className="mr-2 h-4 w-4"/> Net Banking</Button>
                       <Button variant="ghost" className="flex-1 text-muted-foreground"><Building className="mr-2 h-4 w-4"/> UPI</Button>
                     </div>
                   </div>
                  <FormField control={form.control} name="cardName" render={({ field }) => (
                    <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John M. Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem className="mt-4"><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="flex gap-4 mt-4">
                     <FormField control={form.control} name="expiryDate" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="cvc" render={({ field }) => (
                      <FormItem className="flex-1"><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Pay ₹{totalPrice.toFixed(2)} for Rental
                </Button>
              </form>
            </Form>
             <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-semibold text-foreground/90 mb-2">Rental Policy</h4>
                <p className="text-sm text-muted-foreground">
                  All eBook rentals are for a period of 30 days. Please ensure you complete your reading within this timeframe. The rental period starts from the moment of payment.
                </p>
              </div>
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
           <CardHeader>
            <CardTitle className="flex items-center gap-2"><IndianRupee/>Rental Summary</CardTitle>
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
