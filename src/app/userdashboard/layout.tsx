"use client"
import Navbar from "@/components/Navbar/Navbar";
import UserSidebar from "@/components/UserDashboard/Sidebar/UserSidebar";
import Footer from "@/components/Footer/Footer";

export default function LayoutDashboard({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                <UserSidebar />
                <main className="flex-1 overflow-y-auto bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}