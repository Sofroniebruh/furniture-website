"use client"

import Link from "next/link"
import SelectMenu from "./select-menu-component"
import { buttonVariants } from "./ui/button"
import { SearchIcon } from "lucide-react"
import { sortingOptionsMaterials, sortingOptionsPrice, sortingOptionsType } from "@/lib/data"

export default function Sorting() {
    return (
        <div className="overflow-hidden relative rounded-2xl border lg:py-4 flex sorting-container lg:flex-row flex-col gap-10 lg:gap-0 py-10 items-center">
            <img className="hidden sm:block lg:hidden w-[200px] top-5 -right-28 absolute" src="/painting.png" alt="Planinsek Art - Framed Modern Painting Png@pngkey.com" />
            <img className="hidden sm:block lg:hidden w-[300px] top-[195px] -left-32 absolute" src="/lamp.png" alt="lamp" />

            <div className="flex flex-col gap-3 lg:border-r sm:px-10 px-20">
                <h1 className="font-medium">Made by</h1>
                <SelectMenu data={sortingOptionsMaterials} className="sortButton w-[300px]"></SelectMenu>
            </div>
            <div className="flex flex-col gap-3 lg:border-r sm:px-10 px-20">
                <h1 className="font-medium">Select type</h1>
                <SelectMenu data={sortingOptionsType} className="sortButton w-[300px]"></SelectMenu>
            </div>
            <div className="flex flex-col gap-3 lg:border-r sm:px-10 px-20">
                <h1 className="font-medium">Price range</h1>
                <SelectMenu data={sortingOptionsPrice} className="sortButton w-[300px]"></SelectMenu>
            </div>
            <div className="flex items-center justify-center w-full sm:px-10">
                <Link href="/" className={
                    buttonVariants({
                        size: "lg",
                        className: "text-lg text-center searchButton"
                    })}><SearchIcon className="w-8 h-8"></SearchIcon> Search</Link>
            </div>
        </div>
    )
}