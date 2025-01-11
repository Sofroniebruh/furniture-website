"use client"

import Common from "./common-properties";
import { BoxIcon, DollarSignIcon, HomeIcon, PlusIcon, WarehouseIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { buttonVariants } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import NewItem from "./new-item-component";
import { toast } from "sonner";

export const sections = [
    {
        name: "Home",
        icon: <HomeIcon></HomeIcon>,
        link: "/dashboard"
    },
    {
        name: "Profit",
        icon: <DollarSignIcon></DollarSignIcon>,
        link: "/dashboard/profit",
    },
    {
        name: "Items",
        icon: <WarehouseIcon></WarehouseIcon>,
        link: "/dashboard/items"
    },
    {
        name: "Orders",
        icon: <BoxIcon></BoxIcon>,
        link: "/dashboard/orders"
    },
]

export default function DashboardSection({ children }: { children: React.ReactNode }) {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>();

    return (
        <Common className="flex my-6 gap-6">
            <div className="w-1/5 flex-col rounded-2xl border px-4 py-8 xl:p-8 lg:block hidden gap-4">
                <div className="sticky top-7 h-fit">
                    {sections.map((section, index) => (
                        <Link key={index} href={section.link} className="w-full flex gap-2 first:pb-3 first:pt-0 py-3">
                            {section.icon}
                            <p>{section.name}</p>
                        </Link>
                    ))}
                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                        <DialogTrigger onClick={() => setDialogIsOpen(!dialogIsOpen)} className={buttonVariants({
                            size: "lg",
                            variant: "outline",
                            className: "w-full mt-3"
                        })}>Add new Item <PlusIcon></PlusIcon>
                        </DialogTrigger>
                        <DialogContent className="h-[800px] max-w-[500px] 
                                flex items-center flex-col overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="mb-4">Add new Item</DialogTitle>
                            </DialogHeader>
                            <NewItem onSubmit={async (
                                name: string,
                                description: string,
                                colors: string[],
                                price: number,
                                event: string | undefined,
                                imageUrl: string
                            ) => {
                                console.log(JSON.stringify({ name, description, colors, price, event, imageUrl }));

                                const response = await fetch("/api/products", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ name, description, colors, price, event, imageUrl }),
                                });

                                if (response.ok) {
                                    setDialogIsOpen(false)
                                    toast("Item created successfully");
                                } else {
                                    toast("Failed to create item.");
                                }
                            }}></NewItem>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {children}
        </Common>
    )
}