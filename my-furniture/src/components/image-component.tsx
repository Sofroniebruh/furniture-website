import { cn } from "@/lib/utils";
import { ImageType } from "@/types/types";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageComponent({
    images,
    imageUrls,
    handleDelete,
}: {
    images?: ImageType[],
    imageUrls?: string[],
    handleDelete(id: string, type: "image" | "url"): void
}) {
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [isLoadingImageUrl, setIsLoadingImageUrl] = useState<Record<string, boolean>>({});

    useEffect(() => {
        images != undefined && setIsLoading((prev) => ({
            ...prev,
            ...Object.fromEntries(images.map((image) => [image.url, prev[image.url] ?? true])),
        }));

        imageUrls != undefined && setIsLoadingImageUrl((prev) => ({
            ...prev,
            ...Object.fromEntries(imageUrls.map((imageUrl) => [imageUrl, prev[imageUrl] ?? true])),
        }));
    }, [images, imageUrls]);

    const handleLoading = (key: string, type: "image" | "url") => {
        {
            if (!key) return;
            if (type === "image") {
                setIsLoading((prev) => ({ ...prev, [key]: false }));
            } else {
                setIsLoadingImageUrl((prev) => ({ ...prev, [key]: false }));
            }
        }
    }

    return (
        <div className="flex items-center justify-between w-full flex-wrap gap-2">
            {images != null && images != undefined
                ?
                (
                    images.map((image, index) => (
                        <div key={index} className="w-[100px] h-[100px] relative overflow-hidden rounded-sm flex justify-center items-center bg-white">
                            {isLoading[image.url] && <Loader className="w-8 h-8 text-gray-500 animate-spin" />}
                            <Image
                                onLoad={() => handleLoading(image.url, "image")}
                                src={image.url}
                                width={100}
                                height={100}
                                alt="Image"
                                className=
                                {
                                    `transition-opacity duration-300 opacity-0 ${isLoading[image.url] ? "opacity-0" : "opacity-100"}`
                                }
                            />
                            <X onClick={() => handleDelete(image.id, "image")} className={cn(`absolute top-0 right-0 transition-opacity duration-300 cursor-pointer`, isLoadingImageUrl[image.url] ? "opacity-0" : "opacity-100")} />
                        </div>
                    ))
                )
                :
                imageUrls != undefined && imageUrls != null
                    ?
                    (
                        imageUrls.map((imageUrl, index) => (
                            <div key={index} className="w-[100px] h-[100px] relative overflow-hidden rounded-sm flex justify-center items-center bg-white">
                                {isLoadingImageUrl[imageUrl] && <Loader className="w-8 h-8 text-gray-500 animate-spin" />}
                                <Image
                                    onLoad={() => handleLoading(imageUrl, "url")}
                                    src={imageUrl}
                                    width={100}
                                    height={100}
                                    alt="Image"
                                    className=
                                    {
                                        `transition-opacity duration-300 opacity-0 ${isLoadingImageUrl[imageUrl] ? "opacity-0" : "opacity-100"}`
                                    }
                                />
                                <X onClick={() => handleDelete(imageUrl, "url")} className={cn(`absolute top-0 right-0 transition-opacity duration-300 cursor-pointer`, isLoadingImageUrl[imageUrl] ? "opacity-0" : "opacity-100")} />
                            </div>
                        ))
                    )
                    :
                    (
                        <p>No images</p>
                    )
            }
        </div>
    )
}