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
    User, 
    Dumbbell, 
    CreditCard, 
    LineChart,
    QrCode
} from 'lucide-react';  
import Link from 'next/link';
import { Menu } from 'lucide-react';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="md:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
                <Menu />
            </button>
            <div className={`bg-secondary h-screen w-64 flex-shrink-0 md:block ${isOpen ? 'block' : 'hidden'}`}>
                <Command className="rounded-none h-full">
                    <CommandInput placeholder="Buscar..." className="w-full" />
                    <CommandList className="overflow-y-auto h-full">
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandSeparator />
                        <CommandGroup heading="Configuración">
                            <CommandItem>
                                <User className='mr-2 h-4 w-4' />
                                <Link href="/userdashboard/misdatos"><span>Mis datos</span></Link>
                            </CommandItem>
                            <CommandItem>
                                <Dumbbell className='mr-2 h-4 w-4' />
                                <Link href="/userdashboard/rutina"><span>Mi Rutina</span></Link>
                            </CommandItem>
                            <CommandItem>
                                <CreditCard className='mr-2 h-4 w-4' />
                                <Link href="/userdashboard/pagos"><span>Pagos</span></Link>
                            </CommandItem>
                            <CommandItem>
                                <QrCode className='mr-2 h-4 w-4' />
                                <Link href="/userdashboard/acceso-qr"><span>Generar acceso/pago</span></Link>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        </>
    );
};

export default UserSidebar;
