import { ShoppingBagIcon } from "lucide-react"

type itemsData = {
    name: string,
    price: number,
    imgSrc: string,
    amountOfColors: number,
}

export default function FurnitureCard({
    itemsData,
    event,
}: {
    itemsData: itemsData,
    event?: string,
}) {
    return (
        <div className="bg-gray-100 w-[400px] p-8 flex flex-col gap-4 rounded-2xl mb-6">
            <div className="flex justify-between">
                <div>
                    {
                        event == "sale" ?
                            (<p>Sale</p>) :
                            event == "price" ?
                                (<p>Top price</p>) :
                                event == "rating" ?
                                    (<p>Top rating</p>) :
                                    null
                    }
                </div>
                <p>{itemsData.amountOfColors == 1 ? itemsData.amountOfColors.toString() + " color" :
                    itemsData.amountOfColors.toString() + " colors"}</p>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-[290px] h-auto overflow-hidden flex justify-center">
                    <img src={itemsData.imgSrc} alt="item image" />
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="text-lg">{itemsData.name}</p>
                    <p className="font-semibold">${itemsData.price}</p>
                </div>
                <div className="rounded-full bg-white p-2 h-fit cursor-pointer">
                    <ShoppingBagIcon></ShoppingBagIcon>
                </div>
            </div>
        </div>
    )
}