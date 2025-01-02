"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/cartContext";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon, X } from "lucide-react"
import { Button } from "./ui/button";
import { useState } from "react";

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <li onClick={() => setIsOpen(true)} className="w-5 h-5 cursor-pointer"><ShoppingBagIcon></ShoppingBagIcon></li>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                        Shopping cart
                        <X onClick={() => setIsOpen(!isOpen)} className="h-4 w-4 cursor-pointer" />
                    </SheetTitle>
                </SheetHeader>
                <div className={cn("flex justify-center items-center",
                    (cart.length === 0 ? "h-1/5" : "h-fit")
                )}>
                    {cart.length == 0 ? (<p>Your cart is empty.</p>) : (
                        <ul>
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center py-2 border-b"
                                >
                                    <div>
                                        <p>{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        {cart.length !== 0 ?
                            <Button type="submit">Checkout now</Button> :
                            null
                        }
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}