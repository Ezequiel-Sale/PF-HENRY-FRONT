"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const path = usePathname();

  const handleToAuth = () => {
    window.location.href = "/login";
  };

  return (
    <nav className="text-white rounded-xl bg-transparent  p-2 w-screen flex justify-center">
      <div className="rounded-xl flex flex-wrap items-center  md:p-2  mx-auto md:max-w-max justify-between md:min-w-[1200px] sm:border-b-0 sm:border-x-0 glass-efect w-full max-w-[70vw] border-none md:border">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse  flex-col pb-2 md:pb-0"
        >
          <img src="logo-with-name.png" className="h-10" alt="Flowbite Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleToAuth}
          >
            Autenticarse
          </button>
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
          <ul className=" text-white flex flex-col font-medium p-4 md:p-0 mt-4  border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full gap-1 ">
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
