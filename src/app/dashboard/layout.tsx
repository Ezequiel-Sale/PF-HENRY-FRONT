"use client"
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

export default function LayoutDashboard({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex bg-white h-screen">
            <div className="h-full overflow-y-auto bg-secondary">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col bg-gray-200 p-5 w-full md:max-w-[1140px] overflow-y-auto">
                {children}
            </div>
        </div>
    );
}