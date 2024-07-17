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
  role: string;
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addNotification, unreadCount } = useContextCombined();
  const path = usePathname();
  const pathName = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<userSession>();
  const [userGoogle, setUserGoogle] = useState<GoogleSession>();
  const apiUri = process.env.NEXT_PUBLIC_API_URL;

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
    }else if (userGoogle?.role === "user") {
      router.push("/userdashboard");
    }
  };

  useEffect(() => {
    if (userData) {
      const socket = io(`${apiUri}`,{
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center md:hidden">
          <div className="invisible">Placeholder</div>
          <button
            data-collapse-toggle="navbar-menu"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:justify-between md:items-center`} id="navbar-menu">
          <div className="md:flex-grow"></div>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a href="/" className={`block py-2 pr-4 pl-3 ${path === "/" ? "text-red-500" : "text-white"} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0`}>Inicio</a>
            </li>
            <li>
              <a href="/services" className={`block py-2 pr-4 pl-3 ${path === "/services" ? "text-red-500" : "text-white"} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0`}>Objetivos</a>
            </li>
            <li>
              <a href="/about" className={`block py-2 pr-4 pl-3 ${path === "/about" ? "text-red-500" : "text-white"} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0`}>Sobre Nosotros</a>
            </li>
            <li>
              <a href="/contact" className={`block py-2 pr-4 pl-3 ${path === "/contact" ? "text-red-500" : "text-white"} hover:bg-gray-700 md:hover:bg-transparent md:hover:text-red-500 md:p-0`}>Contacto</a>
            </li>
          </ul>
          <div className="md:flex-grow"></div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            {userData?.token || userGoogle?.token ? (
              <>
                <Popover>
                  <PopoverTrigger>
                    <div className="relative cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                        <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <NotificationsDropdown />
                  </PopoverContent>
                </Popover>
                <button
                  type="button"
                  className="w-full md:w-auto text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleToDashboard}
                >
                  Ir al Dashboard
                </button>
                <button
                  type="button"
                  className="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleToAuth}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                type="button"
                className="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleToAuth}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
      <Anuncio />
    </nav>
  );
};

export default Navbar;