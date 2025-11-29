import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#F2F2F7] overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                {children}
            </main>
        </div>
    );
}
