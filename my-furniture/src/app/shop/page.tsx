"use client"

import Common from "@/components/common-properties"
import SelectMenu from "@/components/select-menu-component"
import { buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { sortingOptionsColor, sortingOptionsMaterials, sortingOptionsType } from "@/lib/data"
import { useState } from "react"

export default function Shop() {
    const [isChecked, setIsChecked] = useState<"asc" | "desc">();

    return (
        <div>
            <Common className="flex my-6 gap-6">
                <div className="w-1/4 flex flex-col rounded-2xl border p-8">
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
                        variant: "outline",
                        className: "mt-6"
                    })}>Apply</button>
                </div>
                <div className="w-3/4">r</div>
            </Common>
        </div>
    )
}