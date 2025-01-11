import { BarChartComponent } from "@/components/bar-chart-component";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!user || user.email !== ADMIN_EMAIL) {
        return redirect("/")
    }

    return (
        <div className="lg:w-4/5 w-full border rounded-2xl sm:p-8 p-4 flex justify-center flex-col items-center gap-8">
            <h1 className="text-5xl">Welcome</h1>
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