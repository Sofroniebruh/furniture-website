"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { ITEMS_PER_PAGE } from "@/lib/data"
import { useRouter } from "next/navigation"
import { buttonVariants } from "./ui/button"

export default function PaginationComponent(
    {
        currentPage,
        totalPages
    }:
        {
            currentPage: number,
            totalPages: number,
        }) {
    const router = useRouter()
    const hasPrev = ITEMS_PER_PAGE * (currentPage - 1) > 0
    const hasNext = ITEMS_PER_PAGE * (currentPage - 1) + ITEMS_PER_PAGE < totalPages

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set("page", newPage.toString())
        router.push(`${window.location.pathname}?${params}`)
    }

    if (totalPages == 1) return ""

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button disabled={!hasPrev} onClick={() => changePage(currentPage - 1)} className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>Prev</button>
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(totalPages / ITEMS_PER_PAGE) }, (_, index) => {
                        return (
                            <PaginationItem key={index} className="cursor-pointer">
                                <PaginationLink isActive={currentPage == index + 1} onClick={() => changePage(index + 1)}>{index + 1}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem>
                        <button disabled={!hasNext} onClick={() => changePage(currentPage + 1)} className={buttonVariants({
                            size: "lg",
                            variant: "ghost"
                        })}>Next</button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}