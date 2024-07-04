"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { userSession } from "@/types/profesorInterface";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useNotification, Notification } from "../NotificationContext/NotificationContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const path = usePathname();

  const handleToAuth = () => {
    if (userData) {
      localStorage.removeItem("userSession");
      setUserData(null);
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  const handleToDashboard = () => {
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userDataString = localStorage.getItem("userSession");
      setUserData(userDataString ? JSON.parse(userDataString) : null);
      setIsLoading(false);
    }
  }, []);

  const { addNotification, unreadCount  } = useNotification();

  const handleButtonClick = () => {
    const newNotification = {
      message: 'Tu profesor subió tu rutina'
    };
    addNotification(newNotification);
  };
  

  return (
    <nav className="text-white bg-transparent p-0 md:p-2 w-[250px] md:w-screen flex justify-center">
      <div
        className={`flex flex-wrap items-center md:p-2 md:mx-auto md:w-screen sm:border-b-0 sm:border-x-0 border-none md:border-b md:border-solid md:border-gray-100 w-[200px] ${
          path === "/" ? "justify-around" : "justify-between"
        }`}
      >
        <a
          href="/"
          className={`flex items-center space-x-3 rtl:space-x-reverse flex-col pb-2 md:pb-0 ${
            path === "/" ? "hidden" : "block"
          }`}
        >
          <img src="logo-with-name.png" className="h-10" alt="Flowbite Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoading &&
            (userData ? (
              <>
                <div>
                <Popover>
        <PopoverTrigger>
          <div className="relative mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <NotificationsDropdown />
        </PopoverContent>
      </Popover>
      <button onClick={handleButtonClick}>agregar noti</button>
                </div>
                <button
                  type="button"
                  className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2"
                  onClick={handleToDashboard}
                >
                  Ir al Dashboard
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mr-6"
                  onClick={handleToAuth}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mr-6"
                onClick={handleToAuth}
              >
                Iniciar Sesión
              </button>
            ))}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } items-center md:justify-between w-full md:flex md:w-auto md:order-1 bg-black md:bg-transparent justify-center md:border border-none`}
          id="navbar-cta"
        >
          <ul className="text-white flex flex-col font-medium p-4 md:p-0 mt-4 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full gap-1">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 md:p-0 bg-gray-400/20 rounded md:bg-transparent hover:text-red-700 ${
                  path === "/" ? "text-red-500" : "text-white"
                }`}
                aria-current="page"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`block py-2 px-3 md:p-0 bg-gray-400/20 rounded md:bg-transparent hover:text-red-700 ${
                  path === "/services" ? "text-red-500" : "text-white"
                }`}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`block py-2 px-3 md:p-0 bg-gray-400/20 rounded md:bg-transparent hover:text-red-700 ${
                  path === "/about" ? "text-red-500" : "text-white"
                }`}
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`block py-2 px-3 md:p-0 bg-gray-400/20 rounded md:bg-transparent hover:text-red-700 ${
                  path === "/contact" ? "text-red-500" : "text-white"
                }`}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
