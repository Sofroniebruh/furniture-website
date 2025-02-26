"use client"

import Common from "@/components/common-properties";
import { buttonVariants } from "@/components/ui/button";
import { BoxIcon, CalendarDays, TruckIcon } from "lucide-react";

export default function About() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="mt-12">
            <Common className="gap-24 flex flex-col">
                <section className="relative rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="relative w-full sm:h-[600px] h-[400px]">
                        <img className="w-full object-cover object-center h-full" src="/hero-image.jpeg" alt="hero image" />
                    </div>
                    <div className="bg-black/35 absolute">
                        <h1 className="p-0 sm:text-9xl text-7xl text-white">FUTU</h1>
                    </div>
                </section>
                <section className="lg:my-12 flex flex-col lg:flex-row justify-around gap-12 lg:gap-0 lg:h-[200px] items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-7xl font-extralight">97%</h1>
                        <p className="font-medium text-base">customerscome back</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-7xl font-extralight">9000+</h1>
                        <p className="font-medium text-base">happy customers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-7xl font-extralight">12000+</h1>
                        <p className="font-medium text-base">orders last month</p>
                    </div>
                </section>
                <section className="flex gap-12 qualitySection">
                    <div className="w-1/2 flex flex-col justify-center items-center lg:pr-6 hero-image-container">
                        <div className="flex flex-col gap-6 sm:items-center items-start">
                            <h1 className="text-5xl lg:w-fit about-heder">Quality Keeps Us <br /> Moving Forward</h1>
                            <p className="text-gray-500 text-balance lg:w-[500px] about-text">We have more than 30 years of experience producing and exporting
                                furniture for international markets. More than <span className="font-semibold text-gray-700">1.000.000 </span>
                                pieces of furniture were delivered to families andbusinesses around the world.
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 relative lg:h-[600px] h-[400px] overflow-hidden rounded-2xl hero-image-container">
                        <img className="object-cover object-center w-full h-full" src="about-image1.webp" alt="about image" />
                    </div>
                </section>
                <section className="flex justify-around lg:flex-row flex-col lg:gap-0 gap-12">
                    <div className="flex flex-col rounded-2xl justify-center items-center bg-gray-100/75 sm:p-10 p-7 gap-5 lg:w-[300px]">
                        <BoxIcon className="w-20 h-20"></BoxIcon>
                        <div className="flex justify-center flex-col items-center text-center">
                            <h1 className="text-lg font-semibold">Made to Order</h1>
                            <p className="text-balance">All pieces made to order for you</p>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-2xl justify-center items-center bg-gray-100/75 sm:p-10 p-7 gap-5 lg:w-[300px]">
                        <TruckIcon className="w-20 h-20"></TruckIcon>
                        <div className="flex justify-center flex-col items-center text-center">
                            <h1 className="text-lg font-semibold">Free Delivery</h1>
                            <p className="text-balance">Free delivery for orders world-wide</p>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-2xl justify-center items-center bg-gray-100/75 sm:p-10 p-7 gap-5 lg:w-[300px]">
                        <CalendarDays className="w-20 h-20"></CalendarDays>
                        <div className="flex justify-center flex-col items-center text-center">
                            <h1 className="text-lg font-semibold">Free Exchange</h1>
                            <p className="text-balance">Free exchange on all products <br /> during the first week</p>
                        </div>
                    </div>
                </section>
                <div className="flex justify-center items-start mb-[4rem]" onClick={scrollToTop}>
                    <button className={buttonVariants({
                        size: "lg"
                    })}>Back to the top</button>
                </div>
            </Common>
        </div>
    )
}