import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Orders() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!user || user.email !== ADMIN_EMAIL) {
        return redirect("/")
    }

    return (
        <p>Orders page</p>
    )
}