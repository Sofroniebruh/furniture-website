"use client"

import { cn } from "@/lib/utils"
import { Product } from "@prisma/client"
import { ShoppingBagIcon } from "lucide-react"
import Image from "next/image"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import "./style.scss"
import { buttonVariants } from "../ui/button"
import { useState } from "react"
import ImageSkeleton from "../skeletons/image-skeleton"

export default function FurnitureCard({
    itemsData,
    event,
    type,
}: {
    itemsData: Product,
    type?: string,
    event?: string,
}) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    const handleImageLoad = () => {
        setIsImageLoading(false)
    }

    return (
        <>
            <div className="flex md:hidden justify-between border-b pb-6 items-center">
                <div className="flex gap-5 flex-col furniture-card-element-1">
                    <div className="flex justify-between">
                        {itemsData.event !== "NONE" ?
                            <div className="font-semibold text-sm border rounded-sm p-2">
                                {
                                    itemsData.event == "BESTPRICE"
                                        ?
                                        (
                                            <p>Best price</p>
                                        )
                                        :
                                        itemsData.event == "FORYOU"
                                            ?
                                            (
                                                <p>For you</p>
                                            )
                                            :
                                            itemsData.event == "MOSTPOPULAR"
                                                ?
                                                (
                                                    <p>Most popular</p>
                                                )
                                                :
                                                itemsData.event == "SALE"
                                                    ?
                                                    (
                                                        <p>Sale</p>
                                                    )
                                                    : null
                                }
                            </div>
                            :
                            <div></div>
                        }
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <p className="font-medium text-sm cursor-pointer">{itemsData.itemColor.length == 1 ? itemsData.itemColor.length.toString() + " color" :
                                    itemsData.itemColor.length.toString() + " colors"}</p>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit">
                                <ul className="w-full flex justify-center items-start flex-col list-disc mx-6">
                                    {itemsData.itemColor.map((color, index) => (
                                        <li key={index}>{color}</li>
                                    ))}
                                </ul>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg">{itemsData.itemName}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-semibold">${itemsData.price}</p>
                        <div className="rounded-full bg-white p-2 h-fit cursor-pointer">
                            <ShoppingBagIcon></ShoppingBagIcon>
                        </div>
                    </div>
                </div>
                <div className="w-[170px] h-[170px] bg-white rounded-md overflow-hidden flex justify-center furniture-card-element-2 items-center">
                    {isImageLoading && <ImageSkeleton />}
                    <Image onLoad={() => handleImageLoad} className={cn(
                        isImageLoading ? "opacity-0" : "opacity-100",
                        "transition-opacity duration-300 cursor-pointer object-cover w-full h-full"
                    )} src={itemsData.itemPicture[0]} width={150} height={170} alt="item image" />
                </div>
            </div>
            <div className={cn("md:flex hidden rounded-2xl", type == "shop" ? "w-full flex-row md:flex-col p-4 justify-between gap-8" :
                "w-[400px] min-w-[287px] gap-8 p-8 flex-col ")}>
                <div className="flex justify-between">
                    {itemsData.event !== "NONE" ?
                        <div className="font-semibold text-sm border rounded-sm p-2">
                            {
                                itemsData.event == "BESTPRICE"
                                    ?
                                    (
                                        <p>Best price</p>
                                    )
                                    :
                                    itemsData.event == "FORYOU"
                                        ?
                                        (
                                            <p>For you</p>
                                        )
                                        :
                                        itemsData.event == "MOSTPOPULAR"
                                            ?
                                            (
                                                <p>Most popular</p>
                                            )
                                            :
                                            itemsData.event == "SALE"
                                                ?
                                                (
                                                    <p>Sale</p>
                                                )
                                                : null
                            }
                        </div>
                        :
                        <div></div>
                    }
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <p className="font-medium text-sm cursor-pointer">{itemsData.itemColor.length == 1 ? itemsData.itemColor.length.toString() + " color" :
                                itemsData.itemColor.length.toString() + " colors"}</p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit">
                            <ul className="w-full flex justify-center items-start flex-col list-disc mx-6">
                                {itemsData.itemColor.map((color, index) => (
                                    <li key={index}>{color}</li>
                                ))}
                            </ul>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-[170px] h-[170px] bg-white rounded-md overflow-hidden flex justify-center">
                        <Image src={itemsData.itemPicture[0]} width={150} height={170} alt="item image" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg h-[56px]">{itemsData.itemName}</p>
                        <div>
                            <p className="font-semibold mt-[10px]">${itemsData.price}</p>
                            <button className={buttonVariants({
                                size: "lg",
                                variant: "outline",
                                className: "mt-4"
                            })}>Buy <ShoppingBagIcon></ShoppingBagIcon></button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}