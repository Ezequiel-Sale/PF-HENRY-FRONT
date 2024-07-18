"use client";
import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  UsersRound,
  Bell,
  QrCode,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  }
  return (
    <div className="lg:w-64 bg-secondary h-screen lg:flex lg:flex-col">
      {/* Botón para abrir/cerrar el sidebar en pantallas pequeñas */}
      <button
        className="lg:hidden bg-black text-white p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Contenido del sidebar */}
      <Command
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block bg-secondary rounded-none h-screen w-full lg:w-64`}
      >
        <CommandInput placeholder="Escribe la seccion a buscar..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link href="/dashboard" onClick={close}>Dashboard</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="">
            <CommandItem>
              <UsersRound className="mr-2 h-4 w-4" />
              <Link href="/dashboard/users" onClick={close}>
                <span>Ver usuarios</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href="/dashboard/pays" onClick={close}>
                <span>Pagos</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/dashboard/settings" onClick={close}>
                <span>Crear Profesores</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Bell className="mr-2 h-4 w-4" />
              <Link href="/dashboard/anuncios" onClick={close}>
                <span>Crear Anuncios</span>
              </Link>
            </CommandItem>
            <CommandItem>
            <FolderKanban className="mr-2 h-4 w-4" />
              <Link href="/dashboard/plans" onClick={close}>
                <span>Gestionar planes</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href="/dashboard/registrarpago" onClick={close}>
                <span>Registrar Pago</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <QrCode className="mr-2 h-4 w-4" />
              <Link href="/dashboard/qr" onClick={close}>
                <span>Lector Qr</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default Sidebar;
