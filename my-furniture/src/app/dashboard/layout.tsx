import DashboardSection from "@/components/dashboard-component";
import Footer from "@/components/footer-component";
import Navbar from "@/components/navbar-component";
import { CartProvider } from "@/contexts/cartContext";
import { Toaster } from "sonner";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CartProvider>
            <Toaster />
            <div className="flex gap-6 py-6">
                <DashboardSection>{children}</DashboardSection>
            </div>
        </CartProvider>
    );
}
