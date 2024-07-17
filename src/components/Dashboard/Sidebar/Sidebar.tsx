"use client";
import React from "react";
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
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
  GraduationCap,
  UsersRound,
  Bell,
  QrCode,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none h-screen w-full">
      <CommandInput placeholder="Escribe la seccion a buscar..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading="Sugerencias">
          <CommandItem>
            <LayoutDashboard className="mr-2 h4 w4" />
            <Link href="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h4 w4" />
            <Link href="#">Suscripciones</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h4 w4" />
            <Link href="#">Categorias</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="">
          <CommandItem>
            <User className="mr-2 h4 w4" />
            <span>Perfil</span>
          </CommandItem>
          <CommandItem>
            <UsersRound className="mr-2 h4 w4" />
            <Link href="/dashboard/users">
              <span>Ver usuarios</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h4 w4" />
            <Link href="/dashboard/pays">
              <span>Pagos</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h4 w4" />
            <Link href="/dashboard/settings">
              <span>Crear Profesores</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <Bell className="mr-2 h4 w4" />
            <Link href="/dashboard/anuncios">
              <span>Crear Anuncios</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <img src="/plans.png" className="mr-2 h-6" />
            <Link href="/dashboard/plans">
              <span>Gestionar planes</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h4 w4" />
            <Link href="/dashboard/registrarpago">
              <span>Registrar Pago</span>
            </Link>
          </CommandItem>
          <CommandItem>
            <QrCode className="mr-2 h4 w4" />
            <Link href="/dashboard/qr">
              <span>Lector Qr</span>
            </Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
