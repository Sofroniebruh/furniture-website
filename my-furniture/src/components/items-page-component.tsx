"use client"

import { Product } from "@prisma/client"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit3Icon, Loader, Trash2 } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { toast } from "sonner"
import NewItem from "./new-item-component"
import PaginationComponent from "./pagination-component"
import { useRouter } from "next/navigation"
import { ITEMS_PER_PAGE, domain } from "@/lib/data"
import { useSelector } from "react-redux"
import { RootState } from "../lib/redux/storage"
import Image from "next/image"
import ImageHelper from "./image-helper"

export default function ItemComponent({ page }: { page: number }) {
    const [items, setItems] = useState<Product[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<Product | null>(null);
    const [isOpenDelete, setIsOpenDelete] = useState<Product | null>()
    const [count, setCount] = useState<number>(0);
    const router = useRouter();
    const prevPage = Math.max(page - 1, 1)
    const updatedItem = useSelector((state: RootState) => state.updatedItem)

    const deleteItem = async (itemId: number, fileNames: string[]) => {
        const response = await fetch("/api/products", {
            method: "DELETE",
            body: JSON.stringify({ itemId: itemId, fileNames: fileNames })
        })
        if (response.ok) {
            const remainingItems = count - 1;
            const remainingItemsOnPage = remainingItems - (page - 1) * ITEMS_PER_PAGE
            if (remainingItemsOnPage === 0 && page > 1) {
                router.replace(`?page=${prevPage}`);
            } else {
                router.refresh()
            }
            toast("Item was deleted successfully");
            fetchItems()

            setIsOpenDelete(null)
        }
        else toast("Failed to delete an Item")
    }

    const fetchItems = async () => {
        const res = await fetch(`/api/products/all-products?page=${page}`, {
            method: "GET"
        })
        if (res.ok) {
            const data = await res.json();
            setItems(data.items);
            setCount(data.count);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetchItems()
    }, [page, updatedItem])

    if (isLoading) return (
        <>

            <div className="flex h-full justify-center flex-col gap-5 items-center font-medium w-full lg:w-4/5">
                <Loader className="w-8 h-8 text-gray-500 animate-spin"></Loader>
                <p>Loading...</p>
            </div>
        </>
    )

    return (
        <div className="flex flex-col w-full lg:w-4/5 h-full justify-center items-center">
            {items && items.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <p className="mb-12 mt-6 lg:mb-0 text-center text-xl lg:hidden">Items</p>
                    <Table>
                        <TableCaption className="mb-4">A list of your items</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className="hidden sm:table-cell">Name</TableHead>
                                <TableHead>Colors</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger>
                                                <ImageHelper type="itemPhoto" item={item}></ImageHelper>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Item images</DialogTitle>
                                                </DialogHeader>
                                                <ImageHelper item={item}></ImageHelper>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell"><div>{item.itemName}</div></TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="flex flex-row w-[60px] cursor-pointer">
                                                    {item.itemColor[0]}
                                                    {item.itemColor.length > 1 ? ` +${item.itemColor.length - 1}` : null}
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Item colors</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex flex-col items-center">
                                                    {item.itemColor.map((color, index) => (
                                                        <div key={index}><p className="font-medium">{color}</p></div>
                                                    ))
                                                    }
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell className="flex items-center justify-center h-[56.5px]">
                                        <Dialog open={isOpenDelete ? isOpenDelete.id == item.id : false} onOpenChange={(isOpenDelete) => setIsOpenDelete(isOpenDelete ? item : null)}>
                                            <DialogTrigger asChild>
                                                <Trash2 className="cursor-pointer"></Trash2>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    This action cannot be undone.
                                                </DialogDescription>
                                                <div className="flex items-center justify-center">
                                                    <button onClick={() => deleteItem(item.id, item.itemPicture)} className={buttonVariants({
                                                        size: "lg",
                                                        variant: "destructive"
                                                    })}>Delete</button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog key={item.id} open={isOpen ? isOpen.id == item.id : false} onOpenChange={(isOpen) => setIsOpen(isOpen ? item : null)}>
                                            <DialogTrigger asChild>
                                                <Edit3Icon onClick={() => setIsOpen(item)} className="cursor-pointer"></Edit3Icon>
                                            </DialogTrigger>
                                            <DialogContent className="h-[800px] max-w-[500px] 
                                flex items-center flex-col overflow-y-auto">
                                                <DialogHeader>
                                                    <DialogTitle>Update the item</DialogTitle>
                                                </DialogHeader>
                                                <NewItem item={item} onSubmit={async (
                                                    name: string,
                                                    description: string,
                                                    colors: string[],
                                                    price: number,
                                                    event: string | null,
                                                    imageUrls: string[],
                                                    stock: number,
                                                    id?: number,
                                                    deletedImages?: string[]
                                                ) => {
                                                    const response = await fetch("/api/products", {
                                                        method: "PUT",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ name, description, colors, price, event, imageUrls, stock, id, deletedImages }),
                                                    });

                                                    if (response.ok) {
                                                        setIsOpen(null)
                                                        toast("Item updated successfully");
                                                    } else {
                                                        toast("Failed to update item.");
                                                    }
                                                }}></NewItem>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationComponent currentPage={page} totalPages={count}></PaginationComponent>
                </div>) : <div className="flex justify-center items-center h-full w-full lg:w-4/5 font-medium"><p>No items found</p></div>}
        </div>
    )
}