import Common from "@/components/common-properties";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.email !== ADMIN_EMAIL) {
        return redirect("/")
    }

    return (
        <div className="w-4/5 border rounded-2xl p-8">
            r
        </div>
    )
}