"use client"
import React from 'react'
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandSeparator,
} from "@/components/ui/command"
import { 
    User, 
    Dumbbell, 
    CreditCard, 
    LineChart,
    QrCode
} from 'lucide-react'  
import Link from 'next/link'

const UserSidebar = () => {
  return (
    <Command className="bg-secondary rounded-none h-screen w-64 flex-shrink-0">
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
                    <LineChart className='mr-2 h-4 w-4' />
                    <Link href="#"><span>Progreso</span></Link>
                </CommandItem>
                <CommandItem>
                    <QrCode className='mr-2 h-4 w-4' />
                    <Link href="/userdashboard/qr-access"><span>Generar acceso</span></Link>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
  )
}

export default UserSidebar