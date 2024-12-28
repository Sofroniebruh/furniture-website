"use client"

import Link from "next/link"
import SelectMenu from "./select-menu-component"
import { buttonVariants } from "./ui/button"
import { Search, SearchIcon } from "lucide-react"

const sortingOptionsMaterials = [
    {
        value: "wood",
        label: "Wood",
    },
    {
        value: "metal",
        label: "Metal",
    },
    {
        value: "mixed",
        label: "Mixed",
    },
]
const sortingOptionsType = [
    {
        value: "sofa",
        label: "Sofa",
    },
    {
        value: "chair",
        label: "Chair",
    },
    {
        value: "table",
        label: "Table",
    },
]
const sortingOptionsPrice = [
    {
        value: "0-70",
        label: "0$ - 70$",
    },
    {
        value: "70-150",
        label: "70$ - 150$",
    },
    {
        value: "150+",
        label: "> 150$",
    },
]

export default function Sorting() {
    return (
        <div className="rounded-2xl border p-4 grid md:grid-cols-4 grid-cols-1 gap-10">
            <div className="flex flex-col gap-3 col-start-1 border-r">
                <h1>Made by</h1>
                <SelectMenu data={sortingOptionsMaterials}></SelectMenu>
            </div>
            <div className="flex flex-col gap-3 col-start-2 border-r">
                <h1>Select type</h1>
                <SelectMenu data={sortingOptionsType}></SelectMenu>
            </div>
            <div className="flex flex-col gap-3 col-start-3 border-r">
                <h1>Price range</h1>
                <SelectMenu data={sortingOptionsPrice}></SelectMenu>
            </div>
            <div className="flex items-center justify-center">
                <Link href="/" className={
                    buttonVariants({
                        size: "lg",
                        className: "text-lg w-[150px] text-center"
                    })}><SearchIcon className="w-8 h-8"></SearchIcon> Search</Link>
            </div>
        </div>
    )
}