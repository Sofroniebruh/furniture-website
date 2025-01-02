"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { User2Icon, X } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import { useState } from "react"

export default function Authentication({ isAdmin, user }: { isAdmin: boolean, user: any }) {
    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <li className="w-5 h-5 cursor-pointer" onClick={() => setIsOpen(!isOpen)}><User2Icon></User2Icon></li>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                        FUTU
                        <X onClick={() => setIsOpen(!isOpen)} className="h-4 w-4 cursor-pointer" />
                    </SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-center flex-col gap-12 py-12">
                    <h1 className="text-5xl">Welcome!</h1>
                    <div className="flex tems-center gap-4">
                        {isAdmin ? (
                            <>
                                <Link href={"/api/auth/logout"}>
                                    <button className={buttonVariants({
                                        size: "lg"
                                    })}>Log Out</button>
                                </Link>
                                <Link href={"/dashboard"} onClick={() => setIsOpen(!open)}>
                                    <button className={buttonVariants({
                                        size: "lg"
                                    })}>Dashboard</button>
                                </Link>
                            </>
                        ) : user ? (
                            <Link href={"/api/auth/logout"}>
                                <button className={buttonVariants({
                                    size: "lg"
                                })}>Log Out</button>
                            </Link>) : (
                            <>
                                <Link href={"/api/auth/register"}>
                                    <button className={buttonVariants({
                                        size: "lg"
                                    })}>Sign Up</button>
                                </Link>
                                <Link href={"/api/auth/login"}><button className={buttonVariants({
                                    size: "lg",
                                    variant: "outline"
                                })}>Sign In</button>
                                </Link>
                            </>)}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}