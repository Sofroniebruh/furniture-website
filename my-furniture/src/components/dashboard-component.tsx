import Common from "./common-properties";
import { BoxIcon, DollarSignIcon, WarehouseIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const sections = [
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
    }
]

export default function DashboardSection({ children }: { children: React.ReactNode }) {
    return (
        <Common className="flex my-6 gap-6">
            <div className="w-1/5 flex flex-col rounded-2xl border p-8">
                {sections.map((section, index) => (
                    <div className="rounded-2xl py-3 hover:bg-gray-100/75 p-3">
                        <Link key={index} href={section.link} className="w-full flex gap-2">
                            {section.icon}
                            <p>{section.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {children}
        </Common>
    )
}