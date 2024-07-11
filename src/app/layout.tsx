import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CombinedProvider } from "@/components/ContextUserNotifications/ContextUserNotifications";
import ChatBot from "@/components/ChatBot/ChaBot";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Power Traning",
  description: "Power Training App",
  icons: {
    icon: "full-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black z-10 ,md:max-w-screen-md overflow-x-hidden relative`}
      >
        <CombinedProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatBot />
        </CombinedProvider>
      </body>
    </html>
  );
}
