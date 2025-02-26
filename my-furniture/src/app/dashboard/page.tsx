import { BarChartComponent } from "@/components/bar-chart-component";

export default async function Dashboard() {
    return (
        <div className="lg:w-4/5 w-full border rounded-2xl sm:p-8 p-4 flex justify-center flex-col items-center gap-8">
            <h1 className="lg:text-5xl text-3xl sm:m-0 mt-4">Welcome</h1>
            <div className="flex gap-8 w-full flex-wrap flex-col lg:flex-row gap-y-4 lg:gap-y-8 justify-center">
                <div className="rounded-2xl shadow flex justify-center items-start flex-col p-6 gap-2 flex-1">
                    <h1 className="text-md">Total Income</h1>
                    <p className="font-semibold text-2xl">1234$</p>
                </div>
                <div className="rounded-2xl shadow flex justify-center items-start flex-col p-6 gap-2 flex-1">
                    <h1 className="text-md">Orders made today</h1>
                    <p className="font-semibold text-2xl">12</p>
                </div>
                <div className="rounded-2xl shadow flex justify-center items-start flex-col p-6 gap-2 flex-1">
                    <h1 className="text-md">Most popular item</h1>
                    <p className="font-semibold text-2xl">Item: id3</p>
                </div>
                <div className="w-full">
                    <BarChartComponent></BarChartComponent>
                </div>
            </div>
        </div>
    )
}