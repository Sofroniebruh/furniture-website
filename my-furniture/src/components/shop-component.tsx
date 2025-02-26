import { Product } from "@prisma/client";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import ItemComponent from "./items-page-component";
import FurnitureCard from "./furniture-card/furniture-card";
import PaginationComponent from "./pagination-component";

export default function ShopComponent({
    page,
}: {
    page: number,
}) {
    const [items, setItems] = useState<Product[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    const fetchItems = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/products/all-products?page=${page}`, {
            method: "GET",
        })
        if (response.ok) {
            const data = await response.json()
            setItems(data.items)
            setCount(data.count)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [page])

    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center flex-col">
                <Loader className="w-8 h-8 text-gray-500 animate-spin" />
                <p>Loading...</p>
            </div>
        )
    }

    if (items == undefined || items.length == 0) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <p>No items available...</p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <FurnitureCard key={index} itemsData={item} type="shop" />
                ))}
            </div>
            <div className="mt-6">
                <PaginationComponent currentPage={page} totalPages={count}></PaginationComponent>
            </div>
        </div>
    )
}