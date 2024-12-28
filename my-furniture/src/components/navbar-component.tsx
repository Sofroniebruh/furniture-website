import Link from "next/link";
import Common from "./common-properties";
import { MenuIcon, ShoppingBagIcon, User2Icon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
    return (
        <nav className="z-50">
            <Common>
                <div className="flex items-center justify-between rounded-2xl bg-gray-100/75 p-4 px-8 h-20 z-50
                backdrop-blur-lg transition-all">
                    <ul className="order-1 md:order-2 flex gap-2">
                        <li className="hidden md:block cursor-pointer"><Link href="/" className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>Home</Link></li>
                        <li className="hidden md:block cursor-pointer"><Link href="/shop" className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>Shop</Link></li>
                        <li className="hidden md:block cursor-pointer"><Link href="/about" className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>About</Link></li>
                        <li className="hidden md:block cursor-pointer"><Link href="/contact" className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>Contact Us</Link></li>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <li className="w-5 h-5 block md:hidden cursor-pointer"><MenuIcon></MenuIcon></li>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Where to go?</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href="/">Home</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href="/shop">Shop</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href="/about">About</Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href="/contact">Contact Us</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ul>
                    <Link href={"/"} className="order-2 md:order-1">
                        <h1 className="text-xl font-semibold">FUTU</h1>
                    </Link>
                    <ul className="flex gap-2 order-3">
                        <Link href="/">
                            <li className="w-5 h-5"><ShoppingBagIcon></ShoppingBagIcon></li>
                        </Link>
                        <Link href="/">
                            <li className="w-5 h-5"><User2Icon></User2Icon></li>
                        </Link>
                    </ul>
                </div>
            </Common>
        </nav>
    )
}