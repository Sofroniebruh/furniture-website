import { domain } from "@/lib/data";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Orders() {
    return (
        <p>Orders page</p>
    )
}