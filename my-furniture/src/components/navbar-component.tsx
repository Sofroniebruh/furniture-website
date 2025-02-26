"use client"

import Link from "next/link";
import Common from "./common-properties";
import { buttonVariants } from "./ui/button";
import Cart from "./cart-component";
import { usePathname } from "next/navigation";
import { sections } from "./dashboard-component";
import CommonSheet from "./sheet-component";

const burgerLinks = [{
    link: "/",
    title: "Home",
}, {
    link: "/shop",
    title: "Shop",
}, {
    link: "/about",
    title: "About",
}, {
    link: "/contact",
    title: "Contact Us",
}
]

export default async function Navbar({ userId, isAdmin }: { userId: string | null, isAdmin: boolean }) {
    const pathName = usePathname();

    return (
        <nav className="z-50 my-6">
            <Common>
                {pathName === "/dashboard" || pathName.startsWith("/dashboard") ? (
                    <div className="flex items-center justify-between rounded-2xl bg-gray-100/75 p-4 sm:px-8 h-20 z-50
                    backdrop-blur-lg transition-all">
                        <div className="hidden lg:block"></div>
                        <ul className="order-1 lg:order-2 flex gap-2 lg:hidden">
                            <CommonSheet type="dashboard" data={sections} title="Dashboard navigation" side="left"></CommonSheet>
                        </ul>
                        <Link href={"/"} className="order-2 lg:order-1">
                            <h1 className="text-xl font-semibold">FUTU</h1>
                        </Link>
                        <ul className="flex gap-2 order-3">
                            <CommonSheet type="auth" title="FUTU" user={userId} isAdmin={isAdmin} side="right"></CommonSheet>
                        </ul>
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-between rounded-2xl bg-gray-100/75 p-4 sm:px-8 h-20 z-50
        backdrop-blur-lg transition-all"
                    >
                        <ul className="order-1 md:order-2 flex gap-2">
                            <li className="hidden md:block cursor-pointer">
                                <Link
                                    href="/"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "ghost",
                                    })}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="hidden md:block cursor-pointer">
                                <Link
                                    href="/shop"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "ghost",
                                    })}
                                >
                                    Shop
                                </Link>
                            </li>
                            <li className="hidden md:block cursor-pointer">
                                <Link
                                    href="/about"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "ghost",
                                    })}
                                >
                                    About
                                </Link>
                            </li>
                            <li className="hidden md:block cursor-pointer">
                                <Link
                                    href="/contact"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "ghost",
                                    })}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <CommonSheet title="Where to go" type="mainLinks" side="left" burgerData={burgerLinks}></CommonSheet>
                        </ul>
                        <Link href="/" className="order-2 md:order-1">
                            <h1 className="text-xl font-semibold">FUTU</h1>
                        </Link>
                        <ul className="flex gap-2 order-3">
                            <Cart />
                            <CommonSheet type="auth" title="FUTU" user={userId} isAdmin={isAdmin} side="right"></CommonSheet>
                        </ul>
                    </div>
                )}
            </Common>
        </nav >
    )
}