import { Toaster } from "sonner"
import Navbar from "@/components/navbar-component";
import ReduxProvider from "./providers/reduxProvider";
import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@/utils/roles";

export default async function Children({ children }: { children: React.ReactNode }) {
    const { userId } = await auth()
    const isAdmin = await checkRole("admin")

    return (
        <ReduxProvider>
            <div className="flex-grow flex flex-col">
                <Navbar userId={userId} isAdmin={isAdmin}></Navbar>
                <Toaster />
                {children}
            </div>
        </ReduxProvider>
    )

}