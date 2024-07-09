"use client"
import Navbar from "@/components/Navbar/Navbar";
import UserSidebar from "@/components/UserDashboard/Sidebar/UserSidebar";
import Footer from "@/components/Footer/Footer";

export default function LayoutDashboard({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex h-screen">
            <div className="w-[250px] overflow-y-auto bg-secondary">
                <UserSidebar />
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-100">
                {children}
            </div>
        </div>
    );
}