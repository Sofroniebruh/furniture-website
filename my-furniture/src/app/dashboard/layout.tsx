import DashboardSection from "@/components/dashboard-component";
import Footer from "@/components/footer-component";
import { Toaster } from "sonner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Toaster />
            <div className="flex gap-6">
                <DashboardSection>{children}</DashboardSection>
            </div>
        </>
    );
}
