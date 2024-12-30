import { cn } from "@/lib/utils"
import { StarIcon, User2Icon } from "lucide-react"

type reviewData = {
    username: string,
    review: string,
    rating: number,
}

export default function Review({ reviewData, className }: { reviewData: reviewData, className?: string }) {
    return (
        <div className={cn("rounded-2xl flex flex-col bg-gray-100/75 p-4 gap-4", className)}>
            <div className="flex">
                {Array.from({ length: reviewData.rating }, (_, index) => (
                    <StarIcon key={index} className="fill-black text-black"></StarIcon>
                ))}
            </div>
            <div className="reviewText text-balance">
                <p className="leading-6 font-medium">{reviewData.review}</p>
            </div>
            <div className="flex items-center">
                <div className="bg-white rounded-full p-1 mr-2">
                    <User2Icon></User2Icon>
                </div>
                <p className="font-semibold">{reviewData.username}</p>
            </div>
        </div>
    )
}