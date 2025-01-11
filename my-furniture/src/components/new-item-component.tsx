"use client"

import React, { useState } from "react"
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, XIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewFileSchema, newFileSchema } from "@/lib/formSchemas";

interface NewItem {
    onSubmit: (
        name: string,
        description: string,
        colors: string[],
        price: number,
        event: string | undefined,
        imageUrl: string,
    ) => void
}

const itemColors = [
    {
        colorValue: "BLACK",
        colorName: "Black",
    },
    {
        colorValue: "WHITE",
        colorName: "White",
    },
    {
        colorValue: "GRAY",
        colorName: "Gray",
    },
    {
        colorValue: "BEIGE",
        colorName: "Beige",
    },
];

const itemEvents = [
    {
        eventValue: "SALE",
        eventName: "Sale",
    },
    {
        eventValue: "BESTPRICE",
        eventName: "Best price",
    },
    {
        eventValue: "FORYOU",
        eventName: "For You",
    },
    {
        eventValue: "MOSTPOPULAR",
        eventName: "Most popular",
    },
    {
        eventValue: "NONE",
        eventName: "None",
    },
]

export default function NewItem({ onSubmit }: NewItem) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<NewFileSchema>({
        defaultValues: { itemImage: null },
        resolver: zodResolver(newFileSchema),
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState<string[]>([]);
    const [customColor, setCustomColor] = useState("");
    const [price, setPrice] = useState<number>();
    const [event, setEvent] = useState("");
    const [isColorsChosen, setIsColorsChosen] = useState<boolean>();
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState("");

    const addColor = (selectedColor: string) => {
        if (!colors.includes(selectedColor)) {
            setColors([...colors, selectedColor])
        } else {
            setColors(colors.filter(color => color != selectedColor))
        }
    }

    const removeColor = (colorName: string) => {
        if (colors.includes(colorName)) {
            setColors(colors.filter(color => color != colorName))
        }
    }

    const submit: SubmitHandler<NewFileSchema> = async (data) => {
        if (colors.length == 0) {
            setIsColorsChosen(false);

            return
        }

        try {
            const res = await fetch("/api/upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: image?.name,
                    fileType: image?.type
                })
            })

            const { uploadUrl } = await res.json();

            await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": image!.type },
                body: image
            })

            setImageUrl(uploadUrl.split("?")[0])

            if (uploadUrl.split("?")[0]) {
                onSubmit(name, description, colors, price!, event, uploadUrl.split("?")[0])
            } else {
                return
            }
        } catch (e) {
            return console.error(e);
        }
    }

    const addCustomColor = (customColor: string) => {
        if (customColor.trim() && !colors.includes(customColor.trim())) {
            setColors([...colors, customColor]);
            setCustomColor("")
        }
    }

    const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0])
            setValue("itemImage", e.target.files[0])
        }
    }

    return (
        <div className="flex flex-col flex-wrap gap-4 items-start w-[250px] justify-center">
            <div className="flex-1 gap-2 flex flex-col w-full">
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemName">Item name:</label>
                    <input {...register("itemName")} className="border text-sm font-medium rounded-lg p-1 w-full" placeholder="Sofa" type="text" name="itemName" onChange={(e) => setName(e.target.value)} />
                    {errors.itemName && <p className="text-sm text-red-500">{errors.itemName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemDescription">Item description:</label>
                    <input {...register("itemDescription")} className="border text-sm font-medium rounded-lg p-1" type="text" name="itemDescription" placeholder="Good quality white sofa" onChange={(e) => setDescription(e.target.value)} />
                    {errors.itemDescription && <p className="text-sm text-red-500">{errors.itemDescription.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemPrice">Item price:</label>
                    <input {...register("itemPrice")} className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]
                    border rounded-lg p-1" type="number" name="itemPrice" placeholder="45.69" onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    {errors.itemPrice && <p className="text-sm text-red-500">{errors.itemPrice.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemImage">
                        Item image:
                    </label>
                    <label
                        htmlFor="itemImage"
                        className={buttonVariants({
                            size: "lg",
                            className: "cursor-pointer"
                        })}
                    >
                        Upload Image
                    </label>
                    <input
                        {...register("itemImage")}
                        onChange={addImage}
                        id="itemImage"
                        className="hidden"
                        type="file"
                        name="itemImage"
                    />
                    {errors.itemImage && (
                        <p className="text-sm text-red-500">{errors.itemImage.message?.toString()}</p>
                    )}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="event">Add item event</label>
                    <div className="flex flex-wrap gap-2 text-black">
                        {itemEvents.map((eventItem, index) => (
                            <button key={index} onClick={() => setEvent(eventItem.eventValue)} className={buttonVariants({
                                size: "lg",
                                variant: "outline",
                                className: cn(eventItem.eventValue == event ? "bg-gray-200" : "bg-white", "flex-1 text-black")
                            })}>{eventItem.eventName}</button>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div>
                    <label className="text-base font-medium" htmlFor="colors">Selected colors:</label>
                    <div className="gap-2 flex flex-wrap">
                        {colors.length > 0 ? colors.map((color, index) => (
                            <div key={index} className="flex gap-1 p-1 px-2 border rounded-lg items-center">
                                <p>{color}</p>
                                <XIcon className="w-4 h-4 cursor-pointer" onClick={() => removeColor(color)}></XIcon>
                            </div>
                        )) : (<p className="text-sm font-medium text-gray-400">No colors selected</p>)}
                    </div>
                    {isColorsChosen == false && (<p className="text-sm text-red-500">At least 1 color is required</p>)}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="colors">Item colors:</label>
                    <div className="gap-2 flex flex-wrap">
                        {itemColors.map((color, index) => (
                            <button onClick={() => addColor(color.colorName)} key={index} className={buttonVariants({
                                size: "lg",
                                variant: "outline",
                                className: cn(colors.includes(color.colorName) ? 'bg-gray-200' : 'bg-white', "flex-1")
                            })}>{color.colorName}</button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="customColor">Add new color:</label>
                    <div className="flex flex-col gap-2">
                        <input className="border text-sm font-medium rounded-lg p-1" placeholder="Green" type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)} />
                        <button onClick={() => addCustomColor(customColor)} className={buttonVariants({
                            size: "lg",
                            className: "rounded-lg",
                            variant: "outline"
                        })}>Add color <PlusIcon></PlusIcon></button>
                    </div>
                </div>
            </div>
            <div className="flex w-[250px] mt-4">
                <button onClick={handleSubmit(submit)} className={buttonVariants({
                    size: "lg",
                    className: "flex-1",
                })}>Add new Item</button>
            </div>
        </div>
    )
}