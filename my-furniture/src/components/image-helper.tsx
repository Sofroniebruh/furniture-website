import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ImageHelper({ item, type, imageArray, handleDelete }: { item?: Product, type?: string, imageArray?: string[], handleDelete?(id: string): void }) {
    const [isLoading, setIsLoading] = useState(Object.fromEntries((item ? item.itemPicture : []).map((url) => [url, true])))
    const [isItemPictureLoading, setIsItemPictureLoading] = useState(true);
    const [isUrlLoading, setIsUrlLoading] = useState(Object.fromEntries((imageArray ?? []).map((url) => [url, true])));
    const handleImageLoad = (url: string) => {
        setIsLoading((prev) => ({ ...prev, [url]: false }));
    };
    const handleUrlChange = (url: string) => {
        setIsUrlLoading((prev) => ({ ...prev, [url]: false }));
    }

    return (
        <div>
            {
                type === "itemsAdd" && (
                    imageArray
                        ?
                        imageArray.map((imageUrl, index) => (
                            <div key={index} className="w-[100px] h-[100px] relative overflow-hidden rounded-sm flex justify-center items-center bg-white">
                                {isUrlLoading[imageUrl] && <Loader></Loader>}
                                <Image className={`transition-opacity duration-300 ${isUrlLoading[imageUrl] ? "opacity-0" : "opacity-100"
                                    }`} src={imageUrl} width={100} height={100} alt="imageUrl" onLoad={() => handleUrlChange(imageUrl)}></Image>
                                <X onClick={() => handleDelete?.(imageUrl)} />
                            </div>
                        ))
                        : null
                )
            }
            {
                type === "furnitureCardImage" && (
                    imageArray
                    &&
                    (
                        imageArray.map((image, index) => (
                            <div>
                                <Image key={index} onLoad={() => handleUrlChange(image)} src={image} width={300} height={300} alt="image" />
                            </div>
                        ))
                    )
                )
            }
            {type === "itemPhoto" && item != undefined
                ?
                (
                    <div className="rounded-md overflow-hidden w-[40px] h-[40px] relative">
                        {isItemPictureLoading && (
                            <Loader className="w-8 h-8 text-gray-500 animate-spin absolute inset-0 m-auto" />
                        )}
                        <Image
                            className={cn(
                                isItemPictureLoading ? "opacity-0" : "opacity-100",
                                "transition-opacity duration-300 cursor-pointer object-cover"
                            )}
                            src={item.itemPicture[0]}
                            width={40}
                            height={40}
                            onLoad={() => setIsItemPictureLoading(false)}
                            alt="itemImage"
                        />
                    </div>
                )
                :
                item
                    ?
                    (
                        <div className="flex gap-2 flex-wrap">
                            {item.itemPicture.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className="w-[100px] h-[100px] relative overflow-hidden rounded-sm flex justify-center items-center bg-white"
                                >
                                    {isLoading[imageUrl] && (
                                        <Loader className="w-8 h-8 text-gray-500 animate-spin absolute inset-0 m-auto" />
                                    )}
                                    <Image
                                        onLoad={() => handleImageLoad(imageUrl)}
                                        width={100}
                                        height={100}
                                        src={imageUrl}
                                        alt="sliced image"
                                        className={`transition-opacity duration-300 ${isLoading[imageUrl] ? "opacity-0" : "opacity-100"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                    :
                    null}
        </div>
    );

}