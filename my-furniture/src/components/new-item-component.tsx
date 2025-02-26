"use client"

import React, { useEffect, useState } from "react"
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, X, XIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewFileSchema, newFileSchema } from "@/lib/formSchemas";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "@prisma/client";
import { ImageType } from "@/types/types";
import ImageComponent from "./image-component";
import { toast } from "sonner";

interface NewItem {
    onSubmit: (
        name: string,
        description: string,
        colors: string[],
        price: number,
        event: string | null,
        imageUrl: string[],
        stock: number,
        id?: number,
        deletedImages?: string[],
    ) => void,
    item?: Product
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

export default function NewItem({ onSubmit, item }: NewItem) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<NewFileSchema>({
        defaultValues: { itemImages: undefined },
        resolver: zodResolver(newFileSchema),
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState<string[]>([]);
    const [customColor, setCustomColor] = useState("");
    const [price, setPrice] = useState<number>();
    const [event, setEvent] = useState<string | null>(null);
    const [isColorsChosen, setIsColorsChosen] = useState<boolean>();
    const [images, setImages] = useState<ImageType[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [slicedArray, setSlicedArray] = useState<ImageType[]>()
    const [slicedArrayImageUrls, setSlicedArrayImageUrls] = useState<string[]>()
    const [deletedImages, setDeletedImages] = useState<string[]>([])
    const [stock, setStock] = useState<number>();

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

    useEffect(() => {
        if (item != undefined) {
            setImageUrls([...item.itemPicture])
            setColors([...item.itemColor])
            setEvent(item.event)
            setColors(item.itemColor)
            setName(item.itemName)
            setPrice(item.price)
            setDescription(item.itemDescription)
            setStock(item.stock)

            setValue("itemName", item.itemName, { shouldValidate: true })
            setValue("itemDescription", item.itemDescription, { shouldValidate: true })
            setValue("itemPrice", item.price, { shouldValidate: true })
            setValue("itemImages", [], { shouldValidate: true })
            setValue("stock", item.stock, { shouldValidate: true })
        }
    }, [item])

    useEffect(() => {
        if (images.length > 2 && item == undefined) {
            setSlicedArray(images.slice(0, 2))
        } else if (imageUrls.length > 2) {
            setSlicedArrayImageUrls(imageUrls.slice(0, 2))
        }
    }, [images, imageUrls])

    const submit: SubmitHandler<NewFileSchema> = async (data) => {
        if (colors.length == 0) {
            setIsColorsChosen(false);

            return
        }
        try {
            item != undefined
                ?
                toast("Updating an item...")
                :
                toast("Creating an item...")

            if (images.length > 0) {
                const formData = new FormData();
                images.forEach((image) => {
                    formData.append('file', image.image);
                    formData.append('fileName', image.fileName);
                });

                const res = await fetch("/api/upload-url", {
                    method: "POST",
                    body: formData
                })

                const { uploadUrls } = await res.json();

                onSubmit(name, description, colors, price!, event, item != undefined ? [...item.itemPicture, ...uploadUrls] : uploadUrls, stock!, item?.id, deletedImages)
            } else if (item != undefined && images.length == 0) {
                onSubmit(name, description, colors, price!, event, imageUrls, stock!, item.id, deletedImages)
            }
        } catch (e) {
            return console.error(e);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files)

        const images = Array.from(e.target.files);
        const newImages = images.map((image, index) => {
            const objectURL = URL.createObjectURL(image);

            if (item && !imageUrls.includes(objectURL)) {
                imageUrls?.push(objectURL)
            }

            return {
                id: objectURL,
                url: objectURL,
                image,
                fileName: `${image.name}-${Date.now()}-${index}`,
            };
        });

        setImages((prev) => [...prev, ...newImages])
        setValue("itemImages", files, { shouldValidate: true })
    }

    const handleDelete = (id: string, type: "image" | "url") => {
        if (type === "url") {
            setImageUrls((prev) => prev.filter((image) => image != id))
            setDeletedImages((prev) => [...prev, id])
        } else {
            setImages((prev) => prev.filter((image) => image.id != id));
            URL.revokeObjectURL(id);
        }
    }

    const addCustomColor = (customColor: string) => {
        if (customColor.trim() && !colors.includes(customColor.trim())) {
            setColors([...colors, customColor]);
            setCustomColor("")
        }
    }

    return (
        <div className="flex flex-col flex-wrap gap-4 items-start w-[250px] justify-center">
            <div className="flex-1 gap-2 flex flex-col w-full">
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemName">Item name:</label>
                    <input {...register("itemName")} value={name} className="border text-sm font-medium rounded-lg p-1 w-full" placeholder="Sofa" type="text" name="itemName" onChange={(e) => setName(e.target.value)} />
                    {errors.itemName && <p className="text-sm text-red-500">{errors.itemName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemDescription">Item description:</label>
                    <input {...register("itemDescription")} value={description} className="border text-sm font-medium rounded-lg p-1" type="text" name="itemDescription" placeholder="Good quality white sofa" onChange={(e) => setDescription(e.target.value)} />
                    {errors.itemDescription && <p className="text-sm text-red-500">{errors.itemDescription.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-base font-medium" htmlFor="itemPrice">Item price:</label>
                    <input {...register("itemPrice")} value={price} className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]
                    border rounded-lg p-1" type="number" name="itemPrice" placeholder="45.69" onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    {errors.itemPrice && <p className="text-sm text-red-500">{errors.itemPrice.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="stock">Stock:</label>
                    <input {...register("stock")} type="number" value={stock} className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]
                    border rounded-lg p-1" placeholder="10000" name="stock" onChange={(e) => setStock(parseInt(e.target.value))} />
                    {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                </div>
                <div className="flex gap-4">
                    {(images != null && images.length > 0) || (imageUrls != null && imageUrls.length > 0) ? (
                        images.length > 2 || imageUrls.length > 2 ? (
                            <div className="flex items-center justify-between w-full">
                                {slicedArrayImageUrls
                                    ?
                                    (
                                        <ImageComponent imageUrls={slicedArrayImageUrls} handleDelete={handleDelete} />
                                    )
                                    :
                                    (
                                        <ImageComponent images={slicedArray} handleDelete={handleDelete} />
                                    )}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="rounded-full p-1 px-3 cursor-pointer bg-black text-white ml-2">
                                            {item != undefined ? imageUrls.length > 2 ?
                                                imageUrls.length - 2 : imageUrls.length : images.length > 2 ? images.length - 2 : images.length}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Uploaded Photos</DialogTitle>
                                            <DialogDescription>See all uploaded photos here</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex gap-4 flex-wrap">
                                            {slicedArrayImageUrls
                                                ?
                                                (
                                                    <ImageComponent imageUrls={imageUrls} handleDelete={handleDelete} />
                                                )
                                                :
                                                (
                                                    <ImageComponent images={images} handleDelete={handleDelete} />
                                                )
                                            }
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )
                            :
                            item != undefined
                                ?
                                (
                                    <ImageComponent imageUrls={imageUrls} handleDelete={handleDelete} />
                                )
                                :
                                (
                                    <ImageComponent images={images} handleDelete={handleDelete} />
                                )
                    ) : (
                        <div>
                            <p>No images selected</p>
                        </div>
                    )}

                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="itemImages"
                        className={buttonVariants({
                            size: "lg",
                            className: "cursor-pointer",
                            variant: "outline"
                        })}
                    >
                        Upload Image
                    </label>
                    <input
                        {...register("itemImages")}
                        onChange={handleFileChange}
                        id="itemImages"
                        className="hidden"
                        type="file"
                        name="itemImages"
                        multiple
                    />
                    {errors.itemImages && (
                        <p className="text-sm text-red-500">{errors.itemImages.message?.toString()}</p>
                    )}
                </div>
                <div className="flex flex-1 flex-col flex-wrap gap-2">
                    <label htmlFor="events" className="text-base font-medium">Item events:</label>
                    {itemEvents.map((chosenEvent, index) => (
                        <div
                            key={index}
                            onClick={() => setEvent(chosenEvent.eventValue)}
                            className={
                                buttonVariants({ size: "lg", variant: "outline", className: cn("cursor-pointer", event === chosenEvent.eventValue ? "bg-gray-100 border border-gray-700" : "bg-white") })
                            }
                        >
                            <p>{chosenEvent.eventName}</p>
                        </div>
                    ))}
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
                                    className: cn(colors.includes(color.colorName) ? 'bg-gray-100 border-gray-700' : 'bg-white', "flex-1")
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
                    })}>{item ? ("Update the Item") : ("Add new Item")} </button>
                </div>
            </div>
        </div >
    )
}