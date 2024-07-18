"use client";
import React, { useState } from "react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty, CommandSeparator } from "@/components/ui/command";
import { User, Dumbbell, CreditCard, QrCode } from 'lucide-react';  
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    return (
        <>
            <button
                className="lg:hidden bg-black text-white p-2 focus:outline-none fixed top-4 left-4 z-50"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`
                w-64 bg-secondary 
                fixed lg:relative inset-y-0 left-0 z-40
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 transition-transform duration-300 ease-in-out
                flex flex-col
            `}>
                <div className="flex-1 overflow-y-auto">
                    <Command className="rounded-none h-full">
                        <CommandInput placeholder="Buscar..." className="w-full" />
                        <CommandList>
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                            <CommandSeparator />
                            <CommandGroup heading="Configuración">
                                <CommandItem>
                                    <User className='mr-2 h-4 w-4' />
                                    <Link href="/userdashboard/misdatos" onClick={close}><span>Mis datos</span></Link>
                                </CommandItem>
                                <CommandItem>
                                    <Dumbbell className='mr-2 h-4 w-4' />
                                    <Link href="/userdashboard/rutina" onClick={close}><span>Mi Rutina</span></Link>
                                </CommandItem>
                                <CommandItem>
                                    <CreditCard className='mr-2 h-4 w-4' />
                                    <Link href="/userdashboard/pagos" onClick={close}><span>Pagos</span></Link>
                                </CommandItem>
                                <CommandItem>
                                    <QrCode className='mr-2 h-4 w-4' />
                                    <Link href="/userdashboard/acceso-qr" onClick={close}><span>Generar acceso/pago</span></Link>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </div>
            
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>
            )}
        </>
    );
};

export default UserSidebar;