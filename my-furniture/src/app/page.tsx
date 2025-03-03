"use client"

import Common from "@/components/common-properties";
import FurnitureCard from "@/components/furniture-card/furniture-card";
import Review from "@/components/review-component";
import Skeleton from "@/components/skeletons/skeleton";
import Sorting from "@/components/sorting-component";
import { buttonVariants } from "@/components/ui/button";
import { itemsData, reviews } from "@/lib/data";
import { Product } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("Items: " + items)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchItemsShowcase = async () => {
    console.log("Hello")
    setIsLoading(true);
    const res = await fetch(`/api/limited-products`, {
      method: "GET"
    })
    console.log("Hello2")
    if (res.ok) {
      console.log("Hello3")
      const data = await res.json();
      console.log("Data: " + data)
      setItems(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchItemsShowcase();
  }, [])

  return (
    <div className="flex flex-col gap-12">
      <section className="mt-6">
        <Common>
          <div className="relative w-full sm:h-[600px] h-[400px] overflow-hidden rounded-2xl flex justify-center items-center">
            <img src="/hero-furniture.webp" alt="main furniture image" className="object-cover object-center w-full h-full" />
            <h1 className="absolute hero-text font-semibold text-white text-6xl sm:text-8xl tracking-tight text-balance !leading-tight">Furniture for <span className="hero-text tracking-tight relative font-bold text-6xl sm:text-8xl whitespace-nowrap bg-white text-[#c9a275] px-4">every kind</span> of taste</h1>
          </div>
        </Common>
      </section>
      <section className="">
        <Common className="gap-12 flex flex-col">
          <div className="gap-12 flex flex-col">
            <h1 className="sm:text-4xl text-3xl text-gray-800">Find <span className="exactly">exactly</span> what you want</h1>
            <Sorting></Sorting>
          </div>
          {/* {items && !isLoading && */}
          <div className="flex-col flex gap-12">
            <div className="flex justify-between items-center">
              <h1 className="sm:text-4xl text-2xl text-gray-800">Take a look</h1>
              <Link href="/shop" className={buttonVariants({
                size: "lg",
                variant: "ghost",
                className: "text-lg"
              })}>View more <ArrowRightIcon></ArrowRightIcon></Link>
            </div>
            <div className="flex flex-wrap justify-around gap-y-12 lg:gap-12 w-full">
              {isLoading &&
                [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              }
              {items && items.map((item, index) => (
                <FurnitureCard itemsData={item} key={index}></FurnitureCard>
              ))}
            </div>
          </div>
          {/* } */}
          <div className="flex flex-col gap-12">
            <h1 className="sm:text-4xl text-3xl xl:hidden block">Exceptional quality.</h1>
            <div className="flex flex-col-reverse xl:flex-row w-full gap-6">
              <div className="flex xl:w-1/2 w-full flex-col justify-center items-start gap-6">
                <h1 className="text-4xl xl:block hidden">Exceptional quality.</h1>
                <p className="text-balance text-gray-600 font-medium">At <span className="font-semibold text-gray-700">FUTU</span>, we take pride in crafting furniture that stands the test of time. Each piece is thoughtfully designed and meticulously constructed using premium materials and expert craftsmanship. Whether it’s the smooth finish of a dining table or the plush comfort of a sofa, every detail is a testament to our commitment to quality.
                  Elevate your living spaces with furniture that not only looks stunning but is built to last for years to come.</p>
                <Link href="/about" className={buttonVariants({
                  size: "lg"
                })}>More About Us <ArrowRightIcon></ArrowRightIcon></Link>
              </div>
              <div className="xl:w-1/2 w-full">
                <div className="xl:h-[600px] h-[400px] w-full overflow-hidden rounded-2xl">
                  <img className="object-cover h-full w-full" src="/good-quality-furniture.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <h1 className="sm:text-4xl text-3xl text-gray-800">What people say</h1>
            <div className="flex flex-col xl:flex-row xl:justify-between gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="flex lg:even:justify-end lg:odd:justify-start xl:justify-start w-full">
                  <Review reviewData={review} className={"lg:w-4/5 xl:w-full w-auto"}></Review>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-start mb-6" onClick={scrollToTop}>
            <button className={buttonVariants({
              size: "lg"
            })}>Back to the top</button>
          </div>
        </Common>
      </section >
    </div>
  )
}
