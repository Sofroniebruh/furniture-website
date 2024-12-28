import Common from "@/components/common-properties";
import FurnitureCard from "@/components/furniture-card";
import Sorting from "@/components/sorting-component";
import { itemsData } from "@/lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section>
        <Common>
          <div className="relative w-full sm:h-[600px] h-[400px] overflow-hidden rounded-2xl flex justify-center items-center">
            <img src="/hero-furniture.webp" alt="main furniture image" className="object-cover object-center w-full h-full" />
            <h1 className="absolute hero-text font-semibold text-white text-6xl sm:text-8xl tracking-tight text-balance !leading-tight">Furniture for <span className="hero-text tracking-tight relative font-bold text-6xl sm:text-8xl whitespace-nowrap bg-white text-[#c9a275] px-4">every kind</span> of taste</h1>
          </div>
        </Common>
      </section>
      <section className="my-6">
        <Common className="gap-12 flex flex-col">
          <h1 className="text-4xl font-semibold text-gray-800">Find exactly what you want</h1>
          <Sorting></Sorting>
          <h1 className="text-4xl font-semibold text-gray-800">Take a look</h1>
          <div className="flex flex-wrap justify-around gap-y-6">
            {itemsData.map((item) => (
              <FurnitureCard itemsData={item} key={item.id}></FurnitureCard>
            ))}
          </div>
        </Common>
      </section>
    </>
  )
}
