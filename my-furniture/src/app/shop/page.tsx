"use client"

import Common from "@/components/common-properties"
import SelectMenu from "@/components/select-menu-component"
import ShopComponent from "@/components/shop-component"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { sortingOptionsColor, sortingOptionsMaterials, sortingOptionsType } from "@/lib/data"
import { SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default async function Shop({
    searchParams
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const [isChecked, setIsChecked] = useState<"asc" | "desc">();
    const { page, ...queryParams } = await searchParams;
    const p = page ? parseInt(page) : 1

    return (
        <div>
            <Common className="flex my-6 gap-6 flex-col lg:flex-row">
                <div className="md:hidden block">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className={buttonVariants({
                                size: "lg",
                                variant: "outline",
                                className: "furniture-card-element-1"
                            })}>Apply filtering <SlidersHorizontal></SlidersHorizontal></button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden md:flex lg:hidden w-full justify-between">
                    <SelectMenu data={sortingOptionsMaterials} className="text-sm w-[140px]"></SelectMenu>
                    <SelectMenu data={sortingOptionsColor} className="text-sm w-[140px]"></SelectMenu>
                    <SelectMenu data={sortingOptionsType} className="text-sm w-[140px]"></SelectMenu>
                    <SelectMenu data={sortingOptionsMaterials} className="text-sm w-[140px]"></SelectMenu>
                    <button className={buttonVariants({
                        size: "lg",
                        className: "h-[36px]"
                    })}>Apply</button>
                </div>
                <div className="lg:w-1/4 lg:flex h-fit flex-col rounded-2xl border p-8 hidden max-w-[246px]">
                    <h1 className="font-semibold text-lg mb-4">Sort By:</h1>
                    <div className="flex flex-col border-t py-4">
                        <h1 className="font-semibold pb-2">Price</h1>
                        <div className="flex gap-2 items-center">
                            <label htmlFor="desc" className="text-sm">High-Low</label>
                            <Checkbox name="desc" checked={isChecked == "desc"} onCheckedChange={() => setIsChecked("desc")}></Checkbox>
                        </div>
                        <div className="flex gap-2 items-center">
                            <label htmlFor="asc" className="text-sm">Low-High</label>
                            <Checkbox name="asc" checked={isChecked == "asc"}
                                onCheckedChange={() => setIsChecked("asc")}></Checkbox>
                        </div>
                    </div>
                    <div className="flex flex-col border-t py-4">
                        <h1 className="font-semibold pb-2">Material</h1>
                        <SelectMenu data={sortingOptionsMaterials} className="text-sm"></SelectMenu>
                    </div>
                    <div className="flex flex-col border-t py-4">
                        <h1 className="font-semibold pb-2">Type</h1>
                        <SelectMenu data={sortingOptionsType} className="text-sm"></SelectMenu>
                    </div>
                    <div className="flex flex-col border-y py-4">
                        <h1 className="font-semibold pb-2">Color</h1>
                        <SelectMenu data={sortingOptionsColor} className="text-sm"></SelectMenu>
                    </div>
                    <button className={buttonVariants({
                        size: "lg",
                        className: "mt-6"
                    })}>Apply</button>
                </div>
                <div className="w-full">
                    <ShopComponent page={p}></ShopComponent>
                </div>
            </Common>
        </div>
    )
}