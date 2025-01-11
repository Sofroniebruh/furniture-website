import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Navbar from "./navbar-component"
import { Toaster } from "sonner"
import Footer from "./footer-component"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types"

export default async function Children({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <>
            <Navbar user={user as KindeUser<void>}></Navbar>
            <Toaster />
            {children}
            <Footer></Footer>
        </>
    )

}