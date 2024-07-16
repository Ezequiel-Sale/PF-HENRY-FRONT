// Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { io } from "socket.io-client";
import { useContextCombined } from "../ContextUserNotifications/ContextUserNotifications";
import Anuncio from "../Dashboard/Anuncios/Anuncio";
import { IUser, userSession } from "@/types/profesorInterface";
import { getProfesors } from "@/helper/petitions";


interface GoogleSession {
  id: string;
  email: string;
  token: string;
  name: string;
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addNotification, unreadCount } = useContextCombined();
  const path = usePathname();
  const pathName = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<userSession>();
  const [userGoogle, setUserGoogle] = useState<GoogleSession>();
  console.log("navbar userData",userData)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userSession");
      setUserData(JSON.parse(userData!));
    }
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("googleSession");
      setUserGoogle(JSON.parse(userData!));
    }
  }, [pathName]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToAuth = () => {
    if (userData) {
      localStorage.removeItem("userSession");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
    if (userGoogle) {
      localStorage.removeItem("googleSession");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  const handleToDashboard = () => {
    if (userData?.role === "admin") {
      router.push("/dashboard");
    } else if (userData?.role === "profesor") {
      router.push("/dashboard-profesor");
    } else if (userData?.role  === "user") {
      router.push("/userdashboard");
    }else if (userGoogle?.token){
      router.push("/userdashboard");
    }
  };

  useEffect(() => {
    if (userData) {
      const socket = io("http://localhost:3001",{
        query: { userId: userData.id },
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.emit("register", userData.id);

      socket.on("newNotification", (notification) => {
        addNotification({ message: notification.message });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userData, addNotification]);

  return (
    <nav className="text-white bg-black border-b-2 border-red-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-8">
            <li>
              <a
                href="/"
                className={`hover:text-red-500 transition duration-300 ${
                  path === "/" ? "text-red-500" : "text-white"
                }`}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`hover:text-red-500 transition duration-300 ${
                  path === "/services" ? "text-red-500" : "text-white"
                }`}
              >
                Objetivos
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`hover:text-red-500 transition duration-300 ${
                  path === "/about" ? "text-red-500" : "text-white"
                }`}
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`hover:text-red-500 transition duration-300 ${
                  path === "/contact" ? "text-red-500" : "text-white"
                }`}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {userData?.token || userGoogle?.token ? (
            <>
              <Popover>
                <PopoverTrigger>
                  <div className="relative cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0">
                  <NotificationsDropdown />
                </PopoverContent>
              </Popover>
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleToDashboard}
              >
                Ir al Dashboard
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleToAuth}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleToAuth}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li>
              <a
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  path === "/"
                    ? "text-red-500"
                    : "text-white hover:bg-gray-700 hover:text-white"
                }`}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  path === "/services"
                    ? "text-red-500"
                    : "text-white hover:bg-gray-700 hover:text-white"
                }`}
              >
                Objetivos
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  path === "/about"
                    ? "text-red-500"
                    : "text-white hover:bg-gray-700 hover:text-white"
                }`}
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  path === "/contact"
                    ? "text-red-500"
                    : "text-white hover:bg-gray-700 hover:text-white"
                }`}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      )}
      <Anuncio />
    </nav>
  );
};

export default Navbar;
