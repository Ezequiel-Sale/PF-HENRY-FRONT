"use client"
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function LayoutDashboard ({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
                <div className="flex bg-white">
                    <div className="hidden md:block h-[100vh] w-[45vh]">
                        <Sidebar />
                    </div>
                    <div className="p-5 w-full md:max-w-[1140px]">
                        {children}
                    </div>
                </div>
    );
}