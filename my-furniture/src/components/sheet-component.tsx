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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MenuIcon, PlusIcon, ShoppingBagIcon, User2Icon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useCart } from "@/contexts/cartContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NewItem from "./new-item-component";
import { toast } from "sonner";

type data = {
    name: string,
    icon: React.ReactNode,
    link: string,
}

type burgerData = {
    link: string,
    title: string,
}

export default function CommonSheet({
    data,
    burgerData,
    type,
    title,
    user,
    side }: {
        data?: data[],
        burgerData?: burgerData[],
        type: string,
        title: string,
        user?: KindeUser,
        side: "top" | "bottom" | "left" | "right" | null | undefined,
    }) {

    const [isOpen, setIsOpen] = useState<boolean>();
    const { cart, removeFromCart, clearCart } = useCart();
    const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const pathName = usePathname();
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {type === "auth" ? (
                    <li
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <User2Icon />
                    </li>
                ) : type === "dashboard" ? (
                    <li
                        onClick={() => setIsOpen(true)}
                        className="w-5 h-5 cursor-pointer"
                    >
                        <MenuIcon />
                    </li>
                ) : type === "cart" ? (
                    <li onClick={() => setIsOpen(true)} className="w-5 h-5 cursor-pointer">
                        <ShoppingBagIcon></ShoppingBagIcon>
                    </li>
                ) : type === "mainLinks" ? (
                    <li className="w-5 h-5 block md:hidden cursor-pointer">
                        <MenuIcon />
                    </li>
                ) : null}
            </SheetTrigger>
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                        {title}
                        <X onClick={() => setIsOpen(!isOpen)} className="h-4 w-4 cursor-pointer" />
                    </SheetTitle>
                </SheetHeader>
                {
                    type === "dashboard" ? (
                        <>
                            {data != undefined ? data.map((dataItem, index) => (
                                <Link key={index} href={dataItem.link} className="w-full flex gap-2 py-3" onClick={() => setIsOpen(!isOpen)}>
                                    {dataItem.icon}
                                    <p>{dataItem.name}</p>
                                </Link>
                            )) : null}
                            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                <DialogTrigger onClick={() => setDialogIsOpen(!dialogIsOpen)} className={buttonVariants({
                                    size: "lg",
                                    variant: "outline",
                                    className: "w-full"
                                })}>Add new Item <PlusIcon></PlusIcon>
                                </DialogTrigger>
                                <DialogContent className="h-[800px] max-w-[500px] 
                                flex items-center flex-col overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="mb-4">Add new Item</DialogTitle>
                                    </DialogHeader>
                                    <NewItem onSubmit={async (
                                        name: string,
                                        description: string,
                                        colors: string[],
                                        price: number,
                                        event: string | undefined,
                                        imageUrl: string
                                    ) => {
                                        console.log(JSON.stringify({ name, description, colors, price, event, imageUrl }));

                                        const response = await fetch("/api/products", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ name, description, colors, price, event, imageUrl }),
                                        });

                                        if (response.ok) {
                                            setDialogIsOpen(false)
                                            setIsOpen(false)
                                            toast("Item created successfully");
                                        } else {
                                            toast("Failed to create item.");
                                        }
                                    }}></NewItem>
                                </DialogContent>
                            </Dialog>
                        </>
                    ) : type === "cart" ? (
                        <>
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
                        </>
                    ) : type === "auth" ? (
                        <>
                            <div className="flex items-center justify-center flex-col gap-12 py-12">
                                <h1 className="text-5xl">Welcome!</h1>
                                <div className="flex items-center gap-4 w-full sm:w-fit justify-center">
                                    {isAdmin ? (
                                        <div className="flex sm:flex-row flex-col gap-4 items-center sm:justify-center">
                                            <LogoutLink className="w-full">
                                                <button className={buttonVariants({
                                                    size: "lg",
                                                    className: "w-[200px] sm:w-auto"
                                                })}>Log Out</button>
                                            </LogoutLink>
                                            {pathName === "/dashboard" || pathName.startsWith("/dashboard") ?
                                                (<Link href={"/"} onClick={() => setIsOpen(!open)}>
                                                    <button className={buttonVariants({
                                                        size: "lg",
                                                        className: "w-[200px] sm:w-auto"
                                                    })}>Shop</button>
                                                </Link>) : (
                                                    <Link href={"/dashboard"} onClick={() => setIsOpen(!open)}>
                                                        <button className={buttonVariants({
                                                            size: "lg",
                                                            className: "w-[200px] sm:w-auto"
                                                        })}>Dashboard</button>
                                                    </Link>
                                                )}
                                        </div>
                                    ) : user != null ? (
                                        <Link href={"/api/auth/logout"}>
                                            <button className={buttonVariants({
                                                size: "lg",
                                                className: "w-full sm:w-auto"
                                            })}>Log Out</button>
                                        </Link>) :
                                        (
                                            <div className="flex sm:flex-row flex-col gap-4 items-center sm:justify-center">
                                                <Link href={"/api/auth/register"}>
                                                    <button className={buttonVariants({
                                                        size: "lg",
                                                        className: "w-[200px] sm:w-auto"
                                                    })}>Sign Up</button>
                                                </Link>
                                                <Link href={"/api/auth/login"}><button className={buttonVariants({
                                                    size: "lg",
                                                    variant: "outline",
                                                    className: "w-[200px] sm:w-auto"
                                                })}>Sign In</button>
                                                </Link>
                                            </div>)}
                                </div>
                            </div>
                        </>
                    ) : type === "mainLinks" ?
                        <div className="flex flex-col">
                            {burgerData !== undefined ? burgerData.map((dataItem, index) => (
                                <Link key={index} className="py-3" onClick={() => setIsOpen(!isOpen)} href={dataItem.link}>{dataItem.title}</Link>
                            )) : null}
                        </div>
                        : null
                }
            </SheetContent>
        </Sheet>
    )
}