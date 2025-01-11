import DashboardSection from "@/components/dashboard-component";
import { Toaster } from "sonner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Toaster />
            <div className="flex gap-6 py-6">
                <DashboardSection>{children}</DashboardSection>
            </div>
        </>
    );
}
